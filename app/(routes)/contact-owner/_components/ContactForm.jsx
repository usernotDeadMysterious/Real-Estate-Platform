"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function ContactForm() {
    const { user } = useUser();
    const searchParams = useSearchParams();

    // Get details from URL
    const ownerEmail = searchParams.get("email"); 
    const propertyTitle = searchParams.get("title") || "Unknown Property";
    const propertyLocation = searchParams.get("location") || "No location provided";
    const propertyPrice = searchParams.get("price") || "Price not available";

    const [message, setMessage] = useState("");
    const [buyerContact, setBuyerContact] = useState("");
    const [fullName, setFullName] = useState(user?.fullName || ""); // Autofill from Google
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(message.trim() === ""); // Disable if message is empty
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to send a message.");
            return;
        }

        const userEmail = user?.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            toast.error("Your email is missing. Please update your profile.");
            return;
        }

        // Create a conversationId (based on buyer & seller emails)
        const conversationId = `${userEmail}_${ownerEmail}`;

        const { error } = await supabase.from("messages").insert([
            {
                conversationId: conversationId,
                senderEmail: userEmail,
                receiverEmail: ownerEmail,
                senderName: fullName || user.fullName, // Use Google Name if empty
                buyerContact: buyerContact, // Send buyer's phone number
                message: message,
                propertyTitle: propertyTitle, 
                propertyLocation: propertyLocation, 
                propertyPrice: propertyPrice,
            },
        ]);

        if (error) {
            toast.error("Failed to send message: " + error.message);
        } else {
            toast.success("Message sent successfully!");
            setMessage(""); 
            setBuyerContact(""); 
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Contact Owner</h1>
            
            {/* Property Details */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text- sm text-gray-600">Description: <br /> {propertyTitle}</p>
                <br />

                <p className="text-sm text-gray-600">📍Location: <br />  {propertyLocation}</p>
                <br />
                <p className="text-sm text-gray-600">💰Price:  {propertyPrice}</p>
            </div>

            {ownerEmail && (
                <p className="text-gray-600 mb-2">You are messaging: {ownerEmail}</p>
            )}

            <form onSubmit={handleSubmit}>
                {/* Full Name Input (Optional) */}
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter your full name (Optional)"
                />

                {/* Buyer Contact Number */}
                <Input
                    type="tel"
                    value={buyerContact}
                    onChange={(e) => setBuyerContact(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter your phone number"
                    required
                />

                {/* Message Input */}
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    rows="4"
                    placeholder="Write your message here..."
                    required
                ></Textarea>

                {/* Send Button (Disabled until message is written) */}
                <Button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded"
                    disabled={isButtonDisabled}
                >
                    Send Message
                </Button>
            </form>
        </div>
    );
}

export default ContactForm;
