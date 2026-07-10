"use client";

export function MughalFrame() {
  return (
    <svg
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mghGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d97a" />
          <stop offset="50%" stopColor="#c9a54a" />
          <stop offset="100%" stopColor="#7a5a12" />
        </linearGradient>
        <pattern id="jali" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M8 0 L16 8 L8 16 L0 8 Z"
            fill="none"
            stroke="url(#mghGold)"
            strokeWidth="1"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect
        x="8"
        y="8"
        width="384"
        height="544"
        fill="none"
        stroke="url(#mghGold)"
        strokeWidth="3"
      />
      <path
        d="M 30 80 Q 30 40 90 40 Q 120 50 150 40 Q 180 30 200 60 Q 220 30 250 40 Q 280 50 310 40 Q 370 40 370 80"
        fill="none"
        stroke="url(#mghGold)"
        strokeWidth="2"
      />
      <rect x="16" y="16" width="50" height="50" fill="url(#jali)" />
      <rect x="334" y="16" width="50" height="50" fill="url(#jali)" />
      <line
        x1="24"
        y1="90"
        x2="24"
        y2="480"
        stroke="url(#mghGold)"
        strokeWidth="2"
      />
      <line
        x1="376"
        y1="90"
        x2="376"
        y2="480"
        stroke="url(#mghGold)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function RenaissanceFrame() {
  return (
    <svg
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="renGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d97a" />
          <stop offset="50%" stopColor="#c9a54a" />
          <stop offset="100%" stopColor="#7a5a12" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="384"
        height="544"
        fill="none"
        stroke="url(#renGold)"
        strokeWidth="3"
      />
      <g opacity="0.7">
        {[20, 26, 32].map((x) => (
          <line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="520"
            stroke="url(#renGold)"
            strokeWidth="1"
          />
        ))}
        {[368, 374, 380].map((x) => (
          <line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="520"
            stroke="url(#renGold)"
            strokeWidth="1"
          />
        ))}
      </g>
      <circle
        cx="26"
        cy="35"
        r="8"
        fill="none"
        stroke="url(#renGold)"
        strokeWidth="2"
      />
      <circle
        cx="374"
        cy="35"
        r="8"
        fill="none"
        stroke="url(#renGold)"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function OrnateFrame({ style, className }) {
  return (
    <div className={className}>
      {style === "mughal" ? <MughalFrame /> : <RenaissanceFrame />}
    </div>
  );
}
