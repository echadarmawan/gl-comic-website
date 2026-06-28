export function SparkleIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 2L17.8 12.5L28 14L17.8 15.5L16 26L14.2 15.5L4 14L14.2 12.5Z" fill="currentColor" />
      <circle cx="24" cy="6" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}