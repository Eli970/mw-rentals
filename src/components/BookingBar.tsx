import { FormEvent } from "react";
import { CITIES, TIMES, type InquiryDraft } from "../config";

type Props = {
  draft: InquiryDraft;
  onChange: (next: InquiryDraft) => void;
  onSearch: () => void;
};

export function BookingBar({ draft, onChange, onSearch }: Props) {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="booking-bar" onSubmit={submit} aria-label="Search the fleet">
      <div className="booking-grid">
        <label className="field">
          <span>Pickup location</span>
          <select
            value={draft.location}
            onChange={(e) => onChange({ ...draft, location: e.target.value })}
          >
            <option value="All">All desks</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Pickup date</span>
          <input
            type="date"
            value={draft.startDate}
            onChange={(e) => onChange({ ...draft, startDate: e.target.value })}
          />
        </label>
        <label className="field field-time">
          <span>Time</span>
          <select
            value={draft.startTime}
            onChange={(e) => onChange({ ...draft, startTime: e.target.value })}
            aria-label="Pickup time"
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Return date</span>
          <input
            type="date"
            value={draft.endDate}
            min={draft.startDate || undefined}
            onChange={(e) => onChange({ ...draft, endDate: e.target.value })}
          />
        </label>
        <label className="field field-time">
          <span>Time</span>
          <select
            value={draft.endTime}
            onChange={(e) => onChange({ ...draft, endTime: e.target.value })}
            aria-label="Return time"
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-navy booking-submit" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
