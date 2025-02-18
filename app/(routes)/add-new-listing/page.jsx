"use client";
// import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import GoogleUpdated from '@/app/_components/GoogleUpdated';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Loader, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';


function page() {
  const [selectedAddress,setSelectedAddress]= useState();
  const {user} =useUser();
  const [coordinates,setCoordinates] = useState();
  const [loader,setLoader]=useState(false);
  const router = useRouter();
  const nextHandler = async() =>{
    setLoader(true)
    console.log(selectedAddress,coordinates);
    
    const { data, error } = await supabase
    .from('listing')
    .insert([
      { address: selectedAddress.label, 
        coordinates: coordinates,
        createdBy:user?.primaryEmailAddress.emailAddress
      },
    ])
    .select()
         
    if(data)
    {
      setLoader(false)
      console.log("New Data added, ",data);
      toast("New Address added for Listing")
      router.replace('/edit-listing/'+data[0].id);
    }
    if(error){
      setLoader(false)
      console.log('Error ');
      toast("seems like server side error")
    }
  }
  
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className='flex flex-col gap-5 items-center p-10 justify-center'>
      <h2 className='font-bold text-2xl'>Add new listing</h2>
      <div className='p-10 rounded-lg border w-full shadow-md flex flex-col gap-5'>
        <h2 className='text-gray-500'>Enter Address which you want to List</h2>
        <GoogleUpdated
          selectedAddress={(value)=>setSelectedAddress(value)}
          setCoordinates={(value)=>setCoordinates(value)}
        />
        <Button
          disabled={!selectedAddress|| !coordinates || loader}
          onClick={nextHandler}
          >
            {loader?<Loader className='animate-spin' />:'Next'}
            </Button>
      </div>
      
    </div>
    </div>
  )
}

export default page
