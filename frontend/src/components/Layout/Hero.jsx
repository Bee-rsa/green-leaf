import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/Hero3.jpg";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="flex flex-col md:flex-row h-[800px] sm:h-[850px] md:h-[600px] overflow-hidden">

      {/* Left - Image */}
      <div
        className="w-full md:w-[58%] h-[55%] sm:h-[58%] md:h-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        <img
          src={heroImg}
          alt="Green Leaf"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 5%",
          }}
        />
      </div>

      {/* Right - Content */}
      <div
        className="w-full md:w-[42%] h-[45%] sm:h-[42%] md:h-full bg-sage flex items-center justify-center px-6 sm:px-10 md:px-16 py-10 md:py-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}
      >
        <div className="max-w-md text-center md:text-left">

          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white mb-5 md:mb-6 leading-tight"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            A Better Way To Unwind.
          </h1>

          <p
            className="text-white/80 text-base sm:text-lg mb-8 md:mb-10 leading-relaxed"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
            }}
          >
            Thoughtfully curated cannabis for slower moments, good company,
            and living well.
          </p>

          <Link
            to="/collections/all"
            className="inline-block border border-white text-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-sage transition-colors duration-300"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
            }}
          >
            Explore Green Leaf
          </Link>

        </div>
      </div>

    </section>
  );
};

export default Hero;
