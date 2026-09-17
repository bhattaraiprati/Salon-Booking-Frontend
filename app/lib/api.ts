import axios from "axios";

export type Status = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type Service = { id: number; name: string; price: number; duration: number };
export type Appointment = { id: number; customer_name: string; customer_phone: string; services: Service[]; service_ids?: number[]; appointment_date: string; appointment_time: string; status: Status; notes?: string; total_price?: number; total_duration?: number };

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api", headers: { "Content-Type": "application/json" } });

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { detail?: string; message?: string; [key: string]: unknown } | undefined;
    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (data && typeof data === "object") return Object.values(data).flat().join(" ");
    if (!error.response) return "Cannot reach the API. Check that the Django server is running and CORS is configured.";
  }
  return "Something went wrong. Please try again.";
};

export const getResults = <T,>(data: T[] | { results: T[] }) => Array.isArray(data) ? data : data.results;
