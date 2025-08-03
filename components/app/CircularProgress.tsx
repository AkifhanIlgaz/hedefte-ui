interface CircularProgressProps {
  value?: number;
  total: number; // 0 to 100
  size?: number; // pixel cinsinden çapı (default 100)
  strokeWidth?: number;
  duration?: number; // animasyon süresi (ms)
}

export const CircularProgress = ({
  value = 0,
  total,
  size = 75,
  strokeWidth = 10,
  duration = 1000,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(value, total); // Value'yu total ile sınırla
  const offset = circumference - circumference * (clampedValue / total);

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
          stroke={clampedValue === total ? "#32a848" : "#3b82f6"} // ClampedValue kullan
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: `stroke-dashoffset ${duration}ms ease-in-out`,
            animation: `fadeIn ${duration}ms ease-in-out`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-md font-semibold text-gray-800 dark:text-foreground"
          style={{
            animation: `countUp ${duration}ms ease-out`,
          }}
        >
          {value}/{total}
        </span>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
