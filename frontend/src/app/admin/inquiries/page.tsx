"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, MessageSquare, Building2, LogOut, ExternalLink, Trash2, Eye, Filter } from "lucide-react";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminInquiries() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }
    loadInquiries();
  }, [router, filter]);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: "50" };
      if (filter) params.status = filter;
      const data = await getInquiries(params);
      setInquiries(data.data || []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  const markStatus = async (id: string, status: string) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i));
      if (selected?._id === id) setSelected((s: any) => ({ ...s, status }));
      toast.success("Status updated");
    } catch { toast.error("Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await deleteInquiry(id);
      setInquiries(prev => prev.filter(i => i._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Deleted");
    } catch { toast.error("Failed"); }
  };

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-green-500/15 text-green-400 border-green-500/20",
    read: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    replied: "bg-white/10 text-white/50 border-white/10",
  };

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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${item.href === "/admin/inquiries" ? "bg-orange-500/10 border border-orange-500/20 text-orange-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
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
          <button onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Inquiries</h1>
              <p className="text-white/40 text-sm mt-1">{inquiries.length} total messages</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/30" />
              {["", "new", "read", "replied"].map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === s ? "bg-orange-500/20 border border-orange-500/40 text-orange-400" : "border border-white/10 text-white/40 hover:text-white/70"}`}>
                  {s || "All"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-5">
            {/* List */}
            <div className="lg:col-span-2 space-y-2">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/[0.03] animate-pulse" />)
              ) : inquiries.length === 0 ? (
                <div className="text-center py-16 text-white/30 text-sm">No inquiries found</div>
              ) : inquiries.map(inq => (
                <motion.div key={inq._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => { setSelected(inq); if (inq.status === "new") markStatus(inq._id, "read"); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?._id === inq._id ? "bg-orange-500/10 border-orange-500/30" : "bg-white/[0.02] border-white/[0.05] hover:border-white/10 hover:bg-white/[0.04]"}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-white text-sm font-semibold truncate">{inq.name}</span>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[inq.status] || ""}`}>{inq.status}</span>
                  </div>
                  <p className="text-white/50 text-xs truncate">{inq.subject}</p>
                  <p className="text-white/30 text-xs mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
                </motion.div>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-3">
              {selected ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                  <div className="p-5 border-b border-white/[0.06] flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{selected.subject}</h3>
                      <p className="text-white/40 text-xs mt-1">{selected.type} inquiry</p>
                    </div>
                    <button onClick={() => handleDelete(selected._id)} className="p-2 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="p-3 rounded-xl bg-white/[0.03]">
                        <div className="text-white/30 text-xs mb-0.5">From</div>
                        <div className="text-white text-sm font-medium">{selected.name}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03]">
                        <div className="text-white/30 text-xs mb-0.5">Email</div>
                        <div className="text-white text-sm">{selected.email}</div>
                      </div>
                      {selected.phone && (
                        <div className="p-3 rounded-xl bg-white/[0.03]">
                          <div className="text-white/30 text-xs mb-0.5">Phone</div>
                          <div className="text-white text-sm">{selected.phone}</div>
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-white/[0.03]">
                        <div className="text-white/30 text-xs mb-0.5">Received</div>
                        <div className="text-white text-sm">{new Date(selected.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] mb-5">
                      <div className="text-white/40 text-xs mb-2">Message</div>
                      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {["new", "read", "replied"].map(s => (
                        <button key={s} onClick={() => markStatus(selected._id, s)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${selected.status === s ? STATUS_COLORS[s] : "border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                          {s}
                        </button>
                      ))}
                      <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-all">
                        <Eye className="w-3 h-3" /> Reply
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-64 text-white/20 text-sm">
                  <div className="text-center">
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    Select an inquiry to view details
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
