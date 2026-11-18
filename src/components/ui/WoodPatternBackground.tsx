import React from "react";

interface WoodPatternBackgroundProps {
  opacity?: string;
  className?: string;
}

export function WoodPatternBackground({
  opacity = "opacity-[0.06]",
  className = "",
}: WoodPatternBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${opacity} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Unified Aesthetic Wood Annual Growth Rings Seamless Tile */}
          <pattern
            id="aesthetic-wood-rings"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            {/* Center Log Cross-Section Rings (Center 200, 200) */}
            <circle
              cx="200"
              cy="200"
              r="12"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.2"
            />
            <circle
              cx="200"
              cy="200"
              r="28"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="48"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="72"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1.1"
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="132"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.2"
            />
            <circle
              cx="200"
              cy="200"
              r="168"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1"
            />

            {/* Subtle Center Radial Medullary Rays */}
            <line
              x1="200"
              y1="168"
              x2="200"
              y2="60"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
            <line
              x1="200"
              y1="232"
              x2="200"
              y2="340"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
            <line
              x1="168"
              y1="200"
              x2="60"
              y2="200"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
            <line
              x1="232"
              y1="200"
              x2="340"
              y2="200"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
            <line
              x1="176"
              y1="176"
              x2="100"
              y2="100"
              stroke="#C88A3E"
              strokeWidth="0.75"
              strokeDasharray="3 7"
            />
            <line
              x1="224"
              y1="224"
              x2="300"
              y2="300"
              stroke="#C88A3E"
              strokeWidth="0.75"
              strokeDasharray="3 7"
            />
            <line
              x1="224"
              y1="176"
              x2="300"
              y2="100"
              stroke="#C88A3E"
              strokeWidth="0.75"
              strokeDasharray="3 7"
            />
            <line
              x1="176"
              y1="224"
              x2="100"
              y2="300"
              stroke="#C88A3E"
              strokeWidth="0.75"
              strokeDasharray="3 7"
            />

            {/* Interlocking Corner Rings: Top-Left (0, 0) */}
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="0"
              r="52"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="0"
              r="84"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.1"
            />
            <circle
              cx="0"
              cy="0"
              r="120"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="0"
              r="160"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1.2"
            />
            <line
              x1="24"
              y1="24"
              x2="110"
              y2="110"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />

            {/* Interlocking Corner Rings: Top-Right (400, 0) */}
            <circle
              cx="400"
              cy="0"
              r="24"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="0"
              r="52"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="0"
              r="84"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.1"
            />
            <circle
              cx="400"
              cy="0"
              r="120"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="0"
              r="160"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1.2"
            />
            <line
              x1="376"
              y1="24"
              x2="290"
              y2="110"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />

            {/* Interlocking Corner Rings: Bottom-Left (0, 400) */}
            <circle
              cx="0"
              cy="400"
              r="24"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="400"
              r="52"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="400"
              r="84"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.1"
            />
            <circle
              cx="0"
              cy="400"
              r="120"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1"
            />
            <circle
              cx="0"
              cy="400"
              r="160"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1.2"
            />
            <line
              x1="24"
              y1="376"
              x2="110"
              y2="290"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />

            {/* Interlocking Corner Rings: Bottom-Right (400, 400) */}
            <circle
              cx="400"
              cy="400"
              r="24"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="400"
              r="52"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="400"
              r="84"
              fill="none"
              stroke="#A47A4D"
              strokeWidth="1.1"
            />
            <circle
              cx="400"
              cy="400"
              r="120"
              fill="none"
              stroke="#8C6239"
              strokeWidth="1"
            />
            <circle
              cx="400"
              cy="400"
              r="160"
              fill="none"
              stroke="#C88A3E"
              strokeWidth="1.2"
            />
            <line
              x1="376"
              y1="376"
              x2="290"
              y2="290"
              stroke="#A47A4D"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aesthetic-wood-rings)" />
      </svg>
    </div>
  );
}

