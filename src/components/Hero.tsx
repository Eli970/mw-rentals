import { FormEvent } from "react";
import { CATEGORIES, CITIES, type InquiryDraft } from "../config";

type Props = {
  draft: InquiryDraft;
  onChange: (next: InquiryDraft) => void;
  onSearch: () => void;
};

export function Hero({ draft, onChange, onSearch }: Props) {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="kicker">Short &amp; long-term · Worldwide</p>
        <h1 id="hero-title" className="display">
          Drive the world on your terms.
        </h1>
        <hr className="gold-rule" />
        <p className="hero-lead">
          A considered fleet for weekend city stays and six-month assignments.
          One named concierge, transparent daily rates, and pickup in eight
          global desks.
        </p>
      </div>

      <form className="search-card" onSubmit={submit} aria-label="Fleet search">
        <div className="search-grid">
          <label className="field">
            <span>City</span>
            <select
              value={draft.location}
              onChange={(e) => onChange({ ...draft, location: e.target.value })}
            >
              <option value="All">All cities</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Category</span>
            <select
              value={draft.category}
              onChange={(e) => onChange({ ...draft, category: e.target.value })}
            >
              <option value="All">Any category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Pickup</span>
            <input
              type="date"
              value={draft.startDate}
              onChange={(e) => onChange({ ...draft, startDate: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Return</span>
            <input
              type="date"
              value={draft.endDate}
              min={draft.startDate || undefined}
              onChange={(e) => onChange({ ...draft, endDate: e.target.value })}
            />
          </label>
          <button className="btn btn-navy" type="submit">
            View fleet
          </button>
        </div>
      </form>
    </section>
  );
}
