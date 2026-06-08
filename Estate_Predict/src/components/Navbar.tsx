import { motion } from 'motion/react';
import { Landmark, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'predictor' | 'historical' | 'how-it-works';
  setActiveTab: (tab: 'predictor' | 'historical' | 'how-it-works') => void;
  onSignInClick: () => void;
  userEmail: string | null;
  onSignOut: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onSignInClick, userEmail, onSignOut }: NavbarProps) {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setActiveTab('predictor')}
          id="brand-logo"
        >
          <div className="w-9 h-9 bg-slate-900 rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
            <Landmark className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-lg text-slate-900 tracking-tight leading-none">
              EstatePredict
            </span>
            <span className="font-mono text-[9px] tracking-widest text-slate-500 font-bold uppercase mt-0.5">
              AI ANALYTICS
            </span>
          </div>
        </div>

        {/* Central Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-8 h-full" id="desktop-nav">
          {[
            { id: 'predictor', label: 'Predictor' },
            { id: 'historical', label: 'Historical Data' },
            { id: 'how-it-works', label: 'How it Works' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative font-sans text-sm font-medium transition-colors h-16 px-1 flex items-center ${
                  isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                id={`tab-btn-${tab.id}`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile / Auth Button */}
        <div className="flex items-center gap-4" id="auth-section">
          {userEmail ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-sans text-xs font-semibold text-slate-900">{userEmail}</span>
                <span className="font-sans text-[10px] text-emerald-500 flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3 h-3" /> Certified Broker
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="font-sans text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded transition-colors"
                id="sign-out-btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onSignInClick}
              className="font-sans text-xs font-bold tracking-wide uppercase px-6 py-2.5 bg-black hover:bg-slate-800 text-white rounded transition-all duration-200 hover:shadow-sm"
              id="sign-in-btn"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
