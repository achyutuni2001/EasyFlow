# EasyFlow

**EasyFlow** is a modern, open-source workflow orchestration platform for multi-tenant supply chain operations. It enables each company to run its own configurable workflow graph, isolate its data per tenant, and extend the runtime with event-driven execution, notifications, and integrations.

---

## Product Story

Most companies already have ERP, inventory, procurement, or warehouse systems. The problem is not that they lack software. The problem is that their teams still struggle to answer simple operational questions quickly.

Questions like:

- What is delayed right now?
- Which approval is blocking progress?
- Where is inventory at risk?
- Which team owns the next step?
- What should we do before this becomes a bigger issue?

In many businesses, the answers exist somewhere inside large systems, dashboards, emails, spreadsheets, or status calls. But they are not presented in a way that makes day-to-day decision-making easy.

EasyFlow is built to solve that gap.

It takes the complexity of large operational systems and turns it into a clearer, more actionable experience for the people actually running the business. Instead of forcing operations managers, team leads, or business owners to navigate technical enterprise software, EasyFlow gives them a simpler process layer on top:

- a clear picture of what is happening
- a shared view of who owns what
- a faster way to spot risk and make decisions
- a workflow map that matches their business instead of a generic software flow

The value of EasyFlow is not just automation.

The value is clarity.

It helps businesses move from:

- scattered operational data to one understandable view
- reactive fire-fighting to earlier action
- manual status chasing to visible process ownership
- rigid systems to configurable workflows

That is the product story: EasyFlow makes complex operations easier to understand, easier to manage, and easier to improve.

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

## Plain-English Product Summary

EasyFlow is a decision-support and workflow-coordination product for operations teams.

Large ERP and supply chain systems usually contain the right data, but they are often difficult to use day to day. Teams have to move across many screens, wait on updates from other departments, and translate complex operational data into simple business decisions.

EasyFlow is designed to remove that friction.

Instead of asking users to live inside a large and complicated ERP, EasyFlow gives them:

- one place to see what is happening across approvals, inventory, shipments, suppliers, and exceptions
- a simpler view of operational status without technical jargon
- a configurable process layer that matches how their business actually works
- faster decision-making because the important signals are surfaced clearly

In simple terms: EasyFlow takes operational complexity in the backend and turns it into clarity in the frontend.

---

## Core Selling Point

The main selling point of EasyFlow is not that it replaces ERP systems. The main selling point is that it makes those systems usable for real-world operators.

What the product does well:

- It reduces complexity. Users do not need to understand every ERP module, table, or transaction flow.
- It surfaces the right information. Instead of searching through multiple systems, users get a focused operational picture.
- It turns data into action. The product is designed to tell teams what needs attention, what is blocked, what is delayed, and what should happen next.
- It supports different businesses. Each company can define its own processes instead of being forced into one hardcoded flow.

This makes the product especially valuable for people who are responsible for outcomes, but who do not want to become technical experts just to do their job.

---

## The Business Problem

Many companies already have systems for inventory, orders, warehousing, procurement, and forecasting. The problem is rarely "no data." The real problem is:

- the data is spread across too many systems
- the workflows are hard to follow
- teams do not know who owns the next step
- delays are discovered too late
- managers spend too much time chasing updates manually
- decision-making depends on tribal knowledge instead of clear operational visibility

That is where EasyFlow fits.

It sits above existing systems and helps teams coordinate work, track process state, and understand what action should happen next.

---

## Who This Is For

EasyFlow is designed for business users first, not only technical users.

Typical users include:

- operations managers who need a live view of approvals, delays, and movement across the business
- supply chain teams who need to coordinate procurement, inventory, dispatch, and vendor activity
- warehouse and fulfillment leads who need to know what is blocked and what is ready to move
- procurement teams who need a clearer approval and supplier workflow
- small and mid-sized business owners who want operational visibility without enterprise-software complexity
- team leads who need one shared process view instead of status updates across email, spreadsheets, and meetings

These users care about speed, clarity, accountability, and outcomes. They usually do not care which queue, database, or framework is behind the product.

---

## What Users Actually Get

From a user perspective, EasyFlow should feel like a clean operational control layer.

Instead of digging through a complex ERP, users should be able to:

- see current order, inventory, shipment, or process status in one place
- understand where work is stuck
- know who owns the next step
- spot low inventory, approval bottlenecks, or fulfillment delays early
- forecast likely issues before they become operational problems
- work inside a process map that matches their company instead of a generic software template

The value is not only "more data." The value is "clearer decisions."

---

## Real Business Use Cases

EasyFlow can support several practical operating scenarios.

### Inventory And Replenishment

A company wants to know when important stock is getting low, what locations are most affected, and what needs replenishment first. EasyFlow can surface the inventory issue, route it into the right approval process, and help teams act before it turns into a stockout.

