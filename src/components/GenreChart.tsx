import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Sector } from "recharts";
import { gameGenres } from "@/data/gamingStats";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ outline: "none" }}
      />
    </g>
  );
};

const GenreChart = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? selectedIndex ?? undefined;

  return (
    <div data-genre-chart className="glass-card p-3 md:p-6">
      <style>{`
        [data-genre-chart] .recharts-sector:focus,
        [data-genre-chart] .recharts-sector:focus-visible {
          outline: none;
        }
      `}</style>
      <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">Generi Giocati</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={gameGenres}
            dataKey="giocate"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={90}
            paddingAngle={3}
            strokeWidth={0}
            rootTabIndex={-1}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onClick={(_, index) => setSelectedIndex((current) => (current === index ? null : index))}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {gameGenres.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "hsl(220 18% 12%)", border: "1px solid hsl(220 15% 22%)", borderRadius: 8 }}
            itemStyle={{ color: "hsl(210 20% 92%)" }}
            labelStyle={{ color: "hsl(210 20% 92%)" }}
            cursor={false}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
<style>{`
  [data-genre-chart] .recharts-sector:focus,
  [data-genre-chart] .recharts-sector:focus-visible {
    outline: none;
  }
  [data-genre-chart] .recharts-active-dot,
  [data-genre-chart] .recharts-pie-sector:focus rect,
  [data-genre-chart] svg:focus,
  [data-genre-chart] svg *:focus {
    outline: none !important;
  }
  [data-genre-chart] .recharts-wrapper:focus,
  [data-genre-chart] .recharts-surface:focus {
    outline: none !important;
  }
`}</style>;

export default GenreChart;
