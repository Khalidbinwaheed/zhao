import Link from "next/link";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold tracking-tight text-primary font-heading">
        ZHAO
        <span className="text-accent font-light italic ml-0.5">BEAUTY</span>
      </span>
    </Link>
  );
};
