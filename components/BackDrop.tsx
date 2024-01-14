import Image from "next/image"

const BackDrop = () => {
  return (
    <div className="min-h-screen absolute inset-0 opacity-[0.05] -z-10">
      <Image
        src="/doodle.png"
        fill
        alt="backdrop"
        className="object-cover"
      />
    </div>
  ) 
}

export default BackDrop