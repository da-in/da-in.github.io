"use client";
import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Giscus
        repo="da-in/da-in.github.io"
        repoId="MDEwOlJlcG9zaXRvcnkzNTM5MDcyOTU="
        category="General"
        categoryId="DIC_kwDOFRgyX84CSEWg"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
