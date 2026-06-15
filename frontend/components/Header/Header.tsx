"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authService } from "@/services/authService/auth.service";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  const navigationItems = [
    { href: "/quests", label: "Квести", icon: "🎮", iconColor: "#8b5cf6" },
    { href: "/challenges", label: "Виклики", icon: "⚡", iconColor: "#f59e0b" },
    { href: "/rating", label: "Рейтинг", icon: "🏆", iconColor: "#f97316" },
    { href: "/profile", label: "Профіль", icon: "👤", iconColor: "#818cf8" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkStyle = {
    color: "var(--color-text-body)",
    background: "transparent",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "var(--color-surface-overlay)";
    e.currentTarget.style.color = "var(--color-text-primary)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "var(--color-text-body)";
  };

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="w-9 h-9 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">DQ</span>
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              DEVQUEST
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                style={navLinkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span style={{ color: item.iconColor }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span style={{ color: "#ef4444" }}>🚪</span>
              <span>Вийти</span>
            </button>
          </nav>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg transition-colors duration-300"
            style={{ color: "var(--color-text-body)" }}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1" : ""}`}
                style={{ background: "var(--color-text-body)" }}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                style={{ background: "var(--color-text-body)" }}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                style={{ background: "var(--color-text-body)" }}
              />
            </div>
          </button>
        </div>
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-64 pb-2" : "max-h-0"
          }`}
          style={{ background: "var(--color-bg-subtle)" }}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsMenuOpen(false)}
            >
              <span style={{ color: item.iconColor }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span style={{ color: "#ef4444" }}>🚪</span>
            <span>Вийти</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
