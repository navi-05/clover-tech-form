
import FormCmp from '@/components/FormCmp'
import BackDrop from '@/components/BackDrop'

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col justify-center'>
      <BackDrop />
      <FormCmp />
    </main>
  )
}
