import { CATEGORIES, CITIES, type InquiryDraft } from "../config";
import type { Car } from "../types";
import { CarCard } from "./CarCard";

type Props = {
  cars: Car[];
  draft: InquiryDraft;
  onChange: (next: InquiryDraft) => void;
  onBook: (car: Car) => void;
};

export function Fleet({ cars, draft, onChange, onBook }: Props) {
  const filtered = cars.filter((car) => {
    const byCat = draft.category === "All" || car.category === draft.category;
    const byCity = draft.location === "All" || car.location === draft.location;
    return byCat && byCity;
  });

  return (
    <section className="section" id="fleet" aria-labelledby="fleet-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">The fleet</p>
          <h2 id="fleet-title" className="display">
            Vehicles chosen for how they actually drive.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            Filter by city and category. Every listing shows a daily rate, a
            minimum driver age, and the desk that holds the keys. Long-term
            quotes are prepared from the same figures.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`chip${draft.category === "All" ? " is-active" : ""}`}
            onClick={() => onChange({ ...draft, category: "All" })}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip${draft.category === cat ? " is-active" : ""}`}
              onClick={() => onChange({ ...draft, category: cat })}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <label className="field">
            <span>Location</span>
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
          <p className="fleet-meta">
            {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}{" "}
            available
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="empty">
            Nothing in that combination yet. Reset the filters or send a
            booking request — we often source a match within a day.
          </p>
        ) : (
          <div className="grid">
            {filtered.map((car) => (
              <CarCard key={`${car.name}-${car.location}`} car={car} onBook={onBook} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
