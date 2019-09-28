import axios from 'axios'

export const getAuthorizedInstance = () => {
  const authorizedInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  })
  authorizedInstance.defaults.headers.common['Authorization'] = localStorage.jwt
  return authorizedInstance
}

export const getAuthorizedInstanceFormData = () => {
  const authorizedInstance = axios.create()
  authorizedInstance.defaults.headers.common['Authorization'] = localStorage.jwt
  return authorizedInstance
}
