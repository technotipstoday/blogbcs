// app/api/unsplash/search/page.js

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url); // Parse the request URL to extract query params
    const query = searchParams.get('query'); // Get 'query' parameter
    const perPage = searchParams.get('perPage') || 20; // Get 'perPage' parameter or default to 20
    // Log query for debugging
    console.log('query:', query);

    // Fetch the Unsplash API key from environment variables
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}`,
            {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data from Unsplash');
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}