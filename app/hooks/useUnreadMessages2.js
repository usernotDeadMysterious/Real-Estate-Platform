"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

// Hook: Fetch unread messages (Second variant)
export function useUnreadMessages2() {
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

      if (error) console.error("Error fetching unread messages:", error);
      if (data) setUnreadCount(data.length);
    };

    fetchUnreadMessages();

    // Realtime subscription for new messages
    const subscription = supabase
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contactInfo' },
        fetchUnreadMessages
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [user]);

  return unreadCount;
}

// Component: Display unread messages (Second variant)
export function UnreadMessagesAlert() {
  const unreadCount = useUnreadMessages2();
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user || unreadCount === 0) return null;

  return (
    <div className="fixed top-[25vh] right-4 bg-green-500 hover:bg-green-700 text-white text-sm font-medium rounded-full px-4 py-2 z-50 shadow-lg flex items-center gap-2">
      <Link href="/owner/messages" className="cursor-pointer flex items-center gap-2">
        <Image
          src={user.imageUrl || "/default-avatar.png"}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h2 className="text-lg flex items-center gap-1">
          <MailCheck />
          {unreadCount}
        </h2>
      </Link>
    </div>
  );
}
