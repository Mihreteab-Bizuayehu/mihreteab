'use client';

import React from 'react';
import { motion } from 'framer-motion';

const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FF6EC7'];

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
