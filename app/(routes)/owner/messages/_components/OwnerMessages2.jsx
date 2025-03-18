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

function OwnerMessages2() {
  const { user } = useUser();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    if (user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Polling for real-time updates
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    const userEmail = user.primaryEmailAddress.emailAddress;

    // Fetch messages where the user is the seller (received messages)
    const { data: receivedData, error: receivedError } = await supabase
      .from("messages")
      .select("*")
      .eq("receiverEmail", userEmail)
      .order("created_at", { ascending: false });

    if (receivedError) {
      console.error("Failed to fetch received messages:", receivedError.message);
    } else {
      setReceivedMessages(receivedData);
    }

    // Fetch messages where the user is the buyer (sent messages)
    const { data: sentData, error: sentError } = await supabase
      .from("messages")
      .select("*")
      .eq("senderEmail", userEmail)
      .order("created_at", { ascending: false });

    if (sentError) {
      console.error("Failed to fetch sent messages:", sentError.message);
    } else {
      setSentMessages(sentData);
    }
  };

  const markAsRead = async (id) => {
    if (!id) {
      console.error("Error: ID is undefined.");
      return;
    }
  
    const { error } = await supabase
      .from("messages") // Ensure the correct table name
      .update({ isRead: true }) // Ensure this column exists
      .eq("id", id);
  
    if (error) {
      console.error("Error updating message:", error);
    } else {
      setReceivedMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
    //   toast("Marked as Read");
    }
  };
  

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (conversationId) => {
    const replyMessage = replyText[conversationId];
    if (!replyMessage) return;

    const { error } = await supabase.from("messages").insert({
      conversationId,
      senderEmail: user.primaryEmailAddress.emailAddress,
      receiverEmail: receivedMessages.find((msg) => msg.conversationId === conversationId)?.senderEmail,
      message: replyMessage,
      senderName: user.fullName,
      isRead:false,
    });

    if (error) {
      console.error("Error sending reply:", error);
    } else {
      toast("Reply sent successfully!");
      setReplyText((prev) => ({ ...prev, [conversationId]: "" }));
      fetchMessages();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Messages from Buyers */}
      <h1 className="mt-10 text-2xl text-gray-700 font-bold mb-4">📩 Messages from Buyers</h1>
      {receivedMessages.length === 0 ? (
        <p className="text-gray-500">No messages from buyers yet.</p>
      ) : (
        receivedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 border rounded my-2 shadow-sm ${msg.isRead ? "bg-white" : "bg-gray-100"}`}
            onMouseEnter={() => markAsRead(msg.id)}
          >
            <h2 className="text-gray-600 font-bold">From: {msg.senderName}</h2>
            <p className="text-sm text-gray-500">Email: {msg.senderEmail}</p>
            <p className="mt-2">📝 {msg.message}</p>

            {/* Reply Section */}
            <button
              onClick={() => setExpandedReplies((prev) => ({ ...prev, [msg.conversationId]: !prev[msg.conversationId] }))}
              className="mt-3 text-blue-600 hover:underline text-sm"
            >
              {expandedReplies[msg.conversationId] ? "Hide Reply" : "Reply to this Message"}
            </button>

            {expandedReplies[msg.conversationId] && (
              <div className="mt-3">
                <Textarea
                  value={replyText[msg.conversationId] || ""}
                  onChange={(e) => handleReplyChange(msg.conversationId, e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full p-2 border rounded"
                />
                <Button onClick={() => sendReply(msg.conversationId)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                  Send Reply
                </Button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Sent Messages */}
      <h1 className="mt-10 text-2xl text-gray-700 font-bold mb-4">📨 Your Sent Messages</h1>
      {sentMessages.length === 0 ? (
        <p className="text-gray-500">You haven't contacted any seller yet.</p>
      ) : (
        sentMessages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded my-2 bg-gray-100 shadow-sm">
            <h2 className="text-gray-600 font-bold">To: {msg.receiverEmail}</h2>
            <p className="mt-2">📝 {msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OwnerMessages2;
