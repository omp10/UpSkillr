"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed !== "") {
      navigate(`/course/search?query=${encodeURIComponent(trimmed)}`);
    }
    setSearchQuery("");
  };

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative py-28 px-4 text-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-gray-900 dark:to-black">
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight"
          variants={itemVariants}
        >
          Find the Best Courses for You
        </motion.h1>
        <motion.p
          className="text-gray-100 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Discover, Learn, and Upskill with our wide range of courses
        </motion.p>

        <motion.form
          onSubmit={searchHandler}
          className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl overflow-hidden max-w-xl mx-auto mb-6 transition-all duration-300 hover:shadow-3xl focus-within:shadow-3xl"
          variants={itemVariants}
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the best courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 bg-transparent"
          />
          <motion.button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-4 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants}>
          <Button
            onClick={() => navigate("/course/search?query")}
            className="bg-white/10 dark:bg-gray-800/30 text-white border border-white/20 dark:border-gray-600 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
          >
            Explore All Courses
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;