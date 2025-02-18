import { Button } from '@/components/ui/button'
import { BathIcon, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MarkerListingItem({item,index,closeHandler}) {
  return (
    <div>
      <div  key={index}
          className=" cursor-pointer rounded-lg w-[180px] ">
            <X onClick={()=>closeHandler()} />
              <Image 
                src={item.listingImages[0].url} 
                width={800}
                height={150}
                className='rounded-lg w-[180px] object-cover h-[120px] '
                alt={`Listing ${index}`}
              />
            {/* )} */}
            <div className='flex mt-2 flex-col gap-2 p-2 bg-white'>
              <h2 className='font-bold text-xl'>${item?.price}</h2>
              <h2 className='flex gap-2 text-sm text-gray-400'>
                <MapPin className='h-4 w-4'/>
                {item.address}</h2>
                <div className='flex gap-2 mt-2 justify-between'>
                  <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <BedDouble className='h-4 w-4'/>
                    {item?.bedroom}
                  </h2>
                  <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <BathIcon className='h-4 w-4'/>
                    {item?.bathroom}
                  </h2>
                  {/* <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <Ruler className='h-4 w-4'/>
                    {item?.area}
                  </h2> */}

                  
                </div>
                <Link href={'/view-listing/'+item.id} className='w-full'>
                <Button size='sm'>View Detail</Button></Link>
            </div>
          </div>
    </div>
  )
}

export default MarkerListingItem
