"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, errorMessage, getResults } from "../lib/api";

// ---------- Types ----------
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number; // minutes
}

interface BookingForm {
  customerName: string;
  customerPhone: string;
  serviceIds: number[]; // multiple services
  date: string;
  time: string;
  notes: string;
}

// ---------- Dummy data (replace with API later) ----------
// ---------- Time slots ----------
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => getResults<Service>((await api.get("/services")).data),
  });
  const services = servicesQuery.data ?? [];
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<BookingForm>({
    customerName: "",
    customerPhone: "",
    serviceIds: [],
    date: "",
    time: "",
    notes: "",
  });

  // ---------- Derived values ----------
  const selectedServices = services.filter((s) =>
    form.serviceIds.includes(s.id)
  );

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce(
    (sum, s) => sum + s.duration,
    0
  );

  const formatNPR = (amount: number) =>
    `NPR ${amount.toLocaleString("en-IN")}`;

  const formatDuration = (minutes: number) => {
    if (minutes === 0) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
  };

  // ---------- Handlers ----------
  const updateField = <K extends keyof BookingForm>(
    field: K,
    value: BookingForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (id: number) => {
    setForm((prev) => {
      const exists = prev.serviceIds.includes(id);
      return {
        ...prev,
        serviceIds: exists
          ? prev.serviceIds.filter((s) => s !== id)
          : [...prev.serviceIds, id],
      };
    });
  };

  const toApiTime = (time: string) => {
    const [clock, period] = time.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const appointmentMutation = useMutation({
    mutationFn: () => api.post("/appointments", {
      customer_name: form.customerName.trim(),
      customer_phone: form.customerPhone.trim(),
      service_ids: form.serviceIds,
      appointment_date: form.date,
      appointment_time: toApiTime(form.time),
      notes: form.notes.trim(),
    }),
    onSuccess: () => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    },
    onError: (error) => {
      setSubmitting(false);
      setSubmitError(errorMessage(error));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!form.customerName.trim() || !form.customerPhone.trim() || !form.date || !form.time || form.serviceIds.length === 0) {
      setSubmitError("Please enter customer details, choose at least one service, and select a date and time.");
      return;
    }
    setSubmitting(true);
    appointmentMutation.mutate();
  };

  // Success state 
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/60 px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4F2]">
            <svg
              className="h-7 w-7 text-[#2C7A6E]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
            Appointment booked
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {form.customerName}'s appointment has been scheduled with{" "}
            {form.serviceIds.length} service
            {form.serviceIds.length > 1 ? "s" : ""}.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Redirecting to dashboard…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* Top bar  */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2C7A6E] text-sm font-bold text-white">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              SalonBook
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2C7A6E]"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C7A6E]">
            New Appointment
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book an appointment
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Fill in the customer details and select one or more services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            {/* Customer section */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Customer Details
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Customer name <span className="text-[#2C7A6E]">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) =>
                      updateField("customerName", e.target.value)
                    }
                    placeholder="e.g. Aashish Sharma"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone number <span className="text-[#2C7A6E]">*</span>
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    required
                    value={form.customerPhone}
                    onChange={(e) =>
                      updateField("customerPhone", e.target.value)
                    }
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-100" />

            {/* Services multi-select */}
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Select Services
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Pick one or more services for this appointment.
                  </p>
                </div>
                {form.serviceIds.length > 0 && (
                  <span className="rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-semibold text-[#2C7A6E]">
                    {form.serviceIds.length} selected
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {servicesQuery.isLoading && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-5 text-sm text-gray-500">
                    Loading available services…
                  </div>
                )}
                {servicesQuery.isError && (
                  <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
                    <p>{errorMessage(servicesQuery.error)}</p>
                    <button type="button" onClick={() => servicesQuery.refetch()} className="mt-2 font-semibold underline">
                      Try again
                    </button>
                  </div>
                )}
                {!servicesQuery.isLoading && !servicesQuery.isError && services.length === 0 && (
                  <p className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-5 text-sm text-gray-500">
                    No services are available right now.
                  </p>
                )}
                {services.map((service) => {
                  const isSelected = form.serviceIds.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition-all ${
                        isSelected
                          ? "border-[#2C7A6E] bg-[#EAF4F2]"
                          : "border-gray-200 bg-white hover:border-[#A3CFC8] hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Custom checkbox */}
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                            isSelected
                              ? "border-[#2C7A6E] bg-[#2C7A6E]"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {service.name}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {service.duration} min
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-sm font-bold ${
                          isSelected ? "text-[#2C7A6E]" : "text-gray-700"
                        }`}
                      >
                        {formatNPR(service.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inline total strip */}
              {selectedServices.length > 0 && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#D0E7E3] bg-[#EAF4F2]/60 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#2C7A6E]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z"
                      />
                    </svg>
                    Total duration: {formatDuration(totalDuration)}
                  </div>
                  <span className="text-sm font-bold text-[#2C7A6E]">
                    {formatNPR(totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-100" />

            {/* Date & Time */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Schedule
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Appointment date <span className="text-[#2C7A6E]">*</span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Appointment time <span className="text-[#2C7A6E]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="time"
                      required
                      value={form.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
                    >
                      <option value="" disabled>
                        Choose a time…
                      </option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-100" />

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Notes{" "}
                <span className="text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </label>
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Any preferences or special requests…"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-[#2C7A6E] focus:ring-2 focus:ring-[#2C7A6E]/20"
              />
            </div>

            {/* Actions */}
            {submitError && (
              <div role="alert" className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#2C7A6E] hover:text-[#2C7A6E]"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || appointmentMutation.isPending || servicesQuery.isLoading || servicesQuery.isError}
                className="inline-flex items-center justify-center rounded-xl bg-[#2C7A6E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#236258] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Booking…" : "Confirm Appointment"}
              </button>
            </div>
          </form>

          {/* ---------- Summary sidebar ---------- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Booking Summary
              </h3>

              {/* Customer */}
              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Customer"
                  value={form.customerName || "—"}
                />
                <SummaryRow
                  label="Phone"
                  value={form.customerPhone || "—"}
                />
                <SummaryRow label="Date" value={form.date || "—"} />
                <SummaryRow label="Time" value={form.time || "—"} />
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Selected services list */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Selected Services
                </p>

                {selectedServices.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-400">
                    No services selected yet.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {selectedServices.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-start justify-between gap-3 rounded-lg bg-gray-50/60 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {s.duration} min
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {formatNPR(s.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Totals */}
              {selectedServices.length > 0 && (
                <>
                  <div className="my-5 border-t border-gray-100" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Total duration
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDuration(totalDuration)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#2C7A6E]">
                        {formatNPR(totalPrice)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
                The appointment will be saved and visible in the staff
                dashboard immediately.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// ---------- Small helper component ----------
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}
