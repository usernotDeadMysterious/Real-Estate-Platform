"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OwnerLayout({ children }) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/");  // ✅ This now runs AFTER the component renders
        }
    }, [isLoaded, user, router]);

    if (!isLoaded) return <p>Loading...</p>;
    if (!user) return null; // Prevent rendering while redirecting

    return <>{children}</>;
}
