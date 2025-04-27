import { supabase } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { DessertIcon, Handshake, LocateFixed, LocateIcon, LocateOffIcon, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      
        if (loading) return <p className="text-center text-gray-500 ">Loading agencies data...</p>;
  return (
    <div className=''>
      

      {/* Agencies Section */}
            <section className=' hover:border-primary hover:border-2px hover:border-solid'>
            <div className='p-5 flex flex-col justify-center items-center mt-5 gap-3'>
                <div className='flex border-collapse border-solid w-full bg-green-100 border-2 rounded-lg pl-5 align-middle'>
                    <h2 className='text-xl text-green-600 font-serif mt-3 mb-3   '><Handshake className='inline'/> Featured Agencies  </h2>
                </div>
            </div>
      
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-6 ">
                {agencies.map((agency) => (
                  <div
                    key={agency.id}
                    className="shadow-md rounded-xl p-4 hover:shadow-lg hover:border-green-500 hover:border-solid-2px hover:border-[1px] transition-all duration-200"
                  >
                    
      
                    
                    <div className="flex flex-row items-center gap-1">
    {/* Logo - 1/3 */}
    <div className="w-1/3 flex justify-center">
      <Image
        src={agency.logo || '/default-agency-logo.jpg'}
        alt={agency.name}
        width={75}
        height={75}
        className=" rounded-xl object-contain border-2 border-green-400"
      />
    </div>

    {/* Details - 2/3 */}
    <div className="w-2/3 flex flex-col items-start">
      <span className="text-md font-semibold text-green-800">{agency.name}</span>
      <span className="text-sm flex gap-2  text-green-600 ">
        
        {agency.description || 'No description provided.'}
      </span>
      <span className="text-sm flex gap-2 items-center text-green-500 mt-2">
        <LocateFixed className="inline" />
        {agency.location || 'Unknown'}
      </span>
    </div>
  </div>
                      
                  </div>
                ))}
              </div>
            </section>
    </div>
  )
}

export default FeaturedAgencies
