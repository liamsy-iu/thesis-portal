"use client";
import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// ── AAOIFI Shariah Scoring Data ──────────────────────────────────
const mpesaProducts = [
  {
    id: "mpesa_basic",
    name: "M-PESA Basic",
    nameAr: "M-PESA Basic الأساسية",
    type: "Payments",
    typeAr: "مدفوعات",
    description: "Core money transfer and payment service",
    descriptionAr: "خدمة تحويل الأموال والمدفوعات الأساسية",
    scores: {
      riba: 95,        // No interest involved
      gharar: 90,      // Clear fees, transparent
      maysir: 100,     // No gambling element
      halal_activity: 90, // General purpose
      asset_backing: 70,  // E-money backed by deposits
    },
    notes: "الخدمة الأساسية لا تتضمن ربا أو غررًا ظاهرًا. الرسوم محددة ومعلومة مسبقًا.",
    notesEn: "Core service involves no riba or obvious gharar. Fees are fixed and transparent.",
    compliant: true,
    scholars: "AAOIFI Standard 38 — Electronic Payments"
  },
  {
    id: "mshwari",
    name: "M-Shwari",
    nameAr: "M-Shwari — Savings & Credit",
    type: "Savings & Credit",
    typeAr: "ادخار وائتمان",
    description: "Mobile savings and loan product by NCBA & Safaricom",
    descriptionAr: "منتج ادخار وإقراض رقمي — NCBA وسفاريكوم",
    scores: {
      riba: 20,        // Interest-based loans
      gharar: 60,      // Some terms unclear to users
      maysir: 90,      // No gambling
      halal_activity: 85,
      asset_backing: 65,
    },
    notes: "يتضمن فوائد ربوية على القروض. رسوم القرض الشهرية (7.5%) تُعدّ فائدة محظورة شرعًا.",
    notesEn: "Contains riba-based loan interest. Monthly facility fee (7.5%) constitutes prohibited interest.",
    compliant: false,
    scholars: "AAOIFI Standard 2 — Murabaha; Standard 19 — Qard"
  },
  {
    id: "fuliza",
    name: "Fuliza",
    nameAr: "Fuliza فوليزا — Overdraft",
    type: "Overdraft Credit",
    typeAr: "ائتمان تلقائي",
    description: "Automatic overdraft facility when M-PESA balance is low",
    descriptionAr: "تسهيل السحب على المكشوف التلقائي عند نقص الرصيد",
    scores: {
      riba: 10,        // Daily interest charges
      gharar: 40,      // Auto-enrollment, unclear to many users
      maysir: 85,
      halal_activity: 80,
      asset_backing: 50,
    },
    notes: "الأكثر إشكالية من الناحية الشرعية — رسوم يومية على المبلغ المستخدم تُعدّ ربا صريحًا. التسجيل التلقائي يثير إشكالية الغرر.",
    notesEn: "Most problematic — daily fees on amount used constitute explicit riba. Auto-enrollment raises gharar concerns.",
    compliant: false,
    scholars: "AAOIFI Standard 2 — Murabaha; Standard 19 — Qard"
  },
  {
    id: "kcb_mpesa",
    name: "KCB M-PESA",
    nameAr: "KCB M-PESA — Digital Loans",
    type: "Digital Loans",
    typeAr: "قروض رقمية",
    description: "Larger digital loans via KCB Bank & Safaricom",
    descriptionAr: "قروض رقمية أكبر — بنك KCB وسفاريكوم",
    scores: {
      riba: 15,
      gharar: 65,
      maysir: 90,
      halal_activity: 80,
      asset_backing: 70,
    },
    notes: "قروض بفائدة تقليدية. رغم توفر فترات سداد أطول، فإن الفائدة المُركّبة تجعله غير متوافق شرعًا.",
    notesEn: "Traditional interest-bearing loans. Despite longer repayment periods, compound interest makes it non-compliant.",
    compliant: false,
    scholars: "AAOIFI Standard 19 — Qard; Standard 21 — Financial Paper"
  },
  {
    id: "maktaba",
    name: "M-Akiba",
    nameAr: "M-Akiba — Treasury Bonds",
    type: "Government Bonds",
    typeAr: "سندات حكومية",
    description: "Mobile government treasury bonds via M-PESA",
    descriptionAr: "سندات الخزينة الحكومية عبر M-PESA",
    scores: {
      riba: 25,        // Interest-bearing bonds
      gharar: 75,
      maysir: 95,
      halal_activity: 70,
      asset_backing: 85,
    },
    notes: "سندات حكومية تقليدية تحمل فائدة ثابتة — غير متوافقة شرعًا. البديل الإسلامي هو الصكوك الحكومية.",
    notesEn: "Traditional fixed-interest government bonds — not Shariah compliant. Islamic alternative would be sovereign sukuk.",
    compliant: false,
    scholars: "AAOIFI Standard 17 — Investment Sukuk"
  },
  {
    id: "mpesa_savings",
    name: "M-PESA Savings",
    nameAr: "M-PESA Savings ادخار",
    type: "Savings",
    typeAr: "ادخار",
    description: "Basic savings wallet within M-PESA ecosystem",
    descriptionAr: "محفظة ادخار بسيطة داخل منظومة M-PESA",
    scores: {
      riba: 85,
      gharar: 85,
      maysir: 100,
      halal_activity: 90,
      asset_backing: 80,
    },
    notes: "الادخار البسيط دون فائدة متوافق شرعًا. الإشكالية في أن الأموال المودعة قد تُستثمر في أصول غير متوافقة.",
    notesEn: "Simple non-interest savings are Shariah compliant. Concern is that deposited funds may be invested in non-compliant assets.",
    compliant: true,
    scholars: "AAOIFI Standard 1 — Trading in Currencies; Standard 19 — Qard"
  },
  {
    id: "tala",
    name: "Tala",
    nameAr: "Tala تالا — Digital Lending",
    type: "Digital Lending",
    typeAr: "إقراض رقمي",
    description: "App-based digital loans using phone data scoring",
    descriptionAr: "قروض رقمية تعتمد على تحليل بيانات الهاتف",
    scores: { riba: 15, gharar: 50, maysir: 90, halal_activity: 80, asset_backing: 45 },
    notes: "تفرض فوائد مرتفعة على القروض القصيرة الأجل (11-15% شهريًا). استخدام بيانات الهاتف دون موافقة صريحة يثير إشكالية الغرر.",
    notesEn: "Charges high interest on short-term loans (11-15% monthly). Use of phone data without explicit consent raises gharar concerns.",
    compliant: false,
    scholars: "AAOIFI Standard 19 — Qard; Standard 2 — Murabaha"
  },
  {
    id: "branch",
    name: "Branch",
    nameAr: "Branch برانش — Digital Lending",
    type: "Digital Lending",
    typeAr: "إقراض رقمي",
    description: "Mobile lending platform with credit scoring algorithm",
    descriptionAr: "منصة إقراض رقمي بخوارزمية تقييم ائتماني",
    scores: { riba: 15, gharar: 55, maysir: 90, halal_activity: 80, asset_backing: 50 },
    notes: "نموذج مشابه لتالا — قروض بفائدة مرتفعة. الخوارزمية المبهمة في تقييم الجدارة الائتمانية تُعدّ غررًا.",
    notesEn: "Similar model to Tala — high-interest loans. Opaque credit scoring algorithm constitutes gharar.",
    compliant: false,
    scholars: "AAOIFI Standard 19 — Qard; Standard 2 — Murabaha"
  },
  {
    id: "mtiba",
    name: "M-Tiba",
    nameAr: "M-Tiba — Health Savings",
    type: "Digital Insurance",
    typeAr: "تأمين رقمي",
    description: "Mobile health savings wallet — PharmAccess & Safaricom",
    descriptionAr: "محفظة ادخار صحية رقمية — PharmAccess وسفاريكوم",
    scores: { riba: 75, gharar: 60, maysir: 55, halal_activity: 85, asset_backing: 70 },
    notes: "الجزء الادخاري متوافق نسبيًا. لكن إذا تضمّن عنصر تأمين تقليدي فهو إشكالي. البديل: التكافل الصحي.",
    notesEn: "Savings component is relatively compliant. If it includes conventional insurance elements it becomes problematic. Alternative: health takaful.",
    compliant: false,
    scholars: "AAOIFI Standard 26 — Takaful; Standard 41 — Health Takaful"
  },
  {
    id: "bima",
    name: "Bima",
    nameAr: "Bima بيما — Insurance",
    type: "Digital Insurance",
    typeAr: "تأمين رقمي",
    description: "Mobile life and health insurance platform",
    descriptionAr: "منصة تأمين على الحياة والصحة عبر الهاتف",
    scores: { riba: 60, gharar: 30, maysir: 35, halal_activity: 75, asset_backing: 65 },
    notes: "التأمين التقليدي يتضمن غررًا وميسرًا في جوهره وفق الفقه الإسلامي. البديل الشرعي: التكافل (AAOIFI معيار 26).",
    notesEn: "Conventional insurance inherently contains gharar and maysir. Shariah alternative: Takaful (AAOIFI Standard 26).",
    compliant: false,
    scholars: "AAOIFI Standard 26 — Takaful Insurance"
  },
  {
    id: "digifarm",
    name: "DigiFarm",
    nameAr: "DigiFarm ديجي فارم — AgriFintech",
    type: "Agricultural Fintech",
    typeAr: "تقنية مالية زراعية",
    description: "Integrated agricultural platform — inputs, credit, insurance via M-PESA",
    descriptionAr: "منصة زراعية متكاملة — مستلزمات وائتمان وتأمين عبر M-PESA",
    scores: { riba: 55, gharar: 60, maysir: 70, halal_activity: 90, asset_backing: 80 },
    notes: "النشاط الزراعي حلال. الإشكالية في مكوّن التمويل إذا تضمّن فائدة. البديل: سلم أو استصناع للتمويل، وتكافل للتأمين.",
    notesEn: "Agricultural activity is halal. Issue lies in financing if interest-based. Alternatives: salam or istisna for financing, takaful for insurance.",
    compliant: false,
    scholars: "AAOIFI Standard 7 — Salam; Standard 11 — Istisna; Standard 26 — Takaful"
  },
  {
    id: "mpesa_global",
    name: "M-PESA Global",
    nameAr: "M-PESA Global العالمية — Remittances",
    type: "Cross-border Remittances",
    typeAr: "حوالات عبر الحدود",
    description: "International money transfer via M-PESA — 12 countries",
    descriptionAr: "تحويل الأموال الدولي عبر M-PESA — 12 دولة",
    scores: { riba: 85, gharar: 80, maysir: 100, halal_activity: 95, asset_backing: 75 },
    notes: "الحوالات المالية عبر الحدود مباحة شرعًا وفق عقد الحوالة أو الوكالة. الرسوم الثابتة المعلنة مسبقًا متوافقة.",
    notesEn: "Cross-border remittances are permissible under hawala or wakala contracts. Fixed pre-disclosed fees are compliant.",
    compliant: true,
    scholars: "AAOIFI Standard 1 — Trading in Currencies; Standard 23 — Agency/Wakala"
  },
  {
    id: "hustler_fund",
    name: "Hustler Fund",
    nameAr: "Hustler Fund صندوق هاستلر — Gov. Credit",
    type: "Government Digital Credit",
    typeAr: "ائتمان حكومي رقمي",
    description: "Government financial inclusion fund — digital loans via M-PESA",
    descriptionAr: "صندوق الشمول المالي الحكومي — قروض رقمية عبر M-PESA",
    scores: { riba: 40, gharar: 65, maysir: 90, halal_activity: 85, asset_backing: 60 },
    notes: "الصندوق يفرض فائدة منخفضة نسبيًا (8% سنويًا). رغم الهدف الاجتماعي النبيل، فإن الفائدة تجعله غير متوافق شرعًا. البديل: صندوق قرض حسن حكومي.",
    notesEn: "Fund charges relatively low interest (8% annually). Despite noble financial inclusion goal, interest makes it non-compliant. Alternative: government qard hasan fund.",
    compliant: false,
    scholars: "AAOIFI Standard 19 — Qard; Standard 21 — Financial Paper"
  },
];

