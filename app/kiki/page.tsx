"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { AppShell } from "../app-shell";
import { DashboardBlocks } from "../dashboard-blocks";
import data from "../data.json";

const { auth } = data;
const firstName = auth.userName.split(" ")[0];

/**
 * De huidige app, met Coach Kiki eraan toegevoegd en verder niets veranderd.
 * Dit is de versie die we echt zouden kunnen bouwen: geen nieuwe vormgeving,
 * alleen de begroeting en het bij de hand nemen waar Jenny en Jim om vroegen.
 */
export default function KikiDashboard() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <AppShell>
      {showPopup && <KikiPopup onClose={() => setShowPopup(false)} />}

      <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
        <KikiCard />
        <DashboardBlocks />
      </div>
    </AppShell>
  );
}

function KikiPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <button
          type="button"
          onClick={onClose}
          title="Sluiten"
          className="absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full text-sand/70 transition hover:bg-white/10 hover:text-sand"
        >
          <X className="size-4" />
        </button>

        <div className="relative overflow-hidden bg-pine px-6 pt-6 pb-4">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-14 -right-10 size-44 rounded-full bg-white/10"
          />
          <div className="relative flex items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kiki.svg"
              alt="Coach Kiki"
              className="-mb-4 h-28 w-auto shrink-0"
            />
            <div className="mb-2 min-w-0">
              <p className="text-xs font-medium tracking-wide text-sand/60 uppercase">
                Coach Kiki
              </p>
              <p className="mt-0.5 text-lg font-semibold text-sand">
                Goedemiddag {firstName}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm leading-relaxed text-ink/80">
            Welkom op je dashboard. Hier zie je je lopende trajecten en de taken
            die eraan komen.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Let op: <strong className="font-semibold">Bart vraagt om hulp</strong>{" "}
            en er lopen twee taken achter. Daar zou ik vandaag mee beginnen.
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-sm text-ink/50 transition hover:text-ink"
            >
              Later
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-medium text-sand transition hover:bg-pine-dark"
            >
              Ga naar Bart
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KikiCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-pine/25 bg-pine/5">
      <div className="flex items-center gap-5 px-6 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kiki.svg"
          alt="Coach Kiki"
          className="-my-3 hidden h-24 w-auto shrink-0 sm:block"
        />

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-pine uppercase">
            Coach Kiki
          </p>
          <h2 className="mt-0.5 text-base font-semibold text-ink">
            Goedemiddag {firstName}, dit zou ik vandaag als eerste doen
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            Bart vraagt om hulp bij zijn cv en het voortgangsmoment met Yusuf
            staat al sinds 3 september open.
          </p>
        </div>

        <button
          type="button"
          className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-medium text-sand transition hover:bg-pine-dark md:flex"
        >
          Ga naar Bart
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
