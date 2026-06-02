const COLORS = ['#a78bfa','#60a5fa','#34d399','#fbbf24','#f87171','#fb923c']

const SkillsCloud = ({ skills = [] }) => (
  <div>
    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      Extracted Skills
    </h4>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {skills.map((skill, i) => (
        <span key={skill} style={{
          padding: '5px 12px', borderRadius: 20,
          background: `${COLORS[i % COLORS.length]}18`,
          border: `1px solid ${COLORS[i % COLORS.length]}33`,
          color: COLORS[i % COLORS.length], fontSize: 13, fontWeight: 500,
        }}>
          {skill}
        </span>
      ))}
    </div>
  </div>
)

export default SkillsCloud