### Procurement And Approval Workflows

A purchase or sourcing request often moves across several teams. EasyFlow can show where the request is in the process, who currently owns it, and whether it is waiting on review, supplier confirmation, or internal approval.

### Shipment And Fulfillment Visibility

Operations teams often struggle to get one clear view of inbound and outbound movement. EasyFlow can present shipment progress in a simpler way and make it easier to understand where delays are happening.

### Multi-Team Coordination

Many operational issues are not caused by missing systems. They are caused by poor coordination between teams. EasyFlow gives teams a shared process view so they can work from the same operational picture.

### Forecasting And Early Warnings

As forecasting and AI capabilities mature, EasyFlow can warn users about likely shortages, delays, or throughput issues before those problems become visible in standard reports.

---

## Product Screens And Screenshot Labels

If you want to add product screenshots to GitHub, use the labels below. These are written so a recruiter, hiring manager, or non-technical viewer can understand what each screen represents immediately.

### Platform-Level Screens

| Screen Label | Route | What It Shows |
|---|---|---|
| `Global Supply Chain Globe` | `/globe` | The landing experience where users enter the product through a world view of tenant workspaces. |
| `Operations Dashboard` | `/dashboard` | A summary view of operational health, bottlenecks, and current activity across a tenant context. |
| `Business Process Canvas` | `/workflows` | The visual process-mapping screen where business workflows are designed and managed. |
| `Forecasting Dashboard` | `/forecasting` | Forward-looking operational views, predictive metrics, and early warning signals. |
| `Integrations Settings` | `/settings` | The platform-level screen for integration and system configuration. |

### Tenant Workspace Screens

| Screen Label | Route | What It Shows |
|---|---|---|
| `Tenant Workspace Overview` | `/globe/tenant/[tenant]` | The main entry point for a specific tenant workspace. |
| `Tenant Inventory View` | `/globe/tenant/[tenant]/inventory` | Inventory visibility, stock state, and warehouse-related operational information. |
| `Tenant Logistics View` | `/globe/tenant/[tenant]/logistics` | Shipment and logistics activity for a tenant. |
| `Tenant Supplier View` | `/globe/tenant/[tenant]/suppliers` | Supplier performance, supplier relationships, and vendor-side workflow context. |
| `Tenant Users And Roles` | `/globe/tenant/[tenant]/users` | The tenant-level user and access view. |
| `Tenant Automation Hub` | `/globe/tenant/[tenant]/automation` | Workflow automation and operational orchestration for a tenant. |
| `Tenant Integration Hub` | `/globe/tenant/[tenant]/integration` | Tenant-specific connectors and external system configuration. |
| `Tenant Logistics Management` | `/globe/tenant/[tenant]/logistic-management` | Deeper transport and logistics control workflows. |

### Workflow Detail Screens

| Screen Label | Route | What It Shows |
|---|---|---|
| `Workflow Node Detail` | `/workflows/[nodeId]` | A focused view of one workflow node and its business context. |

### Suggested Screenshot Captions

Use captions like these under screenshots in GitHub, LinkedIn, or portfolio material:

- `Global Supply Chain Globe` — Multi-tenant landing experience for navigating operational workspaces.
- `Business Process Canvas` — Visual workflow design surface for mapping supply chain business processes.
- `Operations Dashboard` — Simplified decision-support dashboard for operational monitoring and action.
- `Forecasting Dashboard` — Predictive operational view for identifying risk before it becomes disruption.
- `Tenant Workspace Overview` — Tenant-specific operating environment with isolated process and data views.
- `Tenant Integration Hub` — Connector configuration layer for linking existing ERP, WMS, and external systems.

### Recommended Screenshot Order For GitHub

If you want a clean README story, use screenshots in this order:

1. `Global Supply Chain Globe`
2. `Tenant Workspace Overview`
3. `Business Process Canvas`
4. `Operations Dashboard`
5. `Forecasting Dashboard`
6. `Tenant Integration Hub`

That sequence tells the product story from entry point to daily usage to future-facing intelligence.

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

## Why This Matters To A Non-Technical Buyer

For a non-technical buyer, the most important point is simple:

EasyFlow saves time, reduces operational confusion, and helps teams make faster decisions.

It does that by:

- reducing the number of systems a user has to mentally combine
- simplifying complex operational information into understandable views
- giving clearer ownership of tasks and next steps
- helping leaders identify risk earlier
- making process bottlenecks visible instead of hidden

A business does not buy this because it uses RabbitMQ, FastAPI, or a workflow engine.

A business buys this because it can reduce delays, improve coordination, and help teams act with more confidence.

---

## Where The Product Is Going

The long-term direction of EasyFlow is bigger than a workflow editor.

