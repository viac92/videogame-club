import StatCard from '@/components/StatCard';
import PlayerPresenceChart from '@/components/PlayerPresenceChart';
import WeeklyPresenceChart from '@/components/WeeklyPresenceChart';
import GamesPlayedChart from '@/components/GamesPlayedChart';
import GenreChart from '@/components/GenreChart';
import { playerTotalPresence, playedGames, weeklyPresence } from '@/data/gamingStats';

const Index = () => {
  const totalSessions = weeklyPresence.length;
  const totalGames = playedGames.length;
  const totalPlayers = playerTotalPresence.length;
  const avgPresence = (weeklyPresence.reduce((a, b) => a + b.presenze, 0) / totalSessions).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">Videogame Club</h1>
        <p className="text-muted-foreground">Statistiche delle serate di gioco</p>
      </header>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Sessioni" value={totalSessions} />
        <StatCard label="Giochi" value={totalGames} />
        <StatCard label="Giocatori" value={totalPlayers} />
        <StatCard label="Media Presenze" value={avgPresence} />
      </div>

      {/* Weekly presence - full width */}
      <div className="mb-8">
        <WeeklyPresenceChart />
      </div>

      {/* Player presence + Genre donut */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <PlayerPresenceChart />
        <GenreChart />
      </div>

      {/* Games played */}
      <div className="mb-8">
        <GamesPlayedChart />
      </div>

      <footer className="text-center text-muted-foreground text-xs py-6">
        Videogame Club · Dati aggiornati al 2025
      </footer>
    </div>
  );
};

export default Index;
