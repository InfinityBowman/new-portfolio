import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';

const postFiles = import.meta.glob('./posts/*.md', { eager: true });

const posts = Object.entries(postFiles)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace('.md', '');
    return { ...mod.attributes, html: mod.html, slug };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

function formatDate(dateString) {
  if (dateString === 'TBD') return dateString;
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Blog() {
  const blogPostMatch = window.location.pathname.match(/^\/blog\/([^/]+)$/);
  const blogPostSlug = blogPostMatch ? blogPostMatch[1] : null;
  const [selected, setSelected] = useState(blogPostSlug);

  // Update slug on page change
  useEffect(() => {
    setSelected(blogPostSlug);
  }, [blogPostSlug]);

  if (selected) {
    const post = posts.find((p) => p.slug === selected);

    useEffect(() => {
      // Highlight code blocks after post HTML is rendered
      Prism.highlightAll();
    }, [post.html]);

    return (
      <>
        <button
          onClick={() => {
            window.history.pushState({}, '', '/blog');
            window.dispatchEvent(new Event('pushstate'));
            setSelected(null);
          }}
          className="m-4 mb-6 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          <span className="text-lg">←</span> <span>Back</span>
        </button>
        <article className="min-h-screen max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl prose prose-invert mx-auto p-8 mb-8 rounded-lg shadow-md border border-accent backdrop-blur-md ">
          <h1 className="mb-4 text-4xl font-extrabold text-zinc-100 drop-shadow-lg">{post.title}</h1>
          <hr className="relative bottom-1 w-10 h-0.5 bg-muted border-0 m-0! p-0!" />
          <span>{formatDate(post.date)}</span>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </>
    );
  }

  return (
    <section className="min-h-screen flex flex-col gap-8 justify-center items-center py-12 px-4">
      <h2 className="text-4xl font-extrabold mb-6 text-zinc-100 drop-shadow-lg">Blog</h2>
      <ul className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border rounded-xl border-accent backdrop-blur-md hover:">
            <button
              className="p-4 text-left w-full text-2xl font-semibold transition-colors"
              onClick={() => {
                window.history.pushState({}, '', `/blog/${post.slug}`);
                window.dispatchEvent(new Event('pushstate'));
                setSelected(post.slug);
              }}
            >
              {post.title} <span className="text-zinc-400 text-base font-normal"> ({formatDate(post.date)})</span>
              <div className="text-zinc-400 text-base mt-1">{post.summary}</div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
