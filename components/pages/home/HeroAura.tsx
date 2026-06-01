export default function HeroAura() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-20 z-60 h-56 overflow-hidden"
    >
      <div className="hero-aura absolute -top-12 left-1/2 h-44 w-[140%] -translate-x-1/2 opacity-70 blur-3xl dark:opacity-90" />
    </div>
  );
}
