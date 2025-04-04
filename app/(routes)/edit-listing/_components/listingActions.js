import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

export const onSubmitHandler = async (formValue, id, images, setLoading) => {
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

  setLoading(true);
  const sanitizedValues = { ...formValue };

  Object.keys(sanitizedValues).forEach((key) => {
    if (sanitizedValues[key] === "") sanitizedValues[key] = null;
  });

  const { data, error } = await supabase
    .from("listing")
    .update(sanitizedValues)
    .eq("id", id)
    .select();

  if (data) {
    toast("Listing Saved");
  } else {
    toast("Failed to save listing");
    console.error("Error:", error);
  }

  for (const image of images) {
    const fileName = Date.now().toString();
    const fileExt = fileName.split(".").pop();
    const { data, error } = await supabase.storage
      .from("listingImages")
      .upload(`${fileName}`, image, { contentType: `image/${fileExt}`, upsert: false });

    if (error) {
      toast("Error while uploading images");
    } else {
      const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
      const { data, error } = await supabase.from("listingImages").insert([{ url: imageUrl, listing_id: id }]).select();
      if (data) toast("Images Uploaded");
      if (error) console.error("Image Insert Error:", error);
    }
  }
  setLoading(false);
};

export const publishBtnHandler = async (formValue, id, setLoading) => {
  if (!/^\d{13}$/.test(formValue.ownersCnic)) {
    toast("CNIC should be exactly 13 digits.");
    return;
  }

  if (!/^\d{11}$/.test(formValue.contactInfo)) {
    toast("Contact number should be exactly 11 digits.");
    return;
  }

  setLoading(true);
  const { data, error } = await supabase
    .from("listing")
    .update({ active: "true" })
    .eq("id", id)
    .select();

  setLoading(false);
  if (data) toast("Listing published");
  else console.error("Publish Error:", error);
};
