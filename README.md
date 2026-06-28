# Basket Live Dashboard

A modern basketball tournament dashboard for displaying schedules, results, standings, and team statistics.

The initial use case is the **2026 Minibasket Tournament in Costinești**, but the platform is designed to support any basketball competition.

---

# Project Structure

```text
basket-live-dashboard/
├── basket-live-fe/
├── basket-live-be/
├── basket-live-devops/
├── README.md
└── .gitignore
```

---

# Architecture

## Phase 1 - Frontend POC

Frontend only using static JSON files.

```text
React + PrimeReact
        │
        ▼
Static JSON Data
```

Goal:
- Fast development
- Beautiful UI
- Validate the concept

---

## Phase 2 - Backend

```text
React Frontend
       │
 REST API
       │
Spring Boot
       │
 PostgreSQL
```

Backend responsibilities:
- Manage tournaments
- Manage teams
- Manage matches
- Calculate standings
- Provide REST APIs

---

## Phase 3 - Data Import

```text
FRB Excel / CSV
        │
     Importer
        │
   PostgreSQL
        │
    Spring Boot
        │
      React
```

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- PrimeReact
- PrimeIcons
- React Router
- Axios

## Backend

- Java 25 LTS
- Spring Boot 4
- Maven
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Actuator

## Database

- PostgreSQL
- Liquibase

## DevOps

- Docker
- Docker Compose
- NGINX

## Version Control

- Git
- GitHub

---

# Domain Model

```text
Tournament
│
├── Groups
│      ├── Teams
│      └── Matches
│
└── Venues
```

Main entities:

- Tournament
- Group
- Team
- Match
- Venue
- Standing

> Standings are calculated from match results and are not manually stored.

---

# Roadmap

## Sprint 1

- Project structure
- React application
- PrimeReact setup
- Basic layout

## Sprint 2

- Dashboard page
- Schedule page
- Results page
- Standings page

## Sprint 3

- Static JSON data
- Automatic standings calculation

## Sprint 4

- Spring Boot backend
- REST APIs

## Sprint 5

- PostgreSQL
- Liquibase

## Sprint 6

- Docker Compose

## Sprint 7

- FRB Excel/CSV Import

## Sprint 8

- Live updates
- Statistics
- Charts
- Deployment

---

# Development Strategy

The project will be developed incrementally.

Each step must:
- compile successfully
- be tested
- be committed to Git

Small commits.
One feature at a time.
No unnecessary complexity.

---

# Future Ideas

- Multiple tournaments
- Multiple seasons
- Team logos
- Player statistics
- MVP calculation
- Charts
- Live scores
- Mobile responsive UI
- Progressive Web App (PWA)
- Authentication
- Administration panel
- AI-powered statistics and predictions
