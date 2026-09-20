const NexoraLogo = ({ size = 42 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nexora-logo"
    >
      <defs>
        {/* Main N gradient */}
        <linearGradient
          id="nexoraGradient"
          x1="8"
          y1="54"
          x2="55"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="50%" stopColor="#5865FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Glow */}
        <filter
          id="nexoraGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main futuristic N */}
      <path
        d="M14 50L23 14C24 10 29 9 31 13L41 36L47 14C48 10 54 10 53 15L45 50C44 55 38 55 36 51L25 28L20 50C19 55 12 54 14 50Z"
        fill="url(#nexoraGradient)"
        filter="url(#nexoraGlow)"
      />

      {/* Orbit */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="11"
        transform="rotate(-18 32 32)"
        stroke="url(#nexoraGradient)"
        strokeWidth="1.5"
        opacity="0.9"
        className="nexora-orbit"
      />

      {/* Orbit particle */}
      <circle
        cx="58"
        cy="23"
        r="2.5"
        fill="#00D9FF"
        filter="url(#nexoraGlow)"
        className="nexora-particle"
      />

      {/* AI sparkle */}
      <path
        d="M49 7L50.5 11.5L55 13L50.5 14.5L49 19L47.5 14.5L43 13L47.5 11.5L49 7Z"
        fill="white"
        className="nexora-sparkle"
      />
    </svg>
  );
};

export default NexoraLogo;