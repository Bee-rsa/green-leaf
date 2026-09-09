import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../Products/ProductGrid";

const GenderCollectionSection = () => {
  const [visible, setVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const headerRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?isFeatured=true&limit=6`
        );
        setFeaturedProducts(data.products ?? []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProductsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (productsRef.current) observer.observe(productsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto">

        {/* Header */}
        <div
  ref={headerRef}
  className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
  className="text-gray-400 text-xs tracking-widest mb-3"
  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
>
  CURATED FOR YOU
</p>
<h2
  className="text-4xl md:text-5xl text-gray-800"
  style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
>
  The Collections
</h2>
        </div>

        {/* Product Grid — uses shared component so styles always match */}
        <div
          ref={productsRef}
          style={{
            opacity: productsVisible ? 1 : 0,
            transform: productsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <ProductGrid products={featuredProducts} loading={false} error={null} />
        </div>

        {/* View All */}
        {featuredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/collections/all"
              className="inline-block border border-gray-300 text-gray-600 px-8 py-3 text-sm tracking-widest hover:border-sage hover:text-sage transition-colors duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default GenderCollectionSection;