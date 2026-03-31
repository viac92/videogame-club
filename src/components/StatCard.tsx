interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="glass-card p-5 flex flex-col gap-1">
    <span className="text-muted-foreground text-sm uppercase tracking-wider">{icon} {label}</span>
    <span className="text-3xl font-bold text-gradient">{value}</span>
  </div>
);

export default StatCard;
