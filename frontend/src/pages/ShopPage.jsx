const ShopPage = () => {
  return (
    <div className="min-h-screen pt-10 pb-20 px-4 lg:px-0">
      <div className="container mx-auto">
        <div className="mb-12">
          <p
            className="text-xs text-gray-400 tracking-widest mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            GREEN LEAF
          </p>
          <h1
            className="text-5xl text-gray-800"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Our Shop
          </h1>
          <p
            className="text-gray-500 text-base mt-4 max-w-xl leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            Thoughtfully sourced cannabis products for every moment — from
            unwinding after a long day to sparking creativity and connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;