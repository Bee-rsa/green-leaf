import { useState } from "react";

const faqs = [
  {
    question: "Do I need a membership to shop at Green Leaf?",
    answer:
      "No. You do not need to be a member to shop at Green Leaf. Simply visit us at our Salt Rock location and our team will be happy to assist you. You must be 18 or older and have a valid South African ID.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept cash and card payments in store. We do not currently offer online purchasing — all transactions take place at our Salt Rock location.",
  },
  {
    question: "How do I know which product is right for me?",
    answer:
      "Our team is trained to help you find exactly what you're looking for. Whether you're new to cannabis or looking to refine your experience, come in and have a conversation with us. We'll ask the right questions and point you in the right direction — no pressure, no jargon.",
  },
  {
    question: "Do you offer CBD-only products?",
    answer:
      "Yes. We stock a range of CBD-dominant products including tinctures, capsules, and flower for those who want the benefits of CBD without significant psychoactive effects.",
  },
  {
    question: "What is your return or exchange policy?",
    answer:
      "Due to the nature of cannabis products, we are unable to accept returns on opened items. If you receive a product that is damaged or incorrectly labelled, please bring it back within 24 hours with your receipt and we will resolve it.",
  },
  {
    question: "Where are you located and what are your hours?",
    answer:
      "We are located in Salt Rock, KwaZulu-Natal. Our trading hours are Monday to Saturday 9am – 6pm and Sunday 10am – 4pm. You can find us via the Google Maps link on our contact page.",
  },
  {
    question: "Can I order online or get delivery?",
    answer:
      "We do not currently offer online ordering or delivery. All purchases are made in store. This allows us to maintain the quality of the in-store experience and ensure every product is provided directly to our customers.",
  },
  {
    question: "Is cannabis legal in South Africa?",
    answer:
      "The private use and possession of cannabis by adults was decriminalised by the Constitutional Court in 2018. Cannabis laws in South Africa have specific limitations around private use, possession, cultivation and dealing. Our team can help answer general questions about the products and our store.",
  },
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderBottomColor: "rgba(255,255,255,0.15)" }}
      className="border-b last:border-none"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className={`font-heading text-lg leading-snug transition-colors duration-200 ${
            open
              ? "text-white"
              : "text-white/80 group-hover:text-white"
          }`}
        >
          {faq.question}
        </span>

        <span
          className={`ml-6 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? "border-white bg-white text-wood"
              : "border-white/30 text-white/50 group-hover:border-white group-hover:text-white"
          }`}
        >
          <span
            className={`text-sm font-light transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="font-body text-sm text-white/75 leading-relaxed max-w-2xl">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FeaturedCollection = () => {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "#C8A27A" }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-white/60 uppercase mb-3">
              Green Leaf · Salt Rock
            </p>

            <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
              Frequently Asked<br />Questions
            </h2>

            <div
              className="w-8 h-px mt-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            />
          </div>

          <p className="font-body text-sm text-white/70 max-w-sm leading-relaxed">
            Can't find what you're looking for? Come in and speak to one of our team members — we're always happy to help.
          </p>
        </div>

        {/* Two-column FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div>
            {faqs
              .slice(0, Math.ceil(faqs.length / 2))
              .map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
          </div>

          <div>
            {faqs
              .slice(Math.ceil(faqs.length / 2))
              .map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-14 pt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            borderTopColor: "rgba(255,255,255,0.2)",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
          }}
        >
          <p className="font-body text-sm text-white/70">
            Still have questions? We'd love to hear from you.
          </p>

          <a
            href="https://www.google.com/maps/place/Greenleaf+Cannabis+Club+Salt+Rock"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs tracking-[0.15em] uppercase text-white border px-6 py-2.5 transition-all duration-300"
            style={{ borderColor: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Find us on Google Maps
          </a>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;