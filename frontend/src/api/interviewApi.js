import api from './axios'

export const createInterview = (data) =>
  api.post('/interview/create/', data)

export const getInterviewList = () =>
  api.get('/interview/list/')

export const getInterviewDetail = (id) =>
  api.get(`/interview/${id}/`)

export const submitAnswer = (interviewId, data) =>
  api.post(`/interview/${interviewId}/answer/`, data)

export const endInterview = (interviewId) =>
  api.post(`/interview/${interviewId}/end/`)

export const getReport = (interviewId) =>
  api.get(`/interview/${interviewId}/report/`)

export const getDashboardStats = () =>
  api.get('/interview/stats/')


export const startInterview = createInterview;