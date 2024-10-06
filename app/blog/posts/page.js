// app/blog/posts/page.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function BlogPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog/posts', { method: 'GET' });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                // console.log("data.posts", data.posts);
                setPosts(data.posts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center py-10 text-gray-500">No posts found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition duration-200">
                        <Link href={`/blog/posts/${post.id}`}>
                            <h2 className="text-2xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
                            <p className="mt-2 text-gray-800">{post.meta_description || post.content.substring(0, 150) + '...'}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}