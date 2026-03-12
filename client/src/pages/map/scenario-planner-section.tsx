import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Cell } from "recharts";
import {
  Sparkles, TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet,
  AlertTriangle, CheckCircle, ArrowRight, RotateCcw, Sliders, Target,
  Building2, Plane, Users, ShoppingBag, Zap, Calculator,
  Home, Car, UtensilsCrossed, Shirt, Wifi, Heart, GraduationCap,
  Shield, Gift, Coffee, Banknote, BarChart3, CircleDollarSign,
  ArrowUpRight, ArrowDownRight, Landmark, Briefcase
} from "lucide-react";
import { useState, useMemo } from "react";

type PlannerMode = "personal" | "business";

interface PersonalInputs {
  monthlyIncome: number;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  entertainment: number;
  clothing: number;
  healthcare: number;
  education: number;
  subscriptions: number;
  miscellaneous: number;
  savingsGoalPercent: number;
  emergencyFundTarget: number;
  investmentReturn: number;
  incomeGrowthRate: number;
  inflationRate: number;
}

const DEFAULT_PERSONAL: PersonalInputs = {
  monthlyIncome: 3500,
  housing: 900,
  food: 450,
  transport: 200,
  utilities: 150,
  entertainment: 150,
  clothing: 80,
  healthcare: 100,
  education: 50,
  subscriptions: 40,
  miscellaneous: 100,
  savingsGoalPercent: 20,
  emergencyFundTarget: 10000,
  investmentReturn: 7,
  incomeGrowthRate: 3,
  inflationRate: 3,
};

const PERSONAL_PRESETS: { label: string; description: string; icon: React.ElementType; color: string; inputs: Partial<PersonalInputs> }[] = [
  {
    label: "Frugal Saver",
    description: "Minimize spending, maximize savings",
    icon: PiggyBank,
    color: "emerald",
    inputs: { monthlyIncome: 3000, housing: 600, food: 300, transport: 100, utilities: 100, entertainment: 50, clothing: 30, healthcare: 50, education: 0, subscriptions: 15, miscellaneous: 50, savingsGoalPercent: 40, investmentReturn: 7 },
  },
  {
    label: "Balanced",
    description: "50/30/20 budgeting rule",
    icon: Target,
    color: "blue",
    inputs: { ...DEFAULT_PERSONAL },
  },
  {
    label: "Comfort Spender",
    description: "Higher lifestyle, moderate savings",
    icon: Coffee,
    color: "amber",
    inputs: { monthlyIncome: 5000, housing: 1500, food: 700, transport: 350, utilities: 200, entertainment: 400, clothing: 200, healthcare: 150, education: 100, subscriptions: 80, miscellaneous: 200, savingsGoalPercent: 12, investmentReturn: 6 },
  },
  {
    label: "Aggressive Investor",
    description: "Live lean, invest heavily",
    icon: TrendingUp,
    color: "violet",
    inputs: { monthlyIncome: 4500, housing: 700, food: 350, transport: 150, utilities: 120, entertainment: 80, clothing: 40, healthcare: 80, education: 200, subscriptions: 20, miscellaneous: 60, savingsGoalPercent: 50, investmentReturn: 10, incomeGrowthRate: 5 },
  },
];

interface BusinessInputs {
  monthlyRevenue: number;
  tourCommissionRate: number;
  aiSubscribers: number;
  aiAvgPrice: number;
  saasClients: number;
  saasAvgPrice: number;
  adListings: number;
  adPricePerListing: number;
  creatorFeeRate: number;
  creatorVolume: number;
  operatingCosts: number;
  marketingSpend: number;
  staffCosts: number;
  techInfra: number;
  growthRate: number;
  savingsRate: number;
}

const DEFAULT_BUSINESS: BusinessInputs = {
  monthlyRevenue: 8000, tourCommissionRate: 15, aiSubscribers: 1000, aiAvgPrice: 9,
  saasClients: 80, saasAvgPrice: 79, adListings: 100, adPricePerListing: 50,
  creatorFeeRate: 20, creatorVolume: 15000, operatingCosts: 5000, marketingSpend: 3000,
  staffCosts: 8000, techInfra: 2000, growthRate: 10, savingsRate: 20,
};

