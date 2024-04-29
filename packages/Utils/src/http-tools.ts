import https from 'node:https'
import http from 'node:http'
import { urlToHttpOptions } from 'node:url'
import querystring from 'node:querystring'
import { isJson } from './index'

export type RequestOptions = {
  url: string
  method?: string
  data?: Record<string, any>
  headers?: Record<string, any>
}

export function nodeRequest(options: RequestOptions) {
  const { url: path, method = 'get', data = {}, headers = {} } = options
  const myUrl = urlToHttpOptions(new URL(path))
  const querystringParams = querystring.stringify(data)
  const httpServer = myUrl.protocol === 'https:' ? https.request : http.request
  const params = {
    ...myUrl,
    method,
    headers
  }

  if (Object.prototype.toString.call(data) === '[object Object]' && Object.values(data).length) {
    Object.assign(params, {
      search: querystringParams
    })
  }

  return new Promise((resolve, reject) => {
    const req = httpServer(params, (res: Record<string, any>) => {
      res.setEncoding('utf8')

      let data = ''

      res.on('data', (chunk: string) => (data += chunk))
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(isJson(data) ? JSON.parse(data) : data)
        }
        if (res.statusCode === 404) {
          reject('404 找不到请求的资源')
        }
        const formatedData = isJson(data) ? JSON.parse(data) : data
        if (Object.prototype.toString.call(formatedData) === '[object Object]' && Object.values(formatedData).length) {
          reject(formatedData.message || formatedData)
        }
        reject(data)
      })
    })

    if (method === 'post') {
      req.write(querystringParams)
    }

    req.on('error', (err: Error) => {
      reject(err)
    })
    req.end()
  })
}

export default async function request(options: RequestOptions) {
  try {
    return await nodeRequest(options)
  } catch (err: any) {
    throw Error(`${err?.message ? err.message : err}`)
  }
}

// const result = await request({
//   url: ''
// })
// console.log(result)
