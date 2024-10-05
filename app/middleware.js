import { NextResponse } from 'next/server';

export function middleware(req) {
    // Log the request method and URL
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);

    // Log headers
    console.log('Headers:', req.headers);

    // If it's a POST, PUT, or PATCH request, log the body (for read-only requests, logging body is not possible here)
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        // Cloning the request to read the body
        req.clone().json().then(body => {
            console.log('Request Body:', body);
        }).catch(err => console.log('Body parsing error:', err));
    }

    return NextResponse.next(); // Continue the request to the actual API route
}

export const config = {
    // Define paths for which this middleware should run
    matcher: ['/api/:path*'],  // Matches all requests to /api/*
};