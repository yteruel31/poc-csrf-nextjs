'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { User } from '@/types'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Check authentication status when component mounts
        fetchUserStatus()
    }, [])

    const fetchUserStatus = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/user/', {
                credentials: 'include',
            })

            if (response.ok) {
                const data: User = await response.json()
                setIsLoggedIn(true)
                setUsername(data.username)
            } else {
                setIsLoggedIn(false)
                setUsername('')
            }
        } catch (error) {
            console.error('Error checking auth status:', error)
            setIsLoggedIn(false)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/logout/', {
                method: 'POST',
                credentials: 'include',
            })

            if (response.ok) {
                setIsLoggedIn(false)
                setUsername('')
            }
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Next.js + Django
                </Link>

                <div className="flex space-x-4 items-center">
                    <Link href="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/server-page" className="hover:text-gray-300">
                        Server Page
                    </Link>
                    <Link href="/client-page" className="hover:text-gray-300">
                        Client Page
                    </Link>

                    {loading ? (
                        <span>Loading...</span>
                    ) : isLoggedIn ? (
                        <>
                            <span>Welcome, {username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
