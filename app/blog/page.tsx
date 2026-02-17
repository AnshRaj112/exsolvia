"use client";

import styles from "./blog.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>Exsolvia</h2>

        <ul className={styles.menu}>
          <li>Product</li>
          <li>Solutions</li>
          <li>Company</li>
          <li>Contact</li>
        </ul>

        <button className={styles.primaryBtn}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>

        <div className={styles.heroText}>
          <h1>
            One Platform. <br />
            Endless Possibilities.
          </h1>

          <p>
            Build, manage, and scale your digital
            products with Exsolvia.
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Start Free
            </button>

            <button className={styles.secondaryBtn}>
              Book Demo
            </button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.mockup}>
            Exsolvia Dashboard
          </div>
        </div>

      </section>

      {/* Features */}
      <section className={styles.features}>

        <h2>Why Choose Exsolvia?</h2>

        <div className={styles.featureGrid}>

          <div className={styles.featureCard}>
            <h3>Smart Hiring</h3>
            <p>Manage applicants efficiently.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Content System</h3>
            <p>Publish blogs & updates.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Team Workspace</h3>
            <p>Collaborate in real-time.</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Get Started Today</h2>
        <p>Join modern teams using Exsolvia.</p>

        <button className={styles.primaryBtn}>
          Create Account
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Exsolvia
      </footer>

    </main>
  );
}
