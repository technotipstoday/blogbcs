import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    // http://localhost:3000/api/blog/posts/?author=1&page=2&limit=5
    const page = parseInt(searchParams.get('page')) || 1; // Current page
    const limit = parseInt(searchParams.get('limit')) || 10; // Posts per page
    const offset = (page - 1) * limit; // Calculate offset

    // http://localhost:3000/api/blog/posts/?author=1
    const authorId = searchParams.get('author'); // Get the author id if available

    try {
        // Fetch total count of posts (filtered by author if provided)
        let totalQuery = 'SELECT COUNT(*) FROM blog_posts';
        let postsQuery = 'SELECT * FROM blog_posts';
        const queryParams = [];
        if (authorId) {
            totalQuery += ' WHERE author_id = $1';
            postsQuery += ' WHERE author_id = $1  ORDER BY id DESC LIMIT $2';
            queryParams.push(authorId, limit);
            if (offset > 0) {
                postsQuery += ' OFFSET $3';
                queryParams.push(offset);
            }
        } else {
            postsQuery += ' ORDER BY id DESC LIMIT $1';
            queryParams.push(limit);
            if (offset > 0) {
                postsQuery += ' OFFSET $2';
                queryParams.push(offset);
            }
        }
        console.log('Query Params:', queryParams);

        // postsQuery += ' ORDER BY id DESC LIMIT $2 OFFSET $3';
        // queryParams.push(limit, offset);

        let totalResult;
        if (authorId) {
            // Fetch only total count of posts by author
            totalResult = await pool.query(totalQuery, queryParams.slice(0, 1));
        } else {
            // Fetch total count of all posts
            totalResult = await pool.query(totalQuery);
        }

        console.log('Total Result:', totalResult);
        const totalPosts = parseInt(totalResult.rows[0].count);
        console.log('Total Posts:', totalPosts);


        // Fetch paginated posts
        const { rows } = await pool.query(postsQuery, queryParams);

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

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the request body
        const {
            title,
            seo_title,
            slug,
            date,
            content,
            image,
            image_alt_text,
            meta_description,
            focus_keywords,
            canonical_url,
            schema_markup,
            robots_meta = 'index, follow', // Default value if not provided
            og_title,
            og_description,
            og_image,
            og_url,
            twitter_title,
            twitter_description,
            twitter_image,
            published_on,
            author_id,
        } = body;

        // Validate the required fields
        if (!title || !slug || !date || !content || !published_on || !author_id) {
            return NextResponse.json(
                { message: 'Title, slug, date, content, published_on, and author_id are required.' },
                { status: 400 }
            );
        }

        // Insert the new post into the blog_posts table
        const result = await pool.query(
            `INSERT INTO blog_posts (
                title, seo_title, slug, date, content, image, image_alt_text, 
                meta_description, focus_keywords, canonical_url, schema_markup, 
                robots_meta, og_title, og_description, og_image, og_url, 
                twitter_title, twitter_description, twitter_image, published_on, author_id
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
                $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
            ) RETURNING id`,
            [
                title, seo_title, slug, date, content, image, image_alt_text,
                meta_description, focus_keywords, canonical_url, schema_markup,
                robots_meta, og_title, og_description, og_image, og_url,
                twitter_title, twitter_description, twitter_image, published_on, author_id
            ]
        );
        const postId = result.rows[0].id;

        // Respond with success and the new post ID
        return NextResponse.json({ message: 'Post created successfully', postId }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
    }
}