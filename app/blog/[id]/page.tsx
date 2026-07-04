import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../../components/material-icon";
import connectDB from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

type BlogData = {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

const FALLBACK_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmIx8DI5Ki8mAFNX0FIcbPSkZeP-dzeh4omzeRQPiSDj9haW-QFVj2Hidqrxn8-kzvd6G0QWguCxEGoRZ6Z9jIStmxyclBZK8GMfI4JxtbRMiIySc-1trwT-tSR1V_buYk3AMRk5etEKnYltn8Um-pQPl3nrp8bAXSmygvtV2lajmSeH06UI7Zemwfjix5ipVHVHdrQ9ym-Eh8XGn8CmWghUm3gWe-1NK_hKYCFi3d3YnIusgO2HOAN2rsT3vnDTvBcQv02vwBYVw";

type Props = { params: Promise<{ id: string }> };

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  let blog: BlogData | null = null;

  try {
    await connectDB();
    const found = await BlogModel.findById(id).lean<BlogData | null>();
    if (found) blog = found;
  } catch {
    blog = null;
  }

  if (!blog) {
    return (
      <div className="min-h-screen px-8 pb-24 pt-8">
        <div className="mx-auto max-w-3xl py-24 text-center">
          <p className="mb-4 font-headline text-xl font-semibold text-white md:text-2xl">
            No blogs available right now
          </p>
          <p className="mb-10 text-on-surface-variant">
            This article is not available. Check back later for new posts.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-headline font-bold text-primary underline-offset-4 hover:text-primary-container"
          >
            <MaterialIcon name="arrow_back" className="text-sm" />
            Back to editorial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen px-8 pb-24 pt-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 overflow-hidden rounded-md border border-outline-variant/15 bg-surface-container-low">
          <div className="relative h-64 md:h-96">
            <Image
              src={blog.imageUrl || FALLBACK_IMG}
              alt={blog.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="p-8">
            <h1 className="mb-4 font-headline text-4xl font-black tracking-tight text-white md:text-6xl">
              {blog.title}
            </h1>
            <p className="text-lg text-on-surface-variant">{blog.description}</p>
          </div>
        </header>

        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-on-surface-variant">
          {blog.content}
        </div>

        <Link
          href="/blog"
          className="mt-12 inline-flex items-center gap-2 font-headline font-bold text-primary underline-offset-4 hover:text-primary-container"
        >
          <MaterialIcon name="arrow_back" className="text-sm" />
          Back to editorial
        </Link>
      </div>
    </article>
  );
}
