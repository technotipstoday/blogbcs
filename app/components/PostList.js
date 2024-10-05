export default function PostList({ posts, handleDelete, handleEdit }) {
    return (
        <div className="mt-8">
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border p-4 mb-4 rounded-lg">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => handleEdit(post)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}