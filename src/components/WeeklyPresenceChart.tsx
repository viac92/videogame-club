import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { weeklyPresence } from '@/data/gamingStats';
import { useMemo } from 'react';

const WeeklyPresenceChart = () => {
  const avg = useMemo(() => {
    const sum = weeklyPresence.reduce((a, b) => a + b.presenze, 0);
    return +(sum / weeklyPresence.length).toFixed(1);
  }, []);

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold mb-1 text-foreground">📅 Presenza Settimanale</h2>
      <p className="text-sm text-muted-foreground mb-4">Media: {avg} giocatori/sessione · {weeklyPresence.length} sessioni totali</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={weeklyPresence}>
          <defs>
            <linearGradient id="presenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            interval={Math.floor(weeklyPresence.length / 8)}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 8]} />
          <Tooltip
            contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 22%)', borderRadius: 8, color: 'hsl(210 20% 92%)' }}
          />
          <ReferenceLine y={avg} stroke="hsl(var(--accent))" strokeDasharray="5 5" label={{ value: `Media ${avg}`, fill: 'hsl(var(--accent))', fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="presenze"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#presenceGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyPresenceChart;
