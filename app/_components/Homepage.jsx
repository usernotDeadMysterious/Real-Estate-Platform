import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Footer from './Footer'

function Homepage() {
  return (
    <div>
      <div className=" min-h-screen flex flex-col items-center justify-center bg-">
      {/* <header className="w-full py-4 bg-white shadow-md flex justify-center">
        <h1 className="text-2xl font-bold">Pak Properties</h1>
      </header> */}
      
      <main className="flex flex-col items-center justify-center flex-1 w-full  pt-4  bg-[url('/home6hd.jpg')] bg-cover bg-center bg-no-repeat">
        
        {/* <Image src="/home5.jpg" alt="Home" width={500} height={300} className=" rounded-lg shadow-lg w-[85vw] h-[45vh] xl:w-[65vw]" /> */}
        <div className='flex flex-col w-[80vw] p-2'>
        <h2 className="text-center text-4xl font-bold font-serif text-slate-50 mt-4">Find Your Dream Home with us</h2>
        <p className="flex text-slate-100 mt-4 text-center text-xl font-sans ">Effortlessly explore thousands of listings across Pakistan to find the perfect home for you and your family—all from the comfort of your home.</p>
        </div>
        
        <div className='grid grid-cols-2 gap-5 p-2'>
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
      
      
    </div>
    </div>
  )
}

export default Homepage
