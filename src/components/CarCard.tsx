import type { Car } from "../types";
import { formatPrice } from "../lib";

type Props = {
  car: Car;
  onInquire: (name: string) => void;
};

export function CarCard({ car, onInquire }: Props) {
  return (
    <article className="car-card">
      <div className="car-media">
        <img src={car.image} alt={`${car.name} available in ${car.location}`} loading="lazy" />
        <span className="badge">{car.category}</span>
      </div>
      <div className="car-body">
        <h3>{car.name}</h3>
        <p className="price">
          {formatPrice(car.pricePerDay)} <span>/ day</span>
        </p>
        <ul className="car-meta">
          <li>
            <MetaPin />
            {car.location}
          </li>
          <li>
            <MetaAge />
            Min. age {car.minAge}
          </li>
        </ul>
        <button className="btn btn-navy" type="button" onClick={() => onInquire(car.name)}>
          Inquire
        </button>
      </div>
    </article>
  );
}

function MetaPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MetaAge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 19.2c.8-3.4 3.5-5.2 7-5.2s6.2 1.8 7 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
