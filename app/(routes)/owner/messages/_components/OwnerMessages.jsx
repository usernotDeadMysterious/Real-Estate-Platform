"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function OwnerMessages() {
  const { user } = useUser();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const userEmail = user.primaryEmailAddress.emailAddress;

    // Fetch messages where the user is the seller
    const { data: receivedData, error: receivedError } = await supabase
      .from("contactInfo")
      .select("*")
      .eq("ownerEmail", userEmail)
      .order("created_at", { ascending: false });

    if (receivedError) {
      console.error("Failed to fetch received messages:", receivedError.message);
    } else {
      setReceivedMessages(receivedData);
    }

    // Fetch messages where the user is the buyer
    const { data: sentData, error: sentError } = await supabase
      .from("contactInfo")
      .select("*")
      .eq("emailAddress", userEmail)
      .order("created_at", { ascending: false });

    if (sentError) {
      console.error("Failed to fetch sent messages:", sentError.message);
    } else {
      setSentMessages(sentData);
    }
  };

  const markAsRead = async (id) => {
    const { error } = await supabase.from("contactInfo").update({ isRead: true }).eq("id", id);
    if (error) {
      toast("Error updating message:", error);
    } else {
      setReceivedMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
      toast("Marked as Read");
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id) => {
    const replyMessage = replyText[id];
    if (!replyMessage) return;

    const { error } = await supabase.from("contactInfo").update({ replyMessage }).eq("id", id);
    if (error) {
      console.error("Error sending reply:", error);
    } else {
      toast("Reply sent successfully!");
      setReplyText((prev) => ({ ...prev, [id]: "" }));
      fetchMessages();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Messages from Buyers */}
      <h1 className="mt-10 text-2xl text-gray-700 font-bold mb-4">📩 Messages from Buyers</h1>
      {receivedMessages.length === 0 ? (
        <p className="text-gray-500">No messages from buyers yet. Messages will appear here when a buyer contacts you.</p>
      ) : (
        receivedMessages.map((msg) => (
          <div key={msg.id} className={`p-4 border rounded my-2 shadow-sm ${msg.isRead ? "bg-white" : "bg-gray-100"}`}>
            <h2 className="text-gray-600 font-bold">From: {msg.fullNameuser}</h2>
            <p className="text-sm text-gray-500">Email: {msg.emailAddress}</p>
            <p className="mt-2">📝 {msg.usersMessage}</p>

            {!msg.isRead && (
              <Button onClick={() => markAsRead(msg.id)} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded float-right">
                Mark as Read
              </Button>
            )}

            <div className="clear-both"></div>

            {/* Reply Section */}
            <button
              onClick={() => setExpandedReplies((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))}
              className="mt-3 text-blue-600 hover:underline text-sm"
            >
              {expandedReplies[msg.id] ? "Hide Reply" : "Reply to this Message"}
            </button>

            {expandedReplies[msg.id] && (
              <div className="mt-3">
                <Textarea
                  value={replyText[msg.id] || ""}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full p-2 border rounded"
                />
                <Button onClick={() => sendReply(msg.id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                  Send Reply
                </Button>
              </div>
            )}

            {msg.replyMessage && (
              <p className="mt-2 p-2 border-l-4 border-green-500 bg-green-100 text-green-700">
                <strong>✅ Reply Sent:</strong> {msg.replyMessage}
              </p>
            )}
          </div>
        ))
      )}

      {/* Seller Replies (Messages Sent by Buyer) */}
      <h1 className="mt-10 text-2xl text-gray-700 font-bold mb-4">📨 Seller Replies</h1>
      {sentMessages.length === 0 ? (
        <p className="text-gray-500">You haven't contacted any seller yet. Your messages and their replies will appear here.</p>
      ) : (
        sentMessages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded my-2 bg-gray-100 shadow-sm">
            <h2 className="text-gray-600 font-bold">To: {msg.ownerEmail}</h2>
            <p className="mt-2">📝 {msg.usersMessage}</p>
            {msg.replyMessage && (
              <p className="mt-2 p-2 border-l-4 border-blue-500 bg-blue-100 text-blue-700">
                <strong>💬 Reply Received:</strong> {msg.replyMessage}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default OwnerMessages;
