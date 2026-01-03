import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, categories = [], headerHeight = 0 }) => {
  
  // 🧊 Lock scroll en bewaar positie
  useEffect(() => {
    if (isOpen) {
      const currentScrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollYString = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollYString || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔳 Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            style={{ top: `${headerHeight}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🧭 Sidebar-panel (100% breedte behouden) */}
          <motion.aside
            className="fixed left-0 w-full bg-white z-50 shadow-2xl flex flex-col md:hidden"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100vh - ${headerHeight}px)`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#44A77D]">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Categorieën */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {categories.length > 0 ? (
                <ul className="space-y-1">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <Link 
                        to={cat.path} 
                        onClick={onClose}
                        className="group flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          {/* Image box voor betere uitlijning */}
                          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                            <img
                              className="w-9 h-9 object-contain"
                              src={cat.image}
                              alt={cat.name}
                            />
                          </div>

                          <span className="text-[17px] text-gray-800 font-extrabold group-hover:text-[#44A77D] transition-colors">
                            {cat.name}
                          </span>
                        </div>
                        
                        {/* Subtiel pijltje voor de 'smooth' factor */}
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#44A77D] group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm text-center mt-10">
                  Geen categorieën gevonden.
                </p>
              )}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                © {new Date().getFullYear()} Unwrapza
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;