const BUSINESS_PRESETS: { label: string; description: string; icon: React.ElementType; inputs: Partial<BusinessInputs> }[] = [
  { label: "Conservative", description: "Low growth, high savings", icon: PiggyBank, inputs: { monthlyRevenue: 5000, aiSubscribers: 500, saasClients: 30, adListings: 40, growthRate: 5, savingsRate: 35, marketingSpend: 1500, staffCosts: 5000 } },
  { label: "Moderate", description: "Balanced approach", icon: Target, inputs: { ...DEFAULT_BUSINESS } },
  { label: "Aggressive", description: "High spend, rapid growth", icon: Zap, inputs: { monthlyRevenue: 15000, aiSubscribers: 3000, saasClients: 200, adListings: 250, growthRate: 25, savingsRate: 10, marketingSpend: 8000, staffCosts: 15000 } },
  { label: "Bootstrap", description: "Minimal costs, organic growth", icon: Sparkles, inputs: { monthlyRevenue: 3000, aiSubscribers: 200, saasClients: 15, adListings: 20, growthRate: 8, savingsRate: 40, marketingSpend: 500, staffCosts: 2000, techInfra: 500, operatingCosts: 1500 } },
];

function SliderInput({ label, value, onChange, min, max, step, prefix, suffix, icon: Icon }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; icon: React.ElementType;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-semibold text-slate-600 flex items-center gap-1.5">
          <Icon className="h-3 w-3 text-[#0081C9]" /> {label}
        </label>
        <span className="text-xs font-bold text-slate-900">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#0081C9]"
        data-testid={`slider-${label.toLowerCase().replace(/\s/g, "-")}`}
      />
      <div className="flex justify-between text-[8px] text-slate-400">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

function PersonalFinancePlanner() {
  const [inputs, setInputs] = useState<PersonalInputs>(DEFAULT_PERSONAL);
  const [activePreset, setActivePreset] = useState<string>("Balanced");

  const update = (key: keyof PersonalInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setActivePreset("");
  };

  const applyPreset = (preset: typeof PERSONAL_PRESETS[0]) => {
    setInputs(prev => ({ ...prev, ...preset.inputs }));
    setActivePreset(preset.label);
  };

  const projections = useMemo(() => {
    const totalSpending = inputs.housing + inputs.food + inputs.transport + inputs.utilities + inputs.entertainment + inputs.clothing + inputs.healthcare + inputs.education + inputs.subscriptions + inputs.miscellaneous;
    const actualSavings = inputs.monthlyIncome - totalSpending;
    const targetSavings = inputs.monthlyIncome * (inputs.savingsGoalPercent / 100);
    const savingsGap = targetSavings - actualSavings;
    const savingsRate = inputs.monthlyIncome > 0 ? (actualSavings / inputs.monthlyIncome) * 100 : 0;
    const spendingRate = inputs.monthlyIncome > 0 ? (totalSpending / inputs.monthlyIncome) * 100 : 0;

    const needsTotal = inputs.housing + inputs.food + inputs.transport + inputs.utilities + inputs.healthcare;
    const wantsTotal = inputs.entertainment + inputs.clothing + inputs.subscriptions + inputs.miscellaneous;
    const needsPercent = inputs.monthlyIncome > 0 ? (needsTotal / inputs.monthlyIncome) * 100 : 0;
    const wantsPercent = inputs.monthlyIncome > 0 ? (wantsTotal / inputs.monthlyIncome) * 100 : 0;
    const savingsPercent = inputs.monthlyIncome > 0 ? (actualSavings / inputs.monthlyIncome) * 100 : 0;

    const monthlyInvestmentReturn = inputs.investmentReturn / 100 / 12;
    const monthlyIncomeGrowth = inputs.incomeGrowthRate / 100 / 12;
    const monthlyInflation = inputs.inflationRate / 100 / 12;

    const months: { month: string; income: number; spending: number; savings: number; cumSavings: number; invested: number; netWorth: number }[] = [];
    let cumSavings = 0;
    let investedBalance = 0;

    for (let m = 1; m <= 24; m++) {
      const incomeGrowth = Math.pow(1 + monthlyIncomeGrowth, m);
      const inflationGrowth = Math.pow(1 + monthlyInflation, m);
      const mIncome = Math.round(inputs.monthlyIncome * incomeGrowth);
      const mSpending = Math.round(totalSpending * inflationGrowth);
      const mSavings = mIncome - mSpending;
      cumSavings += Math.max(mSavings, 0);
      investedBalance = (investedBalance + Math.max(mSavings, 0)) * (1 + monthlyInvestmentReturn);
      months.push({
        month: m <= 12 ? `M${m}` : `Y2-M${m - 12}`,
        income: mIncome,
        spending: mSpending,
        savings: mSavings,
        cumSavings,
        invested: Math.round(investedBalance),
        netWorth: Math.round(investedBalance),
      });
    }

    const emergencyMonths = totalSpending > 0 ? Math.round(inputs.emergencyFundTarget / totalSpending * 10) / 10 : 0;
    const monthsToEmergencyFund = actualSavings > 0 ? Math.ceil(inputs.emergencyFundTarget / actualSavings) : Infinity;
    const year1Savings = months.slice(0, 12).reduce((s, m) => s + m.savings, 0);
    const year1Invested = months[11]?.invested || 0;
    const investmentGains = year1Invested - year1Savings;

    const financialFreedomYears = actualSavings > 0 && inputs.monthlyIncome > 0
      ? Math.round((inputs.monthlyIncome * 12 * 25) / (actualSavings * 12) * 10) / 10
      : Infinity;

    return {
      totalSpending, actualSavings, targetSavings, savingsGap, savingsRate, spendingRate,
      needsTotal, wantsTotal, needsPercent, wantsPercent, savingsPercent,
      months, emergencyMonths, monthsToEmergencyFund,
      year1Savings, year1Invested, investmentGains, financialFreedomYears,
    };
  }, [inputs]);

  const spendingCategories = [
    { name: "Housing", value: inputs.housing, icon: Home, color: "#0081C9" },
    { name: "Food", value: inputs.food, icon: UtensilsCrossed, color: "#22c55e" },
    { name: "Transport", value: inputs.transport, icon: Car, color: "#f59e0b" },
    { name: "Utilities", value: inputs.utilities, icon: Wifi, color: "#8b5cf6" },
    { name: "Health", value: inputs.healthcare, icon: Heart, color: "#ef4444" },
    { name: "Fun", value: inputs.entertainment, icon: Coffee, color: "#ec4899" },
    { name: "Clothing", value: inputs.clothing, icon: Shirt, color: "#06b6d4" },
    { name: "Education", value: inputs.education, icon: GraduationCap, color: "#14b8a6" },
    { name: "Subs", value: inputs.subscriptions, icon: Wifi, color: "#6366f1" },
    { name: "Other", value: inputs.miscellaneous, icon: Gift, color: "#78716c" },
  ];

  const budgetHealthColor = projections.savingsRate >= 20 ? "emerald" : projections.savingsRate >= 10 ? "amber" : "red";
  const budgetHealthLabel = projections.savingsRate >= 20 ? "Healthy" : projections.savingsRate >= 10 ? "Caution" : "At Risk";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        {PERSONAL_PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activePreset === preset.label;
          return (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${isActive ? "bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/15 hover:bg-slate-50"}`}
              data-testid={`preset-personal-${preset.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <div className="text-left">
                <div className="font-bold">{preset.label}</div>
                <div className="text-[9px] opacity-60">{preset.description}</div>
              </div>
            </button>
          );
        })}
        <button onClick={() => { setInputs(DEFAULT_PERSONAL); setActivePreset("Balanced"); }}
          className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] text-slate-500 hover:text-[#C1121F] transition-colors"
          data-testid="btn-reset-personal">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-gradient-to-br from-[#0081C9]/10 to-[#0081C9]/5 border border-[#0081C9]/15 rounded-xl p-3 text-center">
          <Banknote className="h-4 w-4 text-[#0081C9] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${inputs.monthlyIncome.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Income</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/15 rounded-xl p-3 text-center">
          <ArrowDownRight className="h-4 w-4 text-red-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-red-700">${projections.totalSpending.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Spending</div>
        </div>
        <div className={`bg-gradient-to-br ${projections.actualSavings >= 0 ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/15" : "from-red-500/10 to-red-500/5 border-red-500/15"} border rounded-xl p-3 text-center`}>
          <PiggyBank className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
          <div className={`text-lg font-bold ${projections.actualSavings >= 0 ? "text-emerald-700" : "text-red-700"}`}>${projections.actualSavings.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Savings</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/15 rounded-xl p-3 text-center">
          <ArrowUpRight className="h-4 w-4 text-violet-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-violet-700">${projections.year1Invested.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">1-Year Invested</div>
        </div>
        <div className={`bg-gradient-to-br from-${budgetHealthColor}-500/10 to-${budgetHealthColor}-500/5 border border-${budgetHealthColor}-500/15 rounded-xl p-3 text-center`}>
          <Shield className="h-4 w-4 mx-auto mb-1" style={{ color: budgetHealthColor === "emerald" ? "#059669" : budgetHealthColor === "amber" ? "#d97706" : "#dc2626" }} />
          <div className="text-lg font-bold text-slate-900">{projections.savingsRate.toFixed(0)}%</div>
          <div className="text-[9px] text-slate-500">Savings Rate</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Landmark className="h-4 w-4 text-amber-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{projections.monthsToEmergencyFund === Infinity ? "N/A" : `${projections.monthsToEmergencyFund}mo`}</div>
          <div className="text-[9px] text-slate-500">Emergency Fund ETA</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-[#0081C9]/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Banknote className="h-4 w-4 text-[#0081C9]" /> Income & Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SliderInput label="Monthly Income" value={inputs.monthlyIncome} onChange={v => update("monthlyIncome", v)} min={1000} max={20000} step={100} prefix="$" icon={DollarSign} />
              <SliderInput label="Savings Goal" value={inputs.savingsGoalPercent} onChange={v => update("savingsGoalPercent", v)} min={0} max={60} step={5} suffix="%" icon={Target} />
              <SliderInput label="Emergency Fund Target" value={inputs.emergencyFundTarget} onChange={v => update("emergencyFundTarget", v)} min={1000} max={50000} step={1000} prefix="$" icon={Shield} />
              <SliderInput label="Investment Return" value={inputs.investmentReturn} onChange={v => update("investmentReturn", v)} min={0} max={15} step={0.5} suffix="% /yr" icon={TrendingUp} />
              <SliderInput label="Income Growth" value={inputs.incomeGrowthRate} onChange={v => update("incomeGrowthRate", v)} min={0} max={10} step={0.5} suffix="% /yr" icon={ArrowUpRight} />
              <SliderInput label="Inflation Rate" value={inputs.inflationRate} onChange={v => update("inflationRate", v)} min={0} max={10} step={0.5} suffix="% /yr" icon={ArrowDownRight} />
            </CardContent>
          </Card>

          <Card className="border-[#C1121F]/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Wallet className="h-4 w-4 text-[#C1121F]" /> Monthly Spending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SliderInput label="Housing / Rent" value={inputs.housing} onChange={v => update("housing", v)} min={0} max={5000} step={50} prefix="$" icon={Home} />
              <SliderInput label="Food & Groceries" value={inputs.food} onChange={v => update("food", v)} min={0} max={2000} step={25} prefix="$" icon={UtensilsCrossed} />
              <SliderInput label="Transport" value={inputs.transport} onChange={v => update("transport", v)} min={0} max={1000} step={25} prefix="$" icon={Car} />
              <SliderInput label="Utilities & Bills" value={inputs.utilities} onChange={v => update("utilities", v)} min={0} max={500} step={10} prefix="$" icon={Wifi} />
              <SliderInput label="Entertainment" value={inputs.entertainment} onChange={v => update("entertainment", v)} min={0} max={1000} step={25} prefix="$" icon={Coffee} />
              <SliderInput label="Clothing" value={inputs.clothing} onChange={v => update("clothing", v)} min={0} max={500} step={10} prefix="$" icon={Shirt} />
              <SliderInput label="Healthcare" value={inputs.healthcare} onChange={v => update("healthcare", v)} min={0} max={500} step={10} prefix="$" icon={Heart} />
              <SliderInput label="Education" value={inputs.education} onChange={v => update("education", v)} min={0} max={1000} step={25} prefix="$" icon={GraduationCap} />
              <SliderInput label="Subscriptions" value={inputs.subscriptions} onChange={v => update("subscriptions", v)} min={0} max={200} step={5} prefix="$" icon={Wifi} />
              <SliderInput label="Miscellaneous" value={inputs.miscellaneous} onChange={v => update("miscellaneous", v)} min={0} max={500} step={10} prefix="$" icon={Gift} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="border-[#0081C9]/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#0081C9]" /> 24-Month Income vs Spending Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projections.months}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={1} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="income" stroke="#0081C9" fill="#0081C9" fillOpacity={0.1} strokeWidth={2} name="Income" />
                    <Area type="monotone" dataKey="spending" stroke="#C1121F" fill="#C1121F" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" name="Spending" />
                    <Area type="monotone" dataKey="savings" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} name="Monthly Savings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><PiggyBank className="h-4 w-4 text-emerald-600" /> Wealth Growth: Savings vs Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projections.months}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={1} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="invested" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} name="Invested (with returns)" />
                    <Area type="monotone" dataKey="cumSavings" stroke="#22c55e" fill="#22c55e" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" name="Cash Savings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-[#0081C9]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-[#0081C9]" /> Spending Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingCategories} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${v}`} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: "#94a3b8" }} width={55} />
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {spendingCategories.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#C1121F]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Calculator className="h-4 w-4 text-[#C1121F]" /> Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="mb-3">
                  <div className="text-[10px] font-semibold text-slate-500 mb-1.5">50/30/20 Budget Rule</div>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-100">
                    <div className="bg-[#0081C9] rounded-l-full transition-all" style={{ width: `${Math.min(projections.needsPercent, 100)}%` }} />
                    <div className="bg-[#f59e0b] transition-all" style={{ width: `${Math.min(projections.wantsPercent, 100)}%` }} />
                    <div className="bg-[#22c55e] rounded-r-full transition-all" style={{ width: `${Math.max(projections.savingsPercent, 0)}%` }} />
                  </div>
                  <div className="flex justify-between mt-1 text-[8px] text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0081C9]" />Needs {projections.needsPercent.toFixed(0)}%</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />Wants {projections.wantsPercent.toFixed(0)}%</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />Save {Math.max(projections.savingsPercent, 0).toFixed(0)}%</span>
                  </div>
                </div>
                {[
                  { label: "Year 1 Total Savings", value: `$${projections.year1Savings.toLocaleString()}`, color: "text-emerald-600" },
                  { label: "Year 1 Invested Value", value: `$${projections.year1Invested.toLocaleString()}`, color: "text-violet-600" },
                  { label: "Investment Gains (Y1)", value: `$${projections.investmentGains.toLocaleString()}`, color: "text-[#0081C9]" },
                  { label: "Emergency Fund Covers", value: `${projections.emergencyMonths} months`, color: "text-amber-600" },
                  { label: "Emergency Fund ETA", value: projections.monthsToEmergencyFund === Infinity ? "N/A" : `${projections.monthsToEmergencyFund} months`, color: "text-slate-700" },
                  { label: "Financial Freedom ETA", value: projections.financialFreedomYears === Infinity ? "N/A" : `~${projections.financialFreedomYears} years`, color: "text-[#C1121F]" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className="text-xs text-slate-600">{row.label}</span>
                    <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
                <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[#0081C9]/5 to-[#C1121F]/5 border border-[#0081C9]/10">
                  <div className="flex items-start gap-2">
                    {projections.savingsRate >= 20 ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : projections.savingsRate >= 10 ? (
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      {projections.savingsRate >= 20
                        ? `Great financial health! You're saving ${projections.savingsRate.toFixed(0)}% of income. At this rate, your emergency fund will be fully funded in ${projections.monthsToEmergencyFund === Infinity ? "N/A" : projections.monthsToEmergencyFund + " months"}. Consider increasing investments for compound growth.`
                        : projections.savingsRate >= 10
                        ? `Your savings rate of ${projections.savingsRate.toFixed(0)}% is acceptable but below the recommended 20%. Consider reducing entertainment or subscriptions to boost savings.`
                        : projections.savingsRate >= 0
                        ? `Warning: Only saving ${projections.savingsRate.toFixed(0)}% of income. Review spending categories — housing should be under 30% of income, and discretionary spending needs tightening.`
                        : `Critical: You're spending more than you earn! Reduce expenses by $${Math.abs(projections.actualSavings)} per month to avoid going into debt. Focus on cutting non-essential spending first.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessFinancePlanner() {
  const [inputs, setInputs] = useState<BusinessInputs>(DEFAULT_BUSINESS);
  const [activePreset, setActivePreset] = useState<string>("Moderate");

  const update = (key: keyof BusinessInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setActivePreset("");
  };

  const applyPreset = (preset: typeof BUSINESS_PRESETS[0]) => {
    setInputs(prev => ({ ...prev, ...preset.inputs }));
    setActivePreset(preset.label);
  };

  const projections = useMemo(() => {
    const tourIncome = inputs.monthlyRevenue * (inputs.tourCommissionRate / 100);
    const aiIncome = inputs.aiSubscribers * inputs.aiAvgPrice;
    const saasIncome = inputs.saasClients * inputs.saasAvgPrice;
    const adIncome = inputs.adListings * inputs.adPricePerListing;
    const creatorIncome = inputs.creatorVolume * (inputs.creatorFeeRate / 100);
    const totalRevenue = tourIncome + aiIncome + saasIncome + adIncome + creatorIncome;
    const totalCosts = inputs.operatingCosts + inputs.marketingSpend + inputs.staffCosts + inputs.techInfra;
    const netProfit = totalRevenue - totalCosts;
    const savings = netProfit * (inputs.savingsRate / 100);
    const reinvestment = netProfit - savings;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const monthlyGrowthRate = inputs.growthRate / 100 / 12;
    const months12: { month: string; revenue: number; costs: number; profit: number; savings: number; cumSavings: number }[] = [];
    let cumSavings = 0;
    for (let m = 1; m <= 12; m++) {
      const factor = Math.pow(1 + monthlyGrowthRate, m);
      const mRevenue = Math.round(totalRevenue * factor);
      const mCosts = Math.round(totalCosts * (1 + monthlyGrowthRate * m * 0.3));
      const mProfit = mRevenue - mCosts;
      const mSavings = Math.round(mProfit * (inputs.savingsRate / 100));
      cumSavings += mSavings;
      months12.push({ month: `M${m}`, revenue: mRevenue, costs: mCosts, profit: mProfit, savings: mSavings, cumSavings });
    }
    const yearEndRevenue = months12[11].revenue;
    const annualRevenue = months12.reduce((sum, m) => sum + m.revenue, 0);
    const annualProfit = months12.reduce((sum, m) => sum + m.profit, 0);
    const annualSavings = cumSavings;
    return { tourIncome, aiIncome, saasIncome, adIncome, creatorIncome, totalRevenue, totalCosts, netProfit, savings, reinvestment, profitMargin, months12, yearEndRevenue, annualRevenue, annualProfit, annualSavings };
  }, [inputs]);

  const revenueBreakdown = [
    { name: "Tours", value: projections.tourIncome, color: "#0081C9" },
    { name: "AI SaaS", value: projections.aiIncome, color: "#22c55e" },
    { name: "B2B SaaS", value: projections.saasIncome, color: "#a855f7" },
    { name: "Ads", value: projections.adIncome, color: "#f59e0b" },
    { name: "Creator", value: projections.creatorIncome, color: "#C1121F" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        {BUSINESS_PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activePreset === preset.label;
          return (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${isActive ? "bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/15 hover:bg-slate-50"}`}
              data-testid={`preset-${preset.label.toLowerCase()}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <div className="text-left">
                <div className="font-bold">{preset.label}</div>
                <div className="text-[9px] opacity-60">{preset.description}</div>
              </div>
            </button>
          );
        })}
        <button onClick={() => { setInputs(DEFAULT_BUSINESS); setActivePreset("Moderate"); }}
          className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] text-slate-500 hover:text-[#C1121F] transition-colors"
          data-testid="btn-reset-scenario">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-[#0081C9]/10 to-[#0081C9]/5 border border-[#0081C9]/15 rounded-xl p-3 text-center">
          <DollarSign className="h-4 w-4 text-[#0081C9] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${projections.totalRevenue.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Revenue</div>
        </div>
        <div className={`bg-gradient-to-br ${projections.netProfit >= 0 ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/15" : "from-red-500/10 to-red-500/5 border-red-500/15"} border rounded-xl p-3 text-center`}>
          {projections.netProfit >= 0 ? <TrendingUp className="h-4 w-4 text-emerald-600 mx-auto mb-1" /> : <TrendingDown className="h-4 w-4 text-red-600 mx-auto mb-1" />}
          <div className={`text-lg font-bold ${projections.netProfit >= 0 ? "text-emerald-700" : "text-red-700"}`}>${projections.netProfit.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Net Profit/mo</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <PiggyBank className="h-4 w-4 text-amber-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${projections.savings.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Savings</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/15 rounded-xl p-3 text-center">
          <Wallet className="h-4 w-4 text-violet-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${projections.annualSavings.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">12-Month Savings</div>
        </div>
        <div className={`bg-gradient-to-br ${projections.profitMargin >= 20 ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/15" : projections.profitMargin >= 0 ? "from-amber-500/10 to-amber-500/5 border-amber-500/15" : "from-red-500/10 to-red-500/5 border-red-500/15"} border rounded-xl p-3 text-center`}>
          <Target className="h-4 w-4 text-slate-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{projections.profitMargin.toFixed(1)}%</div>
          <div className="text-[9px] text-slate-500">Profit Margin</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-[#0081C9]/10">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#0081C9]" /> Revenue Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <SliderInput label="Tour Bookings Revenue" value={inputs.monthlyRevenue} onChange={v => update("monthlyRevenue", v)} min={0} max={50000} step={500} prefix="$" suffix="/mo" icon={Plane} />
              <SliderInput label="Commission Rate" value={inputs.tourCommissionRate} onChange={v => update("tourCommissionRate", v)} min={5} max={30} step={1} suffix="%" icon={DollarSign} />
              <SliderInput label="AI Subscribers" value={inputs.aiSubscribers} onChange={v => update("aiSubscribers", v)} min={0} max={10000} step={50} icon={Sparkles} />
              <SliderInput label="AI Avg Price" value={inputs.aiAvgPrice} onChange={v => update("aiAvgPrice", v)} min={0} max={99} step={1} prefix="$" suffix="/mo" icon={Zap} />
              <SliderInput label="SaaS Clients" value={inputs.saasClients} onChange={v => update("saasClients", v)} min={0} max={500} step={5} icon={Building2} />
              <SliderInput label="SaaS Avg Price" value={inputs.saasAvgPrice} onChange={v => update("saasAvgPrice", v)} min={0} max={199} step={1} prefix="$" suffix="/mo" icon={DollarSign} />
              <SliderInput label="Ad Listings" value={inputs.adListings} onChange={v => update("adListings", v)} min={0} max={500} step={5} icon={ShoppingBag} />
              <SliderInput label="Ad Price/Listing" value={inputs.adPricePerListing} onChange={v => update("adPricePerListing", v)} min={10} max={200} step={5} prefix="$" suffix="/mo" icon={DollarSign} />
              <SliderInput label="Creator Volume" value={inputs.creatorVolume} onChange={v => update("creatorVolume", v)} min={0} max={100000} step={1000} prefix="$" icon={Users} />
            </CardContent>
          </Card>
          <Card className="border-[#C1121F]/10">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Wallet className="h-4 w-4 text-[#C1121F]" /> Costs & Strategy</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <SliderInput label="Operating Costs" value={inputs.operatingCosts} onChange={v => update("operatingCosts", v)} min={0} max={20000} step={500} prefix="$" suffix="/mo" icon={Building2} />
              <SliderInput label="Marketing Spend" value={inputs.marketingSpend} onChange={v => update("marketingSpend", v)} min={0} max={20000} step={500} prefix="$" suffix="/mo" icon={ShoppingBag} />
              <SliderInput label="Staff Costs" value={inputs.staffCosts} onChange={v => update("staffCosts", v)} min={0} max={30000} step={500} prefix="$" suffix="/mo" icon={Users} />
              <SliderInput label="Tech Infrastructure" value={inputs.techInfra} onChange={v => update("techInfra", v)} min={0} max={10000} step={250} prefix="$" suffix="/mo" icon={Zap} />
              <SliderInput label="Annual Growth Rate" value={inputs.growthRate} onChange={v => update("growthRate", v)} min={0} max={50} step={1} suffix="%" icon={TrendingUp} />
              <SliderInput label="Savings Rate" value={inputs.savingsRate} onChange={v => update("savingsRate", v)} min={0} max={60} step={5} suffix="%" icon={PiggyBank} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-[#0081C9]/10">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#0081C9]" /> 12-Month Revenue & Profit Projection</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projections.months12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#0081C9" fill="#0081C9" fillOpacity={0.1} strokeWidth={2} name="Revenue" />
                    <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} name="Profit" />
                    <Area type="monotone" dataKey="costs" stroke="#C1121F" fill="#C1121F" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" name="Costs" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/10">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><PiggyBank className="h-4 w-4 text-emerald-600" /> Cumulative Savings Growth</CardTitle></CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projections.months12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="cumSavings" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} name="Cumulative Savings" />
                    <Area type="monotone" dataKey="savings" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={1.5} name="Monthly Savings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-[#0081C9]/10">
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#0081C9]" /> Revenue Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#94a3b8" }} width={55} />
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {revenueBreakdown.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#C1121F]/10">
              <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Sliders className="h-4 w-4 text-[#C1121F]" /> Scenario Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Annual Revenue", value: `$${projections.annualRevenue.toLocaleString()}`, color: "text-[#0081C9]" },
                  { label: "Annual Profit", value: `$${projections.annualProfit.toLocaleString()}`, color: projections.annualProfit >= 0 ? "text-emerald-600" : "text-red-600" },
                  { label: "12-Month Savings", value: `$${projections.annualSavings.toLocaleString()}`, color: "text-amber-600" },
                  { label: "Year-End Monthly Rev", value: `$${projections.yearEndRevenue.toLocaleString()}`, color: "text-violet-600" },
                  { label: "Reinvestment/mo", value: `$${projections.reinvestment.toLocaleString()}`, color: "text-slate-700" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className="text-xs text-slate-600">{row.label}</span>
                    <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
                <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-[#0081C9]/5 to-[#C1121F]/5 border border-[#0081C9]/10">
                  <div className="flex items-start gap-2">
                    {projections.profitMargin >= 20 ? <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" /> : projections.profitMargin >= 0 ? <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />}
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      {projections.profitMargin >= 20 ? "Strong financial position. This scenario generates healthy margins with good savings potential. Consider reinvesting in growth." : projections.profitMargin >= 0 ? "Tight margins. Revenue covers costs but leaves limited room for savings. Consider reducing spend or increasing prices." : "This scenario operates at a loss. Reduce costs or increase revenue streams to reach profitability."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScenarioPlannerSection() {
  const [mode, setMode] = useState<PlannerMode>("personal");

  return (
    <div className="space-y-5" data-testid="scenario-planner-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#0081C9] to-[#C1121F] border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Calculator className="h-3 w-3 mr-1.5" /> What If? Scenario Planner
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-scenario-title">Financial Scenario Planner</h2>
        <p className="text-sm text-slate-500">Project financial outcomes based on different savings, spending, and growth strategies</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setMode("personal")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${mode === "personal" ? "bg-[#0081C9] text-white border-[#0081C9] shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/30"}`}
          data-testid="btn-mode-personal"
        >
          <Wallet className="h-4 w-4" /> Personal Finance
        </button>
        <button
          onClick={() => setMode("business")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${mode === "business" ? "bg-[#0081C9] text-white border-[#0081C9] shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/30"}`}
          data-testid="btn-mode-business"
        >
          <Briefcase className="h-4 w-4" /> Business Revenue
        </button>
      </div>

      {mode === "personal" ? <PersonalFinancePlanner /> : <BusinessFinancePlanner />}
    </div>
  );
}
