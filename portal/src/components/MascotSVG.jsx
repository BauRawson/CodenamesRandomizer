export default function MascotSVG({ className = 'w-48 h-48' }) {
  return (
    <svg className={className} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="165" rx="55" ry="50" fill="#FF8C5A" />
      {/* Hoodie pocket */}
      <ellipse cx="100" cy="185" rx="28" ry="16" fill="#FF6B35" />
      {/* Head */}
      <ellipse cx="100" cy="95" rx="58" ry="55" fill="#FF8C5A" />
      {/* Left ear */}
      <polygon points="50,50 38,15 72,42" fill="#FF8C5A" />
      <polygon points="53,47 44,22 68,42" fill="#FFB3D1" />
      {/* Right ear */}
      <polygon points="150,50 162,15 128,42" fill="#FF8C5A" />
      <polygon points="147,47 156,22 132,42" fill="#FFB3D1" />
      {/* Face white patch */}
      <ellipse cx="100" cy="105" rx="38" ry="34" fill="#FFF0E6" />
      {/* Left eye */}
      <ellipse cx="82" cy="90" rx="11" ry="12" fill="white" />
      <ellipse cx="84" cy="92" rx="7" ry="8" fill="#1A1A2E" />
      <circle cx="86" cy="89" r="2.5" fill="white" />
      {/* Right eye */}
      <ellipse cx="118" cy="90" rx="11" ry="12" fill="white" />
      <ellipse cx="120" cy="92" rx="7" ry="8" fill="#1A1A2E" />
      <circle cx="122" cy="89" r="2.5" fill="white" />
      {/* Nose */}
      <ellipse cx="100" cy="108" rx="5" ry="4" fill="#FF4D8D" />
      {/* Mouth */}
      <path d="M94 114 Q100 120 106 114" stroke="#FF4D8D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Whiskers left */}
      <line x1="62" y1="108" x2="90" y2="111" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="60" y1="115" x2="90" y2="114" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Whiskers right */}
      <line x1="138" y1="108" x2="110" y2="111" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="140" y1="115" x2="110" y2="114" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Paw left */}
      <ellipse cx="55" cy="175" rx="20" ry="16" fill="#FF8C5A" />
      <ellipse cx="49" cy="183" rx="7" ry="6" fill="#FF6B35" />
      <ellipse cx="57" cy="186" rx="7" ry="6" fill="#FF6B35" />
      {/* Paw right */}
      <ellipse cx="145" cy="175" rx="20" ry="16" fill="#FF8C5A" />
      <ellipse cx="139" cy="183" rx="7" ry="6" fill="#FF6B35" />
      <ellipse cx="147" cy="186" rx="7" ry="6" fill="#FF6B35" />
      {/* Tail */}
      <path d="M155 170 Q185 140 175 110 Q168 90 182 85" stroke="#FF8C5A" strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* Sparkle */}
      <text x="160" y="75" fontSize="22" fill="#FFD700">✦</text>
    </svg>
  )
}
