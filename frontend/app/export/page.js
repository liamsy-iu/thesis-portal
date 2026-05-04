"use client";
import { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import ExportPDF from "../components/ExportPDF";

const finAccessData = [
  { year: "2006", formal: 26.7, excluded: 38.1 },
  { year: "2009", formal: 32.1, excluded: 34.4 },
  { year: "2013", formal: 40.4, excluded: 28.2 },
  { year: "2016", formal: 66.7, excluded: 15.9 },
  { year: "2019", formal: 75.3, excluded: 11.1 },
  { year: "2021", formal: 83.7, excluded: 11.6 },
  { year: "2024", formal: 84.8, excluded: 9.9 },
];

const genderGapData = [
  { year: "2006", male: 33.2, female: 20.5, gap: 12.7 },
  { year: "2009", male: 48.1, female: 33.7, gap: 14.4 },
  { year: "2013", male: 71.2, female: 62.8, gap: 8.4 },
  { year: "2016", male: 79.7, female: 71.2, gap: 8.5 },
  { year: "2019", male: 85.6, female: 80.4, gap: 5.2 },
  { year: "2021", male: 85.9, female: 81.7, gap: 4.2 },
  { year: "2024", male: 85.7, female: 84.1, gap: 1.6 },
];

const urbanRuralData = [
  { year: "2006", urban: 35.5, rural: 23.8 },
  { year: "2009", urban: 44.2, rural: 27.1 },
  { year: "2013", urban: 72.1, rural: 55.8 },
  { year: "2016", urban: 79.8, rural: 59.1 },
  { year: "2019", urban: 88.7, rural: 70.8 },
  { year: "2021", urban: 90.0, rural: 79.8 },
  { year: "2024", urban: 91.2, rural: 81.3 },
];

const muslimCountiesData = [
  { county: "Mandera", inclusion2021: 83.9, inclusion2024: 89.7 },
  { county: "Wajir", inclusion2021: 86.5, inclusion2024: 85.6 },
  { county: "Garissa", inclusion2021: 60.8, inclusion2024: 87.1 },
  { county: "Mombasa", inclusion2021: 89.9, inclusion2024: 87.6 },
  { county: "Lamu", inclusion2021: 82.0, inclusion2024: 84.0 },
  { county: "National Avg", inclusion2021: 83.7, inclusion2024: 84.8 },
];

const agentData = [
  { year: "2007", agents: 450 },
  { year: "2009", agents: 8000 },
  { year: "2011", agents: 24000 },
  { year: "2015", agents: 130000 },
  { year: "2018", agents: 220000 },
  { year: "2021", agents: 310000 },
  { year: "2024", agents: 381116 },
];

const mpesaVsBankData = [
  { year: "2007", mpesa: 2, bank: 14 },
  { year: "2009", mpesa: 38.4, bank: 17 },
  { year: "2013", mpesa: 62, bank: 29.2 },
  { year: "2016", mpesa: 71.4, bank: 42.3 },
  { year: "2019", mpesa: 79, bank: 44.8 },
  { year: "2021", mpesa: 81.4, bank: 46.3 },
  { year: "2024", mpesa: 84.8, bank: 52.1 },
];

const shariahProducts = [
  { name: "M-PESA Basic", score: 89, compliant: true },
  { name: "M-PESA Savings", score: 88, compliant: true },
  { name: "M-PESA Global", score: 87, compliant: true },
  { name: "DigiFarm", score: 71, compliant: false },
  { name: "M-Akiba", score: 70, compliant: false },
  { name: "M-Tiba", score: 69, compliant: false },
  { name: "Hustler Fund", score: 68, compliant: false },
  { name: "M-Shwari", score: 64, compliant: false },
  { name: "KCB M-PESA", score: 64, compliant: false },
  { name: "Branch", score: 58, compliant: false },
  { name: "Tala", score: 56, compliant: false },
  { name: "Bima", score: 53, compliant: false },
  { name: "Fuliza", score: 53, compliant: false },
];

const pdfSections = [
  { id: "section-finaccess", label: "Financial Inclusion Growth — FinAccess 2006-2024" },
  { id: "section-gender", label: "Gender Gap in Financial Inclusion" },
  { id: "section-urban-rural", label: "Urban vs Rural Financial Inclusion" },
  { id: "section-muslim-counties", label: "Muslim-Majority Counties vs National Average" },
  { id: "section-agents", label: "M-PESA Agent Network Growth" },
  { id: "section-mpesa-vs-bank", label: "M-PESA vs Traditional Banking" },
  { id: "section-shariah", label: "Shariah Compliance Analysis — AAOIFI Standards" },
];

const formatNum = (n) => {
  if (n >= 1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n/1e3).toFixed(0)}K`;
  return n;
};

export default function ExportPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">Export Research Report</h1>
          <p className="text-sm text-muted">All charts and Shariah analysis in one PDF</p>
        </div>
        <ExportPDF sections={pdfSections} />
      </div>

      <div className="bg-secondary border border-theme rounded-lg p-4 text-sm text-muted" dir="rtl">
        ملاحظة: انتظر تحميل جميع الرسوم البيانية قبل الضغط على زر التصدير.
        <span className="ml-2 ltr">/ Wait for all charts to load before exporting.</span>
      </div>

      <div id="section-finaccess" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Financial Inclusion Growth — Kenya</h2>
        <p className="text-xs text-muted mb-4">FinAccess Surveys 2006–2024 | Source: FSD Kenya & CBK</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={finAccessData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Line type="monotone" dataKey="formal" stroke="#3b82f6" strokeWidth={2} name="Formal Inclusion %" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="excluded" stroke="#ef4444" strokeWidth={2} name="Excluded %" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: FinAccess Surveys 2006–2024 | FSD Kenya & Central Bank of Kenya</p>
      </div>

      <div id="section-gender" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Gender Gap in Financial Inclusion</h2>
        <p className="text-xs text-muted mb-4">Gap reduced: 12.7% (2006) → 1.6% (2024) | Source: FSD Kenya</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={genderGapData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Line type="monotone" dataKey="male" stroke="#3b82f6" strokeWidth={2} name="Male %" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="female" stroke="#ec4899" strokeWidth={2} name="Female %" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="gap" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Gender Gap %" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: FinAccess 2006–2024 | FSD Kenya & CBK</p>
      </div>

      <div id="section-urban-rural" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Urban vs Rural Financial Inclusion</h2>
        <p className="text-xs text-muted mb-4">Source: FinAccess 2006–2024</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={urbanRuralData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Bar dataKey="urban" fill="#3b82f6" name="Urban %" radius={[4,4,0,0]} />
            <Bar dataKey="rural" fill="#10b981" name="Rural %" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: FinAccess 2006–2024 | 45.5% of excluded population are rural youth</p>
      </div>

      <div id="section-muslim-counties" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Muslim-Majority Counties vs National Average</h2>
        <p className="text-xs text-muted mb-4">Source: FinAccess 2021 & 2024</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={muslimCountiesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 100]} />
            <YAxis type="category" dataKey="county" tick={{ fontSize: 11 }} width={90} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Bar dataKey="inclusion2021" fill="#8b5cf6" name="2021 %" radius={[0,4,4,0]} />
            <Bar dataKey="inclusion2024" fill="#f59e0b" name="2024 %" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: FinAccess 2021 & 2024 | Garissa: +26.3% | Wajir & Mandera above national average</p>
      </div>

      <div id="section-agents" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">M-PESA Agent Network Growth</h2>
        <p className="text-xs text-muted mb-4">450 agents (2007) → 381,116 (2024) | Source: CBK Annual Reports</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={agentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatNum} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => v.toLocaleString()} />
            <Bar dataKey="agents" fill="#8b5cf6" name="Active Agents" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: CBK Annual Reports 2007–2024</p>
      </div>

      <div id="section-mpesa-vs-bank" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">M-PESA vs Traditional Banking Growth</h2>
        <p className="text-xs text-muted mb-4">Source: FinAccess & CBK | M-PESA surpassed banks in 2009</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={mpesaVsBankData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
            <Line type="monotone" dataKey="mpesa" stroke="#10b981" strokeWidth={3} name="Mobile Money %" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="bank" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Traditional Banking %" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted mt-2">Source: FinAccess 2006–2024 | 34% of formally included use mobile money only</p>
      </div>

      <div id="section-shariah" className="card">
        <h2 className="text-lg font-semibold text-primary mb-1">Shariah Compliance Analysis — AAOIFI Standards</h2>
        <p className="text-xs text-muted mb-4">3 Compliant / 10 Non-Compliant out of 13 products | Source: AAOIFI Standards 2021</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: "Compliant (3)", value: 3 },
                  { name: "Non-Compliant (10)", value: 10 },
                ]}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={110}
                paddingAngle={4} dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={shariahProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={95} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="score" radius={[0,4,4,0]} name="Compliance Score">
                {shariahProducts.map((p, i) => (
                  <Cell key={i} fill={p.compliant ? "#10b981" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted mt-2">Source: AAOIFI Shariah Standards 2021 | Academic research assessment for thesis purposes</p>
      </div>
    </div>
  );
}
