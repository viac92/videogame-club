import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { gameGenres } from '@/data/gamingStats';

const GenreChart = () => (
  <div className="glass-card p-6">
    <h2 className="text-lg font-bold mb-4 text-foreground">🎯 Generi Giocati</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={gameGenres}
          dataKey="giocate"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={110}
          paddingAngle={3}
          strokeWidth={0}
        >
          {gameGenres.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 22%)', borderRadius: 8, color: 'hsl(210 20% 92%)' }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default GenreChart;
