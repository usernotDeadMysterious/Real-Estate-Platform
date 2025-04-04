"use client";
import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
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
  const [message, setMessage] = useState(""); // State to handle message

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
      .order('id', { ascending: false });

    if (data) {
      setListing(data);
      console.log(data);
    }
    if (error) {
      toast("Server Side Error");
    }
  };

  const handleSearchClick = async () => {
    // Check if 'Rooms' is selected and we are on '/for-sale' page
    if (type === 'Sell' && homeType === 'Rooms') {
      setMessage("For rooms, please visit the rental page. No listings found for sale with 'Rooms' selection.");
      return; // Prevent search if rooms are selected on the 'For Sale' page
    } else {
      setMessage(""); // Reset message if search is valid
    }
    
    
    const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;
    let query = supabase
      .from('listing')
      .select(`*,listingImages(
        url,
        listing_id
      )`)
      .eq('active', true)
      .eq('type', type)
      .gte('bedroom', bedCount)
      .gte('bathroom', bathCount)
      .gte('parking', parkingCount)
      .like('address', '%' + searchTerm + '%')
      .order('id', { ascending: false });

    if (homeType) {  // Changed here: Using homeType prop directly instead of local state
      query = query.eq('propertyType', homeType);
    }

    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
  };

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