The future product direction is:

- a process operating system for supply chain and operations teams
- a decision-support layer above ERP, WMS, procurement, and logistics systems
- a workflow control tower that connects process design, live status, alerts, and analytics
- an AI-assisted operations platform that can explain issues, predict risk, and recommend next actions

In the future, EasyFlow should evolve from a workflow and visibility layer into a true operational intelligence platform.

That means:

- more automation around approvals and exceptions
- predictive alerts instead of reactive reporting
- AI-generated operational summaries for managers and executives
- smarter recommendations for inventory, supplier, and fulfillment decisions
- a stronger connector ecosystem so companies can keep their current systems while getting a better user experience on top

The product ambition is not to compete with every ERP feature.

The product ambition is to become the easier, smarter, more actionable layer that people actually want to use every day.

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

EasyFlow is organized around five product concerns:

1. **Business Process Design** — each tenant defines its own process graph in the web canvas.
2. **Tenant-Aware API Layer** — FastAPI enforces superadmin versus tenant-admin access boundaries.
3. **Workflow Persistence** — tenant, user, connector, node, and edge data live in the platform data model.
4. **Async Execution Runtime** — RabbitMQ and the worker execute workflow events outside the request path.
5. **Connector + AI Extensions** — ERP/WMS integrations and AI analysis sit on top of the workflow graph.

### Product Architecture

![EasyFlow Product Architecture](<./public/EasyFlow System Architecture.png>)

This diagram shows the full product shape and how the current repo is split.

- **Users** enter through the web application as `superadmin`, `tenant admin`, or analyst/operator roles.
- **`apps/web`** contains the business process canvas, tenant dashboards, settings, and AI insight surfaces.
- **`apps/api`** acts as the control plane for tenant management, workflow APIs, notifications, and connector CRUD.
- **Persistence** is split conceptually between the central registry data and tenant workflow data.
- **RabbitMQ + the worker** form the async runtime so workflow execution and side effects do not block UI requests.
- **External systems** are reached through the pluggable connector SDK, while AI insight calls sit beside the operational flow.

How to extend this layer:

- Add new UI modules inside `apps/web/app` and `apps/web/components`.
- Add new REST capabilities inside `apps/api/app/main.py` or dedicated routers such as `apps/api/app/connectors.py`.
- Add new workflow behavior in `packages/engine/easyflow_engine`.
- Add external-system integrations in `packages/connectors`.
- Keep tenant-aware logic in the API and runtime layers, not only in the UI.

### Request To Execution Flow

![EasyFlow Workflow Execution Flow](<./public/Request to Execution Flow.png>)

This diagram explains how a single workflow action moves through the system.

1. A tenant admin edits or simulates a business process from the canvas.
2. The web app sends that request to FastAPI.
3. FastAPI validates the actor, resolves tenant scope, and loads the workflow definition.
4. The API publishes an event into RabbitMQ instead of doing heavy execution inline.
5. The worker consumes the event, loads tenant workflow data, and invokes the workflow engine.
6. The workflow engine validates the graph and produces execution state and timeline output.
7. If the workflow needs external synchronization, the worker calls ERP/WMS systems through the connector SDK.
8. The worker emits completion, retry, alert, and metrics signals back into the platform.

This is the core architectural distinction of EasyFlow: the UI is for modeling and control, while the runtime handles execution asynchronously.

Why this matters for contributors:

- New workflow actions should usually enter through the API, not by calling the worker directly from the UI.
- Long-running or failure-prone work should go through RabbitMQ so retries and DLQ handling stay consistent.
- Execution logic belongs in the workflow engine or worker, not in page components.
- Connector calls should stay behind the connector SDK boundary so ERP/WMS integrations remain swappable.

### Tenant Isolation Model

![EasyFlow Tenant Isolation Model](<./public/Tenant Isolation Model.png>)

This diagram explains the security and control boundary.

- A **tenant admin** can manage only the users, process graph, and connectors inside that tenant.
- A **superadmin** is the only role allowed to operate across all tenants.
- Each tenant owns its own process graph and integration surface.
- This keeps EasyFlow multi-tenant without turning it into a single shared workflow namespace.

That access model already exists in the backend scaffold:

- `superadmin` has cross-tenant workflow control.
- `tenant_admin` is tenant-scoped.
- `analyst` is limited to tenant-local views.

Why this matters for contributors:

- Any new tenant-facing module must preserve the tenant boundary in API reads and writes.
- Cross-tenant reporting or administration should be implemented as a superadmin capability only.
- New connector, workflow, or inventory features should always carry tenant context through storage and execution.
- UI-only checks are not enough; tenant isolation must be enforced in the backend.

Read the fuller engineering breakdown in [ARCHITECTURE.md](./ARCHITECTURE.md).

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
