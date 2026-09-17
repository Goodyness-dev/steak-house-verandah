import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, VerandahLogo, Key } from '../common/Icons';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

const DEMO_PASSWORD = 'verandah2024';

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

export default function AdminLogin({ onLoginSuccess, onBackToSite, darkMode = true, onToggleDarkMode }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) { setError('Enter your access key.'); return; }
    setIsLoading(true);
    setError('');
    try {
      const result = await authApi.login(password);
      if (result.success) onLoginSuccess(result.user);
      else setError(result.error || 'Invalid access key.');
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const autofill = () => setPassword(DEMO_PASSWORD);
  const copyKey = () => { navigator.clipboard.writeText(DEMO_PASSWORD); };

  const bgPage    = darkMode ? 'bg-[#0c0c0c]' : 'bg-[#f5f0e8]';
  const textMain  = darkMode ? 'text-[#f7f4ec]' : 'text-[#0d0d0d]';
  const textMuted = darkMode ? 'text-white/40' : 'text-black/50';
  const goldAcc   = darkMode ? 'text-[#c5a059]' : 'text-[#b8955a]';
  const goldBg    = darkMode ? 'bg-[#c5a059]' : 'bg-[#b8955a]';
  const cardBg    = darkMode ? 'bg-white/3' : 'bg-white/80';
  const borderCol = darkMode ? 'border-white/8' : 'border-black/8';

  return (
    <div className={`min-h-screen ${bgPage} ${textMain} flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans transition-colors duration-300`}>
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,149,90,0.06) 0%, transparent 70%)' }} 
      />

      {/* Top action row: Back to site + Theme toggle */}
      <div className="w-full max-w-sm mb-6 z-10 flex items-center justify-between">
        <button
          onClick={onBackToSite}
          className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase ${textMuted} hover:${textMain} transition cursor-pointer`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Verandah
        </button>

        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full transition cursor-pointer ${
              darkMode ? 'text-[#c5a059] hover:bg-white/10' : 'text-black/70 hover:bg-black/5'
            }`}
            title="Toggle theme"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        )}
      </div>

      {/* Login card */}
      <div
        className={`w-full max-w-sm z-10 rounded-2xl p-8 sm:p-10 ${cardBg} border ${borderCol} shadow-2xl backdrop-blur-md`}
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 border"
            style={{ 
              borderColor: darkMode ? 'rgba(197,160,89,0.4)' : 'rgba(184,149,90,0.4)', 
              background: darkMode ? 'rgba(197,160,89,0.06)' : 'rgba(184,149,90,0.08)' 
            }}
          >
            <VerandahLogo className={`w-7 h-7 ${goldAcc}`} />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Maître D' Portal
          </h1>
          <p className={`text-[9px] tracking-[0.25em] uppercase font-bold mt-1 ${goldAcc}`}>
            The Steak House on The Verandah
          </p>
          <p className={`text-xs ${textMuted} mt-2 leading-relaxed`}>
            Reservation management · Guest inbox · Dashboard
          </p>
        </div>

        {/* Demo Credential Card */}
        <div 
          className="mb-5 p-4 rounded-xl border"
          style={{ 
            background: darkMode ? 'rgba(197,160,89,0.06)' : 'rgba(184,149,90,0.08)', 
            borderColor: darkMode ? 'rgba(197,160,89,0.25)' : 'rgba(184,149,90,0.25)' 
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key className={`w-3.5 h-3.5 ${goldAcc}`} />
              <span className={`text-[9px] font-bold tracking-widest uppercase ${goldAcc}`}>Demo Access Key</span>
            </div>
          </div>
          <code className="text-sm font-mono block mb-3 font-semibold">{DEMO_PASSWORD}</code>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={autofill}
              className={`flex-1 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition hover:opacity-90 ${goldBg} text-black`}
            >
              Autofill
            </button>
            <button
              type="button"
              onClick={copyKey}
              className={`flex-1 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition hover:opacity-80 border ${borderCol} ${darkMode ? 'bg-white/6 text-white/70' : 'bg-black/5 text-black/70'}`}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl flex items-start gap-2.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Lock className={`w-4 h-4 ${textMuted}`} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access key"
              autoComplete="current-password"
              className={`w-full py-3.5 pl-11 pr-12 rounded-xl text-sm ${textMain} ${darkMode ? 'bg-white/4' : 'bg-white'} border ${borderCol} placeholder:${textMuted} outline-none transition`}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
              onBlur={e => e.target.style.borderColor = ''}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${textMuted} hover:${textMain} cursor-pointer`}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 ${goldBg} text-black hover:opacity-90 shadow-sm`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Verifying…
              </span>
            ) : (
              'Enter Portal'
            )}
          </button>
        </form>

        <p className={`text-center text-[10px] ${textMuted} mt-6`}>
          {BUSINESS_INFO.address} · {BUSINESS_INFO.phone}
        </p>
      </div>
    </div>
  );
}
