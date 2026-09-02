import {
  Bell,
  ChevronLeft,
  ChevronRight,
  FileStack,
  LayoutGrid,
  Route,
  Search,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";
import data from "../data.json";

const { auth, stats, trajectories, upcomingTasks, openingSoonTasks } = data;

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, badge: 0, active: true },
  { label: "Trajecten", icon: Route, badge: 0, active: false },
  { label: "Taken", icon: SquareCheckBig, badge: 5, active: false },
  { label: "Medewerkers", icon: Users, badge: 0, active: false },
  { label: "Rapportages", icon: FileStack, badge: 0, active: false },
  { label: "Instellingen", icon: Settings, badge: 0, active: false },
];

const tiles = [
  {
    label: "Lopende trajecten",
    value: stats.activeTrajectories,
    tint: "bg-pine/10",
    detail: "3 medewerkers",
  },
  {
    label: "Taken te laat",
    value: stats.overdueTasks,
    tint: "bg-ember/10",
    detail: "oudste: 3 sep",
  },
  {
    label: "Taken deze week",
    value: stats.dueThisWeek,
    tint: "bg-sand",
    detail: "2 van jou",
  },
];

const todos = [
  {
    title: "Bart bellen over zijn cv",
    meta: "Hulpvraag · vandaag",
    done: false,
    subs: ["Gat in cv bespreken", "Afspraak inplannen"],
  },
  {
    title: "Voortgangsmoment Yusuf",
    meta: "Gesprek · 3 september",
    done: false,
    subs: [],
  },
  {
    title: "Intake Sanne bevriezen",
    meta: "Document · 8 september",
    done: true,
    subs: [],
  },
];

const weekDays = [
  { day: "M", date: 31, active: false },
  { day: "D", date: 1, active: false },
  { day: "W", date: 2, active: true },
  { day: "D", date: 3, active: false },
  { day: "V", date: 4, active: false },
  { day: "Z", date: 5, active: false },
  { day: "Z", date: 6, active: false },
];

const months = [
  { label: "mei", open: 4, done: 9 },
  { label: "jun", open: 6, done: 11 },
  { label: "jul", open: 3, done: 14 },
  { label: "aug", open: 8, done: 12 },
  { label: "sep", open: 5, done: 4 },
];

