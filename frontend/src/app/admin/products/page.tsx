"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Package, LayoutDashboard, MessageSquare, Building2, LogOut, ExternalLink, X, Check } from "lucide-react";
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from "@/lib/api";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product?: any }>({ open: false });
  const [form, setForm] = useState<any>({ name: "", description: "", category: "", price: "", unit: "piece", brand: "", inStock: true, featured: false });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }
    loadAll();
  }, [router]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([getProducts({ limit: "100" }), getCategories()]);
      setProducts(p.data || []);
      setCategories(c.data || []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  const openAdd = () => {
    setForm({ name: "", description: "", category: categories[0]?._id || "", price: "", unit: "piece", brand: "", inStock: true, featured: false });
    setImageFile(null);
    setModal({ open: true });
  };

  const openEdit = (p: any) => {
    setForm({ name: p.name, description: p.description, category: p.category?._id || "", price: p.price || "", unit: p.unit || "piece", brand: p.brand || "", inStock: p.inStock, featured: p.featured });
    setImageFile(null);
    setModal({ open: true, product: p });
  };

  const handleSave = async () => {
    if (!form.name || !form.description || !form.category) { toast.error("Fill required fields"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (imageFile) fd.append("image", imageFile);
      if (modal.product) await updateProduct(modal.product._id, fd);
      else await createProduct(fd);
      toast.success(modal.product ? "Product updated" : "Product created");
      setModal({ open: false });
      loadAll();
    } catch { toast.error("Save failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Deleted");
      loadAll();
    } catch { toast.error("Delete failed"); }
  };

  const getImg = (p: any) => p.imageUrl || (p.image ? `${API_BASE}${p.image}` : null);

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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${item.href === "/admin/products" ? "bg-orange-500/10 border border-orange-500/20 text-orange-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
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
              <h1 className="font-display text-3xl font-bold text-white">Products</h1>
              <p className="text-white/40 text-sm mt-1">{products.length} products in catalogue</p>
            </div>
            <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-white/[0.03] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(p => (
                <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:border-orange-500/20 transition-all group">
                  <div className="relative h-36 bg-zinc-900">
                    {getImg(p) ? (
                      <Image src={getImg(p)!} alt={p.name} fill className="object-cover opacity-80" onError={e => { (e.target as HTMLImageElement).src = ""; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10"><Package className="w-10 h-10" /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"><Pencil className="w-3 h-3" /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg bg-red-500/20 backdrop-blur text-red-400 hover:bg-red-500/30 transition-colors"><Trash2 className="w-3 h-3" /></button>
                    </div>
                    {p.featured && <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-orange-500/90 text-white text-xs font-bold">Featured</div>}
                  </div>
                  <div className="p-3">
                    <div className="text-white text-sm font-semibold leading-snug mb-0.5 truncate">{p.name}</div>
                    <div className="text-white/40 text-xs">{p.brand && `${p.brand} · `}{p.category?.name}</div>
                    {p.price && <div className="text-orange-400 text-sm font-bold mt-1">₹{p.price}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-display font-bold text-white">{modal.product ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setModal({ open: false })} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              {[
                { key: "name", label: "Product Name *", type: "text" },
                { key: "brand", label: "Brand", type: "text" },
                { key: "price", label: "Price (₹)", type: "number" },
                { key: "unit", label: "Unit", type: "text" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-white/50 text-xs mb-1 block">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm((x: any) => ({ ...x, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-orange-500/40" />
                </div>
              ))}
              <div>
                <label className="text-white/50 text-xs mb-1 block">Category *</label>
                <select value={form.category} onChange={e => setForm((x: any) => ({ ...x, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-orange-500/40">
                  {categories.map(c => <option key={c._id} value={c._id} className="bg-zinc-900">{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Description *</label>
                <textarea rows={3} value={form.description} onChange={e => setForm((x: any) => ({ ...x, description: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-orange-500/40 resize-none" />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-white/60 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm((x: any) => ({ ...x, featured: e.target.checked }))} className="rounded" />
                  <span className="text-white/60 text-xs">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={e => setForm((x: any) => ({ ...x, inStock: e.target.checked }))} className="rounded" />
                  <span className="text-white/60 text-xs">In Stock</span>
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-white/[0.06] flex gap-3">
              <button onClick={() => setModal({ open: false })} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:border-white/20 hover:text-white transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
