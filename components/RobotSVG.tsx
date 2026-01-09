import React from 'react';

interface RobotSVGProps {
  className?: string;
}

const RobotSVG: React.FC<RobotSVGProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 1024 1024" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Next Robot Logo"
    >
      <defs>
        <linearGradient id="bodyG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5ee0fd"/>
          <stop offset="100%" stopColor="#258be7"/>
        </linearGradient>
      </defs>

      {/* Head */}
      <ellipse cx="512" cy="320" rx="220" ry="200" fill="url(#bodyG)"/>
      {/* Eyes - using global CSS .eye class for animation */}
      <ellipse className="eye" cx="440" cy="260" rx="35" ry="35" fill="#000"/>
      <ellipse className="eye" cx="585" cy="260" rx="35" ry="35" fill="#000"/>
      {/* Smile */}
      <path d="M450,330 Q512,380 575,330" fill="#d21c2c"/>
      {/* Cheeks */}
      <circle cx="375" cy="310" r="30" fill="#ff7ea8" opacity=".8"/>
      <circle cx="650" cy="310" r="30" fill="#ff7ea8" opacity=".8"/>

      {/* Antennas */}
      <line x1="400" y1="170" x2="360" y2="100" stroke="#4ba3f5" strokeWidth="20"/>
      <circle cx="360" cy="100" r="20" fill="#4ba3f5"/>
      <line x1="620" y1="170" x2="660" y2="100" stroke="#4ba3f5" strokeWidth="20"/>
      <circle cx="660" cy="100" r="20" fill="#4ba3f5"/>

      {/* Body */}
      <ellipse cx="512" cy="600" rx="230" ry="280" fill="url(#bodyG)"/>
      {/* Arms */}
      <ellipse cx="300" cy="610" rx="50" ry="100" fill="url(#bodyG)"/>
      <ellipse cx="720" cy="610" rx="50" ry="100" fill="url(#bodyG)"/>

      {/* Chest Panel */}
      <rect x="400" y="540" width="220" height="120" rx="20" fill="#0c1b2c"/>
      <text x="425" y="615" fontSize="48" fill="#ffffff" fontFamily="Arial, sans-serif">▶ Next</text>

      {/* Shadow */}
      <ellipse cx="512" cy="900" rx="140" ry="30" fill="#000" opacity=".1"/>
    </svg>
  );
};

export default RobotSVG;