export default function CoachDashboard() {
  return (
    <div className="flex min-h-svh bg-sand/40">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold text-ink">
              Hallo {auth.userName.split(" ")[0]} 👋
            </h1>
            <p className="mt-0.5 text-sm text-ink/50">
              Er staan vijf taken open deze week.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5">
            <Search className="size-4 shrink-0 text-ink/35" />
            <input
              placeholder="Zoek een medewerker of taak"
              className="w-56 bg-transparent text-sm text-ink placeholder:text-ink/35 focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="relative flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-ink/50 transition hover:text-ink"
          >
            <Bell className="size-4" />
            <span className="absolute top-3 right-3.5 size-1.5 rounded-full bg-ember" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {tiles.map((tile) => (
            <button
              key={tile.label}
              type="button"
              className={`cursor-pointer rounded-2xl p-5 text-left transition hover:-translate-y-0.5 ${tile.tint}`}
            >
              <p className="text-3xl font-semibold text-ink">{tile.value}</p>
              <p className="mt-2 text-sm font-medium text-ink">{tile.label}</p>
              <p className="mt-0.5 text-xs text-ink/50">{tile.detail}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <TasksChart />
          <OnSchedule />
        </div>

        <TrajectoriesTable />
      </main>

      <RightColumn />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/5 bg-white px-4 py-6 lg:flex">
      <div className="flex items-center gap-2.5 px-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-pine text-sm font-semibold text-white">
          SZ
        </span>
        <p className="text-lg font-semibold tracking-tight text-ink">
          SpoorZeker
        </p>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  item.active
                    ? "bg-ink font-medium text-sand"
                    : "text-ink/60 hover:bg-sand/60 hover:text-ink"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge > 0 && (
                  <span className="rounded-full bg-ember px-2 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Kiki staat vast onderin de balk, zoals de promokaart in het
          voorbeeld: ze is er altijd, ook als je verder scrolt. */}
      <div className="mt-6 rounded-2xl bg-sand px-4 pt-4 pb-5 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kiki.svg"
          alt="Coach Kiki"
          className="mx-auto mb-2 h-24 w-auto"
        />
        <p className="text-sm font-semibold text-ink">Coach Kiki</p>
        <p className="mt-1 text-xs leading-relaxed text-ink/60">
          Bart vraagt om hulp en twee taken lopen achter. Ik zou bij Bart
          beginnen.
        </p>
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-xl bg-pine py-2.5 text-sm font-medium text-sand transition hover:bg-pine-dark"
        >
          Ga naar Bart
        </button>
      </div>
    </aside>
  );
}

function TasksChart() {
  const max = Math.max(...months.map((m) => m.open + m.done));

  return (
    <section className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Taken per maand</h2>
        <span className="rounded-lg bg-sand px-3 py-1.5 text-xs font-medium text-ink/60">
          Dit jaar
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-pine" /> afgerond
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-ember/40" /> open
        </span>
      </div>

      <div className="mt-5 flex h-44 items-end justify-between gap-3">
        {months.map((month) => (
          <div key={month.label} className="flex flex-1 flex-col items-center">
            <div className="flex h-40 w-full max-w-10 flex-col justify-end gap-1">
              <div
                className="w-full rounded-t-md bg-ember/40"
                style={{ height: `${(month.open / max) * 100}%` }}
              />
              <div
                className="w-full rounded-b-md bg-pine"
                style={{ height: `${(month.done / max) * 100}%` }}
              />
            </div>
            <span className="mt-2 text-xs text-ink/40">{month.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function OnSchedule() {
  const percent = 72;
  const radius = 52;
  const half = Math.PI * radius;
  const filled = (percent / 100) * half;

  return (
    <section className="flex flex-col rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Op schema</h2>
        <span className="rounded-lg bg-sand px-3 py-1.5 text-xs font-medium text-ink/60">
          Deze maand
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <svg viewBox="0 0 140 80" className="w-48">
          <path
            d="M 18 74 A 52 52 0 0 1 122 74"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className="stroke-sand"
          />
          <path
            d="M 18 74 A 52 52 0 0 1 122 74"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${half}`}
            className="stroke-pine"
          />
        </svg>

        <p className="-mt-2 text-3xl font-semibold text-ink">{percent}%</p>
        <p className="mt-1 text-center text-xs leading-relaxed text-ink/50">
          van de taken is op tijd afgerond.
          <br />
          Vorige maand was dat 64%.
        </p>
      </div>
    </section>
  );
}

function TrajectoriesTable() {
  return (
    <section className="mt-6 rounded-2xl bg-white p-5">
      <h2 className="text-base font-semibold text-ink">Trajecten</h2>

      <table className="mt-4 w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-3 text-xs font-medium text-ink/40">Medewerker</th>
            <th className="pb-3 text-xs font-medium text-ink/40">Week</th>
            <th className="pb-3 text-xs font-medium text-ink/40">Open</th>
            <th className="pb-3 text-right text-xs font-medium text-ink/40">
              Voortgang
            </th>
          </tr>
        </thead>
        <tbody>
          {trajectories.map((trajectory) => {
            const percent = Math.round(
              (trajectory.currentWeek / trajectory.totalWeeks) * 100,
            );
            const late = trajectory.overdueTasks > 0;

            return (
              <tr key={trajectory.id} className="border-t border-ink/5">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trajectory.avatar}
                      alt={trajectory.employeeName}
                      className="size-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-ink">
                      {trajectory.employeeName}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-sm text-ink/60">
                  {trajectory.currentWeek} van {trajectory.totalWeeks}
                </td>
                <td className="py-3">
                  <span className="text-sm text-ink/60">
                    {trajectory.openTasks}
                  </span>
                  {late && (
                    <span className="ml-2 rounded-md bg-ember/10 px-2 py-0.5 text-[11px] font-medium text-ember">
                      {trajectory.overdueTasks} te laat
                    </span>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sand">
                      <div
                        className={`h-full rounded-full ${late ? "bg-ember" : "bg-pine"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-sm font-semibold text-ink">
                      {percent}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

function RightColumn() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-5 border-l border-ink/5 bg-white px-5 py-6 xl:flex">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Profiel</h2>
        <button
          type="button"
          className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-ink/10 text-ink/50 transition hover:text-ink"
        >
          <Settings className="size-4" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-full p-1 ring-2 ring-pine">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={auth.avatar}
            alt={auth.userName}
            className="size-20 rounded-full object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">{auth.userName}</p>
        <p className="text-xs text-ink/50">
          Begeleider · {auth.organizationName}
        </p>
      </div>

      <div className="rounded-2xl bg-sand/60 p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex size-6 cursor-pointer items-center justify-center rounded-full text-ink/40 hover:text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="text-xs font-semibold text-ink">September 2026</p>
          <button
            type="button"
            className="flex size-6 cursor-pointer items-center justify-center rounded-full text-ink/40 hover:text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex justify-between">
          {weekDays.map((item, index) => (
            <div
              key={`${item.day}-${index}`}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[10px] text-ink/35">{item.day}</span>
              <span
                className={`flex size-7 items-center justify-center rounded-full text-xs ${
                  item.active
                    ? "bg-pine font-semibold text-sand"
                    : "text-ink/60"
                }`}
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-ink">Te doen</h3>
        <ul className="mt-3 space-y-3">
          {todos.map((todo) => (
            <li key={todo.title}>
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border ${
                    todo.done
                      ? "border-pine bg-pine text-sand"
                      : "border-ink/20"
                  }`}
                >
                  {todo.done && (
                    <svg viewBox="0 0 12 12" className="size-3 fill-none">
                      <path
                        d="M2.5 6.5l2.5 2.5 4.5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-sm ${
                      todo.done
                        ? "text-ink/35 line-through"
                        : "font-medium text-ink"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p className="text-xs text-ink/45">{todo.meta}</p>
                </div>
              </div>

              {todo.subs.length > 0 && (
                <ul className="mt-2 ml-8 space-y-2 border-l border-ink/5 pl-4">
                  {todo.subs.map((sub) => (
                    <li key={sub} className="flex items-center gap-3">
                      <span className="size-4 shrink-0 rounded border border-ink/20" />
                      <span className="text-xs text-ink/60">{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-auto text-xs text-ink/35">
        {openingSoonTasks.length} taken openen binnenkort ·{" "}
        {upcomingTasks.length} deze maand
      </p>
    </aside>
  );
}
