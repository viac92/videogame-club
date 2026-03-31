interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="glass-card p-3 md:p-5 flex flex-col gap-0.5 md:gap-1">
    <span className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider">{label}</span>
    <span className="text-2xl md:text-3xl font-bold text-gradient">{value}</span>
  </div>
);

export default StatCard;
