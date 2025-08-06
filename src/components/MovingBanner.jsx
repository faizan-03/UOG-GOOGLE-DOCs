import React from 'react';

const MovingBanner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-gradient-to-r from-[#7f53ac] via-[#647dee] to-[#7f53ac] shadow-md overflow-hidden backdrop-blur-sm">
      <div className="relative h-10 flex items-center">
        {/* Moving text container */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <span>Mobile Login Issue - Please use Desktop/Laptop</span>
          </div>
          
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span>Available for 2022 Batch CS Students Only</span>
          </div>
          
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span>UOG Document Access System</span>
          </div>
        </div>

        {/* Duplicate for seamless loop */}
        <div className="animate-marquee whitespace-nowrap flex items-center absolute left-full">
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <span>Mobile Login Issue - Please use Desktop/Laptop</span>
          </div>
          
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span>Available for 2022 Batch CS Students Only</span>
          </div>
          
          <div className="flex items-center space-x-3 text-white font-medium text-xs md:text-sm mx-8">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span>UOG Document Access System</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingBanner;
