"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

const words = [
  "Exsolvia",
  "is",
  "building",
  "companies",
  "that",
  "serve",
  "humanity."
];

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg",
  "/img7.jpg",
  "/img8.jpg"
];

export default function Home() {

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {

    const handleScroll = () => {

      const section = document.getElementById("scroll-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress =
        (windowHeight - rect.top) / windowHeight;

      const clamped = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(clamped);

    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <main className={styles.main}>

      {/* NAVBAR */}

      <header className={styles.navbar}>

        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={28} height={28}/>
          <span>Exsolvia</span>
        </div>

        <nav className={styles.menu}>
          <a href="#">manifesto</a>
          <a href="#">updates</a>
          <a href="#">missions</a>
          <a href="#">companies</a>
        </nav>

      </header>

      {/* HERO */}

      <section className={styles.hero}>

        <div className={styles.rowsWrapper}>

          <div className={styles.row}>
            {[...images, ...images].map((src, i) => (
              <div key={i} className={styles.card}>
                <Image src={src} alt="" fill className={styles.image}/>
              </div>
            ))}
          </div>

          <div className={`${styles.row} ${styles.middle}`}>
            {[...images, ...images].map((src, i) => (
              <div key={i} className={styles.card}>
                <Image src={src} alt="" fill className={styles.image}/>
              </div>
            ))}
          </div>

          <div className={styles.row}>
            {[...images, ...images].map((src, i) => (
              <div key={i} className={styles.card}>
                <Image src={src} alt="" fill className={styles.image}/>
              </div>
            ))}
          </div>

        </div>

        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>Exsolvia</h1>
          <p>scroll to discover</p>
        </div>

      </section>

      {/* SCROLL TEXT */}

      <section id="scroll-section" className={styles.scrollSection}>

        <div className={styles.stickyWrapper}>

          <h2
            className={styles.textReveal}
            style={{
              transform:`translateX(${500 - scrollProgress * 1000}px)`
            }}
          >

            {words.map((word,i)=>(
              <span key={i} className={styles.word}>
                {word}
              </span>
            ))}

          </h2>

        </div>

      </section>

    </main>
  );
}