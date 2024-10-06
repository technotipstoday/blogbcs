import Link from "next/link";

export default async function Page() {
    // let data = await fetch('https://api.vercel.app/blog');
    let posts = fetch('http://localhost:3000/api/blog/posts').then((res) =>
        res.json()
    );
    return (
        <ul>
            {posts && posts.length >= 0 && posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/ui/posts/${post.id}/`}>{post.title}</Link></li>
            ))
            }
        </ul >
    );
}