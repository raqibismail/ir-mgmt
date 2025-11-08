import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, 
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;

export const all = async <T>(
  url: string,
  params?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await api.get<T>(url, { params });
  return response;
};

export const find = async <T>(
  url: string,
  id: string,
  params?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await api.get<T>(`${url}/${id}`, { params });
  return response;
};

export const create = async <T>(
  url: string,
  data: Partial<T>,
  params?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await api.post<T>(url, data, { params });
  return response;
};

export const update = async <T>(
  url: string,
  id: string,
  data: Partial<T>,
  params?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await api.put<T>(`${url}/${id}`, data, { params });
  return response;
};

export const destroy = async <T>(
  url: string,
  id: string,
  params?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await api.delete<T>(`${url}/${id}`, { params });
  return response;
};
