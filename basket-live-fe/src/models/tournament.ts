export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
}

export interface Match {
  id: string;
  groupName: string;
  round: number;
  date: string;
  time: string;
  venue: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: 'SCHEDULED' | 'FINISHED';
}

export interface Standing {
  teamId: string;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDifference: number;
}