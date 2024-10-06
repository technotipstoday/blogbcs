import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1; // Current page
    const limit = 10; // Posts per page
    const offset = (page - 1) * limit; // Calculate offset

    try {
        // Fetch total count of posts
        const totalQuery = 'SELECT COUNT(*) FROM blog_posts';
        const totalResult = await pool.query(totalQuery);
        const totalPosts = parseInt(totalResult.rows[0].count);

        // Fetch paginated posts
        const postsQuery = 'SELECT * FROM blog_posts ORDER BY id DESC LIMIT $1 OFFSET $2';
        const { rows } = await pool.query(postsQuery, [limit, offset]);

        // Calculate total number of pages
        const totalPages = Math.ceil(totalPosts / limit);

        return NextResponse.json({
            posts: rows,
            currentPage: page,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
    }
}