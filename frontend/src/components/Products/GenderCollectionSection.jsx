import { useEffect, useRef, useState } from "react";
import { GiMeditation } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiBrush } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";

const pillars = [
  {
    title: "Unwind",
    icon: <GiMeditation className="h-7 w-7 sm:h-8 sm:w-8" />,
    text: "Let go of the noise. Find stillness in the everyday and breathe a little deeper.",
  },
  {
    title: "Social",
    icon: <IoPeopleOutline className="h-7 w-7 sm:h-8 sm:w-8" />,
    text: "Good company, better moments. Cannabis that brings people together naturally.",
  },
  {
    title: "Create",
    icon: <BiBrush className="h-7 w-7 sm:h-8 sm:w-8" />,
    text: "Unlock a softer focus. Make space for ideas, art, and inspired thinking.",
  },
  {
    title: "Rest",
    icon: <BsMoonStars className="h-6 w-6 sm:h-7 sm:w-7" />,
    text: "Drift into deeper sleep. End your day with intention and genuine calm.",
  },
];

const GenderCollectionSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 50);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full overflow-hidden bg-sand">

      <div className="grid grid-cols-2 md:grid-cols-4">

        {pillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className="
              group
              relative
              flex
              flex-col
              items-center
              justify-center
              text-center
              bg-sand
              px-5
              py-10
              sm:px-7
              sm:py-12
              md:px-8
              md:py-14
              border-b
              border-gray-200
              md:border-b-0
              border-r
              last:border-r-0
              [&:nth-child(2)]:border-r-0
              md:[&:nth-child(2)]:border-r
              md:[&:nth-child(4)]:border-r-0
              transition-colors
              duration-300
              hover:bg-white
            "
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `
                opacity 0.6s ease ${index * 0.12}s,
                transform 0.6s ease ${index * 0.12}s,
                background-color 0.3s ease
              `,
            }}
          >

            {/* Icon */}
            <div
              className="
                text-gray-700
                mb-3
                sm:mb-4
                transition-transform
                duration-300
                group-hover:-translate-y-1
              "
            >
              {pillar.icon}
            </div>

            {/* Title */}
            <h3
              className="
                text-xl
                sm:text-2xl
                text-gray-800
                mb-2
                sm:mb-3
              "
              style={{
                fontFamily: "'EB Garamond', serif",
                fontWeight: 400,
              }}
            >
              {pillar.title}
            </h3>

            {/* Small divider */}
            <div className="w-5 h-px bg-wood/50 mb-3 sm:mb-4" />

            {/* Description */}
            <p
              className="
                text-center
                text-gray-500
                text-[11px]
                sm:text-sm
                leading-relaxed
                max-w-[155px]
                sm:max-w-[190px]
              "
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              {pillar.text}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default GenderCollectionSection;