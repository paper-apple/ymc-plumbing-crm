# YMC Plumbing CRM

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8)
![Slack](https://img.shields.io/badge/Slack-Integrated-4A154B)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Integrated-34A853)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

<p align="left">
  <a href="README.ru.md">Переключиться на русский язык</a>
</p>

## Overview

This project is a simplified CRM system for managing plumbing service jobs.

The application allows users to:

* Create and manage Leads (customers)
* Create Jobs for selected Leads
* Track Job status throughout its lifecycle
* Log system events
* Automatically send notifications to Slack
* Automatically record workflow events in Google Sheets

The project was implemented with a simple and maintainable architecture focused on reliability.

## Live Demo

Vercel URL:

[Try the live app](https://ymc-plumbing-crm.vercel.app)

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Route Handlers
* Prisma ORM

### Database

* The project architecture allows you to use both PostgreSQL and SQLite through the Prisma ORM

### Validation

* Zod
* React Hook Form

### Integrations

* Slack Incoming Webhooks
* Google Sheets API

### Deployment

* Vercel
* Neon

## Application Workflow

The application models a simplified plumbing service workflow.

### 1. Lead Creation

A Lead represents a potential customer.

The user creates a Lead by entering:

* First Name
* Last Name
* Phone Number
* Email (optional)

The Lead is stored in PostgreSQL.

### 2. Job Creation

After selecting a Lead, the user can create a Job.

A Job contains:

* Job Type
* Lead Source
* Description
* Service Address
* Scheduling Information
* Assigned Technician

Each Job is linked to exactly one Lead.

New Jobs are created with the default status:

```text
JOB_CREATED
```

### 3. Event Logging

Every action creates an Event Log entry.

Examples:

* Job Created
* Status Changed
* Slack Notification Sent
* Google Sheets Updated

## CRM Simulation

The project intentionally uses a simplified CRM model.

The goal is to demonstrate:

* Lead management
* Job management
* Workflow automation
* External integrations

The simplified structure makes the business process easy to understand and review.

Main entities:

```text
Lead
  ↓
Job
  ↓
Automation
```

Relationship:

```text
One Lead
    ↓
Many Jobs
```

## Automation

The application includes two automation channels:

### Slack Notifications

When a Job is created or its status changes:

* A message is sent to Slack
* The action is recorded in Event Log

### Google Sheets Logging

When a Job is created or its status changes:

* A new row is added to Google Sheets
* The action is recorded in Event Log

## Automation Architecture

Automation logic is centralized inside:

```text
lib/automation.ts
```

The automation service:

* Loads Job information
* Loads related Lead information
* Sends Slack notification
* Writes to Google Sheets
* Creates Event Log records

This keeps route handlers simple and avoids duplication.

Workflow:

```text
Job Event
    ↓
runJobAutomation()
    ↓
Slack
    ↓
Google Sheets
    ↓
Event Log
```

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── page.tsx
│   └── components/
│       ├── LeadList.tsx
│       ├── JobBoard.tsx
│       ├── EventLog.tsx
│       ├── CreateLeadModal.tsx
│       ├── CreateJobModal.tsx
│       └── fields/
│           ├── JobBoard.tsx
│           ├── EventLog.tsx
│           ├── CreateLeadModal.tsx
│           └── CreateJobModal.tsx
├── lib/
│   ├── db.ts
│   ├── automation.ts
│   ├── slack.ts
│   └── googleSheets.ts
│
├── prisma/
│
├── schemas/
│
├── types/
│
└── utils/
```

## Local Setup

Clone the repository::
```bash
git clone https://github.com/paper-apple/ymc-plumbing-crm.git
cd ymc-plumbing-crm
```

Create a .env file from the example and fill in the data:

```bash
copy .env.example .env
```

In schema.prisma, specify the database you are using in the provider line:

```bash
provider = "postgresql"
или
provider = "sqlite"
```

In .env, specify DATABASE_URL:

```bash

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_db"
или
DATABASE_URL="file:./dev.db"
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev --name init // Creating a new DB
```

Upload test data (optional):

```bash
npm run seed
```

Start development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

## Deployment

The application is deployed on:

* Vercel
* Neon PostgreSQL

## AI Usage

AI tools were used as a development assistant.

Examples of usage:

* Discussing architecture decisions
* Reviewing implementation approaches
* Generating boilerplate code
* Explaining unfamiliar APIs
* Speeding up documentation writing

All functionality was manually integrated, tested, and adapted to the project requirements.

## Notes

This project was built as a technical assessment focused on:

* Full-stack development
* Data modeling
* Workflow automation
* Third-party integrations
* Clean and maintainable architecture

## Contact

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](birdcherrytea@gmail.com)</br>
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/submarino_amarillo)</br>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dzmitry-paklonski/)