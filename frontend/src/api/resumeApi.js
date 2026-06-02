import api from './axios';

export const uploadResume = (file) => {
  const form = new FormData();

  form.append('resume', file);

  return api.post(
    '/resume/upload/',
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const analyzeResume = (resumeId) =>
  api.get(`/resume/${resumeId}/analysis/`);

export const getResumeAnalysis = (resumeId) =>
  api.get(`/resume/${resumeId}/analysis/`);

export const getUserResumes = () =>
  api.get('/resume/list/');

export const deleteResume = (resumeId) =>
  api.delete(`/resume/${resumeId}/`);