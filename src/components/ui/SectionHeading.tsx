interface SectionHeadingProps {
  tagline?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  tagline,
  title,
  subtitle,
  centered = false,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`space-y-3 mb-12 ${
        centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"
      } ${className}`}
    >
      {tagline && (
        <span
          className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase ${
            light ? "text-sand-300" : "text-timber"
          }`}
        >
          {tagline}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] ${
          light ? "text-ivory" : "text-walnut"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-ivory/70" : "text-charcoal/80"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`h-0.5 w-12 bg-sand-300 mt-4 ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
