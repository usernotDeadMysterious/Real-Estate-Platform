"use client";
import { Button } from '@/components/ui/button'
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Plus, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function JustAnotherNav() {
    const path = usePathname();
    const { user, isSignedIn } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
      <div className='p-3 h-[15vh] flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
        {/* Left Side */}
        <div className='flex gap-10 items-center'>
          <Link href={'/'}>
            <Image src={'/logo.svg'} width={230} height={100} alt='logo' />
          </Link>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex gap-20 text-nowrap'>
            <Link href={'/'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/' && 'text-primary'}`}>Home</li></Link>
            <Link href={'/for-sale'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/for-sale' && 'text-primary'}`}>For Sale</li></Link>
            <Link href={'/rent'}><li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/rent' && 'text-primary'}`}>For Rent</li></Link>
            <Link href={'/about-us'}>
            <li className={`hover:text-primary font-medium text-sm cursor-pointer ${path === '/about-us' && 'text-primary'}`}>About Us</li>
            </Link>

            
          </ul>
        </div>

        {/* Right Side */}
        <div className='hidden md:flex gap-6 items-center mr-10'>
          <Link href={'/add-new-listing'}>
            <Button className='flex gap-2'><Plus className='h-5 w-5'/>Post your Ad</Button>
          </Link>

          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image src={user?.imageUrl} width={35} height={35} alt='User Profile Image' className='rounded-full'/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={'/user'}>Profile</Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem><SignOutButton/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={'/sign-in'}>
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden flex flex-col gap-4">
            <Link href={'/'} className='p-2 rounded-lg bg-gray-100 text-primary hover:bg-gray-300' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href={'/for-sale'} className='p-2 rounded-lg bg-gray-100 text-primary hover:bg-gray-300' onClick={() => setMenuOpen(false)}>For Sale</Link>
            <Link href={'/rent'} className='p-2 rounded-lg bg-gray-100 text-primary hover:bg-gray-300' onClick={() => setMenuOpen(false)}>For Rent</Link>
            <Link href={'/about-us'} className='p-2 rounded-lg bg-gray-100 text-primary hover:bg-gray-300' onClick={() => setMenuOpen(false)}>About Us</Link>
            
            

            {isSignedIn ? (
              <>
                <Link href={'/user'} className='p-2 rounded-lg bg-gray-100 text-primary hover:bg-gray-300' onClick={() => setMenuOpen(false)}>Profile</Link>
                {/* <Link href={'/my-listings'} onClick={() => setMenuOpen(false)}>My Listing</Link> */}
                <Link href={'/add-new-listing'}  onClick={() => setMenuOpen(false)}>
              <Button className="w-full flex gap-2"><Plus className='h-5 w-5'/>Post your Ad</Button>
            </Link>
                <SignOutButton>
                  <Button variant="destructive" className="w-full">Log Out</Button>
                </SignOutButton>
              </>
            ) : (
              <Link href={'/sign-in'} onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            )}
            
            {/* Close Button */}
            <button 
              className="mt-2 p-2 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Close Menu
            </button>
          </div>
        )}
      </div>
    );
}

export default JustAnotherNav;
