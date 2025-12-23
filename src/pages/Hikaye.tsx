import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Map, BookOpen } from "lucide-react";

const storyContent = [
  {
    id: "giris",
    title: "Giriş",
    content: `Buraya hikayenin giriş bölümü gelecek. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    id: "bolum-1",
    title: "Bölüm 1: Başlangıç",
    content: `Buraya birinci bölüm gelecek. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
  },
  {
    id: "bolum-2",
    title: "Bölüm 2: Yolculuk",
    content: `Buraya ikinci bölüm gelecek. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`
  },
  {
    id: "bolum-3",
    title: "Bölüm 3: Keşif",
    content: `Buraya üçüncü bölüm gelecek. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`
  },
  {
    id: "son",
    title: "Son",
    content: `Buraya hikayenin son bölümü gelecek. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`
  }
];

const Hikaye = () => {
  const [activeTab, setActiveTab] = useState<"whimsical" | "hikaye">("whimsical");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("giris");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab !== "hikaye") return;

    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      // Find active section
      const sections = element.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        if (rect.top <= elementRect.top + 150) {
          setActiveSection(section.getAttribute("data-section") || "giris");
        }
      });
    };

    const element = contentRef.current;
    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Progress Bar */}
      {activeTab === "hikaye" && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("whimsical")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "whimsical"
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(136_82%_41%/0.4)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Map className="w-5 h-5" />
              Whimsical
            </button>
            <button
              onClick={() => setActiveTab("hikaye")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "hikaye"
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(136_82%_41%/0.4)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Hikaye
            </button>
          </div>

          {/* Whimsical Tab */}
          {activeTab === "whimsical" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center border border-border"
            >
              <p className="text-muted-foreground text-lg">
                Whimsical embed linki buraya eklenecek
              </p>
            </motion.div>
          )}

          {/* Story Tab */}
          {activeTab === "hikaye" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-8"
            >
              {/* Table of Contents - Left Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-28">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    İçindekiler
                  </h3>
                  <nav className="space-y-2">
                    {storyContent.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-primary/20 text-primary border-l-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Story Content */}
              <div
                ref={contentRef}
                className="flex-1 max-w-3xl mx-auto max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
              >
                {storyContent.map((section, index) => (
                  <section
                    key={section.id}
                    data-section={section.id}
                    className={`mb-16 ${index === 0 ? "" : "pt-8"}`}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-6 font-serif">
                      {section.title}
                    </h2>
                    <p className="text-foreground/80 leading-relaxed text-lg font-serif">
                      {section.content}
                    </p>
                  </section>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hikaye;
