import React, { useState } from 'react';
import DATABASE from './news.json';

// UI Translations
const UI_STRINGS = {
            en: {
                briefingTitle: "Your briefing",
                date: "Tuesday, August 25, 2026",
                weatherCity: "Casablanca weather",
                topStories: "Top stories",
                seeMore: "See more headlines & perspectives",
                picksForYou: "Picks for you",
                back: "Back to Briefing",
                tabs: { home: "Home", public: "Public Education", private: "Private Education" },
                catTitles: {
                    cat1: "Regulatory Overhaul & Structural Shifts in Education",
                    cat2: "The State's Pedagogical Counter-Offensive",
                    cat3: "Strategic Pivot Away from the French Mission",
                    cat4: "Real Estate & EdTech Innovation"
                }
            },
            fr: {
                briefingTitle: "Votre briefing",
                date: "Mardi 25 Août 2026",
                weatherCity: "Météo Casablanca",
                topStories: "À la une",
                seeMore: "Voir plus de titres et de perspectives",
                picksForYou: "Sélection pour vous",
                back: "Retour au briefing",
                tabs: { home: "Accueil", public: "Enseignement Public", private: "Enseignement Privé" },
                 catTitles: {
                    cat1: "Refonte Réglementaire et Changements Structurels",
                    cat2: "La Contre-offensive Pédagogique de l'État",
                    cat3: "Pivot Stratégique Loin de la Mission Française",
                    cat4: "Innovation Immobilière et EdTech"
                }
            },
            ar: {
                briefingTitle: "موجز الأخبار",
                date: "الثلاثاء 25 أغسطس 2026",
                weatherCity: "طقس الدار البيضاء",
                topStories: "أهم الأخبار",
                seeMore: "عرض المزيد من العناوين والآراء",
                picksForYou: "مختارات لك",
                back: "العودة إلى الموجز",
                tabs: { home: "الرئيسية", public: "التعليم العمومي", private: "التعليم الخصوصي" },
                catTitles: {
                    cat1: "الإصلاح التنظيمي والتحولات الهيكلية في التعليم",
                    cat2: "الهجوم التربوي المضاد للدولة",
                    cat3: "التحول الاستراتيجي بعيداً عن البعثة الفرنسية",
                    cat4: "الابتكار العقاري وتكنولوجيا التعليم"
                }
            }
        };

