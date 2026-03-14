"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { getGallery } from "@/lib/api";

const PLACEHOLDER_GALLERY = [
  { _id: "1", title: "Warehouse Operations", category: "warehouse", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
  { _id: "2", title: "Product Display", category: "products", imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" },
  { _id: "3", title: "Apartment Exterior", category: "apartment", imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
  { _id: "4", title: "Delivery Fleet", category: "operations", imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80" },
  { _id: "5", title: "FMCG Products", category: "products", imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80" },
  { _id: "6", title: "Apartment Interior", category: "apartment", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" },
  { _id: "7", title: "Business Operations", category: "operations", imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80" },
  { _id: "8", title: "Product Inventory", category: "warehouse", imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80" },
  { _id: "9", title: "Beverages Section", category: "products", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80" },
  { _id: "10", title: "Team at Work", category: "team", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { _id: "11", title: "Living Room", category: "apartment", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { _id: "12", title: "Storage Facility", category: "warehouse", imageUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&q=80" },
];

const CATS = ["all", "products", "warehouse", "operations", "apartment", "team"];

export default function GalleryPage() {
  const [images, setImages] = useState(PLACEHOLDER_GALLERY);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    getGallery().then(d => { if (d.data?.length > 0) setImages(d.data); }).catch(() => {});
  }, []);

  const filtered = filter === "all" ? images : images.filter(i => i.category === filter);

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our World</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-white/50 text-lg">A window into who we are — our products, our operations, our people, and our properties.</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filter === cat ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat === "all" ? "All Photos" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group relative rounded-2xl overflow-hidden break-inside-avoid cursor-pointer"
                onClick={() => setLightbox(img.imageUrl)}
              >
                <div className="relative aspect-auto">
                  <Image
                    src={img.imageUrl}
                    alt={img.title}
                    width={400}
                    height={i % 3 === 0 ? 500 : 350}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-semibold">{img.title}</p>
                    <span className="text-white/50 text-xs capitalize">{img.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full"
            >
              <Image src={lightbox} alt="Gallery" width={1200} height={800} className="rounded-2xl object-contain max-h-[85vh] w-auto mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
