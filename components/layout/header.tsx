"use client";

import React from "react";
import { Search, Bell, Download, Filter, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

type HeaderProps = {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
};

const Header: React.FC<HeaderProps> = ({
  userName = "User",
  userEmail = "user@example.com",
  avatarUrl,
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors z-10">
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder="Search transactions, merchants, or alerts..."
              className="w-full bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-8">
          {/* Action Buttons */}
          <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors relative"
            >
              <Filter size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors relative"
            >
              <Download size={20} />
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </motion.button>

            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

            <button className="flex items-center gap-3 pl-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-[2px] cursor-pointer">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userName
                      )}&background=0D8ABC&color=fff`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

