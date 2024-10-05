import bcrypt from 'bcryptjs';
import pool from '@/app/lib/db';
import { SignupFormSchema } from '@/app/lib/definitions'; // Validation schema
import { createSession } from '@/app/lib/session'; // Create user session
import { redirect } from 'next/navigation'; // Redirect user after signup

export async function signup(state, formData) {
    // 1. Validate form fields using the schema
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // 2. If validation fails, return early with errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // 3. Destructure validated data
    const { name, email, password } = validatedFields.data;

    try {
        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Insert the new user into the users table
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const values = [name, email, hashedPassword];

        const result = await pool.query(query, values);
        const user = result.rows[0];

        // 6. If no user was created, return an error
        if (!user) {
            return {
                message: 'An error occurred while creating your account.',
            };
        }

        // 7. Create a session for the user (you might use a token or session mechanism)
        await createSession(user.id); // This can be a token or session cookie

        // 8. Redirect the user to the profile page or dashboard
        redirect('/profile');
    } catch (error) {
        console.error('Signup error:', error);
        return {
            message: 'An error occurred during signup.',
        };
    }
}