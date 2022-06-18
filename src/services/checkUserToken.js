import decode from 'jwt-decode'

const token = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).token
  : null

export function checkUserToken() {
  if (!token) return false

  const decodedToken = decode(token)

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return false
  }
  return true
}
