import Link from 'next/link';
import { getAllPosts } from '../lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Blog</h1>
      <div
        style={{
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: 8,
          background: '#fff3cd',
          color: '#664d03',
          border: '1px solid #ffe69c',
          fontSize: 14,
          lineHeight: 1.5,
        }}
        role="status"
        aria-live="polite"
      >
        현재 Jekyll → Next.js 마이그레이션 중입니다. 디자인 적용 전으로, 일부 레이아웃과 기능이 임시 상태일 수 있어요.
      </div>
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
