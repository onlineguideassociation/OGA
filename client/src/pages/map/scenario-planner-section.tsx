import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, TrendingDown, DollarSign, PiggyBank, Target, Lightbulb,
  ArrowRight, Plus, X, BarChart3, Wallet, Calculator,
  Percent, Calendar, Zap, AlertTriangle, CheckCircle, Clock, Sparkles,
  ChevronDown, ChevronUp, Minus, Globe
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";

interface Scenario {
  id: string;
  name: string;
  color: string;
  monthlyIncome: number;
  monthlySavings: number;
  monthlySpending: number;
  investmentReturn: number;
  inflationRate: number;
  timeHorizon: number;
  oneTimeInvestment: number;
  travelBudgetMonthly: number;
}

const DEFAULT_SCENARIO: Omit<Scenario, "id" | "name" | "color"> = {
  monthlyIncome: 3000,
  monthlySavings: 500,
  monthlySpending: 2000,
  investmentReturn: 7,
  inflationRate: 3,
  timeHorizon: 10,
  oneTimeInvestment: 5000,
  travelBudgetMonthly: 200,
};

const SCENARIO_COLORS = [
  { name: "Conservative", hex: "#3b82f6" },
  { name: "Moderate", hex: "#10b981" },
  { name: "Aggressive", hex: "#f59e0b" },
  { name: "Dream Big", hex: "#8b5cf6" },
];

const PRESETS = [
  { label: "Budget Backpacker", icon: "🎒", savings: 800, spending: 1200, travel: 100, investment: 2000, returns: 5 },
  { label: "Balanced Traveler", icon: "✈️", savings: 500, spending: 2000, travel: 300, investment: 5000, returns: 7 },
  { label: "Luxury Explorer", icon: "🏝️", savings: 300, spending: 3500, travel: 800, investment: 10000, returns: 8 },
  { label: "Digital Nomad", icon: "💻", savings: 1000, spending: 1500, travel: 500, investment: 8000, returns: 9 },
  { label: "Tourism Investor", icon: "📈", savings: 1500, spending: 1500, travel: 200, investment: 20000, returns: 12 },
  { label: "Retire in Cambodia", icon: "🌴", savings: 2000, spending: 1000, travel: 150, investment: 50000, returns: 6 },
];

function computeProjection(scenario: Scenario) {
  const months = scenario.timeHorizon * 12;
  const monthlyReturnRate = scenario.investmentReturn / 100 / 12;
  const monthlyInflationRate = scenario.inflationRate / 100 / 12;
  const realReturnRate = monthlyReturnRate - monthlyInflationRate;

  let totalSaved = scenario.oneTimeInvestment;
  let totalContributed = scenario.oneTimeInvestment;
  let totalTravelSpent = 0;
  const yearlyData: { year: number; saved: number; contributed: number; travelSpent: number }[] = [];

  for (let m = 1; m <= months; m++) {
    totalSaved = totalSaved * (1 + realReturnRate) + scenario.monthlySavings;
    totalContributed += scenario.monthlySavings;
    totalTravelSpent += scenario.travelBudgetMonthly;

    if (m % 12 === 0) {
      yearlyData.push({
        year: m / 12,
        saved: Math.round(totalSaved),
        contributed: Math.round(totalContributed),
        travelSpent: Math.round(totalTravelSpent),
      });
    }
  }

  const investmentGains = totalSaved - totalContributed;

  return {
    finalAmount: Math.round(totalSaved),
    totalContributed: Math.round(totalContributed),
    investmentGains: Math.round(investmentGains),
    totalSpending: Math.round(scenario.monthlySpending * months),
    totalTravelSpent: Math.round(totalTravelSpent),
    monthlyPassiveIncome: Math.round(totalSaved * realReturnRate),
    yearlyData,
  };
}

