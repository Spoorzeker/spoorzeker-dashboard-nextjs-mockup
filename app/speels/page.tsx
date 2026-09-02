import {
  Bell,
  ChevronLeft,
  ChevronRight,
  FileStack,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Route,
  Search,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";
import data from "../data.json";

const {
  auth,
  calendar,
  stats,
  helpRequests,
  upcomingTasks,
  openingSoonTasks,
  trajectories,
} = data;

const navIcons = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Route, label: "Trajecten", active: false },
  { icon: SquareCheckBig, label: "Taken", active: false },
  { icon: Users, label: "Medewerkers", active: false },
  { icon: FileStack, label: "Rapportages", active: false },
];

function Avatar({
  src,
  name,
  className = "size-10",
}: {
  src: string;
  name: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={`${className} shrink-0 rounded-full object-cover ring-2 ring-white`}
    />
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function SpeelsDashboard() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-sand">
      {/* Vervaagde vlakken achter de app, zoals in het voorbeeld. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-pine/40 blur-3xl" />
        <div className="absolute top-1/4 -right-40 size-[38rem] rounded-full bg-ember-soft/60 blur-3xl" />
        <div className="absolute -bottom-56 left-1/3 size-[32rem] rounded-full bg-pine/25 blur-3xl" />
      </div>

      {/* Eén doorlopende matglaslaag over de gekleurde vlakken heen. Hij is
          bewust niet te wit: de kleuren moeten erdoorheen komen, anders
          vallen de witte kaarten erop weg. */}
      <div className="relative flex h-svh overflow-hidden bg-white/45 backdrop-blur-3xl">
        <aside className="flex w-[72px] shrink-0 flex-col items-center gap-2 border-r border-ink/5 py-5">
          <span className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-pine text-sm font-semibold text-white">
            SZ
          </span>
          {navIcons.map((item) => (
            <button
              key={item.label}
              type="button"
              title={item.label}
              className={`flex size-11 cursor-pointer items-center justify-center rounded-2xl transition ${
                item.active
                  ? "bg-pine/10 text-pine"
                  : "text-ink/35 hover:bg-sand hover:text-ink/70"
              }`}
            >
              <item.icon className="size-5" />
            </button>
          ))}
          <button
            type="button"
            title="Uitloggen"
            className="mt-auto flex size-11 cursor-pointer items-center justify-center rounded-2xl text-ink/35 transition hover:bg-sand hover:text-ink/70"
          >
            <LogOut className="size-5" />
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-ink/5 px-6">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-sand/70 px-4 py-2.5">
              <Search className="size-4 shrink-0 text-ink/40" />
              <input
                placeholder="Zoek een medewerker of taak"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-ink/40 transition hover:bg-sand hover:text-ink"
            >
              <Settings className="size-5" />
            </button>
            <button
              type="button"
              className="relative flex size-10 cursor-pointer items-center justify-center rounded-full text-ink/40 transition hover:bg-sand hover:text-ink"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-ember" />
            </button>
            <Avatar src={auth.avatar} name={auth.userName} />
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-5">
                <KikiCard />
                <TilesRow />
                <TasksCard />
              </div>

              <div className="flex flex-col gap-5">
                {helpRequests.map((request) => (
                  <HelpCard key={request.id} {...request} />
                ))}
                <CalendarCard />
                <TrajectoriesCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarCard() {
  const { label, year, monthIndex, today, taskDays, opensDays } = calendar;

  // Maandrooster dat op maandag begint, met de uitlopers van de buurmaanden.
  const firstDay = new Date(year, monthIndex, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, monthIndex, 1 - offset);
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  }).slice(0, 35);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(16,27,23,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex rounded-full bg-sand p-1">
          <button
            type="button"
            className="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium text-ink/50 transition hover:text-ink"
          >
            Week
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full bg-pine px-4 py-1.5 text-xs font-medium text-sand"
          >
            Maand
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-ink/40 transition hover:bg-sand hover:text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-ink/40 transition hover:bg-sand hover:text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm font-semibold text-ink">{label}</p>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {["M", "D", "W", "D", "V", "Z", "Z"].map((weekday, index) => (
          <span
            key={`${weekday}-${index}`}
            className="py-1 text-xs font-medium text-ink/30"
          >
            {weekday}
          </span>
        ))}

        {days.map((date) => {
          const inMonth = date.getMonth() === monthIndex;
          const day = date.getDate();
          const isToday = inMonth && day === today;
          const hasTask = inMonth && taskDays.includes(day);
          const opens = inMonth && opensDays.includes(day);

          return (
            <button
              key={date.toISOString()}
              type="button"
              className="flex cursor-pointer flex-col items-center gap-1 py-1.5"
            >
              <span
                className={`flex size-8 items-center justify-center rounded-full text-sm transition ${
                  isToday
                    ? "bg-pine font-semibold text-sand"
                    : inMonth
                      ? "text-ink hover:bg-sand"
                      : "text-ink/20"
                }`}
              >
                {day}
              </span>
              <span
                className={`size-1.5 rounded-full ${
                  hasTask ? "bg-ember" : opens ? "bg-ink/20" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-4 border-t border-ink/5 pt-3 text-xs text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-ember" /> deadline
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-ink/20" /> opent
        </span>
      </div>
    </section>
  );
}

function KikiCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pine to-pine-dark p-7 text-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-12 size-56 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 size-24 rounded-full bg-ember-soft/25"
      />
      <div className="relative flex items-center gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-sand/60 uppercase">
            Coach Kiki
          </p>
          <h1 className="mt-1 text-lg font-semibold">
            Goedemiddag {auth.userName.split(" ")[0]}
          </h1>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-sand/85">
            Bart vraagt om hulp en er lopen twee taken achter. Ik zou bij Bart
            beginnen.
          </p>
          <button
            type="button"
            className="mt-4 cursor-pointer rounded-full bg-sand px-5 py-2 text-sm font-medium text-pine transition hover:bg-white"
          >
            Ga naar Bart
          </button>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kiki.svg"
          alt="Coach Kiki"
          className="hidden h-40 w-auto shrink-0 sm:block"
        />
      </div>
    </section>
  );
}

function TilesRow() {
  const tiles = [
    {
      label: "Lopende trajecten",
      value: stats.activeTrajectories,
      tone: "pine",
    },
    { label: "Taken te laat", value: stats.overdueTasks, tone: "ember" },
    { label: "Taken deze week", value: stats.dueThisWeek, tone: "plain" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {tiles.map((tile) => (
        <button
          key={tile.label}
          type="button"
          className="cursor-pointer rounded-3xl bg-white p-5 text-left shadow-[0_4px_20px_rgba(16,27,23,0.06)] transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p
            className={`text-3xl font-semibold ${
              tile.tone === "ember"
                ? "text-ember"
                : tile.tone === "pine"
                  ? "text-pine"
                  : "text-ink"
            }`}
          >
            {tile.value}
          </p>
          <p className="mt-1 text-xs text-ink/50">{tile.label}</p>
        </button>
      ))}
    </div>
  );
}

function HelpCard({
  employeeName,
  taskName,
  message,
  askedAt,
  avatar,
}: {
  employeeName: string;
  taskName: string;
  message: string;
  askedAt: string;
  avatar: string;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(16,27,23,0.06)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Vraagt om hulp</h2>
        <span className="flex size-8 items-center justify-center rounded-full bg-ember/10 text-ember">
          <HelpCircle className="size-4" />
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Avatar src={avatar} name={employeeName} className="size-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {employeeName}
          </p>
          <p className="truncate text-xs text-ink/50">
            {taskName} · {askedAt}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-2xl bg-sand/70 p-4 text-sm leading-relaxed text-ink/80 italic">
        &ldquo;{message}&rdquo;
      </p>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-full bg-pine px-4 py-2.5 text-sm font-medium text-sand transition hover:bg-pine-dark"
        >
          Bekijken
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-full bg-sand px-4 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-sand/70"
        >
          Opgepakt
        </button>
      </div>
    </section>
  );
}

function TasksCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(16,27,23,0.06)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">
          Eerstvolgende taken
        </h2>
        <button
          type="button"
          className="cursor-pointer text-xs font-medium text-pine hover:underline"
        >
          Alles bekijken
        </button>
      </div>

      <ul className="mt-4 space-y-2.5">
        {upcomingTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-4 rounded-2xl bg-sand/50 px-4 py-3 transition hover:bg-sand"
          >
            <Avatar
              src={task.avatar}
              name={task.employeeName}
              className="size-9"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                {task.name}
              </span>
              <span className="block truncate text-xs text-ink/50">
                {task.employeeName}
              </span>
            </span>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                task.isOverdue
                  ? "bg-ember/10 text-ember"
                  : "bg-white text-ink/50"
              }`}
            >
              {task.isOverdue ? "te laat" : task.dueDate}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 mb-2 text-xs font-semibold tracking-wide text-ink/35 uppercase">
        Opent binnenkort
      </h3>
      <ul className="space-y-2">
        {openingSoonTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-4 rounded-2xl px-4 py-2"
          >
            <span className="size-2 shrink-0 rounded-full bg-ink/15" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-ink/45">
                {task.name}
              </span>
              <span className="block truncate text-xs text-ink/35">
                {task.employeeName} · {task.opensLabel}
              </span>
            </span>
            <span className="shrink-0 text-xs text-ink/35">{task.opensAt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrajectoriesCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(16,27,23,0.06)]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Trajecten</h2>
        <button
          type="button"
          className="cursor-pointer text-xs font-medium text-pine hover:underline"
        >
          Alles bekijken
        </button>
      </div>

      <ul className="mt-4 space-y-4">
        {trajectories.map((trajectory) => {
          const percent = Math.min(
            100,
            Math.round((trajectory.currentWeek / trajectory.totalWeeks) * 100),
          );
          const late = trajectory.overdueTasks > 0;

          return (
            <li key={trajectory.id}>
              <div className="flex items-center gap-3">
                <Avatar
                  src={trajectory.avatar}
                  name={trajectory.employeeName}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {trajectory.employeeName}
                  </p>
                  <p className="text-xs text-ink/50">
                    Week {trajectory.currentWeek} van {trajectory.totalWeeks}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    late ? "bg-ember/10 text-ember" : "bg-sand text-ink/50"
                  }`}
                >
                  {late ? `${trajectory.overdueTasks} te laat` : "op schema"}
                </span>
              </div>
              <div className="mt-2.5 ml-13 h-1.5 overflow-hidden rounded-full bg-sand">
                <div
                  className={`h-full rounded-full ${late ? "bg-ember" : "bg-pine"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
