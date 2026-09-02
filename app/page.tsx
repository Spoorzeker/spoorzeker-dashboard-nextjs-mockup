import {
  AlertTriangle,
  CalendarClock,
  Check,
  HelpCircle,
  Lock,
  Users,
} from "lucide-react";
import data from "./data.json";

const {
  stats,
  billingAlert,
  helpRequests,
  upcomingTasks,
  openingSoonTasks,
  trajectories,
} = data;

const statusLabels: Record<string, string> = {
  active: "Actief",
  completed: "Afgerond",
  stopped: "Gestopt",
};

const statCards = [
  {
    icon: Users,
    label: "Actieve trajecten",
    value: stats.activeTrajectories,
    urgent: false,
  },
  {
    icon: AlertTriangle,
    label: "Taken te laat",
    value: stats.overdueTasks,
    urgent: stats.overdueTasks > 0,
  },
  {
    icon: CalendarClock,
    label: "Taken deze week",
    value: stats.dueThisWeek,
    urgent: false,
  },
];

export default function Dashboard() {
  return (
    <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
      {billingAlert !== null && (
        <div className="flex items-center gap-4 rounded-2xl border border-ember/30 bg-ember/5 px-6 py-4">
          <p className="flex-1 text-sm font-medium text-ink">{billingAlert}</p>
          <a
            href="#"
            className="shrink-0 text-sm font-medium text-ember hover:underline"
          >
            Naar facturatie
          </a>
        </div>
      )}

      {helpRequests.length > 0 && (
        <div className="rounded-2xl border border-pine/30 bg-pine/5">
          <div className="border-b border-pine/20 px-6 py-4">
            <h2 className="text-sm font-semibold text-ink">
              Medewerkers die hulp vragen
            </h2>
            <p className="mt-0.5 text-xs text-ink/50">
              Ze gaven bij een taak aan dat ze er zelf niet uitkomen.
            </p>
          </div>
          <ul>
            {helpRequests.map((request) => (
              <li key={request.id}>
                <a
                  href="#"
                  className="flex items-center gap-6 border-b border-pine/10 px-6 py-4 transition last:border-b-0 hover:bg-white/60"
                >
                  <HelpCircle className="size-4 shrink-0 text-pine" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {request.employeeName}
                    </p>
                    <p className="truncate text-xs text-ink/50">
                      {request.taskName} · {request.askedAt}
                    </p>
                    {request.message && (
                      <p className="mt-1 text-sm text-ink/80 italic">
                        &ldquo;{request.message}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs font-medium text-pine">
                    Bekijk traject
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <a
            key={card.label}
            href="#"
            className="rounded-2xl border border-sidebar-border/70 bg-white p-6 transition-colors hover:border-pine/40 hover:bg-pine/5"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-full ${
                card.urgent ? "bg-ember/10 text-ember" : "bg-pine/10 text-pine"
              }`}
            >
              <card.icon className="size-4" />
            </div>
            <p
              className={`mt-4 text-3xl font-semibold ${
                card.urgent ? "text-ember" : "text-ink"
              }`}
            >
              {card.value}
            </p>
            <p className="mt-1 text-xs text-ink/50">{card.label}</p>
          </a>
        ))}
      </div>

      <div className="rounded-2xl border border-sidebar-border/70 bg-white">
        <div className="border-b border-sidebar-border/70 px-6 py-4">
          <h2 className="text-sm font-semibold text-ink">Eerstvolgende taken</h2>
        </div>

        {upcomingTasks.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-ink/50">
            Geen open werkgever-taken. Alles op schema.
          </p>
        ) : (
          <ul>
            {upcomingTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-4 border-b border-sidebar-border/40 px-6 py-3 last:border-b-0"
              >
                <button
                  type="button"
                  title="Taak openen"
                  className="group flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition hover:border-pine hover:bg-pine"
                >
                  <Check className="size-3.5 text-transparent transition group-hover:text-white" />
                </button>
                <button
                  type="button"
                  className="min-w-0 flex-1 cursor-pointer text-left"
                >
                  <p className="truncate text-sm font-medium text-ink hover:text-pine">
                    {task.name}
                  </p>
                  <p className="text-xs text-ink/50">{task.employeeName}</p>
                </button>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    task.isOverdue
                      ? "bg-ember/10 text-ember"
                      : "bg-sand text-ink/60"
                  }`}
                >
                  {task.isOverdue
                    ? `te laat · ${task.dueDate}`
                    : `deadline ${task.dueDate}`}
                </span>
              </li>
            ))}
          </ul>
        )}

        {openingSoonTasks.length > 0 && (
          <>
            <h3 className="border-t border-sidebar-border/40 px-6 pt-4 pb-1 text-xs font-semibold tracking-wide text-ink/40 uppercase">
              Opent binnenkort
            </h3>
            <ul>
              {openingSoonTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 px-6 py-2.5"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-sand/60">
                    <Lock className="size-3 text-ink/30" />
                  </span>
                  <a href="#" className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink/50">{task.name}</p>
                    <p className="text-xs text-ink/40">
                      {task.employeeName} · {task.opensLabel}
                    </p>
                  </a>
                  <span className="shrink-0 rounded-full bg-sand/80 px-3 py-1 text-xs font-medium text-ink/40">
                    opent {task.opensAt}
                  </span>
                </li>
              ))}
            </ul>
            <div className="h-4" />
          </>
        )}
      </div>

      <div className="rounded-2xl border border-sidebar-border/70 bg-white">
        <div className="border-b border-sidebar-border/70 px-6 py-4">
          <h2 className="text-sm font-semibold text-ink">Trajecten</h2>
        </div>

        {trajectories.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-ink/50">
            Nog geen trajecten. Voeg een werknemer toe om te starten.
          </p>
        ) : (
          <ul>
            {trajectories.map((trajectory) => (
              <li
                key={trajectory.id}
                className="flex items-center gap-6 border-b border-sidebar-border/40 px-6 py-4 last:border-b-0"
              >
                <span
                  className={`size-2.5 shrink-0 rounded-full ${
                    trajectory.overdueTasks > 0 ? "bg-ember" : "bg-pine"
                  }`}
                  aria-hidden
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {trajectory.employeeName}
                  </p>
                  <p className="text-xs text-ink/50">
                    Week {trajectory.currentWeek} van {trajectory.totalWeeks} ·{" "}
                    {statusLabels[trajectory.status] ?? trajectory.status}
                  </p>
                </div>

                <div className="hidden w-40 sm:block">
                  <div className="h-1.5 overflow-hidden rounded-full bg-sand">
                    <div
                      className={`h-full rounded-full ${
                        trajectory.currentWeek > trajectory.totalWeeks
                          ? "bg-ember"
                          : "bg-pine"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((trajectory.currentWeek / trajectory.totalWeeks) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex shrink-0 gap-4 text-right">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {trajectory.openTasks}
                    </p>
                    <p className="text-xs text-ink/50">open</p>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        trajectory.overdueTasks > 0
                          ? "text-ember"
                          : "text-ink/30"
                      }`}
                    >
                      {trajectory.overdueTasks}
                    </p>
                    <p className="text-xs text-ink/50">te laat</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
