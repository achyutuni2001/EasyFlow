# SWE Notifier

A desktop sticky-note widget that checks Amazon for new grad / entry-level software engineer roles every 2 hours, shows them on your screen, and emails you when new ones appear.

## What it does

- **Always-on-top desktop widget** — sits on your screen like a sticky note, draggable, pinnable
- **Checks every 2 hours** — scans Amazon Jobs API for SWE I, new grad, and entry-level roles
- **Last 24 hours only** — widget and alerts show only roles posted within the last 24 hours
- **Email alerts** — sends a clean HTML email when new roles are found
- **macOS notifications** — pops a native notification on your Mac
- **Filters** — AWS, CA/TX/WA, full-time, non-manager, entry-level titles only

## Architecture & diagrams

The repository includes a visual overview of how this app is structured and how it behaves. These diagrams are stored under `public/` and are useful for documentation, architecture review, and onboarding.

- `public/System Architecture.png` — shows the overall system architecture with the SWE Notifier platform boundary, external services, and the core layers for widget, API, engine, queue, and storage.
- `public/Request Execution Flow.png` — illustrates the request lifecycle from the client through the gateway, validation, routing, queue creation, worker processing, persistence, and final response/notification.
- `public/Tenant Isolation Architecture.png` — describes tenant isolation, separate tenant containers, resource rows, the cross-tenant barrier, shared infrastructure band, and the access-control guarantees.
- `public/MCP AI agent architecture flowchart.png` — visualizes the MCP/agentic AI pipeline, including provider orchestration, tool loop, structured output, and the FlowGuide-style chat panel.
- `public/End-to-End_Arch.png` — provides a broader end-to-end architecture snapshot showing how the whole product connects from input to user-facing output.

> Note: `public/EasyFlowLogo.png` is the product branding logo, not a diagram.

## How it works

This app is built around a small desktop widget plus a background job scraper:

- The widget is implemented with `customtkinter` and starts in a compact, always-on-top window.
- Window position is persisted to `~/.swe-notifier/widget_state.json`, so it reopens where you left it.
- Every check runs in a background thread and queries the Amazon jobs JSON API for entry-level SWE roles.
- The scraper filters out senior/manager positions using title and qualifications patterns, and only keeps roles posted or updated within the configured time window.
- New job IDs are stored in `~/.swe-notifier/seen_jobs.json`, so users only receive alerts for fresh postings.

## Quick start (5 minutes)

### 1. Install

```bash
cd ~/Documents/SWE-Notifier
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure email (Gmail)

1. Enable 2-Step Verification on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords) and generate one
3. Copy the config template:

```bash
cp .env.example .env
```

4. Edit `.env` with your Gmail and the 16-character app password:

```
SENDER_EMAIL=you@gmail.com
SENDER_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=you@gmail.com
```

### 3. Run the widget

```bash
./start.sh
```

Or:

```bash
source .venv/bin/activate
python main.py
```

The widget appears in the top-left of your screen. Click any job title to open the apply link.

## Widget controls

| Control | Action |
|---------|--------|
| **📌** | Toggle always-on-top |
| **↻** | Check now (manual refresh) |
| **Drag header/footer** | Move the widget anywhere |
| **Click job title** | Open apply link in browser |

## Configuration (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `CHECK_INTERVAL_HOURS` | `2` | How often to scan |
| `MAX_JOB_AGE_HOURS` | `24` | Only show/alert jobs posted within this window |
| `STATES` | `California,Texas,Washington` | US states to filter |
| `CITIES` | `Cupertino,Austin,Seattle` | Cities to filter |
| `BUSINESS_CATEGORIES` | `amazon-web-services` | Amazon business units |
| `ENABLE_EMAIL` | `true` | Send email on new jobs |
| `ENABLE_DESKTOP_NOTIFY` | `true` | macOS notification popup |

## Run on login (optional)

To start automatically when you log in:

1. Open **System Settings → General → Login Items**
2. Click **+** and add `start.sh` (or create an Automator app that runs it)

## Data storage

Seen job IDs are stored at `~/.swe-notifier/seen_jobs.json` so you only get notified once per role.

## Headless check (no UI)

```bash
python -c "
from scraper.amazon import fetch_entry_level_jobs
jobs = fetch_entry_level_jobs(max_job_age_hours=24)
print(f'Found {len(jobs)} roles in last 24h')
for j in jobs[:5]:
    print(f'  {j.title} — {j.location} — {j.updated_time or j.posted_date}')
"
```
