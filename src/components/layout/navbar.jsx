"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Search, Bell, Settings, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "overview", href: "/" },
    { name: "applications", href: "/applications" },
    { name: "interviews", href: "/interview" },
    { name: "analytics", href: "/analytics" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Title */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">JobTracker Pro</h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              {/* <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div> */}

              {/* Notifications */}
              {/* <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button> */}

              {/* Settings */}
              {/* <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button> */}

              {/* User */}
              <div className="flex items-center space-x-2">
                <a className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"
                    href="/profile"
                >
                  <User className="h-5 w-5 text-white" />
                </a>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  pathname === tab.href
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
