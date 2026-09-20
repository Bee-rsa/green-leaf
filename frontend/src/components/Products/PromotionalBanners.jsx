// src/components/Products/PromotionalBanners.jsx

const PromotionalBanners = ({ promo }) => {
  if (!promo?.imageUrl) {
    return null;
  }

  return (
    <div className="col-span-full w-full flex justify-center py-5 sm:py-6 md:py-8">
      <img
        src={promo.imageUrl}
        alt="Green Leaf Promotion"
        className="
          w-full
          max-w-full
          sm:max-w-[80%]
          md:max-w-[560px]
          lg:max-w-[650px]
          h-auto
          object-contain
        "
      />
    </div>
  );
};

export default PromotionalBanners;