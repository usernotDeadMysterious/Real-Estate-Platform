"use client";

import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function Messages() {
  const { user } = useUser();
  const [receivedMessages, setReceivedMessages] = useState([]); // Messages where user is the owner
  const [sentMessages, setSentMessages] = useState([]); // Messages where user is the sender
  const [replyText, setReplyText] = useState({}); // Store replies for each message

  useEffect(() => {
    fetchMessages();
  }, [user]);

  const fetchMessages = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const userEmail = user.primaryEmailAddress.emailAddress;

    // Fetch messages where user is the owner (receiver)
    const { data: received, error: receivedError } = await supabase
      .from("contactInfo")
      .select("*")
      .eq("ownerEmail", userEmail)
      .order("created_at", { ascending: false });

    // Fetch messages where user is the sender
    const { data: sent, error: sentError } = await supabase
      .from("contactInfo")
      .select("*")
      .eq("emailAddress", userEmail)
      .order("created_at", { ascending: false });

    if (receivedError || sentError) {
      console.error("Error fetching messages:", receivedError || sentError);
    } else {
      setReceivedMessages(received);
      setSentMessages(sent);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id) => {
    const replyMessage = replyText[id];

    if (!replyMessage) return;

    const { error } = await supabase
      .from("contactInfo")
      .update({ replyMessage })
      .eq("id", id);

    if (error) {
      console.error("Error sending reply:", error);
    } else {
      toast("Reply sent successfully!");
      setReplyText((prev) => ({ ...prev, [id]: "" })); // Clear reply input
      fetchMessages(); // Refresh messages
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-2xl text-gray-600 font-bold mb-4">
        Messages
      </h1>

      {/* Received Messages (User as Owner) */}
      <h2 className="text-xl font-semibold mt-6">Messages Received</h2>
      {receivedMessages.length === 0 ? (
        <p>No messages received.</p>
      ) : (
        receivedMessages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded my-2 bg-gray-100">
            <h2 className="text-gray-500 font-bold">From: {msg.fullNameuser}</h2>
            <p className="text-gray-500">Email: {msg.emailAddress}</p>
            <p>Message: {msg.usersMessage}</p>

            {/* Reply Section */}
            <Textarea
              value={replyText[msg.id] || ""}
              onChange={(e) => handleReplyChange(msg.id, e.target.value)}
              placeholder="Type your reply..."
              className="w-full p-2 border rounded mt-2"
            />
            <Button
              onClick={() => sendReply(msg.id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Send Reply
            </Button>

            {/* Show Reply if Exists */}
            {msg.replyMessage && (
              <p className="mt-2 p-2 border-l-4 border-green-500">
                <strong>Reply Sent:</strong> {msg.replyMessage}
              </p>
            )}
          </div>
        ))
      )}

      {/* Sent Messages (User as Sender) */}
      <h2 className="text-xl font-semibold mt-6">Messages Sent</h2>
      {sentMessages.length === 0 ? (
        <p>No messages sent.</p>
      ) : (
        sentMessages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded my-2 bg-white">
            <h2 className="text-gray-500 font-bold">
              Sent to: {msg.ownerEmail}
            </h2>
            <p>Message: {msg.usersMessage}</p>

            {/* Show Reply if Exists */}
            {msg.replyMessage ? (
              <p className="mt-2 p-2 border-l-4 border-green-500">
                <strong>Reply from Owner:</strong> {msg.replyMessage}
              </p>
            ) : (
              <p className="text-gray-400">No reply yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
