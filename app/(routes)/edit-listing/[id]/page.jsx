"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation"; // ✅ Use useParams()
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";
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


function Page() {
  const { id } = useParams(); // ✅ Correct way to access params
  const { user } = useUser();
  const router = useRouter();


  
  const [listing,setListing]= useState([]);
  const [images , setImages]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if (user) verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", id); // ✅ Use id from useParams()

    if (data){
      console.log(data);
      setListing(data[0]);
    }

    if (!data || data.length === 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", id) // ✅ Use id from useParams()
      .select();

    if (data) {
      console.log(data);
      toast("Listing Updated and Published");
      setLoading(false)
    }

    for(const image of images){
      setLoading(true)
      const file = image;
      const fileName=Date.now().toString();
      const fileExt=fileName.split('.').pop();
      const {data,error}=await supabase.storage
      .from('listingImages')
      .upload(`${fileName}`,file,{
        contentType:`image/${fileExt}`,
        upsert:false

      });
      if(error){
        setLoading(false);
        toast('Error while Uploading Images')
      }
      
      else{
        // console.log('data',data);
        toast('Images Uploaded')
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
        console.log("Inserting Image:", {
          url: imageUrl,
          listing_id: id,
        });
        
        
        const {data,error}=await supabase.from('listingImages')
        
        .insert([
          {
            url:imageUrl,listing_id:id
          }
        ])
        .select();
        if(data){
          setLoading(false);
        }
        if(error){
          setLoading(false)
        }

      }
      setLoading(false);

    }

  }
  const publishBtnHandler=async()=>{
    setLoading(true);
    const { data, error } = await supabase
    .from('listing')
    .update({ active: 'true' })
    .eq('id', id)
    .select()
        if (data){
          setLoading(false);
          toast('Listing published')
        }
  }

  return (
    <div className="px-10 md:px-30 my-10">
      <h2 className="font-bold text-2xl">
        Enter Some More Details About Your Listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          profileImage:user?.imageUrl,
          fullName:user?.fullName
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup 
                  defaultValue={listing?.type} 
                  onValueChange={(v) => (values.type = v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select onValueChange={(e) => (values.propertyType = e)} name="propertyType"
                  defaultValue={listing?.propertyType}
                    >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">Single Family House</SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input type="number" placeholder="Ex.2" name="bedroom" onChange={handleChange}
                  defaultValue={listing?.bedroom} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Input type="number" placeholder="Ex.2" name="bathroom" onChange={handleChange}
                  defaultValue={listing?.bathroom} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input type="number" placeholder="Ex.1900 Sq.ft" name="builtIn" onChange={handleChange}
                  defaultValue={listing?.builtIn} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input type="number" placeholder="Ex.2" name="parking" onChange={handleChange}
                  defaultValue={listing?.parking} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Lot Size</h2>
                  <Input type="number" placeholder="" name="lotSize" onChange={handleChange}
                  defaultValue={listing?.lotSize} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.1900" name="area" onChange={handleChange}
                  defaultValue={listing?.area} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Selling Price ($)</h2>
                  <Input type="number" placeholder="400000" name="price" onChange={handleChange}
                  defaultValue={listing?.price} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <Input type="number" placeholder="100" name="hoa" onChange={handleChange}
                  defaultValue={listing?.hoa} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <h2 className="text-gray-500">Description</h2>
                <Textarea placeholder="" name="description" onChange={handleChange} 
                defaultValue={listing?.description}/>
                
                
                
              </div>
              <div>
                <h2 className="font-lg text-gray-500 my-2">Upload Property Images</h2>
                <FileUpload 
                setImages={(value)=>setImages(value)}
                imageList={listing.listingImages}
                  />
              </div>
              <div className="flex gap-7 justify-end">
                
                <Button 
                disabled={loading} 
                variant="outline"
                 
                className="text-primary border-primary">
                  {loading?<Loader className='animate-spin'/>:"Save"}
                </Button>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button 
                      disabled={loading} 
                      type="button" 
                      className="">
                        {loading?<Loader className='animate-spin'/>:"Save & Publish"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you really want to publish the listing?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>publishBtnHandler()}>
                          {loading?<Loader className="animate-spin"/>:'Continue'}
                          </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Page;
