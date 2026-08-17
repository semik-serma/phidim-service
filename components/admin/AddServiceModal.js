"use client";

import { useState } from "react";
import {
  Wrench,
  Zap,
  ShieldCheck,
  Wifi,
  Wind,
  Tv,
  Droplet,
  Monitor,
  X,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICE_CATEGORIES } from "@/data/services";

export function AddServiceModal({ isOpen, onClose, onAddService }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Electrical & Inverter",
    basePrice: 1500,
    priceUnit: "per service visit",
    duration: "1-2 hours",
    warranty: "90 Days Service Warranty",
    description: "",
    emergencyDispatch: true,
    checklist: ["Comprehensive on-site technical inspection", "Official repair guarantee card provided"],
  });

  const [newChecklistItem, setNewChecklistItem] = useState("");

  if (!isOpen) return null;

  const handleAddChecklist = () => {
    if (!newChecklistItem.trim()) return;
    setFormData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, newChecklistItem.trim()],
    }));
    setNewChecklistItem("");
  };

  const handleRemoveChecklist = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a service name");
      return;
    }

    const serviceObj = {
      id: `srv-${Date.now()}`,
      ...formData,
      rating: 5.0,
      reviewCount: 1,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
    };

    if (onAddService) {
      onAddService(serviceObj);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-emerald-900/50 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 dark:text-white space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Wrench size={22} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">Add New Service / Technical Package</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Publish on-demand technical services for Phidim residents & businesses.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Service Title / Package Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Split AC Gas Refill & Complete Chemical Wash"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category & Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Service Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:border-emerald-500"
                >
                  {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Base Labor / Rate (NPR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-600">Rs.</span>
                  <input
                    type="number"
                    required
                    min="100"
                    step="50"
                    placeholder="1500"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Duration & Warranty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Estimated Completion Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1-2 hours / Same Day"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Service Warranty
                </label>
                <input
                  type="text"
                  placeholder="e.g. 90 Days Workmanship Guarantee"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Service Description */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Service Scope & Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe what technicians will perform during this service..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Checklist / Deliverables */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Technical Checklist Items
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add item e.g. Pre-service electrical test"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddChecklist();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddChecklist}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-xs"
                  >
                    <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChecklist(idx)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-transform"
              >
                Publish Service
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
