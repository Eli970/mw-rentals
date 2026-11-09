import { useEffect, useState } from "react";
import { CONTACT } from "../config";

const LINKS = [
  { href: "/#fleet", label: "Fleet" },
  { href: "/#why", label: "Why MW" },
  { href: "/#how", label: "How it works" },
  { href: "/#stories", label: "Stories" },
  { href: "/#faq", label: "FAQ" },
];

type Props = {
  homeHref?: string;
  onBookNow: () => void;
};

export function Header({ homeHref = "/#top", onBookNow }: Props) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 720) setOpen(false);
    };
    const onHash = () => setOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const close = () => setOpen(false);
  const book = () => {
    close();
    onBookNow();
  };

  return (
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <div className="header-inner">
        <a className="brand" href={homeHref} onClick={close}>
          <img src="/logo.jpg" alt="" width={46} height={46} />
          <span className="brand-text">
            <span className="brand-name">
              <span>MW</span> <span>Rentals</span>
            </span>
            <span className="brand-tag">{CONTACT.tagline}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <button className="btn btn-gold" type="button" onClick={book}>
            Book Now
          </button>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            {open ? (
              <path
                d="M1 1 L17 13 M17 1 L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            ) : (
              <path
                d="M0 1 H18 M0 7 H18 M0 13 H18"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <button className="btn btn-gold" type="button" onClick={book}>
          Book Now
        </button>
      </nav>
    </header>
  );
}
