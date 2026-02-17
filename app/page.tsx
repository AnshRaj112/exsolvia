import Hero from "./components/hero";
import About from "./components/about";
import Products from "./components/products";
import Innovations from "./components/innovations";
import Team from "./components/team";
import ApplyNow from "./components/applyNow";
import Image from "next/image";
import heroImage from "../assets/hero-campus-tech.jpg";
import styles from "./components/styles/comingSoon.module.scss";

function LandingContent() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Innovations />
      <Team />
      <ApplyNow />
    </>
  );
}

function ComingSoon() {
  return (
    <section className={styles.comingSoon}>
      <div className={styles.imageWrapper}>
        <Image src={heroImage} alt="" fill priority className={styles.image} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>EXSOLVIA</p>
        <h1 className={styles.title}>Coming soon</h1>
        <p className={styles.subtitle}>
          We’re working on something new. Check back shortly.
        </p>
        <div className={styles.accent} aria-hidden="true" />
      </div>
    </section>
  );
}

export default function Home() {
  // Keep the original landing content in the codebase, but don't show it.
  // Flip this to `true` later if you want to restore the full landing page.
  const showLanding = true;
  return showLanding ? <LandingContent /> : <ComingSoon />;
}
