
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import teamsData from './data/teams.json';
import matchesData from './data/matches.json';
import type { Match, Standing, Team } from './models/tournament';
import { calculateStandings, findTeamName, getNextMatch } from './utils/tournamentUtils';

import './App.css';

const teams = teamsData as Team[];
const matches = matchesData as Match[];

function App() {
  const nextMatch = getNextMatch(matches);
  const standings = calculateStandings(teams, matches);
  const finishedMatches = matches.filter((match) => match.status === 'FINISHED');

  const teamNameBody = (standing: Standing) => findTeamName(teams, standing.teamId);

  const matchTeamsBody = (match: Match) => (
    <span>
      {findTeamName(teams, match.homeTeamId)} - {findTeamName(teams, match.awayTeamId)}
    </span>
  );

  const matchScoreBody = (match: Match) => {
    if (match.homeScore === undefined || match.awayScore === undefined) {
      return '-';
    }

    return `${match.homeScore} - ${match.awayScore}`;
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Basket Live Dashboard</h1>
          <p>Costinești 2026 · Minibasket Tournament</p>
        </div>

        <Tag value="POC" severity="info" />
      </header>

      <main className="dashboard-grid">
        <Card title="Next Match" className="dashboard-card">
          {nextMatch ? (
            <>
              <p className="card-highlight">{findTeamName(teams, nextMatch.homeTeamId)}</p>
              <p className="match-vs">vs</p>
              <p className="card-highlight">{findTeamName(teams, nextMatch.awayTeamId)}</p>
              <p className="card-muted">
                {nextMatch.date} · {nextMatch.time} · {nextMatch.venue}
              </p>
              <Button label="View Schedule" icon="pi pi-calendar" />
            </>
          ) : (
            <p className="card-muted">No scheduled matches.</p>
          )}
        </Card>

        <Card title="Team Summary" className="dashboard-card">
          <div className="stats-row">
            <div>
              <span className="stat-value">{matches.length}</span>
              <span className="stat-label">Matches</span>
            </div>
            <div>
              <span className="stat-value">{finishedMatches.length}</span>
              <span className="stat-label">Finished</span>
            </div>
            <div>
              <span className="stat-value">{standings.length}</span>
              <span className="stat-label">Teams</span>
            </div>
          </div>
        </Card>

        <Card title="Standings" className="dashboard-card wide-card">
          <DataTable value={standings} size="small" stripedRows>
            <Column header="#" body={(_, options) => options.rowIndex + 1} />
            <Column header="Team" body={teamNameBody} />
            <Column field="played" header="P" />
            <Column field="wins" header="W" />
            <Column field="losses" header="L" />
            <Column field="pointsFor" header="PF" />
            <Column field="pointsAgainst" header="PA" />
            <Column field="pointsDifference" header="+/-" />
          </DataTable>
        </Card>

        <Card title="Latest Results" className="dashboard-card wide-card">
          <DataTable value={finishedMatches} size="small" stripedRows>
            <Column field="date" header="Date" />
            <Column field="time" header="Time" />
            <Column header="Match" body={matchTeamsBody} />
            <Column header="Score" body={matchScoreBody} />
            <Column field="venue" header="Venue" />
          </DataTable>
        </Card>
      </main>
    </div>
  );
}

export default App;