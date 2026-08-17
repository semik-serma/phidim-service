"use client";

import { useState } from "react";
import { X, FileText, Image as ImageIcon, Sparkles, Send, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

export function CreateArticleModal({ isOpen, onClose, onPublish }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AC & Cooling");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  );
  const [tags, setTags] = useState("Phidim, Maintenance, Technical");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) return;

    const newArticle = {
      id: "art-" + Date.now(),
      title: title.trim(),
      category,
      summary: summary.trim(),
      content: content.trim(),
      coverImage: coverImage.trim(),
      author: {
        id: user?.id || "usr-current",
        name: user?.displayName || user?.name || "Community Author",
        role: user?.role || "USER",
        specialty: user?.role === "ADMIN" ? "Platform Admin" : user?.role === "TECHNICIAN" ? "Certified Field Worker" : "Community Customer",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        followersCount: 1,
        isFollowingUser: true,
      },
      likes: 0,
      commentsCount: 0,
      createdAt: "Just now",
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (onPublish) onPublish(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-900 to-emerald-950 text-white border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Create & Publish Article</h3>
              <p className="text-xs text-slate-300">Share technical insights, maintenance tips, or community news</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How to Clean Solar Inverter Dust Filters in Panchthar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="AC & Cooling">AC & Cooling</option>
                <option value="Fiber & Networking">Fiber & Networking</option>
                <option value="CCTV & Security">CCTV & Security</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Community News">Community News</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="AC, Phidim, Cooling"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon size={16} className="text-emerald-500" />
              <span>Cover Image URL</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
              Short Summary *
            </label>
            <textarea
              required
              rows={2}
              placeholder="A brief 1-2 sentence overview of the article..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Detailed Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
              Full Article Content *
            </label>
            <textarea
              required
              rows={6}
              placeholder="Write your article details, step-by-step guides, or announcements here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <Send size={14} />
              <span>Publish Article</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
