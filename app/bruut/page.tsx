"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  Check,
  FileStack,
  HelpCircle,
  LayoutGrid,
  Lock,
  PanelLeft,
  Route,
  SquareCheckBig,
  Users,
} from "lucide-react";
import data from "../data.json";

const {
  auth,
  stats,
  billingAlert,
  helpRequests,
  upcomingTasks,
  openingSoonTasks,
  trajectories,
} = data;

const navItems = [
  { title: "Dashboard", icon: LayoutGrid, active: true },
  { title: "Trajecten", icon: Route, active: false },
  { title: "Taken", icon: SquareCheckBig, active: false },
  { title: "Medewerkers", icon: Users, active: false },
  { title: "Rapportages", icon: FileStack, active: false },
];

const statCards = [
  {
    icon: Users,
    label: "Actieve trajecten",
    value: stats.activeTrajectories,
    tint: "bg-lime",
  },
  {
    icon: AlertTriangle,
    label: "Taken te laat",
    value: stats.overdueTasks,
    tint: "bg-ember",
  },
  {
    icon: CalendarClock,
    label: "Taken deze week",
    value: stats.dueThisWeek,
    tint: "bg-yellow",
  },
];

// Neo-brutalism: zwarte rand, schaduw zonder vervaging, geen ronding.
// Alles in dit scherm gebruikt deze twee, zodat de stijl overal klopt.
const box = "border-[3px] border-ink shadow-[6px_6px_0_0_#101b17]";
const flat = "border-[3px] border-ink";
const press =
  "transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_0_#101b17]";

