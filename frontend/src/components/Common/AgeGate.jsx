import { useState } from "react";
import logo from "../../assets/1000602541-removebg-preview.png";

const AgeGate = ({ onConfirm }) => {
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <div className="fixed inset-0 bg-sage flex items-center justify-center z-[9999] px-6">
        <div className="text-center max-w-sm">
          <p
            className="text-white text-2xl mb-4"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            We're sorry.
          </p>
          <p
            className="text-white/80 text-sm leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            You must be 18 or older to visit Green Leaf. Please come back when
            you meet the age requirement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-sage flex items-center justify-center z-[9999] px-6">
      <div className="text-center max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Green Leaf"
            className="h-28 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl text-white mb-4 leading-tight"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Are you 18 or older?
        </h1>

        <p
          className="text-white/70 text-sm mb-10 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
        >
          Green Leaf is a cannabis retailer. You must be 18 years or older to
          enter this site. Please confirm your age to continue.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="px-10 py-3 bg-white text-sage text-sm tracking-widest hover:bg-white/90 transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Yes, I am 18+
          </button>
          <button
            onClick={() => setDeclined(true)}
            className="px-10 py-3 border border-white/50 text-white text-sm tracking-widest hover:border-white transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            No, I am not
          </button>
        </div>

        {/* Disclaimer */}
        <p
          className="text-white/40 text-xs mt-10 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          By entering this site you agree to our terms and conditions. This site
          uses cookies to improve your experience.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;