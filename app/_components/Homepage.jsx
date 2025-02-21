"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUnreadMessages } from '../hooks/useUnreadMessages';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { MailCheck } from 'lucide-react';

function Homepage() {
    const unreadCount = useUnreadMessages();
    const { user, isLoaded } = useUser();
    console.log("User:", user);
    return (
        <div>
            {/* Notification Bar for Unread Messages */}
            {isLoaded && user && (
                <div className="fixed top-[20vh] right-4 bg-primary hover:bg-red-400 text-white text-sm font-medium rounded-full px-4 py-2 z-50 shadow-lg flex items-center gap-2">
                    <Link href="/owner/messages" className="cursor-pointer flex items-center gap-2">
                        <Image
                            src={user.imageUrl || "/default-avatar.png"} // Fallback image if user image is missing
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
            )}

            


            <div className="min-h-screen flex flex-col items-center justify-center">
              
                <main className="flex flex-col items-center justify-center flex-1 w-full pt-4 bg-[url('/home6hd.jpg')] bg-cover bg-center bg-no-repeat">

                  
                    <div className='flex flex-col w-[80vw] p-2'>

                        <h2 className="text-center text-4xl font-bold font-serif text-slate-50 mt-4">
                            Find Your Dream Home with us
                        </h2>
                        <p className="text-slate-100 mt-4 text-center text-xl font-sans">
                            Effortlessly explore thousands of listings across Pakistan to find the perfect home for you and your family—all from the comfort of your home.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-5 p-2'>
                        <Link href={'/for-sale'}>
                            <Button variant="outline" className="mt-4">For Sale</Button>
                        </Link>
                        <Link href={'/rent'}>
                            <Button variant='outline' className="mt-4">For Rent</Button>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Homepage;
