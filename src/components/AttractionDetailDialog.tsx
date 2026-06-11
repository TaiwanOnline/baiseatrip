import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Compass, Check, HelpCircle, Footprints, Flame, Layers } from "lucide-react";
import { Attraction } from "../types";

interface AttractionDetailDialogProps {
  attraction: Attraction | null;
  onClose: () => void;
}

export default function AttractionDetailDialog({ attraction, onClose }: AttractionDetailDialogProps) {
  const [showTips, setShowTips] = useState(false);

  if (!attraction) return null;

  const handleAlert = () => {
    alert("感謝您的收藏！在實體行動裝置將會開啟 Google Maps 直接為您規律路線。");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-surface w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Hero Banner inside dialog */}
          <div className="h-56 relative bg-surface-container-high">
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="bg-tertiary-container text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block self-start mb-1">
                {attraction.category}
              </span>
              <h4 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">
                {attraction.name}
              </h4>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {attraction.description}
              </p>
            </div>

            {/* Practical metadata */}
            <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 text-xs text-on-surface-variant">
              <div>
                <span className="font-semibold block text-on-surface mb-0.5">交通距離</span>
                {attraction.distance}
              </div>
              <div>
                <span className="font-semibold block text-on-surface mb-0.5">預估停留時長</span>
                {attraction.duration}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <span className="font-semibold text-sm text-on-surface block font-serif flex items-center gap-1.5">
                <Compass className="size-4 text-primary" />
                景點核心亮点
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {attraction.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-on-surface-variant">
                    <Check className="size-3.5 text-emerald-600 font-bold shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Route description */}
            <div className="pt-3 border-t border-outline-variant/30 space-y-2">
              <span className="font-semibold text-sm text-on-surface block font-serif flex items-center gap-1.5">
                <Footprints className="size-4 text-primary" />
                如何抵達該景點？
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {attraction.routesDescription}
              </p>
            </div>

            {/* Interactive Packing tips */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="size-3.5" />
                {showTips ? "收起攜帶裝備建議" : "查看推薦旅伴裝備與遊客提示..."}
              </button>

              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-200/50 text-xs space-y-1.5 text-amber-900 leading-relaxed">
                      {attraction.id === "shitoushan" ? (
                        <>
                          <p>🎒 <strong>強烈建議攜帶：</strong>舒適的健行鞋或運動鞋，遮陽帽，充足的飲用水與防蚊防曬用品。</p>
                          <p>⚠️ <strong>重要提示：</strong>神祕海岸步道在海潮或豪雨過後路滑危險，請務必沿指定景觀台欣賞，注意安全警告標語。</p>
                        </>
                      ) : (
                        <>
                          <p>🎒 <strong>強烈建議攜帶：</strong>個人毛巾、拖鞋、輕便更衣帽，溫泉區備有飲水機建議定時補水。</p>
                          <p>⚠️ <strong>熱浴提示：</strong>海底微鹹海水泉治癒性強，但入浴不宜超過 15 分鐘，孕婦或心血管病史貴賓請遵循醫囑，多歇息。</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Call to Actions */}
            <div className="pt-3 flex gap-3 text-sm">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-outline text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer text-center text-xs"
              >
                關閉
              </button>
              <button
                onClick={handleAlert}
                className="flex-1 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-container shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <Compass className="size-3.5" />
                開始 Google 導航
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
