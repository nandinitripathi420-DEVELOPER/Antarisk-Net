import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Satellite, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Workspace", href: "#workspace" },
  { label: "Results", href: "#showcase" },
  { label: "Technology", href: "#technology" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-6 ${
          scrolled
            ? "glass mx-4 md:mx-auto"
            : "mx-4 md:mx-auto bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow to-violet-glow">
            <Satellite
              className="h-4.5 w-4.5 text-space-950"
              strokeWidth={2.5}
            />
          </span>

          <span className="font-display text-lg font-semibold text-mist-100">
            Antarisk<span className="text-gradient">-Net</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-mist-300 transition-colors hover:text-mist-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-mist-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}