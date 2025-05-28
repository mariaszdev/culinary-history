"use client";

import { useState, useRef, useEffect } from "react";

interface LicenseInfoProps {
  url: string;
  label: string;
  title: string;
  icons?: string[];
}

export default function LicenseInfo({
  url,
  label,
  title,
  icons = [],
}: LicenseInfoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (isHovered && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
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
        className="flex items-center gap-1"
        style={{ textDecoration: "none" }}
      >
        {icons.map((icon, idx) => (
          <img
            key={idx}
            src={`/license-icons/${icon}`}
            alt={`${label} icon ${idx + 1}`}
            width={30}
            height={30}
            className="inline-block"
          />
        ))}
      </a>

      {isHovered && (
        <div
          ref={tooltipRef}
          className={`absolute top-full mt-[-1px] z-10 min-w-[290px] max-w-md py-2 px-3 bg-white border border-gray-300 rounded shadow-lg text-sm text-gray-800 ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          <p className={"font-bold"}>{label}</p>
          <p className="mt-1">{title}</p>
          <p className="mt-2 break-words">
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
