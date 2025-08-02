interface CircularProgressProps {
  value?: number;
  total: number; // 0 to 100
  size?: number; // pixel cinsinden çapı (default 100)
  strokeWidth?: number;
}

export const CircularProgress = ({
  value = 0,
  total,
  size = 75,
  strokeWidth = 10,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // gray-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // blue-500
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-md font-semibold text-gray-800 dark:text-foreground">
          {value}/{total}
        </span>
      </div>
    </div>
  );
};
