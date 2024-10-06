'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

import { router } from 'next/navigation';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);

    }, [error]);

    if (!error) return null;

    if (error.message === "Photo is not found") {
        console.log("ERROR: Photo is not found");
    }

    // console.log("error is the error:", error);
    // console.log("error type:", typeof error);

    return ((error.Error === "Photo is not found") ? (
        <div>
            <h2>Photo not found!</h2>
            <button
                onClick={
                    // Redirect the user to the home page
                    () => router.push('/ui/photos')
                }
            >
                Go back
            </button>
        </div>
    ) : (<div>
        <h2>Something went wrong!</h2>
        <button
            // onClick={
            //     // Attempt to recover by trying to re-render the segment
            //     () => reset()
            // }
            onClick={
                // Redirect the user to the home page
                () => router.push('/ui/photos')
            }
        >
            Try again
        </button>
    </div>)

    );
}