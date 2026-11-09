import { useEffect, useState } from "react";
import { CONTACT } from "../config";

const LINKS = [
  { href: "/#fleet", label: "Fleet" },
  { href: "/#requirements", label: "Requirements" },
  { href: "/#desks", label: "Desks" },
];

type Props = {
  homeHref?: string;
  onBookNow: () => void;
};

export function Header({ homeHref = "/#top", onBookNow }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 880) setOpen(false);
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
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href={homeHref} onClick={close}>
          <img src="/logo.png" alt="" width={40} height={40} />
          <span className="brand-text">
            <span className="brand-name">{CONTACT.brand}</span>
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
            Book now
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
                strokeWidth="1.5"
                fill="none"
              />
            ) : (
              <path
                d="M0 1 H18 M0 7 H18 M0 13 H18"
                stroke="currentColor"
                strokeWidth="1.5"
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
          Book now
        </button>
      </nav>
    </header>
  );
}
