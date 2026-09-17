import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, MessageSquare, 
  Settings, LogOut, ExternalLink, Search, 
  Bell, Mail, Utensils, Menu, X, Plus, Calendar, ShieldCheck, VerandahLogo
} from '../common/Icons';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function AdminLayout({ user, onLogout, onBackToSite, darkMode = true, onToggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Maître D\' Overview', icon: LayoutDashboard },
    { id: 'orders',    label: 'Table Reservations',  icon: ClipboardList, badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox',     label: 'Guest Messages',      icon: MessageSquare, badge: stats.pending > 0 ? stats.pending : null },
  ];

  const bgPage    = darkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f0e8]';
  const bgSide    = darkMode ? 'bg-[#111111]' : 'bg-[#ece5d6]';
  const borderCol = darkMode ? 'border-white/8' : 'border-black/8';
  const textMain  = darkMode ? 'text-[#f7f4ec]' : 'text-[#0d0d0d]';
  const textMuted = darkMode ? 'text-white/45' : 'text-black/50';
  const goldAcc   = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const goldBg    = darkMode ? 'bg-[#c5a059]' : 'bg-[#b8955a]';

  return (
    <div className={`min-h-screen ${bgPage} ${textMain} font-sans flex antialiased transition-colors duration-300`}>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 ${bgSide} border-r ${borderCol} flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center border ${
                darkMode ? 'border-[#c5a059]/50 bg-white/4 text-[#c5a059]' : 'border-black/20 bg-black/5 text-[#b8955a]'
              }`}>
                <VerandahLogo className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-serif font-bold text-sm tracking-tight block leading-tight truncate">
                  The Verandah
                </span>
                <span className={`text-[9px] ${goldAcc} font-semibold uppercase tracking-widest block`}>
                  Maître D' Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className={`lg:hidden p-1.5 rounded-lg ${textMuted} hover:${textMain} shrink-0 cursor-pointer`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONCIERGE Section */}
          <div className="space-y-2">
            <span className={`text-[9px] font-bold ${goldAcc} uppercase tracking-[0.25em] px-3 block`}>
              Concierge
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                      isActive
                        ? `${goldBg} text-black font-bold shadow-md`
                        : `${textMuted} hover:${textMain} ${darkMode ? 'hover:bg-white/4' : 'hover:bg-black/4'}`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : goldAcc}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black text-[#c5a059]'
                          : darkMode ? 'bg-white/8 text-[#c5a059] border border-[#c5a059]/30' : 'bg-black/8 text-[#b8955a]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ADMINISTRATION Section */}
          <div className="space-y-2">
            <span className={`text-[9px] font-bold ${goldAcc} uppercase tracking-[0.25em] px-3 block`}>
              Administration
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'settings'
                    ? `${goldBg} text-black font-bold shadow-md`
                    : `${textMuted} hover:${textMain} ${darkMode ? 'hover:bg-white/4' : 'hover:bg-black/4'}`
                }`}
              >
                <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-black' : goldAcc}`} />
                <span>Service Settings</span>
              </button>

              <button
                onClick={onBackToSite}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${textMuted} hover:${textMain} ${darkMode ? 'hover:bg-white/4' : 'hover:bg-black/4'} transition cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <ExternalLink className={`w-4 h-4 ${goldAcc}`} />
                  <span>View Guest Site</span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Banner Card */}
        <div className={`p-4 m-4 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/3' : 'bg-white/60'} space-y-2`}>
          <div className="flex items-center space-x-2">
            <span className="text-sm">🏛️</span>
            <h5 className="font-serif font-bold text-xs truncate">Devon House Heritage</h5>
          </div>
          <p className={`text-[10px] leading-relaxed ${textMuted}`}>
            Al-fresco chophouse seating, cellar reservations & maître d' management.
          </p>
          <button
            onClick={onBackToSite}
            className={`w-full py-2 ${goldBg} text-black font-bold text-[10px] uppercase tracking-widest rounded-lg transition hover:opacity-90 cursor-pointer`}
          >
            Visit Guest Site
          </button>
        </div>
      </aside>

      {/* MAIN CANVAS */}
      <div className={`flex-1 flex flex-col min-w-0 ${bgPage}`}>
        {/* TOP BAR */}
        <header className={`h-16 ${bgSide} border-b ${borderCol} px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs`}>
          {/* Left: Hamburger & Search */}
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-xl border ${borderCol} ${textMain} hover:${darkMode ? 'bg-white/5' : 'bg-black/5'} cursor-pointer`}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="relative flex-1">
              <Search className={`w-3.5 h-3.5 ${goldAcc} absolute left-3.5 top-1/2 -translate-y-1/2 opacity-70`} />
              <input
                type="text"
                placeholder="Search reservations, VIP guests..."
                className={`w-full ${darkMode ? 'bg-white/4' : 'bg-white'} border ${borderCol} focus:border-[#c5a059] rounded-xl pl-9 pr-10 py-2 text-xs ${textMain} placeholder:${textMuted} outline-none transition`}
              />
              <span className={`hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold ${goldAcc} ${darkMode ? 'bg-white/6' : 'bg-black/5'} border ${borderCol} px-1.5 py-0.5 rounded`}>
                ⌘F
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Theme Toggle in Admin! */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`p-2 rounded-full transition cursor-pointer ${
                  darkMode ? 'text-[#c5a059] hover:bg-white/10' : 'text-black/70 hover:bg-black/5'
                }`}
                title="Toggle light/dark mode"
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            )}

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-9 h-9 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/4' : 'bg-white'} flex items-center justify-center ${goldAcc} relative transition hover:opacity-80 cursor-pointer`}
              title="Guest Messages"
            >
              <Mail className="w-3.5 h-3.5" />
              {stats.pending > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${goldBg} text-black text-[9px] font-bold flex items-center justify-center shadow-xs`}>
                  {stats.pending}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-9 h-9 rounded-xl border ${borderCol} ${darkMode ? 'bg-white/4' : 'bg-white'} flex items-center justify-center ${goldAcc} relative transition hover:opacity-80 cursor-pointer`}
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${goldBg}`} />
            </button>

            {/* Profile */}
            <div className={`flex items-center space-x-2.5 pl-2 border-l ${borderCol}`}>
              <div className={`w-8 h-8 rounded-full ${goldBg} text-black font-serif font-bold text-xs flex items-center justify-center shadow-sm`}>
                VR
              </div>
              <div className="hidden sm:block text-left">
                <h4 className="text-xs font-bold leading-tight truncate max-w-[120px]">
                  Maître D'
                </h4>
                <span className={`text-[10px] ${goldAcc} block leading-tight truncate max-w-[120px]`}>
                  Devon House
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY CANVAS */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectQuote={(q) => setModalQuote(q)}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'orders' && <OrdersView darkMode={darkMode} />}

          {activeTab === 'inbox' && (
            <InboxView onOpenFullQuote={(q) => setModalQuote(q)} darkMode={darkMode} />
          )}

          {activeTab === 'settings' && <AdminSettings darkMode={darkMode} />}
        </main>
      </div>

      {/* Modals */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={() => {
          quotesApi.getStats().then(setStats).catch(() => {});
        }}
      />
    </div>
  );
}