const criteriaLabels = {
  riba: { ar: "خلوّ من الربا / Free of Riba", en: "Free of Riba" },
  gharar: { ar: "خلوّ من الغرر / Free of Gharar", en: "Free of Gharar" },
  maysir: { ar: "خلوّ من الميسر / Free of Maysir", en: "Free of Maysir" },
  halal_activity: { ar: "نشاط حلال / Halal Activity", en: "Halal Activity" },
  asset_backing: { ar: "دعم الأصول / Asset Backing", en: "Asset Backing" },
};

const overallComplianceData = mpesaProducts.map(p => ({
  name: p.nameAr,
  nameEn: p.name,
  score: Math.round(Object.values(p.scores).reduce((a, b) => a + b, 0) / Object.keys(p.scores).length),
  compliant: p.compliant,
}));

export default function ShariahPage() {
  const [selectedProduct, setSelectedProduct] = useState(mpesaProducts[0]);
  const [activeView, setActiveView] = useState("overview");

  const radarData = Object.entries(selectedProduct.scores).map(([key, value]) => ({
    criterion: criteriaLabels[key].ar.split(' / ')[1] || criteriaLabels[key].en,
    criterionEn: criteriaLabels[key].en,
    score: value,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Shariah Compatibility Analysis
        </h1>
        <p className="text-sm text-muted" dir="rtl">
          تحليل التوافق الشرعي لمنتجات M-PESA وفق معايير AAOIFI
        </p>
      </div>

      {/* AAOIFI Standard Note */}
      <div className="bg-secondary border-r-4 border-accent border border-theme rounded-lg p-4" dir="rtl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">
              معيار التقييم: AAOIFI — هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية
            </h3>
            <p className="text-xs text-muted">
              يستند التحليل إلى معايير AAOIFI الشرعية، ولا سيما: معيار القرض الحسن (19)، ومعيار المرابحة (2)، ومعيار المدفوعات الإلكترونية (38)، ومعيار الصكوك الاستثمارية (17). التقييم أكاديمي بحثي وليس فتوى شرعية.
            </p>
          </div>
        </div>
      </div>


      {/* ── Compliance Summary Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-1">Compliant vs Non-Compliant</h2>
          <p className="text-xs text-muted mb-2" dir="rtl">المنتجات المتوافقة مقابل غير المتوافقة شرعًا</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: `Compliant متوافق (${mpesaProducts.filter(p => p.compliant).length})`, value: mpesaProducts.filter(p => p.compliant).length },
                  { name: `Non-Compliant غير متوافق (${mpesaProducts.filter(p => !p.compliant).length})`, value: mpesaProducts.filter(p => !p.compliant).length },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip
                contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", fontSize: 12 }}
                formatter={(value, name) => [value + " products", name]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Product list split */}
        <div className="card space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-green-500 mb-2">✓ Compliant متوافق شرعًا</h3>
            <div className="space-y-2">
              {mpesaProducts.filter(p => p.compliant).map(p => {
                const avg = Math.round(Object.values(p.scores).reduce((a,b) => a+b,0) / 5);
                return (
                  <div key={p.id} className="flex items-center justify-between bg-secondary border border-theme border-l-4 border-l-green-500 rounded-lg px-3 py-2">
                    <span className="text-sm text-primary font-medium">{p.nameAr}</span>
                    <span className="text-sm font-bold text-green-500">{avg}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-500 mb-2">✗ Non-Compliant غير متوافق</h3>
            <div className="space-y-2">
              {mpesaProducts.filter(p => !p.compliant).map(p => {
                const avg = Math.round(Object.values(p.scores).reduce((a,b) => a+b,0) / 5);
                return (
                  <div key={p.id} className="flex items-center justify-between bg-secondary border border-theme border-l-4 border-l-red-500 rounded-lg px-3 py-2">
                    <span className="text-sm text-primary font-medium">{p.nameAr}</span>
                    <span className="text-sm font-bold text-red-500">{avg}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance by Product Type */}
      <div className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Compliance by Product Type</h2>
        <p className="text-xs text-muted mb-4" dir="rtl">التوافق الشرعي حسب نوع المنتج</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[
            { type: "Payments مدفوعات", compliant: mpesaProducts.filter(p => p.type === "Payments" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Payments" && !p.compliant).length },
            { type: "Savings ادخار", compliant: mpesaProducts.filter(p => p.type === "Savings" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Savings" && !p.compliant).length },
            { type: "Lending إقراض", compliant: mpesaProducts.filter(p => (p.type === "Digital Lending" || p.type === "Overdraft Credit" || p.type === "Digital Loans" || p.type === "Government Digital Credit") && p.compliant).length, nonCompliant: mpesaProducts.filter(p => (p.type === "Digital Lending" || p.type === "Overdraft Credit" || p.type === "Digital Loans" || p.type === "Government Digital Credit") && !p.compliant).length },
            { type: "Insurance تأمين", compliant: mpesaProducts.filter(p => p.type === "Digital Insurance" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Digital Insurance" && !p.compliant).length },
            { type: "Investment استثمار", compliant: mpesaProducts.filter(p => p.type === "Government Bonds" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Government Bonds" && !p.compliant).length },
            { type: "Remittances حوالات", compliant: mpesaProducts.filter(p => p.type === "Cross-border Remittances" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Cross-border Remittances" && !p.compliant).length },
            { type: "AgriFintech زراعي", compliant: mpesaProducts.filter(p => p.type === "Agricultural Fintech" && p.compliant).length, nonCompliant: mpesaProducts.filter(p => p.type === "Agricultural Fintech" && !p.compliant).length },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="type" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="compliant" fill="#10b981" name="Compliant متوافق" radius={[4,4,0,0]} stackId="a" />
            <Bar dataKey="nonCompliant" fill="#ef4444" name="Non-Compliant غير متوافق" radius={[4,4,0,0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      {/* View Toggle */}
      <div className="flex gap-2">
        {[
          { id: "overview", label: "نظرة عامة", labelEn: "Overview" },
          { id: "detail", label: "تحليل تفصيلي", labelEn: "Detailed Analysis" },
          { id: "comparison", label: "مقارنة", labelEn: "Comparison" },
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeView === view.id
                ? "bg-accent text-white"
                : "bg-secondary text-muted hover:text-primary border border-theme"
            }`}
          >
            <span dir="rtl">{view.label}</span>
            <span className="text-xs opacity-60 ml-1">/ {view.labelEn}</span>
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeView === "overview" && (
        <div className="space-y-6">

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mpesaProducts.map(product => {
              const avgScore = Math.round(Object.values(product.scores).reduce((a, b) => a + b, 0) / Object.keys(product.scores).length);
              return (
                <div
                  key={product.id}
                  onClick={() => { setSelectedProduct(product); setActiveView("detail"); }}
                  className={`card cursor-pointer hover:border-accent transition-all border-l-4 ${
                    product.compliant ? "border-l-green-500" : "border-l-red-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-primary">{product.nameAr}</h3>
                      <span className="text-xs text-muted">{product.typeAr} / {product.type}</span>
                    </div>
                    <div className={`text-lg font-bold ${
                      avgScore >= 80 ? "text-green-500" : avgScore >= 50 ? "text-yellow-500" : "text-red-500"
                    }`}>
                      {avgScore}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        avgScore >= 80 ? "bg-green-500" : avgScore >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${avgScore}%` }}
                    />
                  </div>
                  <div className={`text-xs font-medium ${product.compliant ? "text-green-500" : "text-red-500"}`}>
                    {product.compliant ? "✓ متوافق شرعًا / Compliant" : "✗ غير متوافق / Non-Compliant"}
                  </div>
                  <p className="text-xs text-muted mt-2 line-clamp-2" dir="rtl">{product.notes}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DETAILED ANALYSIS ── */}
      {activeView === "detail" && (
        <div className="space-y-6">
          {/* Product Selector */}
          <div className="flex flex-wrap gap-2">
            {mpesaProducts.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedProduct.id === p.id
                    ? "bg-accent text-white"
                    : "bg-secondary border border-theme text-muted hover:text-primary"
                }`}
              >
                {p.nameAr}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="card">
              <h3 className="text-sm font-semibold text-primary mb-1">{selectedProduct.nameAr} — Shariah Radar</h3>
              <p className="text-xs text-muted mb-3">تحليل المعايير الشرعية الخمسة</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="criterion" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar
                    name={selectedProduct.name}
                    dataKey="score"
                    stroke={selectedProduct.compliant ? "#10b981" : "#ef4444"}
                    fill={selectedProduct.compliant ? "#10b981" : "#ef4444"}
                    fillOpacity={0.3}
                  />
                  <Tooltip formatter={(value) => `${value}%`} contentStyle={{ fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Criteria Breakdown */}
            <div className="card space-y-3">
              <h3 className="text-sm font-semibold text-primary mb-1">Criteria Breakdown</h3>
              <p className="text-xs text-muted mb-3" dir="rtl">تفصيل المعايير الشرعية</p>
              {Object.entries(selectedProduct.scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-primary font-medium" dir="rtl">
                      {criteriaLabels[key].en} — {criteriaLabels[key].ar.split(' / ')[0]}
                    </span>
                    <span className={`text-xs font-bold ${
                      value >= 80 ? "text-green-500" : value >= 50 ? "text-yellow-500" : "text-red-500"
                    }`}>{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        value >= 80 ? "bg-green-500" : value >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}

              {/* Scholar Reference */}
              <div className="bg-secondary border border-theme rounded-lg p-3 mt-4">
                <div className="text-xs text-muted mb-1">📚 AAOIFI Reference</div>
                <div className="text-xs text-primary font-medium">{selectedProduct.scholars}</div>
              </div>
            </div>
          </div>

          {/* Shariah Notes */}
          <div className="card">
            <h3 className="text-sm font-semibold text-primary mb-3">
              {selectedProduct.compliant ? "✅" : "❌"} الحكم الشرعي / Shariah Ruling
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary border border-theme rounded-lg p-4" dir="rtl">
                <p className="text-sm text-primary leading-relaxed">{selectedProduct.notes}</p>
              </div>
              <div className="bg-secondary border border-theme rounded-lg p-4">
                <p className="text-sm text-primary leading-relaxed">{selectedProduct.notesEn}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPARISON ── */}
      {activeView === "comparison" && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-1">
              All Products — Criteria Comparison
            </h2>
            <p className="text-xs text-muted mb-4" dir="rtl">مقارنة شاملة لجميع المنتجات عبر المعايير الشرعية الخمسة</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={mpesaProducts.map(p => ({
                  name: p.nameAr,
                  ...p.scores,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", fontSize: 11 }}
                  formatter={(value) => `${value}%`}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="riba" fill="#ef4444" name="Riba-free خلوّ من الربا" radius={[2,2,0,0]} />
                <Bar dataKey="gharar" fill="#f59e0b" name="Gharar-free خلوّ من الغرر" radius={[2,2,0,0]} />
                <Bar dataKey="maysir" fill="#8b5cf6" name="Maysir-free خلوّ من الميسر" radius={[2,2,0,0]} />
                <Bar dataKey="halal_activity" fill="#10b981" name="Halal Activity نشاط حلال" radius={[2,2,0,0]} />
                <Bar dataKey="asset_backing" fill="#3b82f6" name="Asset Backing دعم الأصول" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="card overflow-x-auto">
            <h2 className="text-lg font-semibold text-primary mb-4">Summary Table — جدول ملخص</h2>
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-theme">
                <tr>
                  <th className="text-right py-3 pr-2 text-muted" dir="rtl">المنتج</th>
                  <th className="text-center py-3 text-muted">Riba ربا</th>
                  <th className="text-center py-3 text-muted">Gharar غرر</th>
                  <th className="text-center py-3 text-muted">Maysir ميسر</th>
                  <th className="text-center py-3 text-muted">Activity نشاط</th>
                  <th className="text-center py-3 text-muted">Assets أصول</th>
                  <th className="text-center py-3 text-muted font-bold">Ruling الحكم</th>
                </tr>
              </thead>
              <tbody>
                {mpesaProducts.map(p => {
                  const avg = Math.round(Object.values(p.scores).reduce((a,b) => a+b, 0) / 5);
                  return (
                    <tr key={p.id} className="border-b border-theme">
                      <td className="py-3 pr-2 text-primary font-medium" dir="rtl">
                        {p.nameAr}
                        <div className="text-xs text-muted font-normal">{p.typeAr}</div>
                      </td>
                      {Object.values(p.scores).map((score, i) => (
                        <td key={i} className={`py-3 text-center font-medium ${
                          score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500"
                        }`}>{score}%</td>
                      ))}
                      <td className="py-3 text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          p.compliant
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {p.compliant ? "✓ Compliant متوافق" : "✗ Non-Compliant غير متوافق"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Thesis Insight */}
          <div className="card border-r-4 border-accent" dir="rtl">
            <h3 className="text-sm font-semibold text-primary mb-3">💡 دلالات البحث — Research Implications</h3>
            <div className="space-y-2 text-sm text-secondary">
              <p>• <strong className="text-primary">Only 3 products / ثلاثة منتجات فقط</strong> out of 13 are Shariah compliant (M-PESA Basic, Simple Savings, M-PESA Global)</p>
              <p>• <strong className="text-primary">Riba الربا</strong> is the most violated criterion — especially in Fuliza, M-Shwari, Tala and Branch</p>
              <p>• Despite M-PESA being a financial inclusion tool, its credit products pose fundamental Shariah issues for Muslim users / رغم أن M-PESA أداة للإدماج المالي، إلا أن منتجاتها الائتمانية تطرح إشكاليات شرعية جوهرية للمسلمين</p>
              <p>• <strong className="text-primary">Research Gap / الفجوة البحثية:</strong> Absence of Islamic alternatives (Murabaha مرابحة, Qard Hasan قرض حسن) within Kenya's M-PESA ecosystem</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Citation */}
      <div className="text-xs text-muted border-t border-theme pt-4" dir="rtl">
        المصادر: معايير AAOIFI الشرعية (2021)، تقارير سفاريكوم، NCBA، FSD Kenya | التقييم أكاديمي بحثي بغرض الرسالة العلمية
      </div>
    </div>
  );
}
