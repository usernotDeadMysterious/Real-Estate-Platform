import GoogleMapSection from '@/app/_components/GoogleMapSection'
import { Button } from '@/components/ui/button'
import { Bath, BedDouble, CarFront, Drill, Home, LandPlot, MapPin, Share } from 'lucide-react'
import React from 'react'
import AgentDetails from './AgentDetails'

function Details({listingDetail}) {

  return listingDetail&& (
    <div className='my-6 flex gap-2 flex-col'>
      <div className='flex justify-between items-center'>
        <div className='mt-4 mb-4'>
            <h2 className='font-bold text-3xl '>Rs. {listingDetail?.price}</h2>
            <h2 className='text-gray-500 text-lg flex gap-2'>
                <MapPin/>
                {listingDetail?.address}
            </h2>
        </div>
        <Button className='flex gap-2'><Share/>Share</Button>

      </div>
      <hr></hr>
      <div className='mt-4 mb-4 flex-col gap-3'>
        <h2 className='font-bold text-2xl'>Key Features</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'><Home/>
            {listingDetail?.propertyType}</h2>
            <h2 className='flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary'><Drill/>
            Built In {listingDetail?.builtIn}</h2>
            <h2 className='flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary'><LandPlot/>
            {listingDetail?.area}</h2>
            <h2 className='flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary'><BedDouble/>
            {listingDetail?.bedroom} Bedrooms</h2>
            <h2 className='flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary'><Bath/>
            {listingDetail?.bathroom} Bathrooms</h2>
            <h2 className='flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary'><CarFront/>
            {listingDetail?.parking} Parking</h2>

        </div>

      </div>
      <hr></hr>
      <div className='mt-4 mb-4'>
        <h2 className='font-bold text-2xl'>What's Special ?</h2>
        <p className='text-gray-600'>{listingDetail?.description}</p>
      </div>
      <hr></hr>
      <div className='mt-4 mb-4'>
        <h2 className='font-bold text-2xl'>Find on Map</h2>
        <GoogleMapSection
        coordinates={listingDetail?.coordinates}
        listing={[listingDetail]}/>
      </div>
      <hr></hr>
      <div className='mt-4 mb-4'>
      <h2 className='font-bold text-2xl'>Contact Owner</h2>
        <AgentDetails listingDetail={listingDetail} />
      </div>


    </div>
  )
}

export default Details
