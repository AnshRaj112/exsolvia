"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "../../components/material-icon";

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        if (cancelled) return;
        if (data.success) {
          setBlog(data.data);
          setError(null);
        } else {
          setError(data.error || "Blog not found");
        }
      } catch {
        if (!cancelled) setError("Failed to fetch blog");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="min-h-screen px-8 pb-24 pt-8">
        <div className="mx-auto max-w-3xl py-24 text-center font-body text-on-surface-variant">
          Loading theory...
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen px-8 pb-24 pt-8">
        <div className="mx-auto max-w-3xl py-24 text-center">
          <p className="mb-8 text-primary-container">{error || "Blog not found"}</p>
          <Link href="/blog" className="font-headline font-bold text-primary underline">
            ← Back to editorial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-24 pt-8">
      <div className="relative mx-auto max-w-4xl px-6">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary-container"
        >
          <MaterialIcon name="arrow_back" className="text-sm" />
          Intelligence Archives
        </Link>

        <header className="relative mb-16 overflow-hidden rounded-md border border-outline-variant/10">
          <div className="relative h-64 w-full md:h-96">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmIx8DI5Ki8mAFNX0FIcbPSkZeP-dzeh4omzeRQPiSDj9haW-QFVj2Hidqrxn8-kzvd6G0QWguCxEGoRZ6Z9jIStmxyclBZK8GMfI4JxtbRMiIySc-1trwT-tSR1V_buYk3AMRk5etEKnYltn8Um-pQPl3nrp8bAXSmygvtV2lajmSeH06UI7Zemwfjix5ipVHVHdrQ9ym-Eh8XGn8CmWghUm3gWe-1NK_hKYCFi3d3YnIusgO2HOAN2rsT3vnDTvBcQv02vwBYVw"
              alt=""
              fill
              className="object-cover opacity-50"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="p-8 md:p-12">
            <div className="mb-6 flex flex-wrap gap-4">
              <span className="rounded-sm border border-primary-container/20 bg-secondary-container/40 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
                Editorial
              </span>
              <time className="font-label text-[10px] uppercase tracking-widest text-gray-500">
                {formatDate(blog.createdAt)}
              </time>
            </div>
            <h1 className="mb-6 font-headline text-4xl font-black tracking-tighter text-white md:text-6xl">
              {blog.title}
            </h1>
            {blog.description ? (
              <p className="text-lg leading-relaxed text-on-surface-variant">{blog.description}</p>
            ) : null}
          </div>
        </header>

        <div className="max-w-none space-y-6 font-body text-lg leading-relaxed text-gray-300">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph || "\u00A0"}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
