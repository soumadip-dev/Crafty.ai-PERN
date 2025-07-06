import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 px-4 sm:px-20 xl:px-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Text Content */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="mx-auto text-4xl font-bold leading-tight sm:text-5xl md:text-6xl 2xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500">
          Create stunning content <br /> with <span className="text-primary">AI in seconds</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-gray-700 sm:max-w-lg max-sm:text-sm 2xl:max-w-xl text-lg">
          Transform your content creation with our suite of premium AI tools. Write articles,
          generate images, and more to enhance your workflow.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
        <button
          className="relative rounded-xl bg-gradient-to-r from-red-500 to-green-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-95 sm:px-10 sm:text-base shadow-lg hover:shadow-xl"
          onClick={() => navigate('/ai')}
        >
          <span className="relative z-10">Begin AI Creation</span>
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-green-600 opacity-0 hover:opacity-100 transition-opacity"></span>
        </button>
        <button className="rounded-xl border-2 border-green-200 bg-white/80 px-8 py-4 text-sm font-semibold text-green-700 transition-all hover:scale-[1.02] hover:bg-white active:scale-95 sm:px-10 sm:text-base backdrop-blur-sm hover:shadow-md">
          Take a Tour
        </button>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="User Group" className="h-8" />
        <span className="text-sm sm:text-base font-medium">
          Trusted by <span className="text-red-500">10,000+</span> creators
        </span>
      </div>

      {/* Floating AI elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-xl bg-red-100/50 border border-red-200 shadow-sm flex items-center justify-center z-0 animate-float">
        <img src={assets.ai_icon} alt="AI" className="w-8 h-8" />
      </div>
      <div className="absolute top-1/4 right-16 w-12 h-12 rounded-full bg-green-100/50 border border-green-200 shadow-sm flex items-center justify-center z-0 animate-float animation-delay-2000">
        <img src={assets.star_icon} alt="Sparkle" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Hero;
