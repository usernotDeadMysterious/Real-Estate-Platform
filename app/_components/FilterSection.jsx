import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bath, Bed, BedDouble, CarFront, CrossIcon, DollarSign, FolderClosedIcon, PenIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Slider } from '@/components/ui/slider';

import { useEffect, useState } from "react";
import { debounce } from "lodash"; // Install lodash if not already

function FilterSection({setBathCount,setBedCount,setParkingCount,setHomeType,handleSearchClick,setCity,setProvince,priceRange, setPriceRange,city,bathCount, bedCount, parkingCount, homeType, province}) {
  const [minPrice, setMinPrice] = React.useState(0);
const [maxPrice, setMaxPrice] = React.useState(10000000);
const formatCurrency = (value) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)} Lac`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
  return value;
};

// Outside component (or inside useEffect/init block)
const debounceMin = debounce((val) => {
  setMinPrice(val);
  setPriceRange(`${val}-${maxPrice}`);
  syncSelect(val, maxPrice);
}, 300);

const debounceMax = debounce((val) => {
  setMaxPrice(val);
  setPriceRange(`${minPrice}-${val}`);
  syncSelect(minPrice, val);
}, 300);

const debounceSlider = debounce(([min, max]) => {
  setMinPrice(min);
  setMaxPrice(max);
  setPriceRange(`${min}-${max}`);
  syncSelect(min, max);
}, 300);

const syncSelect = (min, max) => {
  const rangeMap = {
    "0-100000": [0, 100000],
    "100000-500000": [100000, 500000],
    "500000-1000000": [500000, 1000000],
    "1000000-5000000": [1000000, 5000000],
    "5000000-9999999999": [5000000, 9999999999],
  };

  for (const [key, [rMin, rMax]] of Object.entries(rangeMap)) {
    if (min === rMin && max === rMax) {
      setPriceRange(key);
      return;
    }
  }

  // If custom range doesn't match predefined
  setPriceRange(`${min}-${max}`);
};


  return (
    <div>
<h4 className='text-sm text-slate-400'>Location Filter </h4>
<div className='px-3 py-2 gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full'>
  
      {/* City Filter */}
<Select value={city} onValueChange={setCity}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="City" />
  </SelectTrigger>
  <SelectContent>
  
    <SelectItem value="Peshawar">Peshawar</SelectItem>
    <SelectItem value="Islamabad">Islamabad</SelectItem>
    <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
    <SelectItem value="Lahore">Lahore</SelectItem>
    <SelectItem value="Faisalabad">Faisalabad</SelectItem>
    <SelectItem value="Karachi">Karachi</SelectItem>
  </SelectContent>
</Select>

{/* Province Filter */}
<Select value={province} onValueChange={setProvince}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Province" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</SelectItem>
    <SelectItem value="Islamabad Capital">Islamabad Capital</SelectItem>
    <SelectItem value="Punjab">Punjab</SelectItem>
    <SelectItem value="Sindh">Sindh</SelectItem>
    <SelectItem value="Balochistan">Balochistan</SelectItem>
  </SelectContent>
</Select>

    </div>

    <h4 className='text-sm text-slate-400'>Filter by Features  </h4>
    <div className='px-3 py-2 gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full'>

      {/* Bedrooms filter  */}

      <Select value={bedCount} onValueChange={setBedCount}>
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
        <BedDouble className='h-5 w-5 text-primary'/>4</h2>
    </SelectItem>
    <SelectItem value="5">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>5</h2>
    </SelectItem>
    <SelectItem value="6">
      <h2 className='flex gap-2 '>
        <BedDouble className='h-5 w-5 text-primary'/>5+</h2>
    </SelectItem>
    
    
  </SelectContent>
      </Select>

{/* bathrooms filter  */}

      <Select value={bathCount} onValueChange={setBathCount}>
  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Bathrooms" />
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
        <Bath className='h-5 w-5 text-primary'/>4</h2>
    </SelectItem>
    <SelectItem value="5">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>5</h2>
    </SelectItem>
    <SelectItem value="6">
      <h2 className='flex gap-2 '>
        <Bath className='h-5 w-5 text-primary'/>5+</h2>
    </SelectItem>
  </SelectContent>
      </Select>

{/* Parking Filter  */}

      <Select value={parkingCount} onValueChange={setParkingCount}>
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

  
{/* Property type filter */}
<Select value={homeType} onValueChange={setHomeType}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Property Type" />
  </SelectTrigger>
  <SelectContent>
    
    <SelectItem value="House">House</SelectItem>
    <SelectItem value="Flat">Flat</SelectItem>
    <SelectItem value="Upper Portion">Upper Portion</SelectItem>
    <SelectItem value="Lower Portion">Lower Portion</SelectItem>
    <SelectItem value="Farm House">Farm House</SelectItem>
    <SelectItem value="Penthouse">Penthouse</SelectItem>
    <SelectItem value="Apartment">Apartment</SelectItem>
    <SelectItem value="Business Area">Business Area</SelectItem>
    <SelectItem value="Rooms">Rooms</SelectItem>
  </SelectContent>
</Select>

      {/* <Select value={homeType ?? "Any"} onValueChange={(value) => value === "Any" ? setHomeType(null) : setHomeType(value)}>

  <SelectTrigger className=" w-full">
    <SelectValue placeholder="Property Type" />
  </SelectTrigger>
  <SelectContent>
  
    
    <SelectItem value="House">
      House
    </SelectItem>
    <SelectItem value="Flat">
      Flat
    </SelectItem>
    <SelectItem value="Upper Portion">
      Upper Portion
    </SelectItem>
    <SelectItem value="Lower Portion">
      Lower Portion
    </SelectItem>
    <SelectItem value="Farm House">
      Farm House
    </SelectItem>
    <SelectItem value="Penthouse">
      Penthouse
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
      </Select> */}

           

   


    </div>

    
   
    <h4 className='text-sm text-slate-400'>Filter by Price Range  </h4>
{/* Price Range Filter */}
<div className="w-full flex flex-col gap-3 px-3 py-2">
  <Label className="text-sm font-medium text-muted-foreground">Enter Amount</Label>

  <div className="flex flex-col sm:flex-row gap-3">
    {/* Min Price Input */}
    <div className="w-full md:w-[45%]">
      <Label htmlFor="minPrice" className="text-sm font-medium text-muted-foreground">Min Price</Label>
      <Input
        id="minPrice"
        aria-label="Minimum price"
        type="number"
        min={0}
        value={minPrice}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 0;
          if (val <= maxPrice) {
            setMinPrice(val);
            setPriceRange(`${val}-${maxPrice}`);
          }
        }}
        placeholder="Min Rs."
        className="w-full"
      />
    </div>

    {/* Max Price Input */}
    <div className="w-full md:w-[45%]">
      <Label htmlFor="maxPrice" className="text-sm font-medium text-muted-foreground">Max Price</Label>
      <Input
        id="maxPrice"
        aria-label="Maximum price"
        type="number"
        min={0}
        value={maxPrice}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 0;
          if (val >= minPrice) {
            setMaxPrice(val);
            setPriceRange(`${minPrice}-${val}`);
          }
        }}
        placeholder="Max Rs."
        className="w-full"
      />
    </div>
  </div>

  {/* Validation Message */}
  {minPrice > maxPrice && (
    <p className="text-red-500 text-xs text-center mt-1">
      Min price should not exceed Max price.
    </p>
  )}

  {/* Display Range */}
  <div className="text-sm text-muted-foreground text-center ">
    Rs. {formatCurrency(minPrice)} – Rs. {formatCurrency(maxPrice)}
  </div>

  {/* Reset Button */}
  <div className="flex justify-center ">
    <Button
      variant="outline"
      size="sm"
      className='w-full'
      onClick={() => {
        const defaultMin = 0;
        const defaultMax = 10000000;
        setMinPrice(defaultMin);
        setMaxPrice(defaultMax);
        setPriceRange(`${defaultMin}-${defaultMax}`);
        setCity("Any");
        setProvince("");
        setBedCount("");
        setBathCount("");
        setParkingCount("");
        setHomeType();
      }}
      
        >
      <PenIcon/>
      Reset
    </Button>
  </div>
</div>





{/* Search button  */}
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
