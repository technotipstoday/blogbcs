import pool from '@/app/lib/db';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);

        // Fetch posts for the user
        const { rows } = await pool.query('SELECT * FROM blog_posts WHERE author_id = $1', [decoded.userId]);

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
    }
}

export async function POST(req) {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);

        // Parse the request body
        const body = await req.json();
        const { title, content, categories } = body;

        // Insert blog post into the database
        const result = await pool.query(
            `INSERT INTO blog_posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id`,
            [title, content, decoded.userId]
        );
        const postId = result.rows[0].id;

        // Insert categories into the junction table
        for (const categoryId of categories) {
            await pool.query('INSERT INTO blog_post_categories (blog_post_id, category_id) VALUES ($1, $2)', [postId, categoryId]);
        }

        return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
    }
}

// export const config = {
//     api: {
//         bodyParser: false, // Disable bodyParser to handle request body manually
//     },
// };