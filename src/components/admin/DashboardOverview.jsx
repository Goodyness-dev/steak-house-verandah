import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Plus, Clock, CheckCircle2, 
  Utensils, Wine, Send, Calendar, 
  Play, Pause, RotateCcw, ChevronRight, Phone, Mail, User, Sparkles
} from '../common/Icons';
import { quotesApi } from '../../services/api';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder, darkMode = true }) {
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

  const cardBg   = darkMode ? 'bg-white/3' : 'bg-white';
  const borderCol= darkMode ? 'border-white/8' : 'border-black/8';
  const textMain = darkMode ? 'text-[#f7f4ec]' : 'text-[#0d0d0d]';
  const textMuted= darkMode ? 'text-white/45' : 'text-black/50';
  const goldAcc  = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const goldBg   = darkMode ? 'bg-[#c5a059]' : 'bg-[#b8955a]';

  return (
    <div className={`space-y-6 ${textMain}`}>
      {/* HEADER: Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-0.5 rounded-full ${darkMode ? 'bg-white/4 border border-white/10' : 'bg-black/5 border border-black/10'} ${goldAcc} text-[10px] uppercase tracking-[0.25em] font-bold mb-1`}>
            <Sparkles className="w-3 h-3" />
            <span>Devon House · Maître D' Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Estate Dining Overview
          </h1>
          <p className={`text-xs sm:text-sm ${textMuted} font-cursive italic mt-0.5`}>
            Coordinate verandah seating, Himalayan dry-aging allocations, and sommelier cellar requests.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenNewOrder}
            className={`py-2.5 px-4 ${goldBg} text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm hover:opacity-90 flex items-center space-x-2 active:scale-95 cursor-pointer`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Manual Reservation</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className={`py-2.5 px-4 rounded-xl border ${borderCol} ${cardBg} ${goldAcc} font-bold text-xs uppercase tracking-wider transition hover:opacity-80 active:scale-95 cursor-pointer`}
          >
            Reservation Book
          </button>
        </div>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gold Hero Card */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className={`rounded-2xl p-6 border ${darkMode ? 'border-[#c5a059]/40 bg-white/4' : 'border-[#b8955a]/40 bg-white'} shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${goldAcc}`}>Total Reservations</span>
            <div className={`w-7 h-7 rounded-full ${goldBg} text-black flex items-center justify-center font-bold`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">{stats.total || 42}</div>
          </div>
          <div className={`inline-flex items-center space-x-1.5 text-[10px] ${goldAcc} ${darkMode ? 'bg-white/4' : 'bg-black/4'} px-2.5 py-1 rounded-full w-max font-medium`}>
            <span>↑ 24%</span>
            <span>inquiries this weekend</span>
          </div>
        </div>

        {/* Card 2: Seated / Confirmed */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className={`rounded-2xl p-6 border ${borderCol} ${cardBg} shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${textMuted}`}>Confirmed Diners</span>
            <div className={`w-7 h-7 rounded-full border ${borderCol} flex items-center justify-center ${goldAcc}`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-mono font-bold">{stats.completed || 28}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ Prime Tables</span>
            <span>Verandah & Terrace</span>
          </div>
        </div>

        {/* Card 3: Cellar Requests */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className={`rounded-2xl p-6 border ${borderCol} ${cardBg} shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${textMuted}`}>Cellar Requests</span>
            <div className={`w-7 h-7 rounded-full border ${borderCol} flex items-center justify-center ${goldAcc}`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="my-3">
            <div className={`text-3xl sm:text-4xl font-mono font-bold ${goldAcc}`}>{stats.quoted || 11}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>🍾 Wine & Rum</span>
            <span>pre-chill requests</span>
          </div>
        </div>

        {/* Card 4: Pending Tables */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className={`rounded-2xl p-6 border ${borderCol} ${cardBg} shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${goldAcc}`}>Pending Tables</span>
            <div className={`w-7 h-7 rounded-full border ${borderCol} flex items-center justify-center ${goldAcc}`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-mono font-bold">{stats.pending || 3}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full w-max font-medium">
            <span>⏳ Awaiting Host</span>
            <span>placement needed</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW: Service Timer & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Service Clock (5 Cols) */}
        <div className={`lg:col-span-5 rounded-2xl border ${borderCol} ${cardBg} p-6 flex flex-col justify-between shadow-sm`}>
          <div>
            <div className={`flex items-center justify-between pb-4 border-b ${borderCol}`}>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${goldAcc} block`}>
                  Service Tracker
                </span>
                <h3 className="font-serif font-bold text-base mt-0.5">
                  Evening Dinner Service
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${darkMode ? 'bg-white/4 text-[#c5a059] border border-[#c5a059]/30' : 'bg-black/5 text-[#b8955a] border border-black/10'}`}>
                Live Service
              </span>
            </div>

            <div className="py-8 text-center">
              <span className={`text-[10px] uppercase tracking-[0.2em] ${textMuted} block mb-2`}>
                Table Seating Elapsed
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest">
                {formatTimer(timerSeconds)}
              </div>
              <p className={`text-xs ${goldAcc} mt-2 font-medium`}>
                Grand Verandah Capacity: <span className="font-bold underline">88% Occupied</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-5 py-2 rounded-full ${goldBg} text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition cursor-pointer`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause Service' : 'Resume Service'}</span>
              </button>
              <button
                onClick={() => setTimerSeconds(0)}
                className={`p-2 rounded-full border ${borderCol} ${textMuted} hover:${textMain} transition cursor-pointer`}
                title="Reset Service Clock"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className={`pt-4 border-t ${borderCol} text-[10px] ${textMuted} flex items-center justify-between`}>
            <span>Executive Chef: Himalayan Dry-Aging Station</span>
            <span className={`${goldAcc} font-semibold`}>1881 Cellar Open</span>
          </div>
        </div>

        {/* Right: Urgent / Next Seating (7 Cols) */}
        <div className={`lg:col-span-7 rounded-2xl border ${borderCol} ${cardBg} p-6 shadow-sm flex flex-col justify-between`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderCol}`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${goldAcc} block`}>
                Next In Queue
              </span>
              <h3 className="font-serif font-bold text-base mt-0.5">
                Priority Guest Reservation
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className={`text-xs ${goldAcc} hover:underline font-bold flex items-center gap-1 transition cursor-pointer`}
            >
              <span>View All</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {urgentOrder ? (
            <div className="py-6 space-y-4">
              <div className={`p-4 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/4' : 'bg-black/3'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${goldAcc} uppercase tracking-wider`}>
                      {urgentOrder.vehicleYear || 'VIP Guest'}
                    </span>
                    <span className={`text-xs ${textMuted}`}>·</span>
                    <span className="text-sm font-bold">
                      {urgentOrder.customerName || 'Table Guest'}
                    </span>
                  </div>
                  <p className={`text-xs ${textMuted} mt-1`}>
                    {urgentOrder.serviceCategory || 'Devon House Grand Verandah'} — {urgentOrder.details || '38oz Prime Tomahawk & Vintage Rum Pairing'}
                  </p>
                </div>
                <button
                  onClick={() => onSelectQuote(urgentOrder)}
                  className={`px-4 py-2 ${goldBg} text-black rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shrink-0 cursor-pointer`}
                >
                  Review Dossier
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/3' : 'bg-black/2'}`}>
                  <span className={`text-[9px] ${textMuted} uppercase tracking-wider block`}>Seating Area</span>
                  <span className="font-serif font-bold">Historic Verandah</span>
                </div>
                <div className={`p-3 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/3' : 'bg-black/2'}`}>
                  <span className={`text-[9px] ${textMuted} uppercase tracking-wider block`}>Requested Time</span>
                  <span className={`font-serif font-bold ${goldAcc}`}>Tonight · 7:30 PM</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`py-12 text-center ${textMuted}`}>
              <Utensils className={`w-8 h-8 ${goldAcc} mx-auto mb-2 opacity-40`} />
              <p className="text-sm font-serif">All guest tables currently accommodated.</p>
            </div>
          )}

          <div className={`pt-4 border-t ${borderCol} flex items-center justify-between text-[10px] ${textMuted}`}>
            <span>Direct Kitchen & Host Stand Intercom Active</span>
            <span className={`${goldAcc} font-medium`}>Auto-Sync Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
