import Link from "next/link";
import { MaterialIcon } from "../../components/material-icon";

export default function BlogDetailPage() {
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
