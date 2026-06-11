import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Phone, CheckCircle, Ticket, Clock, Users, ArrowRight } from "lucide-react";
import { BookingForm } from "../types";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDialog({ isOpen, onClose }: BookingDialogProps) {
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "14:00 (下午場)",
    numPeople: 2,
    remarks: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("請填寫您的姓名與聯絡電話");
      return;
    }
    // Generate a random booking code
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const cleanDate = formData.date.replace(/-/g, "");
    setBookingCode(`JS-${cleanDate}-${randomHex}`);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "14:00 (下午場)",
      numPeople: 2,
      remarks: ""
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-surface w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 z-10"
          >
            {/* Header */}
            <div className="bg-primary px-6 py-5 flex items-center justify-between text-white">
              <div>
                <h3 className="text-xl font-bold font-serif flex items-center gap-2">
                  <Ticket className="size-5" />
                  預約金山老街導覽
                </h3>
                <p className="text-xs text-white/80 mt-0.5">專業文史導覽員帶您穿越五百年歷史</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
                      <User className="size-4 text-primary" />
                      預約人姓名 <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="請輸入您的姓名"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
                      <Phone className="size-4 text-primary" />
                      聯絡電話 <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="例如：0912345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Grid for Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
                        <Calendar className="size-4 text-primary" />
                        預約日期 <span className="text-primary">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
                        <Clock className="size-4 text-primary" />
                        選擇時段 <span className="text-primary">*</span>
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      >
                        <option value="10:00 (上午場)">10:00 (上午場)</option>
                        <option value="14:00 (下午場)">14:00 (下午場)</option>
                        <option value="16:00 (傍晚場)">16:00 (傍晚場)</option>
                      </select>
                    </div>
                  </div>

                  {/* Number of People */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2 flex items-center gap-1.5">
                      <Users className="size-4 text-primary" />
                      預約人數
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 6, 8, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, numPeople: num })}
                          className={`flex-1 py-1.5 rounded-lg border text-sm font-bold transition-all cursor-pointer ${
                            formData.numPeople === num
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                          }`}
                        >
                          {num === 10 ? "10+" : `${num}人`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1.5">
                      特定需求與備註
                    </label>
                    <textarea
                      placeholder="如果有素食習慣、幼童、或者輪椅不便者，請提前告知，我們將為您規劃合適路線..."
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
                    >
                      送出預約申請
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Ticket Success View */
                <div className="py-4 text-center">
                  <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full mb-4">
                    <CheckCircle className="size-10" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-on-surface mb-1">導覽預約成功！</h4>
                  <p className="text-sm text-on-surface-variant max-w-sm mx-auto mb-6">
                    我們已收到您的導覽申請，請在指定時段攜帶下方電子憑證至旅客中心集合。
                  </p>

                  {/* The Golden Ticket Card */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative bg-amber-50/70 border border-amber-200 rounded-xl p-5 shadow-inner text-left overflow-hidden select-none"
                  >
                    {/* Ticket scalloped borders */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 size-6 bg-surface rounded-full border border-amber-200" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 size-6 bg-surface rounded-full border border-amber-200" />

                    {/* Dotted separator line */}
                    <div className="absolute left-6 right-6 top-1/2 border-t border-dashed border-amber-300 pointer-events-none" />

                    {/* Ticket Content Upper Half */}
                    <div className="pb-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                          金包里文史導覽
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          {bookingCode}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-lg text-primary">{formData.name} 貴賓</h5>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <Phone className="size-3 text-secondary" /> {formData.phone}
                      </p>
                    </div>

                    {/* Ticket Content Lower Half */}
                    <div className="pt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-secondary tracking-wider block">
                          預約日期
                        </span>
                        <span className="font-bold text-on-surface">{formData.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-secondary tracking-wider block">
                          預約時段
                        </span>
                        <span className="font-bold text-on-surface">{formData.timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-secondary tracking-wider block">
                          預約人數
                        </span>
                        <span className="font-bold text-on-surface">{formData.numPeople}位同行</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-secondary tracking-wider block">
                          集合地點
                        </span>
                        <span className="font-bold text-primary text-xs">金包里老街遊客中心</span>
                      </div>
                    </div>

                    {/* QR block visual effect */}
                    <div className="mt-4 flex items-center justify-between opacity-80 pt-1 border-t border-amber-100 text-[10px] text-on-surface-variant font-mono">
                      <span>* 現場出示本畫面即可</span>
                      <span className="text-right">JINSHAN TRAVEL GUIDE</span>
                    </div>
                  </motion.div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 py-2.5 border border-outline text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer text-sm"
                    >
                      關閉視窗
                    </button>
                    <button
                      onClick={() => alert("感謝您的預約！已將憑證資訊傳送至您的手機簡訊。")}
                      className="flex-1 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-container shadow-md transition-colors cursor-pointer text-sm"
                    >
                      傳送至手機簡訊
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
