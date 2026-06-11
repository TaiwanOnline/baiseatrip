import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Clock, DollarSign, Utensils, Star, ThumbsUp, Plus, Minus, ShoppingBag, MessageSquare } from "lucide-react";
import { FoodItem } from "../types";

interface FoodDetailDialogProps {
  food: FoodItem | null;
  onClose: () => void;
  onLocateOnMap?: (location: string) => void;
}

export default function FoodDetailDialog({ food, onClose, onLocateOnMap }: FoodDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"info" | "review" | "budget">("info");

  // Budget Calculator State
  const [items, setItems] = useState<{ name: string; price: number; qty: number }[]>([]);

  // Initialize helper on food change
  React.useEffect(() => {
    if (!food) return;
    setActiveTab("info");
    if (food.id === "duck") {
      setItems([
        { name: "傳奇招牌鴨肉 (1/4 隻)", price: 280, qty: 1 },
        { name: "香煎炒小卷", price: 200, qty: 0 },
        { name: "古早味鴨湯手工生麵", price: 40, qty: 2 },
        { name: "鮮甜炒桂竹筍", price: 150, qty: 1 }
      ]);
    } else if (food.id === "sweetpotato") {
      setItems([
        { name: "招牌黃金拔絲地瓜 (大份)", price: 100, qty: 1 },
        { name: "綜合拔絲雙色薯 (大份)", price: 100, qty: 1 },
        { name: "手作地瓜酥伴手禮", price: 120, qty: 0 }
      ]);
    } else {
      setItems([
        { name: "雙色地瓜冰淇淋 (兩球)", price: 70, qty: 1 },
        { name: "地瓜聖代 (加蜜地瓜配料)", price: 90, qty: 0 },
        { name: "特調冷萃地瓜茶", price: 50, qty: 0 }
      ]);
    }
  }, [food]);

  if (!food) return null;

  const handleQtyChange = (index: number, change: number) => {
    setItems((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, qty: Math.max(0, item.qty + change) }
          : item
      )
    );
  };

  const totalBudget = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const mockReviews = [
    { author: "艾蜜莉 (Emily)", rating: 5, date: "2天前", content: `造訪金山老街必推！吃起來真的跟市區的不一樣，${food.name}口感拿捏得完美無缺，十分驚艷。` },
    { author: "小林", rating: 4.8, date: "1週前", content: "熱呼呼的感覺超讚！排隊人潮蠻多的，但店家手腳很快，誠意滿滿，非常推薦帶全家人來吃。" },
    { author: "老饕阿章", rating: 4.5, date: "2週前", content: "真正的在地古老風味，來這裡一定要買！料多實在，CP 值特別高，絕對不讓你失望。" }
  ];

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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Picture panel */}
          <div className="w-full md:w-5/12 relative bg-surface-container-high h-48 md:h-auto min-h-[180px]">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded inline-block self-start mb-2">
                {food.category}
              </span>
              <h4 className="text-2xl font-serif font-bold text-white leading-tight drop-shadow-md">
                {food.name}
              </h4>
            </div>
          </div>

          {/* Technical Info & Tabs Panel */}
          <div className="w-full md:w-7/12 flex flex-col h-[500px] md:h-[450px]">
            {/* Tabs */}
            <div className="flex border-b border-outline-variant text-sm font-semibold">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "info"
                    ? "border-b-2 border-primary text-primary bg-primary-container/5"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <Utensils className="size-4" />
                特色介紹
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "review"
                    ? "border-b-2 border-primary text-primary bg-primary-container/5"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <MessageSquare className="size-4" />
                旅人評價
              </button>
              <button
                onClick={() => setActiveTab("budget")}
                className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "budget"
                    ? "border-b-2 border-primary text-primary bg-primary-container/5"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <ShoppingBag className="size-4" />
                預算規劃
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 p-6 overflow-y-auto text-sm">
              {activeTab === "info" && (
                <div className="space-y-4">
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    {food.description}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-outline-variant/40">
                    <div className="flex items-start gap-2.5 text-on-surface-variant">
                      <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-on-surface text-xs">營業位置</span>
                        <span className="text-xs">{food.mapLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-on-surface-variant">
                      <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-on-surface text-xs">營業時間</span>
                        <span className="text-xs">{food.recommendedHours}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-on-surface-variant">
                      <DollarSign className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-on-surface text-xs">預算範圍</span>
                        <span className="text-xs">{food.averagePrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        if (onLocateOnMap) {
                          onLocateOnMap(food.mapLocation);
                        }
                        onClose();
                      }}
                      className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-container shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MapPin className="size-3.5" />
                      在地圖上標記
                    </button>
                    <button
                      onClick={() => setActiveTab("budget")}
                      className="flex-1 py-2.5 border border-outline text-on-surface-variant text-xs font-semibold rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="size-3.5" />
                      模擬點餐預算
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="size-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-on-surface bg-amber-100 px-1.5 py-0.5 rounded">
                      4.9 / 5.0
                    </span>
                    <span className="text-xs text-on-surface-variant">(1,482 則真實評分)</span>
                  </div>

                  <div className="divide-y divide-outline-variant/30">
                    {mockReviews.map((rev, index) => (
                      <div key={index} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span className="font-bold text-on-surface">{rev.author}</span>
                          <span className="text-on-surface-variant text-[10px]">{rev.date}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {rev.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => alert("感謝您的參與！此功能在預覽環境暫不支援發表新評論。")}
                      className="w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <ThumbsUp className="size-3.5" />
                      我也要推薦此美食
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "budget" && (
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-on-surface font-serif text-sm">點餐預算計算器</h5>
                    <p className="text-on-surface-variant text-xs mt-0.5">
                      點選下方地方菜單，幫您的金山之旅提前預估用餐花費：
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/60 transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-on-surface text-xs block">{item.name}</span>
                          <span className="text-primary font-mono text-xs font-medium">
                            NT$ {item.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(idx, -1)}
                            className="size-6 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant select-none"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="font-bold text-sm w-4 text-center font-mono select-none">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(idx, 1)}
                            className="size-6 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant select-none"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                    <div>
                      <span className="text-xs text-on-surface-variant">預估點餐總額</span>
                      <div className="text-lg font-mono font-black text-primary">
                        NT$ {totalBudget}
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`已儲存您的預定菜單！總計 NT$ ${totalBudget}，歡迎前往金山享用美食！`)}
                      className="px-6 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
                    >
                      儲存菜單計畫
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
