"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/applyNow.module.scss";
import type { PublicPosition } from "@/app/lib/positions-types";
import { publicPositionFromApi } from "@/app/lib/positions-types";

type ApplyNowProps = {
  /** When set (e.g. `/careers/apply?position=`), pre-selects that role in the form */
  initialPositionId?: string;
  /** From server: same list as /careers — avoids a second fetch and keeps data identical */
  initialPositions?: PublicPosition[];
  /** `embedded`: form only (used under PositionRolePanel). `page`: full apply block heading */
  variant?: "page" | "embedded";
};

const ApplyNow: React.FC<ApplyNowProps> = ({
  initialPositionId,
  initialPositions,
  variant = "page",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: "",
    portfolio: "",
    linkedin: "",
    github: "",
    message: "",
  });

  const [positions, setPositions] = useState<PublicPosition[]>(() => initialPositions ?? []);
  const [loadingPositions, setLoadingPositions] = useState(() => initialPositions === undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (initialPositions !== undefined) {
      setPositions(initialPositions);
      setLoadingPositions(false);
    }
  }, [initialPositions]);

  useEffect(() => {
    if (initialPositions !== undefined) return;
    fetchPositions();
  }, [initialPositions]);

  useEffect(() => {
    if (!initialPositionId || positions.length === 0) return;
    const match = positions.find((p) => p._id === initialPositionId);
    if (match) {
      setFormData((prev) => ({ ...prev, position: match.title }));
    }
  }, [initialPositionId, positions]);

  const fetchPositions = async () => {
    try {
      setLoadingPositions(true);
      const response = await fetch("/api/positions");
      const data = await response.json();

      if (data.success) {
        setPositions(
          (data.data as Record<string, unknown>[]).map((p) => publicPositionFromApi(p))
        );
      } else {
        console.error("Failed to load positions:", data.error);
      }
    } catch (err) {
      console.error("Error fetching positions:", err);
    } finally {
      setLoadingPositions(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully! We will get back to you soon.",
        });
        const keepTitle =
          initialPositionId && positions.length > 0
            ? positions.find((p) => p._id === initialPositionId)?.title ?? ""
            : "";
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: keepTitle,
          resume: "",
          portfolio: "",
          linkedin: "",
          github: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit application. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className={`${styles.applySection} ${variant === "embedded" ? styles.embedded : ""}`}
    >
      <div className={styles.container}>
        {variant === "page" && (
          <>
            <h1 className={styles.title}>
              <span className={styles.titleBase}>Join </span>
              <span className={styles.titleHighlight}>Our Team</span>
            </h1>
            <p className={styles.subtitle}>
              Roles listed here match admin. Select one and submit your details.
            </p>
          </>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="position" className={styles.label}>
                Position <span className={styles.required}>*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={styles.input}
                disabled={loadingPositions}
              >
                <option value="">
                  {loadingPositions ? "Loading positions..." : "Select a position"}
                </option>
                {positions.map((position) => (
                  <option key={position._id} value={position.title}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="resume" className={styles.label}>
                Resume URL <span className={styles.required}>*</span>
              </label>
              <input
                type="url"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="portfolio" className={styles.label}>
                Portfolio URL
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin" className={styles.label}>
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="github" className={styles.label}>
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
              placeholder="Anything else you'd like us to know?"
            />
          </div>

          {submitStatus.type && (
            <div
              className={
                submitStatus.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplyNow;
