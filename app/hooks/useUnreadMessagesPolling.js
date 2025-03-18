"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export function useUnreadMessagesPolling() {
  const { user } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadMessages = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("receiverEmail", user.primaryEmailAddress.emailAddress)
      .eq("isRead", false); // Ensure it's a boolean

    if (error) {
      console.error("Error fetching unread messages:", error.message);
      return;
    }

    setUnreadCount(data.length);
  };

  useEffect(() => {
    if (user) {
      fetchUnreadMessages();
      const interval = setInterval(fetchUnreadMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return unreadCount;
}
