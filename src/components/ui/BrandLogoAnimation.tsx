"use client";

import React from "react";

interface BrandLogoAnimationProps {
  size?: number; // e.g. 260
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogoAnimation({
  size = 280,
  className = "",
  showSubtitle = true,
}: BrandLogoAnimationProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 0.95 }}
    >
      <svg
        viewBox="0 0 400 360"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for Wood Rings */}
          <radialGradient id="woodGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9E0B2" />
            <stop offset="25%" stopColor="#E6B56D" />
            <stop offset="60%" stopColor="#C88A3E" />
            <stop offset="85%" stopColor="#8F5923" />
            <stop offset="100%" stopColor="#362217" />
          </radialGradient>

          <linearGradient id="plaqueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#251710" />
            <stop offset="25%" stopColor="#3B261A" />
            <stop offset="50%" stopColor="#4A3122" />
            <stop offset="75%" stopColor="#3B261A" />
            <stop offset="100%" stopColor="#251710" />
          </linearGradient>

          <linearGradient id="plaqueBorder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B4E2E" />
            <stop offset="100%" stopColor="#1B100B" />
          </linearGradient>

          <filter id="plaqueShadow" x="-10%" y="-20%" width="120%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#150B07" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* LAYER 1: CIRCULAR WOOD CROSS-SECTION (ROTATING) */}
        <g className="origin-[200px_165px] animate-spin-wood">
          {/* Outer Carved Bark Rim */}
          <circle
            cx="200"
            cy="165"
            r="140"
            fill="#2B1A12"
            stroke="#180F0A"
            strokeWidth="5"
          />
          <circle
            cx="200"
            cy="165"
            r="134"
            fill="none"
            stroke="#533522"
            strokeWidth="3"
            strokeDasharray="6 3"
          />

          {/* Core Wood Disc */}
          <circle cx="200" cy="165" r="130" fill="url(#woodGlow)" />

          {/* Concentric Annual Growth Rings */}
          {[120, 110, 100, 90, 82, 74, 66, 58, 50, 42, 34, 26, 18, 10, 4].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="165"
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? "#7B4D20" : "#B87A32"}
              strokeWidth={i % 3 === 0 ? "2.2" : "1.4"}
              strokeOpacity={0.75}
              strokeDasharray={i % 2 === 0 ? "180 2" : "120 3"}
            />
          ))}

          {/* Wood grain micro rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="200"
              y1="165"
              x2={200 + 128 * Math.cos((deg * Math.PI) / 180)}
              y2={165 + 128 * Math.sin((deg * Math.PI) / 180)}
              stroke="#5A3515"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
          ))}
        </g>

        {/* LAYER 2: 5 PINE TREES SILHOUETTES (GROWING / APPEARING FROM BASE) */}
        <g className="origin-[200px_230px] animate-trees-appear">
          {/* Tree 1: Far Left (Small) */}
          <g transform="translate(100, 160) scale(0.55)">
            <path
              d="M20,0 L27,15 L23,15 L31,30 L26,30 L36,48 L4,48 L14,30 L9,30 L17,15 L13,15 Z"
              fill="#241710"
            />
          </g>

          {/* Tree 2: Mid Left (Medium) */}
          <g transform="translate(138, 135) scale(0.72)">
            <path
              d="M25,0 L34,18 L29,18 L39,36 L33,36 L46,58 L4,58 L17,36 L11,36 L21,18 L16,18 Z"
              fill="#1F130D"
            />
          </g>

          {/* Tree 3: Center Monarch Tree (Tallest) */}
          <g transform="translate(175, 100) scale(1)">
            <path
              d="M25,0 L36,24 L30,24 L42,48 L35,48 L50,78 L0,78 L15,48 L8,48 L20,24 L14,24 Z"
              fill="#180D08"
            />
          </g>

          {/* Tree 4: Mid Right (Medium) */}
          <g transform="translate(226, 135) scale(0.72)">
            <path
              d="M25,0 L34,18 L29,18 L39,36 L33,36 L46,58 L4,58 L17,36 L11,36 L21,18 L16,18 Z"
              fill="#1F130D"
            />
          </g>

          {/* Tree 5: Far Right (Small) */}
          <g transform="translate(278, 160) scale(0.55)">
            <path
              d="M20,0 L27,15 L23,15 L31,30 L26,30 L36,48 L4,48 L14,30 L9,30 L17,15 L13,15 Z"
              fill="#241710"
            />
          </g>
        </g>

        {/* LAYER 3: WOODEN PLAQUE & BRAND NAME (SLIDING IN FRONT) */}
        <g filter="url(#plaqueShadow)" className="animate-plaque-appear">
          {/* Plaque Base with curved ends */}
          <path
            d="M30,225 
               Q30,220 38,220 
               L362,220 
               Q370,220 370,225 
               L368,265 
               Q368,272 360,272 
               L40,272 
               Q32,272 32,265 Z"
            fill="url(#plaqueGrad)"
            stroke="url(#plaqueBorder)"
            strokeWidth="3.5"
          />

          {/* Plaque Wood Grain Accent Lines */}
          <line x1="42" y1="228" x2="358" y2="228" stroke="#5E3B24" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="46" y1="264" x2="354" y2="264" stroke="#22120A" strokeWidth="1.5" />

          {/* Main Brand Name: SHANKAR TIMBER MART */}
          <text
            x="200"
            y="247"
            textAnchor="middle"
            fill="#FFF8ED"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "25px",
              letterSpacing: "1.5px",
            }}
          >
            SHANKAR TIMBER MART
          </text>

          {/* Subtitle & Flanking Rules: FINEST QUALITY PRODUCTS */}
          {showSubtitle && (
            <g>
              <line x1="68" y1="258" x2="116" y2="258" stroke="#DDBA88" strokeWidth="1" strokeOpacity="0.8" />
              <text
                x="200"
                y="261"
                textAnchor="middle"
                fill="#DDBA88"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "9px",
                  letterSpacing: "2.5px",
                }}
              >
                FINEST QUALITY PRODUCTS
              </text>
              <line x1="284" y1="258" x2="332" y2="258" stroke="#DDBA88" strokeWidth="1" strokeOpacity="0.8" />
            </g>
          )}
        </g>

        {/* Registered Trademark ® */}
        <text
          x="332"
          y="72"
          fill="#3B261A"
          style={{
            fontFamily: "sans-serif",
            fontSize: "19px",
            fontWeight: "bold",
          }}
        >
          ®
        </text>
      </svg>
    </div>
  );
}
