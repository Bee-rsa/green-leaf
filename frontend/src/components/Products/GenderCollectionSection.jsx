import { useEffect, useRef, useState } from "react";
import { GiMeditation } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiBrush } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";

const pillars = [
  {
    title: "Unwind",
    icon: <GiMeditation className="h-8 w-8" />,
    text: "Let go of the noise. Find stillness in the everyday and breathe a little deeper.",
  },
  {
    title: "Social",
    icon: <IoPeopleOutline className="h-8 w-8" />,
    text: "Good company, better moments. Cannabis that brings people together naturally.",
  },
  {
    title: "Create",
    icon: <BiBrush className="h-8 w-8" />,
    text: "Unlock a softer focus. Make space for ideas, art, and inspired thinking.",
  },
  {
    title: "Rest",
    icon: <BsMoonStars className="h-8 w-8" />,
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
          // Reset when out of view so it replays on scroll back
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className="flex-1 flex flex-col items-center justify-center py-16 px-8 border-r border-gray-200 last:border-r-0 bg-sand"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.92)",
              transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
            }}
          >
            <div className="text-gray-700 mb-4">
              {pillar.icon}
            </div>
            <h3
              className="text-2xl text-gray-800 mb-4"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              {pillar.title}
            </h3>
            <p
              className="text-center text-gray-500 text-sm leading-relaxed max-w-[180px]"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
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