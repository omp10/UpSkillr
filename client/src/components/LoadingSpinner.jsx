"use client";
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="w-24 h-24 relative"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            >
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-t-4 border-gray-700 rounded-full"></div>
                {/* Inner Spinner */}
                <Loader2Icon className="absolute inset-0 m-auto text-blue-600 w-16 h-16 animate-spin" />
            </motion.div>
            <motion.p
                className="mt-8 text-lg font-medium text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Loading, please wait...Render.com is slow not my app ;)
            </motion.p>
        </motion.div>
    );
}

export default LoadingSpinner;