"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function OwnerLayout({ children }) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    if (!isLoaded) return <p>Loading...</p>;
    if (!user) {
        router.push('/');
        return null;
    }

    return <>{children}</>;
}
