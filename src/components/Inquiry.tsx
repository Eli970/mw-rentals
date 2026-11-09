import { CONTACT } from "../config";

type Props = {
  onBookNow: () => void;
};

export function Inquiry({ onBookNow }: Props) {
  return (
    <section className="section section-navy" id="book" aria-labelledby="book-title">
      <div className="wrap inquiry-split">
        <div>
          <p className="kicker">Book now</p>
          <h2 id="book-title" className="display">
            Tell us the city, the dates, and the car.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            Open the booking form to share driver details. We send a prefilled
            WhatsApp message to a coordinator — there is no booking engine on
            this page yet.
          </p>
          <button className="btn btn-gold" type="button" onClick={onBookNow}>
            Book Now
          </button>
        </div>

        <aside className="contact-aside" aria-label="Contact">
          <h3 className="display">Concierge desk</h3>
          <p className="lede">
            Prefer to skip the form? Write or call. We answer in English around
            the clock; other languages by arrangement.
          </p>
          <dl>
            <dt>WhatsApp / phone</dt>
            <dd>
              <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
            <dt>Hours</dt>
            <dd>{CONTACT.hours}</dd>
            <dt>Cities</dt>
            <dd>
              London, Dubai, New York, Miami, Los Angeles, Paris, Singapore,
              Tokyo
            </dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}
