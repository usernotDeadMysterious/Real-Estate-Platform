"use client";

import AdvancedSearchSidebar from '@/app/_components/AdvancedSearchSidebar';
import ListingMapView from '@/app/_components/ListingMapView'
import React, { useState } from 'react'

function page() {
  const [listings, setListings] = useState([]);


  return (
    <div className="p-10">
     
      <ListingMapView type='Rent'/>
    </div>
  )
}

export default page
