import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    });

    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(this.handleResponse);
  }

  private handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('authToken'); // Replace with your token logic
    if (token) {
      if (!config.headers) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
        return config;
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(url: string, data: any, config?:

 AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

const httpClient = new HttpClient('https://jsonplaceholder.typicode.com');
export default httpClient;
