import BlogPostPage from '@/app/blog/post/page';

export default function page({ params }) {
    console.log('params:', params);
    console.log('params.id:', params.id);


    const { id } = params;
    console.log('id:', id);

    const currentUser = {
        id: 1,
        username: 'johndoe',
    };

    return (
        <div>
            <BlogPostPage params={params} currentUser={currentUser} />
        </div>
    );
}
