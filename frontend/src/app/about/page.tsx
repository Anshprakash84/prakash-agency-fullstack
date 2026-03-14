"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Heart, Award, Users, TrendingUp, CheckCircle2, Quote, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const MILESTONES = [
  { year: "2005", title: "Founded in Latehar", desc: "Mr. Prakash Kumar started with a single delivery vehicle, a rented warehouse, and 50 product SKUs — guided by one principle: do the right thing by the people who depend on you." },
  { year: "2008", title: "Regional expansion", desc: "Expanded operations to Palamu, Garhwa, and Chatra districts. Client base doubled within 18 months as word spread about our reliability and honest pricing." },
  { year: "2012", title: "Authorised brand partnerships", desc: "Became an authorised distributor for ITC, HUL, Nestlé, Amul, and Coca-Cola — cementing our position as a trusted, verified supply chain partner." },
  { year: "2016", title: "Fleet & warehouse investment", desc: "Invested in a state-of-the-art warehouse facility and expanded our owned delivery fleet to 10 vehicles, enabling same-day and next-day delivery across the region." },
  { year: "2020", title: "Prakash Apartment launched", desc: "Diversified into real estate with the launch of Prakash Apartment — a premium residential property in Latehar, reflecting our commitment to community development." },
  { year: "2024", title: "Digital transformation", desc: "Launched a digital ordering and CRM platform for retail partners across Jharkhand, making it easier than ever to manage stock, track orders, and grow together." },
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-24">

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Our Story</span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-white mb-6 leading-none">
              About Prakash<br />
              <span className="text-orange-400">Agency</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              From a single delivery vehicle in Latehar to Jharkhand&apos;s most trusted FMCG distribution network — nineteen years of growth, grit, and genuine service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="lg:col-span-3 space-y-5">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase block">How it all began</span>
            <h2 className="font-display text-4xl font-bold text-white leading-tight">A business built on one unbreakable principle.</h2>
            <p className="text-white/60 leading-relaxed">
              Prakash Agency was born out of a simple yet powerful belief: quality essential products should not be a privilege — they should be a guarantee. In 2005, our founder Mr. Prakash Kumar started with a rented warehouse, one delivery vehicle, and an unwavering commitment to serving local retailers with honesty and efficiency.
            </p>
            <p className="text-white/60 leading-relaxed">
              What began as a small distribution operation in Latehar, Jharkhand, has grown into one of the region&apos;s most trusted FMCG networks. Today, Prakash Agency distributes 500+ products from India&apos;s leading brands, operates a fleet of dedicated delivery vehicles, employs 45+ professionals, and proudly serves 1,200+ retail and wholesale partners across 15 cities.
            </p>
            <p className="text-white/60 leading-relaxed">
              Our journey has never been about size alone — it has always been about trust. Every product we deliver carries our promise: genuine, fresh, and priced fairly. Every partnership we build is founded on respect, consistency, and shared growth. Every community we enter, we aim to leave better served than before.
            </p>
            <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/15">
              <Quote className="w-7 h-7 text-orange-500/40 mb-3" />
              <p className="text-white/70 text-base italic leading-relaxed mb-3">
                &ldquo;We did not set out to build the biggest distribution company. We set out to build the most trusted one — and we are proud that our partners and communities across Jharkhand have given us that honour.&rdquo;
              </p>
              <p className="text-orange-400 text-sm font-medium">— Mr. Prakash Kumar, Founder & CEO</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[["500+","Product SKUs"],["1,200+","Retail Partners"],["15+","Cities Covered"],["45+","Team Members"],["19+","Years of Service"],["2","Business Verticals"]].map(([val, label]) => (
                <div key={label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:border-orange-500/20 transition-all">
                  <div className="font-display text-2xl font-bold text-orange-400">{val}</div>
                  <div className="text-white/50 text-xs mt-1 leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CEO PROFILE ── */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt="CEO Mr. Prakash Kumar" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                  <div className="font-display font-bold text-white text-xl">Mr. Prakash Kumar</div>
                  <div className="text-orange-400 text-sm mt-0.5">Founder & Chief Executive Officer</div>
                  <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
                    <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"><Phone className="w-3 h-3" /> +91 98765 43210</a>
                    <a href="mailto:ceo@prakashagency.com" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"><Mail className="w-3 h-3" /> CEO Email</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">A Message from Our CEO</span>
              <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">A visionary leader rooted in community.</h2>
              <div className="space-y-4 text-white/60 text-base leading-relaxed">
                <p>
                  <span className="italic text-white/75">&ldquo;When I started Prakash Agency in 2005, I had one guiding principle: do the right thing by the people who depend on you. Do it with quality, do it with honesty, and do it every single day without exception.</span>
                </p>
                <p className="italic text-white/75">
                  Nearly two decades later, that principle has not changed — only grown stronger. Today, over 1,200 business partners across Jharkhand trust Prakash Agency to supply the products their customers need. That trust is not something we take lightly. It is something we earn with every delivery, every call, and every promise we keep.
                </p>
                <p className="italic text-white/75">
                  Our vision ahead is clear: to reach more communities, partner with more businesses, and raise the standard of what FMCG distribution looks like in our region. We are just getting started — and I invite you to grow with us.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">PK</div>
                <div>
                  <div className="text-white text-sm font-semibold">Mr. Prakash Kumar</div>
                  <div className="text-white/40 text-xs">Founder & CEO · Est. 2005, Latehar</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Foundation</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">What drives us every day.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Target, color: "orange", title: "Our Mission",
              text: "To make high-quality FMCG products easily accessible to people everywhere — by building a reliable distribution network that delivers essential goods to communities efficiently and affordably.",
              points: ["Reliable, on-time delivery always", "Authentic, quality-certified products", "Affordable pricing for every partner"],
            },
            {
              icon: Eye, color: "teal", title: "Our Vision",
              text: "To become the most trusted and leading FMCG distribution company in eastern India — known for reliability, strong brand partnerships, and excellent service while expanding product accessibility across regions.",
              points: ["Expand to all of Jharkhand and beyond", "Digital-first, technology-driven operations", "Empower and grow every retail partner"],
            },
            {
              icon: Heart, color: "purple", title: "Our Values",
              text: "Integrity, quality, and community sit at the heart of everything we do. We believe business should uplift the people around it — not just serve its own growth.",
              points: ["Honesty in every transaction", "Community-first, always", "Zero compromise on product quality"],
            },
          ].map((item, i) => (
            <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                item.color === "orange" ? "bg-orange-500/10 border border-orange-500/20" :
                item.color === "teal" ? "bg-teal-500/10 border border-teal-500/20" : "bg-purple-500/10 border border-purple-500/20"
              }`}>
                <item.icon className={`w-6 h-6 ${item.color === "orange" ? "text-orange-400" : item.color === "teal" ? "text-teal-400" : "text-purple-400"}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{item.text}</p>
              <ul className="space-y-2">
                {item.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-white/60 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Journey</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Nineteen years of milestones.</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent hidden md:block" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <motion.div key={m.year} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 inline-block w-full md:max-w-sm transition-all">
                      <div className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-2">{m.year}</div>
                      <div className="font-display font-bold text-white text-lg mb-2">{m.title}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{m.desc}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 border-4 border-black z-10 shrink-0 shadow-lg shadow-orange-500/30" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
