"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, MessageSquare, Building2, LogOut, LayoutDashboard, TrendingUp, Users, Bell, ExternalLink, Eye } from "lucide-react";
import { getProducts, getInquiries, getCategories, getVisitorStats } from "@/lib/api";
import toast from "react-hot-toast";

interface WeekBar { date: string; count: number; }

function AdminMiniChart({ weekly }: { weekly: WeekBar[] }) {
  const max = Math.max(...weekly.map(w => w.count), 1);
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="flex items-end gap-1 h-10 mt-3">
      {weekly.map(bar => {
        const pct = (bar.count / max) * 100;
        const isToday = bar.date === today;
        const label = new Date(bar.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short" });
        return (
          <div key={bar.date} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col justify-end h-8">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`w-full rounded-sm ${isToday ? "bg-orange-500" : "bg-white/15"}`}
              />
            </div>
            <span className={`text-[8px] ${isToday ? "text-orange-400" : "text-white/25"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, inquiries: 0, categories: 0, newInquiries: 0 });
  const [visitorStats, setVisitorStats] = useState<{ total: number; today: number; weekly: WeekBar[] } | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const u = localStorage.getItem("admin_user");
    if (!token) { router.push("/admin/login"); return; }
    if (u) setUser(JSON.parse(u));
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const [prod, inq, cats, vis] = await Promise.all([
        getProducts({ limit: "1" }),
        getInquiries({ limit: "5" }),
        getCategories(),
        getVisitorStats().catch(() => null),
      ]);
      setStats({
        products: prod.total || 0,
        inquiries: inq.total || 0,
        categories: cats.data?.length || 0,
        newInquiries: inq.data?.filter((i: any) => i.status === "new").length || 0,
      });
      setRecentInquiries(inq.data || []);
      if (vis?.data) setVisitorStats(vis.data);
    } catch { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  };

  const STAT_CARDS = [
    { label: "Total Products", value: stats.products, icon: Package, color: "orange", href: "/admin/products" },
    { label: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "blue", href: "/admin/inquiries" },
    { label: "Categories", value: stats.categories, icon: TrendingUp, color: "purple", href: "/admin/products" },
    { label: "New Inquiries", value: stats.newInquiries, icon: Bell, color: "green", href: "/admin/inquiries" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/[0.06] flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-display text-white font-bold text-sm">Prakash Agency</div>
              <div className="text-white/40 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin/products", icon: Package, label: "Products" },
            { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${item.href === "/admin/dashboard" ? "bg-orange-500/10 border border-orange-500/20 text-orange-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/[0.06] mt-4">
            <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm">
              <ExternalLink className="w-4 h-4" /> View Website
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">{user?.name || "Admin"}</div>
              <div className="text-white/40 text-xs truncate">{user?.email || ""}</div>
            </div>
          </div>
          <button onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-white/40 text-sm">Welcome back, {user?.name || "Admin"}</p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STAT_CARDS.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link href={card.href} className="block p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.05] transition-all group">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    card.color === "orange" ? "bg-orange-500/10" : card.color === "blue" ? "bg-blue-500/10" :
                    card.color === "purple" ? "bg-purple-500/10" : "bg-green-500/10"
                  }`}>
                    <card.icon className={`w-4 h-4 ${
                      card.color === "orange" ? "text-orange-400" : card.color === "blue" ? "text-blue-400" :
                      card.color === "purple" ? "text-purple-400" : "text-green-400"
                    }`} />
                  </div>
                  <div className="font-display text-3xl font-bold text-white">{loading ? "—" : card.value}</div>
                  <div className="text-white/40 text-xs mt-1">{card.label}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Visitor stats card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden mb-6">
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-base">Visitor Analytics</h2>
                  <p className="text-white/35 text-xs mt-0.5">Live traffic overview</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/30 text-xs">Live</span>
              </div>
            </div>
            <div className="p-6">
              {!visitorStats ? (
                <div className="h-20 bg-white/[0.03] rounded-xl animate-pulse" />
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Total Visitors</div>
                    <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-500">
                      {visitorStats.total.toLocaleString()}
                    </div>
                    <div className="text-white/25 text-xs mt-1">All time</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Today</div>
                    <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-300 to-teal-500">
                      {visitorStats.today.toLocaleString()}
                    </div>
                    <div className="text-white/25 text-xs mt-1">Unique sessions</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">7-Day Trend</div>
                    {visitorStats.weekly?.length > 0 && (
                      <AdminMiniChart weekly={visitorStats.weekly} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Inquiries */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="font-display font-bold text-white text-lg">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-orange-400 text-xs hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 flex gap-4 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-white/[0.05] rounded w-1/3" />
                      <div className="h-2 bg-white/[0.03] rounded w-2/3" />
                    </div>
                  </div>
                ))
              ) : recentInquiries.length === 0 ? (
                <div className="p-8 text-center text-white/30 text-sm">No inquiries yet</div>
              ) : recentInquiries.map(inq => (
                <div key={inq._id} className="p-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <span className="text-orange-400 text-xs font-bold">{inq.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-sm font-medium">{inq.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        inq.status === "new" ? "bg-green-500/15 text-green-400" :
                        inq.status === "read" ? "bg-blue-500/15 text-blue-400" : "bg-white/10 text-white/40"
                      }`}>{inq.status}</span>
                    </div>
                    <p className="text-white/40 text-xs truncate">{inq.subject}</p>
                  </div>
                  <span className="text-white/25 text-xs whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
