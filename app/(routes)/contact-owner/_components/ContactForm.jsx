"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function ContactForm() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const ownerEmail = searchParams.get('email'); // Get from URL
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            toast.error("You must be logged in to send a message.");
            return;
        }
    
        const { error } = await supabase.from('contactInfo').insert([
            {
                fullNameuser: fullName,
                emailAddress: user?.primaryEmailAddress?.emailAddress,
                usersMessage: message,
                ownerEmail: listingDetail?.createdBy,  // Pass the owner's email
            },
        ]);
    
        if (error) {
            toast.error("Failed to send message:", error.message);
        } else {
            toast.success("Message sent successfully!");
            setFullName('');
            setMessage('');
        }
    };
    

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Contact Owner</h1>
            {ownerEmail && (
                <p className="text-gray-600 mb-2">You are messaging: {ownerEmail}</p>
            )}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    rows="4"
                    placeholder="Write your message here..."
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
