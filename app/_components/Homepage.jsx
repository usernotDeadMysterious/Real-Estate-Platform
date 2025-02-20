import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'

function Homepage() {
  return (
    <div>
      <div className="pt-0 min-h-screen flex flex-col items-center justify-center">
      {/* <header className="w-full py-4 bg-white shadow-md flex justify-center">
        <h1 className="text-2xl font-bold">Pak Properties</h1>
      </header> */}
      
      <main className="flex flex-col items-center justify-center flex-1 w-full p-2 mb-8 ">
        
        <Image src="/home5.jpg" alt="Home" width={500} height={300} className=" rounded-lg shadow-lg w-[85vw] h-[50vh] xl:w-[65vw]" />
        <h2 className="text-center text-3xl font-bold mt-4">Find Your Dream Home with us</h2>
        <p className="text-gray-600 mt-2 text-center text-lg">Effortlessly explore thousands of listings across Pakistan to find the perfect home for you and your family—all from the comfort of your home.</p>
        
        
        
        <div className='grid grid-cols-2 gap-5'>
        <Link href={'/for-sale'}>
        <Button 
        variant="outline"
        className="mt-4">For Sale</Button>
        </Link>
        <Link href={'/rent'}>
        <Button 
        variant='outline'
        className="mt-4">For Rent</Button>
        </Link>
        </div>
      </main>
      
      <Footer/>
    </div>
    </div>
  )
}

export default Homepage
