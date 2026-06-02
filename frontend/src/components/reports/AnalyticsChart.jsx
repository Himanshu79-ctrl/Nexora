import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1e1e3f', border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 8, padding: '8px 14px', fontSize: 13,
    }}>
      <p style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontWeight: 700 }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

const AnalyticsChart = ({ data = [], dataKey = 'score', label = 'Score' }) => (
  <div>
    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      Performance Over Time
    </h4>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 11, fill: '#64748b' }} />
        <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11, fill: '#64748b' }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone" dataKey={dataKey} name={label}
          stroke="#7c3aed" strokeWidth={2}
          fill="url(#scoreGrad)" dot={{ fill: '#7c3aed', r: 4 }}
          activeDot={{ r: 6, fill: '#a78bfa' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

export default AnalyticsChart