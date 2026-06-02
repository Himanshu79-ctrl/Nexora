const ProjectCard = ({ project }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: 16,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      <h5 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>{project.name}</h5>
      {project.relevance && (
        <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>{project.relevance}% match</span>
      )}
    </div>
    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 10 }}>{project.description}</p>
    {project.tech && (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            padding: '2px 8px', borderRadius: 4, fontSize: 11,
            background: 'rgba(255,255,255,0.06)', color: '#94a3b8',
          }}>{t}</span>
        ))}
      </div>
    )}
  </div>
)

export default ProjectCard