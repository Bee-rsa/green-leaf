import { useEffect } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductGrid from "../components/Products/ProductGrid";
import PromotionalBanner from "../components/Products/PromotionalBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import FeaturedBlogs from "../components/Products/FeaturedBlogs";


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
      
      <PromotionalBanner page="Home" />

      <GenderCollectionSection />

      <FeaturedBlogs />

      <FeaturedCollection />
      
    </div>
  );
};

export default Home;