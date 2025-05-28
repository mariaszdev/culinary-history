import { useState, useRef, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

interface ProviderInfoProps {
  url: string;
}

const ProviderInfo: React.FC<ProviderInfoProps> = ({ url }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLAnchorElement | null>(null);
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (isHovered && tooltipRef.current && iconRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
      const overflowRight = tooltipRect.right > window.innerWidth;

      setAlignRight(overflowRight);
    }
  }, [isHovered]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        ref={iconRef}
        className="text-gray-600 hover:text-pink-800 transition-colors"
        aria-label="View on the providing institution's website"
      >
        <FiExternalLink size={24} />
      </a>
      {isHovered && (
        <div
          ref={tooltipRef}
          className={`absolute top-full mt-2 z-10 min-w-[176px] max-w-md py-1 px-2 bg-white border border-gray-300 rounded shadow-lg text-sm text-gray-800 ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          <p>Zur Originalquelle auf der Website der Institution</p>
        </div>
      )}
    </div>
  );
};

export default ProviderInfo;
