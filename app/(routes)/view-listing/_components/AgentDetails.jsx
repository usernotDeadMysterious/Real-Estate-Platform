import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { list } from 'postcss';
import React from 'react'

function AgentDetails({listingDetail}) {
    const myimg =listingDetail?.profileImage || '/default.png';
    console.log(listingDetail)
  return (
    

    <div className='flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6'>
        <div className='items-center gap-6'>
        <Image 
      src={myimg}
    //   src={listingDetail?.url}
      alt='Profile Image'
      width={60}
      height={60}
      className='rounded-full'
      />
      <div>
        <h2 className='text-lg  font-bold'>{listingDetail?.fullName}</h2>
        <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2>
        
      </div>
        </div>
      
      <Button>Send Message</Button>
    </div>
  )
}

export default AgentDetails
