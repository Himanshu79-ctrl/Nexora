import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getResume } from "../api/resumeApi";

export default function ResumeDetailPage() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await getResume(resumeId);
        setResume(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load resume.");
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>Loading resume...</div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>Resume not found.</div>
      </div>
    );
  }

  const analysis = resume.ai_analysis || {};

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <p style={styles.label}>RESUME</p>

          <h1 style={styles.title}>
            {resume.title}
          </h1>

          <p style={styles.date}>
            Uploaded{" "}
            {new Date(resume.uploaded_at).toLocaleDateString()}
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={() =>
            navigate(`/interview/setup?resumeId=${resume.id}`)
          }
        >
          🚀 Start Interview
        </button>
      </div>

      <div style={styles.grid}>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Skills</h2>

          <div style={styles.tags}>
            {analysis.skills?.map((skill, index) => (
              <span key={index} style={styles.tag}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Tech Stack</h2>

          <div style={styles.tags}>
            {analysis.tech_stack?.map((tech, index) => (
              <span key={index} style={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Projects</h2>

          <div style={styles.projectList}>
            {analysis.projects?.map((project, index) => (
              <div key={index} style={styles.project}>
                {project}
              </div>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Experience Level</h2>

          <p style={styles.value}>
            {analysis.experience_level || "Not available"}
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Suggested Role</h2>

          <p style={styles.value}>
            {analysis.suggested_role || "Not available"}
          </p>
        </section>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    padding: "32px",
    color: "#f8fafc",
  },

  loading: {
    color: "#94a3b8",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 28,
  },

  label: {
    margin: 0,
    color: "#8b5cf6",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.5,
  },

  title: {
    margin: "6px 0",
    fontSize: 28,
    fontWeight: 700,
  },

  date: {
    margin: 0,
    color: "#64748b",
    fontSize: 13,
  },

  primaryButton: {
    border: "none",
    borderRadius: 9,
    padding: "12px 18px",
    background: "#7c3aed",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },

  card: {
    background: "#111322",
    border: "1px solid #24263a",
    borderRadius: 12,
    padding: 22,
  },

  cardTitle: {
    margin: "0 0 16px",
    fontSize: 17,
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    padding: "7px 11px",
    borderRadius: 7,
    background: "rgba(124,58,237,0.12)",
    border: "1px solid rgba(124,58,237,0.25)",
    color: "#c4b5fd",
    fontSize: 13,
  },

  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  project: {
    padding: "11px 13px",
    borderRadius: 8,
    background: "#181a2a",
    color: "#cbd5e1",
    fontSize: 14,
  },

  value: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: 15,
  },
};