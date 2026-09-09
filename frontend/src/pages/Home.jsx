import { useEffect } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductGrid from "../components/Products/ProductGrid";
import ReviewsSection from "../components/ReviewsSection";
import PromotionalBanner from "../components/Products/PromotionalBanner";
import FeaturedBlogs from "../components/Products/FeaturedBlogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <NewArrivals />
      <FeaturesSection />
      <GenderCollectionSection />
      <PromotionalBanner page="Home" />
      <ReviewsSection />
      <FeaturedBlogs />

      {products && products.length > 0 && (
        <div className="container mx-auto">
          <h2 className="text-xl text-center font-semibold mb-4">
            Top Wears for Women
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      )}

      <FeaturedCollection />
    </div>
  );
};

export default Home;