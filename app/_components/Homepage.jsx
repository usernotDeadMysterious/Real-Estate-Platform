"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { useUnreadMessages } from '../hooks/useUnreadMessages';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { HouseIcon, MailCheck } from 'lucide-react';
// import { useUnreadMessages2 } from '../hooks/useUnreadMessages2';
import { useUnreadMessagesPolling } from "../hooks/useUnreadMessagesPolling";
import GoogleMapSection from './GoogleMapSection';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { GoogleMap } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

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

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % backgroundImages.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }, []);
  
    
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
        //   .eq('type', type)
          .order('id', { ascending: false });
    
        if (data) {
          setListing(data);
          console.log(data);
        }
        if (error) {
          toast("Server Side Error");
        }
      };
      useEffect(() => {
        getLatestListing();
      }, []);
    //   useEffect(() => {
    //     getLatestListing();
    //     console.log(type);
    //   }, [type]);
    
    return (
        <>
        <div>
            {/* Notification Bar for Unread Messages */}
            {isLoaded && user && (
                <div className="fixed top-[20vh] right-4 bg-primary hover:bg-red-400 text-white text-sm font-medium rounded-full px-4 py-2 z-50 shadow-lg flex items-center gap-2">
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

            


            <div className="h-[80vh] flex flex-col items-center justify-center mt-5">
              
            <main
      className="flex flex-col items-center justify-center flex-1 w-full pt-4 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImages[current]})` }}
    >

                  
                    <div className='flex flex-col w-[80vw] p-2'>

                        <h2 className="text-center text-4xl font-bold font-serif text-slate-50 mt-4 drop-shadow-[8px_8px_6px_rgba(34,197,94,0.8)]">
                            Find Your Dream Home with Ease
                        </h2>
                        
                    </div>

                    <div className='grid grid-cols-2 gap-5 p-2'>
                        <Link href={'/for-sale'}>
                            <Button variant="outline" className="mt-4 bg-primary  text-slate-50">For Sale</Button>
                        </Link>
                        <Link href={'/rent'}>
                            <Button variant='outline' className="mt-4 bg-primary text-slate-50" >For Rent</Button>
                        </Link>
                    </div>
                </main>
            </div>

        </div>
        
        
        <div className='p-5 flex flex-col justify-center items-center mt-5'>
        <div className='flex border-collapse border-solid w-full border-black border-2 rounded-lg pl-5 align-middle'>
          <h2 className='text-2xl text-slate-800 font-serif font-bold mt-5 mb-5 '><HouseIcon className='inline'/> Registered Properties with us  </h2></div>
        <div className="h-[80vh] w-[95vw] flex flex-col items-center justify-center mt-5">
            
        {/* <GoogleMapSection listing={listing} coordinates={coordinates} /> */}
        
        <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
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
