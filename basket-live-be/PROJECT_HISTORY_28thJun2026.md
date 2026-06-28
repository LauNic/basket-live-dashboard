# Basket Live Dashboard - Project History

## 1. Project Context

Basket Live Dashboard is a modern basketball tournament dashboard.

The initial real use case is the **2026 Minibasket / U12 Masculin tournament in Costinești**, based on FRB data.

The project should not be limited only to BBA. The application should handle the whole competition and only highlight the selected team.

Selected/highlighted team:

```text
ACS Educatie si Performanta prin Baschet Bucuresti
```

Alias used in UI:

```text
BBA
```

---

## 2. Repository

Local workspace:

```text
~/MyProjects/basket-live-dashboard/
```

GitHub repository:

```text
https://github.com/LauNic/basket-live-dashboard
```

Branching strategy:

```text
master  = stable / production
develop = active development
```

Current working branch:

```bash
git checkout develop
```

---

## 3. Project Structure

Final agreed structure:

```text
basket-live-dashboard/
├── basket-live-fe/
├── basket-live-be/
├── basket-live-devops/
├── README.md
├── PROJECT_HISTORY.md
└── .gitignore
```

The shorter folder names were intentionally chosen instead of repeating the full project name in every module.

---

## 4. General Architecture

Target architecture:

```text
FRB CSV results/schedule
        ↓
Spring Boot importer
        ↓
PostgreSQL
        ↓
REST API
        ↓
React + PrimeReact
```

The frontend started as a POC with local/static data, but the correct direction is to persist FRB data in the database and read it through the backend API.

---

## 5. Technology Stack

### Frontend

```text
React
TypeScript
Vite
PrimeReact
PrimeIcons
PrimeFlex
ESLint
```

Important UI decision:

```text
PrimeReact is the default UI component library.
Do not use Material UI unless explicitly requested.
```

### Backend

```text
Java 25 LTS
Spring Boot 4.1.0
Maven
Spring Web
Spring Actuator
PostgreSQL
Liquibase
```

### Database

```text
PostgreSQL
Liquibase
```

### DevOps

```text
Docker
Docker Compose
NGINX
```

---

## 6. Frontend Progress

Frontend module:

```text
basket-live-fe/
```

Generated with:

```text
Vite + React + TypeScript
```

Linting choice:

```text
ESLint
```

PrimeReact dependencies installed:

```text
primereact
primeicons
primeflex
```

PrimeReact CSS imports added in:

```text
basket-live-fe/src/main.tsx
```

Imports:

```tsx
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
```

A first POC dashboard was created using PrimeReact cards/tables.

The frontend should later switch from static/manual JSON to backend API data.

---

## 7. Node.js Issue and Resolution

Initial Node version was too old for the latest Vite:

```text
Node 20.18.1
```

Vite required:

```text
Node 20.19+ or 22.12+
```

Resolution:

```text
Installed Node 22 through Homebrew.
```

After upgrading Node, Vite frontend was able to run.

---

## 8. FRB Data Source

FRB CSV files were added under:

```text
basket-live-devops/data/frb/
├── frb-minibasket-2026-results.csv
└── frb-minibasket-2026-schedule.csv
```

The CSV format detected:

```text
CSN U12 Masculin;2025-2026;;;;;;;
id;weekday;date;time;home team;away team;arena;score;attendance
```

Separator:

```text
;
```

Columns:

```text
id
weekday
date
time
home team
away team
arena
score
attendance
```

Important observation:

```text
The FRB id is not globally unique.
```

Example:

```text
id=6 appears more than once in schedule.csv
```

Therefore:

```text
The database must use its own generated primary key.
The FRB CSV id should be stored as source_match_id.
```

---

## 9. Competition Information

Competition:

```text
CSN U12 Masculin
2025-2026
Festivalul de Minibaschet Masculin
Costinești 2026
```

BBA official FRB team name:

```text
ACS Educatie si Performanta prin Baschet Bucuresti
```

BBA group from FRB standings:

```text
Grupa 3 Avansati
```

Important:

```text
The results.csv and schedule.csv files do not contain group information.
```

Group handling will require either:

* separate standings/group import
* manual group mapping
* nullable group_id in the first DB version

---

## 10. BBA Matches Found in CSV

From results.csv:

```text
ABC Laguna Bucuresti Alb - ACS Educatie si Performanta prin Baschet Bucuresti 34-37
```

From schedule.csv:

```text
ACS Educatie si Performanta prin Baschet Bucuresti - CSU Andu Sibiu Galben
ABC Rising Stars Popesti Leordeni Negru - ACS Educatie si Performanta prin Baschet Bucuresti
ACS Educatie si Performanta prin Baschet Bucuresti - ACS Baschet Team Giurgiu
ACS Cormoran Constanta Smarald - ACS Educatie si Performanta prin Baschet Bucuresti
ACS Educatie si Performanta prin Baschet Bucuresti - ACS Madmax Iasi
ACS Total Sport Bucuresti - ACS Educatie si Performanta prin Baschet Bucuresti
ACS Educatie si Performanta prin Baschet Bucuresti - ACS Vikings Basketball Academy Iasi
```

---

## 11. Database Model - Initial Proposal

Start simple with:

```text
competition
team
match
```

Add later:

```text
competition_group
team_group_assignment
```

### competition

```text
competition_id
name
season
location
```

