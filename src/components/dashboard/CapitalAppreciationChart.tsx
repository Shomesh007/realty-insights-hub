import { AreaChart, Area, XAxis, ResponsiveContainer, ReferenceDot } from "recharts";

interface CapitalAppreciationChartProps {
  growthPercentage?: number;
}

const CapitalAppreciationChart = ({ growthPercentage = 32.5 }: CapitalAppreciationChartProps) => {
  const data = [
    { year: "2023", value: 100 },
    { year: "2024", value: 108 },
    { year: "2025", value: 115 },
    { year: "2026", value: 122 },
    { year: "2027", value: 128 },
    { year: "2028", value: 132.5 },
  ];

  return (
    <div className="lg:col-span-8 bg-card rounded-xl p-5 shadow-soft border border-border flex flex-col h-[280px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Capital Appreciation</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold text-primary uppercase tracking-widest border border-primary/20">
              Forecast
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm">
            Predictive modeling based on upcoming Dubai infrastructure projects.
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-primary tracking-tight leading-none">+{growthPercentage}%</p>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">5-Year Growth Projection</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-1 w-full mt-2">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pt-4">
          <div className="w-full border-t border-dashed border-border" />
          <div className="w-full border-t border-dashed border-border" />
          <div className="w-full border-t border-dashed border-border" />
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill="url(#gradientArea)"
              dot={(props) => {
                const { cx, cy, index } = props;
                const isLast = index === data.length - 1;
                return (
                  <g key={index}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={isLast ? "hsl(var(--secondary))" : "white"}
                      stroke={isLast ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
                      strokeWidth={2}
                    />
                    {isLast && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.3}
                      />
                    )}
                  </g>
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapitalAppreciationChart;
