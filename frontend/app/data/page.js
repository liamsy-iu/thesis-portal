"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  ReferenceLine,
} from "recharts";


// ── SOURCE 1: FinAccess Household Survey ─────────────────────────
const finAccessInclusion = [
  { year: "2006", formal: 26.7, informal: 32.0, excluded: 41.3 },
  { year: "2009", formal: 32.1, informal: 26.8, excluded: 41.1 },
  { year: "2013", formal: 40.4, informal: 25.4, excluded: 34.2 },
  { year: "2016", formal: 66.7, informal: 17.4, excluded: 15.9 },
  { year: "2019", formal: 75.3, informal: 11.0, excluded: 13.7 },
  { year: "2021", formal: 83.7, informal: 4.7, excluded: 11.6 },
  { year: "2024", formal: 84.8, informal: 5.3, excluded: 9.9 },
];

const finAccessUsage = [
  { year: "2009", mobileMoney: 27.9, bank: 17.0, sacco: 4.1, mfi: 2.1 },
  { year: "2013", mobileMoney: 61.6, bank: 29.2, sacco: 6.6, mfi: 2.9 },
  { year: "2016", mobileMoney: 71.4, bank: 42.3, sacco: 8.2, mfi: 3.1 },
  { year: "2019", mobileMoney: 79.0, bank: 44.8, sacco: 9.1, mfi: 3.3 },
  { year: "2021", mobileMoney: 81.4, bank: 46.3, sacco: 9.3, mfi: 2.8 },
  { year: "2024", mobileMoney: 82.3, bank: 52.5, sacco: 9.1, mfi: 8.2 },
];

const finAccessGender = [
  { year: "2006", male: 33.2, female: 20.5, gap: 12.7 },
  { year: "2009", male: 48.1, female: 33.7, gap: 14.4 },
  { year: "2013", male: 71.2, female: 62.8, gap: 8.4 },
  { year: "2016", male: 79.7, female: 71.2, gap: 8.5 },
  { year: "2019", male: 85.6, female: 80.4, gap: 5.2 },
  { year: "2021", male: 85.9, female: 81.7, gap: 4.2 },
  { year: "2024", male: 85.7, female: 84.1, gap: 1.6 },
];

const finAccessQuality = [
  { indicator: "Formal Inclusion", value: 84.8 },
  { indicator: "Daily Mobile Money", value: 52.6 },
  { indicator: "Credit Uptake", value: 64.0 },
  { indicator: "Savers", value: 68.1 },
  { indicator: "Financially Healthy", value: 18.3 },
  { indicator: "Financially Literate", value: 42.1 },
  { indicator: "Loan Defaulters", value: 16.6 },
  { indicator: "PWD Included", value: 77.9 },
];

// ── SOURCE 2: Kenya Vision 2030 ──────────────────────────────────
const vision2030 = [
  {
    target: "Financial Inclusion",
    goal2030: 100,
    achieved2024: 84.8,
    achieved2021: 83.7,
  },
  {
    target: "Mobile Payments",
    goal2030: 100,
    achieved2024: 82.3,
    achieved2021: 81.4,
  },
  {
    target: "Bank Access",
    goal2030: 80,
    achieved2024: 52.5,
    achieved2021: 46.3,
  },
  {
    target: "Credit Access",
    goal2030: 80,
    achieved2024: 64.0,
    achieved2021: 51.0,
  },
  { target: "Insurance", goal2030: 50, achieved2024: 22.0, achieved2021: 18.9 },
  {
    target: "Savings Rate",
    goal2030: 90,
    achieved2024: 68.1,
    achieved2021: 70.7,
  },
];

// ── SOURCE 3: FSD Kenya ──────────────────────────────────────────
const fsdMobileMoney = [
  { year: "2009", users: 27.9, note: "2 years after launch" },
  { year: "2013", users: 61.6, note: "M-Shwari launch" },
  { year: "2016", users: 71.4, note: "KCB M-PESA" },
  { year: "2019", users: 79.0, note: "Fuliza launch" },
  { year: "2021", users: 81.4, note: "Post-COVID" },
  { year: "2024", users: 82.3, note: "Record high" },
];

const fsdFinancialHealth = [
  { category: "Financially Healthy", pct: 18.3, color: "#10b981" },
  { category: "Financially Coping", pct: 47.2, color: "#f59e0b" },
  { category: "Financially Vulnerable", pct: 34.5, color: "#ef4444" },
];

// ── SOURCE 4: Safaricom PLC Annual Reports ────────────────────────
const safaricamSubscribers = [
  { year: "2007", subscribers: 2.0, revenue: null },
  { year: "2008", subscribers: 5.0, revenue: null },
  { year: "2009", subscribers: 7.7, revenue: null },
  { year: "2010", subscribers: 10.5, revenue: null },
  { year: "2011", subscribers: 17.0, revenue: null },
  { year: "2012", subscribers: 15.2, revenue: null },
  { year: "2013", subscribers: 17.1, revenue: 21.84 },
  { year: "2014", subscribers: 19.4, revenue: null },
  { year: "2015", subscribers: 21.6, revenue: null },
  { year: "2016", subscribers: 24.0, revenue: null },
  { year: "2017", subscribers: 27.0, revenue: null },
  { year: "2018", subscribers: 29.5, revenue: null },
  { year: "2019", subscribers: 31.0, revenue: null },
  { year: "2020", subscribers: 30.7, revenue: null },
  { year: "2021", subscribers: 31.5, revenue: null },
  { year: "2022", subscribers: 32.0, revenue: 107.7 },
  { year: "2023", subscribers: 32.5, revenue: null },
  { year: "2024", subscribers: 34.0, revenue: 139.91 },
  { year: "2025", subscribers: null, revenue: 161.1 },
];

// ── SOURCE 5: CBK Mobile Payment Statistics ───────────────────────
const cbkTransactions = [
  { year: "2007", value: 0.1, volume: 5, agents: 0.45 },
  { year: "2008", value: 0.4, volume: 30, agents: 4.0 },
  { year: "2009", value: 0.6, volume: 120, agents: 8.0 },
  { year: "2010", value: 0.9, volume: 220, agents: 16.0 },
  { year: "2011", value: 1.2, volume: 320, agents: 24.0 },
  { year: "2012", value: 1.8, volume: 480, agents: 67.0 },
  { year: "2013", value: 2.0, volume: 620, agents: 88.0 },
  { year: "2014", value: 2.5, volume: 780, agents: 110.0 },
  { year: "2015", value: 3.2, volume: 990, agents: 130.0 },
  { year: "2016", value: 3.9, volume: 1200, agents: 155.0 },
  { year: "2017", value: 4.5, volume: 1450, agents: 177.0 },
  { year: "2018", value: 5.0, volume: 1700, agents: 220.0 },
  { year: "2019", value: 5.7, volume: 1960, agents: 256.0 },
  { year: "2020", value: 5.5, volume: 1800, agents: 275.0 },
  { year: "2021", value: 7.0, volume: 2100, agents: 310.0 },
  { year: "2022", value: 7.8, volume: 2400, agents: 350.0 },
  { year: "2023", value: 7.95, volume: 2700, agents: 370.0 },
  { year: "2024", value: 8.69, volume: 3100, agents: 381.0 },
];

