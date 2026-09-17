import Link from "next/link";

interface Appointment {
  name: string;
  service: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed";
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#EAF4F2] blur-3xl opacity-70" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        {/* Left — Text */}
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full bg-[#EAF4F2] px-3 py-1 text-xs font-medium text-[#2C7A6E]">
            Appointment Booking System
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
            Simple Appointment Management for Your{" "}
            <span className="text-[#2C7A6E]">Salon</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Manage salon services, schedule appointments, and keep track of
            every booking — all in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-lg bg-[#2C7A6E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#236258] hover:shadow-md"
            >
              Book an Appointment
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#2C7A6E] hover:text-[#2C7A6E]"
            >
              Manage Appointments
            </Link>
          </div>
        </div>

        {/* Right — Dashboard Mockup */}
        <div className="relative">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  const appointments: Appointment[] = [
    {
      name: "Emma Wilson",
      service: "Haircut",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      name: "James Carter",
      service: "Facial",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      name: "Sofia Martinez",
      service: "Hair Styling",
      time: "1:00 PM",
      status: "Confirmed",
    },
    {
      name: "Liam Johnson",
      service: "Haircut",
      time: "2:30 PM",
      status: "Completed",
    },
  ];

  const statusStyles: Record<Appointment["status"], string> = {
    Confirmed: "bg-[#EAF4F2] text-[#2C7A6E]",
    Pending: "bg-amber-50 text-amber-600",
    Completed: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Main card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60">
        {/* Card header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Today's Schedule
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              Appointments
            </p>
          </div>
          <span className="rounded-lg bg-[#2C7A6E] px-3 py-1.5 text-xs font-semibold text-white">
            + New
          </span>
        </div>

        {/* Appointment list */}
        <ul className="mt-6 space-y-3">
          {appointments.map((appt) => (
            <li
              key={appt.name}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D0E7E3] text-xs font-semibold text-[#2C7A6E]">
                  {appt.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {appt.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {appt.service} · {appt.time}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[appt.status]}`}
              >
                {appt.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating accent card */}
      <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:block">
        <p className="text-xs text-gray-400">This week</p>
        <p className="text-lg font-bold text-[#2C7A6E]">24 bookings</p>
      </div>
    </div>
  );
}