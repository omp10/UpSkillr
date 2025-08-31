"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Course = ({ course }) => {
  // Simple guard clause to handle missing data
  if (!course) {
    return null;
  }

  return (
    <Link to={`/course-detail/${course._id}`}>
      <motion.div
        className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg cursor-pointer"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card>
          <div className="relative">
            <img
              src={
                course.courseThumbnail ||
                "https://via.placeholder.com/400x200.png?text=Course+Thumbnail"
              }
              alt={course.courseTitle}
              className="w-full h-36 object-cover rounded-t-lg"
            />
          </div>
          <CardContent className="p-5 space-y-3">
            <h1 className="hover:underline font-bold text-lg truncate">
              {course.courseTitle}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                    alt={course.creator?.name || "User Avatar"}
                  />
                  <AvatarFallback>
                    {course.creator?.name ? course.creator.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">
                  {course.creator?.name || "Anonymous"}
                </h1>
              </div>
              <Badge className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}>
                {course.courseLevel}
              </Badge>
            </div>
            {/* Added Buy button next to the price */}
            <div className="flex justify-between items-center text-lg font-bold mt-4">
              <span>₹{course.coursePrice}</span>
              <Button
                variant="ghost"
                className="bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700 rounded-full"
                onClick={(e) => {
                  // This is important to prevent the Link navigation.
                  e.stopPropagation();
                  e.preventDefault();
                  // Add logic here to handle the "Buy" action, e.g., show a modal
                  console.log("Buy button clicked for course:", course.courseTitle);
                }}
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default Course;