import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { StickyNote, List, ChevronsRight, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Menu Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 md:hidden z-50 bg-gray-200 p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-100 fixed md:relative top-0 left-0 h-full w-64 md:m-6 p-6  rounded-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:h-[90%] md:w-72`}
      >
        <Link to="/"> <h2 className="text-3xl text-center font-bold pb-6">Eversticky</h2></Link>

        {/* Search Bar */}
        <div className="pb-6 flex justify-center">
          <SearchBar />
        </div>

        {/* Tasks Section */}
        <h5 className="text-xl font-semibold pb-4">Tasks</h5>
        <ul className="space-y-4">
          <Link to="/daily" className="flex items-center gap-2">
            <List />
            <span>Daily</span>
          </Link>
          <Link to="/upcoming" className="flex items-center gap-2">
            <ChevronsRight />
            <span>Upcoming</span>
          </Link>
          <Link to="/stickywall" className="flex items-center gap-2">
            <StickyNote size={20} />
            <span>Stickywall</span>
          </Link>
        </ul>

        {/* Tags Section */}
        <h5 className="text-xl font-semibold pt-10 pb-4">Tags</h5>
        <ul className="flex flex-wrap gap-3 space-y-2">
          <li className="bg-red-300 hover:bg-red-400 px-3 cursor-pointer py-1 rounded-md text-sm">Important</li>
          <li className="bg-yellow-300 hover:bg-yellow-400 px-3 cursor-pointer py-1 rounded-md text-sm">Intermediate</li>
          <li className="bg-green-300 hover:bg-green-400 px-3 cursor-pointer py-1 rounded-md text-sm">Least Important</li>
        </ul>
      </div>
    </div>
  );
}
