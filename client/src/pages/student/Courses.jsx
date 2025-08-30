import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-gray-50 dark:bg-[#141414]">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Oops! Something Went Wrong.
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't load the courses. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const courses = data?.courses || [];

  return (
    <div className="bg-gray-50 dark:bg-[#141414] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-extrabold text-4xl text-center text-gray-900 dark:text-white mb-4">
          Explore Our Courses
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          From beginner to advanced, find the perfect course to start or advance your career.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No courses found.
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Check back soon for new course offerings!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      <Skeleton className="w-full h-40 object-cover" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-3 mt-4">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-24 rounded-full bg-blue-200 dark:bg-blue-800" />
        </div>
      </div>
    </div>
  );
};