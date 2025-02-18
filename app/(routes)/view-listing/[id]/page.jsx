'use client';
import { supabase } from '@/utils/supabase/client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Slider from '../_components/Slider';
import Details from '../_components/Details';

function page() {
    const {id}=useParams();
    const [listingDetail, setListingDetail]=useState();

    useEffect(()=>{
        getListingDetail();
    },[])
    const getListingDetail=async()=>{

        const {data,error}=await supabase
            .from('listing')
            .select('*,listingImages(url,listing_id)')   
            .eq('id',id)
            .eq('active',true);

            if (data){
                console.log(data)
                setListingDetail(data[0]);
            }
            else{
                toast('Server Side Error Fetching the Data');
            }
    }
  return (
    <div className='px-10   sm:px-24 md:px-32 lg:px-56 my-3 '>
      <Slider imageList={listingDetail?.listingImages} />
      <Details listingDetail={listingDetail} />
    </div>
  )
}

export default page
