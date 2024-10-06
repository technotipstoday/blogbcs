// pages/photo/[id].js
"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PhotoPage({ params }) {
    // console.log("photos", photos);
    console.log("params", params);
    const router = useRouter();
    // const { id } = router.query;
    const id = params.id;
    console.log("id:", id);

    // Read from a JSON file located in app/data/unsplash/photos.json.
    // const photos = require('@/app/data/unsplash/photos');

    // Fetch photos from the JSON file
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await import('/app/data/unsplash/photos.json');
            setPhotos(res.default);
            setLoading(false);
        };
        fetchPhotos();
    }, []);

    const currentIndex = photos.findIndex((photo) => photo.id === id);
    // const photo = photos[currentIndex];
    let photo;
    if (currentIndex === -1) {
        photo = photos[0];
    }
    else {
        photo = photos[currentIndex];
    }
    if (loading) return <p>Loading...</p>;


    const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
    console.log("prevPhoto:", prevPhoto);
    const nextPhoto =
        currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;
    console.log("nextPhoto:", nextPhoto);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Photo Details</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
                <Image
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                    className="rounded-lg mb-4"
                    width={1080}
                    height={720}
                />
                <div className="text-gray-800">
                    <p>
                        <strong>ID:</strong> {photo.id}
                    </p>
                    <p>
                        <strong>Description:</strong> {photo.alt_description}
                    </p>
                    <p>
                        <strong>Dimensions:</strong> {photo.width}x{photo.height}
                    </p>
                    <p>
                        <strong>Likes:</strong> {photo.likes}
                    </p>
                    <p>
                        <strong>Created At:</strong> {new Date(photo.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex justify-between mt-6">
                    {prevPhoto ? (
                        <Link href={`/ui/photo/${prevPhoto.id}`} className="text-blue-500">
                            ← Previous
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextPhoto ? (
                        <Link href={`/ui/photo/${nextPhoto.id}`} className="text-blue-500">
                            Next →
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        </div>
    );
};


