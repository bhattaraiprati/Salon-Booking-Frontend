import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "SalonBook — Simple Appointment Management for Your Salon",
  description:
    "Manage salon services, schedule appointments, and keep track of every booking — all in one place.",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Providers>{children}</Providers></body>
    </html>
  );
}
