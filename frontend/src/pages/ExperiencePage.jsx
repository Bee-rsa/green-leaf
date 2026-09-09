const ExperiencePage = () => {
  const pillars = [
    {
      title: "Curated Selection",
      text: "Every product on our shelves has been carefully reviewed for quality, consistency, and effect. We work only with growers and producers who share our commitment to craft.",
    },
    {
      title: "Education First",
      text: "Cannabis is personal. Our team is trained to guide you — whether you're exploring for the first time or refining your routine. No pressure, just honest conversation.",
    },
    {
      title: "Community & Space",
      text: "Green Leaf is more than a dispensary. It's a space to slow down, ask questions, and connect with a community that values intentional living.",
    },
    {
      title: "Responsible Enjoyment",
      text: "We believe in cannabis that complements your life — not defines it. Start low, go slow, and find what works for you.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-sage py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p
            className="text-white/60 text-xs tracking-widest mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            THE GREEN LEAF EXPERIENCE
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-tight mb-6"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            A Better Way to Live Well
          </h1>
          <p
            className="text-white/70 text-base leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            We built Green Leaf around a simple idea — that cannabis, used
            thoughtfully, can help people rest better, connect more deeply, and
            move through the world with a little more ease.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="py-20 px-4 lg:px-0 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {pillars.map((p, i) => (
              <div key={i} className="border-t border-gray-200 pt-8">
                <h3
                  className="text-2xl text-gray-800 mb-4"
                  style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ExperiencePage;