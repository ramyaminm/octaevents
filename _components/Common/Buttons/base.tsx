import ArrowRight from "@/_components/SVGs/arrow-right";
import Link from "next/link";

interface CtaButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function CtaButton({
  text,
  href,
  className = "",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group
        inline-flex
        items-center
        gap-2
        bg-[#FDBA3B]
        text-primary
        px-8
        py-3
        rounded-full
        text-sm
        font-semibold
        transition-all
        duration-300
        hover:bg-pink
        hover:text-white
        ${className}
      `}
    >
      <span>{text}</span>

      <span
        className="
          w-5
          h-5
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:rotate-45
          group-hover:translate-x-1
          group-hover:text-white
        "
      >
        <ArrowRight />
      </span>
    </Link>
  );
}
