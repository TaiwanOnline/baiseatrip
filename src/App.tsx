import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Map, 
  Navigation, 
  Compass, 
  Bus, 
  Car, 
  Info, 
  Calendar, 
  AlertTriangle, 
  Share2, 
  Menu, 
  X, 
  Clock, 
  Phone, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  RefreshCw,
  Facebook,
  Instagram,
  Heart
} from "lucide-react";

import { STATS_DATA, FOOD_DATA, ATTRACTION_DATA, PARKING_STATUSES } from "./data";
import { FoodItem, Attraction, ParkingStatus } from "./types";

import BookingDialog from "./components/BookingDialog";
import FoodDetailDialog from "./components/FoodDetailDialog";
import AttractionDetailDialog from "./components/AttractionDetailDialog";

export default function App() {
  // Dialog Open States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  // Responsive Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Interactive States
  const [selectedStatId, setSelectedStatId] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [parkingLots, setParkingLots] = useState<ParkingStatus[]>(PARKING_STATUSES);
  const [isRefreshingParking, setIsRefreshingParking] = useState(false);
  const [activeMapHotspot, setActiveMapHotspot] = useState<string | null>(null);
  
  // Likes Counter (Local state to make page interactive)
  const [foodLikes, setFoodLikes] = useState<Record<string, number>>({
    duck: 324,
    sweetpotato: 215,
    icecream: 189
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Initialize time
  useEffect(() => {
    updateParkingTimes();
  }, []);

  const updateParkingTimes = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0].substring(0, 5);
    setLastUpdatedTime(timeStr);
  };

  // Live parking state simulation
  const handleRefreshParking = () => {
    setIsRefreshingParking(true);
    setTimeout(() => {
      setParkingLots(prev => 
        prev.map(lot => {
          // Keep within reasonable boundaries
          const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
          const newAvail = Math.max(0, Math.min(lot.totalSpaces, lot.availableSpaces + change));
          return {
            ...lot,
            availableSpaces: newAvail
          };
        })
      );
      updateParkingTimes();
      setIsRefreshingParking(false);
    }, 800);
  };

  const handleLikeFood = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) {
      setFoodLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setFoodLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleScrollTo = (elementId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="app" className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Dynamic Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant px-4 lg:px-16 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="text-primary flex items-center justify-center">
              <svg className="size-8 transform hover:scale-110 transition-transform" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-on-surface text-lg font-bold tracking-tight font-serif">金山老街文化網</h2>
              <span className="text-[10px] text-on-surface-variant font-mono tracking-widest leading-none">JINSHAN OLD STREET</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {[
              { id: "history", label: "歷史" },
              { id: "food", label: "美食" },
              { id: "attractions", label: "景點" },
              { id: "transport", label: "交通" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-on-surface-variant hover:text-primary transition-colors font-medium relative py-1 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Booking & Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:flex bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-lg font-bold text-xs transition-all transform hover:scale-105 active:scale-95 cursor-pointer items-center gap-1.5 shadow-md"
            >
              <Calendar className="size-3.5" />
              預約導覽
            </button>

            {/* Mobile menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-outline-variant mt-2.5 pt-4 pb-2 space-y-2 text-center"
            >
              {[
                { id: "history", label: "歷史傳承" },
                { id: "food", label: "美食地圖" },
                { id: "attractions", label: "周邊漫遊" },
                { id: "transport", label: "如何抵達" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="block w-full py-2 hover:bg-surface-container-low text-on-surface-variant font-semibold text-sm transition-colors rounded-lg"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 px-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="w-full bg-primary text-white py-2 rounded-lg text-xs font-bold shadow-md hover:bg-primary-container flex items-center justify-center gap-1.5"
                >
                  <Calendar className="size-3.5" />
                  馬上預約導覽
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Header Section */}
      <section className="relative min-h-[580px] lg:h-[720px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover scale-102 filter brightness-[0.72] contrast-[1.03]"
            alt="金山老街夕照"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpB4dzqsLRoipLGp_8308yaFL__3Rr-a-XlMeseCeyJcGQJtLi0UATbHFJa5G6z_IHg7lcDgxUQsWhvVSWCfAFEvG_lnrr2Qt34pSPj-N4cGrkjNX-F8w9yYGZgQ7k1kd_TumJTyURvN2ecu9FqkwLCCj-ZJAgdLey4iC6PBdCoTD1E_uA5OJXBnFpPZE4ISecQ3f_HgVoJo4lCCmy2nkneZtBQ_MVbsbVqF4x5J9dvjrb4l6fNyy1U6Kbhq2f5vu9QlTpEWHioKcv"
          />
          {/* Elegant atmospheric warm vignette gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75" />
        </div>

        {/* Content Panel */}
        <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-normal leading-[1.2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              時光交織的古韻之旅：金山老街
            </h1>
            
            <p className="text-white/95 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
              體驗北海岸最古老的紅磚街道，感受五百年歷史的溫度與繁華。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10"
          >
            <button
              onClick={() => handleScrollTo("history")}
              className="bg-primary hover:bg-primary-container text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              探索老街
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* History and Heritage Panel */}
      <section className="py-20 lg:py-24 px-4 lg:px-16 bg-surface overflow-hidden" id="history">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photo Column */}
          <div className="md:col-span-5 relative group">
            {/* Ambient visual background blobs */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none select-none" />
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                className="rounded-2xl shadow-xl relative z-10 w-full aspect-[4/5] object-cover border-4 sm:border-8 border-surface-container transition-transform duration-500 group-hover:scale-[1.01]"
                alt="紅磚老街牆門"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfW3DVAEarXAi32FL484TbKXmtmro7V_Pc9-2691ZISK09rIHsLIPga5DHdn6qz7CQjSvWeH4G2CiQzgTH-sSaYC-j1Z2FHseRakao_w_KwDdtgHv_lfJgxvb-30O9dsIO9BApD7LFSByiM00TvZkmoUGIpSkagEs-xPZhlOdmp_XegGJdaqLtKoMMRiPs283c8216KzHoNCb1GV5l9GyB9hh7T243jt8qv52N28F-08oSTjgJdqRQOVITEfFgElgESrqVdN1hkSUX"
              />
              <div className="absolute inset-0 bg-primary/5 rounded-2xl filter pointer-events-none" />
            </motion.div>
          </div>

          {/* Information narrative Column */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm block font-mono">
                HISTORIC HERITAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-on-surface leading-tight">
                金包里老街：穿越五百年的繁華
              </h2>
            </div>

            <div className="space-y-5 text-on-surface-variant text-sm sm:text-base leading-relaxed">
              <p>
                金包里老街是台灣北海岸最古老的街道，自清領時期以來便是繁華的商業集散地。這條全長約兩百公尺的街道，完整保留了傳統紅磚建築，見證了五百多年來的歲月更迭與市場榮景。
              </p>
              <p>
                作為昔日金山地區最熱鬧的集散中心，這裡曾是魚貨與農特產品的集散點。漫步其中，彷彿能聽見昔日的叫賣聲，感受那份深厚的文化底蘊與先民生活智慧的結晶。
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-outline-variant/60">
              {STATS_DATA.map((stat) => (
                <motion.div
                  key={stat.id}
                  onClick={() => setSelectedStatId(selectedStatId === stat.id ? null : stat.id)}
                  whileHover={{ y: -3 }}
                  className={`p-3.5 sm:p-4 rounded-xl cursor-pointer text-center select-none border transition-all ${
                    selectedStatId === stat.id 
                      ? "bg-secondary-container-dim border-secondary text-primary"
                      : "bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/60"
                  }`}
                >
                  <div className="text-2xl sm:text-3xl font-serif font-black text-primary mb-1">
                    {stat.count}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-on-surface">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stat detail reveal drawer */}
            <AnimatePresence mode="wait">
              {selectedStatId && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-surface-container p-4 rounded-xl border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed"
                >
                  <p className="font-semibold text-primary mb-1">
                    {STATS_DATA.find((s) => s.id === selectedStatId)?.label} 深入解析：
                  </p>
                  {STATS_DATA.find((s) => s.id === selectedStatId)?.description}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Must-Eat Food Category Section */}
      <section className="py-20 lg:py-24 px-4 lg:px-16 bg-surface-container-low" id="food">
        <div className="max-w-7xl mx-auto">
          
          {/* Section heading */}
          <div className="text-center mb-12 sm:mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-on-surface">
              老街必嚐：金山美味地圖
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
              從傳統的名產鴨肉到香甜的地瓜甜點，每一口都是老街獨有的味蕾記憶。
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {FOOD_DATA.map((food) => (
              <div
                key={food.id}
                onClick={() => setSelectedFood(food)}
                className="bg-surface rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all border border-outline-variant/30 group cursor-pointer flex flex-col h-full"
              >
                {/* Visual Image container */}
                <div className="overflow-hidden rounded-xl mb-5 relative aspect-square">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                    alt={food.name}
                    src={food.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category overlay tags */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                      {food.category}
                    </span>
                  </div>

                  {/* Likes mini interaction bubble */}
                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={(e) => handleLikeFood(food.id, e)}
                      className={`size-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm transition-all ${
                        hasLiked[food.id]
                          ? "bg-primary text-white"
                          : "bg-white/80 hover:bg-white text-primary"
                      }`}
                    >
                      <Heart className={`size-3.5 ${hasLiked[food.id] ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Text attributes */}
                <div className="px-1 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <h3 className="text-xl font-bold text-on-surface font-serif">
                        {food.name}
                      </h3>
                      <span className="text-[10px] text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded">
                        {foodLikes[food.id]} 人按讚
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                      {food.description}
                    </p>
                  </div>

                  <div className="flex items-center text-primary font-bold gap-1 mt-auto text-xs sm:text-sm group-hover:underline">
                    查看位置與菜單
                    <ArrowRight className="size-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surroundings Scenic Spots Section (Bento-style layout) */}
      <section className="py-20 lg:py-24 px-4 lg:px-16 bg-surface" id="attractions">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-on-surface">周邊漫遊</h2>
              <p className="text-on-surface-variant max-w-xl text-sm sm:text-base">
                除了漫步老街，金山周邊更有大自然的壯闊海景與放鬆心靈的溫泉體驗。
              </p>
            </div>
            <button 
              onClick={() => handleScrollTo("transport")}
              className="border-2 border-primary text-primary px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-primary hover:text-white transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <Map className="size-4" />
              查看交通地圖
            </button>
          </div>

          {/* Attraction Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {ATTRACTION_DATA.map((attr) => (
              <div
                key={attr.id}
                onClick={() => setSelectedAttraction(attr)}
                className="relative group cursor-pointer overflow-hidden rounded-3xl h-[360px] sm:h-[400px] shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Image */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter brightness-88 group-hover:brightness-95"
                  alt={attr.name}
                  src={attr.image}
                />
                
                {/* Shadow overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-colors" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 space-y-2">
                  <span className="bg-tertiary-container text-white text-[10px] font-bold px-2 py-0.5 rounded self-start tracking-wider">
                    {attr.category}
                  </span>
                  
                  <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif shadow-sm">
                    {attr.name}
                  </h3>
                  
                  <p className="text-white/80 text-xs sm:text-sm line-clamp-2 max-w-xl leading-relaxed">
                    {attr.description}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm">
                    查看完整路線指南 
                    <ArrowRight className="size-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transit Map / How to arrive Section */}
      <section className="py-20 lg:py-24 px-4 lg:px-16 bg-surface-container-highest" id="transport">
        <div className="max-w-7xl mx-auto">
          
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-on-surface mb-12 text-center text-primary">
            如何抵達
          </h2>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-outline-variant/30">
            
            {/* Map Canvas - Col 7 */}
            <div className="lg:col-span-7 h-[380px] sm:h-[480px] rounded-2xl overflow-hidden relative border border-outline-variant/10">
              
              {/* Illustration Map Source URL */}
              <img
                className="w-full h-full object-cover transition-all duration-700"
                alt="金山交通導覽地圖"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJaaO7LAzCpQuHSGZxbr3OTjjY5EXaDnAgxP24w8bmtC29pJeRqRFbtpcCoElfdmg_YJKXr9oiH_uQrauwVZW5hfQsmgmwdDxObTNnN7cBmr_LrBFbwJs0UkRNR_Hs0EYjYykR5E_vgFV7vKZMJQwdp_h1bavHXlfJThYKIhBU06xRiK_mTo9mQBkKxHerUuscZRenw9fFrdJa0RjwBFbt6wL2Q3I3YQgoXwwTi6IJs4EWQrwiGpIUVMuePvZhGgLBZaxh58FyLZTC"
              />

              {/* Map Bouncing Location Markers & Hotspots */}
              <div className="absolute top-[52%] left-[46%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                
                {/* High interest pulsing marker */}
                <div 
                  onClick={() => setActiveMapHotspot(activeMapHotspot === "oldstreet" ? null : "oldstreet")}
                  className="bg-primary text-white p-2.5 rounded-full shadow-2xl animate-bounce cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                >
                  <MapPin className="size-5" />
                </div>
                
                {/* Hotspot details panel */}
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md mt-1 font-serif">
                  金包里老街
                </span>
              </div>

              {/* Secondary Map Spot - Candlestick Islet */}
              <div className="absolute top-[28%] left-[64%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div 
                  onClick={() => setActiveMapHotspot(activeMapHotspot === "shitoushan" ? null : "shitoushan")}
                  className="bg-tertiary text-white p-1.5 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                >
                  <Compass className="size-3.5" />
                </div>
                <span className="bg-tertiary text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm mt-0.5">
                  獅頭山步道
                </span>
              </div>

              {/* Hotspot Drawer Overlay */}
              <AnimatePresence>
                {activeMapHotspot && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute bottom-4 left-4 right-4 bg-surface p-4 rounded-xl shadow-2xl border border-outline-variant text-xs space-y-1.5 leading-relaxed"
                  >
                    <div className="flex justify-between items-center border-b border-outline-variant/30 pb-1.5">
                      <span className="font-bold text-primary text-sm flex items-center gap-1.5 font-serif">
                        <MapPin className="size-4" />
                        {activeMapHotspot === "oldstreet" ? "金包里老街核心" : "獅頭山公園入口"}
                      </span>
                      <button 
                        onClick={() => setActiveMapHotspot(null)}
                        className="text-on-surface-variant hover:text-primary"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    {activeMapHotspot === "oldstreet" ? (
                      <p className="text-on-surface-variant">
                        老街入口，鄰近金山立體車場，步行僅需與 100 公尺。著名鴨肉美食與地瓜特產皆聚集於此處！
                      </p>
                    ) : (
                      <p className="text-on-surface-variant">
                        知名美景燭台雙嶼之最佳觀賞步道，建議在進入老街前或享用晚餐後漫步前往，可飽覽海天全致。
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Information Column - Col 5 */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col justify-between">
              
              {/* Bus panel */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/5 p-3 rounded-xl shrink-0 mt-1">
                  <Bus className="size-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-on-surface font-serif">大眾運輸</h4>
                  <ul className="space-y-2 text-on-surface-variant text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      搭乘捷運至<strong className="text-on-surface">淡水站</strong>，轉乘「淡水客運」往基隆方向於金山站下車。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      台北車站搭乘「國光客運」<strong className="text-primary text-xs shrink-0 bg-primary/5 px-1 rounded font-bold">1815號</strong>（往金山/法鼓山）直達。
                    </li>
                  </ul>
                </div>
              </div>

              {/* Driving panel */}
              <div className="flex items-start gap-4">
                <div className="bg-tertiary-container/10 p-3 rounded-xl shrink-0 mt-1">
                  <Car className="size-6 text-tertiary" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-on-surface font-serif">自行開車</h4>
                  <ul className="space-y-2 text-on-surface-variant text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0" />
                      由國道1號於基隆交流道下，沿台2線往金山方向行駛即可抵達。
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0" />
                      由國道3號至基金交流道下，接台2線往金山方向前進。
                    </li>
                  </ul>
                </div>
              </div>

              {/* Live Parking Spot Tracker Applet integration */}
              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface font-serif flex items-center gap-1.5">
                    <Sparkles className="size-4 text-amber-600 animate-pulse" />
                    即時老街車位狀態
                  </span>
                  
                  <button
                    onClick={handleRefreshParking}
                    disabled={isRefreshingParking}
                    className="flex items-center gap-1.5 text-[10px] text-primary hover:underline font-mono font-medium disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`size-3 ${isRefreshingParking ? "animate-spin" : ""}`} />
                    {isRefreshingParking ? "更新中..." : `更新於 ${lastUpdatedTime}`}
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {parkingLots.map((lot, index) => {
                    const ratio = lot.availableSpaces / lot.totalSpaces;
                    let colorClass = "text-emerald-600 bg-emerald-50";
                    let percentageWidth = `${Math.min(100, Math.floor(ratio * 100))}%`;
                    
                    if (ratio < 0.15) {
                      colorClass = "text-red-600 bg-red-50";
                    } else if (ratio < 0.4) {
                      colorClass = "text-amber-600 bg-amber-50";
                    }

                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-on-surface truncate pr-1">{lot.name}</span>
                          <span className={`px-1.5 py-0.5 rounded font-mono font-bold leading-none ${colorClass}`}>
                            剩 {lot.availableSpaces} / {lot.totalSpaces}
                          </span>
                        </div>
                        {/* Progress Bar background */}
                        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              ratio < 0.15 ? "bg-red-500" : ratio < 0.4 ? "bg-amber-500" : "bg-emerald-500"
                            }`} 
                            style={{ width: percentageWidth }} 
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-on-surface-variant leading-none pt-0.5">
                          <span>{lot.distanceText}</span>
                          <span className="font-medium text-secondary">{lot.priceText}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Small Warning Tip Banner */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/40 flex items-start gap-2">
                <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>溫馨提示：</strong>假日期間老街周邊停車位較為擁擠，建議提早出發，或多加利用 1815 國光客運大眾運輸工具前往。
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Structured footer credits */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-16 px-4 lg:px-16 mt-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10 text-sm">
            
            {/* Brand column - Span 6 */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3 text-red-100">
                <div className="size-8">
                  <svg fill="currentColor" viewBox="0 0 48 48" className="w-full h-full text-red-200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif">金山老街文化網</h2>
              </div>
              <p className="text-surface-variant max-w-sm leading-relaxed text-xs sm:text-sm">
                致力於保存與推廣金包里老街深厚的歷史文化。漫步红磚古道，深刻感受台灣北海岸最精美原始的歷史溫度與璀璨人文。
              </p>
            </div>

            {/* Quick links - Span 3 */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-white font-bold tracking-wider font-serif text-sm">快速連結</h5>
              <ul className="space-y-3 text-xs sm:text-sm text-surface-variant">
                {[
                  { id: "history", label: "歷史傳承" },
                  { id: "food", label: "必嚐美食" },
                  { id: "attractions", label: "周邊漫遊" },
                  { id: "transport", label: "交通指南" }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScrollTo(item.id)}
                      className="hover:text-amber-100 transition-colors text-left cursor-pointer text-xs sm:text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social channels - Span 3 */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-white font-bold tracking-wider font-serif text-sm font-medium">追蹤社群</h5>
              <p className="text-surface-variant text-xs leading-relaxed">
                訂閱金包里最新文史導覽、活動消息與在地文創優惠：
              </p>
              <div className="flex gap-3">
                <a 
                  onClick={() => alert("歡迎追蹤官方 Facebook 專頁首頁。")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white cursor-pointer hover:scale-105"
                >
                  <Facebook className="size-5" />
                </a>
                <a 
                  onClick={() => alert("歡迎追蹤官方 Instagram 精采旅拍。")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white cursor-pointer hover:scale-105"
                >
                  <Instagram className="size-5" />
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-surface-variant text-center sm:text-left">
            <p>© 2024 金山區公所 文化觀光課 & 金包里遊客中心. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a onClick={() => alert("隱私權政策內容，本導覽平台承諾保護所有預約客人隱私資訊。")} className="hover:text-white transition-colors cursor-pointer">隱私權政策</a>
              <a onClick={() => alert("使用條款聲明。")} className="hover:text-white transition-colors cursor-pointer">使用條款</a>
              <a onClick={() => alert("此平台已配備無障礙視效對比，確保不同群體皆能愉快瀏覽。")} className="hover:text-white transition-colors cursor-pointer">無障礙宣告</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Booking Dialog Modal Component */}
      <BookingDialog 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      {/* Food Detail Drawer Modal Component */}
      <FoodDetailDialog
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
        onLocateOnMap={(location) => {
          setActiveMapHotspot("oldstreet");
          handleScrollTo("transport");
        }}
      />

      {/* Attractions Detail Modal Component */}
      <AttractionDetailDialog
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
      />

    </div>
  );
}
