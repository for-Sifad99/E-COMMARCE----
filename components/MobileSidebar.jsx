'use client';

import { useState, useEffect, useRef } from "react";
import { CustomMenuIcon } from "@/components/CustomMenuIcon";
import { CustomCloseIcon } from "@/components/CustomCloseIcon";
import Logo from "@/components/Logo";
import Link from "next/link";


export function MobileSidebar({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* Button to open sidebar */}
      <button className="group" onClick={() => setIsOpen(true)}>
        <CustomMenuIcon />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 bg-opacity-30 backdrop-blur-xs z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full max-w-86 bg-[#f5f5f5] shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-300">
          <div onClick={handleLinkClick}>
            <Logo />
          </div>

          <button onClick={() => setIsOpen(false)} className='pr-2' >
            <CustomCloseIcon />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-3 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-lg text-slate-700 hover:text-[#FFAD51] transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
