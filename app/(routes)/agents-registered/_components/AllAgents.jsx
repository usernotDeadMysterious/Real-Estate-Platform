'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    const { data, error } = await supabase.from('agents').select('*');

    if (error) {
      console.error('Error fetching agents:', error.message);
    } else {
      setAgents(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading agents...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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
              <div>
              <Image
                src={agent.profile_pic || '/default-agent.jpg'}
                alt={agent.fullname}
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-green-400"
              />
              </div>
              <div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {agent.fullname}
              </h3>
              <p className="text-sm text-gray-600">{agent.email}</p>
              <p className="text-sm text-gray-600">📞 {agent.contactinfo}</p>
              </div>
            </div>
            <div className="mt-3 text-gray-700 text-sm">
              <strong>Total Posts : {agent.totalposts}</strong> <br />
              For Sale: {agent.posts_for_sale || 'No postings yet'} | For Rent: {agent.posts_for_rent || 'No postings yet.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAgents;
