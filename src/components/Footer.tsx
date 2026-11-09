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
            <img src="/logo.jpg" alt="MW Rentals logo" width={58} height={58} />
            <div>
              <strong style={{ color: "#fff", letterSpacing: "0.06em" }}>
                MW RENTALS
              </strong>
              <div>{CONTACT.tagline}</div>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="/#fleet">Fleet</a>
            <a href="/#why">Why MW</a>
            <a href="/#how">How it works</a>
            <a href="/#faq">FAQ</a>
            <button type="button" className="footer-link-btn" onClick={onBookNow}>
              Book Now
            </button>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href={`mailto:${CONTACT.email}`}>Email</a>
          </nav>
        </div>
        <p className="legal">
          © {new Date().getFullYear()} MW Rentals. Daily rates are indicative
          and confirmed in writing on quote. Insurance, age limits, and
          cross-border rules vary by city and category.
        </p>
      </div>
    </footer>
  );
}
