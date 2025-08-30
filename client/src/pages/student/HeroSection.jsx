import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-gray-900 dark:to-black py-28 px-4 text-center overflow-hidden">
      {/* Subtle background overlay to add depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-100 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl overflow-hidden max-w-xl mx-auto mb-6 transition-all duration-300 hover:shadow-3xl focus-within:shadow-3xl">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search thousands of courses..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-transparent"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-4 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate("/course/search?query")}
          className="bg-white/10 dark:bg-gray-800/30 text-white border border-white/20 dark:border-gray-600 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
        >
          Explore All Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;