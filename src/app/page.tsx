import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Blog</h1>
      {/* 공통 배너는 layout.tsx에서 표시되므로 홈에서는 중복 배너 제거 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ marginBottom: '0.75rem' }}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
