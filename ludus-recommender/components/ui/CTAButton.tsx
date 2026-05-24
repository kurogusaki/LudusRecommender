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
          font-family: var(--font-jersey25);
          font-size: 1rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--background);
          background: var(--gold);
          padding: 0.85rem 2.5rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .cta-button:hover {
          background: var(--gold-light);
        }
      `}</style>
      <Link href={href} className="cta-button">
        {label}
      </Link>
    </>
  );
}