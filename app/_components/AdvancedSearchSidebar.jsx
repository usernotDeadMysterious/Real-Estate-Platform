'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

const AdvancedSearchSidebar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    city: '',
    province_name: '',
    property_type: '',
    purpose: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    bedrooms: '',
    baths: '',
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        {/* Add a header with a title for accessibility */}
        <SheetHeader>
          <SheetTitle>Advanced Search</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <Select onValueChange={(val) => handleChange('property_type', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Flat">Flat</SelectItem>
              <SelectItem value="House">House</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => handleChange('purpose', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="City"
            onChange={(e) => handleChange('city', e.target.value)}
          />
          <Input
            placeholder="Province"
            onChange={(e) => handleChange('province_name', e.target.value)}
          />

          <div className="flex gap-2">
            <Input
              placeholder="Min Price"
              type="number"
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <Input
              placeholder="Max Price"
              type="number"
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Min Area (Marla)"
              type="number"
              onChange={(e) => handleChange('minArea', e.target.value)}
            />
            <Input
              placeholder="Max Area (Marla)"
              type="number"
              onChange={(e) => handleChange('maxArea', e.target.value)}
            />
          </div>

          <Select onValueChange={(val) => handleChange('bedrooms', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => handleChange('baths', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedSearchSidebar;
