"use client";
import React from "react";
import Link from "next/link";
import styles from "./styles/products.module.scss";
import { LuUtensilsCrossed } from "react-icons/lu";
import { PRODUCTS } from "../lib/products-data";

const Products: React.FC = () => {
  return (
    <section id="products" className={styles.productsSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleBase}>Our </span>
          <span className={styles.titleHighlight}>Products</span>
        </h1>
        <p className={styles.subtitle}>
          Innovative solutions that transform how people interact with technology in their daily lives.
        </p>

        <div className={styles.cardsGrid}>
          {PRODUCTS.map((product) => (
            <div key={product.slug} className={styles.cardKampyn}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  <LuUtensilsCrossed size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <span className={styles.cardTag}>{product.tagline}</span>
                </div>
              </div>

              <p className={styles.cardDescription}>{product.shortDescription}</p>

              <ul className={styles.featuresList}>
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className={styles.ctaRow}>
                <Link href={`/products/${product.slug}`} className={styles.ctaLink}>
                  Learn more
                </Link>
                {product.externalUrl ? (
                  <button
                    type="button"
                    className={styles.ctaButton}
                    aria-label={`Visit ${product.name}`}
                    onClick={() => window.open(product.externalUrl, "_blank", "noopener,noreferrer")}
                  >
                    Visit {product.name}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
