'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ItemsResponse } from '@/types'
import { getBackendUrl, getItems } from '@/lib/api'

export default function ClientPage() {
    const [data, setData] = useState<ItemsResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [backendUrl, setBackendUrl] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        // Get and display the backend URL to verify it's correct
        setBackendUrl(getBackendUrl())

        const fetchData = async () => {
            try {
                // Fetch data using our utility function
                const result = await getItems();
                setData(result);
                setIsAuthenticated(true)
            } catch (err: any) {
                console.error('Error fetching client data:', err)

                // Check if this is an authentication error
                if (err.message === 'Authentication required') {
                    setIsAuthenticated(false)
                    setError('Please log in to view this data')
                } else {
                    setError('Error loading data. Please try again.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleLogin = () => {
        router.push('/login')
    }

    // If not authenticated, show a login prompt
    if (!isAuthenticated && !loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Authentication Required</h1>
                <div className="bg-yellow-50 p-6 rounded-md mb-6 text-center">
                    <p className="text-lg mb-4">
                        You need to be logged in to access this data.
                    </p>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                    >
                        Log in
                    </button>
                </div>
                <div className="mt-6">
                    <Link href="/" className="text-blue-600 hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Client-Side Fetched Data</h1>
            <p className="mb-4">
                This page loads data from the Django backend after the page has loaded in the browser.
                The fetch request happens on the client side.
            </p>

            <div className="bg-yellow-50 p-4 rounded-md mb-6">
                <p className="text-yellow-800">
                    Backend URL: {backendUrl}
                </p>
                <p className="text-yellow-800 mt-2">
                    <strong>Note:</strong> This data is only available to authenticated users.
                </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Items from Django:</h2>

            {loading ? (
                <div className="text-center p-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p>Loading data...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                    {error}
                </div>
            ) : data && data.items && data.items.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {data.items.map((item) => (
                        <li key={item.id} className="p-4 border rounded-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <Link
                                    href={`/edit-item/${item.id}`}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mb-6">No items found</p>
            )}

            <Link href="/" className="btn">
                Back to Home
            </Link>
        </div>
    )
}
