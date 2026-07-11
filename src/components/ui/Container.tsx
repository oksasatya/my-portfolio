import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:max-w-[1920px] 2xl:px-24 ${className}`}>
      {children}
    </div>
  );
}
