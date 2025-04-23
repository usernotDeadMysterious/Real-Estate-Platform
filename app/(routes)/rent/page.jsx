"use client";

// import AdvancedSearch from '@/app/_components/AdvancedSearchComponent'
import AdvancedSearchSidebar from '@/app/_components/AdvancedSearchSidebar';
import ListingMapView from '@/app/_components/ListingMapView'
import React, { useState } from 'react'
// import AdvancedSearchSidebar from '@/components/AdvancedSearchSidebar';

function page() {
  const [listings, setListings] = useState([]);

  // const handleSearch = async (filters) => {
  //   let query = supabase.from('listingbyZameen').select('*');

  //   if (filters.city) query = query.ilike('city', `%${filters.city}%`);
  //   if (filters.province_name) query = query.ilike('province_name', `%${filters.province_name}%`);
  //   if (filters.property_type) query = query.eq('property_type', filters.property_type);
  //   if (filters.purpose) query = query.eq('purpose', filters.purpose);
  //   if (filters.bedrooms) query = query.gte('bedrooms', filters.bedrooms);
  //   if (filters.baths) query = query.gte('baths', filters.baths);
  //   if (filters.minPrice) query = query.gte('price', parseFloat(filters.minPrice));
  //   if (filters.maxPrice) query = query.lte('price', parseFloat(filters.maxPrice));
  //   if (filters.minArea) query = query.gte('Area Size', parseFloat(filters.minArea));
  //   if (filters.maxArea) query = query.lte('Area Size', parseFloat(filters.maxArea));

  //   const { data, error } = await query;
  //   if (data) setListings(data);
  // };
  return (
    <div className="p-10">
      {/* <AdvancedSearch/> */}
      {/* <AdvancedSearchSidebar onSearch={handleSearch} /> */}
      <ListingMapView type='Rent'/>
    </div>
  )
}

export default page
