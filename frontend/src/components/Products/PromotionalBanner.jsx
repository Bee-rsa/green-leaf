// src/components/Products/PromotionalBanner.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotionsByPage } from "../../redux/slices/promotionsSlice";
import heroImage from "../../assets/Hero1.jpg";

const PromotionalBanner = ({ page = "Home" }) => {
  const dispatch = useDispatch();
  const { pagePromos } = useSelector((state) => state.promotions);

  useEffect(() => {
    dispatch(fetchPromotionsByPage(page));
  }, [dispatch, page]);

  if (!pagePromos || pagePromos.length === 0) return null;

  return (
    <section className="flex flex-col md:flex-row min-h-[420px]">

      {/* Left — Promotions */}
      <div className="w-full md:w-1/2 bg-white py-10 px-10 flex flex-col">

        {/* Header */}
        <div className="mb-6">
          <p className="font-body text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
            Exclusive Offers
          </p>
          <h2 className="font-heading text-3xl text-gray-900 leading-tight">
            Current Promotions
          </h2>
          <div className="w-8 h-px bg-wood mt-4" />
        </div>

        {/* Banners stacked */}
        <div className="flex flex-col gap-4 flex-1">
          {pagePromos.map((promo) => (
            <div
              key={promo._id}
              className="overflow-hidden rounded-sm border border-gray-100 shadow-sm group h-76"
            >
              <img
                src={promo.imageUrl}
                alt="Promotion"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right — Brand panel */}
      <div className="relative w-full md:w-1/2 min-h-[320px] overflow-hidden">

        {/* Background image */}
        <img
          src={heroImage}
          alt="Green Leaf Salt Rock"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-10">

          {/* Eyebrow */}
          <p className="font-body text-xs tracking-[0.25em] uppercase text-sand/70 mb-3">
            Salt Rock, KwaZulu-Natal
          </p>

          {/* Heading */}
          <h2 className="font-heading text-4xl md:text-5xl text-sand leading-tight mb-4">
            Curated for the<br />Discerning Few
          </h2>

          {/* Divider */}
          <div className="w-8 h-px bg-wood mb-4" />

          {/* Body */}
          <p className="font-subheading text-base italic text-sand/80 leading-relaxed max-w-sm mb-6">
            Premium flower, refined experiences, and a community that knows the difference.
          </p>

          {/* CTA */}
          
            <a href="/shop"
            className="inline-block font-body text-xs tracking-[0.15em] uppercase text-sand border border-sand/40 px-6 py-2.5 w-fit hover:bg-sand hover:text-sage transition-all duration-300"
          >
            Explore the Collection
          </a>

        </div>
      </div>

    </section>
  );
};

export default PromotionalBanner;