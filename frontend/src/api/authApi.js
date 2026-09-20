import api from './axios'


export const loginUser = (credentials) =>
  api.post('/accounts/login/', credentials)

export const registerUser = (data) =>
  api.post('/accounts/register/', data)

export const logoutUser = () =>
  api.post('/accounts/logout/', {
    refresh: localStorage.getItem('refresh_token')
  })

export const getMe = () =>
  api.get('/accounts/profile/') 

export const refreshToken = (refresh) =>
  api.post('/accounts/token/refresh/', { refresh })