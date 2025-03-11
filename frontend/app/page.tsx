import Link from 'next/link'

export default function Home() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Next.js + Django Docker Setup</h1>

            <p className="text-xl">
                This example demonstrates a Next.js application connected to a Django backend,
                all containerized with Docker Compose.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-2xl font-semibold mb-4">Server-Side Rendering</h2>
                    <p className="mb-4">This page fetches data from Django during server-side rendering.</p>
                    <Link href="/server-page" className="btn">
                        View SSR Example
                    </Link>
                </div>

                <div className="card">
                    <h2 className="text-2xl font-semibold mb-4">Client-Side Fetching</h2>
                    <p className="mb-4">This page fetches data from Django on the client side.</p>
                    <Link href="/client-page" className="btn">
                        View Client Example
                    </Link>
                </div>
            </div>
        </div>
    )
}
