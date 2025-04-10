import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bath, Bed, BedDouble, CarFront, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FilterSection({setBathCount,setBedCount,setParkingCount,setHomeType,handleSearchClick}) {
  return (
    <div>
    <div className='px-3 py-2 gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 w-full'>
      <Select onValueChange={setBedCount}>
  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Bedrooms" />
  </SelectTrigger>
  <SelectContent>

    <SelectItem value="1">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>1</h2>
    </SelectItem>
    <SelectItem value="2">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>2</h2>
    </SelectItem><SelectItem value="3">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>3</h2>
    </SelectItem>
    <SelectItem value="4">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>3+</h2>
    </SelectItem>
  </SelectContent>
      </Select>

      <Select onValueChange={setBathCount}>
  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Bath" />
  </SelectTrigger>
  <SelectContent>

    <SelectItem value="1">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>1</h2>
    </SelectItem>
    <SelectItem value="2">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>2</h2>
    </SelectItem><SelectItem value="3">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>3</h2>
    </SelectItem>
    <SelectItem value="4">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>3+</h2>
    </SelectItem>
  </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Parking" />
  </SelectTrigger>
  <SelectContent>

    <SelectItem value="1">
      <h2 className='flex gap-2 '>
        <CarFront className='h-5 w-5 text-primary'/>1</h2>
    </SelectItem>
    <SelectItem value="2">
      <h2 className='flex gap-2 '>
        <CarFront className='h-5 w-5 text-primary'/>2</h2>
    </SelectItem><SelectItem value="3">
      <h2 className='flex gap-2 '>
        <CarFront className='h-5 w-5 text-primary'/>3</h2>
    </SelectItem>
    <SelectItem value="4">
      <h2 className='flex gap-2 '>
        <CarFront className='h-5 w-5 text-primary'/>3+</h2>
    </SelectItem>
  </SelectContent>
      </Select>

      <Select onValueChange={(value)=>value=='Any'?setHomeType(null):setHomeType(value)}>
  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Type" />
  </SelectTrigger>
  <SelectContent>
  {/* <SelectItem value="Any">
      Any
    </SelectItem> */}
    <SelectItem value="">
      Any
    </SelectItem>
    <SelectItem value="House">
      House
    </SelectItem>
    <SelectItem value="Upper Portion">
      Upper Portion
    </SelectItem>
    <SelectItem value="Lower Portion">
      Lower Portion
    </SelectItem>
    <SelectItem value="Apartment">
      Apartment
    </SelectItem>
    <SelectItem value="Business Area">
      Business Area
    </SelectItem>
    <SelectItem value="Rooms">
      Rooms
    </SelectItem>
  </SelectContent>
      </Select>

      


    </div>
    <div className='px-3 py-2 gap-3 grid grid-cols-1  w-full'>

    <Button className='flex gap-2'
          onClick={() => {
            console.log('Search button clicked');
            handleSearchClick();
          }}
          
        ><Search className='h-4 w-4'/>
        Search</Button>
    </div>
    
    </div>
    
  )
}

export default FilterSection
