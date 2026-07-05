"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

const FALLBACK_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmIx8DI5Ki8mAFNX0FIcbPSkZeP-dzeh4omzeRQPiSDj9haW-QFVj2Hidqrxn8-kzvd6G0QWguCxEGoRZ6Z9jIStmxyclBZK8GMfI4JxtbRMiIySc-1trwT-tSR1V_buYk3AMRk5etEKnYltn8Um-pQPl3nrp8bAXSmygvtV2lajmSeH06UI7Zemwfjix5ipVHVHdrQ9ym-Eh8XGn8CmWghUm3gWe-1NK_hKYCFi3d3YnIusgO2HOAN2rsT3vnDTvBcQv02vwBYVw";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (!mounted) return;
        if (response.ok && data.success && Array.isArray(data.data)) {
          setBlogs(data.data);
        }
      } catch {
        // No-op: empty state rendered below.
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="obsidian-glow min-h-screen pb-24 pt-8">
      <div className="mx-auto max-w-[1440px] px-8">
        <section className="mb-20">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <label className="font-label mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary-fixed">
                Intelligence Archives
              </label>
              <h1 className="font-headline text-7xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl">
                THE <span className="text-primary-container">EDITORIAL</span>
                <br />
                FRONTIER
              </h1>
            </div>
            <div className="pb-4 lg:col-span-4">
              <p className="max-w-sm border-l border-outline-variant/30 pl-6 text-lg leading-relaxed text-gray-400">
                Deep analysis of the systems shaping the future of decentralized intelligence and
                autonomous governance.
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-md border border-outline-variant/15 bg-surface-container-lowest/40 px-8 py-20 text-center">
            <p className="font-headline text-xl font-semibold text-white">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-md border border-outline-variant/15 bg-surface-container-lowest/40 px-8 py-20 text-center">
            <p className="font-headline text-xl font-semibold text-white md:text-2xl">
              No blogs available right now
            </p>
            <p className="mt-4 max-w-md text-on-surface-variant">
              Blogs will appear here after they are published by an admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog._id}`}
                className="group overflow-hidden rounded-md border border-outline-variant/10 bg-surface-container-low transition hover:border-primary/40"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={blog.imageUrl || FALLBACK_IMG}
                    alt={blog.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 font-headline text-2xl font-bold tracking-tight text-white">
                    {blog.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
                    {blog.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
