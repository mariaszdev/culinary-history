"use client";

import { useState, useRef, useEffect } from "react";

export default function LicenseInfo({
  url,
  label,
  description,
}: {
  url: string;
  label: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (isHovered && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const overflowRight = tooltipRect.right > window.innerWidth;

      setAlignRight(overflowRight);
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-3 py-2 bg-gray-100 rounded text-gray-600 hover:text-pink-800 text-sm font-semibold"
        style={{ textDecoration: "none" }}
      >
        {label}
      </a>

      {isHovered && (
        <div
          ref={tooltipRef}
          className={`absolute top-full mt-[-1px] z-10 min-w-[250px] max-w-md py-2 px-3 bg-white border border-gray-300 rounded shadow-lg text-sm text-gray-800 ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          <p>{description}</p>
          <p className="mt-2 break-words">
            Read more at:{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-800 underline break-all"
            >
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
