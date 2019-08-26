import http from './http'

export const getPPTData = () => http.get('/api/ppt')
