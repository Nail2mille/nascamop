"use client"

interface SectionTransitionProps {
  fromColor?: string
  toColor?: string
  height?: string
}

export function SectionTransition({
  fromColor = "from-black",
  toColor = "to-[#0A0A20]",
  height = "h-20",
}: SectionTransitionProps) {
  return (
    <div className={`w-full ${height} bg-gradient-to-b ${fromColor} ${toColor} relative overflow-hidden`}>
      {/* Subtle animated particles for smooth transition */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(90, 79, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(90, 79, 255, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  )
}
