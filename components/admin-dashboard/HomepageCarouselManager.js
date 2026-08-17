"use client";

import { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Save,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Edit3,
  Eye,
  RotateCcw,
  ShieldAlert,
  X
} from "lucide-react";
import {
  getHeroCarouselSlides,
  saveHeroCarouselSlides,
  resetHeroCarouselSlides,
  subscribeHeroCarouselSlides
} from "@/lib/heroCarouselStore";

const MAX_SLIDES = 4;

const emptySlide = (slotNumber = 1) => ({
  id: `hero-${Date.now()}-${slotNumber}`,
  image: "",
  subtitle: "PHIDIM SERVICE",
  title: "",
  description: "Professional doorstep technical solutions across Phidim & Panchthar.",
  buttonText: "Book Service",
  active: true,
});

export function HomepageCarouselManager({ onShowToast }) {
  const [slides, setSlides] = useState(() => getHeroCarouselSlides());
  const [draft, setDraft] = useState(() => emptySlide(1));
  const [editingId, setEditingId] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => subscribeHeroCarouselSlides(setSlides), []);

  const publish = (nextSlides) => {
    // Enforce max 4 slides limit
    const cappedSlides = nextSlides.slice(0, MAX_SLIDES);
    setSlides(cappedSlides);
    saveHeroCarouselSlides(cappedSlides);
  };

  const isMaxReached = slides.length >= MAX_SLIDES;

  const processImageFile = (file, callback) => {
    if (!file || !file.type.startsWith("image/")) {
      onShowToast?.("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const source = String(reader.result || "");
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          callback(source);
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg", 0.85));
      };
      image.onerror = () => callback(source);
      image.src = source;
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (files.length === 1) {
      processImageFile(files[0], (compressedUrl) => {
        setDraft((current) => ({ ...current, image: compressedUrl }));
      });
    } else {
      // Multiple files uploaded at once
      const remainingSlots = MAX_SLIDES - slides.length;
      if (remainingSlots <= 0) {
        onShowToast?.(`Maximum ${MAX_SLIDES} images allowed. Remove an existing image first.`);
        return;
      }

      const filesToProcess = files.slice(0, remainingSlots);
      let processedCount = 0;
      const newBatch = [];

      filesToProcess.forEach((file, index) => {
        processImageFile(file, (compressedUrl) => {
          newBatch.push({
            id: `hero-${Date.now()}-${index}`,
            image: compressedUrl,
            subtitle: "FEATURED CAMPAIGN",
            title: `Phidim Service Campaign ${slides.length + index + 1}`,
            description: "Expert doorstep repair and maintenance in Phidim, Panchthar.",
            buttonText: "Book Service",
            active: true,
          });
          processedCount++;
          if (processedCount === filesToProcess.length) {
            publish([...slides, ...newBatch]);
            onShowToast?.(`Uploaded ${newBatch.length} images to homepage carousel.`);
          }
        });
      });
    }
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();

    if (!draft.image.trim()) {
      onShowToast?.("Please upload an image or provide an Image URL.");
      return;
    }

    if (!draft.title.trim()) {
      onShowToast?.("Please enter a headline for the slide.");
      return;
    }

    if (editingId) {
      // Editing existing slide
      const updated = slides.map((s) => (s.id === editingId ? { ...draft, id: editingId } : s));
      publish(updated);
      setEditingId(null);
      setDraft(emptySlide(slides.length + 1));
      onShowToast?.("Homepage slide updated successfully.");
    } else {
      // Adding new slide
      if (slides.length >= MAX_SLIDES) {
        onShowToast?.(`Maximum ${MAX_SLIDES} images allowed. Remove one to add more.`);
        return;
      }

      publish([...slides, { ...draft, id: `hero-${Date.now()}`, active: true }]);
      setDraft(emptySlide(slides.length + 2));
      onShowToast?.(`Image published to homepage carousel (${slides.length + 1}/${MAX_SLIDES}).`);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEditSlide = (slide) => {
    setEditingId(slide.id);
    setDraft({ ...slide });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraft(emptySlide(slides.length + 1));
  };

  const handleDeleteSlide = (id) => {
    const next = slides.filter((s) => s.id !== id);
    publish(next);
    if (editingId === id) {
      setEditingId(null);
      setDraft(emptySlide(next.length + 1));
    }
    onShowToast?.("Homepage carousel slide removed.");
  };

  const handleResetToDefaults = () => {
    resetHeroCarouselSlides();
    setSlides([]);
    setEditingId(null);
    setDraft(emptySlide(1));
    setShowResetConfirm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onShowToast?.("Homepage carousel has been reset to official default banners!");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-[28px] bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-3.5 text-emerald-300 backdrop-blur-md">
              <ImagePlus size={26} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-1 border border-emerald-500/30">
                <Sparkles size={12} />
                <span>Homepage Hero Rotation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Homepage Carousel Images</h2>
              <p className="mt-1 text-xs sm:text-sm text-emerald-100 font-medium">
                Upload <strong>up to a maximum of 4 images</strong> for the homepage carousel. You can add 1, 2, 3, or 4 images.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Reset to Default Button */}
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-sm hover:scale-102"
              title="Reset all carousel images to official defaults"
            >
              <RotateCcw size={14} className="text-rose-300" />
              <span>Reset to Defaults</span>
            </button>

            {/* Slot Counter Pill */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-emerald-500/30 px-4 py-2 rounded-2xl backdrop-blur-md">
              <Layers size={18} className="text-emerald-400" />
              <div>
                <span className="text-[9px] font-extrabold uppercase text-slate-400 block leading-tight">Active Slots</span>
                <span className="text-xs font-black text-white font-mono">
                  {slides.length} / {MAX_SLIDES} Max Images
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Image Slots Visual Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((slotNumber) => {
          const slide = slides[slotNumber - 1];
          const isFilled = Boolean(slide);

          return (
            <div
              key={slotNumber}
              className={`rounded-2xl p-3.5 border transition-all ${
                isFilled
                  ? "bg-white dark:bg-slate-900 border-emerald-500/40 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300">
                  Slot #{slotNumber}
                </span>
                <span
                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isFilled
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {isFilled ? "Active" : "Empty"}
                </span>
              </div>

              {isFilled ? (
                <div className="relative h-20 w-full rounded-xl overflow-hidden group">
                  <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditSlide(slide)}
                      className="p-1.5 bg-white text-slate-900 rounded-lg shadow hover:bg-emerald-50 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-500 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => !isMaxReached && fileInputRef.current?.click()}
                  className="h-20 w-full rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors"
                >
                  <Upload size={18} />
                  <span className="text-[10px] font-bold mt-1">+ Upload Image</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Slide Upload & Editor Form */}
        <form
          onSubmit={handleSaveSlide}
          className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ImagePlus size={18} className="text-emerald-600" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {editingId ? "Edit Carousel Slide" : "Upload Homepage Image"}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              Max {MAX_SLIDES} Images ({slides.length}/{MAX_SLIDES})
            </span>
          </div>

          {isMaxReached && !editingId && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2 font-medium">
              <AlertCircle size={16} className="shrink-0 text-amber-500" />
              <span>
                <strong>Maximum 4 images reached.</strong> To upload a different image, delete or edit an existing slide below.
              </span>
            </div>
          )}

          <div className="space-y-3.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFile}
              className="hidden"
            />

            {/* Upload Box */}
            <button
              type="button"
              disabled={isMaxReached && !editingId && !draft.image}
              onClick={() => fileInputRef.current?.click()}
              className={`flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors ${
                draft.image
                  ? "border-emerald-500 bg-emerald-50/20"
                  : isMaxReached && !editingId
                  ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "border-emerald-200 bg-emerald-50/60 text-emerald-700 hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300 cursor-pointer"
              }`}
            >
              {draft.image ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden">
                  <img
                    src={draft.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
                    Click to Change Image
                  </span>
                </div>
              ) : (
                <>
                  <Upload size={24} />
                  <span className="text-xs font-black">
                    {isMaxReached && !editingId
                      ? "Maximum 4 Images Uploaded"
                      : "Upload Campaign Image (Up to 4 Max)"}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    JPG, PNG, WebP • Auto-optimized for desktop & mobile
                  </span>
                </>
              )}
            </button>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Or Image URL
              </label>
              <input
                value={draft.image}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Slide Headline *
                </label>
                <input
                  required
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="e.g. 50% Off AC Servicing"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tag / Subtitle
                </label>
                <input
                  value={draft.subtitle}
                  onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                  placeholder="e.g. SPECIAL OFFER"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold uppercase outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Brief summary of the campaign..."
                rows={2}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={isMaxReached && !editingId}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black text-white shadow-lg transition-all cursor-pointer ${
                  isMaxReached && !editingId
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20 hover:scale-102"
                }`}
              >
                <Save size={15} />
                <span>{editingId ? "Update Slide" : "Publish to Homepage (Max 4)"}</span>
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-xl px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Published Slides List (Max 4) */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Eye size={18} className="text-emerald-600" />
              <span>Live Homepage Images</span>
            </h3>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {slides.length} of {MAX_SLIDES} Slots
              </span>

              {slides.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Emergency Reset to Defaults"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="flex items-center gap-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 p-3 hover:border-emerald-500/40 transition-colors group bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="relative h-18 w-24 rounded-xl overflow-hidden shrink-0 border border-black/10">
                  <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                  <span className="absolute top-1 left-1 bg-slate-950/80 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block truncate">
                    {slide.subtitle || `SLOT ${idx + 1}`}
                  </span>
                  <p className="truncate text-xs font-black text-slate-900 dark:text-white">
                    {slide.title}
                  </p>
                  <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {slide.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEditSlide(slide)}
                    className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                    title="Edit slide"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    title="Delete slide"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            {slides.length === 0 && (
              <div className="rounded-2xl bg-slate-50 p-8 text-center text-xs font-medium text-slate-500 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <ImagePlus size={32} className="mx-auto text-slate-400" />
                <p className="font-bold text-slate-700 dark:text-slate-300">
                  Currently running on official default service banners.
                </p>
                <p className="text-[11px]">
                  You can upload 1 to 4 custom images above whenever you wish.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EMERGENCY RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50">
                  <ShieldAlert size={20} />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Reset Carousel to Defaults?
                </h3>
              </div>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to reset the homepage carousel? This will <strong>immediately remove all custom uploaded images</strong> and restore the clean, verified default Phidim Service banners on the homepage.
            </p>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300 font-semibold flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span>Use this if accidental or incorrect images were published.</span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Yes, Reset Carousel Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
