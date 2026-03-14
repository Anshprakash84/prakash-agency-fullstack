"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Bed, Shield, Zap, Car, Wifi, Camera, Phone, Mail, MapPin, Check, Send, Trees, Users } from "lucide-react";
import { getApartment, submitInquiry } from "@/lib/api";
import toast from "react-hot-toast";

const APT_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
];

const AMENITY_ICONS: Record<string, React.ElementType> = {
  "24/7 Security": Shield, "Power Backup": Zap, "Parking": Car,
  "Water Supply": Wifi, "Lift": Building2, "CCTV Surveillance": Camera,
  "Green Spaces": Trees, "Community Hall": Users,
};

const SELLING_POINTS = [
  {
    title: "Comfortable, modern living spaces",
    body: "Each apartment at Prakash Apartment is designed to maximise natural light, ventilation, and living space. With well-fitted kitchens, spacious bedrooms, and contemporary bathroom fixtures, our homes are built to the standard you deserve — without compromise.",
  },
  {
    title: "Prime, convenient location",
    body: "Situated on the main road in Latehar with easy access to schools, markets, medical facilities, and public transport. Everything your family needs is just minutes away — because a good home should also be a well-connected one.",
  },
  {
    title: "World-class facilities & 24/7 security",
    body: "CCTV surveillance, dedicated parking, continuous power backup, reliable water supply, a passenger lift, and professionally maintained common areas — because you deserve peace of mind as much as a peaceful home.",
  },
  {
    title: "A safe, welcoming community",
    body: "At Prakash Apartment, our residents are not just tenants — they are neighbours. We maintain a warm, respectful, and safe environment where families thrive, children grow, and everyone looks out for one another.",
  },
];

