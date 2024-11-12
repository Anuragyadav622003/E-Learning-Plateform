import { useState, useEffect } from 'react';

const images = [
  'https://via.placeholder.com/1600x600/FF5733/FFFFFF?text=Slide+1',
  'https://via.placeholder.com/1600x600/33FF57/FFFFFF?text=Slide+2',
  'https://via.placeholder.com/1600x600/3357FF/FFFFFF?text=Slide+3',
  'https://via.placeholder.com/1600x600/FF33A1/FFFFFF?text=Slide+4',
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false); // SSR handling

  useEffect(() => {
    setIsClient(true);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (!isClient) return null; // Avoid SSR rendering

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none hover:bg-black/80 transition duration-300"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none hover:bg-black/80 transition duration-300"
      >
        &#10095;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white' : 'bg-gray-500/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
