"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, Package, Tag, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts, getCategories } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  unit: string;
  image: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  category: { _id: string; name: string; color: string; icon: string };
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    getCategories().then(d => setCategories(d.data || []));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "12" };
      if (selectedCat) params.category = selectedCat;
      if (debouncedSearch) params.search = debouncedSearch;
      const data = await getProducts(params);
      setProducts(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (e: unknown) {
      console.warn("Products API unavailable:", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCat, debouncedSearch]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => { setPage(1); }, [selectedCat, debouncedSearch]);

  const getImgSrc = (p: Product) => {
    if (p.imageUrl) return p.imageUrl;
    if (p.image) return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"}${p.image}`;
    return PLACEHOLDER;
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Catalogue</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">FMCG Products</h1>
          <p className="text-white/50 text-lg max-w-xl">500+ quality products from India&apos;s most trusted brands, delivered to your doorstep.</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-white/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500/40 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-white/40 hover:text-white" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-wrap">
            <button
              onClick={() => setSelectedCat("")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                !selectedCat ? "bg-orange-500/20 border border-orange-500/40 text-orange-400" : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              <Filter className="w-3 h-3" /> All
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => setSelectedCat(selectedCat === cat._id ? "" : cat._id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat._id ? "bg-orange-500/20 border border-orange-500/40 text-orange-400" : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
                <div className="h-48 bg-white/[0.05] animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/[0.05] rounded animate-pulse" />
                  <div className="h-3 bg-white/[0.03] rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-lg">No products found</p>
            <button onClick={() => { setSearch(""); setSelectedCat(""); }} className="mt-4 text-orange-400 text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/25 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-zinc-900">
                  <Image
                    src={getImgSrc(product)}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold">Featured</div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold">Out of Stock</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white/80 text-xs">
                      {product.category.icon} {product.category.name}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-1 leading-snug">{product.name}</h3>
                  {product.brand && (
                    <div className="flex items-center gap-1 text-white/40 text-xs mb-2">
                      <Tag className="w-3 h-3" /> {product.brand}
                    </div>
                  )}
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    {product.price ? (
                      <span className="text-orange-400 font-bold text-sm">₹{product.price} <span className="text-white/30 text-xs font-normal">/{product.unit}</span></span>
                    ) : (
                      <span className="text-white/30 text-xs">Price on request</span>
                    )}
                    <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-full border border-white/10 text-white/50 hover:border-orange-500/40 hover:text-orange-400 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                  page === n ? "bg-orange-500 text-white" : "border border-white/10 text-white/50 hover:border-orange-500/40 hover:text-orange-400"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-full border border-white/10 text-white/50 hover:border-orange-500/40 hover:text-orange-400 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
