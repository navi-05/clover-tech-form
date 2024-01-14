import Image from "next/image"

const Banner = () => {
  return (
    <div className="w-full flex justify-center border-b pb-5">
      <div className="w-full flex flex-col items-center gap-2">
        <Image
          src="/logo.png"
          alt="Clover Logo"
          width="100"
          height="200"
          className="object-cover rounded-full"
        />
        <h1 className="uppercase text-2xl sm:text-4xl font-black select-none text-center">Clover Technologies</h1>
        <p className="text-neutral-500 text-xs sm:text-md select-none text-center">Having doubts what to do next? Just grab a coffee with us!</p>
      </div>
    </div>
  )
}

export default Banner