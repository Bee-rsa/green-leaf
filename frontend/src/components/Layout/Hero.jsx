import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiMeditation } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiBrush } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
import heroImg from "../../assets/image2.png";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-full overflow-hidden">

      {/* Left - Image */}
      <div
        className="relative w-full md:w-[58%] flex-shrink-0 aspect-[1677/938]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        <img
          src={heroImg}
          alt="Green Leaf"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Mobile Heading - Slightly Lower */}
        <div className="md:hidden absolute bottom-5 sm:bottom-6 left-0 right-0 flex justify-center px-4">
          <h1
            className="text-3xl sm:text-4xl text-white leading-none whitespace-nowrap"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            A Better Way To Unwind.
          </h1>
        </div>
      </div>

      {/* Right - Content */}
      <div
        className="w-full md:w-[42%] bg-sage flex items-center justify-center px-6 sm:px-10 md:px-16 py-20 sm:py-24 md:py-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
        }}
      >
        <div className="max-w-md text-center md:text-left">

          {/* Desktop Heading */}
          <h1
            className="hidden md:block text-5xl lg:text-6xl text-white mb-6 leading-tight"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            A Better Way To Unwind.
          </h1>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center justify-center gap-6 mb-5 text-white">
            <GiMeditation className="w-7 h-7" />
            <IoPeopleOutline className="w-7 h-7" />
            <BiBrush className="w-7 h-7" />
            <BsMoonStars className="w-6 h-6" />
          </div>

          <p
            className="text-white/80 text-base md:text-lg mb-6 md:mb-10 leading-relaxed"
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