export default function News() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [showExtra, setShowExtra] = useState(false);

  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const isRTL = currentLang === 'ar';

  const openArticle = (id) => {
    setActiveArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setActiveArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeArticle = activeArticleId && DATABASE[activeArticleId] ? DATABASE[activeArticleId] : null;
  const activeArticleContent = activeArticle && activeArticle[currentLang] ? activeArticle[currentLang] : null;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-full w-full bg-[#FAFAFA] dark:bg-[#0a0a0c] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200 ${
        isRTL ? "font-['Cairo',sans-serif]" : ''
      }`}
    >
      {/* ── Sub Navigation & Language Bar ────────────────────────────── */}
      <header className="border-b border-zinc-200 dark:border-zinc-800/80 sticky top-0 bg-[#FAFAFA]/95 dark:bg-[#0a0a0c]/95 backdrop-blur-sm z-20 transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
          {/* Category Tabs */}
          <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 no-scrollbar">
            <button
              onClick={() => { setActiveTab('home'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'home'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.home}
            </button>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <button
              onClick={() => { setActiveTab('public'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'public'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.public}
            </button>
            <button
              onClick={() => { setActiveTab('private'); closeArticle(); }}
              className={`pb-3 -mb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'private'
                  ? 'text-[#1A73E8] dark:text-[#8AB4F8] border-[#1A73E8] dark:border-[#8AB4F8]'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t.tabs.private}
            </button>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l rtl:border-l-0 rtl:border-r border-zinc-200 dark:border-zinc-800 pl-4 rtl:pl-0 rtl:pr-4 ml-4 rtl:ml-0 rtl:mr-4 shrink-0">
            <button
              onClick={() => setCurrentLang('en')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'en'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('fr')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'fr'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setCurrentLang('ar')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                currentLang === 'ar'
                  ? 'bg-[#D2E3FC] dark:bg-[#1A3F6F] text-[#041E49] dark:text-[#D2E3FC]'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container ───────────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ── VIEW 1: Feed View ──────────────────────────────────────── */}
        {!activeArticleId && (
          <div className="transition-opacity duration-300">
            {/* Header / Briefing info & Weather */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight mb-1 text-zinc-900 dark:text-zinc-100">
                  {t.briefingTitle}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
                  {t.date}
                </p>
              </div>

              {/* Weather Pill */}
              <div className="flex items-center bg-white dark:bg-[#141418] rounded-full pl-4 pr-5 py-2 hover:shadow-sm border border-zinc-200 dark:border-zinc-800/80 transition-all cursor-pointer w-fit">
                <div className="text-zinc-400 mr-3 rtl:mr-0 rtl:ml-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7">
                    <svg className="w-7 h-7 text-amber-500 absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                      {t.weatherCity}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">31°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dual-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: News Feed */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                <div className="flex items-center text-[#1A73E8] dark:text-[#8AB4F8] w-fit mb-1 cursor-default">
                  <h2 className="text-xl font-medium">{t.topStories}</h2>
                  <svg className="w-5 h-5 ml-1 rtl:mr-1 rtl:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* ── Cluster 1: Regulatory Overhaul (Private) ──────────────── */}
                {(activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat1}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      {/* Hero card */}
                      <div
                        onClick={() => openArticle('law-59-21')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['law-59-21'].image}
                            alt="Legal"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['law-59-21']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['law-59-21']?.[currentLang]?.meta}
                        </p>
                      </div>

                      {/* Right list items */}
                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('conseil-concurrence')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['conseil-concurrence']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['conseil-concurrence']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('tax-dilemma')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['tax-dilemma']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['tax-dilemma']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('africa50-holged')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['africa50-holged']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['africa50-holged']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {!showExtra && (
                      <button
                        onClick={() => setShowExtra(true)}
                        className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-[#141418] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-sm font-medium transition-colors border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm active:scale-[0.99]"
                      >
                        <svg className="w-4 h-4 text-[#1A73E8] dark:text-[#8AB4F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{t.seeMore}</span>
                      </button>
                    )}
                  </div>
                )}

                {activeTab === 'home' && <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />}

                {/* ── Cluster 2: Pedagogical Counter-Offensive (Public) ──────── */}
                {(activeTab === 'home' || activeTab === 'public') && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat2}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('ecoles-pionnieres')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['ecoles-pionnieres'].image}
                            alt="Classroom"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['ecoles-pionnieres']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['ecoles-pionnieres']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('talent-war')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['talent-war']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['talent-war']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('teacher-wages')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['teacher-wages']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['teacher-wages']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'home' && <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />}

                {/* ── Cluster 3: Strategic Pivot (Private) ──────────────────── */}
                {(activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4 pb-2">
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat3}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('aefe-crisis')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['aefe-crisis'].image}
                            alt="Campus"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['aefe-crisis']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['aefe-crisis']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div className="flex flex-col justify-start">
                        <div
                          onClick={() => openArticle('ib-cambridge')}
                          className="group cursor-pointer py-3 border-b border-zinc-200 dark:border-zinc-800/80 first:pt-0"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['ib-cambridge']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['ib-cambridge']?.[currentLang]?.meta}
                          </p>
                        </div>
                        
                        <div
                          onClick={() => openArticle('domestic-higher-ed')}
                          className="group cursor-pointer py-3"
                        >
                          <h4 className="text-sm font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-1.5 text-zinc-900 dark:text-zinc-100 transition-colors">
                            {DATABASE['domestic-higher-ed']?.[currentLang]?.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {DATABASE['domestic-higher-ed']?.[currentLang]?.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* ── Expandable Cluster 4: Real Estate & EdTech ────────────── */}
                {showExtra && (activeTab === 'home' || activeTab === 'private') && (
                  <div className="flex flex-col gap-4 pb-6">
                    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/80 my-1" />
                    <h3 className="text-xl font-normal flex items-center text-zinc-900 dark:text-zinc-100">
                      {t.catTitles.cat4}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-1">
                      <div
                        onClick={() => openArticle('opci-revolution')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['opci-revolution'].image}
                            alt="Real Estate"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['opci-revolution']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['opci-revolution']?.[currentLang]?.meta}
                        </p>
                      </div>

                      <div
                        onClick={() => openArticle('edtech-integration')}
                        className="flex flex-col group cursor-pointer"
                      >
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] relative shadow-sm">
                          <img
                            src={DATABASE['edtech-integration'].image}
                            alt="EdTech"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-[17px] font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] mb-2 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['edtech-integration']?.[currentLang]?.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                          {DATABASE['edtech-integration']?.[currentLang]?.meta}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* ── Right Column: Picks for You Sidebar ──────────────── */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-[#141418] rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/80 sticky top-20 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {t.picksForYou}
                    </h2>
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <div
                      onClick={() => openArticle('casablanca-epicenter')}
                      className="flex items-start gap-3.5 group cursor-pointer py-3.5 border-b border-zinc-100 dark:border-zinc-800/60 first:pt-0"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['casablanca-epicenter']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['casablanca-epicenter']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['casablanca-epicenter'].image}
                          alt="Casablanca"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => openArticle('rabat-higher-ed')}
                      className="flex items-start gap-3.5 group cursor-pointer py-3.5 border-b border-zinc-100 dark:border-zinc-800/60"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['rabat-higher-ed']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['rabat-higher-ed']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['rabat-higher-ed'].image}
                          alt="University"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => openArticle('marrakech-montessori')}
                      className="flex items-start gap-3.5 group cursor-pointer pt-3.5"
                    >
                      <div className="flex-grow">
                        <h4 className="text-xs font-medium leading-snug group-hover:text-[#1A73E8] dark:group-hover:text-[#8AB4F8] line-clamp-3 text-zinc-900 dark:text-zinc-100 transition-colors">
                          {DATABASE['marrakech-montessori']?.[currentLang]?.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5">
                          {DATABASE['marrakech-montessori']?.[currentLang]?.meta}
                        </p>
                      </div>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
                        <img
                          src={DATABASE['marrakech-montessori'].image}
                          alt="Expansion"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── VIEW 2: Article Reader View ────────────────────────────── */}
        {activeArticleId && activeArticle && activeArticleContent && (
          <div className="max-w-[800px] mx-auto py-2 transition-opacity duration-300">
            {/* Back Button */}
            <button
              onClick={closeArticle}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#141418] hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors mb-6 group shadow-sm active:scale-95"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isRTL ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"}
                />
              </svg>
              <span>{t.back}</span>
            </button>
            
            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight text-zinc-900 dark:text-zinc-100 mb-4">
              {activeArticleContent.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <span>{activeArticleContent.meta}</span>
            </div>

            {/* Featured Hero Image */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141418] shadow-sm">
              <img
                src={activeArticle.image}
                alt={activeArticleContent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div
              className="text-[16px] leading-relaxed text-zinc-800 dark:text-zinc-200 space-y-5 pb-16"
              dangerouslySetInnerHTML={{ __html: activeArticleContent.content }}
            />
          </div>
        )}

      </main>
    </div>
  );
}