### team

```text
team_id
name
short_name
city
```

### match

```text
match_id
competition_id
group_id nullable
source_match_id
weekday
game_date
game_time
home_team_id
away_team_id
arena
home_score
away_score
attendance
status
```

Match statuses:

```text
SCHEDULED
FINISHED
```

Import rules:

```text
results.csv  -> FINISHED
schedule.csv -> SCHEDULED if score is 0-0
```

Some schedule rows have:

```text
time = 00:00:00
arena = empty
```

These should be treated as incomplete schedule data, not as import errors.

---

## 12. Backend Progress

Backend module:

```text
basket-live-be/
```

Generated with Spring Initializr using:

```text
Java 25
Spring Boot 4.1.0
Maven
Spring Web
Actuator
```

Local Java setup:

```text
openjdk version "25.0.3" Temurin
Maven 3.9.9
```

Current backend port decision:

```text
server.port=8090
```

Reason:

```text
Port 8080 was already occupied by another Java process that kept reappearing.
To avoid wasting time fighting with 8080, basket-live-be uses dedicated port 8090.
```

Required backend config:

```properties
spring.application.name=basket-live-be
server.port=8090

management.endpoints.web.exposure.include=health,info
```

File:

```text
basket-live-be/src/main/resources/application.properties
```

Backend run command:

```bash
cd ~/MyProjects/basket-live-dashboard/basket-live-be
mvn clean spring-boot:run
```

Health check:

```bash
curl http://localhost:8090/actuator/health
```

Expected response:

```json
{"status":"UP"}
```

---

## 13. Java 25 / Maven Warning Handling

Java 25 produced Maven warnings related to native access and Unsafe usage.

Decision:

Set Maven options globally in `.bash_profile`:

```bash
echo 'export MAVEN_OPTS="--enable-native-access=ALL-UNNAMED --sun-misc-unsafe-memory-access=allow"' >> ~/.bash_profile
source ~/.bash_profile
```

Verify:

```bash
echo $MAVEN_OPTS
```

Expected:

```text
--enable-native-access=ALL-UNNAMED --sun-misc-unsafe-memory-access=allow
```

---

## 14. Known Issue: Port 8080

Port 8080 was occupied by Java processes.

Diagnostic command:

```bash
lsof -i:8080
```

Example output:

```text
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
java    80253  Lau   54u  IPv6 ... TCP *:http-alt (LISTEN)
```

Temporary kill command:

```bash
kill -9 <PID>
```

But because the process kept coming back, the permanent project decision was:

```text
Use port 8090 for basket-live-be.
```

---

## 15. Git / Commit Guidelines

Working branch:

```bash
git checkout develop
```

Standard commit flow:

```bash
git status
git add .
git commit -m "<clear commit message>"
git push
```

Do not use destructive Git commands.

Avoid:

```text
force push
rebase
filter-repo
reset --hard
```

unless explicitly discussed and confirmed.

Development style:

```text
Strict Patch Mode
```

Meaning:

```text
- one file or one function at a time
- minimal changes
- test after every step
- small commits
- no large refactors
- no risky Git operations
```

---

## 16. Next Recommended Steps

### Step 1 - Finish backend skeleton

Verify backend runs on port 8090:

```bash
cd ~/MyProjects/basket-live-dashboard/basket-live-be
mvn clean spring-boot:run
```

In another terminal:

```bash
curl http://localhost:8090/actuator/health
```

Commit:

```bash
cd ~/MyProjects/basket-live-dashboard
git status
git add basket-live-be/
git commit -m "Create Spring Boot backend skeleton"
git push
```

### Step 2 - Add simple ping endpoint

Endpoint:

```text
GET /api/ping
```

Expected response:

```json
{
  "message": "pong",
  "service": "basket-live-be"
}
```

### Step 3 - Add PostgreSQL in DevOps

Create:

```text
basket-live-devops/docker-compose.yml
```

Suggested local port:

```text
5433:5432
```

Suggested DB:

```text
basket_live_db
```

Suggested user:

```text
basket_live_user
```

Suggested password:

```text
basket_live_password
```

### Step 4 - Add Liquibase

Add dependencies:

```text
Spring Data JPA
PostgreSQL Driver
Liquibase
```

Create first changelog for:

```text
competition
team
match
```

### Step 5 - Add CSV Import

Initial endpoint:

```text
POST /api/import/frb
```

Initial source folder:

```text
../basket-live-devops/data/frb/
```

Importer should read:

```text
frb-minibasket-2026-results.csv
frb-minibasket-2026-schedule.csv
```

### Step 6 - Add REST APIs

Planned APIs:

```text
GET /api/matches
GET /api/teams
GET /api/teams/highlight
GET /api/standings
GET /api/teams/{teamId}/matches
```

### Step 7 - Connect frontend to backend

Frontend should read backend API instead of static JSON.

The UI should show all competition data and highlight:

```text
ACS Educatie si Performanta prin Baschet Bucuresti
```

---

## 17. Important Design Principle

Do not build a hardcoded BBA-only dashboard.

Build:

```text
Basket Live Dashboard
```

Generic tournament dashboard.

Then configure:

```text
highlightedTeam = ACS Educatie si Performanta prin Baschet Bucuresti
```

This keeps the project reusable for:

* other FRB tournaments
* future U13/U14 competitions
* other teams
* portfolio/demo usage
