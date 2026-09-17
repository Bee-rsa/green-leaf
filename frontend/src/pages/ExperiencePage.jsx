import { useState } from "react";

const ExperiencePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F1EC] text-gray-800">

      {/* HERO */}
      <section className="px-5 sm:px-8 lg:px-16 pt-14 sm:pt-20 lg:pt-28 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">

          <div className="max-w-3xl -mt-12">

            <p className="font-body text-[10px] sm:text-xs tracking-[0.28em] uppercase text-gray-400 mb-5">
              Get in touch
            </p>

            <h1 className="font-heading text-[3.8rem] sm:text-6xl lg:text-7xl text-gray-800 leading-[0.9]">
              Contact
            </h1>

            <div className="w-10 h-px bg-sage mt-8 mb-6" />

            <p className="font-body text-sm sm:text-base text-gray-500 leading-7 sm:leading-8 font-light max-w-xl">
              Whether you have a question, want to learn more about Green Leaf,
              or simply want to say hello, we'd love to hear from you.
            </p>

          </div>

        </div>
      </section>


      {/* CONTACT CONTENT */}
      <section className="px-5 sm:px-8 lg:px-16 pb-20 sm:pb-28 lg:pb-32">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24">

            {/* CONTACT DETAILS */}
            <div>

              <div className="border-t border-gray-200 pt-7">

                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-8">
                  Visit Green Leaf
                </p>

                <div className="space-y-8">

                  {/* LOCATION */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-sage mb-2">
                      Location
                    </p>

                    <p className="font-heading text-xl text-gray-800">
                      Salt Rock
                    </p>

                    <p className="font-body text-sm text-gray-500 leading-6 mt-1">
                      61 Basil Hulett Dr
                      <br />
                      Salt Rock, Ballito
                      <br />
                      KwaZulu-Natal
                      <br />
                      South Africa
                    </p>
                  </div>


                  {/* EMAIL */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-sage mb-2">
                      Email
                    </p>

                    <a
                      href="mailto:greenleaf.management@gmail.com"
                      className="font-body text-sm text-gray-600 hover:text-sage transition-colors"
                    >
                      greenleaf.management@gmail.com
                    </a>
                  </div>


                  {/* PHONE */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-sage mb-2">
                      Phone
                    </p>

                    <a
                      href="tel:+27326480083"
                      className="font-body text-sm text-gray-600 hover:text-sage transition-colors"
                    >
                      032 648 0083
                    </a>
                  </div>


                  {/* HOURS */}
                  <div>
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-sage mb-2">
                      Hours
                    </p>

                    <p className="font-body text-sm text-gray-500 leading-7">
                      Monday – Friday
                      <br />
                      08:00 – 18:00
                    </p>

                    <p className="font-body text-sm text-gray-500 leading-7 mt-1">
                      Saturday
                      <br />
                      08:00 – 17:00
                    </p>

                    <p className="font-body text-sm text-gray-500 leading-7 mt-1">
                      Sunday
                      <br />
                      09:00 – 17:00
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* CONTACT FORM */}
            <div>

              <div className="border-t border-gray-200 pt-7">

                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-8">
                  Send us a message
                </p>

                {submitted ? (
                  <div className="py-12">

                    <div className="w-10 h-10 border border-sage rounded-full flex items-center justify-center mb-6">
                      <span className="text-sage text-sm">
                        ✓
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl text-gray-800 mb-3">
                      Thank you.
                    </h2>

                    <p className="font-body text-sm text-gray-500 leading-7 max-w-md">
                      Your message has been received. We'll get back to you
                      as soon as we can.
                    </p>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-7 font-body text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      Send another message
                    </button>

                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >

                    {/* NAME */}
                    <div>
                      <label className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 block mb-3">
                        Name
                      </label>

                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 font-body text-sm text-gray-700 placeholder:text-gray-300 focus:border-sage focus:ring-0 outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>


                    {/* EMAIL */}
                    <div>
                      <label className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 block mb-3">
                        Email
                      </label>

                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 font-body text-sm text-gray-700 placeholder:text-gray-300 focus:border-sage focus:ring-0 outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>


                    {/* PHONE */}
                    <div>
                      <label className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 block mb-3">
                        Phone
                      </label>

                      <input
                        type="tel"
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 font-body text-sm text-gray-700 placeholder:text-gray-300 focus:border-sage focus:ring-0 outline-none transition-colors"
                        placeholder="+27"
                      />
                    </div>


                    {/* SUBJECT */}
                    <div>
                      <label className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 block mb-3">
                        Subject
                      </label>

                      <select
                        defaultValue=""
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 font-body text-sm text-gray-600 focus:border-sage focus:ring-0 outline-none transition-colors"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>

                        <option>General enquiry</option>
                        <option>Products</option>
                        <option>Membership</option>
                        <option>Visit Green Leaf</option>
                        <option>Other</option>
                      </select>
                    </div>


                    {/* MESSAGE */}
                    <div>
                      <label className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 block mb-3">
                        Message
                      </label>

                      <textarea
                        required
                        rows="4"
                        className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 font-body text-sm text-gray-700 placeholder:text-gray-300 focus:border-sage focus:ring-0 outline-none resize-none transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>


                    {/* SUBMIT */}
                    <div className="pt-2">

                      <button
                        type="submit"
                        className="group inline-flex items-center gap-4 bg-gray-800 text-white px-7 py-4 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-sage transition-colors duration-300"
                      >
                        Send message

                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </button>

                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MAP / VISIT SECTION */}
      <section className="border-t border-gray-200 bg-[#EAE8E1]">

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* TEXT */}
            <div>

              <p className="font-body text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-4">
                Come by
              </p>

              <h2 className="font-heading text-3xl sm:text-4xl text-gray-800 leading-tight mb-5">
                See you at
                <br />
                <span className="text-sage">Green Leaf.</span>
              </h2>

              <p className="font-body text-sm text-gray-500 leading-7 max-w-md font-light">
                Take your time, ask questions and experience the space for
                yourself.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=61+Basil+Hulett+Dr%2C+Salt+Rock%2C+Ballito%2C+4392"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-7 items-center gap-3 font-body text-[10px] tracking-[0.2em] uppercase text-gray-600 hover:text-sage transition-colors"
              >
                Get directions
                <span>→</span>
              </a>

            </div>


            {/* ACTUAL GOOGLE MAP */}
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[400px] overflow-hidden bg-[#E4E2DA]">

              <iframe
                title="Green Leaf Salt Rock location"
                src="https://www.google.com/maps?q=61+Basil+Hulett+Dr,+Salt+Rock,+Ballito,+4392&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ExperiencePage;

