"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default pointer via stylesheet injection
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'button, input, select, a, [role="button"], .group'
      );
      interactives.forEach((el) => {
        el.style.cursor = "none";
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Set up MutationObserver to re-apply cursor rules when screen state swaps
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      document.body.style.cursor = "default";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-4px, -28px) rotate(${
          isHovered ? "-25deg" : "-10deg"
        })`,
      }}
    >
      {/* Precision Vector Quill Drawing */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 2C20 4 12 10 8 16C6 19 5 22 4 25L3 29L7 28C10 27 13 26 16 24C22 20 28 12 30 4C30.5 2.5 29.5 1.5 28 2Z"
          fill="url(#quillGold)"
          stroke="#2a1a0a"
          strokeWidth="1.5"
        />
        <path
          d="M4 25C8 23 14 20 18 15"
          stroke="#2a1a0a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="quillGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d97a" />
            <stop offset="70%" stopColor="#c9a54a" />
            <stop offset="100%" stopColor="#7a5a12" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
