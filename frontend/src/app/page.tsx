"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Package, Truck, Shield, Users, Building2, Phone, MapPin, Sparkles, TrendingUp, Award, Clock, CheckCircle, Quote } from "lucide-react";

const STATS = [
  { label: "Products Distributed", value: "500+", icon: Package, desc: "SKUs across all categories" },
  { label: "Retail Partners", value: "1,200+", icon: Users, desc: "Across Jharkhand" },
  { label: "Years of Trust", value: "19+", icon: Award, desc: "Serving since 2005" },
  { label: "Cities Covered", value: "15+", icon: MapPin, desc: "And growing" },
];

const CATEGORIES = [
  { name: "Packaged Foods", desc: "Atta, rice, oils, spices, snacks & staples", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80", brands: "Aashirvaad · Fortune · Parle · Nestlé" },
  { name: "Beverages", desc: "Soft drinks, juices, water & energy drinks", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80", brands: "Coca-Cola · PepsiCo · Tropicana · Red Bull" },
  { name: "Personal Care", desc: "Soaps, shampoos, skincare & hygiene", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80", brands: "Dove · Colgate · Dettol · HUL" },
  { name: "Household Products", desc: "Detergents, cleaners & home essentials", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80", brands: "Surf Excel · Lizol · Harpic · Reckitt" },
];

const STRENGTHS = [
  { icon: Truck, title: "Owned delivery fleet", desc: "Our own vehicles ensure punctual, damage-free delivery across 15+ cities — no third-party delays, ever." },
  { icon: Shield, title: "Authorised brand partner", desc: "Every product is genuinely sourced directly from leading FMCG brands. Zero counterfeits, always fresh." },
  { icon: TrendingUp, title: "Competitive partner pricing", desc: "Our wholesale rates are designed to maximise your margins. When your business grows, so does ours." },
  { icon: Clock, title: "Two decades of service", desc: "Since 2005, over 1,200 retail partners have trusted us as their primary FMCG supply chain partner." },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar", role: "Grocery Store Owner, Latehar", rating: 5,
    text: "I have been running my grocery store for twelve years, and for the last eight of them, Prakash Agency has been my only FMCG supplier. Orders arrive on schedule, every product is genuine, and if there is ever an issue, it gets resolved the same day.",
  },
  {
    name: "Sunita Devi", role: "Wholesale Dealer, Palamu", rating: 5,
    text: "Switching to Prakash Agency was the best business decision I made this year. Their product range covers everything my customers ask for, the pricing is genuinely competitive, and the delivery team is professional and punctual.",
  },
  {
    name: "Meena Verma", role: "Supermarket Owner, Chatra", rating: 5,
    text: "As a supermarket stocking 200+ SKUs, consistency of supply is everything. Prakash Agency has delivered that consistency for five straight years. Their team also keeps us informed about new products before they hit the market.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/60 via-black to-black" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Jharkhand&apos;s Most Trusted FMCG Distributor — Est. 2005
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6">
            <span className="block text-white">Essential goods.</span>
            <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Trusted delivery.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Quality you trust. Delivered to your door.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38 }}
            className="text-white/45 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Prakash Agency connects retailers and households across Jharkhand with 500+ quality FMCG products — reliably, affordably, and always on time.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300">
              Explore Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300">
              <Phone className="w-4 h-4" /> Become a Partner
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-16 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="relative rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] text-center hover:bg-white/[0.06] hover:border-orange-500/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-white/30 text-xs">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Who We Are</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Building trust,<br />
              <span className="text-orange-400">serving communities.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-5">
              At Prakash Agency, we believe every family deserves access to quality essential products without the hassle. Since 2005, we have built one of the most dependable FMCG distribution networks in Jharkhand — partnering with India&apos;s most trusted brands to supply retailers, businesses, and communities across the region.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              We are not just a distributor. We are your supply chain partner, your reliable source, and a committed member of the community we serve.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="group flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="grid grid-cols-2 gap-4">
            {STRENGTHS.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.05] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">What We Distribute</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything your customers need.
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">All under one roof. One supplier, zero gaps.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group relative rounded-3xl overflow-hidden cursor-pointer">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-white font-display font-bold text-xl mb-1">{cat.name}</h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-2">{cat.desc}</p>
                    <p className="text-orange-400/80 text-xs font-medium">{cat.brands}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all duration-300">
              Browse Full Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Why 1,200+ Partners Choose Us</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">A distribution network<br />built on two decades of trust.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Reliable network", body: "Our 15-city delivery network and owned fleet means you never have to worry about an empty shelf — same-day and next-day options available." },
            { num: "02", title: "Authentic products only", body: "Authorised distributor for India's top brands. Every item is genuine, freshness-checked, and sourced directly. Zero counterfeits, guaranteed." },
            { num: "03", title: "Competitive pricing", body: "Partner-first pricing model designed to maximise your margins. Our retail partners consistently report better per-unit value than any competitor." },
            { num: "04", title: "Real human support", body: "No tickets, no bots. Every partner has a dedicated contact who knows their business, resolves issues promptly, and proactively shares new deals." },
          ].map((item, i) => (
            <motion.div key={item.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-all duration-300">
              <div className="text-orange-500/40 font-display text-4xl font-bold mb-4">{item.num}</div>
              <h3 className="text-white font-semibold text-base mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── APARTMENT PREVIEW ── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80" alt="Prakash Apartment" width={1200} height={600} className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-lg ml-8 sm:ml-16 p-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
                  <Building2 className="w-3 h-3" /> A Prakash Agency Property
                </span>
                <h2 className="font-display text-4xl font-bold text-white mb-3 leading-tight">
                  More than goods —<br />a place to call home.
                </h2>
                <p className="text-white/60 text-base mb-3 leading-relaxed">
                  Prakash Agency is proud to present Prakash Apartment — a premium residential property offering modern, comfortable living in the heart of Latehar.
                </p>
                <p className="text-white/45 text-sm mb-7 leading-relaxed">
                  Designed with the same commitment to quality that defines everything we do. 1, 2 &amp; 3 BHK units with 24/7 security, power backup, parking, and more.
                </p>
                <Link href="/apartment" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 font-semibold hover:bg-teal-500/30 transition-all duration-300">
                  Explore Apartment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Trusted by Businesses</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">What our partners say.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-all duration-300 flex flex-col gap-4">
                <Quote className="w-7 h-7 text-orange-500/30" />
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-white/65 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO QUOTE ── */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="relative p-10 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="absolute top-8 left-8 text-orange-500/10">
              <Quote className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <p className="font-display text-2xl sm:text-3xl text-white/80 leading-relaxed italic mb-8 max-w-3xl">
                &ldquo;We did not set out to build the biggest distribution company. We set out to build the most trusted one — and we are proud that our partners and communities across Jharkhand have given us that honour.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-display font-bold text-xl">PK</div>
                <div>
                  <div className="text-white font-semibold text-base">Mr. Prakash Kumar</div>
                  <div className="text-orange-400 text-sm">Founder & CEO, Prakash Agency</div>
                  <div className="text-white/30 text-xs mt-0.5">Est. 2005 · Latehar, Jharkhand</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6">
              Ready to partner<br />
              <span className="text-orange-400">with us?</span>
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Fill in our contact form and one of our team members will respond within 24 hours. For urgent business inquiries, call or WhatsApp us directly — we are always a phone call away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300">
                Start Partnership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all duration-300">
                <Phone className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
