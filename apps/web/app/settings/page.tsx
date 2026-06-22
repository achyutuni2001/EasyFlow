"use client";

import { AppShell } from "../../components/app-shell";
import { IntegrationsAdminPanel } from "../../components/integrations-admin";

export default function SettingsPage() {
  return (
    <AppShell title="Integration Settings" subtitle="Manage tenant connectors and system integrations">
      <div className="space-y-6 py-4">
        <IntegrationsAdminPanel />
      </div>
    </AppShell>
  );
}
