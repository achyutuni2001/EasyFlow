# EasyFlow

**EasyFlow** is a modern, open-source workflow orchestration platform for multi-tenant supply chain operations. It enables each company to run its own configurable workflow graph, isolate its data per tenant, and extend the runtime with event-driven execution, notifications, and integrations.

---

## Overview

EasyFlow is built to be the standard open source product for operational workflow automation in supply chain and logistics. It is not an ERP system — it is the workflow layer that sits above ERPs, WMS, procurement engines, and supplier networks.

Key capabilities today:

- Tenant-isolated workflow runtime
- Workflow graph modeling and execution simulation
- RabbitMQ-based event handling and worker processing
- Notification publishing and connector-ready integration scaffolding
- Next.js admin dashboard for tenant and integration settings

---

## Vision

EasyFlow will become the open source orchestration fabric for supply chain teams who need:

- A shared workspace for independent tenants and companies
- A flexible workflow graph that models approvals, stocking, shipments, and exceptions
- A worker-driven runtime with retries, dead-letter handling, and observability
- A connector ecosystem for ERP, WMS, CRM, and messaging systems
- AI-powered operational insights and proactive alerts

This repo is the foundation for that vision.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, Tailwind CSS |
| API | FastAPI, Pydantic, SQLAlchemy, Alembic |
| Worker | Python async worker, `aio-pika`, Prometheus metrics |
| Database | PostgreSQL / SQLite tenant DBs |
| Messaging | RabbitMQ |
| Workflow Engine | `packages/engine` Python package |
| Connectors | `packages/connectors` pluggable adapter SDK |

---

## Project Structure

```text
/apps
  api/          FastAPI backend, migrations, worker, and service API
  web/          Next.js admin dashboard and tenant UX
/packages
  engine/       reusable Python workflow engine core
  connectors/   connector factory, HTTP adapter, and plugin support
/examples
  procurement_workflow.json  sample workflow definition
/tests
  test_access_control.py
  test_workflow_engine.py
```

---

## Architecture

The platform is organized into three primary layers:

1. **Web UI** (`apps/web`) — tenant dashboard, integration settings, workflow onboarding.
2. **API** (`apps/api`) — tenant registry, workflow lifecycle, notification publishing, connector CRUD.
3. **Runtime/Worker** — RabbitMQ consumer, retry + DLQ semantics, Prometheus metrics, workflow execution engine.

::: mermaid
flowchart LR
  subgraph frontend[Frontend]
    A[Next.js Dashboard] -->|calls| B(API)
  end
  subgraph api[API Layer]
    B[FastAPI] --> C[Registry DB]
    B --> D[Connector Configs]
    B -->|publish events| E[RabbitMQ]
  end
  subgraph worker[Runtime]
    F[Worker Consumer] -->|reads events| E
    F --> G[Workflow Engine]
    F -->|metrics| H[Prometheus]
  end
  subgraph integrations[Integrations]
    G --> I[Connector SDK]
    I --> J[ERP/WMS APIs]
  end
  B --> K[Health + Metrics]
  H --> K
  E --> F
  B --> L[Tenants]
  K --> L
end
:::

Read the full architecture details in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Quick Start

```bash
cd /Users/vamsikrishna/Documents/EasyFlow
python -m venv .venv
source .venv/bin/activate
pip install -r apps/api/requirements.txt
cd apps/web
npm install
```

Run RabbitMQ locally:

```bash
docker compose up -d rabbitmq
```

Start the API:

```bash
cd /Users/vamsikrishna/Documents/EasyFlow
PYTHONPATH=. uvicorn apps.api.app.main:app --reload
```

Start the worker process:

```bash
source .venv/bin/activate
PYTHONPATH=. python -m apps.api.app.worker
```

Start the web frontend:

```bash
cd apps/web
npm run dev
```

Visit the app at `http://localhost:3000`.

---

## Development Commands

| Command | Description |
|---|---|
| `python -m unittest discover -s tests` | Run Python workflow engine tests |
| `cd apps/web && npm run dev` | Start the frontend developer server |
| `PYTHONPATH=. uvicorn apps.api.app.main:app --reload` | Start the FastAPI backend |
| `PYTHONPATH=. python -m apps.api.app.worker` | Start the RabbitMQ worker |

---

## CI / CD

This repository already includes GitHub Actions workflows:

- `.github/workflows/ci.yml` — runs Python tests and builds the web app on every push/PR
- `.github/workflows/cd-docker.yml` — builds and pushes Docker images for `main`

The package is configured to push Docker images to GitHub Container Registry.

---

## What’s Next (Roadmap)

These are the next PRs that will make EasyFlow product-ready:

1. **Auth & Tenant Onboarding** — add email/password login, tenant signup flow, and RBAC.
2. **Connector Marketplace** — standardized connector registry, UI market, and secure credential vault.
3. **Workflow Persistence & Audit Logs** — store executions, logs, and state history in Postgres.
4. **Alerts & Notifications** — add Slack/email/SMS channels and workflow-driven alerts.
5. **AI Orchestration** — add predictive bottleneck detection, risk scoring, and workflow recommendations.
6. **Open Source Contribution Kit** — docs, templates, good-first-issue labels, and community governance.

---

## Contributor Guide

We want EasyFlow to grow as a community product:

- Open issues for bugs, feature ideas, and docs improvements.
- Submit PRs against `main` with clear descriptions and tests.
- Keep each PR focused on one feature or bug fix.
- Add examples and docs for every new connector and workflow capability.

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Vision for EasyFlow

EasyFlow will become the workflow fabric for supply chain operators, connecting ERP systems, warehouses, suppliers, and analytics in a shared tenant-aware platform.

It will let teams:

- model workflows once and run them across tenants
- connect to any ERP or WMS through a pluggable connector layer
- monitor execution health with worker metrics and alerting
- extend workflows with AI and proactive automation

The goal is to make EasyFlow the open source control plane for supply chain orchestration.

---

## License

This project is released under the MIT License. See [LICENSE](./LICENSE).
