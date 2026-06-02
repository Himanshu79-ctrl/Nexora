import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Button from '../common/Button'

const ResumeUploadCard = ({ onUpload, loading }) => {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0])
    setDragOver(false)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize: 5 * 1024 * 1024, multiple: false,
  })

  const handleUpload = () => { if (file) onUpload(file) }

  return (
    <div style={{ background: '#13132a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Resume Analysis</h3>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
        Upload your resume and let AI analyze your skills
      </p>

      <div {...getRootProps()} style={{
        border: `2px dashed ${dragOver || file ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 12, padding: '48px 24px', textAlign: 'center', cursor: 'pointer',
        background: dragOver ? 'rgba(124,58,237,0.05)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s',
      }}>
        <input {...getInputProps()} />
        <div style={{ fontSize: 48, marginBottom: 16 }}>{file ? '✅' : '📄'}</div>
        {file ? (
          <>
            <p style={{ fontWeight: 600, color: '#a78bfa', marginBottom: 4 }}>{file.name}</p>
            <p style={{ color: '#64748b', fontSize: 13 }}>{(file.size / 1024).toFixed(0)} KB</p>
          </>
        ) : (
          <>
            <p style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Drag & drop your resume here</p>
            <p style={{ color: '#64748b', fontSize: 13 }}>or</p>
            <p style={{ color: '#7c3aed', fontWeight: 600, marginTop: 6 }}>Choose File</p>
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>PDF, DOCX (Max. 5MB)</p>
          </>
        )}
      </div>

      {file && (
        <Button fullWidth onClick={handleUpload} loading={loading} style={{ marginTop: 16 }}>
          Analyze Resume
        </Button>
      )}
    </div>
  )
}

export default ResumeUploadCard