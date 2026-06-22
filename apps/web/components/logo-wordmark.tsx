import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoWordmarkProps = {
  className?: string;
  centered?: boolean;
  hero?: boolean;
};

export function LogoWordmark({
  className,
  centered = false,
  hero = false,
}: LogoWordmarkProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src="/EasyFlowLogo.png"
        alt="EasyFlow"
        fill
        sizes="320px"
        className={cn(
          "object-contain",
          centered ? "origin-center object-center" : "origin-left object-left",
          hero ? "scale-[2.9]" : "scale-[1.65]"
        )}
        priority
      />
    </div>
  );
}
