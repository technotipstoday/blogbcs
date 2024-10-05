// Create a Profile page specific to the user.
import React from 'react';

export default function page() {
    return (
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-purple-900 mb-8">Profile</h2>
            <p className="text-lg text-gray-700 mb-4">
                Welcome to your profile page. Here you can view and edit your account details.
            </p>
            <button className="bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-600">
                Edit Profile
            </button>
        </div>
    );
}
