import ListingMapView from '@/app/_components/ListingMapView'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'


function page() {
  return (
    <div className="p-10">
      <ListingMapView type='Sell'/>
    </div>
  )
}

export default page
