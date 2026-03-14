'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles/hero.module.scss';

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

const Hero: React.FC = () => {
  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
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
  );
};

export default Hero;


