import { Bell, Play } from "lucide-react";
import data from "../data.json";

const { auth, stats, helpRequests, upcomingTasks, trajectories } = data;

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Trajecten", active: false },
  { label: "Taken", active: false },
  { label: "Medewerkers", active: false },
  { label: "Rapportages", active: false },
];

const suggestions = [
  {
    title: "Bart vraagt om hulp bij zijn cv",
    detail: "Hij komt er niet uit met het gat in zijn cv. Bel hem even.",
    duration: "10 min",
    done: false,
  },
  {
    title: "Voortgangsgesprek met Yusuf staat open",
    detail: "De deadline was 3 september. Plan het gesprek deze week in.",
    duration: "30 min",
    done: false,
  },
  {
    title: "Intake van Sanne afronden",
    detail: "Jullie hebben allebei de vragen ingevuld, nog even bevriezen.",
    duration: "15 min",
    done: false,
  },
  {
    title: "FML van Bart is up-to-date",
    detail: "Geen actie nodig, de gegevens zijn korter dan drie maanden oud.",
    duration: "",
    done: true,
  },
];

const taskCards = [
  {
    id: 1,
    category: "Hulpvraag",
    due: "vandaag",
    tone: "ember",
    title: "Bart de Boer komt er niet uit",
    body: "Bij de taak CV actualiseren gaf hij aan hulp nodig te hebben. Zijn bericht: ik snap het gat in mijn cv niet.",
    status: "Nieuw",
    action: "Bekijken",
  },
  {
    id: 2,
    category: "Voortgang",
    due: "3 september",
    tone: "pine",
    title: "Voortgangsmoment met Yusuf",
    body: "Een kort gesprek over hoe het gaat, niet alleen over de vakjes. Kiki stelt de vragen, jij keurt het verslag goed.",
    status: "Te laat",
    action: "Starten",
  },
  {
    id: 3,
    category: "Intake",
    due: "8 september",
    tone: "sand",
    title: "Intake werkgever voor Sanne",
    body: "Beide helften zijn ingevuld. Neem de antwoorden samen door en maak de rapportage definitief.",
    status: "Bezig",
    action: "Afronden",
  },
  {
    id: 4,
    category: "Zoekprofiel",
    due: "12 september",
    tone: "pine",
    title: "Zoekprofiel opstellen voor Bart",
    body: "Op basis van de FML en het persoonsprofiel bepaal je welk werk passend is.",
    status: "Nog niet begonnen",
    action: "Openen",
  },
];

const toneStyles: Record<string, { strip: string; label: string }> = {
  ember: { strip: "bg-ember/15", label: "text-ember" },
  pine: { strip: "bg-pine/15", label: "text-pine" },
  sand: { strip: "bg-sand", label: "text-ink/60" },
};

