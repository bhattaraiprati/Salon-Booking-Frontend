import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

export default function Footer() {
  const links: FooterLink[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="max-w-xs text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2C7A6E] text-sm font-bold text-white">
                S
              </span>
              <span className="text-lg font-semibold tracking-tight text-gray-900">
                SalonBook
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Simple appointment management for salons.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#2C7A6E]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SalonBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}