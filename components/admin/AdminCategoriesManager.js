"use client";

import { useState } from "react";
import {
  Layers,
  PlusCircle,
  Tag,
  CheckCircle2,
  Trash2,
  Edit,
  Sparkles,
  Package,
  Wrench,
  Search,
  ArrowRight,
  ShieldCheck,
  Wifi,
  Tv,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_CATEGORIES } from "@/data/categoriesData";

export function AdminCategoriesManager({
  categories = INITIAL_CATEGORIES,
  onAddCategory,
  onOpenAddServiceModal,
  onShowToast,
}) {
  const [categoriesList, setCategoriesList] = useState(categories);
  const [searchQuery, setSearchQuery] = useState("");

  // Category Modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Form states
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      description: newCatDesc.trim() || "Main service category",
      icon: "Layers",
      count: 0,
    };

    setCategoriesList((prev) => [newCat, ...prev]);
    if (onAddCategory) onAddCategory(newCat);
    if (onShowToast) onShowToast(`Category "${newCat.name}" created successfully!`);

    setNewCatName("");
    setNewCatDesc("");
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (catId, catName) => {
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      setCategoriesList((prev) => prev.filter((c) => c.id !== catId));
      if (onShowToast) onShowToast(`Deleted category "${catName}"`);
    }
  };

  const filteredCategories = categoriesList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-emerald-200" />
              <span>Catalog & Category Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Technical Service Categories</h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
              Manage main technical service categories across Phidim & Panchthar. Doorstep service packages and certified technicians map directly to each category.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs shadow hover:bg-emerald-50 transition-all cursor-pointer hover:scale-102"
            >
              <PlusCircle size={16} />
              <span>+ Create Category</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search service categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {onOpenAddServiceModal && (
          <button
            onClick={onOpenAddServiceModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow cursor-pointer transition-all hover:scale-105"
          >
            <Wrench size={16} />
            <span>Add New Service Package</span>
          </button>
        )}
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shadow-inner">
                    <Layers size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400">
                      {cat.count || 0} Service Offerings
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-3 leading-relaxed">
                {cat.description || "Main Service Category"}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Active Category
              </span>

              {onOpenAddServiceModal && (
                <button
                  onClick={onOpenAddServiceModal}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <PlusCircle size={13} />
                  <span>+ Add Service</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CREATE CATEGORY MODAL */}
      <AnimatePresence>
        {showCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle size={18} className="text-emerald-500" />
                  <span>Create Category</span>
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CCTV & Security Systems"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief summary of services in this category..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow cursor-pointer"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
