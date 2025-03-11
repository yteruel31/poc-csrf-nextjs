import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Next.js with Django',
    description: 'A Next.js app with Django backend',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
            {children}
        </main>
        </body>
        </html>
    )
}
