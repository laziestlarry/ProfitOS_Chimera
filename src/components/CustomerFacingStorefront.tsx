import React, { useState, useEffect } from 'react';
import {
  Rocket,
  TrendingUp,
  Share2,
  Workflow,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
  DollarSign,
  Lock,
  CreditCard,
  Key,
  Receipt,
  Bot,
  Users,
  HelpCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';

interface CustomerFacingStorefrontProps {
  onEnterDashboard: () => void;
}

export const CustomerFacingStorefront: React.FC<CustomerFacingStorefrontProps> = ({ onEnterDashboard }) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [activeTrack, setActiveTrack] = useState<string>('new_growth');
  const [orchestrationInfo, setOrchestrationInfo] = useState<any>(null);

  // Conversion Journey Funnel States
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [businessType, setBusinessType] = useState<string>('agency');
  const [currentRevenue, setCurrentRevenue] = useState<number>(3800);
  const [roiCalculation, setRoiCalculation] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'crypto' | 'ach'>('credit_card');
  const [email, setEmail] = useState('exec@clientbusiness.com');
  const [clientCompanyName, setClientCompanyName] = useState('My Client Growth Co');
  const [checkoutResult, setCheckoutResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/v1/customer-portal/tracks')
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error(err));

    fetch('/api/v1/customer-portal/orchestration')
      .then((res) => res.json())
      .then((data) => setOrchestrationInfo(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCalculateRoi = async () => {
    try {
      const res = await fetch('/api/v1/customer-portal/calculate-roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_revenue: currentRevenue, business_type: businessType })
      });
      const data = await res.json();
      setRoiCalculation(data);
      if (data.recommended_tier) {
        setSelectedPlan(data.recommended_tier);
      }
      setCheckoutStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch('/api/v1/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: selectedPlan,
          billing_cycle: billingCycle,
          payment_method: paymentMethod,
          customer_email: email,
          company_name: clientCompanyName
        })
      });
      const data = await res.json();
      setCheckoutResult(data);
      setCheckoutStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const trackIconMap: Record<string, any> = {
    new_growth: Rocket,
    existing_revenue: TrendingUp,
    social_performance: Share2,
    technical_infra: Workflow
  };

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      {/* Friendly Visitor Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3.5 py-1 rounded-full text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>SIMPLE CUSTOMER PORTAL ── ZERO TECHNICAL EXPERIENCE NEEDED</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Grow Your Revenue & Automate Business Cash Flow on Autopilot.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              No Ads Required. No Manual Effort.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Profit OS is your automated business growth partner. We run your marketing, attract new paying clients, upsell your current customers, and automate your invoices while you focus on running your business.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#conversion-funnel"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-xl shadow-emerald-600/20 font-mono flex items-center space-x-2"
            >
              <span>Calculate Your 30-Day Growth Lift</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </a>

            <button
              onClick={onEnterDashboard}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-6 py-3.5 rounded-2xl font-semibold text-xs transition-colors font-mono"
            >
              Enter Full Operator Center →
            </button>
          </div>
        </div>
      </div>

      {/* Before vs After Comparison */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Old Manual Growth vs. Profit OS AI Swarm</h2>
          <p className="text-xs text-slate-400">See how Profit OS simplifies your operations and scales your revenue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Old Manual Way */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/20 space-y-4">
            <h3 className="font-bold text-rose-400 text-sm flex items-center space-x-2">
              <span>❌ The Old Way (30+ Hours/Week)</span>
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Spending thousands of dollars monthly on risky Facebook & Google ads.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Manually writing proposals, creating invoices, and updating spreadsheets.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Inconsistent sales pipeline with unpredictable monthly cash flow.</span>
              </li>
            </ul>
          </div>

          {/* New Profit OS Way */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
            <h3 className="font-bold text-emerald-400 text-sm flex items-center space-x-2">
              <span>✨ The Profit OS Way (100% Autopilot)</span>
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero-Ad Growth:</strong> Automated viral short videos bringing organic customers.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Automated Revenue Upsells:</strong> Smart order bundles raising order value by 35%.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>100% Attributed Evidence:</strong> Verified sales logs proving exact revenue results.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Separated Functional Tracks */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Separated Growth & Automation Functional Tracks</span>
          </h2>
          <p className="text-xs text-slate-400">
            Choose the exact growth or operational track that applies to your customer business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tracks.map((track) => {
            const IconComponent = trackIconMap[track.id] || Rocket;
            const isSelected = activeTrack === track.id;

            return (
              <div
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 w-fit">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-xs">{track.title}</h3>
                  <p className="text-slate-400 text-[11px] mt-1 leading-snug">{track.subtitle}</p>
                </div>
                <span className="inline-block bg-slate-950 text-indigo-300 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono">
                  Target: {track.target_outcomes}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Track Detail View */}
        {tracks.find((t) => t.id === activeTrack) && (
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
            {(() => {
              const currentTrackObj = tracks.find((t) => t.id === activeTrack);
              return (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-slate-100 text-sm">{currentTrackObj.title}</h4>
                    <span className="text-amber-400 font-mono font-semibold text-[11px]">
                      Governed by: {currentTrackObj.governing_entity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentTrackObj.key_benefits?.map((b: string, idx: number) => (
                      <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* AutonomaX Governing Board vs. ProPulse Fulfillment Council Explanation */}
      {orchestrationInfo && (
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-mono">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>ORCHESTRATION ROLES & GOVERNING BOARDS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">
              How AutonomaX & ProPulse Manage Your Customer Business
            </h2>
            <p className="text-xs text-slate-400">
              To keep your client business clearly differentiated, our system operates under two distinct AI Governing Bodies that serve your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {orchestrationInfo.governing_boards?.map((board: any) => (
              <div key={board.id} className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>{board.name}</span>
                </div>
                <span className="inline-block bg-slate-900 text-amber-300 border border-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono">
                  Role: {board.role}
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{board.description}</p>
                <div className="pt-2 border-t border-slate-800 text-emerald-400 font-mono font-semibold">
                  ✓ {board.applies_to_customer}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-950/60 border border-indigo-500/30 p-4 rounded-xl text-center text-xs text-indigo-200 font-mono">
            💡 {orchestrationInfo.customer_business_relationship}
          </div>
        </div>
      )}

      {/* Interactive Step-by-Step Checkout Journey Flow */}
      <div id="conversion-funnel" className="bg-slate-900 border border-indigo-500/30 p-6 md:p-8 rounded-3xl space-y-8 shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>STEP-BY-STEP CHECKOUT JOURNEY FLOW</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Activate Your AI Growth Swarm</h2>
          <p className="text-xs text-slate-400">
            Calculate your projected revenue lift, select a plan, and deploy your AI Growth Swarm on live checkout rails.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className={`p-2 rounded-xl border ${checkoutStep >= 1 ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            1. Business Goal
          </div>
          <div className={`p-2 rounded-xl border ${checkoutStep >= 2 ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            2. Projected ROI
          </div>
          <div className={`p-2 rounded-xl border ${checkoutStep >= 3 ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            3. Checkout Rail
          </div>
          <div className={`p-2 rounded-xl border ${checkoutStep >= 4 ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            4. Auto-Run Live
          </div>
        </div>

        {/* STEP 1: Select Business & Revenue */}
        {checkoutStep === 1 && (
          <div className="max-w-xl mx-auto space-y-6 text-xs animate-fade-in">
            <div className="space-y-3">
              <label className="block text-slate-300 font-bold">Select Your Business Category:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBusinessType('agency')}
                  className={`p-3 rounded-xl border text-left font-mono transition-all ${
                    businessType === 'agency' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  🏢 Agency / Service Provider
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('ecommerce')}
                  className={`p-3 rounded-xl border text-left font-mono transition-all ${
                    businessType === 'ecommerce' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  🛍️ E-Commerce Store / Shopify
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('creator')}
                  className={`p-3 rounded-xl border text-left font-mono transition-all ${
                    businessType === 'creator' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  🎨 Digital Creator / Educator
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('local')}
                  className={`p-3 rounded-xl border text-left font-mono transition-all ${
                    businessType === 'local' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  📍 Local Business / SMB
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Current Monthly Revenue ($ USD):</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="number"
                  value={currentRevenue}
                  onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={handleCalculateRoi}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold font-mono transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              <span>Calculate Projected 30-Day Growth Lift →</span>
            </button>
          </div>
        )}

        {/* STEP 2: Projected ROI Result */}
        {checkoutStep === 2 && roiCalculation && (
          <div className="max-w-xl mx-auto space-y-6 text-xs animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/40 space-y-4 font-mono text-center">
              <span className="text-slate-400 text-[10px] uppercase block">Estimated 30-Day Growth Projection</span>
              <div className="text-3xl font-extrabold text-emerald-400">
                ${roiCalculation.projected_30d_revenue?.toLocaleString()} USD
              </div>
              <p className="text-slate-300 text-xs">
                Monthly Profit Lift: <strong className="text-emerald-300">+${roiCalculation.monthly_profit_lift?.toLocaleString()}</strong> | Estimated Hours Saved: <strong className="text-amber-300">{roiCalculation.estimated_weekly_hours_saved} hrs/week</strong>
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => setCheckoutStep(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 rounded-xl font-mono"
              >
                ← Back
              </button>
              <button
                onClick={() => setCheckoutStep(3)}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-bold font-mono transition-all shadow-lg shadow-emerald-600/20 text-center"
              >
                Proceed to Plan Selection & Checkout →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Plan & Checkout Form */}
        {checkoutStep === 3 && (
          <form onSubmit={handleExecuteCheckout} className="max-w-2xl mx-auto space-y-6 text-xs animate-fade-in">
            {/* Plan Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => setSelectedPlan('starter')}
                className={`p-4 rounded-xl border cursor-pointer ${selectedPlan === 'starter' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' : 'bg-slate-950 border-slate-800'}`}
              >
                <div className="font-bold text-sm">Starter License</div>
                <div className="text-lg font-extrabold font-mono text-emerald-400">$49/mo</div>
                <p className="text-[11px] text-slate-400 mt-1">2 Managed Companies</p>
              </div>

              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-4 rounded-xl border cursor-pointer ${selectedPlan === 'pro' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' : 'bg-slate-950 border-slate-800'}`}
              >
                <div className="font-bold text-sm">Growth Pro Swarm</div>
                <div className="text-lg font-extrabold font-mono text-emerald-400">$199/mo</div>
                <p className="text-[11px] text-slate-400 mt-1">Full 5-Commander Swarm</p>
              </div>

              <div
                onClick={() => setSelectedPlan('agency')}
                className={`p-4 rounded-xl border cursor-pointer ${selectedPlan === 'agency' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' : 'bg-slate-950 border-slate-800'}`}
              >
                <div className="font-bold text-sm">Enterprise Agency</div>
                <div className="text-lg font-extrabold font-mono text-emerald-400">$499/mo</div>
                <p className="text-[11px] text-slate-400 mt-1">Unlimited Client Seats</p>
              </div>
            </div>

            {/* Billing Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Customer Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Company / Workspace Name</label>
                <input
                  type="text"
                  value={clientCompanyName}
                  onChange={(e) => setClientCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  required
                />
              </div>
            </div>

            {/* Payment Rail Options */}
            <div className="space-y-2">
              <label className="block text-slate-400 font-bold">Select Payment Rail:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-2.5 rounded-xl border text-center ${paymentMethod === 'credit_card' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  Stripe / Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-center ${paymentMethod === 'paypal' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-2.5 rounded-xl border text-center ${paymentMethod === 'crypto' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  USDC / ETH
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ach')}
                  className={`p-2.5 rounded-xl border text-center ${paymentMethod === 'ach' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  Direct ACH
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCheckoutStep(2)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 rounded-xl font-mono"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-bold font-mono transition-all shadow-lg shadow-emerald-600/30 text-center"
              >
                {isProcessing ? 'Processing Payment...' : 'Execute Live Commercial Checkout →'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Live Activation Receipt */}
        {checkoutStep === 4 && checkoutResult && (
          <div className="max-w-xl mx-auto space-y-6 text-xs animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/40 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>COMMERCIAL LICENSE ACTIVATED ── AI SWARM DEPLOYED</span>
              </div>

              <div className="space-y-2 font-mono text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-500">Session ID:</span>
                  <span className="text-indigo-300">{checkoutResult.session_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan Tier:</span>
                  <span className="text-emerald-400 font-bold uppercase">{checkoutResult.plan_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="text-emerald-400 font-bold">${checkoutResult.amount_paid} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Key:</span>
                  <span className="text-amber-300 font-bold">{checkoutResult.license_key}</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onEnterDashboard}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold font-mono transition-all shadow-lg shadow-indigo-600/30"
                >
                  Enter Your Autonomous Command Center →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
