import { Satellite, Github, Twitter, Linkedin } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Product',
    links: ['Workspace', 'Results', 'Technology', 'API Access'],
  },
  {
    title: 'Company',
    links: ['About', 'Research', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Changelog', 'Status', 'Support'],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 pb-10 pt-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow to-violet-glow">
                <Satellite className="h-4.5 w-4.5 text-space-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold text-mist-100">
                Orbit<span className="text-gradient">Vision</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-500">
              Reconstructing cloud-obscured satellite imagery with generative AI, so nothing
              stays hidden from orbit.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-mist-300 transition-colors hover:text-cyan-glow"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-mist-100">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-mist-500 transition-colors hover:text-mist-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-mist-500 md:flex-row">
          <p>© {new Date().getFullYear()} OrbitVision AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-mist-100">Privacy</a>
            <a href="#" className="hover:text-mist-100">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
