interface EyebrowProps {
  index?: string;
  children: string;
  className?: string;
}

/** Tiny uppercase metadata label with a gilt section number. */
export function Eyebrow({ index, children, className = '' }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-bone/50 ${className}`}>
      {index && <span className="text-gilt">{index}</span>}
      <span className="h-px w-6 bg-bone/25" />
      {children}
    </p>
  );
}
