import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { playedGames } from '@/data/gamingStats';
import { useState } from 'react';

const GamesPlayedChart = () => {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...playedGames].sort((a, b) => b.giocate - a.giocate);
  const data = showAll ? sorted : sorted.slice(0, 15);

  return (
    <div className="glass-card p-3 md:p-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-base md:text-lg font-bold text-foreground">Giochi Più Giocati</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {showAll ? 'Top 15' : `Tutti (${playedGames.length})`}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={showAll ? data.length * 28 + 40 : 450}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
          <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} width={130} tick={{ width: 125 }} />
          <Tooltip
            contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8 }}
            itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
            labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
          />
          <Bar dataKey="giocate" fill="hsl(var(--chart-5))" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GamesPlayedChart;
