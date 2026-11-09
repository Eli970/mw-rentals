import { CATEGORIES, CITIES, type InquiryDraft, type SortKey } from "../config";
import type { Car } from "../types";
import { CarCard } from "./CarCard";

type Props = {
  cars: Car[];
  draft: InquiryDraft;
  onChange: (next: InquiryDraft) => void;
  onOpen: (car: Car) => void;
  onBook: (car: Car) => void;
};

function sortCars(cars: Car[], sort: SortKey): Car[] {
  const next = [...cars];
  if (sort === "price-asc") next.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === "price-desc") next.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sort === "name") next.sort((a, b) => a.name.localeCompare(b.name));
  return next;
}

export function Fleet({ cars, draft, onChange, onOpen, onBook }: Props) {
  const filtered = sortCars(
    cars.filter((car) => {
      const byCat = draft.category === "All" || car.category === draft.category;
      const byCity = draft.location === "All" || car.location === draft.location;
      const byGear =
        draft.transmission === "All" || car.transmission === draft.transmission;
      const bySeats =
        draft.seats === "All" || car.seats >= Number(draft.seats);
      return byCat && byCity && byGear && bySeats;
    }),
    draft.sort,
  );

  const reset = () =>
    onChange({
      ...draft,
      category: "All",
      location: "All",
      transmission: "All",
      seats: "All",
      sort: "featured",
    });

  return (
    <section className="section fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="wrap">
        <div className="section-head section-head-row">
          <div>
            <h2 id="fleet-title">Fleet</h2>
            <p className="lede">
              Indicative daily rates in USD. The car on the quote is confirmed
              in writing before pickup.
            </p>
          </div>
          <p className="fleet-meta" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "car" : "cars"}
          </p>
        </div>

        <div className="filters" role="group" aria-label="Category">
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
            <span>Desk</span>
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
            <span>Transmission</span>
            <select
              value={draft.transmission}
              onChange={(e) =>
                onChange({ ...draft, transmission: e.target.value })
              }
            >
              <option value="All">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
          <label className="field">
            <span>Seats</span>
            <select
              value={draft.seats}
              onChange={(e) => onChange({ ...draft, seats: e.target.value })}
            >
              <option value="All">Any</option>
              <option value="2">2+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
              <option value="7">7+</option>
            </select>
          </label>
          <label className="field">
            <span>Sort</span>
            <select
              value={draft.sort}
              onChange={(e) =>
                onChange({ ...draft, sort: e.target.value as SortKey })
              }
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <p>No cars match those filters.</p>
            <button className="btn btn-ghost" type="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((car) => (
              <CarCard
                key={`${car.name}-${car.location}`}
                car={car}
                onOpen={onOpen}
                onBook={onBook}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
