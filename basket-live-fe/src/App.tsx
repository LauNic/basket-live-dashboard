import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

import './App.css';

function App() {
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
          <p className="card-highlight">BBA București</p>
          <p className="match-vs">vs</p>
          <p className="card-highlight">Opponent TBD</p>
          <p className="card-muted">Schedule will be loaded from tournament data.</p>
          <Button label="View Schedule" icon="pi pi-calendar" />
        </Card>

        <Card title="Team Summary" className="dashboard-card">
          <div className="stats-row">
            <div>
              <span className="stat-value">0</span>
              <span className="stat-label">Wins</span>
            </div>
            <div>
              <span className="stat-value">0</span>
              <span className="stat-label">Losses</span>
            </div>
            <div>
              <span className="stat-value">0</span>
              <span className="stat-label">Matches</span>
            </div>
          </div>
        </Card>

        <Card title="Project Status" className="dashboard-card wide-card">
          <p>
            Frontend is running with React, Vite, TypeScript and PrimeReact.
            Next step: add static JSON data for teams and matches.
          </p>
        </Card>
      </main>
    </div>
  );
}

export default App;