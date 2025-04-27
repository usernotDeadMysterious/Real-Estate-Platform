"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { HomeIcon, HouseIcon, MailCheck } from 'lucide-react';

import { useUnreadMessagesPolling } from "../hooks/useUnreadMessagesPolling";
// import GoogleMapSection from './GoogleMapSection';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { GoogleMap } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';
import FeaturedAgencies from './FeaturedAgencies';
import { toast, Toaster } from 'sonner';

function Homepage() {
    // const unreadCount = useUnreadMessages2();
    const unreadCount = useUnreadMessagesPolling()
    const [coordinates, setCoordinates] = useState();;
    const [listing, setListing] = useState([]);
    const { user, isLoaded } = useUser();
    const backgroundImages = [
      "/background1.jpg",
      "/background2.jpg",
      "/background3.jpg",
      "/background4.jpg",
      "/background5.jpg",
      "/background6.jpg",
      "/background7.jpg"
    ];
    const [current, setCurrent] = useState(0);
    const [isReversing, setIsReversing] = useState(false);

    useEffect(() => {
      let timeout;
  
      if (!isReversing) {
        if (current < backgroundImages.length - 1) {
          timeout = setTimeout(() => {
            setCurrent((prev) => prev + 1);
          }, 5500); // normal swipe delay
        } else {
          // Pause on last image, then reverse
          timeout = setTimeout(() => {
            setIsReversing(true);
          }, 5000); // wait 3s before reversing
        }
      } else {
        // Reverse to first image quickly (2s total, 500ms per step)
        if (current > 0) {
          timeout = setTimeout(() => {
            setCurrent((prev) => prev - 1);
          }, 5000);
        } else {
          setIsReversing(false); // restart loop
        }
      }
  
      return () => clearTimeout(timeout);
    }, [current, isReversing]);
  
    
    // const [type, setType] = useState(); 
    const [center,setCenter ] = useState({
        lat:  33.6844, // Latitude of Pakistan
      lng: 73.0479,
      })
    console.log("User:", user);
    console.log("Unread count:", unreadCount);
    const containerStyle = {
        width: '100%',
        height: '80vh',
        borderRadius:10
      }
    useEffect(()=>{
            coordinates&&setCenter(coordinates)
          },[coordinates])
        
    const getLatestListing = async () => {
        const { data, error } = await supabase
          .from('listing')
          .select(`*,listingImages(
            url,
            listing_id
          )`)
          .eq('active', true)
        
          .order('id', { ascending: true })
          .limit(100);
          ;

    
        if (data) {
          setListing(data);
          // console.log(data);
        }
        if (error) {
          toast("Server Side Error");
        }
      };
      useEffect(() => {
        getLatestListing();
      }, []);
    
    
    return (
        <>
        <div>
            {/* Notification Bar for Unread Messages */}
            {isLoaded && user && (
                <div className="fixed top-[20vh] right-4 bg-green-500 hover:bg-green-700 text-white text-sm font-medium rounded-full px-4 py-2 z-50 shadow-lg flex items-center gap-2">
                    <Link href="/owner/messages" className="cursor-pointer flex items-center gap-2">
                        <Image
                            src={user.imageUrl || "/default-avatar.png"} // Fallback image if user image is missing
                            alt="User Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h2 className="text-lg flex items-center gap-1">
                            <MailCheck />
                            {unreadCount}
                        </h2>
                    </Link>
                </div>
            )}

            


            <div className="relative w-full h-[90vh] overflow-hidden">
  {/* Sliding Background Images */}
  <div className="absolute inset-0 flex transition-transform duration-3000 ease-in-out"
       style={{
         transform: `translateX(-${current * 100}%)`
       }}>
    {backgroundImages.map((img, index) => (
      <div
        key={index}
        className="w-full  h-screen bg-cover bg-center bg-no-repeat flex-shrink-0"
        style={{ backgroundImage: `url(${img})` }}
      />
    ))}
  </div>
              
            <main className="relative  flex flex-col items-center justify-center h-full w-full ">
  
    

                  
                    <div className=' flex flex-col  p-2 '>

                    <h2 className="  text-center p-1 text-3xl font-serif font-semibold text-green-100  drop-shadow-[8px_8px_8px_rgba(34,197,94,0.8)]">
                      <span className="typing-loop">Find Your Dream Home</span>
                    </h2>
                    

                        
                    </div>

                    <div className='grid grid-cols-2 gap-3 p-1'>
                        <Link href={'/for-sale'}>
                            <Button variant="outline" className="mt-4 bg-green-100 text-primary  text-md">For Sale</Button>
                        </Link>
                        <Link href={'/rent'}>
                            <Button variant='outline' className="mt-4 bg-green-100 text-primary  text-md" >For Rent</Button>
                        </Link>
                    </div>
                    
                    
                </main>
                {/* Div to for showing something  */}
                {/* <div className='grid grid-cols-3 absolute bottom-10 left-10 bg-white 
                    '>
                  <h3>HEllo </h3>
                  <h3>HEllo </h3>
                  <h3>HEllo </h3>
                  <h3>HEllo </h3>
                </div> */}
            </div>

        </div>
        
        <FeaturedAgencies/>


        {/* Registered Properties Locations on Map */}
        <div className='p-5 flex flex-col justify-center items-center mt-5'>
        <div className='flex border-collapse border-solid w-full bg-green-100 border-2 rounded-lg pl-5  items-center'>
          <h2 className='text-xl text-green-600 font-serif mt-3 mb-3  '><HomeIcon className='inline'/> Registered Properties with us  </h2></div>
        <div className="h-[80vh] sm:w-full md:w-[90vw] flex flex-col items-center justify-center mt-5">
            
        
        
        <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onload}
    //   onUnmount={onUnmount}
      gestureHandling='greedy'
    >
      {/* Child components, such as markers, info windows, etc. */}
      {listing.map((item,index)=>(
        <MarkerItem
        key={index}
        item={item}
        />
      ))}
    </GoogleMap>
        </div> 
        </div>

        
        
        
        </>
    );
}

export default Homepage;
