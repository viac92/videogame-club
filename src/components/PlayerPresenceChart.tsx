import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { playerTotalPresence } from '@/data/gamingStats';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
];

const PlayerPresenceChart = () => (
  <div className="glass-card p-3 md:p-6">
    <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">Presenze Totali per Giocatore</h2>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={playerTotalPresence} layout="vertical" margin={{ left: 0 }}>
        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={13} width={70} />
        <Tooltip
          contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 22%)', borderRadius: 8 }}
          itemStyle={{ color: 'hsl(210 20% 92%)' }}
          labelStyle={{ color: 'hsl(210 20% 92%)' }}
        />
        <Bar dataKey="presenze" radius={[0, 6, 6, 0]} barSize={28}>
          {playerTotalPresence.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default PlayerPresenceChart;
