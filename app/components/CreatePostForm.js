'use client';
import { useState } from 'react';

export default function CreatePostForm() {
    const [formData, setFormData] = useState({
        title: '',
        seo_title: '',
        slug: '',
        date: '',
        content: '',
        image: '',
        image_alt_text: '',
        meta_description: '',
        focus_keywords: '',
        canonical_url: '',
        schema_markup: '',
        robots_meta: 'index, follow',
        og_title: '',
        og_description: '',
        og_image: '',
        og_url: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',
        published_on: '',
        author_id: ''
    });

    const [message, setMessage] = useState(null); // Dismissible message state

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/blog/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Post created successfully!' });
                setFormData({
                    title: '',
                    seo_title: '',
                    slug: '',
                    date: '',
                    content: '',
                    image: '',
                    image_alt_text: '',
                    meta_description: '',
                    focus_keywords: '',
                    canonical_url: '',
                    schema_markup: '',
                    robots_meta: 'index, follow',
                    og_title: '',
                    og_description: '',
                    og_image: '',
                    og_url: '',
                    twitter_title: '',
                    twitter_description: '',
                    twitter_image: '',
                    published_on: '',
                    author_id: ''
                });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to create post' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error creating post' });
        }
    };

    // Dismiss the message
    const dismissMessage = () => {
        setMessage(null);
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create a New Blog Post</h1>

            {message && (
                <div
                    className={`mb-6 p-4 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}
                >
                    {message.text}
                    <button
                        className="ml-4 text-lg font-semibold float-right"
                        onClick={dismissMessage}
                    >
                        ×
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* SEO Title */}
                <div>
                    <label htmlFor="seo_title" className="block font-medium">SEO Title</label>
                    <input
                        type="text"
                        id="seo_title"
                        name="seo_title"
                        value={formData.seo_title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block font-medium">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Date */}
                <div>
                    <label htmlFor="date" className="block font-medium">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block font-medium">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg h-40"
                    ></textarea>
                </div>

                {/* Published On */}
                <div>
                    <label htmlFor="published_on" className="block font-medium">Published On</label>
                    <input
                        type="date"
                        id="published_on"
                        name="published_on"
                        value={formData.published_on}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Author ID */}
                <div>
                    <label htmlFor="author_id" className="block font-medium">Author ID</label>
                    <input
                        type="number"
                        id="author_id"
                        name="author_id"
                        value={formData.author_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Other fields (meta description, keywords, images, etc.) */}
                {/* Example for image and meta_description */}
                <div>
                    <label htmlFor="image" className="block font-medium">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="meta_description" className="block font-medium">Meta Description</label>
                    <textarea
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    ></textarea>
                </div>

                {/* Add more fields as per requirement */}

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}