function SliderInput({ label, icon: Icon, value, onChange, min, max, step, prefix, suffix, color }: {
  label: string; icon: React.ElementType; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string; color?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
          <Icon className={`h-3.5 w-3.5 ${color || "text-slate-400"}`} /> {label}
        </label>
        <div className="flex items-center gap-1">
          <button onClick={() => onChange(Math.max(min, value - step))} className="h-5 w-5 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200" data-testid={`btn-dec-${label.toLowerCase().replace(/\s/g, "-")}`}>
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm font-bold text-slate-900 min-w-[70px] text-center">
            {prefix}{value.toLocaleString()}{suffix}
          </span>
          <button onClick={() => onChange(Math.min(max, value + step))} className="h-5 w-5 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200" data-testid={`btn-inc-${label.toLowerCase().replace(/\s/g, "-")}`}>
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0081C9]"
        data-testid={`slider-${label.toLowerCase().replace(/\s/g, "-")}`}
      />
      <div className="flex justify-between text-[8px] text-slate-400">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

function MiniBarChart({ data, maxVal, hexColor }: { data: { year: number; saved: number }[]; maxVal: number; hexColor: string }) {
  if (data.length === 0) return null;
  return (
    <div className="flex items-end gap-[2px] h-20">
      {data.map((d) => (
        <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5">
          <div
            className="w-full rounded-t transition-all duration-300"
            style={{ height: `${Math.max(2, (d.saved / maxVal) * 100)}%`, backgroundColor: hexColor }}
          />
          <span className="text-[7px] text-slate-400">{d.year}</span>
        </div>
      ))}
    </div>
  );
}

export default function ScenarioPlannerSection() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: "1", name: "Conservative", ...DEFAULT_SCENARIO, monthlySavings: 300, investmentReturn: 5, travelBudgetMonthly: 100, color: SCENARIO_COLORS[0].hex },
    { id: "2", name: "Moderate", ...DEFAULT_SCENARIO, color: SCENARIO_COLORS[1].hex },
  ]);
  const [activeScenarioId, setActiveScenarioId] = useState("1");
  const [expandedInsights, setExpandedInsights] = useState(true);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const updateScenario = useCallback((field: keyof Scenario, value: number | string) => {
    setScenarios(prev => prev.map(s => s.id === activeScenarioId ? { ...s, [field]: value } : s));
  }, [activeScenarioId]);

  const addScenario = () => {
    if (scenarios.length >= 4) return;
    const colorIdx = scenarios.length;
    const newId = String(Date.now());
    setScenarios(prev => [...prev, {
      id: newId, name: SCENARIO_COLORS[colorIdx]?.name || `Scenario ${colorIdx + 1}`,
      ...DEFAULT_SCENARIO, color: SCENARIO_COLORS[colorIdx]?.hex || "#64748b",
    }]);
    setActiveScenarioId(newId);
  };

  const removeScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios(prev => {
      const remaining = prev.filter(s => s.id !== id);
      if (activeScenarioId === id) setActiveScenarioId(remaining[0].id);
      return remaining;
    });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setScenarios(prev => prev.map(s => s.id === activeScenarioId ? {
      ...s, monthlySavings: preset.savings, monthlySpending: preset.spending,
      travelBudgetMonthly: preset.travel, oneTimeInvestment: preset.investment,
      investmentReturn: preset.returns,
    } : s));
  };

  const projections = useMemo(() => {
    return scenarios.map(s => ({ scenario: s, projection: computeProjection(s) }));
  }, [scenarios]);

  const activeProjection = projections.find(p => p.scenario.id === activeScenarioId)?.projection || projections[0].projection;
  const maxChartVal = Math.max(...projections.flatMap(p => p.projection.yearlyData.map(d => d.saved)), 1);

  const bestScenario = projections.reduce((best, curr) => curr.projection.finalAmount > best.projection.finalAmount ? curr : best);
  const worstScenario = projections.reduce((worst, curr) => curr.projection.finalAmount < worst.projection.finalAmount ? curr : worst);

  const generateInsights = () => {
    const insights: { icon: React.ElementType; text: string; type: "tip" | "warning" | "success" }[] = [];
    const savingsRate = (activeScenario.monthlySavings / activeScenario.monthlyIncome) * 100;

    if (savingsRate < 15) {
      insights.push({ icon: AlertTriangle, text: `Your savings rate is ${savingsRate.toFixed(0)}%. Financial experts recommend saving at least 20% of income.`, type: "warning" });
    } else if (savingsRate >= 30) {
      insights.push({ icon: CheckCircle, text: `Excellent! Your ${savingsRate.toFixed(0)}% savings rate puts you ahead of most people.`, type: "success" });
    }

    if (activeScenario.travelBudgetMonthly > activeScenario.monthlySavings) {
      insights.push({ icon: AlertTriangle, text: "You're spending more on travel than you save. Consider balancing experiences with long-term goals.", type: "warning" });
    }

    if (activeProjection.monthlyPassiveIncome > 500) {
      insights.push({ icon: Sparkles, text: `In ${activeScenario.timeHorizon} years, your investments could generate $${activeProjection.monthlyPassiveIncome.toLocaleString()}/month in passive income.`, type: "success" });
    }

    const tripsToCambodia = Math.floor(activeProjection.totalTravelSpent / 1500);
    if (tripsToCambodia > 0) {
      insights.push({ icon: Lightbulb, text: `Your travel budget over ${activeScenario.timeHorizon} years ($${activeProjection.totalTravelSpent.toLocaleString()}) could fund ~${tripsToCambodia} trips to Cambodia!`, type: "tip" });
    }

    if (activeProjection.investmentGains > activeProjection.totalContributed * 0.5) {
      insights.push({ icon: TrendingUp, text: `Compound interest is working hard — your investment gains ($${activeProjection.investmentGains.toLocaleString()}) are significant relative to what you put in.`, type: "success" });
    }

    if (activeScenario.monthlyIncome - activeScenario.monthlySpending - activeScenario.monthlySavings - activeScenario.travelBudgetMonthly < 0) {
      insights.push({ icon: AlertTriangle, text: "Your expenses exceed your income! Reduce spending, savings, or travel budget to balance.", type: "warning" });
    }

    return insights;
  };

  const insights = generateInsights();
  const surplus = activeScenario.monthlyIncome - activeScenario.monthlySpending - activeScenario.monthlySavings - activeScenario.travelBudgetMonthly;

  return (
    <div className="space-y-6" data-testid="scenario-planner-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#0081C9] to-indigo-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Calculator className="h-3 w-3 mr-1.5" /> Financial Scenario Planner
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-scenario-title">
          "What If?" Financial Planner
        </h2>
        <p className="text-sm text-slate-500">
          Project your financial future based on different savings, spending, and travel habits. Compare up to 4 scenarios side by side.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-[#0081C9]/10 to-[#0081C9]/5 border border-[#0081C9]/15 rounded-xl p-3 text-center">
          <Target className="h-4 w-4 text-[#0081C9] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900" data-testid="text-projected-savings">${activeProjection.finalAmount.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Projected Savings</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900" data-testid="text-investment-gains">${activeProjection.investmentGains.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Investment Gains</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Wallet className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900" data-testid="text-passive-income">${activeProjection.monthlyPassiveIncome.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Passive Income</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/15 rounded-xl p-3 text-center">
          <Globe className="h-4 w-4 text-purple-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900" data-testid="text-travel-budget">${activeProjection.totalTravelSpent.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Travel Budget</div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {scenarios.map((s) => (
          <button key={s.id} onClick={() => setActiveScenarioId(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              s.id === activeScenarioId
                ? "bg-white shadow-md border-[#0081C9] text-[#0081C9]"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
            data-testid={`btn-scenario-${s.id}`}>
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            {s.name}
            {scenarios.length > 1 && (
              <span onClick={e => { e.stopPropagation(); removeScenario(s.id); }} className="text-slate-300 hover:text-rose-500 ml-1">
                <X className="h-3 w-3" />
              </span>
            )}
          </button>
        ))}
        {scenarios.length < 4 && (
          <button onClick={addScenario}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-dashed border-slate-300 text-slate-500 hover:border-[#0081C9] hover:text-[#0081C9] transition-all"
            data-testid="btn-add-scenario">
            <Plus className="h-3 w-3" /> Add Scenario
          </button>
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-amber-500" /> Quick Presets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p)}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#0081C9] hover:bg-blue-50/50 transition-all text-left"
              data-testid={`btn-preset-${p.label.toLowerCase().replace(/\s/g, "-")}`}>
              <span className="text-xl">{p.icon}</span>
              <div>
                <div className="text-[10px] font-bold text-slate-700">{p.label}</div>
                <div className="text-[8px] text-slate-400">Save ${p.savings}/mo</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#0081C9]/20">
          <CardContent className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-[#0081C9]" /> Adjust Parameters
              </h3>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: activeScenario.color }} />
                <input
                  type="text" value={activeScenario.name}
                  onChange={e => updateScenario("name", e.target.value)}
                  className="text-xs font-medium text-slate-600 bg-transparent outline-none border-b border-transparent hover:border-slate-300 focus:border-[#0081C9] w-24 text-right"
                  data-testid="input-scenario-name"
                />
              </div>
            </div>

            <SliderInput label="Monthly Income" icon={DollarSign} value={activeScenario.monthlyIncome} onChange={v => updateScenario("monthlyIncome", v)} min={500} max={20000} step={100} prefix="$" color="text-emerald-500" />
            <SliderInput label="Monthly Savings" icon={PiggyBank} value={activeScenario.monthlySavings} onChange={v => updateScenario("monthlySavings", v)} min={0} max={10000} step={50} prefix="$" color="text-blue-500" />
            <SliderInput label="Monthly Spending" icon={Wallet} value={activeScenario.monthlySpending} onChange={v => updateScenario("monthlySpending", v)} min={200} max={15000} step={100} prefix="$" color="text-rose-500" />
            <SliderInput label="Travel Budget" icon={Globe} value={activeScenario.travelBudgetMonthly} onChange={v => updateScenario("travelBudgetMonthly", v)} min={0} max={3000} step={25} prefix="$" suffix="/mo" color="text-purple-500" />

            <div className="pt-2 border-t border-slate-100">
              <SliderInput label="Initial Investment" icon={Target} value={activeScenario.oneTimeInvestment} onChange={v => updateScenario("oneTimeInvestment", v)} min={0} max={100000} step={500} prefix="$" color="text-indigo-500" />
            </div>
            <SliderInput label="Expected Returns" icon={Percent} value={activeScenario.investmentReturn} onChange={v => updateScenario("investmentReturn", v)} min={1} max={20} step={0.5} suffix="%" color="text-amber-500" />
            <SliderInput label="Inflation Rate" icon={TrendingDown} value={activeScenario.inflationRate} onChange={v => updateScenario("inflationRate", v)} min={0} max={10} step={0.5} suffix="%" color="text-rose-400" />
            <SliderInput label="Time Horizon" icon={Calendar} value={activeScenario.timeHorizon} onChange={v => updateScenario("timeHorizon", v)} min={1} max={40} step={1} suffix=" yrs" color="text-slate-500" />

            <div className={`rounded-xl p-3 text-center ${surplus >= 0 ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"}`}>
              <div className="text-[10px] text-slate-500 mb-0.5">Monthly Balance</div>
              <div className={`text-lg font-bold ${surplus >= 0 ? "text-emerald-600" : "text-rose-600"}`} data-testid="text-monthly-balance">
                {surplus >= 0 ? "+" : ""}${surplus.toLocaleString()}
              </div>
              <div className="text-[9px] text-slate-400">Income - Spending - Savings - Travel</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-[#0081C9]" /> Growth Projection
              </h3>
              <div className="space-y-4">
                {projections.map(({ scenario, projection }) => (
                  <div key={scenario.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: scenario.color }} />
                        {scenario.name}
                      </span>
                      <span className="text-xs font-bold text-slate-900">${projection.finalAmount.toLocaleString()}</span>
                    </div>
                    <MiniBarChart data={projection.yearlyData} maxVal={maxChartVal} hexColor={scenario.color} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-[#0081C9]" /> Scenario Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 text-slate-500 font-medium">Metric</th>
                      {projections.map(({ scenario }) => (
                        <th key={scenario.id} className="text-right py-2 font-medium" style={{ color: scenario.color }}>{scenario.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { label: "Final Savings", key: "finalAmount" },
                      { label: "Total Contributed", key: "totalContributed" },
                      { label: "Investment Gains", key: "investmentGains" },
                      { label: "Travel Spent", key: "totalTravelSpent" },
                      { label: "Passive Income/mo", key: "monthlyPassiveIncome" },
                    ].map(row => (
                      <tr key={row.key}>
                        <td className="py-2 text-slate-600">{row.label}</td>
                        {projections.map(({ scenario, projection }) => (
                          <td key={scenario.id} className="text-right py-2 font-bold text-slate-900">
                            ${(projection[row.key as keyof typeof projection] as number).toLocaleString()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {projections.length > 1 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Best: {bestScenario.scenario.name} (+${bestScenario.projection.finalAmount.toLocaleString()})
                  </span>
                  <span className="text-slate-400">
                    Difference: ${(bestScenario.projection.finalAmount - worstScenario.projection.finalAmount).toLocaleString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={insights.some(i => i.type === "warning") ? "border-amber-200" : "border-emerald-200"}>
            <CardContent className="pt-5">
              <button onClick={() => setExpandedInsights(!expandedInsights)} className="flex items-center justify-between w-full" data-testid="btn-toggle-insights">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-500" /> AI Insights & Tips
                  <Badge className="bg-[#0081C9]/10 text-[#0081C9] border-0 text-[9px]">{insights.length}</Badge>
                </h3>
                {expandedInsights ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              {expandedInsights && (
                <div className="mt-3 space-y-2">
                  {insights.map((insight, i) => (
                    <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-lg ${
                      insight.type === "warning" ? "bg-amber-50" : insight.type === "success" ? "bg-emerald-50" : "bg-blue-50"
                    }`}>
                      <insight.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        insight.type === "warning" ? "text-amber-500" : insight.type === "success" ? "text-emerald-500" : "text-blue-500"
                      }`} />
                      <span className="text-xs text-slate-700 leading-relaxed">{insight.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-[#0081C9]/20 bg-gradient-to-r from-[#0081C9]/5 to-indigo-500/5">
        <CardContent className="py-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#0081C9]" /> Year-by-Year Breakdown — {activeScenario.name}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-medium">Year</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Net Worth</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Contributed</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Gains</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Travel Spent</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeProjection.yearlyData.map((d, i) => {
                  const gains = d.saved - d.contributed;
                  const prevSaved = i > 0 ? activeProjection.yearlyData[i - 1].saved : activeScenario.oneTimeInvestment;
                  const growth = prevSaved > 0 ? ((d.saved - prevSaved) / prevSaved * 100) : 0;
                  return (
                    <tr key={d.year} className="hover:bg-white/50">
                      <td className="py-2 text-slate-700 font-medium">Year {d.year}</td>
                      <td className="text-right py-2 font-bold text-slate-900">${d.saved.toLocaleString()}</td>
                      <td className="text-right py-2 text-slate-600">${d.contributed.toLocaleString()}</td>
                      <td className={`text-right py-2 font-medium ${gains >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {gains >= 0 ? "+" : ""}${gains.toLocaleString()}
                      </td>
                      <td className="text-right py-2 text-purple-600">${d.travelSpent.toLocaleString()}</td>
                      <td className="text-right py-2">
                        <Badge className={`text-[8px] border-0 ${growth >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                          {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#C1121F]/10 bg-gradient-to-r from-[#C1121F]/5 to-rose-500/5">
        <CardContent className="py-5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 mb-1">Ready to turn plans into reality?</h3>
              <p className="text-sm text-slate-500">Browse Cambodia tours and experiences that fit your travel budget. Start saving and exploring today.</p>
            </div>
            <Button className="bg-[#C1121F] hover:bg-[#a30f1a] text-white font-semibold rounded-xl h-11 px-6 whitespace-nowrap" data-testid="btn-explore-tours">
              Explore Tours <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
