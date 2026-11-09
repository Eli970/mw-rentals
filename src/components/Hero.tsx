import type { InquiryDraft } from "../config";
import { BookingBar } from "./BookingBar";

type Props = {
  draft: InquiryDraft;
  onChange: (next: InquiryDraft) => void;
  onSearch: () => void;
  carCount: number;
  cityCount: number;
  from: number;
};

export function Hero({
  draft,
  onChange,
  onSearch,
  carCount,
  cityCount,
  from,
}: Props) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img
            src="/hero.webp"
            alt=""
            width={2400}
            height={1500}
            fetchPriority="high"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-body">
          <div className="wrap">
            <h1 id="hero-title">Short- and long-term hire</h1>
            <p className="hero-sub">
              {carCount} cars across {cityCount} desks. Daily rates from $
              {from}/day. Search, then we confirm the car in writing.
            </p>
          </div>
        </div>
      </section>
      <div className="hero-bar">
        <div className="wrap">
          <BookingBar draft={draft} onChange={onChange} onSearch={onSearch} />
        </div>
      </div>
    </>
  );
}
