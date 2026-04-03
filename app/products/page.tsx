import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../components/material-icon";

const PRODUCTS = [
  {
    title: "OMNICYPHER_V4",
    href: "/products/omnicypher-v4",
    badge: "Enterprise",
    badgeClass: "bg-primary-container text-on-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrIKpwIvP2nXv6_fpi9dXYK3kVoXL-pDrIQ2H_tQtmTjzBAojL3eKcv9OH39br3XovyS9Gc0SreYwGMIoq0mlf1RqsPCWT31jaQGrb4fbIDKxnpa8xK5BsPCQqIwNRhBm0r5zaJlWBJbJFoNLIWkWgKJdr9sYORhJdF_xQsdQwyAcQOyIOuCg94ncmgwou_B1HEDf1Po0VGOTQ_omvMoH4IMaB9LoMjEIdy7xQhGIMNtCMWMU7LiDhyaFU9G1C7Up5FSCjnvd4xY8",
    desc: "End-to-end neural encryption protocol for multi-tenant cloud environments. Secure your legacy with high-frequency key rotation.",
  },
  {
    title: "KINETIC_SDK",
    href: "/products",
    badge: "DevTools",
    badgeClass:
      "bg-surface-container-highest text-on-surface border border-outline-variant/30",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcwTZTSWofnVJ5XgJALRuRFSQt-2IgTRsQ4p84h2hoWrr5U7I5AFagymi6JED_pg-5IUJsV8pP7jxTxZxlBFhyV_9oG5fdjhHXm6d11MD7NZ4STTU7oamEcUPSj97y8DjgVBPRb3_ecWx6nA4n6eyKi2T_aV0DlwU7lPve5cFMuLruIou-ZJviNyHmqMWo36y3Rt1UjTxEgruiMOwOWKdMo04ncUcoGvcgr13bA_65RGUAc3TWYhykBynB5mXy1gFn_7_8kJVA7jk",
    desc: "A low-latency framework for building ultra-responsive real-time applications with native Go and Rust bindings.",
  },
  {
    title: "VOID_BALANCER",
    href: "/products",
    badge: "Optimization",
    badgeClass: "bg-primary-container text-on-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfoNKf77GDjs5VSBP-TmJFwrSSESwqBFeEDZX4qrqXTKxUswTBIHAcge1wMxkhKHS-dbBaVkfA3ixik3Jkh6n2vbKO7LGYxA205o9fDZl91n1QCChW17AQfttKrxUyTENmgkD3sKJNmLX-maH4He8LMOQgi5k-gP_TkNI14Kzg6aD0S--SyGqYQhZGgoO091phle0w5yZ-3l_2Mq14L1RnEMbiy34NmLQ4DgVfe7xZ19HPttG1dFu34qXkf5ZqgSCLWHZLovdHzo",
    desc: "Autonomous load distribution using predictive heat-mapping. Zero downtime migrations across global clusters.",
  },
  {
    title: "SIGNAL_FIRE",
    href: "/products",
    badge: "Enterprise",
    badgeClass:
      "bg-surface-container-highest text-on-surface border border-outline-variant/30",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-lBSXiC4QrLlCdRg62HHa6fmYO9OAc4lxqJ93gjzoIiNP70uu56K-EF8aJTZs9F68VHU5TNk53E8QRTri6e6A9PwCsvF4Ium2XuONlyJrQaZtz2u-_JSaIN6oaoV_8xcAaWrQa21zrhdNP-2pZhq9UARPHNrf6sC9_88-eLHuELDR3jqlf3EtNCB5Lq9kT308Wgje6WApMVfRdoLeg4A5RctVPZFsWiOseb21IN6756S8xyagbFH2EVSetFj5FgbW8pjiqBTWMs",
    desc: "Global incident response and alerting engine. Real-time telemetry monitoring with sub-millisecond latency.",
  },
  {
    title: "NEXUS_OS",
    href: "/products",
    badge: "DevTools",
    badgeClass:
      "bg-surface-container-highest text-on-surface border border-outline-variant/30",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs2DUN2-PiiiG4-jZ47JYJJIqO074C9gBQqC-jIu0Sx_3LH6tYMch0duhP0mXElBttFegY5KFwi6D3Ypl-9DHJIp9FFNxy9RyJyiYwCNI5COrR6pLIVXfJRqSxySDKRStxZI9z_gdd37pM9UoQEWS8iu086FJ9OdgNgRRwJZQMGKUtCMMq0dDnlgbEq3IfVcZNNK9zG1ZODeHITSIsnU9-r3Gqkig58Sx_ElDDVa-cCDkTR_c0xbzIR7i6r802-22G0-JR7PqteXU",
    desc: "A minimalist, kernel-hardened OS environment for edge computing. Stripped of bloat, optimized for raw performance.",
  },
  {
    title: "STRATUM_X",
    href: "/products",
    badge: "Optimization",
    badgeClass: "bg-primary-container text-on-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Ddb17GV0dBPKZpDhGsgg4ElUW315RG29-HHYGS8l73g1wqooaPAF8FgucfZ80rnTjRJkS9S2R0m9rBESKH1uZejElrPiBnSUxPTsoo079ZDmzkZ37FsQe_qMcfvCw41rJF9VRS00H0klBhJzUIWmsyrzrGrk0g14Y3BBaaJ4PpOhdhasoNexVGdR8hQetRgA4XDxTwyu7kXcA3S76ZV_wkyALjElDFYEKESjQwt8KuO5OuXO1T8SSDkARGXI2NM0zN82L4fW40g",
    desc: "Parallel computing layer for massive datasets. Scalable AI training infrastructure for the modern enterprise.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pb-24">
      <main className="mx-auto max-w-7xl px-8 pb-24 pt-8">
        <header className="relative mb-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px]" />
          <h1 className="mb-4 font-headline text-6xl font-black uppercase tracking-tighter md:text-8xl">
            Solutions<span className="text-primary-container">.</span>
          </h1>
          <p className="max-w-2xl font-body text-xl leading-relaxed text-on-surface-variant">
            Precision-engineered tools designed for sovereign intelligence and high-velocity systems
            architecture.
          </p>
        </header>

        <div className="sticky top-20 z-40 mb-12 flex flex-wrap items-center gap-4 bg-background/80 py-6 backdrop-blur-md">
          <div className="text-label-md mr-2 border-r border-outline-variant/30 pr-6 font-bold uppercase tracking-[0.2em] text-primary-fixed">
            System Catalog
          </div>
          <button
            type="button"
            className="rounded-sm bg-surface-container-high px-6 py-2 text-sm font-semibold text-on-surface transition-all duration-300 hover:bg-primary-container hover:text-on-primary"
          >
            All Units
          </button>
          <button
            type="button"
            className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest px-6 py-2 text-sm font-semibold text-on-surface-variant transition-all duration-300 hover:border-primary/50"
          >
            Enterprise Solutions
          </button>
          <button
            type="button"
            className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest px-6 py-2 text-sm font-semibold text-on-surface-variant transition-all duration-300 hover:border-primary/50"
          >
            Developer Tools
          </button>
          <button
            type="button"
            className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest px-6 py-2 text-sm font-semibold text-on-surface-variant transition-all duration-300 hover:border-primary/50"
          >
            System Optimization
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-md bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,85,63,0.15)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={p.img}
                  alt=""
                  width={600}
                  height={256}
                  className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                <div
                  className={`absolute right-4 top-4 rounded-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest ${p.badgeClass}`}
                >
                  {p.badge}
                </div>
              </div>
              <div className="p-8">
                <h3 className="mb-4 font-headline text-2xl font-bold tracking-tight">{p.title}</h3>
                <p className="mb-8 line-clamp-3 font-body leading-relaxed text-on-surface-variant">
                  {p.desc}
                </p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 font-headline font-bold text-primary-container transition-all group-hover:gap-4"
                >
                  Learn More
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-container transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </main>

      <section className="border-y border-outline-variant/10 bg-surface-container-lowest px-8 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-6 font-headline text-4xl font-black uppercase tracking-tight">
              Custom Architecture?
            </h2>
            <p className="font-body text-lg text-on-surface-variant">
              Our engineering elite can help design bespoke system environments tailored to your
              specific operational constraints.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-sm bg-primary-container px-10 py-4 font-headline font-bold text-on-primary transition-all hover:brightness-110"
          >
            CONSULT ENGINEERS
          </Link>
        </div>
      </section>
    </div>
  );
}
