import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bath, Bed, BedDouble, CarFront } from 'lucide-react'

function FilterSection({setBathCount,setBedCount,setParkingCount,setHomeType}) {
  return (
    <div className='px-3 py-2 gap-3 grid grid-cols-2 md:flex'>
      <Select onValueChange={setBedCount}>
  <SelectTrigger className=" w-[180px]">
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
  <SelectTrigger className=" w-[180px]">
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
  <SelectTrigger className=" w-[180px]">
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
  <SelectTrigger className=" w-[180px]">
    <SelectValue placeholder="Home Type" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="Any">
      Any
    </SelectItem>
    <SelectItem value="Single Family House">
      Single Family Home
    </SelectItem>
    <SelectItem value="Town House">
      Town House
    </SelectItem>
    <SelectItem value="Condo">
      Condo
    </SelectItem>
  </SelectContent>
      </Select>


    </div>
  )
}

export default FilterSection
