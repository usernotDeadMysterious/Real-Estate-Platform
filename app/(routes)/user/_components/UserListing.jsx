import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { BathIcon, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function UserListing() {
    const {user}=useUser();
    const [listing,setListing]=useState();
    const [selectedListing, setSelectedListing] = useState(null);
    useEffect(()=>{
        user&&getUserListing();
    },[])
    const getUserListing=async()=>{
        const {data,error}=await supabase
        .from('listing')
        .select(`*,listingImages(url,listing_id)`)
        .eq('createdBy',user?.primaryEmailAddress.emailAddress);
        console.log(data);
        setListing(data);

    }

    const handleDelete = async () => {
      if (!selectedListing || !selectedListing.id) {
          console.error("No listing selected for deletion.");
          return;
      }
  
      console.log("Attempting to delete listing with ID:", selectedListing.id);
  
      // Delete related images first
      const { error: imageError } = await supabase
          .from('listingImages')
          .delete()
          .eq('listing_id', selectedListing.id);
  
      if (imageError) {
          console.error("Error deleting listing images:", imageError.message || imageError);
          return;
      }
  
      console.log("Listing images deleted successfully.");
  
      // Now delete the listing
      const { error: listingError } = await supabase
          .from('listing')
          .delete()
          .eq('id', selectedListing.id);
  
      if (listingError) {
          console.error("Error deleting listing:", listingError.message || listingError);
          return;
      }
  
      console.log("Listing deleted successfully.");
  
      // Update the state by removing the deleted listing
      setListing((prevListing) => prevListing.filter(item => item.id !== selectedListing.id));
  
      // Reset selection
      setSelectedListing(null);
  };
  
  const convertToPakistaniUnits = (sqFt) => {
    if (sqFt >= 43560) {
      return `${(sqFt / 43560).toFixed(2)} Acre`;
    } else if (sqFt >= 5445) {
      return `${(sqFt / 5445).toFixed(2)} Kanal`;
    } else {
      return `${(sqFt / 272.25).toFixed(2)} Marla`;
    }
  };


    
  return (
    <div>
      <h2 className='font-bold text-2xl'>Manage your listing</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {listing&&listing.map((item)=>(
            <div  key={item.id}  
            className="relative hover:border p-3
            hover:border-primary cursor-pointer rounded-lg">
                <h2 className='bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1'>{item.active?'Published':'Draft'}</h2>
                <Image 
                  src={item?.listingImages[0]?item?.listingImages[0]?.url
                    :'placeholder.svg'
                  } 
                  width={800}
                  height={150}
                  className='rounded-lg object-cover h-[170px] w-full'
                  alt={`Listing ${item.id}`}
                />
              {/* )} */}
              <div className='flex mt-2 flex-col gap-2'>
                <h2 className='font-bold text-xl'>Rs. {item?.price?.toLocaleString('en-PK')} /-</h2>
                <h2 className='flex gap-2 text-sm text-gray-400'>
                  <MapPin className='h-4 w-4'/>
                  {item.address}</h2>
                  <div className='flex gap-2 mt-2 justify-between'>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                      <BedDouble className='h-4 w-4'/>
                      {item?.bedroom}
                    </h2>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                      <BathIcon className='h-4 w-4'/>
                      {item?.bathroom}
                    </h2>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                      <Ruler className='h-4 w-4'/>
                      {item?.area} Sq.ft
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                                      <Ruler className="h-4 w-4" />
                                      {convertToPakistaniUnits(item?.area)}
                                      </h2>
                  </div>
                  <div className='flex gap-2 justify-between'>
                  <Link href={'/view-listing/'+item.id}
                  className='w-full'>
                  <Button className='w-full' size='sm' variant='outline'>View</Button>
                  </Link>

                  <Link href={'/edit-listing/'+item.id}
                  className='w-full'>
                  <Button className='w-full' size='sm'>Edit</Button>
                  </Link>
                  
                  {/* <Button className='w-full' size='sm' variant='destructive'><Trash/>Delete</Button> */}

                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                    <Button className='w-full' size='sm' variant='destructive' onClick={() => setSelectedListing(item)}>
                                            <Trash className='h-4 w-4' /> Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. It will permanently delete this listing.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                  </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default UserListing
