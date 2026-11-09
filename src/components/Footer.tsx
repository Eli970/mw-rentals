import { CONTACT } from "../config";

type Props = {
  onBookNow: () => void;
};

export function Footer({ onBookNow }: Props) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="MW Rentals logo" width={48} height={48} />
            <div>
              <strong>{CONTACT.brand}</strong>
              <div>{CONTACT.tagline}</div>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="/#fleet">Fleet</a>
            <a href="/#requirements">Requirements</a>
            <a href="/#desks">Desks</a>
            <button type="button" className="footer-link-btn" onClick={onBookNow}>
              Book now
            </button>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href={`mailto:${CONTACT.email}`}>Email</a>
          </nav>
        </div>
        <p className="legal">
          © {new Date().getFullYear()} MW Rentals. Daily rates are indicative
          and confirmed in writing. Insurance, age limits, and cross-border
          rules vary by city and category.
        </p>
      </div>
    </footer>
  );
}
