'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

const AgentDetails = ({ agentId }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        // .eq('id', agentId)
        // .single();
        // .single();

      if (error) {
        console.error('Error fetching agent:', error);
      } else {
        setAgent(data);
      }

      setLoading(false);
    };

    if (agentId) {
      fetchAgentDetails();
    }
  }, [agentId]);

  if (loading) return <p className="text-center text-gray-500">Loading agent details...</p>;

  if (!agent) return <p className="text-center text-red-500">Agent not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-5">
      <div className="flex items-center gap-6">
        <Image
          src={agent.image_url || '/default-agent.jpg'}
          alt={agent.name}
          width={120}
          height={120}
          className="rounded-full object-cover border border-green-400"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{agent.email}</p>
          <p className="text-sm text-gray-600">📞 {agent.phone}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">About</h3>
        <p className="text-gray-600 mt-1">{agent.bio || 'No biography available.'}</p>
      </div>
    </div>
  );
};

export default AgentDetails;
