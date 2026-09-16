import React, { useState, useEffect } from 'react';
import { 
  SERVICES, 
  SERVICE_CATEGORIES 
} from '../../data/servicesData';
import { 
  Utensils,
  Wine,
  Sparkles,
  Flame,
  ArrowRight, 
  ArrowLeft,
  Search,
  Phone,
  Clock,
  CheckCircle2
} from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All Cuts & Offerings');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All Cuts & Offerings' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d1e16] text-[#ded7c8] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#c5a059]/20 mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-[#ded7c8] hover:text-[#c5a059] bg-[#142a20] border border-[#c5a059]/30 hover:border-[#c5a059] px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#c5a059]" />
            <span>Return to Verandah</span>
          </button>

          <div className="flex items-center space-x-3 text-sm">
            <span className="text-[#ded7c8]/60 hidden sm:inline">Sommelier & Host Stand:</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-[#c5a059] font-bold hover:text-white flex items-center space-x-2 transition"
            >
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183327] border border-[#c5a059]/30 text-[#c5a059] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devon House Estate Dining</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            The Complete Verandah Repertoire
          </h1>
          <p className="text-[#ded7c8]/70 mt-4 text-base sm:text-xl font-serif italic leading-relaxed">
            Himalayan salt dry-aged prime beef, wild Caribbean seafood, and heritage cellar pairings served in Kingston's historic 1881 estate.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-12 bg-[#142a20] p-5 rounded-3xl border border-[#c5a059]/30 shadow-lg">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-center md:justify-start">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  selectedCategory === category
                    ? 'bg-[#c5a059] text-[#0d1e16] font-bold shadow-md'
                    : 'bg-[#183327] text-[#ded7c8]/80 hover:text-white hover:bg-[#1f3f31] border border-[#c5a059]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c5a059]/60" />
            <input
              type="text"
              placeholder="Search steaks, lobster, cellar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0d1e16] border border-[#c5a059]/30 text-white placeholder:text-[#ded7c8]/40 focus:outline-none focus:border-[#c5a059] text-sm"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-thick-hover bg-[#142a20] border-2 border-[#c5a059]/30 rounded-3xl p-7 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold px-3 py-1 rounded-full bg-[#183327] border border-[#c5a059]/20">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#c5a059] text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.estTime || 'Pre-order available'}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-white mb-2.5 group-hover:text-[#c5a059] transition">
                  {service.title}
                </h2>

                <p className="text-sm text-[#ded7c8]/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {service.features && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#c5a059]/15">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#ded7c8]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#ded7c8]/50 block">Experience</span>
                  <span className="text-sm font-bold text-[#c5a059]">Estate Fine Dining</span>
                </div>
                <button
                  onClick={() => onOpenWizard(service.category, service.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a059] text-[#0d1e16] text-xs font-bold uppercase tracking-wider hover:bg-[#d8b46e] shadow transition"
                >
                  <span>Reserve Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-[#142a20] rounded-3xl border border-[#c5a059]/20 p-8">
            <Utensils className="w-12 h-12 text-[#c5a059] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif font-bold text-white mb-2">No selections match your search</h3>
            <p className="text-sm text-[#ded7c8]/60 mb-6">
              Please try adjusting your query or view our full à la carte menu.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Cuts & Offerings'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-xl bg-[#c5a059] text-[#0d1e16] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b46e] transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
