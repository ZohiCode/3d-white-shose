
import React from 'react';
import { Search, ShoppingBag, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-10 py-6 w-full absolute top-0 left-0 z-50"
    >
      {/* Left: Nike Logo */}
      <div className="w-14">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto">
          <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.14-.57.14s-.41-.05-.57-.14l-7.9-4.44A1.002 1.002 0 013 16.5V7.5c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.14.57-.14s.41.05.57.14l7.9 4.44c.32.17.53.5.53.88v9z" />
        </svg>
      </div>

      {/* Center: Mixed Nav items like the screenshot */}
      <div className="flex-1 flex justify-between items-center max-w-[700px] ml-12">
        <div className="flex space-x-8 text-[11px] font-black tracking-widest uppercase opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">ALL CATG.</a>
          <a href="#" className="hover:opacity-100 transition-opacity">MEN</a>
        </div>
        
        <div className="flex space-x-8 text-[11px] font-black tracking-widest uppercase opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">WOMEN</a>
          <a href="#" className="hover:opacity-100 transition-opacity">KIDS</a>
          <a href="#" className="hover:opacity-100 transition-opacity">CUSTOMIZE</a>
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6 opacity-60">
        <Globe size={18} className="cursor-pointer hover:opacity-100" />
        <div className="relative cursor-pointer hover:opacity-100">
          <ShoppingBag size={18} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
        </div>
      </div>
    </motion.header>
  );
};
