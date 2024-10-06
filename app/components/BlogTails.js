'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BlogTails() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch photos from the JSON file
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await import('/app/data/unsplash/photos.json');
            setPhotos(res.default);
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        // Fetch paginated posts when the page loads or changes
        async function fetchPosts() {
            const response = await fetch(`/api/admin/posts/paginated?page=${currentPage}`);
            const data = await response.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
                    >
                        {/* Display random image */}
                        <Image
                            className="w-full h-48 object-cover"
                            src={`${photos[Math.floor(Math.random() * photos.length)].urls.thumb}`}
                            alt={post.title}
                            width={800}
                            height={600}
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {/* Previous Page Button */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Previous
                        </button>
                    )}

                    {/* Display page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded-lg ${i + 1 === currentPage
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next Page Button */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}