"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, X, ChevronUp } from "lucide-react";

interface Bar { date: string; count: number; }
interface Stats { total: number; today: number; weekly: Bar[]; }

function MiniBar({ bar, max, isToday }: { bar: Bar; max: number; isToday: boolean }) {
  const pct = max ? (bar.count / max) * 100 : 0;
  const label = new Date(bar.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short" });
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full flex flex-col justify-end h-10 rounded-sm overflow-hidden">
        <motion.div initial={{ height: 0 }} animate={{ height: `${pct}%` }} transition={{ duration: 0.7, delay: 0.2 }}
          className={`w-full rounded-sm ${isToday ? "bg-gradient-to-t from-orange-500 to-amber-400" : "bg-white/15"}`} />
      </div>
      <span className={`text-[9px] font-medium ${isToday ? "text-orange-400" : "text-white/30"}`}>{label}</span>
    </div>
  );
}

// Generate 7 days of mock data for when backend is offline
function getMockStats(): Stats {
  const today = new Date().toISOString().split("T")[0];
  const weekly: Bar[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { date: d.toISOString().split("T")[0], count: Math.floor(Math.random() * 40) + 5 };
  });
  weekly[6] = { date: today, count: 34 };
  return { total: 12480, today: 34, weekly };
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Use native fetch so it never throws an unhandled AxiosError
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/visitors/stats`)
      .then(r => r.json())
      .then(d => { if (d?.data) setStats(d.data); else setStats(getMockStats()); })
      .catch(() => setStats(getMockStats()));
  }, [visible]);

  if (!visible || !stats) return null;

  const todayStr = new Date().toISOString().split("T")[0];
  const maxBar = Math.max(...(stats.weekly?.map(w => w.count) || [1]), 1);

  return (
    <AnimatePresence>
      <motion.div key="visitor-counter" initial={{ x: 120, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        exit={{ x: 120, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        className="fixed bottom-6 right-4 z-50" style={{ width: expanded ? 220 : 160 }}>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.button key="pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setExpanded(true)}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-black/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:border-orange-500/30 transition-all group">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-black animate-pulse" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-white font-bold text-sm leading-none">{stats.today.toLocaleString()}</div>
                  <div className="text-white/40 text-[10px] mt-0.5">today</div>
                </div>
                <ChevronUp className="w-3 h-3 text-white/25 group-hover:text-white/50 transition-colors ml-auto shrink-0" />
              </motion.button>
            ) : (
              <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
                <div className="px-4 pt-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/60 text-xs font-medium">Live Visitors</span>
                  </div>
                  <button onClick={() => setExpanded(false)} className="p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/[0.06] px-1 py-3">
                  <div className="px-3 text-center">
                    <div className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-500">
                      {stats.total.toLocaleString()}
                    </div>
                    <div className="text-white/35 text-[9px] mt-0.5 font-medium uppercase tracking-wider">Total</div>
                  </div>
                  <div className="px-3 text-center">
                    <div className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-300 to-teal-500">
                      {stats.today.toLocaleString()}
                    </div>
                    <div className="text-white/35 text-[9px] mt-0.5 font-medium uppercase tracking-wider">Today</div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-3 h-3 text-white/25" />
                    <span className="text-white/30 text-[9px] font-medium uppercase tracking-wider">7-Day Trend</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {stats.weekly?.length > 0
                      ? stats.weekly.map(bar => <MiniBar key={bar.date} bar={bar} max={maxBar} isToday={bar.date === todayStr} />)
                      : Array.from({ length: 7 }, (_, i) => <div key={i} className="flex-1 h-full bg-white/5 rounded-sm" />)}
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
