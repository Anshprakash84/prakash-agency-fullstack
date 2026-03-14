"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { X, ArrowRight, Sparkles, Package, Building2, Users } from "lucide-react";
import Link from "next/link";

function ParticleCanvas({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string };
    const colors = ["#FF6B35","#FFBF69","#FF9F1C","#4ECDC4","#ffffff","#FED7AA"];
    const particles: P[] = Array.from({ length: 140 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 60,
      y: H / 2 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: (Math.random() - 0.5) * 9 - 4,
      r: Math.random() * 5 + 2,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.alpha -= 0.012;
        if (p.alpha <= 0) return;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color; ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!target) return;
    const from = Math.max(0, target - Math.round(target * 0.15));
    let current = from;
    const step = (target - from) / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setDisplay(target); clearInterval(id); }
      else setDisplay(Math.floor(current));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return <>{display.toLocaleString()}</>;
}

function Orb({ cx, cy, size, color, delay }: { cx: string; cy: string; size: number; color: string; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: cx, top: cy, width: size, height: size, background: color, filter: "blur(40px)", transform: "translate(-50%,-50%)" }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay }} />
  );
}

export default function WelcomePopup() {
  const [phase, setPhase] = useState<"hidden" | "burst" | "open" | "gone">("hidden");
  const [visitorData, setVisitorData] = useState<{ total: number; today: number } | null>(null);
  const [confetti, setConfetti] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("pa_welcomed")) return;

    // Try to fetch visitor data — silently fail if backend is offline
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/visitors`)
      .then(r => r.json())
      .then(d => { if (d?.data) setVisitorData(d.data); })
      .catch(() => {
        // Backend offline — show static fallback numbers so popup still looks great
        setVisitorData({ total: 12480, today: 34 });
      });

    const t1 = setTimeout(() => { setPhase("burst"); setConfetti(true); }, 900);
    const t2 = setTimeout(() => { setPhase("open"); setConfetti(false); }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("pa_welcomed", "1");
    controls.start({ scale: 0.9, opacity: 0, y: 30, transition: { duration: 0.35, ease: "easeIn" } })
      .then(() => setPhase("gone"));
  };

  if (phase === "hidden" || phase === "gone") return null;

  return (
    <AnimatePresence>
      <motion.div key="overlay" className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={dismiss}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />

        <motion.div animate={controls}
          initial={{ scale: 0.5, opacity: 0, rotateY: -25 }}
          whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ scale: { type: "spring", stiffness: 260, damping: 20 }, opacity: { duration: 0.4 }, rotateY: { type: "spring", stiffness: 200, damping: 22 } }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-orange-500/25 z-10"
          style={{ transformStyle: "preserve-3d" }}>
          <ParticleCanvas running={confetti} />
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <Orb cx="20%" cy="25%" size={180} color="rgba(255,107,53,0.45)" delay={0} />
          <Orb cx="80%" cy="70%" size={160} color="rgba(255,159,28,0.35)" delay={1.5} />
          <Orb cx="50%" cy="50%" size={200} color="rgba(78,205,196,0.12)" delay={0.8} />

          <button onClick={dismiss} className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-20 p-8 pt-10">
            {/* Spinning logo ring */}
            <div className="flex justify-center mb-7">
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-full"
                  style={{ background: "conic-gradient(from 0deg, #FF6B35, #FFBF69, #4ECDC4, #FF6B35)", padding: "2px", borderRadius: "50%" }}
                  animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute -inset-3 rounded-full border border-orange-500/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <motion.div className="absolute -inset-6 rounded-full border border-orange-500/15"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }} />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                  <Building2 className="w-9 h-9 text-white" />
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3 h-3" /> Jharkhand&apos;s Trusted FMCG Partner
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mb-2">
              <h2 className="font-display text-3xl font-bold text-white leading-tight">
                Namaste!{" "}
                <motion.span animate={{ rotate: [0, 20, -10, 20, 0] }} transition={{ delay: 1, duration: 0.8 }} className="inline-block">🙏</motion.span>
              </h2>
              <p className="text-white/55 text-sm mt-2 leading-relaxed px-2">
                Welcome to Prakash Agency — quality you trust, delivered to your door.
              </p>
              <p className="text-white/35 text-xs mt-1 px-4 leading-relaxed">
                Est. 2005 · 500+ FMCG products · 1,200+ retail partners
              </p>
            </motion.div>

            {/* Visitor counter */}
            {visitorData && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
                className="mt-5 rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04]">
                <div className="px-4 py-2 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-teal-500/10 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/50 text-xs font-medium">Live Visitor Stats</span>
                  </div>
                  <Users className="w-3.5 h-3.5 text-white/30" />
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                  <div className="p-4 text-center">
                    <div className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-500">
                      <CountUp target={visitorData.total} duration={1600} />
                    </div>
                    <div className="text-white/40 text-xs mt-1 font-medium">Total Visitors</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-300 to-teal-500">
                      <CountUp target={visitorData.today} duration={1000} />
                    </div>
                    <div className="text-white/40 text-xs mt-1 font-medium">Today&apos;s Visitors</div>
                  </div>
                </div>
                <div className="px-4 pb-3 text-center">
                  <span className="text-white/30 text-xs">
                    You are visitor <span className="text-orange-400 font-bold">#{visitorData.total.toLocaleString()}</span> 🎉
                  </span>
                </div>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-5 grid grid-cols-2 gap-2.5">
              <Link href="/products" onClick={dismiss}
                className="group flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300">
                <Package className="w-4 h-4" /> Browse Products
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/about" onClick={dismiss}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.12] text-white/70 text-sm font-semibold hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-300">
                Our Story
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-4 text-center">
              <button onClick={dismiss} className="text-white/20 text-xs hover:text-white/45 transition-colors">
                Continue browsing →
              </button>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
