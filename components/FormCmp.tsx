"use client";

import { z } from "zod";
import { useState } from "react";
import { JWT } from "google-auth-library";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleSpreadsheet } from "google-spreadsheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cta from "@/components/Cta";
import Banner from "@/components/Banner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { degrees, districts, domains, yearOfPassingOut } from "@/lib/utils";

// Zod validation
export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Min 2 characters long",
  }),
  lastName: z.string().min(2, {
    message: "Min 2 characters long",
  }),
  email: z.coerce.string().email(),
  contact: z
    .string()
    .min(10, {
      message: "Invalid Contact",
    })
    .max(10, {
      message: "Invalid Contact",
    }),
  college: z.string(),
  degree: z.string(),
  domain: z.string(),
  yearOfPassingOut: z.string(),
  location: z.string(),
});

const FormCmp = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      college: "",
      degree: degrees[0],
      domain: domains[0],
      yearOfPassingOut: yearOfPassingOut[0],
      location: districts[0],
    },
  });

  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
  const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY;

  const serviceAccountAuth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_SERVICE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID!, serviceAccountAuth);
      await doc.loadInfo();

      const sheet = doc.sheetsById[0];
      await sheet.loadHeaderRow(1);

      await sheet.addRow([
        values.firstName,
        values.lastName,
        values.email,
        values.contact,
        values.college,
        values.degree,
        values.domain,
        values.yearOfPassingOut,
        values.location,
      ]);

      setIsFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (!isFormSubmitted) return <Cta />;

  return (
    <div className="w-full flex flex-col justify-center bg-white shadow-xl my-20 sm:mx-auto p-4 md:p-8 sm:max-w-lg md:max-w-3xl  rounded-lg ">
      <Banner />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-5 mt-10 tracking-widest uppercase"
        >
          {/* First Name and Last Name */}
          <div className="grid sm:sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Leo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Das" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Email and Contact */}
          <div className="grid sm:sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="leodas@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input type="" placeholder="+91" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* College Name */}
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Input placeholder="Anna University CEG Campus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Degree & Districts */}
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full focus:ring-0 focus:ring-offset-0 tracking-widest"
                        name="degree"
                      >
                        <SelectValue placeholder={degrees[0]} />
                      </SelectTrigger>
                      <SelectContent>
                        {degrees.map((degree) => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full focus:ring-0 focus:ring-offset-0 tracking-widest"
                        name="degree"
                      >
                        <SelectValue placeholder={domains[0]} />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* YOPO & Location */}
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="yearOfPassingOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Of Passing Out</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full focus:ring-0 focus:ring-offset-0 tracking-widest"
                        name="degree"
                      >
                        <SelectValue placeholder={yearOfPassingOut[0]} />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOfPassingOut.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full focus:ring-0 focus:ring-offset-0 tracking-widest"
                        name="degree"
                      >
                        <SelectValue placeholder={districts[0]} />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-900/90 mt-4"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormCmp;
