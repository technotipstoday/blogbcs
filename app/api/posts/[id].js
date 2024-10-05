import pool from '@/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { method, body, query, headers } = req;
    const { id } = query;

    const token = headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'your_secret_key');

    switch (method) {
        case 'PUT':
            const { title, content, categories } = body;
            try {
                await pool.query('UPDATE blog_posts SET title = $1, content = $2 WHERE id = $3 AND author_id = $4', [title, content, id, decoded.userId]);

                // Update categories (delete old categories and insert new ones)
                await pool.query('DELETE FROM blog_post_categories WHERE blog_post_id = $1', [id]);
                for (const categoryId of categories) {
                    await pool.query('INSERT INTO blog_post_categories (blog_post_id, category_id) VALUES ($1, $2)', [id, categoryId]);
                }

                res.status(200).json({ message: 'Post updated successfully' });
            } catch (error) {
                console.error('Error updating post:', error);
                res.status(500).json({ message: 'Error updating post' });
            }
            break;

        case 'DELETE':
            try {
                await pool.query('DELETE FROM blog_posts WHERE id = $1 AND author_id = $2', [id, decoded.userId]);
                res.status(200).json({ message: 'Post deleted successfully' });
            } catch (error) {
                console.error('Error deleting post:', error);
                res.status(500).json({ message: 'Error deleting post' });
            }
            break;

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}