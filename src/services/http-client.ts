import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { API_CONFIG } from "../constants/api";

// کلاس اصلی برای مدیریت درخواست‌های HTTP
export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Interceptor برای response
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("HTTP Error:", error);
        return Promise.reject(error);
      }
    );
  }

  // متد GET
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params });
    return response.data;
  }

  // متد POST
  async post<T>(url: string, data?: unknown): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data);
    return response.data;
  }

  // متد PUT
  async put<T>(url: string, data?: unknown): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data);
    return response.data;
  }

  // متد DELETE
  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url);
    return response.data;
  }

  // تنظیم header های اضافی
  setHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      this.client.defaults.headers.common[key] = value;
    });
  }

  // تنظیم API key
  setApiKey(apiKey: string, username: string): void {
    this.setHeaders({
      "Api-Key": apiKey,
      "Api-Username": username,
    });
  }
}