export default function BruutDashboard() {
  const [open, setOpen] = useState(true);
  const initials = auth.userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex min-h-svh w-full bg-yellow">
      <aside
        className={`hidden shrink-0 flex-col border-r-[3px] border-ink bg-white transition-[width] duration-200 md:flex ${
          open ? "w-64" : "w-20"
        }`}
      >
        <div
          className={`flex items-center gap-3 border-b-[3px] border-ink py-4 ${
            open ? "px-4" : "justify-center px-2"
          }`}
        >
          <span
            className={`flex size-11 shrink-0 items-center justify-center bg-pine text-sm font-black text-white ${flat}`}
          >
            SZ
          </span>
          {open && (
            <div className="min-w-0">
              <p className="truncate text-base font-black text-ink uppercase">
                SpoorZeker
              </p>
              <p className="truncate text-xs font-bold text-ink/60 uppercase">
                {auth.organizationName}
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.title}>
                <a
                  href="#"
                  title={item.title}
                  className={`flex items-center gap-3 py-3 text-sm font-black uppercase ${box} ${press} ${
                    open ? "px-4" : "justify-center px-0"
                  } ${
                    item.active
                      ? "bg-pine text-white"
                      : "bg-white text-ink hover:bg-lime"
                  }`}
                >
                  <item.icon className="size-4 shrink-0" />
                  {open && item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {open && (
          <div className={`m-4 bg-lime p-4 text-center ${box}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kiki.svg"
              alt="Coach Kiki"
              className="mx-auto mb-2 h-24 w-auto"
            />
            <p className="text-sm font-black text-ink uppercase">Coach Kiki</p>
            <p className="mt-1 text-xs leading-snug font-bold text-ink">
              Bart vraagt om hulp. Daar zou ik beginnen.
            </p>
            <button
              type="button"
              className={`mt-3 w-full bg-ink py-2.5 text-sm font-black text-white uppercase ${box} ${press}`}
            >
              Ga naar Bart
            </button>
          </div>
        )}

        <div
          className={`flex items-center gap-3 border-t-[3px] border-ink p-4 ${
            open ? "" : "justify-center"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={auth.avatar}
            alt={auth.userName}
            className={`size-10 shrink-0 object-cover ${flat}`}
          />
          {open && (
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-ink">
                {auth.userName}
              </p>
              <p className="truncate text-xs font-bold text-ink/60">
                {auth.email}
              </p>
            </div>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 shrink-0 items-center gap-4 border-b-[3px] border-ink bg-white px-6">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            title="Zijbalk in- of uitklappen"
            className={`flex size-10 shrink-0 cursor-pointer items-center justify-center bg-white ${box} ${press} hover:bg-lime`}
          >
            <PanelLeft className="size-4 text-ink" />
          </button>
          <p className="text-sm font-black text-ink uppercase">Dashboard</p>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {billingAlert !== null && (
            <div className={`flex items-center gap-4 bg-ember px-6 py-4 ${box}`}>
              <p className="flex-1 text-sm font-black text-white uppercase">
                {billingAlert}
              </p>
            </div>
          )}

          {helpRequests.length > 0 && (
            <div className={`bg-white ${box}`}>
              <div className="border-b-[3px] border-ink bg-lime px-6 py-4">
                <h2 className="text-sm font-black text-ink uppercase">
                  Medewerkers die hulp vragen
                </h2>
                <p className="mt-0.5 text-xs font-bold text-ink">
                  Ze gaven bij een taak aan dat ze er zelf niet uitkomen.
                </p>
              </div>
              <ul>
                {helpRequests.map((request) => (
                  <li key={request.id}>
                    <a
                      href="#"
                      className="flex items-center gap-6 px-6 py-4 transition hover:bg-yellow"
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center bg-white ${flat}`}
                      >
                        <HelpCircle className="size-5 text-ink" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-ink">
                          {request.employeeName}
                        </p>
                        <p className="truncate text-xs font-bold text-ink">
                          {request.taskName} · {request.askedAt}
                        </p>
                        {request.message && (
                          <p className="mt-1 text-sm font-bold text-ink">
                            &ldquo;{request.message}&rdquo;
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-black text-ink uppercase">
                        Bekijk
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {statCards.map((card) => (
              <a
                key={card.label}
                href="#"
                className={`p-6 ${card.tint} ${box} ${press}`}
              >
                <div
                  className={`flex size-12 items-center justify-center bg-white ${flat}`}
                >
                  <card.icon className="size-5 text-ink" />
                </div>
                <p className="mt-4 text-5xl font-black text-ink">
                  {card.value}
                </p>
                <p className="mt-1 text-xs font-black text-ink uppercase">
                  {card.label}
                </p>
              </a>
            ))}
          </div>

          <div className={`bg-white ${box}`}>
            <div className="border-b-[3px] border-ink px-6 py-4">
              <h2 className="text-sm font-black text-ink uppercase">
                Eerstvolgende taken
              </h2>
            </div>

            <ul>
              {upcomingTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 border-b-[3px] border-ink px-6 py-4 last:border-b-0"
                >
                  <button
                    type="button"
                    title="Taak openen"
                    className={`group flex size-9 shrink-0 items-center justify-center bg-white ${flat} hover:bg-pine`}
                  >
                    <Check className="size-4 text-transparent group-hover:text-white" />
                  </button>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-ink">
                      {task.name}
                    </span>
                    <span className="block text-xs font-bold text-ink">
                      {task.employeeName}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 px-3 py-1.5 text-xs font-black uppercase ${flat} ${
                      task.isOverdue ? "bg-ember text-white" : "bg-yellow"
                    }`}
                  >
                    {task.isOverdue ? "te laat" : task.dueDate}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="border-t-[3px] border-ink bg-ink px-6 py-2 text-xs font-black text-white uppercase">
              Opent binnenkort
            </h3>
            <ul>
              {openingSoonTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 border-b-[3px] border-ink px-6 py-3 last:border-b-0"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center bg-white ${flat}`}
                  >
                    <Lock className="size-4 text-ink" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-ink/45">
                      {task.name}
                    </span>
                    <span className="block text-xs font-bold text-ink/40">
                      {task.employeeName} · {task.opensLabel}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 px-3 py-1.5 text-xs font-black text-ink/45 uppercase ${flat}`}
                  >
                    {task.opensAt}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`bg-white ${box}`}>
            <div className="border-b-[3px] border-ink px-6 py-4">
              <h2 className="text-sm font-black text-ink uppercase">
                Trajecten
              </h2>
            </div>

            <ul>
              {trajectories.map((trajectory) => {
                const percent = Math.min(
                  100,
                  Math.round(
                    (trajectory.currentWeek / trajectory.totalWeeks) * 100,
                  ),
                );
                const late = trajectory.overdueTasks > 0;

                return (
                  <li
                    key={trajectory.id}
                    className="flex items-center gap-6 border-b-[3px] border-ink px-6 py-4 last:border-b-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trajectory.avatar}
                      alt={trajectory.employeeName}
                      className={`size-12 shrink-0 object-cover ${flat}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-ink">
                        {trajectory.employeeName}
                      </p>
                      <p className="text-xs font-bold text-ink">
                        Week {trajectory.currentWeek} van{" "}
                        {trajectory.totalWeeks}
                      </p>
                    </div>

                    <div className={`hidden h-6 w-40 bg-white sm:block ${flat}`}>
                      <div
                        className={`h-full ${late ? "bg-ember" : "bg-lime"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span
                      className={`shrink-0 px-3 py-1.5 text-xs font-black uppercase ${flat} ${
                        late ? "bg-ember text-white" : "bg-white text-ink"
                      }`}
                    >
                      {late ? `${trajectory.overdueTasks} te laat` : "op schema"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
