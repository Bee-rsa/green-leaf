const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly — including your name, email address, phone number, delivery address, and payment details. We also collect usage data such as pages visited, device type, and browser information through cookies and analytics tools.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to process orders, verify age, communicate with you about your purchases, and improve our services. We may also send you marketing communications if you have opted in. You can unsubscribe at any time.",
  },
  {
    title: "3. Age Verification Data",
    content:
      "As a cannabis retailer, we are required to verify that customers are 18 or older. Age verification data is handled securely and is not shared with third parties except where required by law.",
  },
  {
    title: "4. Sharing Your Information",
    content:
      "We do not sell your personal data. We may share information with trusted third parties who assist in operating our website or fulfilling orders — such as courier services and payment processors — under strict confidentiality agreements.",
  },
  {
    title: "5. Cookies",
    content:
      "Our website uses cookies to enhance your experience, remember your preferences, and analyse site traffic. You can control cookie settings through your browser. Disabling cookies may affect some site functionality.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us directly. We will respond within a reasonable timeframe in accordance with applicable law.",
  },
  {
    title: "8. Retention",
    content:
      "We retain your data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Order records may be retained for up to 5 years for legal and accounting purposes.",
  },
  {
    title: "9. Contact Us",
    content:
      "If you have questions about this Privacy Policy or how we handle your data, please contact us at +27 (73) 036-2644.",
  },
];

const PrivacyPage = () => {
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
            Privacy Policy
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

export default PrivacyPage;