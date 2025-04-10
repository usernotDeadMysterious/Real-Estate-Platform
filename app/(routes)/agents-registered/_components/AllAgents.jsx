'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';
import { Clipboard } from 'lucide-react';

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch agents
  const fetchAgents = async () => {
    const { data, error } = await supabase.from('agents').select('*');
    if (error) console.error('Error fetching agents:', error.message);
    else setAgents(data);
  };

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
      await Promise.all([fetchAgents(), fetchAgencies()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading agents and agencies...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Agents Section */}
      <section>
        <h2 className="mt-5 text-3xl font-bold text-center text-slate-800 mb-6">
          Meet our Agents
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={agent.profile_pic || '/default-agent.jpg'}
                  alt={agent.fullname}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-green-400"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{agent.fullname}</h3>
                <p className="text-sm text-gray-600">{agent.email}</p>
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <Clipboard className="inline h-5 w-4 mr-1" /> 📞 {agent.contactinfo}
                </p>
              </div>
              <div className="mt-3 text-gray-700 text-sm">
                <strong>Total Posts: {agent.totalposts}</strong> <br />
                For Sale: {agent.posts_for_sale || 'No postings yet'} | For Rent: {agent.posts_for_rent || 'No postings yet.'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agencies Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Featured Agencies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-solid border-black">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className=" shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200 "
            >
              

              
              <div className="flex flex-col items-center">
                <Image
                  src={agency.logo || '/default-agency-logo.jpg'}
                  alt={agency.name}
                  width={100}
                  height={100}
                  className="rounded-xl object-contain border-2 border-blue-400"
                />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3 className="text-xl font-semibold text-blue-800 mt-4">{agency.name}</h3>
                <p className="text-sm text-gray-600 text-center">{agency.description || 'No description provided.'}</p>
                <p className="text-sm text-gray-600 mt-1">📍 {agency.location || 'Unknown'}</p>
                </div>
                
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllAgents;
