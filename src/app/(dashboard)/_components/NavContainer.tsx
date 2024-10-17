import { Nav, NavLink } from "@/components/Nav";
import { ReactNode } from "react";

export default function NavWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/about">About</NavLink>
      </Nav>
      <div className="container mx-auto p-4">{children}</div>
    </>
  );
}
