import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gray-50/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#2C7A6E] px-8 py-16 text-center sm:px-16 lg:py-20">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to manage your appointments?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#EAF4F2]">
              Keep your salon schedule organized and never lose track of a
              booking.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#2C7A6E] shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}