"use client";

import { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ToggleDarkModeButton from "./ToggleDarkModeButton";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="w-full bg-primary text-primary-foreground flex justify-center px-4 lg:px-0">
      <div className="container flex justify-center">{children}</div>
      <ToggleDarkModeButton />
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visibile:bg-secodnary focus-visible:text-secondary",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
