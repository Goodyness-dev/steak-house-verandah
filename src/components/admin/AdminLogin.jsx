import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, VerandahLogo, Key } from '../common/Icons';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

const DEMO_PASSWORD = 'verandah2024';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
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

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f7f4ec] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,149,90,0.07) 0%, transparent 70%)' }} />

      {/* Back to site */}
      <div className="w-full max-w-sm mb-8 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Verandah
        </button>
      </div>

      {/* Login card */}
      <div
        className="w-full max-w-sm z-10 rounded-2xl p-8 sm:p-10"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{ border: '1px solid rgba(197,160,89,0.4)', background: 'rgba(197,160,89,0.06)' }}>
            <VerandahLogo className="w-7 h-7 text-[#c5a059]" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
            Maître D' Portal
          </h1>
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mt-1 text-[#c5a059]">
            The Steak House on The Verandah
          </p>
          <p className="text-xs text-white/35 mt-3 leading-relaxed">
            Reservation management · Guest inbox · Dashboard
          </p>
        </div>

        {/* Credential hint */}
        <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(197,160,89,0.07)', border: '1px solid rgba(197,160,89,0.2)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#c5a059]">Demo Access Key</span>
            </div>
          </div>
          <code className="text-sm text-white font-mono block mb-3">{DEMO_PASSWORD}</code>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={autofill}
              className="flex-1 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition-opacity hover:opacity-80"
              style={{ background: '#c5a059', color: '#0c0c0c' }}
            >
              Autofill
            </button>
            <button
              type="button"
              onClick={copyKey}
              className="flex-1 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-lg cursor-pointer transition-opacity hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl flex items-start gap-3 text-xs text-red-300"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Lock className="w-4 h-4 text-white/30" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access key"
              autoComplete="current-password"
              className="w-full py-3.5 pl-11 pr-12 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(197,160,89,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer disabled:opacity-50"
            style={{ background: '#c5a059', color: '#0c0c0c' }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying…
              </span>
            ) : (
              'Enter Portal'
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-white/20 mt-6">
          {BUSINESS_INFO.address} · {BUSINESS_INFO.phone}
        </p>
      </div>
    </div>
  );
}
