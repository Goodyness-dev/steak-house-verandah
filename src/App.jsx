import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import AboutSection from './components/home/AboutSection';
import AmenitiesSection from './components/home/AmenitiesSection';
import CTASection from './components/home/CTASection';
import ReviewsSection from './components/home/ReviewsSection';
import LocationHoursSection from './components/home/LocationHoursSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { Phone, Calendar } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);
  const [wizardService, setWizardService] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Default to light mode (Gilded Grill aesthetic)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('verandah_theme');
      if (saved) return saved === 'dark';
      return false; // light mode default
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => { if (res.authenticated) { setIsAdminAuthenticated(true); setAdminUser(res.user); } })
        .catch(() => setIsAdminAuthenticated(false));
    }
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0c0c0c';
      document.body.style.color = '#f7f4ec';
      localStorage.setItem('verandah_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f5f0e8';
      document.body.style.color = '#0d0d0d';
      localStorage.setItem('verandah_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    const checkRoute = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase().replace(/\/$/, '');
      if (hash === '#/admin' || hash === '#admin' || path === '/admin') {
        setCurrentPage('admin');
      } else if (hash === '#/services' || hash === '#services' || path === '/services') {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '#/services';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '';
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWizard = (category = null, service = null) => {
    setWizardCategory(category);
    setWizardService(service);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
    setWizardService(null);
  };

  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => { setIsAdminAuthenticated(false); setAdminUser(null); }}
        onBackToSite={() => handleNavigate('home')}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => { setIsAdminAuthenticated(true); setAdminUser(user); }}
        onBackToSite={() => handleNavigate('home')}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  const dm = darkMode;

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-300"
      style={{ backgroundColor: dm ? '#0c0c0c' : '#f5f0e8', color: dm ? '#f7f4ec' : '#0d0d0d' }}
    >
      <Navbar
        onOpenWizard={handleOpenWizard}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={dm}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow">
        {currentPage === 'services' ? (
          <AllServicesPage
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
            darkMode={dm}
          />
        ) : (
          <>
            <Hero onOpenWizard={handleOpenWizard} darkMode={dm} onToggleDarkMode={toggleDarkMode} />
            <ServicesSection
              onOpenWizard={handleOpenWizard}
              onViewAllServices={() => handleNavigate('services')}
              darkMode={dm}
            />
            <AboutSection onOpenWizard={handleOpenWizard} darkMode={dm} />
            <AmenitiesSection onOpenWizard={handleOpenWizard} darkMode={dm} />
            <CTASection onOpenWizard={handleOpenWizard} darkMode={dm} />
            <ReviewsSection onOpenWizard={handleOpenWizard} darkMode={dm} />
            <LocationHoursSection onOpenWizard={handleOpenWizard} darkMode={dm} />
          </>
        )}
      </main>

      <Footer onOpenWizard={handleOpenWizard} onNavigate={handleNavigate} darkMode={dm} />

      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
        initialService={wizardService}
      />

      {/* Mobile bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 sm:hidden backdrop-blur-md p-2.5 flex items-center gap-2.5 shadow-2xl border-t"
        style={{
          backgroundColor: dm ? 'rgba(12,12,12,0.95)' : 'rgba(245,240,232,0.97)',
          borderColor: dm ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex-1 py-3 px-3 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition border"
          style={{
            backgroundColor: dm ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderColor: dm ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
            color: dm ? '#c5a059' : '#b8955a',
          }}
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>
        <button
          onClick={() => handleOpenWizard()}
          className="flex-2 flex-1 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition cursor-pointer"
          style={{ backgroundColor: '#b8955a', color: '#fff' }}
        >
          <Calendar className="w-4 h-4" />
          <span>Reserve Table</span>
        </button>
      </div>
    </div>
  );
}
