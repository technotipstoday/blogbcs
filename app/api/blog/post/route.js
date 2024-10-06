// pages/api/posts/[slugOrId].js
import pool from '@/app/lib/db'; // Import the db connection
import { NextResponse } from 'next/server';

export async function GET(req) {

    // Works with this
    // http://localhost:3000/api/blog/post/?id=1
    //  and this
    // http://localhost:3000/api/blog/post/?slug=exploring-the-future-of-tech
    const { searchParams } = new URL(req.url);

    // Get the 'id' from the query string
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    console.log('ID:', id);
    console.log('Slug:', slug);

    if (!id && !slug) {
        return NextResponse.json({ error: 'Either ID or Slug is required' }, { status: 400 });
    }
    let queryText = '';
    let values = [];

    try {
        if (id) {
            queryText = `SELECT * FROM blog_posts WHERE id = $1`;
            values = [parseInt(id, 10)];
        } else {
            queryText = `SELECT * FROM blog_posts WHERE slug = $1`;
            values = [slug];
        }

        console.log('SQL Query:', queryText, 'Values:', values);
        const result = await pool.query(queryText, values);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ post: result.rows[0] }, { status: 200 });

    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}