"use client";
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner';
import { GoogleMap } from '@react-google-maps/api';
import GoogleMapSection from './GoogleMapSection';

function ListingMapView({type}) {
    const[listing,setListing]=useState([]);
    const[searchedAddress,setSearchedAddress]=useState();
    const[bedCount,setBedCount]=useState(0);
    const[bathCount,setBathCount]=useState(0);
    const[parkingCount,setParkingCount]=useState(0);
    const [homeType,setHomeType] = useState();
    const [coordinates,setCoordinates]= useState();
    

    useEffect(()=>{
        getLatestListing();
        console.log(type);
    },[type])
    const getLatestListing=async()=>{
        const {data,error}= await supabase
        .from('listing')
        .select(`*,listingImages(
          url,
          listing_id
          )`)
        
        .eq('active',true)
        .eq('type',type)
        .order('id',{ascending:false})

        if(data){
            setListing(data)
            console.log(data)
            
        }
        if (error) {
            toast("Server Side Error");
        }
    }
    
    const handleSearchClick=async()=>{
      //console.log("sackmeck",searchedAddress);
      const searchTerm= searchedAddress?.value?.structured_formatting?.main_text
      let query = supabase
        .from('listing')
        .select(`*,listingImages(
          url,
          listing_id
          )`)
        
        .eq('active',true)
        .eq('type',type)
        .gte('bedroom',bedCount)
        .gte('bathroom',bathCount)
        .gte('parking',parkingCount)
        .like('address','%'+searchTerm+'%')
        .order('id',{ascending:false})

        if (homeType){
          query=query.eq('propertyType',homeType)
        }

        const {data,error}= await query
        if(data){
          setListing(data)
        }
        
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div>
        <Listing listing={listing}
        handleSearchClick={handleSearchClick} 
        searchedAddress={(v)=>setSearchedAddress(v)}

        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}
        setCoordinates={setCoordinates}
        />
      </div>
      <div className="hidden sm:block md:sticky top-20 h-[90vh] md:w-[350px] lg:w-[500px] xl:w-[800px] overflow-hidden rounded-lg shadow-lg">
        <GoogleMapSection
        listing={listing}
        coordinates={coordinates}
        />
      </div>
    </div>
  )
}

export default ListingMapView
