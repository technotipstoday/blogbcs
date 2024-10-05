// create a new route with simple GET method which will return a JSON response with a message.
import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ message: 'Hello World' });
}