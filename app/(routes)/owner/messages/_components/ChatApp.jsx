"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function ChatApp() {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState("");
  
  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.conversationId);
      const subscription = supabase
        .channel("realtime:messages")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
          if (payload.new.conversationId === selectedConversation.conversationId) {
            setMessages((prev) => [...prev, payload.new]);
          }
        })
        .subscribe();
      return () => supabase.removeChannel(subscription);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    const { data, error } = await supabase
      .from("messages")
      .select("conversationId, senderEmail, receiverEmail, propertyTitle, propertyLocation, propertyPrice, created_at")
      .or(`senderEmail.eq.${userEmail},receiverEmail.eq.${userEmail}`)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching conversations:", error);
    else setConversations(data);
  };

  const fetchMessages = async (conversationId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversationId", conversationId)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data);
  };

  const sendReply = async () => {
    if (!replyText || !selectedConversation) return;

    const { error } = await supabase.from("messages").insert({
      conversationId: selectedConversation.conversationId,
      senderEmail: user.primaryEmailAddress.emailAddress,
      receiverEmail:
        selectedConversation.senderEmail === user.primaryEmailAddress.emailAddress
          ? selectedConversation.receiverEmail
          : selectedConversation.senderEmail,
      message: replyText,
      senderName: user.fullName,
    });

    if (error) console.error("Error sending reply:", error);
    else {
      setReplyText("");
      toast("Reply sent successfully!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div className="w-1/3 border-r overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {conversations.map((conv) => (
          <div
            key={conv.conversationId}
            className={`p-3 border-b cursor-pointer ${selectedConversation?.conversationId === conv.conversationId ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedConversation(conv)}
          >
            <h3 className="font-semibold">{conv.propertyTitle}</h3>
            <p className="text-sm text-gray-500">{conv.propertyLocation} - ${conv.propertyPrice}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Property Info */}
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="text-lg font-bold">{selectedConversation.propertyTitle}</h3>
              <p className="text-sm text-gray-600">
                {selectedConversation.propertyLocation} - ${selectedConversation.propertyPrice}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.senderEmail === user.primaryEmailAddress.emailAddress ? "text-right" : "text-left"}`}>
                  <div className={`inline-block p-2 rounded-lg ${msg.senderEmail === user.primaryEmailAddress.emailAddress ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t flex gap-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
              />
              <Button onClick={sendReply} className="bg-green-500 text-white px-3 py-1 rounded">
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Select a conversation</div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
