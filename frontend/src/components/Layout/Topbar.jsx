import { IoLogoInstagram, IoLogoFacebook, IoLogoTiktok, IoLogoWhatsapp } from "react-icons/io5";

const Topbar = () => {
  return (
    <div className="bg-sage text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <IoLogoFacebook className="h-5 w-5" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <IoLogoTiktok className="h-5 w-5" />
          </a>
          <a href="https://wa.me/27730362644" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <IoLogoWhatsapp className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>Simplify, Green Leaf!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+27730362644" className="hover:text-gray-300">
            +27 (73) 036-2644
          </a>
        </div>
      </div>
    </div>
  );
};
export default Topbar;