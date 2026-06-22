import axios from "axios"

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
})

axiosRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return axiosRequest(original)
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem("refresh_token")
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/refresh`,
          { refresh_token: refreshToken }
        )

        localStorage.setItem("token", data.access_token)
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token)
        }

        processQueue(null, data.access_token)
        original.headers.Authorization = `Bearer ${data.access_token}`
        return axiosRequest(original)
      } catch (err) {
        processQueue(err, null)
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/login"
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export function saveToken(token: string) {
  localStorage.setItem("token", token)
}

export function saveRefreshToken(token: string) {
  localStorage.setItem("refresh_token", token)
}

export function removeToken() {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh_token")
}

export function getToken() {
  return localStorage.getItem("token")
}