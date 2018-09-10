const env = process.env.NODE_ENV
export const CONFIG = {
  host: env ? 'http://localhost' : '这里配置生产环境host'
}
