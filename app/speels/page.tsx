import {
  Bell,
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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function SpeelsDashboard() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-sand p-4 md:p-8">
      {/* Vervaagde vlakken achter de app, zoals in het voorbeeld. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-pine/25 blur-3xl" />
        <div className="absolute top-1/4 -right-40 size-[38rem] rounded-full bg-ember-soft/45 blur-3xl" />
        <div className="absolute -bottom-56 left-1/3 size-[32rem] rounded-full bg-pine/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-[calc(100svh-2rem)] max-w-[1280px] overflow-hidden rounded-[28px] bg-white/80 shadow-2xl shadow-pine/10 ring-1 ring-white/60 backdrop-blur-xl md:h-[calc(100svh-4rem)]">
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
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pine text-sm font-semibold text-white">
              {initials(auth.userName)}
            </span>
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
                <TrajectoriesCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <div className="relative flex items-start gap-5">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sand text-xl font-semibold text-pine">
          K
        </span>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold">
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
          className="cursor-pointer rounded-3xl bg-white p-5 text-left shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:shadow-md"
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
}: {
  employeeName: string;
  taskName: string;
  message: string;
  askedAt: string;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm shadow-ink/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Vraagt om hulp</h2>
        <span className="flex size-8 items-center justify-center rounded-full bg-ember/10 text-ember">
          <HelpCircle className="size-4" />
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ember/15 text-sm font-semibold text-ember">
          {initials(employeeName)}
        </span>
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
    <section className="rounded-3xl bg-white p-6 shadow-sm shadow-ink/5">
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
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-ink/60">
              {initials(task.employeeName)}
            </span>
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
    <section className="rounded-3xl bg-white p-6 shadow-sm shadow-ink/5">
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
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    late ? "bg-ember/15 text-ember" : "bg-pine/10 text-pine"
                  }`}
                >
                  {initials(trajectory.employeeName)}
                </span>
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