export default function StrakDashboard() {
  return (
    <div className="flex min-h-svh flex-col bg-ink px-3 pb-3">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* De navigatie staat op de donkere achtergrond zelf, niet in de
            witte kaart. Alleen de inhoud eronder is een kaart. */}
        <header className="flex items-center gap-6 px-3 py-3">
          <p className="text-sm font-semibold text-sand">SpoorZeker</p>

          <nav className="mx-auto flex items-center gap-1 rounded-full bg-white/5 p-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
                  item.active
                    ? "bg-white font-medium text-ink"
                    : "text-sand/60 hover:text-sand"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-full text-sand/60 transition hover:text-sand"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-ember" />
          </button>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={auth.avatar}
              alt={auth.userName}
              className="size-9 rounded-full object-cover"
            />
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-medium text-sand">{auth.userName}</p>
              <p className="text-xs text-sand/50">{auth.email}</p>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-6 overflow-y-auto rounded-2xl bg-white p-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-ink">
              Hallo {auth.userName.split(" ")[0]}
            </h1>

            <StatsRow />
            <KikiPanel />
            <TrajectoriesTable />
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">Jouw taken</h2>
              <span className="text-xs text-ink/40">
                {upcomingTasks.length + helpRequests.length} open
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {taskCards.map((card) => (
                <TaskCard key={card.id} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  const done = trajectories.reduce((total, t) => total + t.openTasks, 0);
  const percent = Math.round((stats.dueThisWeek / (done + 1)) * 100);

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-ink/10 p-5">
        <p className="text-xs font-medium text-ink/40">Deze week</p>
        <div className="mt-3 flex gap-1.5">
          {["ma", "di", "wo", "do", "vr"].map((day, index) => (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span
                className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold ${
                  index < 2
                    ? "bg-pine text-sand"
                    : index === 2
                      ? "bg-ember/15 text-ember"
                      : "bg-sand text-ink/30"
                }`}
              >
                {index < 3 ? index + 2 : index + 2}
              </span>
              <span className="text-[10px] text-ink/40">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 p-5">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium text-ink/40">Taken afgerond</p>
          <Ring percent={percent} />
        </div>
        <p className="mt-3 text-2xl font-semibold text-ink">
          {done}
          <span className="text-base font-normal text-ink/30">/{done + 9}</span>
        </p>
        <p className="mt-0.5 text-xs text-ink/50">
          {stats.overdueTasks} lopen achter
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 p-5">
        <p className="text-xs font-medium text-ink/40">Lopende trajecten</p>
        <p className="mt-3 text-2xl font-semibold text-ink">
          {stats.activeTrajectories}
        </p>
        <p className="mt-0.5 text-xs text-ink/50">
          Langst lopend: week 30 van 52
        </p>
      </div>
    </div>
  );
}

function Ring({ percent }: { percent: number }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(percent, 100) / 100) * circumference;

  return (
    <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        strokeWidth="4"
        className="stroke-sand"
      />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        className="stroke-pine"
      />
    </svg>
  );
}

function KikiPanel() {
  return (
    <section className="mt-5 rounded-2xl border border-pine/25 bg-pine/5 p-5">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kiki.svg"
          alt="Coach Kiki"
          className="-my-2 hidden h-24 w-auto shrink-0 sm:block"
        />

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-ink">Coach Kiki</h2>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink/60">
            Goedemiddag {auth.userName.split(" ")[0]}. Er staan vier dingen
            open, dit zou ik vandaag als eerste doen.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {suggestions.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-xl bg-white p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-ink">
                  {item.title}
                </p>
                {item.duration && (
                  <span className="shrink-0 text-xs text-ink/40">
                    · {item.duration}
                  </span>
                )}
                {item.done && (
                  <span className="shrink-0 rounded-full bg-pine/10 px-2 py-0.5 text-[10px] font-medium text-pine">
                    Klaar
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-ink/50">
                {item.detail}
              </p>
            </div>

            {item.done ? (
              <span className="shrink-0 text-sm font-semibold text-pine">
                86/100
              </span>
            ) : (
              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-lg border border-ink/10 px-4 py-1.5 text-xs font-medium text-ink transition hover:border-pine hover:text-pine"
              >
                Start
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TrajectoriesTable() {
  return (
    <section className="mt-6">
      <h2 className="text-base font-semibold text-ink">Trajecten</h2>

      <table className="mt-3 w-full">
        <thead>
          <tr className="border-b border-ink/10 text-left">
            <th className="pb-2 text-xs font-medium text-ink/40">Medewerker</th>
            <th className="pb-2 text-xs font-medium text-ink/40">Fase</th>
            <th className="pb-2 text-right text-xs font-medium text-ink/40">
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
              <tr key={trajectory.id} className="border-b border-ink/5">
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
                <td className="py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-pine/10 px-2 py-0.5 text-[11px] font-medium text-pine">
                      Zoekprofiel
                    </span>
                    {late && (
                      <span className="rounded-md bg-ember/10 px-2 py-0.5 text-[11px] font-medium text-ember">
                        {trajectory.overdueTasks} te laat
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-xs text-ink/50">
                      week {trajectory.currentWeek}/{trajectory.totalWeeks}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        late
                          ? "bg-ember/10 text-ember"
                          : "bg-pine/10 text-pine"
                      }`}
                    >
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

function TaskCard({
  category,
  due,
  tone,
  title,
  body,
  status,
  action,
}: {
  category: string;
  due: string;
  tone: string;
  title: string;
  body: string;
  status: string;
  action: string;
}) {
  const styles = toneStyles[tone] ?? toneStyles.sand;

  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10">
      <div
        className={`flex items-center justify-between px-4 py-2 ${styles.strip}`}
      >
        <span className={`text-xs font-semibold ${styles.label}`}>
          {category}
        </span>
        <span className="text-xs text-ink/50">Deadline: {due}</span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
          {body}{" "}
          <button
            type="button"
            className="cursor-pointer font-medium text-pine hover:underline"
          >
            Meer lezen
          </button>
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-md bg-sand px-2.5 py-1 text-[11px] font-medium text-ink/60">
            {status}
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-ink px-3.5 py-1.5 text-xs font-medium text-sand transition hover:bg-pine"
          >
            <Play className="size-3" />
            {action}
          </button>
        </div>
      </div>
    </article>
  );
}
