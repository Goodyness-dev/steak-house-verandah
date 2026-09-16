import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, MessageSquare, 
  Settings, LogOut, ExternalLink, Search, 
  Bell, Mail, Utensils, Menu, X, Plus, Calendar, ShieldCheck
} from '../common/Icons';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

function getInitials(name) {
  if (!name) return 'VR';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
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
    { id: 'orders', label: 'Table Reservations', icon: ClipboardList, badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Guest Messages', icon: MessageSquare, badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#0a1510] text-[#ded7c8] font-sans flex antialiased">
      {/* LEFT SIDEBAR (Desktop & Mobile Drawer) */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d1e16] border-r border-[#c5a059]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#183327] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-serif font-bold text-sm tracking-tight text-white block leading-tight truncate">
                  The Verandah
                </span>
                <span className="text-[10px] text-[#c5a059] font-semibold uppercase tracking-wider block">
                  Maître D' Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#ded7c8]/60 hover:text-white shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENU Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest px-3 block">
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
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#c5a059] text-[#0d1e16] font-bold shadow-md'
                        : 'text-[#ded7c8]/80 hover:bg-[#142a20] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#0d1e16]' : 'text-[#c5a059]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#0d1e16] text-[#c5a059]'
                          : 'bg-[#183327] text-[#c5a059] border border-[#c5a059]/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* GENERAL Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest px-3 block">
              Administration
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-[#c5a059] text-[#0d1e16] font-bold shadow-md'
                    : 'text-[#ded7c8]/80 hover:bg-[#142a20] hover:text-white'
                }`}
              >
                <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-[#0d1e16]' : 'text-[#c5a059]'}`} />
                <span>Cellar & Service Settings</span>
              </button>

              <button
                onClick={onBackToSite}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-[#ded7c8]/80 hover:bg-[#142a20] hover:text-white transition"
              >
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-4 h-4 text-[#c5a059]" />
                  <span>View Guest Site</span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-red-400 hover:bg-red-950/40 transition"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Banner Card */}
        <div className="p-4 m-4 rounded-2xl bg-[#142a20] border border-[#c5a059]/30 text-[#ded7c8] space-y-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-base">🍾</span>
            <h5 className="font-serif font-bold text-xs text-white truncate">Devon House Heritage</h5>
          </div>
          <p className="text-[11px] text-[#ded7c8]/70 leading-snug">
            Al-fresco estate seating, sommelier cellar reservations, and guest hospitality management.
          </p>
          <button
            onClick={onBackToSite}
            className="w-full py-2 bg-[#c5a059] hover:bg-[#d8b46e] text-[#0d1e16] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
          >
            Visit Guest Site
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS & TOP BAR */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a1510]">
        {/* TOP BAR */}
        <header className="h-20 bg-[#0d1e16] border-b border-[#c5a059]/20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
          {/* Left: Mobile hamburger & Search */}
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#c5a059]/30 text-[#ded7c8] hover:bg-[#142a20]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#c5a059]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reservations, VIP guests, wine requests..."
                className="w-full bg-[#142a20] border border-[#c5a059]/30 focus:border-[#c5a059] rounded-2xl pl-10 pr-12 py-2 text-xs text-white placeholder:text-[#ded7c8]/40 outline-none transition"
              />
              <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#c5a059] bg-[#0d1e16] border border-[#c5a059]/30 px-1.5 py-0.5 rounded">
                ⌘F
              </span>
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setActiveTab('inbox')}
              className="w-10 h-10 rounded-2xl bg-[#142a20] border border-[#c5a059]/30 hover:border-[#c5a059] flex items-center justify-center text-[#c5a059] relative transition"
              title="Guest Inbox"
            >
              <Mail className="w-4 h-4" />
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-[#0d1e16] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {stats.pending}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className="w-10 h-10 rounded-2xl bg-[#142a20] border border-[#c5a059]/30 hover:border-[#c5a059] flex items-center justify-center text-[#c5a059] relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c5a059]" />
            </button>

            {/* Admin Profile Card */}
            <div className="flex items-center space-x-3 pl-2 border-l border-[#c5a059]/20">
              <div className="w-10 h-10 rounded-2xl bg-[#c5a059] text-[#0d1e16] font-serif font-bold text-sm flex items-center justify-center shadow-md">
                VR
              </div>
              <div className="hidden sm:block text-left">
                <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
                  Maître D'
                </h4>
                <span className="text-[11px] text-[#c5a059] block leading-tight truncate max-w-[130px]">
                  Devon House, Kingston
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CANVAS */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectQuote={(q) => setModalQuote(q)}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && <OrdersView />}

          {activeTab === 'inbox' && (
            <InboxView onOpenFullQuote={(q) => setModalQuote(q)} />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      {/* New Manual Reservation Modal */}
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
