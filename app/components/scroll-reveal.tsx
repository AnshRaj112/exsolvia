'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './styles/scroll-reveal.module.scss';

const phrase = "Exsolvia is building products that serve humanity";

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  // Map this specific word's scroll range
  // x goes from offset right (e.g. 100px) to 0
  // opacity goes from 0 to 1
  const x = useTransform(progress, range, ["50vw", "0vw"]);
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span style={{ x, opacity }} className={styles.word}>
      {children}
    </motion.span>
  );
};

export default function ScrollReveal() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const words = phrase.split(" ");

  return (
    <section ref={container} className={styles.container}>
      <div className={styles.stickyWrapper}>
        <div className={styles.textContainer}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
}
