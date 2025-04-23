"use client";
import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import { supabase } from '@/utils/supabase/client';
import { toast, Toaster } from 'sonner';
import GoogleMapSection from './GoogleMapSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ListingMapView({ type  }) {   

  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [coordinates, setCoordinates] = useState();
  const [homeType, setHomeType] = useState(null);
  const [message, setMessage] = useState(""); //
  //  State to handle message


  const [city, setCity] = useState(null);
const [province, setProvince] = useState(null);
const [priceRange, setPriceRange] = useState(null); // priceRange could be something like "0-50000"


  useEffect(() => {
    getLatestListing();
    console.log(type);
  }, [type]);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from('listing')
      .select(`*,listingImages(
        url,
        listing_id
      )`)
      .eq('active', true)
      .eq('type', type)
      .order('id', { ascending: true })
      .limit(100);

    if (data) {
      setListing(data);
      console.log(data);
    }
    if (error) {
      console.log('Server side error: ',error)
      Toaster("Server Side Error");
    }
  };

  const handleSearchClick = async () => {
    if (type === 'Sell' && homeType === 'Rooms') {
      setMessage("For rooms, please visit the rental page. No listings found for sale with 'Rooms' selection.");
      return;
    } else {
      setMessage("");
    }
  
    const searchTerm = searchedAddress?.value?.structured_formatting?.main_text || '';
  
    let query = supabase
      .from('listing')
      .select(`*, listingImages(url, listing_id)`)
      .eq('active', true)
      .eq('type', type);
  
    // Apply filters conditionally
    if (homeType) query = query.eq('propertyType', homeType);
    if (city) query = query.eq('city', city);
    if (province) query = query.eq('province_name', province);
    if (bedCount) query = query.gte('bedroom', bedCount);
    if (bathCount) query = query.gte('bathroom', bathCount);
    if (parkingCount) query = query.gte('parking', parkingCount);
    if (searchTerm) query = query.like('address', `%${searchTerm}%`);
  
    // Handle price range if set
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      query = query.gte('price', minPrice).lte('price', maxPrice);
    }
  
    // Apply ordering and limit the result set
    query = query.order('id', { ascending: true }).range(0, 39);
  
    // Execute query
    const { data, error } = await query;
  
    if (error) {
      console.error('Search error:', error);
      toast.error("An error occurred while searching listings.");
      return;
    }
  
    if (data && data.length > 0) {
      setListing(data);
    } else {
      setListing([]);
      toast.info("No listings matched your criteria.");
    }
  };
  

  
  
  
  // useEffect(() => {
  //   handleSearchClick();
  // }, [bedCount, bathCount, parkingCount, city, province, priceRange, homeType]);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      
      {message && (
        // Show this message if 'Rooms' are selected on the 'For Sale' page
        <div className="text-yellow-800 text-lg p-4 rounded-lg  mb-4">
          <p>{message}</p>
          <Link href="/rent">
            <Button variant="outline" className="mt-2">For Rent</Button>
          </Link>
        </div>
      )}

      {!message && (
        // Only show listings if message is not set
        <div>
          <Listing
            listing={listing}
            handleSearchClick={handleSearchClick}
            searchedAddress={(v) => setSearchedAddress(v)}
            setBathCount={setBathCount}
            setBedCount={setBedCount}
            setParkingCount={setParkingCount}
            setCoordinates={setCoordinates}
            setHomeType={setHomeType}
            setCity={setCity}
      setProvince={setProvince}
      setPriceRange={setPriceRange}
            
          />
        </div>
      )}
          <div className="hidden sm:block md:sticky top-20 h-[90vh] md:w-[350px] lg:w-[500px] xl:w-[800px] overflow-hidden rounded-lg shadow-lg">
            <GoogleMapSection listing={listing} coordinates={coordinates} />
          </div>
        
      
    </div>
  );
}

export default ListingMapView;
