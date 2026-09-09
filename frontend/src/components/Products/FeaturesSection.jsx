// src/components/ReviewsSection.jsx

import { HiStar } from "react-icons/hi2";
import { useEffect, useRef, useState, useCallback } from "react";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Greenleaf+Cannabis+Club+Salt+Rock/@-29.5026603,31.2273988,15z/data=!4m17!1m8!3m7!1s0x1ef715eaec295713:0x20e4d0425dc69e57!2sGreenleaf+Cannabis+Club+Salt+Rock!8m2!3d-29.5026603!4d31.2376985!10e5!16s%2Fg%2F11nrvvs71v!3m7!1s0x1ef715eaec295713:0x20e4d0425dc69e57!8m2!3d-29.5026603!4d31.2376985!9m1!1b1!16s%2Fg%2F11nrvvs71v?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D";

const reviews = [
  {
    name: "Jade Erasmus",
    rating: 5,
    date: "August 2026",
    text: "Greenleaf Cannabis Club Salt Rock is hands down one of the best cannabis clubs I've visited. The staff are friendly, knowledgeable, and always happy to help you find exactly what you're looking for. They have an amazing selection of high-quality flower, pre-rolls, edibles, and other products at great prices. The store is clean, welcoming, and has a premium feel from the moment you walk in. Every visit has been a great experience, and the quality has always been consistent. I highly recommend Greenleaf to anyone looking for top-quality cannabis and outstanding customer service!",
  },
  {
    name: "Devon",
    rating: 5,
    date: "January 2026",
    text: "Absolutely Amazing! Incredible customer service. Perfect knowledge. Honestly the best Dispensary I've ever been to. I couldn't recommend it more. Coming from Johannesburg. What kind people as well.",
  },
  {
    name: "Jonathan Trenor",
    rating: 5,
    date: "March 2026",
    text: "Great selection with friendly staff. Always happy to shop here!",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <HiStar key={i} className={`text-sm ${i < rating ? "text-wood" : "text-sage/30"}`} />
    ))}
  </div>
);

const BadgeStars = () => (
  <div className="flex gap-0.5 items-center">
    {Array.from({ length: 4 }).map((_, i) => (
      <HiStar key={i} className="text-wood text-xs" />
    ))}
    <span className="relative inline-block text-xs">
      <HiStar className="text-sand/20 text-xs" />
      <span className="absolute inset-0 overflow-hidden" style={{ width: "90%" }}>
        <HiStar className="text-wood text-xs" />
      </span>
    </span>
  </div>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ReviewCard = ({ review, className = "" }) => (
  <div className={`bg-sand/10 border border-sand/20 rounded-sm px-6 py-7 flex flex-col ${className}`}>
    <StarRating rating={review.rating} />
    <p className="font-subheading text-base leading-relaxed flex-1 italic" style={{ color: "#F2EFE4" }}>
      "{review.text}"
    </p>
    <div className="mt-6 pt-4 border-t border-sand/20">
      <p className="font-body text-xs font-semibold tracking-wide" style={{ color: "#F2EFE4" }}>
        {review.name}
      </p>
      <p className="font-body text-xs mt-0.5" style={{ color: "rgba(242,239,228,0.6)" }}>
        {review.date} · Google Review
      </p>
    </div>
  </div>
);

// ── Mobile Swipe Carousel ────────────────────────────────────────────────────

const MobileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const [visible, setVisible] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goTo = useCallback((next, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setVisible(false);

    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
      setTimeout(() => {
        setAnimating(false);
        setDirection(null);
      }, 700);
    }, 350);
  }, [animating]);

  const prev = () => goTo(current === 0 ? reviews.length - 1 : current - 1, "right");
  const next = () => goTo(current === reviews.length - 1 ? 0 : current + 1, "left");

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideStyle = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : direction === "left"
      ? "translateX(-24px)"
      : "translateX(24px)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  };

  return (
    <div className="xl:hidden">
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={slideStyle}
      >
        <ReviewCard review={reviews[current]} />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "left" : "right")}
            className="transition-all duration-500"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "9999px",
              backgroundColor: i === current ? "#C8A27A" : "rgba(242,239,228,0.3)",
            }}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prev}
          className="font-body text-xs tracking-widest uppercase text-sand/50 hover:text-sand transition-colors duration-300 px-3 py-1"
        >
          ←
        </button>
        <button
          onClick={next}
          className="font-body text-xs tracking-widest uppercase text-sand/50 hover:text-sand transition-colors duration-300 px-3 py-1"
        >
          →
        </button>
      </div>
    </div>
  );
};

// ── Section Entry Animation ──────────────────────────────────────────────────

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasBeenSeen(true);
        } else {
          if (hasBeenSeen) setInView(false);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, hasBeenSeen]);

  return { ref, inView };
};

// ── Main Section ─────────────────────────────────────────────────────────────

const ReviewsSection = () => {
  const { ref, inView } = useInView(0.15);

  const fadeUp = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section className="py-20 px-6 bg-sage" ref={ref}>
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12" style={fadeUp(0)}>
          <p className="font-body text-xs tracking-[0.2em] text-sand/70 uppercase mb-3">
            What our members say
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-sand leading-tight">
            The Green Leaf Experience
          </h2>
          <div className="w-8 h-px bg-wood mx-auto mt-5" />
        </div>

        {/* Desktop layout */}
        <div className="hidden xl:flex xl:flex-row gap-6 mb-12">
          <div style={fadeUp(0.15)} className="xl:w-1/2">
            <ReviewCard review={reviews[0]} className="h-full" />
          </div>
          <div className="flex flex-col gap-6 xl:w-1/2">
            <div style={fadeUp(0.3)}>
              <ReviewCard review={reviews[1]} className="flex-1" />
            </div>
            <div style={fadeUp(0.45)}>
              <ReviewCard review={reviews[2]} className="flex-1" />
            </div>
          </div>
        </div>

        {/* Mobile swipe carousel */}
        <div className="mb-12" style={fadeUp(0.15)}>
          <MobileCarousel />
        </div>

        {/* CTA + Credibility */}
        <div className="flex flex-col items-center gap-4" style={fadeUp(0.5)}>
          
            <a href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs tracking-[0.15em] uppercase text-sand border border-sand/40 px-6 py-2.5 hover:bg-sand hover:text-sage transition-all duration-300"
          >
            See all reviews on Google
          </a>

          <div className="flex items-center gap-2.5">
            <GoogleLogo />
            <BadgeStars />
            <p className="font-body text-xs font-semibold tracking-wide" style={{ color: "#F2EFE4" }}>
              4.8
            </p>
            <p className="font-body text-xs tracking-wide" style={{ color: "rgba(242,239,228,0.7)" }}>
              · Based on 117 Google reviews
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;