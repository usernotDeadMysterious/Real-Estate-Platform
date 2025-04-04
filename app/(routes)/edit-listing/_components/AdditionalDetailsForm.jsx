"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdditionalDetailsForm = ({ values, handleChange, setFieldValue }) => {
  const validateFields = () => {
    if (
      
      !values.fullName ||
      !values.ownersCnic ||
      !values.contactInfo ||
      values.agreement === ""
    ) {
      toast("Please fill in all additional details before saving. Additional detail form");
      return false;
    }
    
    
    return true;
  };

  
  return (
    <div className="p-8 rounded-lg shadow-md mt-6">
      <h2 className="font-bold text-2xl p-2">Additional Property Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-500">Full Name as per CNIC</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Name of Owner as per CNIC "
            onChange={handleChange}
            value={values.fullName || ""}

          />
        </div>

        {/* Owner's CNIC */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-500">Owner's CNIC</Label>
          <Input
            type="text"
            name="ownersCnic"
            placeholder="Enter CNIC without dashes e.g 17231xxxxxxx9"
            onChange={handleChange}
            value={values.ownersCnic || ""}
            pattern="\d{13}" // enforce 13 digits CNIC format
  title="CNIC should be exactly 13 digits."
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-500">Contact Information</Label>
          <Input
            type="text"
            name="contactInfo"
            placeholder="Enter contact number e.g 03101234567"
            onChange={handleChange}
            value={values.contactInfo || ""}
            pattern="\d{11}" // enforce 11 digits contact number format
  title="Contact number should be exactly 11 digits."
          />
        </div>

        {/* Agreement (Radio Button) */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-500">Agreement</Label>
          <RadioGroup
            value={values.agreement}
            onValueChange={(value) => setFieldValue("agreement", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="agree" />
              <Label htmlFor="agree">I Agree that the above information I entered is legit and I will be responsible for Ownership issues if raised due to this post. </Label>
            </div>
            <div className="flex items-center space-x-2">
              {/* <RadioGroupItem value="false" id="disagree" />
              <Label htmlFor="disagree">I Disagree</Label> */}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsForm;
