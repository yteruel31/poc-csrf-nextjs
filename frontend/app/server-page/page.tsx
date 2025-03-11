import Link from 'next/link'
import { ItemsResponse } from '@/types'
import {cookies} from "next/headers";

async function getItems(): Promise<ItemsResponse> {
    // Get the backend URL from environment variables
    // process.env is embedded at build time, but will read from runtime environment in server components
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:8000'

    console.log(`Fetching data from: ${backendUrl}/api/items/`)

    try {
        const response = await fetch(`${backendUrl}/api/items/`, {
            // Since this is server-side, cache control is important
            cache: 'no-store',
            // We need to forward cookies for authentication
            headers: {
                'Cookie': cookies().toString(),
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }

        return response.json()
    } catch (error) {
        console.error('Error fetching server data:', error)
        return { items: [] }
    }
}

// This is a Server Component that fetches data during server-side rendering
export default async function ServerPage() {
    // Fetch the data on the server
    const data = await getItems()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Server-Side Rendered Data</h1>
            <p className="mb-4">
                This page fetches data from the Django backend during the server-side rendering process.
                The data is ready when the page is delivered to the browser.
            </p>

            <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p className="text-blue-800">
                    Check your browser's network tab - you won't see a fetch request for this data
                    because it was already loaded on the server.
                </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Items from Django:</h2>

            {data.items && data.items.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {data.items.map((item) => (
                        <li key={item.id} className="p-4 border rounded-md">
                            <h3 className="font-bold">{item.name}</h3>
                            <p>{item.description}</p>
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
