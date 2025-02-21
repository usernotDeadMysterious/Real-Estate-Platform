import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function AgentDetails({ listingDetail }) {
    const myimg = listingDetail?.profileImage || '/default.png';
    const ownerEmail = listingDetail?.createdBy; // Assuming this is the owner's email

    return (
        <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
            <div className="flex items-center gap-4">
                <Image
                    src={myimg}
                    alt="Profile Image"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-lg font-bold">{listingDetail?.fullName}</h2>
                    <h2 className="text-gray-500">{ownerEmail}</h2>
                </div>
            </div>

            {/* Pass only ownerEmail as a query parameter */}
            <Link href={`/contact-owner?email=${ownerEmail}`}>
                <Button>Send Message</Button>
            </Link>
        </div>
    );
}

export default AgentDetails;