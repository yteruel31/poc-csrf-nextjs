'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getItem, updateItem } from '@/lib/api'

interface ItemFormProps {
    itemId: number
}

interface ItemData {
    id: number
    name: string
    description: string
}

export default function ItemForm({ itemId }: ItemFormProps) {
    const [item, setItem] = useState<ItemData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getItem(itemId);
                setItem(data);
            } catch (err: any) {
                console.error('Error fetching item:', err);
                setError(err.message || 'Failed to load item');

                // Redirect to login if authentication is required
                if (err.message === 'Authentication required') {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!item) return;

        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            await updateItem(itemId, {
                name: item.name,
                description: item.description
            });

            setSuccess(true);

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err: any) {
            console.error('Error updating item:', err);
            setError(err.message || 'Failed to update item');

            // Redirect to login if authentication is required
            if (err.message === 'Authentication required') {
                router.push('/login');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (item) {
            setItem({
                ...item,
                [name]: value
            });
        }
    };

    if (loading) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4">Loading item...</p>
            </div>
        );
    }

    if (error && !item) {
        return (
            <div className="bg-red-100 p-4 rounded-md text-red-700">
                <h2 className="text-lg font-bold mb-2">Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => router.push('/client-page')}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Back to Items
                </button>
            </div>
        );
    }

    if (!item) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Item</h2>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
                    Item updated successfully!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/client-page')}
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
