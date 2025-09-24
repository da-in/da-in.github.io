import { getPostBySlug, listPostSlugs } from '@/lib/posts';
import GiscusComments from '@/components/GiscusComments';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await listPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) return null;
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
      <GiscusComments />
    </main>
  );
}