// ── SOURCE 6: Safaricom FY Press Releases ────────────────────────
const safaricamFYMetrics = [
  {
    fy: "FY2020",
    revenue: 96.0,
    growth: -4.0,
    transactions: 1800,
    activeUsers: 30.7,
  },
  {
    fy: "FY2021",
    revenue: 105.0,
    growth: 9.4,
    transactions: 2100,
    activeUsers: 31.5,
  },
  {
    fy: "FY2022",
    revenue: 120.0,
    growth: 14.3,
    transactions: 2400,
    activeUsers: 32.0,
  },
  {
    fy: "FY2023",
    revenue: 132.0,
    growth: 10.0,
    transactions: 2700,
    activeUsers: 32.5,
  },
  {
    fy: "FY2024",
    revenue: 144.0,
    growth: 9.1,
    transactions: 3100,
    activeUsers: 34.0,
  },
  {
    fy: "FY2025",
    revenue: 157.0,
    growth: 9.0,
    transactions: 3400,
    activeUsers: 36.0,
  },
];

// ── SOURCE 7 & 8: Global Findex / World Bank ─────────────────────
const findexKenya = [
  { year: "2011", kenya: 42.3, subSahara: 24.0, global: 51.0, mobileOnly: 0 },
  {
    year: "2014",
    kenya: 75.3,
    subSahara: 34.2,
    global: 62.0,
    mobileOnly: 58.0,
  },
  {
    year: "2017",
    kenya: 82.0,
    subSahara: 42.6,
    global: 69.0,
    mobileOnly: 73.0,
  },
  {
    year: "2021",
    kenya: 79.0,
    subSahara: 49.0,
    global: 76.0,
    mobileOnly: 79.0,
  },
];

const findexMobileMoney = [
  { country: "Kenya", pct: 79, year: 2021 },
  { country: "Ghana", pct: 46, year: 2021 },
  { country: "Uganda", pct: 45, year: 2021 },
  { country: "Tanzania", pct: 45, year: 2021 },
  { country: "Senegal", pct: 42, year: 2021 },
  { country: "Sub-Saharan Avg", pct: 33, year: 2021 },
  { country: "Dev. Economies", pct: 10, year: 2021 },
];

// ── SOURCE 9: CBK Agent Banking Guidelines ────────────────────────
const agentMilestones = [
  { year: "2007", agents: 0.45, event: "M-PESA launch — 450 agents" },
  { year: "2010", agents: 16.0, event: "Agent Banking Regulations gazetted" },
  { year: "2011", agents: 24.0, event: "NPS Act 2011 enacted" },
  { year: "2013", agents: 88.0, event: "E-Money Regulations 2013" },
  { year: "2015", agents: 130.0, event: "KCB M-PESA launch" },
  { year: "2019", agents: 256.0, event: "Fuliza launch" },
  { year: "2022", agents: 350.0, event: "DCP Regulations 2022" },
  { year: "2024", agents: 381.0, event: "381,116 active agents" },
  { year: "2025", agents: 394.9, event: "394,853 agents (CBK 2025)" },
];

// ── SOURCE 10-12: Regulatory Framework ───────────────────────────
const regulatoryMilestones = [
  {
    year: 2007,
    event: "No-Objection Letter",
    detail:
      "CBK grants M-PESA no-objection letter — innovative 'wait and see' approach",
    color: "#3b82f6",
  },
  {
    year: 2010,
    event: "Agent Banking Regulations",
    detail:
      "Guidelines allowing banks to use agents outside branches — key to rural expansion",
    color: "#10b981",
  },
  {
    year: 2011,
    event: "National Payment System Act",
    detail:
      "Comprehensive legal framework — defines Payment Service Providers, CBK oversight",
    color: "#f59e0b",
  },
  {
    year: 2013,
    event: "E-Money Regulations",
    detail:
      "E-money issuance standards — customer fund protection requirements",
    color: "#8b5cf6",
  },
  {
    year: 2014,
    event: "National Payment System Regulations",
    detail: "Detailed operational rules for payment service providers",
    color: "#6366f1",
  },
  {
    year: 2021,
    event: "CBK (Amendment) Act",
    detail: "Extended CBK mandate to regulate digital credit providers",
    color: "#ec4899",
  },
  {
    year: 2022,
    event: "Digital Credit Providers Regulations",
    detail:
      "Licensing of 288 digital lenders — consumer protection, interest disclosure",
    color: "#ef4444",
  },
  {
    year: 2023,
    event: "National Payments Strategy 2022-2025",
    detail:
      "Blueprint for interoperability, cross-border payments, open banking",
    color: "#14b8a6",
  },
];

// ── SOURCE 13: KNBS Economic Survey ──────────────────────────────
const knbsData = [
  { year: "2009", gdpPct: 10.0, subscriptions: 7.7, p2pValue: 0.6 },
  { year: "2012", gdpPct: 18.0, subscriptions: 15.2, p2pValue: 1.8 },
  { year: "2015", gdpPct: 28.0, subscriptions: 21.6, p2pValue: 3.2 },
  { year: "2018", gdpPct: 37.0, subscriptions: 29.5, p2pValue: 5.0 },
  { year: "2021", gdpPct: 46.0, subscriptions: 31.5, p2pValue: 7.0 },
  { year: "2024", gdpPct: 53.0, subscriptions: 34.0, p2pValue: 8.69 },
  { year: "2025", gdpPct: 58.0, subscriptions: 51.4, p2pValue: 8.66 },
];

// ── Urban vs Rural ────────────────────────────────────────────────
const urbanRural = [
  { year: "2006", urban: 35.5, rural: 23.8 },
  { year: "2009", urban: 44.2, rural: 27.1 },
  { year: "2013", urban: 72.1, rural: 55.8 },
  { year: "2016", urban: 79.8, rural: 59.1 },
  { year: "2019", urban: 88.7, rural: 70.8 },
  { year: "2021", urban: 90.0, rural: 79.8 },
  { year: "2024", urban: 91.3, rural: 80.2 },
];

// ── Muslim Counties ───────────────────────────────────────────────
const muslimCounties = [
  { county: "Mandera", yr2021: 83.9, yr2024: 89.7, muslim: true },
  { county: "Wajir", yr2021: 86.5, yr2024: 85.6, muslim: true },
  { county: "Garissa", yr2021: 60.8, yr2024: 87.1, muslim: true },
  { county: "Mombasa", yr2021: 89.9, yr2024: 87.6, muslim: true },
  { county: "Lamu", yr2021: 82.0, yr2024: 84.0, muslim: true },
  { county: "National Avg", yr2021: 83.7, yr2024: 84.8, muslim: false },
  { county: "Nairobi", yr2021: 95.0, yr2024: 93.7, muslim: false },
];

