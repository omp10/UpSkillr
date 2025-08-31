import React, { useState, useEffect } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Courses = () => {
  const [shouldFetch, setShouldFetch] = useState(false);

  // Observe container
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -200px 0px",
  });

  useEffect(() => {
    if (inView) setShouldFetch(true);
  }, [inView]);

  // Fetch only when in view
  const { data, isLoading, isError } = useGetPublishedCourseQuery(undefined, {
    skip: !shouldFetch,
  });

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  return (
    <div ref={ref} className="bg-gray-50 dark:bg-[#141414] py-16">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10 text-gray-900 dark:text-white">
          Our Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skeletons while fetching */}
          {shouldFetch && isLoading &&
            Array.from({ length: 8 }).map((_, i) => <CourseSkeleton key={i} />)}

          {/* Lazy load each course on scroll */}
          {shouldFetch &&
            data?.courses?.map((course, index) => (
              <ScrollLazyCourse key={index} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const ScrollLazyCourse = ({ course }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // load only once
    rootMargin: "0px 0px -100px 0px", // triggers a bit before it's visible
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div ref={ref}>
      {inView ? (
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <Course course={course} />
        </motion.div>
      ) : (
        <CourseSkeleton /> // placeholder until it comes into view
      )}
    </div>
  );
};

const CourseSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    <div className="w-full h-36 bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="px-5 py-4 space-y-3">
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  </div>
);
