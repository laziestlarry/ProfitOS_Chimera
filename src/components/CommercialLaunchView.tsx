import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  DollarSign,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Megaphone,
  Radio,
  Share2,
  Copy,
  Receipt,
  Key,
  Globe,
  Award
} from 'lucide-react';

export const CommercialLaunchView: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'crypto' | 'ach'>('credit_card');
  const [customerEmail, setCustomerEmail] = useState('exec@autonomax.io');
  const [companyName, setCompanyName] = useState('AutonomaX Corp');
  const [checkoutResult, setCheckoutResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [empathyMap, setEmpathyMap] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/v1/commercial/plans')
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error(err));

    fetch('/api/v1/marketing/empathy-map')
      .then((res) => res.json())
      .then((data) => setEmpathyMap(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
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
          customer_email: customerEmail,
          company_name: companyName
        })
      });
      const data = await res.json();
      setCheckoutResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Presentation Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>COMMERCIAL LAUNCH ENGINE ── 100% LIVE PRODUCTION READY</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Commercialize Profit OS Chimera.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
              Zero-Gap Production & Payment Rails
            </span>
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Deploy full-stack commercial subscription checkouts, automated license key provisioning, customer empathy intelligence, and zero-ad campaign funnels designed for instant enterprise adoption.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Stripe / Cards Connected</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-indigo-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Zero-Gap Production System</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-amber-400 font-mono">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Attributed Revenue Settlement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers & Payment Rail Checkout */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <span>Commercial License Pricing & Checkout Rails</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select an autonomous license tier and test live checkout provisioning with Stripe / PayPal / Crypto rails.
            </p>
          </div>

          {/* Billing Cycle Switch */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center space-x-1 text-xs w-fit">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price = billingCycle === 'annual' ? plan.price_annual : plan.price_monthly;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.is_popular && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold font-mono px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-indigo-400 uppercase">{plan.badge}</span>
                    <h3 className="text-lg font-bold text-slate-100">{plan.name}</h3>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-slate-100 font-mono">${price}</span>
                    <span className="text-xs text-slate-400 font-mono">/{billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {plan.features?.map((f: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors font-mono flex items-center justify-center space-x-2 ${
                      isSelected
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{isSelected ? '✓ Selected Plan' : plan.cta}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Payment Rail Checkout Drawer */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-base">Commercial Payment Rail Checkout</h3>
                <p className="text-xs text-slate-400 font-mono">128-Bit SSL Encrypted | Automated License Provisioning</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">Payment Provider:</span>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    paymentMethod === 'credit_card' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Stripe / Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    paymentMethod === 'paypal' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                    paymentMethod === 'crypto' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  USDC / ETH
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Customer / Agency Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Company / License Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/20 font-mono flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Processing Payment Rail...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Execute Commercial Checkout</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Checkout Confirmation Receipt & License Output */}
          {checkoutResult && (
            <div className="bg-slate-950 border border-emerald-500/40 p-5 rounded-2xl space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>TRANSACTION SUCCESSFUL ── LICENSE ACTIVATED</span>
                </div>
                <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono text-[11px]">
                  Session ID: {checkoutResult.session_id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Plan Tier</span>
                  <span className="text-indigo-400 font-bold text-sm uppercase">{checkoutResult.plan_id}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Amount Paid</span>
                  <span className="text-emerald-400 font-bold text-sm">${checkoutResult.amount_paid} USD</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Payment Method</span>
                  <span className="text-slate-200 font-bold text-xs uppercase">{checkoutResult.payment_method}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Status</span>
                  <span className="text-teal-400 font-bold text-xs">100% LIVE PROD</span>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[10px] font-mono uppercase block">Activated License Key</span>
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-mono font-bold text-sm">{checkoutResult.license_key}</span>
                  </div>
                </div>

                <a
                  href={checkoutResult.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-mono w-fit transition-colors"
                >
                  <Receipt className="w-4 h-4 text-indigo-400" />
                  <span>View Verified Invoice Receipt</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mapped Customer Empathy & Launch Intelligence */}
      {empathyMap && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
              <Target className="w-5 h-5 text-violet-400" />
              <span>Customer Empathy Mapping & Campaign Intelligence</span>
            </h2>
            <p className="text-xs text-slate-400">
              Target persona psychology, headline hooks, zero-ad invitations, and customer journey flows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Core Pains */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-rose-400 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Customer Core Pain Points</span>
              </h3>
              <ul className="space-y-2 text-slate-300">
                {empathyMap.core_pains?.map((p: string, idx: number) => (
                  <li key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-start space-x-2">
                    <span className="text-rose-400 font-mono font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emotional Triggers */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Emotional Decision Triggers</span>
              </h3>
              <ul className="space-y-2 text-slate-300">
                {empathyMap.emotional_triggers?.map((t: string, idx: number) => (
                  <li key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-start space-x-2">
                    <span className="text-amber-400 font-mono font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* High-Converting Hooks */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-indigo-400 flex items-center space-x-2">
                <Megaphone className="w-4 h-4" />
                <span>Launch Campaign Headline Hooks</span>
              </h3>
              <div className="space-y-2">
                {empathyMap.headline_hooks?.map((h: string, idx: number) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2">
                    <p className="text-slate-200 font-medium italic text-[11px]">"{h}"</p>
                    <button
                      onClick={() => copyText(h, idx)}
                      className="text-slate-400 hover:text-indigo-400 p-1 shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Funnel Journey Flow */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Full Customer Funnel Journey Map (Zero-Gap)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              {empathyMap.funnel_journey?.map((step: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase block">
                    Stage 0{idx + 1}: {step.stage}
                  </span>
                  <h4 className="font-bold text-slate-200 text-xs">{step.channel}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{step.experience || step.hook}</p>
                  <span className="inline-block bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-2 py-1 rounded text-[10px] font-mono font-semibold mt-2">
                    CTA: {step.cta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
