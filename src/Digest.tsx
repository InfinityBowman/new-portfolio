import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import NotFoundPage from '@/src/NotFound';
import { FaArrowLeft } from 'react-icons/fa';

const digestFiles = import.meta.glob('./digests/*.md', { eager: true });

const digests = Object.entries(digestFiles)
  .map(([path, mod]: [string, any]) => {
    const slug = path.split('/').pop()!.replace('.md', '');
    return { ...mod.attributes, html: mod.html, slug };
  })
  .sort((a, b) => (b.issue ?? 0) - (a.issue ?? 0))
  .filter((d) => d.published === 'true');

function formatDate(dateString: string) {
  if (dateString === 'TBD') return dateString;
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Digest() {
  const digestMatch = window.location.pathname.match(/^\/digest\/([^/]+)$/);
  const digestSlug = digestMatch ? digestMatch[1] : null;
  const [selected, setSelected] = useState(digestSlug);

  const startTransition = (update: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => update());
      return;
    }
    update();
  };

  const titleTransitionName = (slug: string) => `digest-title-${slug}`;
  const cardTransitionName = (slug: string) => `digest-card-${slug}`;

  useEffect(() => {
    setSelected(digestSlug);
  }, [digestSlug]);

  if (selected) {
    const digest = digests.find((d) => d.slug === selected);
    if (!digest) {
      return (
        <>
          <button
            onClick={() => {
              startTransition(() => {
                window.history.pushState({}, '', '/digest');
                window.dispatchEvent(new Event('pushstate'));
                setSelected(null);
              });
            }}
            className="m-4 mb-6 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" /> <span>Back</span>
          </button>
          <NotFoundPage />
        </>
      );
    }

    useEffect(() => {
      Prism.highlightAll();
    }, [digest.html]);

    return (
      <>
        <button
          onClick={() => {
            startTransition(() => {
              window.history.pushState({}, '', '/digest');
              window.dispatchEvent(new Event('pushstate'));
              setSelected(null);
            });
          }}
          className="m-4 mb-10 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" /> <span>Back</span>
        </button>
        <article
          className="min-h-screen max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl prose prose-invert mx-auto p-8 mb-8 rounded-lg shadow-md border border-accent backdrop-blur-md"
          style={{ viewTransitionName: cardTransitionName(digest.slug) }}
        >
          <h1
            className="mb-4 text-4xl font-extrabold text-zinc-100 drop-shadow-lg"
            style={{ viewTransitionName: titleTransitionName(digest.slug) }}
          >
            {digest.title}
          </h1>
          <hr className="relative bottom-1 w-10 h-0.5 bg-muted border-0 m-0! p-0!" />
          <span>{formatDate(digest.date)}</span>
          <div dangerouslySetInnerHTML={{ __html: digest.html }} />
        </article>
      </>
    );
  }

  return (
    <section className="min-h-screen flex flex-col gap-8 justify-center items-center py-12 px-4">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-zinc-100 drop-shadow-lg">Foxfire</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          A weekly signal flare from the edges of tech — AI, open source, engineering, and whatever else caught fire this week. Curated every Saturday by{' '}
          <a
            href="https://openclaw.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-link-hover transition-colors"
          >
            OpenClaw
          </a>{' '}
          assistant Felix 🦊, running on a homelab somewhere in the midwest.
        </p>
      </div>
      <ul className="w-full max-w-3xl space-y-4">
        {digests.map((digest) => (
          <li
            key={digest.slug}
            className="border rounded-xl border-accent backdrop-blur-md hover:scale-[1.02] transition-all"
            style={{ viewTransitionName: cardTransitionName(digest.slug) }}
          >
            <button
              className="p-4 text-left w-full text-2xl font-semibold transition-colors"
              onClick={() => {
                startTransition(() => {
                  window.history.pushState({}, '', `/digest/${digest.slug}`);
                  window.dispatchEvent(new Event('pushstate'));
                  setSelected(digest.slug);
                });
              }}
            >
              <span className="text-muted-foreground text-base font-mono mr-2">#{digest.issue}</span>
              <span style={{ viewTransitionName: titleTransitionName(digest.slug) }}>{digest.title}</span>
              <span className="text-zinc-400 text-base font-normal"> ({formatDate(digest.date)})</span>
              <div className="text-zinc-400 text-base mt-1">{digest.summary}</div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
