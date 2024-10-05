'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/components/PostForm';
import PostList from '@/app/components/PostList';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const router = useRouter();

    const jwtSecretKey = process.env.JWT_SECRET;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        fetch('/api/posts', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    const handleEdit = (post) => {
        setIsEditing(true);
        setCurrentPost(post);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <PostForm
                isEditing={isEditing}
                currentPost={currentPost}
                setIsEditing={setIsEditing}
                setPosts={setPosts}
            />
            <PostList posts={posts} handleEdit={handleEdit} setPosts={setPosts} />
        </div>
    );
}