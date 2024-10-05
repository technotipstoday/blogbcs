import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '@/app/lib/db'; // Import the db connection
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    const jwtSecretKey = process.env.JWT_SECRET;
    try {
        const body = await req.json();
        console.log('Request Body:', body); // Check the received request body

        const { username, password } = body;
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await pool.query(query, [username]);

        if (rows.length === 0) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }

        const user = rows[0];
        console.log('Fetched User:', user); // Log the user fetched from the DB

        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, jwtSecretKey, {
            expiresIn: '1h',
        });

        console.log('Token created successfully:', token); // Log successful token creation
        return NextResponse.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Hello World' });
}

// // Only handle POST requests
// // export const config = {
// //     runtime: 'edge', // Ensures this is an edge function
// // };
// // export const runtime = "edge";


