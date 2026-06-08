import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PropertyInput, PredictionResult } from '../types';
import { LOCATIONS, PROPERTY_TYPES, SOCIETY_FEATURES, predictPrice } from '../utils/predictorEngine';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Gauge, 
  Info, 
  Sparkles, 
  ArrowUpRight, 
  BookmarkCheck, 
  Calculator, 
  HelpCircle,
  Clock,
  Layers,
  Car,
  Home
} from 'lucide-react';

interface PredictorFormProps {
  onPredictionComplete: (input: PropertyInput, result: PredictionResult) => void;
  savedPredictionsCount: number;
}

export default function PredictorForm({ onPredictionComplete, savedPredictionsCount }: PredictorFormProps) {
  const [formData, setFormData] = useState<PropertyInput>({
    area: 1650,
    location: 'Bandra (West)',
    bedrooms: 3,
    propertyType: 'Apartment',
    floorNo: 4,
    parking: 'Available',
    age: 5,
    societyFeatures: 'Premium (Gym, Clubhouse, Gated Security)'
  });

  const [isPredicting, setIsPredicting] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      let parsedValue: string | number = value;
      if (name === 'area' || name === 'bedrooms' || name === 'floorNo' || name === 'age') {
        parsedValue = value === '' ? '' as any : Number(value);
      }
      return {
        ...prev,
        [name]: parsedValue
      };
    });
  };

  const handleQuickPreset = (preset: Partial<PropertyInput>) => {
    setFormData(prev => ({ ...prev, ...preset }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.area || formData.area <= 0) {
      alert("Please enter a valid area in square feet.");
      return;
    }
    
    setIsPredicting(true);
    setSavedSuccess(false);
    
    // Simulate high-fidelity AI computation latency style
    setTimeout(() => {
      const result = predictPrice(formData);
      setCurrentResult(result);
      setIsPredicting(false);
      onPredictionComplete(formData, result);
    }, 850);
  };

  const handleSaveToHistory = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Helper to format rupees in Crores / Lakhs
  const formatCrore = (num: number) => {
    return `₹${num.toFixed(2)} Cr`;
  };

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="predictor-panel">
      
      {/* Left Column: Input Form (7 cols on large screens) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2" id="quick-presets">
          <span className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Load Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => handleQuickPreset({
              area: 3200,
              location: 'Golf Links (Delhi)',
              bedrooms: 4,
              propertyType: 'Villa',
              floorNo: 0,
              parking: 'Available',
              age: 2,
              societyFeatures: 'Ultra-Luxury (Helipad, Private Lounge, Smart Home Automation)'
            })}
            className="font-sans text-xs bg-slate-900/40 text-slate-300 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1.5 rounded transition-all"
            id="preset-luxury-estate"
          >
            🏰 Luxury Villa
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset({
              area: 1250,
              location: 'Koramangala (Bengaluru)',
              bedrooms: 2,
              propertyType: 'Apartment',
              floorNo: 8,
              parking: 'Available',
              age: 4,
              societyFeatures: 'Premium (Gym, Clubhouse, Gated Security)'
            })}
            className="font-sans text-xs bg-slate-900/40 text-slate-300 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1.5 rounded transition-all"
            id="preset-tech-exec"
          >
            🏢 Executive Suite
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset({
              area: 750,
              location: 'Whitefield (Bengaluru)',
              bedrooms: 1,
              propertyType: 'Studio',
              floorNo: 2,
              parking: 'Not Available',
              age: 12,
              societyFeatures: 'Standard (Basic Security, Power Backup)'
            })}
            className="font-sans text-xs bg-slate-900/40 text-slate-300 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1.5 rounded transition-all"
            id="preset-starter-home"
          >
            🏡 Starter Studio
          </button>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800/80 shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/20 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-8 h-8 rounded-md bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
              <Calculator className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-white">Property Parameters</h2>
              <p className="font-sans text-xs text-slate-400">Specify physical attributes and structural modifiers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="predictor-form">
            
            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              
              {/* AREA (SQFT) */}
              <div className="flex flex-col gap-1.5" id="form-group-area">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Area (sqft) <span className="text-emerald-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g. 1500"
                    min="100"
                    max="50000"
                    required
                    className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all placeholder:text-slate-600 outline-none"
                    id="input-area"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold uppercase text-slate-500">
                    SQFT
                  </span>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex flex-col gap-1.5" id="form-group-location">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="select-location"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc.name} value={loc.name} className="bg-slate-900 text-white font-sans text-sm">
                      {loc.name} ({loc.tier})
                    </option>
                  ))}
                </select>
              </div>

              {/* BEDROOMS */}
              <div className="flex flex-col gap-1.5" id="form-group-bedrooms">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-slate-500" />
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="select-bedrooms"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num} className="bg-slate-900 text-white font-sans text-sm">
                      {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                    </option>
                  ))}
                </select>
              </div>

              {/* PROPERTY TYPE */}
              <div className="flex flex-col gap-1.5" id="form-group-type">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-slate-500" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="select-property-type"
                >
                  {PROPERTY_TYPES.map(type => (
                    <option key={type} value={type} className="bg-slate-900 text-white font-sans text-sm">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* FLOOR NO */}
              <div className="flex flex-col gap-1.5" id="form-group-floor">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  Floor No.
                </label>
                <input
                  type="number"
                  name="floorNo"
                  value={formData.floorNo}
                  onChange={handleInputChange}
                  min="0"
                  max="120"
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="input-floor"
                />
              </div>

              {/* PARKING */}
              <div className="flex flex-col gap-1.5" id="form-group-parking">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-slate-500" />
                  Parking
                </label>
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="select-parking"
                >
                  <option value="Available" className="bg-slate-900 text-white font-sans text-sm">Available (Reserved)</option>
                  <option value="Not Available" className="bg-slate-900 text-white font-sans text-sm">No Dedicated Parking</option>
                </select>
              </div>

              {/* COGNITIVE ESTIMATOR OF PROPERTY AGE */}
              <div className="sm:col-span-2 flex flex-col gap-1.5" id="form-group-age">
                <div className="flex justify-between items-center">
                  <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Property Age (Years)
                  </label>
                  <span className="font-mono text-xs text-slate-300 font-semibold bg-slate-800 px-2 py-0.5 rounded">
                    {formData.age === 0 ? 'Brand New' : `${formData.age} yrs old`}
                  </span>
                </div>
                <input
                  type="range"
                  name="age"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  id="input-age-range"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 font-semibold mt-1">
                  <span>New Construction (0)</span>
                  <span>10 Years</span>
                  <span>20 Years</span>
                  <span>Vintage (30+)</span>
                </div>
              </div>

              {/* SOCIETY FEATURES */}
              <div className="sm:col-span-2 flex flex-col gap-1.5" id="form-group-features">
                <label className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                  Society & Luxury Features
                </label>
                <select
                  name="societyFeatures"
                  value={formData.societyFeatures}
                  onChange={handleInputChange}
                  className="w-full text-sm font-semibold text-white bg-slate-900/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 px-4 py-3 rounded transition-all outline-none"
                  id="select-features"
                >
                  {SOCIETY_FEATURES.map(feat => (
                    <option key={feat} value={feat} className="bg-slate-900 text-white font-sans text-sm">
                      {feat}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Form Actions Footer Shelf */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-4 justify-between">
              
              <div className="flex items-center gap-2.5 text-slate-400">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-sans text-[11px] sm:text-[12px] leading-tight max-w-[340px]">
                  Predictions are based on latest market trends and structural data.
                </span>
              </div>

              <button
                type="submit"
                disabled={isPredicting}
                className={`w-full sm:w-auto font-sans text-sm font-bold tracking-wide uppercase px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 rounded flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-550/10 cursor-pointer ${
                  isPredicting ? 'opacity-85 pointer-events-none' : ''
                }`}
                id="btn-predict"
              >
                {isPredicting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Executing Model...
                  </>
                ) : (
                  <>
                    Predict Price <ArrowUpRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

            </div>

          </form>
        </div>

      </div>

      {/* Right Column: Prediction Output Reveal (5 cols on large screens) */}
      <div className="lg:col-span-5 h-full">
        <AnimatePresence mode="wait">
          {!currentResult ? (
            <motion.div
              key="awaiting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/10 border border-slate-200 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[460px]"
              id="awaiting-panel"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                <Calculator className="w-7 h-7 text-slate-400 stroke-[1.5]" />
              </div>
              <h3 className="font-sans font-bold text-slate-800 text-lg leading-tight mb-2">Awaiting Parameters</h3>
              <p className="font-sans text-xs text-slate-500 max-w-[280px] leading-relaxed mx-auto">
                Fill in the property details on the left and click <strong className="text-emerald-600 font-semibold">Predict Price</strong> to trigger the institutional Linear Regression model.
              </p>
              
              <div className="mt-8 flex flex-col gap-2 p-3.5 bg-slate-50/65 rounded-lg border border-slate-150 text-left w-full max-w-[290px]">
                <span className="font-sans text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Active ML Configuration:
                </span>
                <span className="font-mono text-[11px] text-slate-600 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Model: LinearRegression
                </span>
                <span className="font-mono text-[11px] text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> One-Hot Features Loaded: 18
                </span>
                <span className="font-mono text-[11px] text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Saved State: house.pkl
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calculated"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col min-h-[460px]"
              id="results-panel"
            >
              {/* Core Output Banner */}
              <div className="bg-slate-900 p-6 sm:p-8 text-white relative">
                <div className="absolute top-0 right-0 p-5 opacity-10">
                  <Building2 className="w-24 h-24 stroke-[1]" />
                </div>
                
                <div className="flex items-center justify-between gap-2.5 mb-4 relative z-10">
                  <span className="font-sans text-[11px] font-extrabold tracking-widest text-emerald-400 uppercase">
                    Valuation Output
                  </span>
                  
                  {/* Confidence pill */}
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold px-2.5 py-1 rounded border border-emerald-500/25">
                    <Gauge className="w-3.5 h-3.5" />
                    {currentResult.confidenceScore}% Confidence
                  </div>
                </div>

                <div className="relative z-10 mb-1" id="display-price-container">
                  <span className="font-sans font-extrabold text-4xl sm:text-5xl text-glow-emerald text-emerald-400 leading-none">
                    {formatCrore(currentResult.predictedPrice)}
                  </span>
                  <span className="font-sans text-xs text-slate-400 ml-2 font-medium">
                    ({(currentResult.predictedPrice * 10).toFixed(1)} Million)
                  </span>
                </div>
                
                <p className="font-sans text-xs text-slate-300 relative z-10 font-semibold tracking-wide">
                  Estimated market value for a {formData.area} sqft {formData.propertyType} in {formData.location}
                </p>
              </div>

              {/* Quick Metrics Tier Row */}
              <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/75" id="output-metrics">
                <div className="p-4 text-center border-r border-slate-100">
                  <span className="block font-sans text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                    Rate per Sqft
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-800">
                    {formatRupees(currentResult.metrics.pricePerSqft)}
                  </span>
                </div>
                <div className="p-4 text-center border-r border-slate-100">
                  <span className="block font-sans text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                    Investment Tier
                  </span>
                  <span className="font-sans text-xs font-black text-slate-800 bg-slate-200.5 px-2 py-0.5 rounded inline-block">
                    {currentResult.metrics.investmentRating} Rating
                  </span>
                </div>
                <div className="p-4 text-center">
                  <span className="block font-sans text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                    Market Demand
                  </span>
                  <span className={`font-sans text-xs font-bold ${
                    currentResult.metrics.marketDemand === 'Very High' || currentResult.metrics.marketDemand === 'High'
                      ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {currentResult.metrics.marketDemand}
                  </span>
                </div>
              </div>

              {/* Regression Factors Breakdown */}
              <div className="p-6 flex-1 flex flex-col justify-between" id="regression-breakdown">
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 uppercase tracking-widest mb-4">
                    Coefficient Factor Explanations
                  </h4>
                  
                  <div className="space-y-3">
                    
                    {/* Area element value */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-slate-500 font-medium">Base Area Value ({formData.area} sqft)</span>
                      <span className="font-mono text-slate-800 font-semibold">
                        +{formatCrore(currentResult.breakdown.areaContribution)}
                      </span>
                    </div>

                    {/* Location element value */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-slate-500 font-medium">Location Bias ({formData.location})</span>
                      <span className="font-mono text-slate-800 font-semibold text-emerald-600">
                        +{formatCrore(currentResult.breakdown.locationPremium)}
                      </span>
                    </div>

                    {/* Property Type Modifier */}
                    {currentResult.breakdown.typePremium !== 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans text-slate-500 font-medium">{formData.propertyType} Weight Modifier</span>
                        <span className={`font-mono font-semibold ${
                          currentResult.breakdown.typePremium > 0 ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {currentResult.breakdown.typePremium > 0 ? '+' : ''}
                          {formatCrore(currentResult.breakdown.typePremium)}
                        </span>
                      </div>
                    )}

                    {/* Bedrooms Modifier */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-slate-500 font-medium">Bedrooms multiplier ({formData.bedrooms} BHK)</span>
                      <span className="font-mono text-slate-800 font-semibold">
                        +{formatCrore(currentResult.breakdown.bedroomPremium)}
                      </span>
                    </div>

                    {/* Society Features Modifier */}
                    {currentResult.breakdown.societyPremium > 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans text-slate-500 font-medium">Amenities & Security Coefficient</span>
                        <span className="font-mono text-emerald-600 font-semibold">
                          +{formatCrore(currentResult.breakdown.societyPremium)}
                        </span>
                      </div>
                    )}

                    {/* Age structure depreciation */}
                    {formData.age > 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans text-slate-500 font-medium">Structural Age Depreciation ({formData.age} yrs)</span>
                        <span className="font-mono text-red-500 font-semibold">
                          {formatCrore(currentResult.breakdown.ageDepreciation)}
                        </span>
                      </div>
                    )}

                    {/* Base bias offset */}
                    <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-100">
                      <span className="font-sans text-slate-400 font-medium">Regression Intercept (c)</span>
                      <span className="font-mono text-slate-400 font-semibold">
                        +{formatCrore(currentResult.breakdown.basePrice)}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Sub features panel */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-slate-400 uppercase tracking-wider">
                      Est. Rent Income
                    </span>
                    <span className="font-sans text-sm font-bold text-slate-900 leading-tight">
                      {formatRupees(currentResult.metrics.estimatedRent)}/mo
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveToHistory}
                      className={`font-sans text-xs font-bold px-4 py-2.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer ${
                        savedSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white text-slate-700'
                      }`}
                      id="btn-save-record"
                    >
                      {savedSuccess ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" /> Saved!
                        </>
                      ) : (
                        <>
                          Save Search
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
