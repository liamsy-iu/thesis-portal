"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";

export default function DataAnalysis() {
  const [yearly, setYearly] = useState([]);
  const [growth, setGrowth] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/data/mpesa/yearly`),
      axios.get(`${API_URL}/data/mpesa/growth`),
    ]).then(([yearlyRes, growthRes]) => {
      setYearly(yearlyRes.data);
      setGrowth(growthRes.data);
    });
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    return num?.toLocaleString() || "0";
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          M-PESA Data Analysis
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Historical trends and growth metrics (2007-2025)
        </p>
      </div>

      {/* Active Users Chart */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Active M-PESA Users Over Time
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yearly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={formatNumber}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1f2e",
                border: "1px solid #2d3748",
                fontSize: 12,
              }}
              formatter={(value) => formatNumber(value)}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="active_users"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Volume Chart */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Transaction Volume
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={yearly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={formatNumber}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1f2e",
                border: "1px solid #2d3748",
                fontSize: 12,
              }}
              formatter={(value) => formatNumber(value)}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="transactions" fill="#10b981" name="Transactions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction Value Chart */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Transaction Value (KES)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yearly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={formatNumber}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1f2e",
                border: "1px solid #2d3748",
                fontSize: 12,
              }}
              formatter={(value) => `KES ${formatNumber(value)}`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="value_kes"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Value (KES)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Rates */}
      {growth.length > 1 && (
        <div className="card overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
            Year-over-Year Growth
          </h2>
          <table className="w-full text-xs md:text-sm">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 text-gray-400">Year</th>
                <th className="text-right py-3 text-gray-400">Users</th>
                <th className="text-right py-3 text-gray-400">Growth</th>
                <th className="text-right py-3 text-gray-400 hidden sm:table-cell">
                  Transactions
                </th>
                <th className="text-right py-3 text-gray-400 hidden sm:table-cell">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {growth.map((row) => (
                <tr key={row.year} className="border-b border-gray-800">
                  <td className="py-3 text-white">{row.year}</td>
                  <td className="py-3 text-right text-gray-300">
                    {formatNumber(row.users)}
                  </td>
                  <td
                    className={`py-3 text-right ${row.user_growth_pct > 0 ? "text-green-400" : "text-gray-500"}`}
                  >
                    {row.user_growth_pct ? `${row.user_growth_pct}%` : "—"}
                  </td>
                  <td className="py-3 text-right text-gray-300 hidden sm:table-cell">
                    {formatNumber(row.txns)}
                  </td>
                  <td
                    className={`py-3 text-right hidden sm:table-cell ${row.txn_growth_pct > 0 ? "text-green-400" : "text-gray-500"}`}
                  >
                    {row.txn_growth_pct ? `${row.txn_growth_pct}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
