import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { weeklyPresence } from '@/data/gamingStats';
import { useMemo, useState } from 'react';
import { parse, isAfter, isBefore, subMonths, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

type FilterType = 'all' | '6months' | '1month' | 'custom';

const parseDate = (d: string) => {
  // Handle various formats like dd/mm/yyyy
  const cleaned = d.replace(/\/+/g, '/');
  return parse(cleaned, 'dd/MM/yyyy', new Date());
};

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Sempre' },
  { key: '6months', label: 'Ultimi 6 mesi' },
  { key: '1month', label: 'Ultimo mese' },
  { key: 'custom', label: 'Personalizzato' },
];

const WeeklyPresenceChart = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [customFrom, setCustomFrom] = useState<Date | undefined>();
  const [customTo, setCustomTo] = useState<Date | undefined>();

  const filteredData = useMemo(() => {
    const now = new Date();
    return weeklyPresence.filter((entry) => {
      const d = parseDate(entry.date);
      if (filter === '6months') return isAfter(d, subMonths(now, 6));
      if (filter === '1month') return isAfter(d, subMonths(now, 1));
      if (filter === 'custom') {
        const afterFrom = customFrom ? !isBefore(d, startOfDay(customFrom)) : true;
        const beforeTo = customTo ? !isAfter(d, startOfDay(customTo)) : true;
        return afterFrom && beforeTo;
      }
      return true;
    });
  }, [filter, customFrom, customTo]);

  const avg = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((a, b) => a + b.presenze, 0);
    return +(sum / filteredData.length).toFixed(1);
  }, [filteredData]);

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
        <h2 className="text-lg font-bold text-foreground">Presenza Settimanale</h2>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full transition-colors',
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filter === 'custom' && (
        <div className="flex flex-wrap gap-3 mb-3 mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
                {customFrom ? format(customFrom, 'dd/MM/yyyy') : 'Da...'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customFrom}
                onSelect={setCustomFrom}
                locale={it}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
                {customTo ? format(customTo, 'dd/MM/yyyy') : 'A...'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={customTo}
                onSelect={setCustomTo}
                locale={it}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4">
        Media: {avg} giocatori/sessione · {filteredData.length} sessioni
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filteredData}>
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
            interval={Math.max(0, Math.floor(filteredData.length / 8))}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 8]} />
          <Tooltip
            contentStyle={{ background: 'hsl(220 18% 12%)', border: '1px solid hsl(220 15% 22%)', borderRadius: 8 }}
            itemStyle={{ color: 'hsl(210 20% 92%)' }}
            labelStyle={{ color: 'hsl(210 20% 92%)' }}
          />
          <Area
            type="monotone"
            dataKey="presenze"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#presenceGrad)"
          />
          <ReferenceLine y={avg} stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="8 4" label={{ value: `  Media ${avg}  `, fill: 'hsl(var(--accent))', fontSize: 13, fontWeight: 700, position: 'insideTopRight', style: { paintOrder: 'stroke', stroke: 'hsl(220 20% 7%)', strokeWidth: 8, strokeLinejoin: 'round' } }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyPresenceChart;
