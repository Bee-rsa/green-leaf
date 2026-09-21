
import { useEffect, useRef } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import PromotionalBanner from "../components/Products/PromotionalBanner";
import FeaturedBlogs from "../components/Products/FeaturedBlogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  // Reference to the New Arrivals section
  const newArrivalsRef = useRef(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
  }, [dispatch]);

  // Scroll to New Arrivals
  const scrollToNewArrivals = () => {
  if (newArrivalsRef.current) {
    const elementPosition =
      newArrivalsRef.current.getBoundingClientRect().top;

    const offset = -80; 

    window.scrollTo({
      top: window.scrollY + elementPosition - offset,
      behavior: "smooth",
    });
  }
};

  return (
    <div>
      {/* HERO + ARROW */}
      <div className="relative">
        <Hero />

        {/* Mobile-only down arrow */}
        <button
          type="button"
          onClick={scrollToNewArrivals}
          aria-label="Scroll to New Arrivals"
          className="
            md:hidden
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            translate-y-1/2
            z-20
            flex
            items-center
            justify-center
            w-14
            h-14
            rounded-full
            bg-[#687653]
            text-white
            border-4
            border-[#F7F5F0]
            shadow-lg
            transition-all
            duration-300
            hover:bg-[#536141]
            active:scale-90
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* NEW ARRIVALS */}
      <div
        ref={newArrivalsRef}
        className="relative scroll-mt-0"
      >
        <NewArrivals />
      </div>

      <PromotionalBanner page="Home" />

      <FeaturesSection />

      <GenderCollectionSection />

      <FeaturedBlogs />

      <FeaturedCollection />
    </div>
  );
};

export default Home;