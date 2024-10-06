// pages/app/ui/photo/search/page.js
"use client";
import { useState } from 'react';
import Image from 'next/image';
const PhotoSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/unsplash/search?query=${searchTerm}`, {
                method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                setPhotos(data.results);
            } else {
                setError(data.error || 'Failed to fetch photos');
            }
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Search for Photos</h1>
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter a keyword..."
                    className="border rounded p-2 w-full mb-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-lg shadow">
                        <Image
                            src={photo.urls.small}
                            alt={photo.alt_description}
                            className="w-full h-48 object-cover"
                            width={300}
                            height={200}
                        />
                        <div className="p-4">
                            <p className="text-gray-700">{photo.alt_description}</p>
                            <p className="text-sm text-gray-500">Likes: {photo.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoSearch;