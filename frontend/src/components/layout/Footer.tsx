import Link from "next/link";
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-white font-bold text-lg leading-none block">Prakash Agency</span>
                <span className="text-orange-400 text-xs font-medium tracking-widest uppercase">Est. 2005 · Latehar, Jharkhand</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-3">
              Quality you trust. Delivered to your door.
            </p>
            <p className="text-white/35 text-xs leading-relaxed max-w-sm mb-6">
              Jharkhand&apos;s most trusted FMCG distributor — supplying 500+ quality products from India&apos;s leading brands to 1,200+ retail partners across 15+ cities.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["FMCG Products", "/products"],
                ["Prakash Apartment", "/apartment"],
                ["Gallery", "/gallery"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-1.5 text-white/45 text-sm hover:text-orange-400 transition-colors group">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-white/45 text-sm">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex gap-3 text-white/45 text-sm">
                <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <a href="mailto:info@prakashagency.com" className="hover:text-orange-400 transition-colors">info@prakashagency.com</a>
              </li>
              <li className="flex gap-3 text-white/45 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Prakash Nagar, Main Road,<br />Latehar, Jharkhand — 829206</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-orange-500/5 border border-orange-500/15">
              <p className="text-white/40 text-xs leading-relaxed">
                <span className="text-orange-400 font-medium">Business hours:</span><br />
                Mon–Sat: 9 AM – 7 PM<br />
                Sunday: 10 AM – 4 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} Prakash Agency. All rights reserved.</p>
            <p className="text-white/15 text-xs mt-1">FMCG Distribution · Prakash Apartment · Latehar, Jharkhand</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/15 text-xs italic">&ldquo;Quality you trust. Delivered to your door.&rdquo;</span>
            <Link href="/admin/login" className="text-white/10 text-xs hover:text-white/30 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
