import React, { useState } from 'react';
import images from "../constants/images";
import icons from "../constants/icons";

const Carousel = () => {
  // State to keep track of the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of image IDs for simplicity
  const imageArray = [images.slider, images.firstImage, images.Discover1];

  // Function to go to the previous image
  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? 2 : prevIndex - 1 // Change to wrap around to 3 (index 2)
    );
  };

  // Function to go to the next image
  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 2 ? 0 : prevIndex + 1 // Change to wrap around to 1 (index 0)
    );
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-row justify-center items-center">
        {/* Left Arrow */}
        <img
          id="leftArrow"
          src={icons.next}
          alt="leftArrow"
          className="w-10 h-10 object-cover rounded-full absolute left-5 cursor-pointer -rotate-180"
          onClick={handleLeftArrowClick}
        />

        {/* Display current image */}
        <img
          src={imageArray[currentIndex]}
          alt="slider"
          className="w-full h-[550px] object-cover px-2 rounded-3xl mt-2 transition-all duration-500"
        />

        {/* Right Arrow */}
        <img
          id="rightArrow"
          src={icons.next}
          alt="rightArrow"
          className="w-10 h-10 object-cover rounded-full absolute right-5 cursor-pointer"
          onClick={handleRightArrowClick}
        />
      </div>
    </div>
  );
};

export default Carousel;
