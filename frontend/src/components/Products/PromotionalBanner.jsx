// src/components/Products/PromotionalBanner.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotionsByPage } from "../../redux/slices/promotionsSlice";
import heroImage from "../../assets/Hero2.jpg";

const PromotionalBanner = ({ page = "Home" }) => {
  const dispatch = useDispatch();
  const { pagePromos } = useSelector((state) => state.promotions);

  useEffect(() => {
    dispatch(fetchPromotionsByPage(page));
  }, [dispatch, page]);

  // Guard — if not an array or empty, only show the right panel
  const promos = Array.isArray(pagePromos) ? pagePromos : [];

  return (
    <section className="flex flex-col md:flex-row min-h-[420px]">

      {/* Left — Promotions — only renders if there are promos */}
      {promos.length > 0 && (
        <div className="w-full md:w-1/2 bg-white py-10 px-10 flex flex-col">
          <div className="mb-6">
            <p className="font-body text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
              Exclusive Offers
            </p>
            <h2 className="font-heading text-3xl text-gray-900 leading-tight">
              Current Promotions
            </h2>
            <div className="w-8 h-px bg-wood mt-4" />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {promos.map((promo) => (
              <div
                key={promo._id}
                className="overflow-hidden rounded-sm border border-gray-100 shadow-sm group h-32"
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
      )}

      {/* Right — Brand panel, always shows */}
      <div className={`relative ${promos.length > 0 ? "md:w-1/2" : "w-full"} min-h-[320px] overflow-hidden`}>
        <img
          src={heroImage}
          alt="Green Leaf Salt Rock"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex flex-col justify-end h-full p-10">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-sand/70 mb-3">
            Salt Rock, KwaZulu-Natal
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-sand leading-tight mb-4">
            Curated for the<br />Discerning Few
          </h2>
          <div className="w-8 h-px bg-wood mb-4" />
          <p className="font-subheading text-base italic text-sand/80 leading-relaxed max-w-sm mb-6">
            Premium flower, refined experiences, and a community that knows the difference.
          </p>
          
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