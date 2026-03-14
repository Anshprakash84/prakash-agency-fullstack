"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Building2, ArrowRight } from "lucide-react";
import { submitInquiry } from "@/lib/api";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", type: "general" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) { toast.error("Please fill all required fields"); return; }
    setSubmitting(true);
    try {
      await submitInquiry(form);
      toast.success("Message sent! We'll respond within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "", type: "general" });
    } catch { toast.error("Failed to send. Please call us directly."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24">

      {/* Header */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Get in Touch</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4 leading-none">
            Let&apos;s build something<br /><span className="text-orange-400">together.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Whether you are a retailer looking for a reliable supply partner, a business seeking our FMCG catalogue, or a family considering Prakash Apartment — we would love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left column: contact info */}
          <div className="lg:col-span-2 space-y-5">

            {/* CEO Card */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-orange-500/30">PK</div>
                <div>
                  <div className="text-white font-bold font-display text-lg leading-tight">Mr. Prakash Kumar</div>
                  <div className="text-orange-400 text-xs mt-0.5">Founder & CEO, Prakash Agency</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-white/70 text-sm hover:text-orange-400 transition-colors">
                    <Phone className="w-4 h-4 text-orange-400 shrink-0" /> +91 98765 43210
                  </a>
                </li>
                <li>
                  <a href="mailto:ceo@prakashagency.com" className="flex items-center gap-3 text-white/70 text-sm hover:text-orange-400 transition-colors">
                    <Mail className="w-4 h-4 text-orange-400 shrink-0" /> ceo@prakashagency.com
                  </a>
                </li>
              </ul>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-5 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold hover:bg-green-500/20 transition-all">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </motion.div>

            {/* Office Details */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" /> Office details
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Prakash Nagar, Main Road,<br />Latehar, Jharkhand — 829206</span>
                </li>
                <li className="flex gap-3 text-white/60 text-sm">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex gap-3 text-white/60 text-sm">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>info@prakashagency.com</span>
                </li>
                <li className="flex gap-3 text-white/60 text-sm">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</span>
                </li>
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Quick links</p>
              <div className="space-y-2">
                {[["Browse our full product catalogue", "/products"], ["Explore Prakash Apartment", "/apartment"], ["Read our company story", "/about"]].map(([label, href]) => (
                  <a key={href} href={href} className="flex items-center gap-2 text-white/60 text-sm hover:text-orange-400 transition-colors group">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
              className="rounded-2xl overflow-hidden border border-white/[0.06] h-52">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57710.12345!2d84.4833!3d23.7449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e7e2ef7b9f123%3A0xabc!2sLatehar%2C+Jharkhand!5e0!3m2!1sen!2sin!4v1234"
                width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen loading="lazy" title="Prakash Agency Office" />
            </motion.div>
          </div>

          {/* Right column: form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-1">Send us a message</h2>
              <p className="text-white/40 text-sm mb-7">Fill in the form and one of our team members will respond within 24 hours. For urgent inquiries, please call or WhatsApp us directly.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">Your name *</label>
                    <input type="text" required placeholder="Rajesh Kumar" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-500/40 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">Email address *</label>
                    <input type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-500/40 transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">Phone number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-500/40 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">Inquiry type</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-orange-500/40 transition-colors appearance-none">
                      <option value="general" className="bg-zinc-900">General inquiry</option>
                      <option value="business" className="bg-zinc-900">Business partnership</option>
                      <option value="product" className="bg-zinc-900">Product inquiry</option>
                      <option value="apartment" className="bg-zinc-900">Apartment inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Subject *</label>
                  <input type="text" required placeholder="How can we help you?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-500/40 transition-colors" />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Your message *</label>
                  <textarea required rows={5} placeholder="Tell us more about your inquiry. The more detail you share, the better we can help." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-500/40 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0">
                  {submitting ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
                <p className="text-white/25 text-xs text-center">We typically respond within 24 hours on business days. For urgent matters, WhatsApp is fastest.</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
