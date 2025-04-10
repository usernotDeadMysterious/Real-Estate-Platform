import { supabase } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { DessertIcon, Handshake, LocateFixed, LocateIcon, LocateOffIcon, MapIcon } from 'lucide-react';
function FeaturedAgencies() {
    const [agencies, setAgencies] = useState([]);
      const [loading, setLoading] = useState(true);
     // Fetch featured agencies
      const fetchAgencies = async () => {
        const { data, error } = await supabase.from('agencies').select('*');
        if (error) console.error('Error fetching agencies:', error.message);
        else {
          console.log('Fetched agencies:', data); // Debug log
        setAgencies(data);
        };
      };
      useEffect(() => {
          const fetchData = async () => {
            await Promise.all([fetchAgencies()]);
            setLoading(false);
          };
          fetchData();
        }, []);
      
        if (loading) return <p className="text-center text-gray-500">Loading agencies data...</p>;
  return (
    <div>
      {/* Agencies Section */}
            <section className=' hover:border-primary hover:border-2px hover:border-solid'>
            <div className='p-5 flex flex-col justify-center items-center mt-5 gap-3'>
                <div className='flex border-collapse border-solid w-full bg-green-100 border-2 rounded-lg pl-5 align-middle'>
                    <h2 className='text-2xl text-slate-800 font-serif font-bold mt-3 mb-3 '><Handshake className='inline'/> Featured Agencies  </h2>
                </div>
            </div>
      
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
                {agencies.map((agency) => (
                  <div
                    key={agency.id}
                    className=" shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200 "
                  >
                    
      
                    
                    <div className="flex flex-col items-center">
                      <Image
                        src={agency.logo || '/default-agency-logo.jpg'}
                        alt={agency.name}
                        width={75}
                        height={75}
                        className="rounded-xl object-contain border-2 border-blue-400"
                      />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <h3 className="text-xl font-semibold text-blue-800 mt-4">{agency.name}</h3>
                      <p className="text-md flex  gap-2 justify-center items-center w-full text-gray-600 mt-3 "> <LocateIcon className='inline'/> {agency.description || 'No description provided.'}</p>
                      <p className="text-md flex  w-full gap-2 justify-center items-center text-gray-600 mt-3 "><LocateFixed className='inline'/> {agency.location || 'Unknown'}</p>
                      </div>
                      
                  </div>
                ))}
              </div>
            </section>
    </div>
  )
}

export default FeaturedAgencies
