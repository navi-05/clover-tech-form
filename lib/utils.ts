import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const districts = [  
  "Ariyalur",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivaganga",
  "Thanjavur",
  "Theni",
  "Thoothukudi (Tuticorin)",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
]

export const domains = [
  "BE",
  "BTech",
  "Bsc",
  "BBA",
  "BCA",
  "MCA",
  "Msc",
  "Other"
]

export const degrees = [
  "UG",
  "PG"
]

export const yearOfPassingOut = [
  "2024",
  "2025",
  "2026",
  "2027"
]