import Link from "next/link";

interface Service {
  name: string;
  duration: string;
  price: string;
}

const services: Service[] = [
  { name: "Haircut", duration: "30 min", price: "$20" },
  { name: "Hair Styling", duration: "45 min", price: "$30" },
  { name: "Facial", duration: "60 min", price: "$40" },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C7A6E]">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Services
          </h2>
          <p className="mt-4 text-gray-600">
            A few of the services your salon offers. Manage all of them from one
            simple dashboard.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#A3CFC8] hover:shadow-lg hover:shadow-[#D0E7E3]/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4F2] text-[#2C7A6E]">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {service.name}
              </h3>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">
                  {service.duration}
                </span>
                <span className="text-lg font-bold text-[#2C7A6E]">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2C7A6E] transition-colors hover:text-[#1A4942]"
          >
            View All Services
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}