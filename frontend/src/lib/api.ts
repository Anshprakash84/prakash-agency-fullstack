import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Never let network errors bubble up as unhandled — log and reject cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED" || !error.response) {
      console.warn("⚠️ Backend unreachable:", API_URL);
    }
    return Promise.reject(error);
  }
);

export const getProducts = (params?: Record<string, string>) =>
  api.get("/products", { params }).then(r => r.data).catch(() => ({ data: [], total: 0, pages: 1 }));

export const getProduct = (id: string) =>
  api.get(`/products/${id}`).then(r => r.data).catch(() => ({ data: null }));

export const createProduct = (data: FormData) =>
  api.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

export const updateProduct = (id: string, data: FormData) =>
  api.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

export const deleteProduct = (id: string) =>
  api.delete(`/products/${id}`).then(r => r.data);

export const getCategories = () =>
  api.get("/categories").then(r => r.data).catch(() => ({ data: [] }));

export const createCategory = (data: object) =>
  api.post("/categories", data).then(r => r.data);

export const updateCategory = (id: string, data: object) =>
  api.put(`/categories/${id}`, data).then(r => r.data);

export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`).then(r => r.data);

export const submitInquiry = (data: object) =>
  api.post("/inquiries", data).then(r => r.data);

export const getInquiries = (params?: Record<string, string>) =>
  api.get("/inquiries", { params }).then(r => r.data).catch(() => ({ data: [], total: 0 }));

export const updateInquiryStatus = (id: string, status: string) =>
  api.put(`/inquiries/${id}/status`, { status }).then(r => r.data);

export const deleteInquiry = (id: string) =>
  api.delete(`/inquiries/${id}`).then(r => r.data);

export const getApartment = () =>
  api.get("/apartment").then(r => r.data).catch(() => ({ data: null }));

export const updateApartment = (data: FormData) =>
  api.put("/apartment", data, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

export const getGallery = (category?: string) =>
  api.get("/gallery", { params: category ? { category } : {} }).then(r => r.data).catch(() => ({ data: [] }));

export const addGalleryImage = (data: FormData) =>
  api.post("/gallery", data, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

export const deleteGalleryImage = (id: string) =>
  api.delete(`/gallery/${id}`).then(r => r.data);

export const trackVisitor = () =>
  api.get("/visitors").then(r => r.data).catch(() => ({ data: { total: 0, today: 0, weekly: [] } }));

export const getVisitorStats = () =>
  api.get("/visitors/stats").then(r => r.data).catch(() => ({ data: { total: 0, today: 0, weekly: [] } }));

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password }).then(r => r.data);

export const getMe = () =>
  api.get("/auth/me").then(r => r.data);

export default api;
