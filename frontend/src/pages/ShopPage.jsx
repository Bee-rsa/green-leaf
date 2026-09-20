import NewArrivals from "../components/Products/NewArrivals";
import { useNavigate } from "react-router-dom";

// Images
import GreenLeaf1 from "../assets/store1.avif";
import GreenLeaf2 from "../assets/store2.avif";
import GreenLeaf3 from "../assets/store3.avif";

const ShopPage = () => {
const navigate = useNavigate();

return (
<div
className="min-h-screen bg-[#F7F5F0] text-[#292927]"
style={{ fontFamily: "'Montserrat', sans-serif" }}
>

  {/* HERO */}
  <section className="pt-16 sm:pt-20 lg:pt-28 pb-16 lg:pb-20">
    <div className="container mx-auto px-5 lg:px-0">
      <div className="max-w-3xl">

        <p className="text-[10px] -mt-12 sm:text-xs tracking-[0.3em] text-gray-400 mb-5">
          GREEN LEAF · BALLITO
        </p>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-gray-800"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 400,
          }}
        >
          Our Shop
        </h1>

        <div className="w-12 h-px bg-gray-300 mt-8 mb-7" />

        <p
          className="text-sm sm:text-base text-gray-500 max-w-2xl leading-8"
          style={{ fontWeight: 300 }}
        >
          A thoughtfully curated collection for slower evenings,
          meaningful moments and everything in between. Discover
          quality cannabis products in a space designed to make you
          feel at home.
        </p>

      </div>
    </div>
  </section>


  {/* MORE THAN A SHOP */}
  <section className="bg-[#E9E7DF] py-20 sm:py-24 lg:py-28">
    <div className="container mx-auto px-5 lg:px-0">

      <div className="max-w-4xl mx-auto text-center">

        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-7">
          THE GREEN LEAF EXPERIENCE
        </p>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-800"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 400,
          }}
        >
          More than a shop.
          <br />
          A place to unwind.
        </h2>

        <p
          className="mt-7 max-w-2xl mx-auto text-sm sm:text-base text-gray-500 leading-8"
          style={{ fontWeight: 300 }}
        >
          Take your time. Browse our collection, speak with our team
          and discover something that suits your moment. Green Leaf
          is designed around the belief that cannabis should feel
          considered, comfortable and uncomplicated.
        </p>

      </div>


      {/* IMAGES */}
      <div className="mt-12 sm:mt-16">

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-hide">

          <div className="min-w-[85vw] sm:min-w-[65vw] md:min-w-0 snap-start overflow-hidden">
            <img
              src={GreenLeaf1}
              alt="Green Leaf"
              className="w-full h-[400px] sm:h-[460px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <div className="min-w-[85vw] sm:min-w-[65vw] md:min-w-0 snap-start overflow-hidden md:mt-12">
            <img
              src={GreenLeaf2}
              alt="Green Leaf"
              className="w-full h-[400px] sm:h-[460px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <div className="min-w-[85vw] sm:min-w-[65vw] md:min-w-0 snap-start overflow-hidden">
            <img
              src={GreenLeaf3}
              alt="Green Leaf"
              className="w-full h-[400px] sm:h-[460px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

        </div>

        {/* MOBILE SWIPE INDICATOR */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          <span className="text-[9px] tracking-[0.2em] text-gray-400">
            SWIPE TO EXPLORE
          </span>

          <span className="text-xs text-gray-400">
            →
          </span>
        </div>

      </div>

    </div>
  </section>


  {/* NEW ARRIVALS */}
  <section className="py-20 sm:py-24 lg:py-28 bg-[#F7F5F0]">

    <div className="container mx-auto px-5 lg:px-0">

      <div className="flex items-end justify-between mb-10">

        <div>
          <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-3">
            NEW AT GREEN LEAF
          </p>

          <h2
            className="text-3xl sm:text-4xl text-gray-800"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            New arrivals.
          </h2>
        </div>

        <button
          onClick={() => navigate("/new-arrivals")}
          className="hidden sm:block text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-800 transition-colors"
        >
          View all →
        </button>

      </div>

      <NewArrivals />

    </div>

  </section>


  {/* VISIT US */}
  <section className="py-20 sm:py-24 lg:py-32 bg-[#EFEEE8]">

    <div className="container mx-auto px-5 lg:px-0">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LOCATION */}
        <div>

          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-5">
            FIND US
          </p>

          <h2
            className="text-4xl sm:text-5xl text-gray-800 leading-tight"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            Come by.
            <br />
            Stay awhile.
          </h2>

          <div className="w-12 h-px bg-gray-300 mt-8 mb-8" />

          <p
            className="text-sm text-gray-500 leading-7 max-w-md"
            style={{ fontWeight: 300 }}
          >
            Visit Green Leaf in Salt Rock and experience the space
            for yourself. Our team is here to help you find the
            right products and make your visit comfortable.
          </p>


          {/* DETAILS */}
          <div className="mt-9 space-y-7">

            {/* ADDRESS */}
            <div>

              <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-2">
                ADDRESS
              </p>

              <p className="text-sm text-gray-700 leading-6">
                61 Basil Hulett Dr
                <br />
                Salt Rock, Ballito
                <br />
                4392
              </p>

            </div>


            {/* TRADING HOURS */}
            <div>

              <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-3">
                TRADING HOURS
              </p>

              <div className="space-y-1.5 text-sm text-gray-600">

                <div className="flex justify-between max-w-xs">
                  <span>Monday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Tuesday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Wednesday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Thursday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Friday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Saturday</span>
                  <span>08:30 – 18:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Sunday</span>
                  <span>09:00 – 17:00</span>
                </div>

                <div className="flex justify-between max-w-xs">
                  <span>Public Holidays</span>
                  <span>09:00 – 17:00</span>
                </div>

              </div>

            </div>

          </div>


          {/* DIRECTIONS */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=61+Basil+Hulett+Dr%2C+Salt+Rock%2C+Ballito%2C+4392"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-10 px-7 py-3.5 border border-gray-700 text-[10px] tracking-[0.15em] text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            GET DIRECTIONS
          </a>

        </div>


        {/* MAP */}
        <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] overflow-hidden bg-[#E5E2DA]">

          <iframe
            title="Green Leaf location"
            src="https://www.google.com/maps?q=61+Basil+Hulett+Dr,+Salt+Rock,+Ballito,+4392&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />

        </div>

      </div>

    </div>

  </section>


  {/* FINAL CTA */}
  <section className="py-20 sm:py-24 lg:py-28">

    <div className="container mx-auto px-5 lg:px-0">

      <div className="max-w-3xl mx-auto text-center">

        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-5">
          GREEN LEAF
        </p>

        <h2
          className="text-4xl sm:text-5xl text-gray-800"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 400,
          }}
        >
          Come experience it for yourself.
        </h2>

        <div className="w-10 h-px bg-sage mx-auto mt-7 mb-6" />

        <p
          className="text-sm text-gray-500 leading-7 max-w-xl mx-auto"
          style={{ fontWeight: 300 }}
        >
          Find us in Salt Rock, Ballito.
        </p>

      </div>

    </div>

  </section>

</div>

);
};

export default ShopPage;
