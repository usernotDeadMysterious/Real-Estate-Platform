"use client";

import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

// Form Validation Schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  buyerContact: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactFormUpdated() {
  const { user } = useUser();
  const searchParams = useSearchParams();

  // Get details from URL
  const ownerEmail = searchParams.get("email");
  const propertyTitle = searchParams.get("title") || "Unknown Property";
  const propertyLocation = searchParams.get("location") || "No location provided";
  const propertyPrice = searchParams.get("price") || "Price not available";

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: user?.fullName || "",
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to send a message.");
      return;
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      toast.error("Your email is missing. Please update your profile.");
      return;
    }

    // Create a conversationId (based on buyer & seller emails)
    const conversationId = `${userEmail}_${ownerEmail}`;

    const { error } = await supabase.from("messages").insert([
      {
        conversationId,
        senderEmail: userEmail,
        receiverEmail: ownerEmail,
        senderName: data.fullName || user.fullName,
        buyerContact: data.buyerContact,
        message: data.message,
        propertyTitle,
        propertyLocation,
        propertyPrice,
        isRead: false,
      },
    ]);

    if (error) {
      toast.error("Failed to send message: " + error.message);
    } else {
      toast.success("Message sent successfully!");
      reset(); // Clear form fields
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Contact Owner</h1>

      {/* Property Details */}
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">Description 🏠 : {propertyTitle}</p><br />
        <p className="text-sm text-gray-600">Location 📍 : {propertyLocation}</p><br />
        <p className="text-sm text-gray-600">Price 💰 : {propertyPrice}</p>
      </div>
    
      {ownerEmail && <p className="text-primary mb-2 ">Property Owner : {ownerEmail}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Input */}
        <label className="block text-gray-700 font-medium mb-1">Your Full Name</label>
        <input
          {...register("fullName")}
          className="w-full p-2 border rounded mb-2"
          placeholder="Full Name (Optional)"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

        {/* Buyer Contact */}
        <label className="block text-gray-700 font-medium mb-1">Your Contact</label>
        <input
          {...register("buyerContact")}
          className="w-full p-2 border rounded mb-2"
          placeholder="Phone Number"
        />
        {errors.buyerContact && <p className="text-red-500 text-sm">{errors.buyerContact.message}</p>}

        {/* Message */}
        <label className="block text-gray-700 font-medium mb-1">Message</label>
        <textarea
          {...register("message")}
          className="w-full p-2 border rounded mb-2"
          rows="4"
          placeholder="Your Message"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

        {/* Send Button */}
        <button type="submit" className={`w-full py-2 text-white rounded transition ${
    isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed opacity-50"
  }`} disabled={!isValid}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactFormUpdated;
