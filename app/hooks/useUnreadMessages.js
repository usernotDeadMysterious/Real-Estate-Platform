"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export function useUnreadMessages() {
  const { user } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const fetchUnreadMessages = async () => {
      const { data, error } = await supabase
        .from("contactInfo")
        .select("*")
        .eq("ownerEmail", user.primaryEmailAddress.emailAddress)
        .eq("isRead", false);

      if (!error && data) {
        setUnreadCount(data.length);
      }
    };

    fetchUnreadMessages();
  }, [user]);

  return unreadCount;
}
