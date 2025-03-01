import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { StickyNote, List, ChevronsRight, Menu, X, LogIn, UserPlus } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {/* Hamburger Menu Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden z-50 bg-white shadow-md p-2 rounded-full"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div
        className={`bg-white fixed md:relative top-0 left-0 h-full w-72 md:m-6 p-6 shadow-lg rounded-3xl transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:h-[90vh] overflow-y-auto`}
      >
        <Link to="/" className="block mb-8">
          <h2 className="text-3xl text-center font-bold text-blue-600">Eversticky</h2>
        </Link>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {/* Tasks Section */}
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Tasks</h5>
          <ul className="space-y-3">
            <li>
              <Link to="/daily" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <List className="text-blue-500" />
                <span className="font-medium">Daily</span>
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <ChevronsRight className="text-blue-500" />
                <span className="font-medium">Upcoming</span>
              </Link>
            </li>
            <li>
              <Link to="/stickywall" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <StickyNote size={20} className="text-blue-500" />
                <span className="font-medium">Stickywall</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Tags Section */}
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Tags</h5>
          <ul className="flex flex-wrap gap-2">
            <li className="bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-red-200 transition-colors">
              Important
            </li>
            <li className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-yellow-200 transition-colors">
              Intermediate
            </li>
            <li className="bg-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors">
              Least Important
            </li>
          </ul>
        </div>
        
        {/* Login/Signup Buttons */}
        <div className="flex flex-col gap-3 mt-auto pt-6">
          <Link to="/login" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium">
            <LogIn size={18} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="flex items-center justify-center gap-2 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 px-4 py-2.5 rounded-lg transition-colors font-medium">
            <UserPlus size={18} />
            <span>Signup</span>
          </Link>
        </div>
      </div>
    </div>
  );
}