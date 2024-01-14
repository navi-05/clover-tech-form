"use client"

import Link from "next/link"
import Image from "next/image"
import { PhoneCall } from "lucide-react"
import { useEffect, useState } from "react"

import Confetti from "@/components/Confetti"
import { Button } from "@/components/ui/button"

const Cta = () => {
  const [confetti, setConfetti] = useState(false)
  
  useEffect(() => {
    setConfetti(true);

    setTimeout(() => setConfetti(false), 3000)
  }, [])


  return (
    <div className="w-full flex flex-col justify-center items-center bg-white shadow-xl my-20 sm:mx-auto p-4 md:p-8 sm:max-w-lg md:max-w-3xl  rounded-lg gap-6">
      {confetti && <Confetti />}  
      <Image
          src="/logo.png"
          alt="Clover Logo"
          width="100"
          height="200"
          className="object-cover rounded-full"
        />
      <h1 className="uppercase text-2xl sm:text-4xl font-black select-none text-center -mt-4">Clover Technologies</h1>
    
      <img src="https://media.giphy.com/media/5xtDarmwsuR9sDRObyU/giphy.gif" className="h-[200px] rounded-lg object-cover"/>
      <p className="text-neutral-500 text-xs sm:text-md select-none text-center -mt-4">We will get back to you as soon as possible.</p>


      <div className="flex items-center flex-col gap-4">
        <p className="text-center text-sm">
          Join our whatsapp community to receive any future updates regarding the event.
        </p>
        <Button
          className="bg-emerald-500 hover:bg-emerald-500/90"
          type="button"
        >
          <Link href="https://chat.whatsapp.com/GlPdZgODVCF4ZCKpnIabaY" className="flex items-center" target="_blank">
            <PhoneCall className="h-4 w-4 mr-2" />
            Whatsapp
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Cta