'use client'

import { useParams } from 'next/navigation'
import ItemForm from '@/components/ItemForm'
import Link from 'next/link'

export default function EditItemPage() {
    const params = useParams()
    const itemId = parseInt(params.id as string, 10)

    // Validate that we have a valid item ID
    if (isNaN(itemId)) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6">Invalid Item ID</h1>
                <p className="mb-6">The item ID provided is not valid.</p>
                <Link href="/client-page" className="text-blue-600 hover:underline">
                    Back to Items
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Item</h1>

            <p className="mb-6">
                Update the item details using the form below.
            </p>

            <ItemForm itemId={itemId} />
        </div>
    )
}
