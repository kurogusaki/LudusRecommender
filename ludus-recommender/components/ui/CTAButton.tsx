"use client";
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  label: string;
}

export default function CTAButton({ href, label }: CTAButtonProps) {
  return (
    <>
      <style>{`
        .cta-button {
          display: inline-block;
          font-family: var(--font-ui), sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--background);
          background: var(--accent);
          padding: 0.85rem 2.5rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .cta-button:hover {
          background: var(--accent-light);
        }
      `}</style>
      <Link href={href} className="cta-button">
        {label}
      </Link>
    </>
  );
}