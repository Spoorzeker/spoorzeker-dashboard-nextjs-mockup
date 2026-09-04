import { AppShell } from "./app-shell";
import { DashboardBlocks } from "./dashboard-blocks";

export default function Dashboard() {
  return (
    <AppShell>
      <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
        <DashboardBlocks />
      </div>
    </AppShell>
  );
}
