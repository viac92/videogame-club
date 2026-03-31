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
    <div className="min-h-screen bg-background px-3 py-4 md:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-1">Videogame Club</h1>
        <p className="text-sm md:text-base text-muted-foreground">Statistiche delle serate di gioco</p>
      </header>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
        <StatCard label="Sessioni" value={totalSessions} />
        <StatCard label="Giochi" value={totalGames} />
        <StatCard label="Giocatori" value={totalPlayers} />
        <StatCard label="Media Presenze" value={avgPresence} />
      </div>

      {/* Weekly presence - full width */}
      <div className="mb-6 md:mb-8">
        <WeeklyPresenceChart />
      </div>

      {/* Player presence + Genre donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        <PlayerPresenceChart />
        <GenreChart />
      </div>

      {/* Games played */}
      <div className="mb-6 md:mb-8">
        <GamesPlayedChart />
      </div>

      <footer className="text-center text-muted-foreground text-xs py-6">
        Videogame Club · Dati aggiornati al 2026
      </footer>
    </div>
  );
};

export default Index;
