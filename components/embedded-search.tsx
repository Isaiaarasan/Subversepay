"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Search, LayoutDashboard, Store, CheckCircle, BarChart3, Bell, CreditCard, Activity, Ticket, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface EmbeddedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

const EmbeddedSearch: React.FC<EmbeddedSearchProps> = ({ isOpen, onClose, searchQuery }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isSuperAdmin = pathname?.startsWith("/dashboard/super-admin");

  // Get navigation items based on current context
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      {
        name: "Overview",
        href: isSuperAdmin ? "/dashboard/super-admin" : "/dashboard",
        icon: LayoutDashboard,
        description: "Dashboard overview and metrics"
      },
      {
        name: "Merchants",
        href: isSuperAdmin ? "/dashboard/super-admin/merchants" : "/dashboard/features/merchants",
        icon: Store,
        description: "Manage and view merchant accounts"
      },
      {
        name: "Approvals",
        href: isSuperAdmin ? "/dashboard/super-admin/approvals" : "/dashboard/features/approvals",
        icon: CheckCircle,
        description: "Review and approve pending requests"
      },
      {
        name: "Analytics",
        href: isSuperAdmin ? "/dashboard/super-admin/analytics" : "/dashboard/features/analytics",
        icon: BarChart3,
        description: "View analytics and reports"
      },
      {
        name: "Alerts",
        href: isSuperAdmin ? "/dashboard/super-admin/alerts" : "/dashboard/features/alerts",
        icon: Bell,
        description: "System alerts and notifications"
      },
      {
        name: "Settlements",
        href: isSuperAdmin ? "/dashboard/super-admin/settlements" : "/dashboard/features/settlements",
        icon: CreditCard,
        description: "Settlement reports and payments"
      },
      {
        name: "System Health",
        href: isSuperAdmin ? "/dashboard/super-admin/system-health" : "/dashboard/features/system-health",
        icon: Activity,
        description: "Monitor system status and performance"
      },
      {
        name: "Tickets",
        href: isSuperAdmin ? "/dashboard/super-admin/tickets" : "/dashboard/features/tickets",
        icon: Ticket,
        description: "Support tickets and issues"
      }
    ];

    // Add settings for non-super-admin users
    if (!isSuperAdmin) {
      baseItems.push({
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        description: "Account and system settings"
      });
    }

    return baseItems;
  };

  const currentNavigationItems = getNavigationItems();

  // Filter navigation items based on search query
  const filteredItems = currentNavigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleNavigate(filteredItems[selectedIndex].href);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, currentNavigationItems]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleNavigate = (href: string) => {
    window.location.href = href;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="relative z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="p-2">
                {filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => handleNavigate(item.href)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-sm">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Search className="h-6 w-6 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery ? "No results found" : "Start typing to search..."}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredItems.length > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              {/* <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div> */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EmbeddedSearch;
