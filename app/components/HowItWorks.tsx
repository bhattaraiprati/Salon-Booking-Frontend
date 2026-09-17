interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Choose a Service",
    description: "Select the salon service you need.",
  },
  {
    number: "02",
    title: "Pick a Time",
    description: "Choose an available appointment slot.",
  },
  {
    number: "03",
    title: "Get Your Appointment",
    description: "Your booking is created and managed by the salon staff.",
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C7A6E]">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Booking made simple
          </h2>
          <p className="mt-4 text-gray-600">
            Three easy steps to get your appointment scheduled.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-8 hidden h-px w-full -translate-x-1/2 bg-gradient-to-r from-[#A3CFC8] to-transparent md:block" />
              )}

              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold text-[#A3CFC8]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}