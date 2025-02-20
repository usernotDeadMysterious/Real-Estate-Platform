"use client";
import React from 'react'
import Header from './_components/Header'
import { LoadScript } from '@react-google-maps/api'
import JustAnotherNav from './_components/JustAnotherNav';
import Footer from './_components/Footer';
// import Navbar from './_components/Navbar';

function Provider({children}) {
  return (
    <div>
      <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
      libraries={['places']}>
        
        {/* <Header/> */}
        <JustAnotherNav/>

        {/* <Navbar/> */}
        <div className='mt-12'>
        {children}
        </div>
        <Footer/>
        </LoadScript>
    </div>
  )
}

export default Provider
Provider