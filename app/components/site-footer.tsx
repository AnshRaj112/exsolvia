import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-900 bg-gradient-to-t from-neutral-900 to-neutral-950 px-8 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-6 font-headline text-3xl font-black text-neutral-50">
            EXSOLVIA
          </div>
          <p className="text-xs leading-relaxed tracking-wider text-neutral-500">
            Defining the digital frontier through precision and foresight.
          </p>
        </div>
        <div>
          <h4 className="mb-6 font-headline font-bold text-neutral-100">Platform</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/products"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-headline font-bold text-neutral-100">Company</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/about"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-headline font-bold text-neutral-100">Legal</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/terms"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Legal
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="font-label text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-400"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 sm:flex-row">
        <p className="font-label text-xs uppercase tracking-widest text-neutral-500">
          © {year} EXSOLVIA Technology. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined cursor-pointer text-neutral-600 transition-colors hover:text-primary">
            public
          </span>
          <span className="material-symbols-outlined cursor-pointer text-neutral-600 transition-colors hover:text-primary">
            lan
          </span>
        </div>
      </div>
    </footer>
  );
}
