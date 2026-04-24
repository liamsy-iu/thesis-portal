"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://thesis-portal-pythonversion3120.up.railway.app";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [litStats, setLitStats] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/data/stats/summary`),
      axios.get(`${API_URL}/chapters`),
      axios.get(`${API_URL}/literature/stats`),
    ]).then(([statsRes, chaptersRes, litRes]) => {
      setStats(statsRes.data);
      setChapters(chaptersRes.data);
      setLitStats(litRes.data);
    });
  }, []);

  const overallProgress =
    chapters.length > 0
      ? Math.round(
          chapters.reduce((sum, c) => sum + c.progress_percentage, 0) /
            chapters.length,
        )
      : 0;

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Research Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-400 text-right" dir="rtl">
          دور التقنية في تعزيز الشمول المالي للمسلمين في كينيا: دراسة تطبيقية
          على منصة &quot;م-بيسا&quot; للفترة ٢٠٠٧-٢٠٢٥
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {stats?.years_covered || 0}
          </div>
          <div className="stat-label text-[10px] md:text-xs">Years of Data</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {overallProgress}%
          </div>
          <div className="stat-label text-[10px] md:text-xs">
            Thesis Progress
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {litStats?.total || 0}
          </div>
          <div className="stat-label text-[10px] md:text-xs">Sources</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {stats?.notes_count || 0}
          </div>
          <div className="stat-label text-[10px] md:text-xs">
            Research Notes
          </div>
        </div>
      </div>

      {/* Chapter progress */}
      <div className="card">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Thesis Chapters
        </h2>
        <div className="space-y-3">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            >
              <div className="shrink-0 w-12 hidden sm:block text-center">
                <span className="text-sm font-medium text-gray-400">
                  Ch {ch.chapter_number}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1 items-start">
                  <span className="text-sm text-white pr-2 rtl" dir="rtl">
                    <span className="sm:hidden text-gray-400 text-xs">
                      Ch {ch.chapter_number}:{" "}
                    </span>
                    {ch.title}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {ch.word_count_current} / {ch.word_count_target || "?"}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${ch.progress_percentage}%` }}
                  />
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                  ch.status === "complete"
                    ? "bg-green-900 text-green-200"
                    : ch.status === "drafting"
                      ? "bg-blue-900 text-blue-200"
                      : "bg-gray-700 text-gray-300"
                }`}
              >
                {ch.status}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/chapters"
          className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          Manage chapters →
        </Link>
      </div>

      {/* Literature status */}
      {litStats && (
        <div className="card">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
            Literature Review Status
          </h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-semibold text-green-400">
                {litStats.read}
              </div>
              <div className="text-xs md:text-sm text-gray-400">Read</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold text-yellow-400">
                {litStats.reading}
              </div>
              <div className="text-xs md:text-sm text-gray-400">Reading</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold text-gray-400">
                {litStats.unread}
              </div>
              <div className="text-xs md:text-sm text-gray-400">Unread</div>
            </div>
          </div>
          <Link
            href="/literature"
            className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
          >
            Manage literature →
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <Link
          href="/data"
          className="card hover:border-blue-500 transition cursor-pointer"
        >
          <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
            📊 Data Analysis
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            Visualize M-PESA trends and financial inclusion metrics
          </p>
        </Link>
        <Link
          href="/chapters"
          className="card hover:border-blue-500 transition cursor-pointer"
        >
          <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
            📝 Chapter Tracker
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            Update progress, notes, and deadlines
          </p>
        </Link>
        <Link
          href="/literature"
          className="card hover:border-blue-500 transition cursor-pointer"
        >
          <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
            📚 Literature Manager
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            Add papers, track reading, and organize notes
          </p>
        </Link>
      </div>
    </div>
  );
}
