import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "../components/material-icon";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <nav className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#2A2A2A] bg-[#0E0E0E] px-4 py-6">
        <div className="mb-10 px-4">
          <Link href="/" className="font-headline text-xl font-bold uppercase tracking-widest text-[#FF0800]">
            EXSOLVIA
          </Link>
          <p className="font-headline mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            Intelligence Division
          </p>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex cursor-pointer items-center border-l-4 border-[#FF0800] bg-[#2A2A2A] px-4 py-3 text-white transition-all">
            <MaterialIcon name="dashboard" className="mr-3 text-sm" />
            <span className="font-headline text-sm uppercase tracking-widest">Dashboard</span>
          </div>
          <div className="flex cursor-pointer items-center px-4 py-3 text-gray-500 transition-all hover:bg-[#131313] hover:text-gray-300">
            <MaterialIcon name="monitoring" className="mr-3 text-sm" />
            <span className="font-headline text-sm uppercase tracking-widest">Analytics</span>
          </div>
          <div className="flex cursor-pointer items-center px-4 py-3 text-gray-500 transition-all hover:bg-[#131313] hover:text-gray-300">
            <MaterialIcon name="settings" className="mr-3 text-sm" />
            <span className="font-headline text-sm uppercase tracking-widest">Settings</span>
          </div>
        </div>
        <div className="mt-auto border-t border-[#2A2A2A] px-2 pt-6">
          <button
            type="button"
            className="w-full bg-primary-container px-4 py-3 font-headline text-xs font-bold uppercase tracking-tighter text-on-primary transition-all hover:brightness-110 active:scale-95"
          >
            New Analysis
          </button>
          <div className="mt-6 flex items-center space-x-3 px-2">
            <div className="h-10 w-10 overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-highest">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnu4H9gwP08cL2oGx6kKBawcBNpc63kta68eO5VNF4lJtelHGLAMWRjL2jubp-Ma0jrKygMG1gq-916lqKxSxbMcZV6qUo1YXljGm9CWc5CoCzCjEWZZvdoQjohXVwR562Acu3xIAf3bGVXlYARuL2tWO8fBeo5pMrl1oeCB5E6NuUPjiE6z5zpYLNjtEPjuw3RMa60tRPZIsrGPiHDKzy_tPyZdAq8ugWtZaiTNUCIHvwBQRyOrc1eh4hcT7U4vpiVMN8TZ8ivEk"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-headline text-xs font-bold uppercase tracking-tight text-on-surface">
                Command Center
              </p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Elite Intelligence</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="ml-64 min-h-screen flex-1 p-8 lg:p-12">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-5xl font-black tracking-tighter text-white">
              OPERATIONS_CANVAS
            </h2>
            <p className="font-label mt-2 text-sm uppercase tracking-widest text-gray-500">
              System Status: <span className="animate-pulse text-[#FF0800]">OPTIMIZED</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-label text-xs uppercase tracking-widest text-gray-600">Deployment Node</p>
            <p className="font-headline text-lg font-bold uppercase text-white">EX-04_SILICON_VALLEY</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <section className="relative col-span-12 overflow-hidden border-l-4 border-primary-container bg-surface-container p-8 lg:col-span-8">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <MaterialIcon name="rocket_launch" className="text-8xl" />
            </div>
            <h3 className="mb-6 flex items-center font-headline text-xl font-bold uppercase tracking-tighter text-white">
              <MaterialIcon name="lan" className="mr-2 text-primary-container" />
              Active Deployments
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {["NEURAL_SYNC_V1", "VOID_BALANCER", "OMNICYPHER_V4"].map((name) => (
                <div key={name} className="border border-outline-variant/10 bg-surface-container-lowest p-5">
                  <p className="mb-1 font-label text-[10px] uppercase text-gray-500">Node Alpha</p>
                  <p className="font-headline text-lg font-bold text-white">{name}</p>
                  <div className="mt-4 h-1 w-full bg-surface-container-highest">
                    <div className="h-full w-2/3 bg-primary-container" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="col-span-12 flex flex-col justify-between rounded-md border border-outline-variant/10 bg-surface-container-low p-8 lg:col-span-4">
            <div>
              <h3 className="mb-4 font-headline text-lg font-bold text-white">Threat Index</h3>
              <p className="text-sm text-on-surface-variant">Ambient risk within normal operational bounds.</p>
            </div>
            <div className="mt-8 font-headline text-4xl font-black text-primary-container">0.02</div>
          </section>
        </div>
      </main>
    </div>
  );
}
