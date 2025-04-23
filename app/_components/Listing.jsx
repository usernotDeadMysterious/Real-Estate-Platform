import { BathIcon, BedDouble, HomeIcon, MapPin, Paperclip, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import GoogleUpdated from './GoogleUpdated'
import { Button } from '@/components/ui/button'
import FilterSection from './FilterSection'
import Link from 'next/link'

function Listing({listing,
  handleSearchClick,
  searchedAddress,
  setBathCount,
  setBedCount,
  setParkingCount,
  setHomeType,
  setCoordinates,
  setCity,
  setProvince,
  setPriceRange

}) {

  const [address, setAddress ]= useState();
  const convertToPakistaniUnits = (sqFt) => {
    if (sqFt >= 43560) {
      return `${(sqFt / 43560).toFixed(2)} Acre`;
    } else if (sqFt >= 5445) {
      return `${(sqFt / 5445).toFixed(2)} Kanal`;
    } else {
      return `${(sqFt / 272.25).toFixed(2)} Marla`;
    }
  };
  return (
    <div >
      <div className='p-3 flex gap-6'>
        <GoogleUpdated
        selectedAddress={(v)=>{searchedAddress(v);
          setAddress(v)
        }}
        setCoordinates={setCoordinates}
        />
        
        
      </div>
      <FilterSection 
      setBathCount={setBathCount}
      setBedCount={setBedCount}
      setParkingCount={setParkingCount}
      setHomeType={setHomeType}
      setCoordinates={setCoordinates}
      handleSearchClick={handleSearchClick}
      setCity={setCity}
      setProvince={setProvince}
      setPriceRange={setPriceRange}

      />

      <div className='flex justify-center my-4'>
      
      </div>
      
      
        {address&&<div className='px-3 my-5 '>
          <h2 className='text-xl'>Found <span className='font-bold'>{listing?.length}</span> Result in <span className='text-primary font-bold'>{address?.label}</span></h2>


        </div>}
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        {listing?.length>0? listing.map((item, index) => (
          <Link href={'/view-listing/' + item.id} key={item.id }>
          <div  
          className="border p-3
          hover:border-primary cursor-pointer rounded-lg">

              <Image 
                src={item.listingImages[0].url || 'house-placeholder.jpeg'} 
                width={800}
                height={150}
                className='rounded-lg object-cover h-[170px] w-full'
                alt={`Listing ${index}`}
              />
            
            <div className='flex mt-2 flex-col gap-2'>
              <h2 className='font-bold text-xl'>
              Rs. {item.price?.toLocaleString('en-PK')} /-
              </h2>
              <h2 className='font-bold text-xl'>
               {item.propertyType}
              </h2>
              <h2 className='flex gap-2 text-sm text-gray-600'>
                <MapPin className='h-4 w-4'/>
                {item.address}</h2>


                <h3 className='flex gap-2 text-sm text-gray-800'>
                <MapPin className='h-4 w-4'/>
                Detailed Address :  {item.detailedAddress}</h3>
                <div className='flex gap-2 mt-2 justify-between'>
                  <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <BedDouble className='h-4 w-4'/>
                    {item?.bedroom}
                  </h2>
                  <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <BathIcon className='h-4 w-4'/>
                    {item?.bathroom}
                  </h2>
                  <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                    <Ruler className='h-4 w-4'/>
                    {item?.area} Sq.ft
                  </h2>
                  <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                  <Ruler className="h-4 w-4" />
                  {convertToPakistaniUnits(item?.area)}
                  </h2>
                </div>
                <h2 className='flex gap-2 text-sm text-gray-600'>
                <Paperclip className='h-3 w-3'/>Posted by: {item.fullName} </h2>
            </div>
          </div>
          </Link>
        ))
      :[1,2,3,4,5,6,7,8].map((item,index)=>{
        <div key={index} className='h-[230px] w-full
        bg-slate-200 animate-pulse rounded-lg'>

        </div>
      })
      }
      </div>
    </div>
  )
}

export default Listing
