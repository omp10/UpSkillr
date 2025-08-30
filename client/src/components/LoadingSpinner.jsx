import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          {/* This is the background pulse effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-25 animate-pulse-slow"></div>
          {/* This is the primary spinning icon */}
          <div className="relative flex items-center justify-center w-full h-full">
            <Loader className="h-20 w-20 text-white stroke-2 custom-spin" />
          </div>
        </div>
        <p className="mt-8 text-xl font-semibold tracking-wider text-gray-400 animate-fade-in-up">
          Loading...
          Render.com is slow not my app ;)
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;