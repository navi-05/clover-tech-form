import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const form = Poppins({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Mega Mentorship 2024',
  description: 'Conducted by clover technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={form.className}>
        {children}
      </body>
    </html>
  )
}