const SOURCES = [
  {
    id: "finaccess",
    label: "FinAccess Survey",
    labelAr: "مسح FinAccess",
    color: "#3b82f6",
    count: 4,
  },
  {
    id: "vision2030",
    label: "Kenya Vision 2030",
    labelAr: "رؤية كينيا 2030",
    color: "#10b981",
    count: 1,
  },
  {
    id: "fsd",
    label: "FSD Kenya",
    labelAr: "FSD كينيا",
    color: "#8b5cf6",
    count: 2,
  },
  {
    id: "safaricom",
    label: "Safaricom Annual Reports",
    labelAr: "تقارير سفاريكوم",
    color: "#f59e0b",
    count: 2,
  },
  {
    id: "cbk",
    label: "CBK Mobile Payments",
    labelAr: "CBK المدفوعات",
    color: "#ef4444",
    count: 3,
  },
  {
    id: "fypress",
    label: "Safaricom FY Releases",
    labelAr: "نشرات سفاريكوم",
    color: "#ec4899",
    count: 1,
  },
  {
    id: "findex",
    label: "Global Findex / World Bank",
    labelAr: "Findex / البنك الدولي",
    color: "#14b8a6",
    count: 2,
  },
  {
    id: "agent",
    label: "CBK Agent Banking",
    labelAr: "الصيرفة الوكيلة",
    color: "#6366f1",
    count: 1,
  },
  {
    id: "regulatory",
    label: "NPS Act & Regulations",
    labelAr: "الإطار التنظيمي",
    color: "#a855f7",
    count: 1,
  },
  {
    id: "knbs",
    label: "KNBS Economic Survey",
    labelAr: "مسح KNBS الاقتصادي",
    color: "#f97316",
    count: 2,
  },
  {
    id: "counties",
    label: "Muslim Counties & Gender",
    labelAr: "المحافظات والجندر",
    color: "#06b6d4",
    count: 2,
  },
  {
    id: "mpesa_services",
    label: "M-PESA Services",
    labelAr: "خدمات M-PESA",
    color: "#10b981",
    count: 3,
  },
  {
    id: "fintech_fields",
    label: "Kenya Fintech Fields",
    labelAr: "مجالات التقنية المالية",
    color: "#f43f5e",
    count: 2,
  },
  {
    id: "fi_summary",
    label: "Financial Inclusion Summary",
    labelAr: "ملخص الإدماج المالي",
    color: "#0ea5e9",
    count: 3,
  },
];

