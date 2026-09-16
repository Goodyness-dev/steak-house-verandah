import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Plus, Clock, CheckCircle2, 
  Utensils, Wine, Send, Calendar, 
  Play, Pause, RotateCcw, ChevronRight, Phone, Mail, User, Sparkles
} from '../common/Icons';
import { quotesApi } from '../../services/api';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Service Live Timer (Estate Dinner Service Clock)
  const [timerSeconds, setTimerSeconds] = useState(7420); // 02:03:40 into evening service
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 10 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentOrder = quotes.find(q => q.status === 'pending') || quotes[0];

  return (
    <div className="space-y-6 text-[#ded7c8]">
      {/* HEADER: Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#183327] border border-[#c5a059]/30 text-[#c5a059] text-[11px] uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Devon House · Maître D' Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            Estate Dining Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#ded7c8]/60 font-serif italic mt-0.5">
            Coordinate verandah seating, Himalayan dry-aging allocations, and sommelier cellar requests.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenNewOrder}
            className="py-2.5 px-4 bg-[#c5a059] hover:bg-[#d8b46e] text-[#0d1e16] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Manual Reservation</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="py-2.5 px-4 bg-[#142a20] hover:bg-[#183327] text-[#c5a059] border border-[#c5a059]/30 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm active:scale-95"
          >
            Reservation Book
          </button>
        </div>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gold / Emerald Hero Card */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-gradient-to-br from-[#183327] to-[#142a20] border-2 border-[#c5a059] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(197,160,89,0.15)] cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">Total Reservations</span>
            <div className="w-8 h-8 rounded-full bg-[#c5a059] text-[#0d1e16] flex items-center justify-center font-bold">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-serif font-bold text-white tracking-tight">{stats.total || 42}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-[#c5a059] bg-[#0d1e16]/60 px-2.5 py-1 rounded-full w-max font-medium border border-[#c5a059]/20">
            <span>↑ 24%</span>
            <span>inquiries this weekend</span>
          </div>
        </div>

        {/* Card 2: Seated / Confirmed Covers */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-[#142a20] border border-[#c5a059]/30 rounded-3xl p-6 shadow-md hover:border-[#c5a059] transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ded7c8]/60">Confirmed Diners</span>
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-serif font-bold text-white">{stats.completed || 28}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ Prime Tables</span>
            <span>Verandah & Terrace</span>
          </div>
        </div>

        {/* Card 3: Sommelier Flights & Pre-Orders */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-[#142a20] border border-[#c5a059]/30 rounded-3xl p-6 shadow-md hover:border-[#c5a059] transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ded7c8]/60">Cellar Requests</span>
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-serif font-bold text-[#c5a059]">{stats.quoted || 11}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full w-max font-medium">
            <span>🍾 Wine & Rum</span>
            <span>pre-chill cellar orders</span>
          </div>
        </div>

        {/* Card 4: Pending Inquiries */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-[#142a20] border border-[#c5a059]/40 rounded-3xl p-6 shadow-md hover:border-[#c5a059] transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">Pending Tables</span>
            <div className="w-8 h-8 rounded-full bg-[#183327] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-serif font-bold text-white">{stats.pending || 3}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-orange-300 bg-orange-950/40 border border-orange-500/30 px-2.5 py-1 rounded-full w-max font-medium">
            <span>⏳ Awaiting Host</span>
            <span>table placement needed</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW: Service Timer & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Service Clock (5 Cols) */}
        <div className="lg:col-span-5 bg-[#142a20] border border-[#c5a059]/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#c5a059]/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block">
                  Service Tracker
                </span>
                <h3 className="font-serif font-bold text-base text-white mt-0.5">
                  Evening Dinner Service
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#183327] text-[#c5a059] border border-[#c5a059]/30 rounded-full text-[10px] font-bold tracking-wider uppercase">
                Live Service
              </span>
            </div>

            <div className="py-8 text-center">
              <span className="text-xs uppercase tracking-widest text-[#ded7c8]/60 block mb-2">
                Table Seating Elapsed
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-widest">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-xs text-[#c5a059] mt-2">
                Grand Verandah Capacity: <span className="font-bold text-white">88% Occupied</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-5 py-2 rounded-xl bg-[#c5a059] text-[#0d1e16] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#d8b46e] transition"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause Service' : 'Resume Service'}</span>
              </button>
              <button
                onClick={() => setTimerSeconds(0)}
                className="p-2 rounded-xl border border-[#c5a059]/30 text-[#ded7c8]/70 hover:text-white hover:bg-[#183327] transition"
                title="Reset Service Clock"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#c5a059]/20 text-[11px] text-[#ded7c8]/60 flex items-center justify-between">
            <span>Executive Chef: Himalayan Dry-Aging Station</span>
            <span className="text-[#c5a059] font-semibold">1881 Cellar Open</span>
          </div>
        </div>

        {/* Right: Urgent / Next Seating (7 Cols) */}
        <div className="lg:col-span-7 bg-[#142a20] border border-[#c5a059]/30 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#c5a059]/20">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block">
                Next In Queue
              </span>
              <h3 className="font-serif font-bold text-base text-white mt-0.5">
                Priority Guest Reservation
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-[#c5a059] hover:text-white font-bold flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {urgentOrder ? (
            <div className="py-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0d1e16] border border-[#c5a059]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                      {urgentOrder.vehicleYear || 'VIP Guest'}
                    </span>
                    <span className="text-xs text-[#ded7c8]/50">·</span>
                    <span className="text-sm font-bold text-white">
                      {urgentOrder.customerName || 'Table Guest'}
                    </span>
                  </div>
                  <p className="text-xs text-[#ded7c8]/70 mt-1">
                    {urgentOrder.serviceCategory || 'Devon House Grand Verandah'} — {urgentOrder.details || '38oz Prime Tomahawk & Vintage Rum Pairing'}
                  </p>
                </div>
                <button
                  onClick={() => onSelectQuote(urgentOrder)}
                  className="px-4 py-2 bg-[#c5a059] text-[#0d1e16] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#d8b46e] transition shrink-0"
                >
                  Review Dossier
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0d1e16]/60 border border-[#c5a059]/20">
                  <span className="text-[10px] text-[#ded7c8]/50 uppercase tracking-wider block">Seating Area</span>
                  <span className="font-serif font-bold text-white">Al-Fresco Courtyard</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0d1e16]/60 border border-[#c5a059]/20">
                  <span className="text-[10px] text-[#ded7c8]/50 uppercase tracking-wider block">Requested Time</span>
                  <span className="font-serif font-bold text-[#c5a059]">Tonight · 7:30 PM</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#ded7c8]/60">
              <Utensils className="w-10 h-10 text-[#c5a059]/40 mx-auto mb-2" />
              <p className="text-sm font-serif">All guest tables currently accommodated.</p>
            </div>
          )}

          <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-between text-xs text-[#ded7c8]/60">
            <span>Direct Kitchen & Host Stand Intercom Active</span>
            <span className="text-[#c5a059] font-medium">Auto-Sync Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
