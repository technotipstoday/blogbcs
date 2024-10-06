import { notFound } from 'next/navigation';

async function getPost(id) {
    console.log('Fetching post:', id);
    let res = await fetch(`/api/blog/post/?id=${id}`);
    let post = await res.json();
    if (!post) notFound();
    return post;
}

export async function generateStaticParams() {
    let posts = await fetch('/api/blog/posts').then((res) =>
        res.json()
    );

    return posts.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }) {
    console.log("[generateMetadata] params : ", params);
    const { id } = params;
    console.log('[generateMetadata] Generating metadata for post:', id);

    let post = await getPost(params.id);

    return {
        title: post.title,
    };
}

export default async function BlogPostPage({ params, currentUser }) {
    console.log('[Page] params:', params);
    console.log('[Page] currentUser:', currentUser);

    const post = await getPost(params.id);
    const isAuthor = currentUser?.id === post.author_id;

    return (
        <div className="container mx-auto my-10 px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Blog Post Section */}
                <div className="lg:col-span-2">
                    <article className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <p className="text-gray-600 text-sm mb-4">{new Date(post.published_on).toLocaleDateString()}</p>

                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.image_alt_text || 'Blog post image'}
                                className="w-full h-auto mb-6 rounded-lg object-cover"
                            />
                        )}

                        <div className="prose lg:prose-xl max-w-none mb-6">
                            {/* Blog post content */}
                            <p>{post.content}</p>
                        </div>

                        {/* If user is the author, show edit button */}
                        {isAuthor && (
                            <div className="mt-4">
                                <button
                                    onClick={() => alert('Edit functionality here')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit Post
                                </button>
                            </div>
                        )}
                    </article>
                </div>

                {/* Sidebar Widget Section */}
                <aside className="space-y-6">
                    {/* Categories Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Categories</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {/* Example categories */}
                            <li>Web Development</li>
                            <li>Design</li>
                            <li>JavaScript</li>
                        </ul>
                    </div>

                    {/* Metadata Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Post Information</h2>
                        <ul className="space-y-2">
                            <li>
                                <strong>Published on:</strong> {new Date(post.published_on).toLocaleDateString()}
                            </li>
                            <li>
                                <strong>Updated on:</strong> {post.updated_on ? new Date(post.updated_on).toLocaleDateString() : 'N/A'}
                            </li>
                            <li>
                                <strong>Author:</strong> {post.author_name || 'Unknown Author'}
                            </li>
                            <li>
                                <strong>Focus Keywords:</strong> {post.focus_keywords || 'None'}
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}