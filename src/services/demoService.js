import axios from 'axios'
import { CONFIG } from './index'

// 请求方法统一放在这里
export const getMockData = () => {
  return axios.get(`${CONFIG.host}:3001/posts`)
}

export const getAudio = name =>
  axios.get(`${CONFIG.host}:8888/${name}`, {
    responseType: 'arraybuffer'
  })
