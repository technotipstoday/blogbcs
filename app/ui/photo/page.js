"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const ITEMS_PER_PAGE = 5;

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [columns, setColumns] = useState(3); // Default number of columns
    const [loading, setLoading] = useState(true);

    // Fetch photos from the JSON file
    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await import('/app/data/unsplash/photos.json');
            setPhotos(res.default);
            setLoading(false);
        };
        fetchPhotos();
    }, []);

    const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleColumnChange = (e) => {
        setColumns(parseInt(e.target.value));
    };

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPhotos = photos.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Photo Gallery</h1>
                <div>
                    <label className="mr-2">Columns:</label>
                    <select
                        value={columns}
                        onChange={handleColumnChange}
                        className="border border-gray-300 rounded p-1"
                    >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading photos...</p>
            ) : (
                <>
                    <div
                        className={`grid grid-cols-${columns} gap-6`}
                        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                    >
                        {selectedPhotos.map((photo) => (
                            <Link key={photo.id} href={`/ui/photo/${photo.id}`} className="group">
                                <div className="overflow-hidden rounded-lg shadow-lg bg-white">
                                    <Image
                                        src={photo.urls.thumb}
                                        alt={photo.alt_description}
                                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-200"
                                        height={200}
                                        width={200}
                                    />
                                    <div className="p-4">
                                        <p className="text-gray-700 truncate">{photo.alt_description}</p>
                                        <p className="text-gray-500 text-sm">Likes: {photo.likes}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                        >
                            Previous
                        </button>
                        <p className="text-gray-600">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PhotoGallery;