'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-lg">
                <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong!</h2>
                <p className="text-red-600 mb-4">{error.message}</p>
                <button
                    onClick={reset}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