const TESTIMONIAL = {
  name: "Amit Singh", role: "Resident, Prakash Apartment",
  text: "We moved into Prakash Apartment six months ago and it has exceeded every expectation. The building is impeccably maintained, security is excellent, and the management team is genuinely responsive. It is rare to find a landlord who treats you like a valued guest. Highly recommended for any family looking for quality housing in Latehar.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ApartmentPage() {
  const [apt, setApt] = useState<Record<string, any> | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Apartment Inquiry", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { getApartment().then(d => setApt(d.data)).catch(() => setApt(null)); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({ ...form, type: "apartment" });
      toast.success("Inquiry sent! We'll contact you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "Apartment Inquiry", message: "" });
    } catch { toast.error("Failed to send. Please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24">

      {/* ── HERO ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Building2 className="w-3 h-3" /> A Prakash Agency Property
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-white mb-4 leading-none">
            Prakash<br /><span className="text-teal-400">Apartment</span>
          </h1>
          <p className="text-white/55 text-xl max-w-2xl leading-relaxed">
            Your next home is already waiting. Modern comfort, prime location, and a welcoming community — in the heart of Latehar, Jharkhand.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image src={APT_IMAGES[activeImg]} alt="Prakash Apartment" fill className="object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {APT_IMAGES.slice(1, 5).map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i + 1)} className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${activeImg === i + 1 ? "border-teal-400 shadow-lg shadow-teal-500/20" : "border-transparent hover:border-white/20"}`}>
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">

            {/* About the property */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-4">About the property</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Prakash Apartment is more than a residential complex — it is a thoughtfully designed community where modern comfort meets genuine hospitality. As a sister property of Prakash Agency, it reflects the same commitment to quality, reliability, and care that defines our business.
              </p>
              <p className="text-white/55 leading-relaxed">
                {apt?.description || "Located in a prime area of Latehar, Jharkhand, our property offers well-maintained 1, 2, and 3 BHK apartments with all the amenities a contemporary family needs — built to last, maintained with pride."}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[["5","Floors"],[String(apt?.totalUnits || 20),"Total Units"],["2005","Est. Year"]].map(([val, label]) => (
                  <div key={label} className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="font-display text-2xl font-bold text-teal-400">{val}</div>
                    <div className="text-white/40 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why choose Prakash Apartment */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-5">Why choose Prakash Apartment?</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {SELLING_POINTS.map((pt, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-500/15 border border-teal-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{pt.title}</div>
                      <p className="text-white/45 text-xs leading-relaxed">{pt.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-5">Facilities & amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(apt?.amenities || ["24/7 Security","Power Backup","Parking","Water Supply","Lift","CCTV Surveillance"]).map((a: string) => {
                  const Icon = AMENITY_ICONS[a] || Check;
                  return (
                    <div key={a} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-teal-500/20 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-teal-400" />
                      </div>
                      <span className="text-white/70 text-xs font-medium">{a}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Room Details */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
              className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-5">Room details & availability</h2>
              <div className="space-y-4">
                {(apt?.rooms || [
                  { type: "1 BHK", size: "550 sq ft", rent: 8000, available: true, description: "Cozy 1 bedroom with spacious hall, modern kitchen & attached bathroom. Ideal for couples." },
                  { type: "2 BHK", size: "850 sq ft", rent: 12000, available: true, description: "Spacious 2 bedroom apartment with large living room and modular kitchen. Perfect for small families." },
                  { type: "3 BHK", size: "1200 sq ft", rent: 18000, available: false, description: "Luxury 3 bedroom apartment with premium fittings, ample storage, and a dedicated study room." },
                ]).map((room: any, i: number) => (
                  <div key={i} className="flex items-start justify-between p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-teal-500/20 transition-all gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Bed className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{room.type}</div>
                        <div className="text-white/40 text-xs mt-0.5">{room.size}</div>
                        <p className="text-white/40 text-xs mt-2 leading-relaxed max-w-xs">{room.description}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-teal-400 font-bold text-base">₹{room.rent?.toLocaleString()}<span className="text-white/30 text-xs font-normal">/mo</span></div>
                      <div className={`text-xs mt-1.5 px-2.5 py-1 rounded-full inline-block ${room.available ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {room.available ? "Available" : "Occupied"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resident Testimonial */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}
              className="p-7 rounded-2xl bg-teal-500/5 border border-teal-500/15">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-teal-400 text-sm">★</span>)}
              </div>
              <p className="text-white/65 text-sm leading-relaxed italic mb-4">&ldquo;{TESTIMONIAL.text}&rdquo;</p>
              <div>
                <div className="text-white font-semibold text-sm">{TESTIMONIAL.name}</div>
                <div className="text-white/40 text-xs">{TESTIMONIAL.role}</div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="font-display text-lg font-bold text-white mb-4">Property contact</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-white/60 text-sm"><Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />{apt?.contactPhone || "+91 98765 43210"}</li>
                <li className="flex gap-3 text-white/60 text-sm"><Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />{apt?.contactEmail || "apartment@prakashagency.com"}</li>
                <li className="flex gap-3 text-white/60 text-sm"><MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />{apt?.address || "Prakash Nagar, Main Road, Latehar, Jharkhand — 829206"}</li>
              </ul>
            </div>

            {/* Inquiry form */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="font-display text-lg font-bold text-white mb-1">Send an inquiry</h3>
              <p className="text-white/40 text-xs mb-5">Fill in the form and we&apos;ll respond within 24 hours.</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { key: "name", placeholder: "Your full name", type: "text", required: true },
                  { key: "email", placeholder: "Email address", type: "email", required: true },
                  { key: "phone", placeholder: "Phone number (optional)", type: "tel", required: false },
                ].map(field => (
                  <input key={field.key} type={field.type} placeholder={field.placeholder} required={field.required}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/40 transition-colors" />
                ))}
                <textarea placeholder="Tell us which apartment type interests you and any questions you have..."
                  rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/40 transition-colors resize-none" />
                <button type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50">
                  {submitting ? "Sending..." : <><Send className="w-4 h-4" /> Send Inquiry</>}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-52">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57710.12345!2d84.4833!3d23.7449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e7e2ef7b9f123%3A0xabc!2sLatehar%2C+Jharkhand!5e0!3m2!1sen!2sin!4v1234"
                width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen loading="lazy" title="Prakash Apartment Location" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
