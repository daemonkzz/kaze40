import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Category = "all" | "update" | "news";

interface UpdateItem {
  id: number;
  title: string;
  category: "update" | "news";
  version?: string;
  date: string;
  image?: string;
}

const updates: UpdateItem[] = [
  {
    id: 1,
    title: "Yeni Sezon Başlangıcı - Büyük Güncelleme",
    category: "update",
    version: "v2.1.0",
    date: "23-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 2,
    title: "Kış Etkinliği Başladı! Özel Ödüller Sizi Bekliyor",
    category: "news",
    date: "21-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 3,
    title: "Sunucu Bakım Duyurusu",
    category: "update",
    version: "v2.0.5",
    date: "20-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 4,
    title: "Yeni Harita Eklendi: Kayıp Vadi",
    category: "news",
    date: "16-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 5,
    title: "Performans İyileştirmeleri ve Hata Düzeltmeleri",
    category: "update",
    version: "v2.0.4",
    date: "10-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 6,
    title: "Topluluk Turnuvası Duyurusu",
    category: "news",
    date: "09-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 7,
    title: "Yeni Karakter Sınıfı: Büyücü",
    category: "update",
    version: "v2.0.3",
    date: "05-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
  {
    id: 8,
    title: "Hafta Sonu Özel Etkinliği",
    category: "news",
    date: "01-12",
    image: "/lovable-uploads/dd368db9-058d-4606-b265-f0f7a4014bb6.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

const Guncellemeler = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUpdates = updates.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const totalPages = Math.ceil(filteredUpdates.length / ITEMS_PER_PAGE);
  const paginatedUpdates = filteredUpdates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: Category) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: "Son" },
    { key: "update", label: "Güncellemeler" },
    { key: "news", label: "Haberler" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              GÜNCELLEMELER
            </motion.h1>
            <motion.div
              className="h-1 w-32 bg-primary mt-3"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          {/* Filter Tabs */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`relative text-sm tracking-wider transition-colors ${
                  activeFilter === filter.key
                    ? "text-primary"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {activeFilter === filter.key && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute -left-2 -right-2 -top-1 -bottom-1 border border-primary"
                    style={{ borderRadius: 2 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Updates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {paginatedUpdates.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex gap-4 bg-card/30 border border-border/30 hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Görsel Yok</span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center py-3 pr-4 flex-1">
                  {/* Version Badge (if exists) */}
                  {item.version && (
                    <span className="text-[10px] text-primary/80 font-medium tracking-wider mb-1">
                      {item.version}
                    </span>
                  )}
                  
                  {/* Category Badge */}
                  <span className="inline-block w-fit text-[10px] uppercase tracking-wider px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 mb-2">
                    {item.category === "update" ? "Güncelleme" : "Haber"}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Date */}
                <div className="absolute bottom-3 right-4 text-xs text-foreground/40">
                  {item.date}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex items-center justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              PREV
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-2 h-2 transition-all ${
                    currentPage === page
                      ? "bg-primary w-6"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              NEXT
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Guncellemeler;
