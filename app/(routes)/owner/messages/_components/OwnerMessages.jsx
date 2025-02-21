"use client";

import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function OwnerMessages() {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user?.primaryEmailAddress?.emailAddress) return;

            const { data, error } = await supabase
                .from('contactInfo')
                .select('*')
                .eq('ownerEmail', user.primaryEmailAddress.emailAddress);

            if (error) {
                console.error("Failed to fetch messages:", error.message);
            } else {
                setMessages(data);
            }
        };

        fetchMessages();
    }, [user]);

    return (
        <div>
            <h1 className="mt-10 text-2xl text-gray-600 font-bold mb-4">Received Messages</h1>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                messages.map((msg) => (
                    <div key={msg.id} className="p-4 border rounded my-2">
                        <h2 className="text-gray-500 font-bold">From: </h2>
                        <h2 className="text-gray-500 font-bold pt-2">{msg.fullNameuser}</h2>
                        <p className="text-gray-500 font-bold">Email: {msg.emailAddress}</p>
                        <p>Message: {msg.usersMessage}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default OwnerMessages;
