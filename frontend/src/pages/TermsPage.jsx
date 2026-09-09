const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the Green Leaf website, you confirm that you are 18 years of age or older and legally permitted to purchase cannabis products in your jurisdiction. If you do not meet these requirements, you must not use this site.",
  },
  {
    title: "2. Products and Availability",
    content:
      "All products listed on this website are subject to availability. Green Leaf reserves the right to discontinue any product at any time without notice. Product descriptions, images, and pricing are for informational purposes and may change without prior notice.",
  },
  {
    title: "3. Orders and Payment",
    content:
      "By placing an order, you represent that the information you provide is accurate and complete. Green Leaf reserves the right to refuse or cancel any order at its discretion. Payment must be received in full before any order is processed or dispatched.",
  },
  {
    title: "4. Age Verification",
    content:
      "Green Leaf is committed to responsible retail. We may request proof of age at any point during the purchase process. Orders suspected of being placed by minors will be cancelled and reported where required by law.",
  },
  {
    title: "5. Shipping and Delivery",
    content:
      "We currently ship within South Africa only. Delivery timeframes are estimates and are not guaranteed. Green Leaf is not responsible for delays caused by third-party couriers, incorrect delivery information, or circumstances beyond our control.",
  },
  {
    title: "6. Returns and Refunds",
    content:
      "Due to the nature of cannabis products, all sales are final unless the product received is damaged, incorrect, or defective. Claims must be submitted within 48 hours of delivery with supporting photographs.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "Green Leaf shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability is limited to the value of the order in question.",
  },
  {
    title: "8. Changes to Terms",
    content:
      "We reserve the right to update these terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    title: "9. Contact",
    content:
      "For any questions regarding these terms, please contact us at +27 (73) 036-2644 or visit our store.",
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen pt-10 pb-20 px-4 lg:px-0">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12">
          <p
            className="text-xs text-gray-400 tracking-widest mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            LEGAL
          </p>
          <h1
            className="text-5xl text-gray-800 mb-4"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Terms & Conditions
          </h1>
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            Last updated: August 2025
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i} className="border-t border-gray-100 pt-8">
              <h2
                className="text-xl text-gray-800 mb-3"
                style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
              >
                {s.title}
              </h2>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;