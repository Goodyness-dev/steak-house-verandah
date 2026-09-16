import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Utensils, AlertCircle, ArrowLeft, Loader2, ShieldCheck, Sparkles } from '../common/Icons';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your concierge passkey.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1e16] text-[#ded7c8] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#183327]/60 rounded-full blur-2xl pointer-events-none" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#c5a059] hover:text-white transition px-4 py-2 rounded-xl bg-[#142a20] border border-[#c5a059]/30 hover:border-[#c5a059] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#c5a059]" />
          <span>Return to Verandah Guest Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#142a20] border-2 border-[#c5a059]/40 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.15)] relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#183327] border-2 border-[#c5a059]/50 text-[#c5a059] mb-4 shadow-lg shadow-[#c5a059]/20">
            <Utensils className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            Estate Concierge
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold mt-1">
            Devon House · Kingston 10, Jamaica
          </p>
          <p className="text-xs text-[#ded7c8]/60 mt-2">
            Maître d' management portal for table reservations, wine cellar inquiries, and guest preferences.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-start space-x-3 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
              Concierge Passkey
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c5a059]/60">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access credentials..."
                className="w-full bg-[#0d1e16] border border-[#c5a059]/30 focus:border-[#c5a059] rounded-2xl pl-11 pr-12 py-3 text-sm text-white placeholder:text-[#ded7c8]/40 outline-none transition"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#c5a059]/60 hover:text-[#c5a059] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#ded7c8]/50 mt-2">
              Default demo credential: <code className="text-[#c5a059] font-mono font-bold">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-[#0d1e16] font-bold text-xs uppercase tracking-widest rounded-2xl transition shadow-[0_0_20px_rgba(197,160,89,0.3)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Concierge Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#c5a059]/20 text-center">
          <p className="text-[11px] text-[#ded7c8]/60 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>1881 George Stiebel Heritage Estate · All Rights Reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
}
