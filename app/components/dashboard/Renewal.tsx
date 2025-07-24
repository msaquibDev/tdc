"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  renewalFormSchema,
  RenewalFormData,
} from "@/lib/renewal/renewalformschema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Renewal() {
  const profileData = {
    category: "Bachelor of Dental Surgery (BDS)",
    membershipNumber: "Pending Registration",
    name: "Dr. Madishetti Abhilash",
    gender: "Male",
    fatherName: "Madishetti Sathaiah",
    email: "abhilash.madisetty92@gmail.com",
    mobile: "7842810845",
    status: "Pending",
  };

  const profileFields = [
    { label: "Category", value: profileData.category },
    { label: "Membership Number", value: profileData.membershipNumber },
    { label: "Name in full", value: profileData.name },
    { label: "Gender", value: profileData.gender },
    { label: "Father’s Name", value: profileData.fatherName },
    { label: "Email ID", value: profileData.email },
    { label: "Mobile No.", value: profileData.mobile },
    { label: "Status", value: profileData.status },
  ];

  const methods = useForm<RenewalFormData>({
    resolver: zodResolver(renewalFormSchema),
    defaultValues: {
      yearsToRenew: "",
      registrationType: "",
    },
  });

  const { handleSubmit, watch } = methods;
  const registrationType = watch("registrationType");
  const [fee, setFee] = useState("");

  useEffect(() => {
    if (registrationType === "regular") {
      setFee("₹2000");
    } else if (registrationType === "tatkal") {
      setFee("₹4000");
    } else {
      setFee("");
    }
  }, [registrationType]);

  const onSubmit = (data: RenewalFormData) => {
    console.log("Renewal Data Submitted:", data);
  };

  return (
    <div >
      {/* Profile Info */}
      <div className="space-y-2 text-sm text-gray-800 mb-8">
        {profileFields.map((item, index) => (
          <div key={index}>
            <span className="font-semibold w-48 inline-block">{item.label}</span> : {item.value}
          </div>
        ))}
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* No of Years to Renew */}
            <FormField
              name="yearsToRenew"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    No Of Years to Renew <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Year (2025)</SelectItem>
                      <SelectItem value="2">2 Years (2025 & 2024)</SelectItem>
                      <SelectItem value="3">3 Years (2023, 2024 & 2025)</SelectItem>
                      <SelectItem value="4">4 Years (2022, 2023, 2024 & 2025)</SelectItem>
                      <SelectItem value="5">5 Years (2021, 2022, 2023, 2024 & 2025)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Type */}
            <FormField
              name="registrationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Registration Type <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="tatkal">Tatkal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fee */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Fee</label>
              <Input
                value={fee || "Auto-calculated"}
                readOnly
                disabled
                className="w-full bg-gray-100 cursor-not-allowed text-gray-700"
              />
            </div>

            {/* Aadhaar Upload */}
            <FormField
              name="aadhaarCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Upload Aadhaar Card <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TSDC Certificate Upload */}
            <FormField
              name="tsdcCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Upload (Currently Holding) TSDC Registration Certificate{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="bg-[#00694A] hover:bg-[#004d36] text-white w-full"
              >
                Renew Now
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
