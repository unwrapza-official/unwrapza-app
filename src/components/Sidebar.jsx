import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, onClose, categories = [], headerHeight = 0 }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // voor zekerheid op mobile Safari
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔳 Donkere overlay (onder de header) */}
          <motion.div
            className="fixed left-0 right-0 bottom-0 bg-black/40 z-40 md:hidden"
            style={{ top: `${headerHeight}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🧭 Sidebar-panel */}
          <motion.aside
            className="fixed left-0 w-full sm:w-2/3 bg-white z-50 shadow-2xl flex flex-col md:hidden"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100vh - ${headerHeight}px)`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg text-[#44A77D] font-semibold italic">Unwrapza Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6 text-[#44A77D]" />
              </button>
            </div>

            {/* Categorieën */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {categories.length > 0 ? (
                <ul className="space-y-3">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <button
                        className="w-full text-left text-lg text-gray-800 font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition"
                        onClick={() => {
                          console.log(`Clicked ${cat}`);
                          onClose();
                        }}
                      >
                        {cat}
                        <div className="w-full h-[1px] bg-gray-200 mt-2"></div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No categories available.</p>
              )}
            </nav>

            {/* Footer */}
            <div className="p-5 border-t border-gray-200 text-sm text-gray-500 text-center">
              <p>© {new Date().getFullYear()} Unwrapza</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
