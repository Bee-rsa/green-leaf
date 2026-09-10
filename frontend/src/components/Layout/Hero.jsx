import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import heroImg from "../../assets/Hero3.jpg"; 
 
const Hero = () => { 
  const [visible, setVisible] = useState(false); 
 
  useEffect(() => { 
    setTimeout(() => setVisible(true), 100); 
  }, []); 
 
  return ( 
    <section className="flex flex-col md:flex-row h-[660px] sm:h-[702.5px] md:h-[600px] overflow-hidden"> 
 
      {/* Left - Image */} 
      <div 
        className="relative w-full md:w-[58%] h-[55%] sm:h-[58%] md:h-full"
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
 
        {/* Mobile Heading - Centered Over Image */} 
        <div className="md:hidden absolute bottom-8 left-0 right-0 flex justify-center px-4"> 
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
        className="w-full md:w-[42%] h-[30%] sm:h-[27%] md:h-full bg-sage flex items-center justify-center px-6 sm:px-10 md:px-16 py-6 md:py-0"
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