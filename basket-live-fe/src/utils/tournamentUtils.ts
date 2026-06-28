import type { Match, Standing, Team } from '../models/tournament';

export function findTeamName(teams: Team[], teamId: string): string {
  return teams.find((team) => team.id === teamId)?.shortName ?? teamId;
}

export function getNextMatch(matches: Match[]): Match | undefined {
  return matches
    .filter((match) => match.status === 'SCHEDULED')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
}

export function calculateStandings(teams: Team[], matches: Match[]): Standing[] {
  const standings = new Map<string, Standing>();

  teams.forEach((team) => {
    standings.set(team.id, {
      teamId: team.id,
      played: 0,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointsDifference: 0,
    });
  });

  matches
    .filter(
      (match) =>
        match.status === 'FINISHED' &&
        match.homeScore !== undefined &&
        match.awayScore !== undefined,
    )
    .forEach((match) => {
      const home = standings.get(match.homeTeamId);
      const away = standings.get(match.awayTeamId);

      if (!home || !away || match.homeScore === undefined || match.awayScore === undefined) {
        return;
      }

      home.played += 1;
      away.played += 1;

      home.pointsFor += match.homeScore;
      home.pointsAgainst += match.awayScore;

      away.pointsFor += match.awayScore;
      away.pointsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.wins += 1;
        away.losses += 1;
      } else {
        away.wins += 1;
        home.losses += 1;
      }

      home.pointsDifference = home.pointsFor - home.pointsAgainst;
      away.pointsDifference = away.pointsFor - away.pointsAgainst;
    });

  return Array.from(standings.values()).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pointsDifference - a.pointsDifference;
  });
}