"use client";

import React, { useEffect } from "react";
import {
  Search,
  Bell,
  Download,
  Filter,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import EmbeddedSearch from "@/components/embedded-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/app/actions/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setSearchOpen,
  setGlobalSearchQuery,
  toggleSearch,
} from "@/lib/store/slices/dashboardSlice";

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
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const dispatch = useAppDispatch();
  const isSearchOpen = useAppSelector((state) => state.dashboard.isSearchOpen);
  const globalSearchQuery = useAppSelector((state) => state.dashboard.globalSearchQuery);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch(setSearchOpen(true));
      }
      // Escape to close search
      if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault();
        dispatch(setSearchOpen(false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, dispatch]);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center gap-6">
        {/* Search Bar - Extended */}
        <div className="flex-1 relative">
          <div className="relative">
            <button
              onClick={() => dispatch(toggleSearch())}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors z-10"
            >
              <Search size={20} />
            </button>
            {isSearchOpen ? (
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => dispatch(setGlobalSearchQuery(e.target.value))}
                placeholder="Search navigation, pages, or type a command..."
                className="w-full bg-white dark:bg-gray-900 border border-blue-500 ring-2 ring-blue-500/20 rounded-xl pl-12 pr-4 py-3 outline-none text-sm text-gray-900 dark:text-gray-100"
                autoFocus
              />
            ) : (
              <div
                onClick={() => dispatch(setSearchOpen(true))}
                className="w-full bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-left outline-none transition-all text-sm cursor-text hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              >
                <span className="text-gray-400 dark:text-gray-500">
                  Search navigation, pages, or type a command...
                </span>
              </div>
            )}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 font-mono">
              ⌘K
            </div>
          </div>

          {/* Embedded Search Results */}
          {isSearchOpen && (
            <EmbeddedSearch
              isOpen={isSearchOpen}
              onClose={() => {
                dispatch(setSearchOpen(false));
                dispatch(setGlobalSearchQuery(""));
              }}
              searchQuery={globalSearchQuery}
            />
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Action Buttons */}
          {/* <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
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
          </div> */}

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

            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-600 mx-1"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-2 group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-colors">
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userEmail}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500 hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userEmail}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
