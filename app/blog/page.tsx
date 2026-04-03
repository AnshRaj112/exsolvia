"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MaterialIcon } from "../components/material-icon";

type Blog = {
  _id: string;
  title: string;
  description: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featured, setFeatured] = useState<Blog | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length) {
          setBlogs(d.data);
          setFeatured(d.data[0]);
        }
      })
      .catch(() => {});
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

        <section className="mb-16 flex flex-wrap items-center gap-4 border-b border-surface-container-high pb-8">
          <button
            type="button"
            className="rounded-sm bg-primary-container px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-primary"
          >
            All Theory
          </button>
          <button
            type="button"
            className="rounded-sm bg-surface-container-high px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-all hover:text-white"
          >
            Intelligence
          </button>
          <button
            type="button"
            className="rounded-sm bg-surface-container-high px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-all hover:text-white"
          >
            Systems
          </button>
          <button
            type="button"
            className="rounded-sm bg-surface-container-high px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-all hover:text-white"
          >
            Future
          </button>
        </section>

        <div id="build-in-public" className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <article className="group cursor-pointer md:col-span-8">
            <div className="card-hover-effect relative h-[600px] overflow-hidden rounded-md border border-outline-variant/10 bg-surface-container-lowest transition-all duration-500">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmIx8DI5Ki8mAFNX0FIcbPSkZeP-dzeh4omzeRQPiSDj9haW-QFVj2Hidqrxn8-kzvd6G0QWguCxEGoRZ6Z9jIStmxyclBZK8GMfI4JxtbRMiIySc-1trwT-tSR1V_buYk3AMRk5etEKnYltn8Um-pQPl3nrp8bAXSmygvtV2lajmSeH06UI7Zemwfjix5ipVHVHdrQ9ym-Eh8XGn8CmWghUm3gWe-1NK_hKYCFi3d3YnIusgO2HOAN2rsT3vnDTvBcQv02vwBYVw"
                alt=""
                fill
                className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                sizes="66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-2xl p-10">
                <div className="mb-6 flex items-center gap-4">
                  <span className="rounded-sm border border-primary-container/20 bg-secondary-container/40 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-on-secondary-container backdrop-blur-md">
                    Featured Analysis
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-gray-500">
                    12 Min Read
                  </span>
                </div>
                <h2 className="mb-6 font-headline text-5xl font-bold tracking-tighter text-white transition-colors group-hover:text-primary-container">
                  {featured?.title ?? "The Future of Neural Sovereignty"}
                </h2>
                <p className="mb-8 translate-y-4 font-body text-lg leading-relaxed text-gray-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {featured?.description ??
                    "Examining the intersection of distributed computing and individual cognitive freedom in the age of generative monoliths."}
                </p>
                {featured ? (
                  <Link
                    href={`/blog/${featured._id}`}
                    className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.2em] text-primary-container"
                  >
                    Read Full Theory <MaterialIcon name="arrow_forward" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.2em] text-primary-container">
                    Read Full Theory <MaterialIcon name="arrow_forward" />
                  </span>
                )}
              </div>
            </div>
          </article>

          <article className="group cursor-pointer md:col-span-4">
            <div className="card-hover-effect relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-outline-variant/10 bg-surface-container p-8 transition-all">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary-container/5 blur-3xl transition-all group-hover:bg-primary-container/20" />
              <div>
                <span className="mb-4 block font-label text-[10px] uppercase tracking-widest text-gray-500">
                  Systems Engineering
                </span>
                <h3 className="mb-4 font-headline text-3xl font-bold tracking-tighter text-white transition-colors group-hover:text-primary-container">
                  Scaling Intelligent Systems
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  Why horizontal scaling in neural architectures requires a fundamental rethink of data
                  locality and entropy.
                </p>
              </div>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpOReOUjEKy3B-IS2T5AG6eILz390EUXgZpIIiqBPOr0ThIz3iqfB-zWrxfBuY3Fm3uYPvlih_IJzObrP_k7hTcrPA__giICEdpDO-NC1jQny71kc-WdNwFv0ZymBhlTTLxYklakOc05eyZi_VmxLo8aC2JtVFi9wrQIIZ1Cx9M6UUyz0of7XVXProy1DIqYeztp98O0gzblz5o3o2l8kJayNukKGkXBkGUBIHZvIPJr_uMn1TWo5c4hZWTMlKk42GvV3W_zTsdDs"
                alt=""
                width={400}
                height={192}
                className="mb-6 w-full rounded-sm object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] text-gray-600">AUG 24, 2024</span>
                <MaterialIcon
                  name="east"
                  className="text-primary-fixed transition-transform group-hover:translate-x-2"
                />
              </div>
            </div>
          </article>

          {blogs.slice(1, 4).map((b) => (
            <article key={b._id} className="md:col-span-4">
              <Link
                href={`/blog/${b._id}`}
                className="card-hover-effect block rounded-md border border-outline-variant/5 bg-surface-container-low p-8 transition-all"
              >
                <span className="font-label mb-4 block text-[10px] uppercase tracking-widest text-primary-container">
                  Archive
                </span>
                <h3 className="mb-6 font-headline text-2xl font-bold tracking-tight text-white">{b.title}</h3>
                <p className="line-clamp-3 text-sm text-gray-400">{b.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>

    </main>
  );
}
