'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    // Simulate authentication state (in a real app, replace this with actual auth logic)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Mock user data (if authenticated)
    const user = {
        name: 'John Doe',
    };

    const handleSignOut = () => {
        // Logic for signing out the user
        setIsAuthenticated(false);
        alert('Signed out successfully!');
    };

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side - Main navigation links */}

                <div className="flex space-x-4">
                    <Link href="/" className="hover:text-blue-400">
                        My Blog App
                    </Link>
                    <Link href="/" className="hover:text-blue-400">
                        Home
                    </Link>
                    <Link href="/blogs" className="hover:text-blue-400">
                        Blogs
                    </Link>
                </div>

                {/* Right side - Authentication/SignIn or Profile Menu */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        // Profile Dropdown Menu when user is authenticated
                        <div className="relative">
                            <button className="hover:text-blue-400 focus:outline-none">
                                Profile
                            </button>
                            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48 py-2">
                                <Link href="/profile/settings" className="block px-4 py-2 hover:bg-gray-200">
                                    Settings
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        // SignIn and SignUp links when user is not authenticated
                        <>
                            <Link href="/signin" className="hover:text-blue-400">
                                Sign In
                            </Link>
                            <Link href="/signup" className="hover:text-blue-400">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}