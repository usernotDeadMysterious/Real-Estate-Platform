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
import * as Yup from 'yup';

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
// import AdditionalDetailsForm from "../_components/AdditionalDetailsForm";

import AdditionalDetailsForm from "../_components/AdditionalDetailsForm";


function Page() {
  const { id } = useParams(); // ✅ Correct way to access params
  const { user } = useUser();
  const router = useRouter();

  const [isFormValid, setIsFormValid] = useState(false);
  
  const [listing,setListing]= useState([]);
  const [images , setImages]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if (user) verifyUserRecord();
  }, [user]);
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    propertyType: Yup.string().required("Property type is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    bedroom: Yup.number().when('propertyType', {
      is: (value) => value !== 'Room', 
      then: Yup.number().required("Bedroom is required")
    }),
    bathroom: Yup.number().when('propertyType', {
      is: (value) => value !== 'Room', 
      then: Yup.number().required("Bathroom is required")
    }),
    builtIn: Yup.number().when('propertyType', {
      is: (value) => value !== 'Room', 
      then: Yup.number().required("Built-in area is required")
    }),
    parking: Yup.number().when('propertyType', {
      is: (value) => value !== 'Room', 
      then: Yup.number().required("Parking is required")
    }),
    area: Yup.number().when('propertyType', {
      is: (value) => value !== 'Room', 
      then: Yup.number().required("Area is required")
    }),
  });


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

  const isValidForm = (formValue) => {
    if (formValue.propertyType === "Room") {
      return formValue.type && formValue.price && formValue.description;
    }
  
    return Object.values(formValue).every(value => 
      value !== "" && value !== null && value !== undefined
    );
  };



  const onSubmitHandler = async (formValue) => {
  
  const cnicPattern = /^\d{13}$/;
  const contactPattern = /^\d{11}$/;
  if (!cnicPattern.test(formValue.ownersCnic)) {
    toast("CNIC should be exactly 13 digits.");
    return;
  }

  if (!contactPattern.test(formValue.contactInfo)) {
    toast("Contact number should be exactly 11 digits.");
    return;
  }
    if (!isValidForm(formValue)) {
      toast("Please fill in all the details about your property before saving.");
      return;
    }
    const sanitizedValues = { ...formValue };

    Object.keys(sanitizedValues).forEach((key) => {
      if (sanitizedValues[key] === "") {
        sanitizedValues[key] = null; // Convert empty strings to null
      }
    });
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(sanitizedValues)
      .eq("id", id) // ✅ Use id from useParams()
      .select();

    if (data) {
      console.log(data);
      toast("Listing Saved");
      setLoading(false)
    }
    else{
      toast('Didn\'t Saved the listing ')
      console.log('error is here : ',error)
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
  
  const publishBtnHandler=async(formValue)=>{
    const cnicPattern = /^\d{13}$/;
    const contactPattern = /^\d{11}$/;
  
    if (!cnicPattern.test(formValue.ownersCnic)) {
      toast("CNIC should be exactly 13 digits.");
      return;
    }
  
    if (!contactPattern.test(formValue.contactInfo)) {
      toast("Contact number should be exactly 11 digits.");
      return;
    }
    // Validate if all required fields are filled
  if (!isValidForm(formValue)) {
    toast("Please fill in all the details about your property before publishing.");
    return;
  }
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
    <div className="pt-16 px-10 md:px-30 my-10">
      <div className="flex rounded-lg">

      <h2 className=" font-bold text-2xl p-2">
        Enter Some More Details About Your Listing
      </h2>
      </div>
      <Formik
        initialValues={{
          type: listing?.type,
          propertyType: listing?.propertyType,
          profileImage: user?.imageUrl || "",
          fullName: user?.fullName || "",
          detailedAddress: listing?.detailedAddress || "",
          ownersCnic: listing?.ownersCnic || "",
          contactInfo: listing?.contactInfo || "",
          agreement: listing?.agreement || "",
        }}
        enableReinitialize={true} // ✅ This will allow Formik to update values when user changes
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting Values:", values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
    useEffect(() => {
      if (user) {
        setFieldValue("profileImage", user.imageUrl);
        setFieldValue("fullName", user.fullName);
      }
    }, [user]); // ✅ Update when user changes

     // Automatically set "Rent" if "Room" is selected as property type
    //Disable the fields for bedroom home built in area parking and total area when room is selected and remove validation for these fields 

     useEffect(() => {
      if (values.propertyType === "Room" && values.type !== "Rent") {
        setFieldValue("type", "Rent");
      }

      if (values.propertyType === "Room") {
        setFieldValue("bedroom", "");  // Reset bedroom field
        // setFieldValue("bathroom", ""); // Reset bathroom field
        setFieldValue("builtIn", "");  // Reset built-in area field
        setFieldValue("parking", "");  // Reset parking field
        setFieldValue("area", "");     // Reset total area field
      }
    }, [values.propertyType, values.type, setFieldValue]); // Run when propertyType changes
  // Check if all required fields are filled
  useEffect(() => {
    const isFilled = values.type && values.propertyType && values.price && values.description;
  
    // Skip the validation of bedroom, bathroom, etc., when propertyType is "Room"
    if (values.propertyType === "Room") {
      setIsFormValid(isFilled); // Only check basic fields for Room
    } else {
      // For other property types, check all fields, including bedroom, bathroom, etc.
      setIsFormValid(
        isFilled && 
        values.bedroom && 
        values.bathroom && 
        values.builtIn && 
        values.parking && 
        values.area
      );
    }
  }, [values]); // ✅ Trigger validation when form values change
    return (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              {/* Detailed Address */}
                <div className="grid sm:grid-cols-1 md:grid-cols-3">
                  <div className="flex flex-col gap-2 ">
                        <Label className="text-gray-500">Detailed Address</Label>
                        <Textarea
                          name="detailedAddress"
                          placeholder="E.g:House no.x street no.x near this area "
                          onChange={handleChange}
                          value={values.detailedAddress || ""}
                        />
                      </div>
                </div>
                      
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                
                
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  
                  <RadioGroup 
  value={values.type} 
  onValueChange={(value) => setFieldValue("type", value)}
>
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
                  {/* <Select onValueChange={(e) => (values.propertyType = e)} name="propertyType"
                  defaultValue={listing?.type}
                    > */}
                    <Select onValueChange={(value) => setFieldValue("propertyType", value)} name="propertyType">

                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Single Portion">Single Portion</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Business Area">Business Area</SelectItem>
                      <SelectItem value="Room">Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input type="number" placeholder="Ex.2" name="bedroom" onChange={handleChange}
                  defaultValue={listing?.bedroom}
                  disabled={values.propertyType === "Room"} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Input type="number" placeholder="Ex.2" name="bathroom" onChange={handleChange}
                  defaultValue={listing?.bathroom} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Home Built In (Area)</h2>
                  <Input type="number" placeholder="Ex.1900 Sq.ft" name="builtIn" onChange={handleChange}
                  defaultValue={listing?.builtIn}
                  disabled={values.propertyType === "Room"} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input type="number" placeholder="Ex.2" name="parking" onChange={handleChange}
                  defaultValue={listing?.parking}
                  disabled={values.propertyType === "Room"} />
                </div>
                {/* <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Lot Size</h2>
                  <Input type="number" placeholder="" name="lotSize" onChange={handleChange}
                  defaultValue={listing?.lotSize} />
                </div> */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Total Area (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.1900" name="area" onChange={handleChange}
                  defaultValue={listing?.area}
                  disabled={values.propertyType === "Room"} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Price (Pkr)</h2>
                  <Input type="number" placeholder="400000" name="price" onChange={handleChange}
                  defaultValue={listing?.price} />
                </div>
                <div className="flex flex-col gap-2">
                  {/* <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <Input type="number" placeholder="100" name="hoa" onChange={handleChange}
                  defaultValue={listing?.hoa} /> */}
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
              
              <AdditionalDetailsForm
  values={values}
  handleChange={handleChange}
  setFieldValue={setFieldValue}
/>


              <div className="flex gap-7 justify-end mt-3">
                
                <Button 
                disabled={loading } 
                variant="outline"
                 
                className="text-primary border-primary">
                  {loading?<Loader className='animate-spin'/>:"Save"}
                </Button>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button 
                      disabled={loading } 
                      type="button" 
                      className="">
                        {loading?<Loader className='animate-spin'/>:"Publish"}
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
                        <AlertDialogAction onClick={()=>publishBtnHandler(values)}>
                          {loading?<Loader className="animate-spin"/>:'Continue'}
                          </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                    
              </div>
              
            </div>
          </form>
        );
      }}
      </Formik>
      {/* <AdditionalDetailsForm></AdditionalDetailsForm> */}
    </div>
  );
}

export default Page;
