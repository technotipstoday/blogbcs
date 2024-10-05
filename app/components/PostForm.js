import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostForm({ isEditing, currentPost, setIsEditing, setPosts }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (isEditing && currentPost) {
            setTitle(currentPost.title);
            setContent(currentPost.content);
        }
    }, [isEditing, currentPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const method = isEditing ? 'PUT' : 'POST';
        const endpoint = isEditing ? `/api/posts/${currentPost.id}` : '/api/posts';

        const res = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            const newPost = await res.json();
            setPosts((prev) => (isEditing ? prev.map((p) => (p.id === newPost.id ? newPost : p)) : [...prev, newPost]));
            setIsEditing(false);
            setTitle('');
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full mb-4"
                placeholder="Post Title"
            />
            <ReactQuill value={content} onChange={setContent} className="mb-4" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                {isEditing ? 'Update Post' : 'Create Post'}
            </button>
        </form>
    );
}