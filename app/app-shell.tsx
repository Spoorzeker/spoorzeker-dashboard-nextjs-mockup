"use client";

import { useState } from "react";
import {
  FileStack,
  LayoutGrid,
  PanelLeft,
  Route,
  SquareCheckBig,
  Users,
} from "lucide-react";
import data from "./data.json";

const navItems = [
  { title: "Dashboard", icon: LayoutGrid, active: true },
  { title: "Trajecten", icon: Route, active: false },
  { title: "Taken", icon: SquareCheckBig, active: false },
  { title: "Medewerkers", icon: Users, active: false },
  { title: "Rapportages", icon: FileStack, active: false },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const { auth } = data;
  const initials = auth.userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex min-h-svh w-full bg-sidebar">
      <aside
        className={`hidden shrink-0 flex-col transition-[width] duration-200 ease-linear md:flex ${
          open ? "w-64" : "w-16"
        }`}
      >
        <div
          className={`flex items-center gap-3 py-4 ${open ? "px-4" : "justify-center px-2"}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-pine text-sm font-semibold text-white">
            SZ
          </span>
          {open && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                SpoorZeker
              </p>
              <p className="truncate text-xs text-ink/50">
                {auth.organizationName}
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-2 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <a
                  href="#"
                  title={item.title}
                  className={`flex items-center gap-3 rounded-lg py-2 text-sm transition ${
                    open ? "px-3" : "justify-center px-0"
                  } ${
                    item.active
                      ? "bg-sidebar-accent font-medium text-ink"
                      : "text-ink/70 hover:bg-sidebar-accent/60 hover:text-ink"
                  }`}
                >
                  <item.icon className="size-4 shrink-0" />
                  {open && item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-2 pb-3">
          <div
            className={`flex items-center gap-3 rounded-lg py-2 ${open ? "px-2" : "justify-center px-0"}`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pine/10 text-xs font-semibold text-pine">
              {initials}
            </span>
            {open && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {auth.userName}
                </p>
                <p className="truncate text-xs text-ink/50">{auth.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="relative flex min-h-svh max-w-full flex-1 flex-col bg-white md:m-2 md:ml-0 md:min-h-[calc(100svh-1rem)] md:rounded-xl md:shadow-sm">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 md:px-4">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            title="Zijbalk in- of uitklappen"
            className="-ml-1 flex size-7 cursor-pointer items-center justify-center rounded-md text-ink/70 transition hover:bg-sand hover:text-ink"
          >
            <PanelLeft className="size-4" />
          </button>
          <p className="text-sm font-medium text-ink">Dashboard</p>
        </header>
        {children}
      </main>
    </div>
  );
}
