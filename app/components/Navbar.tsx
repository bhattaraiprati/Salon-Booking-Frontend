"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2C7A6E] text-white font-bold">
            S
          </span>
          <span className="text-xl font-semibold tracking-tight text-gray-900">
            SalonBook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2C7A6E]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2C7A6E]"
          >
            Login
          </Link>
          <Link
            href="/book"
            className="rounded-lg bg-[#2C7A6E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#236258] hover:shadow-md"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-[#2C7A6E]"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-[#2C7A6E]"
            >
              Login
            </Link>
            <Link
              href="/book"
              className="rounded-lg bg-[#2C7A6E] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#236258]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}