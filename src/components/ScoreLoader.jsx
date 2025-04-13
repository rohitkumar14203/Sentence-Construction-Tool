import React from "react";

const ScoreLoader = ({ score = 0 }) => {
  const radius = 62;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;

  const strokeDashoffset =
    score === 100 ? 0 : circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score === 0) return "#DC2626";
    if (score >= 70) return "#3A913F";
    if (score < 30) return "#F97316";
    return "#EAB308";
  };

  // Tailwind class for text
  const getTextColorClass = () => {
    if (score === 0) return "text-red-600";
    if (score >= 70) return "text-[#3A913F]";
    if (score < 30) return "text-orange-500";
    return "text-yellow-400";
  };

  const color = getColor();
  const textColorClass = getTextColorClass();

  return (
    <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        \
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 1s ease-out, stroke 0.3s ease",
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${textColorClass}`}>{score}</span>
        <span className={`text-[13px] font-medium ${textColorClass}`}>
          Overall Score
        </span>
      </div>
    </div>
  );
};

export default ScoreLoader;