const formatNum = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}B`;
  if (n >= 1) return `${n.toFixed(1)}T KES`;
  return n;
};

export default function DataPage() {
  const [activeSource, setActiveSource] = useState("finaccess");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">
          Research Data Visualizations
        </h1>
        <p className="text-sm text-muted" dir="rtl">
          مصادر البيانات الأولية للرسالة — M-PESA والشمول المالي للمسلمين في
          كينيا 2007–2025
        </p>
      </div>

      {/* Source Navigator */}
      <div className="card">
        <h2 className="text-sm font-semibold text-primary mb-3">
          📚 Data Sources / مصادر البيانات
        </h2>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSource(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeSource === s.id
                  ? "text-white border-transparent"
                  : "bg-secondary border-theme text-muted hover:text-primary"
              }`}
              style={
                activeSource === s.id
                  ? { backgroundColor: s.color, borderColor: s.color }
                  : {}
              }
            >
              {s.label}
              <span className="ml-1 opacity-70">({s.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── SOURCE 1: FinAccess ── */}
      {activeSource === "finaccess" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-blue-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              مسح FinAccess للأسر المعيشية — FinAccess Household Survey
            </div>
            <div className="text-xs text-muted">
              مسح وطني كل 2-3 سنوات | CBK × KNBS × FSD Kenya | 2006–2024
            </div>
          </div>

          {/* Chart 1 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Financial Access Strata 2006–2024
            </h2>
            <p className="text-xs text-muted mb-4">
              الشمول المالي الرسمي، غير الرسمي، والمستبعدون | المصدر: FinAccess
              2006–2024
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={finAccessInclusion}>
                <defs>
                  <linearGradient id="gFormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gExcluded" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="formal"
                  stroke="#3b82f6"
                  fill="url(#gFormal)"
                  strokeWidth={2}
                  name="Formally Included %"
                  dot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="informal"
                  stroke="#f59e0b"
                  fill="none"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="Informally Included %"
                  dot={{ r: 3 }}
                />
                <Area
                  type="monotone"
                  dataKey="excluded"
                  stroke="#ef4444"
                  fill="url(#gExcluded)"
                  strokeWidth={2}
                  name="Excluded %"
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: مسح FinAccess 2006–2024 | CBK × KNBS × FSD Kenya
            </p>
          </div>

          {/* Chart 2 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Provider Usage Growth 2009–2024
            </h2>
            <p className="text-xs text-muted mb-4">
              نمو استخدام مزودي الخدمات المالية | المصدر: FinAccess
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={finAccessUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="mobileMoney"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Mobile Money %"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="bank"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Bank %"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="sacco"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="SACCO %"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="mfi"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="MFI/Digital %"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FinAccess 2009–2024 | النقود المتنقلة تجاوزت البنوك منذ
              2009
            </p>
          </div>

          {/* Chart 3 — Gender */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Gender Gap in Financial Inclusion 2006–2024
            </h2>
            <p className="text-xs text-muted mb-3">
              الفجوة الجندرية تراجعت من 12.7% (2006) إلى 1.6% (2024)
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="bg-secondary border border-theme rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-red-500">12.7%</div>
                <div className="text-xs text-muted">Gap 2006</div>
              </div>
              <div className="flex items-center text-muted">→</div>
              <div className="bg-secondary border border-theme rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-green-500">1.6%</div>
                <div className="text-xs text-muted">Gap 2024</div>
              </div>
              <div className="bg-secondary border border-theme rounded-lg px-3 py-2 text-center">
                <div className="text-xl font-bold text-accent">87%↓</div>
                <div className="text-xs text-muted">Reduction</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={finAccessGender}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="male"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Male %"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="female"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Female %"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="gap"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Gender Gap %"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FinAccess 2006–2024 | من أدنى الفجوات الجندرية في أفريقيا
            </p>
          </div>

          {/* Chart 4 — Quality indicators */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Financial Inclusion Quality Indicators — 2024
            </h2>
            <p className="text-xs text-muted mb-4">
              مؤشرات الجودة والتأثير | المصدر: FinAccess 2024
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={finAccessQuality} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="indicator"
                  tick={{ fontSize: 10 }}
                  width={110}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  name="%"
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FinAccess 2024 | رغم ارتفاع الشمول، 16.6% من المقترضين
              متعثرون و18.3% فقط يصنفون صحياً مالياً
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 2: Vision 2030 ── */}
      {activeSource === "vision2030" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-green-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              رؤية كينيا 2030 — Kenya Vision 2030
            </div>
            <div className="text-xs text-muted">
              مستهدفات الشمول المالي ضمن إطار التنمية الوطنية الكينية
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Vision 2030 Financial Inclusion Targets vs Achievement
            </h2>
            <p className="text-xs text-muted mb-4">
              المستهدفات مقابل الإنجاز الفعلي | المصدر: Kenya Vision 2030 ×
              FinAccess
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={vision2030}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="target" tick={{ fontSize: 10 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 110]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="goal2030"
                  fill="#e5e7eb"
                  name="2030 Target"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="achieved2024"
                  fill="#10b981"
                  name="Achieved 2024"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="achieved2021"
                  fill="#3b82f6"
                  name="Achieved 2021"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2" dir="rtl">
              {vision2030.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-primary w-28">{d.target}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${(d.achieved2024 / d.goal2030) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted w-20">
                    {d.achieved2024}% / {d.goal2030}%
                  </span>
                  <span
                    className={`text-xs font-medium w-12 ${d.achieved2024 >= d.goal2030 ? "text-green-500" : "text-yellow-500"}`}
                  >
                    {d.achieved2024 >= d.goal2030
                      ? "✓"
                      : `${Math.round((d.achieved2024 / d.goal2030) * 100)}%`}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3 text-right" dir="rtl">
              المصدر: Kenya Vision 2030 × FinAccess 2024 | الشمول المالي يقترب
              من الهدف (84.8% من 100%) بينما التأمين والصحة المالية يتخلفان
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 3: FSD Kenya ── */}
      {activeSource === "fsd" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-purple-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              FSD Kenya — القطاع المالي والتنمية
            </div>
            <div className="text-xs text-muted">
              تحليلات FSD Kenya لمسوح FinAccess | مؤشر الصحة المالية | 2006–2024
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Mobile Money Meteoric Growth — FSD Kenya Analysis
            </h2>
            <p className="text-xs text-muted mb-4">
              من 27.9% (2009) إلى 82.3% (2024) | المصدر: FSD Kenya FinAccess
              Spotlight 2024
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={fsdMobileMoney}>
                <defs>
                  <linearGradient id="gMM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12 }}
                  formatter={(v) => `${v}%`}
                  labelFormatter={(label) => {
                    const d = fsdMobileMoney.find((x) => x.year === label);
                    return d ? `${label} — ${d.note}` : label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  fill="url(#gMM)"
                  strokeWidth={3}
                  name="Mobile Money Users %"
                  dot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FSD Kenya FinAccess Spotlight 2024 | &quot;النمو الصاروخي
              للنقود المتنقلة من 27.9% إلى 82.3% خلال 15 عاماً&quot;
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Financial Health Index — Kenya 2024
            </h2>
            <p className="text-xs text-muted mb-4">
              مؤشر الصحة المالية | المصدر: FSD Kenya FinAccess 2024
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={fsdFinancialHealth}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="pct"
                    label={({ pct }) => `${pct}%`}
                    labelLine={false}
                  >
                    {fsdFinancialHealth.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => `${v}%`}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex flex-col justify-center">
                {fsdFinancialHealth.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-primary font-medium">
                        {d.category}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${d.pct}%`,
                            backgroundColor: d.color,
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: d.color }}
                    >
                      {d.pct}%
                    </span>
                  </div>
                ))}
                <p className="text-xs text-muted" dir="rtl">
                  رغم ارتفاع الشمول الرسمي إلى 84.8%، 18.3% فقط يصنفون
                  &quot;صحيين مالياً&quot; — الكمية دون النوعية
                </p>
              </div>
            </div>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FSD Kenya FinAccess 2024 Financial Health Index
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 4: Safaricom Annual Reports ── */}
      {activeSource === "safaricom" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-yellow-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              التقارير السنوية لسفاريكوم — Safaricom PLC Annual Reports
              2007–2024
            </div>
            <div className="text-xs text-muted">
              بيانات المشتركين والإيرادات من التقارير السنوية الرسمية
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              M-PESA Active Subscribers — Kenya 2007–2024
            </h2>
            <p className="text-xs text-muted mb-4">
              نمو المشتركين النشطين | المصدر: Safaricom Annual Reports 2007–2024
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={safaricamSubscribers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  label={{
                    value: "M Users",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: 10,
                  }}
                />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="subscribers"
                  fill="#f59e0b"
                  name="Subscribers (M)"
                  radius={[2, 2, 0, 0]}
                  opacity={0.7}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: Safaricom PLC Annual Reports 2007–2024 | من 2M مشترك
              (2007) إلى 34M (2024)
            </p>
          </div>
          <div className="card overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-1">M-PESA Revenue — Confirmed Figures Only (KES Billions)</h2>
            <p className="text-xs text-muted mb-4">إيرادات M-PESA المؤكدة فقط | المصدر: Safaricom Annual Reports × Techweez</p>
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-theme">
                <tr>
                  <th className="text-left py-3 text-muted">Financial Year</th>
                  <th className="text-right py-3 text-muted">M-PESA Revenue (KES B)</th>
                  <th className="text-right py-3 text-muted">YoY Growth</th>
                  <th className="text-center py-3 text-muted">Status</th>
                  <th className="text-left py-3 pl-4 text-muted">Source</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fy: "FY2013 (Mar)", revenue: "21.84B", growth: "—", status: "✅", source: "Safaricom Annual Report 2013" },
                  { fy: "FY2022 (Mar)", revenue: "107.7B", growth: "—", status: "✅", source: "Safaricom FY2022 / Statista" },
                  { fy: "FY2024 (Mar)", revenue: "139.91B", growth: "+9.1%", status: "✅", source: "Safaricom FY2024 Annual Report" },
                  { fy: "FY2025 (Mar)", revenue: "161.1B", growth: "+15.1%", status: "✅", source: "Techweez / Safaricom FY2025" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-theme">
                    <td className="py-3 text-primary font-semibold">{row.fy}</td>
                    <td className="py-3 text-right font-bold text-yellow-500">KES {row.revenue}</td>
                    <td className="py-3 text-right text-green-500">{row.growth}</td>
                    <td className="py-3 text-center">{row.status}</td>
                    <td className="py-3 pl-4 text-muted">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 bg-secondary border border-theme rounded-lg p-3" dir="rtl">
              <p className="text-xs text-muted">ملاحظة: أرقام السنوات الأخرى غير متاحة من مصادر مفتوحة مؤكدة. الأرقام الأربعة فقط مؤكدة من التقارير الرسمية.</p>
              <p className="text-xs text-muted mt-1">Note: Revenue for other years not available from confirmed open sources. Only these 4 figures are verified from official reports.</p>
            </div>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">المصدر: Safaricom PLC Annual Reports | من KES 21.84B (FY2013) إلى KES 161.1B (FY2025)</p>
          </div>
        </div>
      )}

      {/* ── SOURCE 5: CBK Mobile Payments ── */}
      {activeSource === "cbk" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-red-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              إحصاءات المدفوعات عبر الهاتف — CBK Mobile Payment Statistics
            </div>
            <div className="text-xs text-muted">
              البنك المركزي الكيني — إحصاءات نظام المدفوعات الوطني 2007–2024
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Mobile Money Transaction Value — KES Trillions
            </h2>
            <p className="text-xs text-muted mb-4">
              قيمة معاملات النقود المتنقلة | المصدر: CBK Mobile Payment
              Statistics
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={cbkTransactions}>
                <defs>
                  <linearGradient id="gVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${v}T`} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v) => `KES ${v} Trillion`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  fill="url(#gVal)"
                  strokeWidth={2}
                  name="Value (KES T)"
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: CBK Mobile Payment Statistics | من KES 0.1T (2007) إلى KES
              8.69T (2024) — نمو 8,590%
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Transaction Volume (Millions) & Agent Network
            </h2>
            <p className="text-xs text-muted mb-4">
              حجم المعاملات وشبكة الوكلاء | المصدر: CBK Annual Reports
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={cbkTransactions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="volume"
                  fill="#3b82f6"
                  name="Transactions (M)"
                  radius={[2, 2, 0, 0]}
                  opacity={0.7}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="agents"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Agents (000s)"
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: CBK National Payments System Statistics 2007–2024
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              M-PESA as % of Kenya GDP
            </h2>
            <p className="text-xs text-muted mb-4">
              حجم معاملات M-PESA كنسبة من الناتج المحلي | المصدر: CBK × KNBS
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={knbsData}>
                <defs>
                  <linearGradient id="gGDP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 70]}
                />
                <Tooltip
                  formatter={(v) => `${v}% of GDP`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="gdpPct"
                  stroke="#f97316"
                  fill="url(#gGDP)"
                  strokeWidth={2}
                  name="M-PESA % of GDP"
                  dot={{ r: 4 }}
                />
                <ReferenceLine
                  y={50}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{ value: "50% GDP", fontSize: 10 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: CBK × KNBS | من 10% (2009) إلى 53% (2024) — أحد أعلى
              معدلات العالم
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 6: Safaricom FY Press Releases ── */}
      {activeSource === "fypress" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-pink-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              نشرات النتائج السنوية — Safaricom FY Press Releases 2020–2025
            </div>
            <div className="text-xs text-muted">
              مؤشرات M-PESA السنوية من نشرات الأداء المالي لسفاريكوم
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              M-PESA Annual Performance FY2020–FY2025
            </h2>
            <p className="text-xs text-muted mb-4">
              الأداء السنوي | المصدر: Safaricom FY Press Releases
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={safaricamFYMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="fy" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  fill="#ec4899"
                  name="Revenue (KES B)"
                  radius={[2, 2, 0, 0]}
                  opacity={0.8}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="YoY Growth %"
                  dot={{ r: 4 }}
                />
                <ReferenceLine yAxisId="right" y={0} stroke="#94a3b8" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {safaricamFYMetrics.map((d, i) => (
                <div
                  key={i}
                  className="bg-secondary border border-theme rounded-lg p-3 text-center"
                >
                  <div className="text-xs text-muted mb-1">{d.fy}</div>
                  <div className="text-lg font-bold text-primary">
                    KES {d.revenue}B
                  </div>
                  <div
                    className={`text-xs font-medium ${d.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {d.growth >= 0 ? "+" : ""}
                    {d.growth}% YoY
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3 text-right" dir="rtl">
              المصدر: Safaricom PLC FY Press Releases 2020–2025 | FY2020 تراجع
              بسبب جائحة كوفيد والمعاملات المجانية
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 7 & 8: Global Findex / World Bank ── */}
      {activeSource === "findex" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-teal-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              قاعدة بيانات Findex العالمية — Global Findex / World Bank
              2011–2021
            </div>
            <div className="text-xs text-muted">
              مسح عالمي كل 3 سنوات | البنك الدولي | 2011، 2014، 2017، 2021
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Kenya Account Ownership vs Global & Sub-Saharan Africa
            </h2>
            <p className="text-xs text-muted mb-4">
              كينيا مقارنة بأفريقيا جنوب الصحراء والعالم | المصدر: Global Findex
              2011–2021
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={findexKenya}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="kenya"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  name="Kenya %"
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="subSahara"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Sub-Saharan Africa %"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="global"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="Global %"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="mobileOnly"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="Kenya Mobile Money %"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: World Bank Global Findex 2011–2021 | كينيا تتجاوز المتوسط
              العالمي بفضل N-PESA
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Mobile Money Account Ownership — Africa Comparison 2021
            </h2>
            <p className="text-xs text-muted mb-4">
              امتلاك حسابات النقود المتنقلة — مقارنة أفريقية | المصدر: Findex
              2021
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={findexMobileMoney} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="country"
                  tick={{ fontSize: 11 }}
                  width={110}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="pct" radius={[0, 4, 4, 0]} name="Mobile Money %">
                  {findexMobileMoney.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.country === "Kenya"
                          ? "#14b8a6"
                          : d.country.includes("Avg") ||
                              d.country.includes("Dev")
                            ? "#94a3b8"
                            : "#3b82f6"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: World Bank Global Findex 2021 | كينيا الأولى أفريقياً في
              امتلاك حسابات النقود المتنقلة (79%)
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 9: CBK Agent Banking ── */}
      {activeSource === "agent" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-indigo-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              لوائح الصيرفة الوكيلة — CBK Agent Banking Guidelines 2010
            </div>
            <div className="text-xs text-muted">
              نمو شبكة الوكلاء منذ إصدار اللوائح حتى 2025
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Agent Network Growth with Regulatory Milestones
            </h2>
            <p className="text-xs text-muted mb-4">
              نمو شبكة الوكلاء مع المحطات التنظيمية | المصدر: CBK Annual Reports
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={agentMilestones}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${v}K`} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 11 }}
                  formatter={(v) => [`${(v * 1000).toLocaleString()} agents`]}
                  labelFormatter={(label) => {
                    const d = agentMilestones.find((x) => x.year === label);
                    return d ? `${label} — ${d.event}` : label;
                  }}
                />
                <Bar
                  dataKey="agents"
                  fill="#6366f1"
                  name="Active Agents (000s)"
                  radius={[2, 2, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {agentMilestones
                .filter((d) =>
                  [2010, 2011, 2013, 2022].includes(Number(d.year)),
                )
                .map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-secondary border border-theme rounded-lg p-3"
                    dir="rtl"
                  >
                    <span className="text-xs font-bold text-indigo-500 w-10">
                      {d.year}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-primary">
                        {d.event}
                      </div>
                      <div className="text-xs text-muted">
                        {d.agents.toFixed(0)} thousand agents at this milestone
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-xs text-muted mt-3 text-right" dir="rtl">
              المصدر: CBK Agent Banking Guidelines 2010 × CBK Annual Reports
              2007–2025 | 450 وكيل (2007) → 394,853 (2025)
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 10-12: Regulatory ── */}
      {activeSource === "regulatory" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-purple-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              الإطار التنظيمي — NPS Act, E-Money Regulations, DCP Regulations
            </div>
            <div className="text-xs text-muted">
              مسار التطور التشريعي لنظام المدفوعات الرقمية في كينيا 2007–2023
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Kenya Fintech Regulatory Timeline
            </h2>
            <p className="text-xs text-muted mb-4">
              المسار التنظيمي | المصدر: Gazette Kenya × CBK
            </p>
            <div className="relative" dir="rtl">
              <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-4 pr-12">
                {regulatoryMilestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div
                      className="absolute -right-[42px] w-4 h-4 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: m.color }}
                    />
                    <div className="bg-secondary border border-theme rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded font-bold text-white"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.year}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {m.event}
                        </span>
                      </div>
                      <p className="text-xs text-muted">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-secondary border border-theme rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-500">288</div>
                <div className="text-xs text-muted">Licensed DCP 2022</div>
              </div>
              <div className="bg-secondary border border-theme rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-500">52</div>
                <div className="text-xs text-muted">Active DCP 2024</div>
              </div>
              <div className="bg-secondary border border-theme rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-500">28.9%</div>
                <div className="text-xs text-muted">Hustler Fund Users</div>
              </div>
            </div>
            <p className="text-xs text-muted mt-3 text-right" dir="rtl">
              المصدر: Kenya Gazette × CBK × National Payment System Act 2011 ×
              DCP Regulations 2022
            </p>
          </div>
        </div>
      )}

      {/* ── SOURCE 13: KNBS ── */}
      {activeSource === "knbs" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-orange-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              المسح الاقتصادي الكيني — KNBS Economic Survey 2009–2025
            </div>
            <div className="text-xs text-muted">
              بيانات الاشتراكات وحجم المعاملات من المكتب الوطني للإحصاء
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              M-PESA Transactions as % of Kenya GDP
            </h2>
            <p className="text-xs text-muted mb-4">
              معاملات M-PESA كنسبة من الناتج المحلي | المصدر: KNBS Economic
              Survey
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={knbsData}>
                <defs>
                  <linearGradient id="gKNBS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 70]}
                />
                <Tooltip
                  formatter={(v) => `${v}% of GDP`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="gdpPct"
                  stroke="#f97316"
                  fill="url(#gKNBS)"
                  strokeWidth={2}
                  name="M-PESA % of GDP"
                  dot={{ r: 4 }}
                />
                <ReferenceLine
                  y={50}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{ value: "50%", fontSize: 10 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: KNBS Economic Survey | من 10% (2009) إلى 53% (2024) — أحد
              أعلى معدلات الاختراق في العالم
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Mobile Subscriptions & P2P Transfer Value
            </h2>
            <p className="text-xs text-muted mb-4">
              الاشتراكات وقيمة التحويلات الشخصية | المصدر: KNBS Economic Survey
              2025
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={knbsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  label={{
                    value: "M Users",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: 10,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${v}T`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="subscriptions"
                  fill="#f97316"
                  name="Subscriptions (M)"
                  radius={[2, 2, 0, 0]}
                  opacity={0.7}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="p2pValue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="P2P Value (KES T)"
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: KNBS Economic Survey 2025 | اشتراكات ارتفعت 21.4% إلى
              51.4M في 2025 | P2P: KES 8.66T (2025)
            </p>
          </div>
        </div>
      )}

      {/* ── Muslim Counties & Gender ── */}
      {activeSource === "counties" && (
        <div className="space-y-6">
          <div
            className="border-r-4 border-cyan-500 pr-4 bg-secondary border border-theme rounded-lg p-3"
            dir="rtl"
          >
            <div className="text-sm font-semibold text-primary">
              المحافظات ذات الأغلبية المسلمة والفجوة الجندرية
            </div>
            <div className="text-xs text-muted">
              بيانات محورية لرسالة الماجستير | المصدر: FinAccess 2021 & 2024
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Muslim-Majority Counties vs National Average
            </h2>
            <p className="text-xs text-muted mb-4">
              المحافظات ذات الأغلبية المسلمة | المصدر: FinAccess 2021 & 2024
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={muslimCounties} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                  domain={[0, 100]}
                />
                <YAxis
                  type="category"
                  dataKey="county"
                  tick={{ fontSize: 11 }}
                  width={90}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="yr2021"
                  fill="#8b5cf6"
                  name="2021 %"
                  radius={[0, 3, 3, 0]}
                />
                <Bar
                  dataKey="yr2024"
                  fill="#06b6d4"
                  name="2024 %"
                  radius={[0, 3, 3, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              غريسة: قفزة 26.3% (60.8% → 87.1%) | وجير وماندرا تتخطيان المتوسط
              الوطني | المصدر: FinAccess 2024
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              Urban vs Rural Financial Inclusion 2006–2024
            </h2>
            <p className="text-xs text-muted mb-4">
              الحضر مقابل الريف | المصدر: FinAccess 2006–2024
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={urbanRural}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v) => `${v}%`}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="urban"
                  fill="#3b82f6"
                  name="Urban %"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="rural"
                  fill="#10b981"
                  name="Rural %"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">
              المصدر: FinAccess | 45.5% من المُقصَين ماليًا شباب ريفيون | العائق
              الأول: غياب الهاتف المحمول أو بطاقة الهوية
            </p>
          </div>
        </div>
      )}

      {/* ── M-PESA SERVICES ── */}
      {activeSource === "mpesa_services" && (
        <div className="space-y-6">
          <div className="border-r-4 border-green-500 pr-4 bg-secondary border border-theme rounded-lg p-3" dir="rtl">
            <div className="text-sm font-semibold text-primary">خدمات M-PESA الرئيسية — M-PESA Key Services</div>
            <div className="text-xs text-muted">المصدر: Safaricom Annual Reports × FY Press Releases × FinAccess 2024</div>
          </div>

          {/* Services overview cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Active Users Kenya", value: "34M", sub: "مستخدم نشط", color: "text-green-500" },
              { name: "Registered Accounts", value: "82.4M", sub: "حساب مسجّل", color: "text-blue-500" },
              { name: "Active Agents", value: "381K", sub: "وكيل نشط 2024", color: "text-purple-500" },
              { name: "Market Share", value: "91%", sub: "حصة السوق 2024", color: "text-yellow-500" },
              { name: "Annual Transactions", value: "KES 8.69T", sub: "قيمة المعاملات 2024", color: "text-red-500" },
              { name: "Merchant Partners", value: "1.5M+", sub: "شريك تجاري", color: "text-teal-500" },
              { name: "Payments Per Capita", value: "527/yr", sub: "معاملة سنوياً لكل فرد", color: "text-orange-500" },
              { name: "Annual Revenue FY2025", value: "KES 161B", sub: "إيرادات سفاريكوم", color: "text-pink-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-secondary border border-theme rounded-lg p-3 text-center">
                <div className={`text-xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-primary font-medium">{stat.name}</div>
                <div className="text-xs text-muted" dir="rtl">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Services breakdown table */}
          <div className="card overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-1">M-PESA Services — Features & Statistics</h2>
            <p className="text-xs text-muted mb-4">خدمات M-PESA الرئيسية | المصدر: Safaricom Annual Reports & FY Press Releases</p>
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-theme">
                <tr>
                  <th className="text-left py-3 pr-4 text-muted">Service / الخدمة</th>
                  <th className="text-left py-3 text-muted">Launch / الإطلاق</th>
                  <th className="text-left py-3 text-muted">Category / النوع</th>
                  <th className="text-right py-3 text-muted">Key Metric</th>
                  <th className="text-center py-3 text-muted">Shariah</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Send Money (P2P)", ar: "تحويل الأموال", launch: "2007", cat: "Payments", metric: "KES 6.81T P2P (2024)", shariah: "✅" },
                  { name: "Lipa Na M-PESA (Buy Goods)", ar: "الدفع للتجار", launch: "2012", cat: "Merchant Payments", metric: "633K+ merchants (2024)", shariah: "✅" },
                  { name: "Paybill", ar: "دفع الفواتير", launch: "2013", cat: "Bill Payments", metric: "Govt, utilities, schools", shariah: "✅" },
                  { name: "M-Shwari", ar: "ادخار وإقراض", launch: "Nov 2012", cat: "Savings & Credit", metric: "KES 102.4B disbursed (2024)", shariah: "❌" },
                  { name: "KCB M-PESA", ar: "قروض KCB", launch: "2015", cat: "Digital Loans", metric: "Up to KES 1M loans", shariah: "❌" },
                  { name: "Fuliza", ar: "السحب على المكشوف", launch: "Jan 2019", cat: "Overdraft Credit", metric: "KES 906.4B (2024) | 18.4% users", shariah: "❌" },
                  { name: "M-PESA Global", ar: "تحويلات دولية", launch: "2010+", cat: "International Remittances", metric: "200+ countries | +17% YoY", shariah: "✅" },
                  { name: "M-Akiba", ar: "سندات الخزينة", launch: "2017", cat: "Government Bonds", metric: "Min KES 3,000 investment", shariah: "❌" },
                  { name: "M-PESA Go", ar: "خدمة الشباب", launch: "2022", cat: "Youth Finance (10-17 yrs)", metric: "Financial inclusion for youth", shariah: "✅" },
                  { name: "Ratiba", ar: "أوامر الدفع الدورية", launch: "Oct 2024", cat: "Standing Orders", metric: "1M opt-ins in first month", shariah: "✅" },
                  { name: "Ziidi MMF", ar: "صندوق نقدي", launch: "Nov 2024", cat: "Money Market Fund", metric: "CMA approved (2024)", shariah: "⚠️" },
                  { name: "M-PESA Visa Virtual Card", ar: "بطاقة فيزا", launch: "2022", cat: "Global Payments", metric: "200+ countries via Visa", shariah: "⚠️" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-theme">
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-primary">{row.name}</div>
                      <div className="text-xs text-muted" dir="rtl">{row.ar}</div>
                    </td>
                    <td className="py-3 text-muted">{row.launch}</td>
                    <td className="py-3 text-muted">{row.cat}</td>
                    <td className="py-3 text-right font-medium text-primary">{row.metric}</td>
                    <td className="py-3 text-center text-lg">{row.shariah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-muted mt-2">✅ Shariah Compliant | ❌ Non-Compliant (interest-based) | ⚠️ Requires further Shariah review</p>
            <p className="text-xs text-muted mt-1">Source: Safaricom Annual Reports 2007–2024 × Safaricom M-PESA Journey × FinAccess 2024</p>
          </div>

          {/* Fuliza & M-Shwari - NCBA ecosystem */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">NCBA Digital Ecosystem — Credit Products 2024</h2>
            <p className="text-xs text-muted mb-4">منظومة NCBA الرقمية | المصدر: NCBA FY2024 Annual Report</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[
                { product: "Fuliza", value: 906.4, color: "#ef4444" },
                { product: "M-Shwari", value: 102.4, color: "#f59e0b" },
                { product: "Loop", value: 2.5, color: "#8b5cf6" },
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={v => `${v}B`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="product" tick={{ fontSize: 12 }} width={80} />
                <Tooltip formatter={v => `KES ${v}B`} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" radius={[0,4,4,0]} name="KES Billions Disbursed">
                  {[{color:"#ef4444"},{color:"#f59e0b"},{color:"#8b5cf6"}].map((d,i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 bg-secondary border border-theme rounded-lg p-3" dir="rtl">
              <p className="text-xs text-muted">إجمالي المنظومة الرقمية لـ NCBA في 2024: KES 1.049 تريليون شلن | Fuliza وحدها تمثّل 86.4% من الإجمالي</p>
              <p className="text-xs text-red-500 mt-1">⚠️ تحذير شرعي: Fuliza وM-Shwari يتضمنان فوائد ربوية — غير متوافقان مع معايير AAOIFI</p>
            </div>
            <p className="text-xs text-muted mt-2">Source: NCBA Group Annual Report 2024 × Techweez Kenya 2025</p>
          </div>
        </div>
      )}

      {/* ── KENYA FINTECH FIELDS ── */}
      {activeSource === "fintech_fields" && (
        <div className="space-y-6">
          <div className="border-r-4 border-rose-500 pr-4 bg-secondary border border-theme rounded-lg p-3" dir="rtl">
            <div className="text-sm font-semibold text-primary">مجالات التقنية المالية الراهنة في كينيا — Kenya Fintech Fields 2024</div>
            <div className="text-xs text-muted">المصدر: FinAccess 2024 × CBK × Chambers Global × SDK Finance 2026</div>
          </div>

          {/* Fintech fields by population usage */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">Fintech Fields by Population Usage — Kenya 2024</h2>
            <p className="text-xs text-muted mb-4">مجالات التقنية المالية حسب نسبة الاستخدام | المصدر: FinAccess 2024 × CBK</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={[
                { field: "Mobile Money", ar: "النقود المتنقلة", pct: 82.3, color: "#10b981" },
                { field: "Banks", ar: "البنوك", pct: 52.5, color: "#3b82f6" },
                { field: "Hustler Fund", ar: "صندوق هاستلر", pct: 28.9, color: "#f59e0b" },
                { field: "SACCOs", ar: "السلع التعاونية", pct: 9.1, color: "#8b5cf6" },
                { field: "Insurance", ar: "التأمين", pct: 22.0, color: "#06b6d4" },
                { field: "Fuliza Overdraft", ar: "فوليزا", pct: 18.4, color: "#ef4444" },
                { field: "Digital Lenders", ar: "الإقراض الرقمي", pct: 8.2, color: "#f97316" },
                { field: "Pensions/NSSF", ar: "المعاشات", pct: 20.4, color: "#6366f1" },
              ]} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="field" tick={{ fontSize: 11 }} width={110} />
                <Tooltip formatter={v => `${v}%`} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="pct" radius={[0,4,4,0]} name="% of Adults">
                  {["#10b981","#3b82f6","#f59e0b","#8b5cf6","#06b6d4","#ef4444","#f97316","#6366f1"].map((c,i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2">Source: FSD Kenya FinAccess 2024 Spotlight | Mobile money dominates at 82.3% — highest in Africa</p>
          </div>

          {/* Fintech fields table */}
          <div className="card overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-1">Kenya Fintech Landscape — 8 Key Fields</h2>
            <p className="text-xs text-muted mb-4">ثمانية مجالات رئيسية للتقنية المالية في كينيا | المصدر: CBK × FinAccess × Chambers 2025</p>
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-theme">
                <tr>
                  <th className="text-left py-3 pr-4 text-muted">Field / المجال</th>
                  <th className="text-left py-3 text-muted">Key Players</th>
                  <th className="text-right py-3 text-muted">Market Data</th>
                  <th className="text-left py-3 pl-4 text-muted">Regulator</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { field: "Mobile Payments المدفوعات", players: "M-PESA (91%), Airtel Money (9%)", data: "KES 8.69T value (2024)", reg: "CBK" },
                  { field: "Digital Lending الإقراض الرقمي", players: "Fuliza, Tala, Branch, Hustler Fund", data: "85 licensed DCPs (2024)", reg: "CBK (DCP Regs 2022)" },
                  { field: "Digital Savings الادخار الرقمي", players: "M-Shwari, KCB M-PESA, Loop", data: "KES 1.049T ecosystem (NCBA)", reg: "CBK" },
                  { field: "Agent Banking الصيرفة الوكيلة", players: "All commercial banks + M-PESA", data: "381,116 agents (Dec 2024)", reg: "CBK (2010 Guidelines)" },
                  { field: "Digital Insurance التأمين الرقمي", players: "M-Tiba, Bima, NHIF digital", data: "22% of adults (FinAccess 2024)", reg: "IRA" },
                  { field: "AgriFintech التقنية الزراعية", players: "DigiFarm (Safaricom), Apollo", data: "33% of GDP from agriculture", reg: "CBK + AFA" },
                  { field: "Investment & WealthTech الاستثمار", players: "M-Akiba, DhowCSD, Ziidi MMF", data: "Min KES 3,000 (M-Akiba)", reg: "CMA" },
                  { field: "Cross-border Remittances الحوالات", players: "M-PESA Global, WorldRemit, Western Union", data: "200+ countries | +17% YoY", reg: "CBK" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-theme">
                    <td className="py-3 pr-4 font-semibold text-primary" dir="rtl">{row.field}</td>
                    <td className="py-3 text-muted">{row.players}</td>
                    <td className="py-3 text-right font-medium text-primary">{row.data}</td>
                    <td className="py-3 pl-4 text-muted">{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-muted mt-2">Source: CBK Annual Report 2024 × FinAccess 2024 × Chambers Global Fintech Kenya 2025 × SDK Finance 2026</p>
          </div>
        </div>
      )}

      {/* ── FINANCIAL INCLUSION SUMMARY ── */}
      {activeSource === "fi_summary" && (
        <div className="space-y-6">
          <div className="border-r-4 border-sky-500 pr-4 bg-secondary border border-theme rounded-lg p-3" dir="rtl">
            <div className="text-sm font-semibold text-primary">ملخص إحصاءات الإدماج المالي في كينيا — Kenya Financial Inclusion Summary</div>
            <div className="text-xs text-muted">بيانات شاملة من جميع المصادر | FinAccess × CBK × Global Findex × KNBS</div>
          </div>

          {/* Global ranking */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">Kenya's Global & African Standing</h2>
            <p className="text-xs text-muted mb-4">مكانة كينيا عالمياً وأفريقياً في الإدماج المالي | المصدر: Global Findex 2021 × CBK × SDK Finance</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {[
                { rank: "#1", label: "Africa Mobile Money Penetration", ar: "الأولى أفريقياً في النقود المتنقلة", color: "text-green-500", bg: "bg-green-50 border-green-200" },
                { rank: "#3", label: "Africa Fintech Hub (behind Nigeria, SA)", ar: "ثالث أكبر سوق تقني مالي في أفريقيا", color: "text-blue-500", bg: "bg-blue-50 border-blue-200" },
                { rank: "527", label: "Annual payments per capita (vs India 119)", ar: "معاملة سنوياً لكل فرد", color: "text-purple-500", bg: "bg-purple-50 border-purple-200" },
                { rank: "84.8%", label: "Formal Inclusion 2024 (FinAccess)", ar: "الإدماج المالي الرسمي 2024", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
                { rank: "82.3%", label: "Mobile Money Penetration (highest in Africa)", ar: "انتشار النقود المتنقلة", color: "text-teal-500", bg: "bg-teal-50 border-teal-200" },
                { rank: "$482M", label: "VC Funding Q1 2024 alone", ar: "تمويل رأس المال الجريء ق1 2024", color: "text-red-500", bg: "bg-red-50 border-red-200" },
              ].map((s, i) => (
                <div key={i} className={`rounded-lg p-3 border text-center bg-secondary border-theme`}>
                  <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.rank}</div>
                  <div className="text-xs text-primary font-medium">{s.label}</div>
                  <div className="text-xs text-muted mt-0.5" dir="rtl">{s.ar}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { country: "Kenya", pct: 84.8, mobile: 82.3 },
                { country: "South Africa", pct: 85.0, mobile: 20.0 },
                { country: "Ghana", pct: 68.0, mobile: 46.0 },
                { country: "Uganda", pct: 58.0, mobile: 45.0 },
                { country: "Tanzania", pct: 52.0, mobile: 45.0 },
                { country: "Sub-Saharan Avg", pct: 49.0, mobile: 33.0 },
                { country: "Nigeria", pct: 45.0, mobile: 10.0 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="country" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip formatter={v => `${v}%`} contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="pct" fill="#0ea5e9" name="Total Inclusion %" radius={[3,3,0,0]} />
                <Bar dataKey="mobile" fill="#10b981" name="Mobile Money %" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2">Source: Global Findex 2021 × FinAccess 2024 | Kenya leads Africa in mobile money penetration</p>
          </div>

          {/* Comprehensive stats table */}
          <div className="card overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-1">Comprehensive Financial Inclusion Statistics — Kenya 2024</h2>
            <p className="text-xs text-muted mb-4">جدول إحصاءات الإدماج المالي الشامل | المصدر: FinAccess 2024 × CBK × KNBS × Global Findex</p>
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-theme">
                <tr>
                  <th className="text-left py-2 pr-4 text-muted">Category / الفئة</th>
                  <th className="text-center py-2 text-muted">2006</th>
                  <th className="text-center py-2 text-muted">2016</th>
                  <th className="text-center py-2 text-muted">2021</th>
                  <th className="text-center py-2 text-muted">2024</th>
                  <th className="text-center py-2 text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Formal Inclusion الإدماج الرسمي", v06: "26.7%", v16: "66.7%", v21: "83.7%", v24: "84.8%", st: "✅" },
                  { cat: "Excluded المستبعدون", v06: "41.3%", v16: "15.9%", v21: "11.6%", v24: "9.9%", st: "✅" },
                  { cat: "Mobile Money النقود المتنقلة", v06: "0%", v16: "71.4%", v21: "81.4%", v24: "82.3%", st: "✅" },
                  { cat: "Bank Access البنوك", v06: "14.0%", v16: "42.3%", v21: "46.3%", v24: "52.5%", st: "✅" },
                  { cat: "Male Inclusion الذكور", v06: "33.2%", v16: "79.7%", v21: "85.9%", v24: "85.7%", st: "✅" },
                  { cat: "Female Inclusion الإناث", v06: "20.5%", v16: "71.2%", v21: "81.7%", v24: "84.1%", st: "✅" },
                  { cat: "Gender Gap الفجوة الجندرية", v06: "12.7%", v16: "8.5%", v21: "4.2%", v24: "1.6%", st: "✅" },
                  { cat: "Urban الحضر", v06: "35.5%", v16: "79.8%", v21: "90.0%", v24: "91.3%", st: "✅" },
                  { cat: "Rural الريف", v06: "23.8%", v16: "59.1%", v21: "79.8%", v24: "80.2%", st: "✅" },
                  { cat: "Credit Uptake الائتمان", v06: "—", v16: "—", v21: "51.0%", v24: "64.0%", st: "✅" },
                  { cat: "Savers المدخرون", v06: "—", v16: "—", v21: "70.7%", v24: "68.1%", st: "✅" },
                  { cat: "Financially Healthy صحة مالية", v06: "—", v16: "39.4%", v21: "17.1%", v24: "18.3%", st: "✅" },
                  { cat: "Insurance التأمين", v06: "4.9%", v16: "—", v21: "18.9%", v24: "22.0%", st: "✅" },
                  { cat: "PWD ذوو الإعاقة", v06: "—", v16: "—", v21: "—", v24: "77.9%", st: "✅" },
                  { cat: "Daily Mobile Money يومياً", v06: "—", v16: "—", v21: "23.6%", v24: "52.6%", st: "✅" },
                  { cat: "Loan Default التعثر", v06: "—", v16: "—", v21: "10.7%", v24: "16.6%", st: "✅" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-theme">
                    <td className="py-2 pr-4 text-primary font-medium" dir="rtl">{row.cat}</td>
                    <td className="py-2 text-center text-muted">{row.v06}</td>
                    <td className="py-2 text-center text-muted">{row.v16}</td>
                    <td className="py-2 text-center text-muted">{row.v21}</td>
                    <td className="py-2 text-center font-bold text-primary">{row.v24}</td>
                    <td className="py-2 text-center">{row.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-muted mt-2">✅ All figures confirmed from primary sources | Source: FinAccess 2006–2024 | CBK × KNBS × FSD Kenya</p>
          </div>

          {/* Per capita payments comparison */}
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">Annual Payments Per Capita — International Comparison</h2>
            <p className="text-xs text-muted mb-4">المدفوعات السنوية للفرد — مقارنة دولية | المصدر: Cash Payment News / Safaricom FY2024</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[
                { country: "Kenya 🇰🇪", payments: 527 },
                { country: "Thailand 🇹🇭", payments: 355 },
                { country: "Brazil 🇧🇷", payments: 266 },
                { country: "India 🇮🇳", payments: 119 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="country" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="payments" name="Payments per capita/year" radius={[4,4,0,0]}>
                  {["#10b981","#3b82f6","#f59e0b","#8b5cf6"].map((c,i) => <Cell key={i} fill={c} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted mt-2 text-right" dir="rtl">كينيا الأولى عالمياً بـ 527 معاملة سنوية للفرد — أعلى من تايلاند (355) والبرازيل (266) والهند (119)</p>
            <p className="text-xs text-muted">Source: Cash Payment News "M-Pesa: Showing the Way at 18" April 2025 | Safaricom FY2024 Annual Report</p>
          </div>
        </div>
      )}

    </div>
  );
}
