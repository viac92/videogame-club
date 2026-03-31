import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { playedGames } from '@/data/gamingStats';
import { useState } from 'react';

const GamesPlayedChart = () => {
  const [showAll, setShowAll] = useState(false);
  const data = showAll ? playedGames : playedGames.slice(0, 15);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Giochi Più Giocati</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {showAll ? 'Top 15' : `Tutti (${playedGames.length})`}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={showAll ? 900 : 450}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={160} />
          <Tooltip
            contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 22%)', borderRadius: 8, color: 'hsl(210 20% 92%)' }}
          />
          <Bar dataKey="giocate" fill="hsl(var(--chart-5))" radius={[0, 6, 6, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GamesPlayedChart;
