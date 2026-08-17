"use client";

import { useState, useEffect } from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  Save,
  X,
  Check,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAnnouncements, setAnnouncements, subscribeAnnouncements } from "../AnnouncementBanner";

const COLOR_OPTIONS = [
  { value: "emerald", label: "Emerald Green", preview: "bg-gradient-to-r from-emerald-600 to-teal-600" },
  { value: "blue",    label: "Royal Blue",    preview: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  { value: "amber",   label: "Amber/Orange",  preview: "bg-gradient-to-r from-amber-500 to-orange-500" },
  { value: "rose",    label: "Rose/Pink",     preview: "bg-gradient-to-r from-rose-600 to-pink-600" },
  { value: "purple",  label: "Purple",        preview: "bg-gradient-to-r from-purple-600 to-violet-600" },
];

const blank = () => ({
  id: "ann-" + Date.now(),
  text: "",
  color: "emerald",
  active: true,
  link: "",
});

export function AnnouncementManager() {
  const [items, setItems] = useState(() => getAnnouncements());
  const [editing, setEditing] = useState(null); // id of item being edited
  const [draft, setDraft] = useState(null);     // draft copy of item
  const [showNew, setShowNew] = useState(false);
  const [newDraft, setNewDraft] = useState(blank());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = subscribeAnnouncements(setItems);
    return unsub;
  }, []);

  const publish = (list) => {
    setItems(list);
    setAnnouncements(list);
  };

  const handleToggle = (id) => {
    publish(items.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const handleDelete = (id) => {
    publish(items.filter((a) => a.id !== id));
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    const copy = [...items];
    [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
    publish(copy);
  };

  const handleMoveDown = (idx) => {
    if (idx === items.length - 1) return;
    const copy = [...items];
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    publish(copy);
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setDraft({ ...item });
  };

  const cancelEdit = () => { setEditing(null); setDraft(null); };

  const saveEdit = () => {
    if (!draft.text.trim()) return;
    publish(items.map((a) => (a.id === draft.id ? draft : a)));
    setEditing(null);
    setDraft(null);
    flashSaved();
  };

  const handleCreate = () => {
    if (!newDraft.text.trim()) return;
    publish([...items, { ...newDraft, id: "ann-" + Date.now() }]);
    setNewDraft(blank());
    setShowNew(false);
    flashSaved();
  };

  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3">
            <Megaphone size={26} />
            Announcement Banner Manager
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Publish scrolling announcements (offers, alerts, news) shown at the very top of the home page.
          </p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl text-xs font-extrabold border border-white/30"
          >
            <Check size={16} className="text-emerald-200" />
            Saved & Live
          </motion.div>
        )}
      </div>

      {/* Active count strip */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-black text-slate-900 dark:text-white">
            {items.filter((a) => a.active).length} Active
          </span>
          <span className="text-slate-400 font-semibold text-xs">/ {items.length} total</span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Changes go live instantly on the home page — no refresh needed.
        </span>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden transition-all ${
                item.active ? "border-emerald-200 dark:border-emerald-800/60" : "border-slate-200 dark:border-slate-800 opacity-60"
              }`}
            >
              {editing === item.id && draft ? (
                /* ─── Edit Mode ─── */
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Announcement Text</label>
                    <textarea
                      value={draft.text}
                      onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                      rows={2}
                      placeholder="e.g. 🎉 30% off all AC servicing this month! Book now in Phidim."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-1.5 flex-1 min-w-[200px]">
                      <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Optional Link URL</label>
                      <input
                        type="url"
                        value={draft.link}
                        onChange={(e) => setDraft({ ...draft, link: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Color Theme</label>
                      <div className="flex items-center gap-2">
                        {COLOR_OPTIONS.map((c) => (
                          <button
                            key={c.value}
                            onClick={() => setDraft({ ...draft, color: c.value })}
                            title={c.label}
                            className={`w-7 h-7 rounded-lg ${c.preview} transition-all cursor-pointer ${
                              draft.color === c.value ? "ring-2 ring-offset-2 ring-slate-600 scale-110" : "opacity-70 hover:opacity-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button onClick={saveEdit}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer">
                      <Save size={14} />
                      Save Changes
                    </button>
                    <button onClick={cancelEdit}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs transition-all cursor-pointer">
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── View Mode ─── */
                <div className="p-4 flex items-center gap-3 sm:gap-4">
                  {/* Color swatch */}
                  <div className={`w-3 h-10 rounded-full shrink-0 ${COLOR_OPTIONS.find((c) => c.value === item.color)?.preview || "bg-emerald-500"}`} />

                  {/* Text */}
                  <p className={`flex-1 text-sm font-semibold leading-snug ${item.active ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 line-through"}`}>
                    {item.text || <span className="italic text-slate-400">(empty)</span>}
                  </p>

                  {/* Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Move up/down */}
                    <button onClick={() => handleMoveUp(idx)} disabled={idx === 0}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-20 transition-colors cursor-pointer">
                      <ChevronUp size={15} />
                    </button>
                    <button onClick={() => handleMoveDown(idx)} disabled={idx === items.length - 1}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-20 transition-colors cursor-pointer">
                      <ChevronDown size={15} />
                    </button>

                    {/* Toggle active */}
                    <button onClick={() => handleToggle(item.id)}
                      title={item.active ? "Hide" : "Show"}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        item.active ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                      }`}>
                      {item.active ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>

                    {/* Edit */}
                    <button onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
                      <Edit3 size={15} />
                    </button>

                    {/* Delete */}
                    <button onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-center py-10 text-slate-400 dark:text-slate-500 font-medium text-sm">
            No announcements yet. Create your first one below!
          </div>
        )}
      </div>

      {/* ─── Create New Announcement ─── */}
      {showNew ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 p-6 shadow-sm space-y-4"
        >
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Plus size={16} className="text-emerald-500" />
            New Announcement
          </h4>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Announcement Text *</label>
            <textarea
              value={newDraft.text}
              onChange={(e) => setNewDraft({ ...newDraft, text: e.target.value })}
              rows={2}
              placeholder="e.g. 🎉 30% off on AC servicing this week! Limited slots available in Phidim."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Link URL (optional)</label>
              <input type="url" value={newDraft.link}
                onChange={(e) => setNewDraft({ ...newDraft, link: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Color Theme</label>
              <div className="flex items-center gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button key={c.value} onClick={() => setNewDraft({ ...newDraft, color: c.value })}
                    title={c.label}
                    className={`w-7 h-7 rounded-lg ${c.preview} transition-all cursor-pointer ${
                      newDraft.color === c.value ? "ring-2 ring-offset-2 ring-slate-600 scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button onClick={handleCreate}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer">
              <Megaphone size={14} />
              Publish Announcement
            </button>
            <button onClick={() => { setShowNew(false); setNewDraft(blank()); }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs transition-all cursor-pointer">
              <X size={14} />
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setShowNew(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add New Announcement
        </button>
      )}
    </div>
  );
}
