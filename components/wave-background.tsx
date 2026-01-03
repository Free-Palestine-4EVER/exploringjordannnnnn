export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 opacity-60">
      {" "}
      {/* Reduced opacity */}
      <div className="wave wave-1"></div>
      {/* Removed wave-2 to reduce DOM elements and animations */}
      <div className="wave wave-3"></div>
    </div>
  )
}
