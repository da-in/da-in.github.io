import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  const currentYear = new Date().getFullYear();
  const thisYearPosts = posts.filter((p) => {
    const y = new Date(p.date).getFullYear();
    return y === currentYear;
  });
  const olderPosts = posts.filter((p) => {
    const y = new Date(p.date).getFullYear();
    return y < currentYear;
  });
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Blog</h1>
      {/* 공통 배너는 layout.tsx에서 표시되므로 홈에서는 중복 배너 제거 */}
      <section>
        <h2 style={{ fontSize: 18, margin: '1rem 0 0.5rem' }}>{currentYear}</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {thisYearPosts.map((p) => (
            <li key={p.slug} style={{ marginBottom: '0.75rem' }}>
              <Link href={`/posts/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
          {thisYearPosts.length === 0 && (
            <li style={{ color: '#666' }}>올해 작성된 게시물이 없습니다.</li>
          )}
        </ul>
      </section>

      {olderPosts.length > 0 && (
        <section style={{ marginTop: '1.5rem' }}>
          <details>
            <summary style={{ cursor: 'pointer', userSelect: 'none' }}>
              이전 게시물 보기 ({olderPosts.length})
            </summary>
            <ul style={{ listStyle: 'none', padding: '0.75rem 0 0 0', margin: 0 }}>
              {olderPosts.map((p) => (
                <li key={p.slug} style={{ marginBottom: '0.75rem' }}>
                  <Link href={`/posts/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}
    </main>
  );
}
