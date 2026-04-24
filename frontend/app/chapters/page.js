"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://thesis-portal-pythonversion3120.up.railway.app";

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadChapters = () => {
    axios.get(`${API_URL}/chapters`).then((res) => setChapters(res.data));
  };

  useEffect(() => {
    loadChapters();
  }, []);

  const updateProgress = async (id, wordCount, progress) => {
    await axios.put(
      `${API_URL}/chapters/${id}/progress?word_count=${wordCount}&progress=${progress}`,
    );
    loadChapters();
    setEditing(null);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/chapters/${id}/status?status=${status}`);
    loadChapters();
  };

  const totalWords = chapters.reduce((sum, c) => sum + c.word_count_current, 0);
  const totalTarget = chapters.reduce(
    (sum, c) => sum + (c.word_count_target || 0),
    0,
  );
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
          Thesis Chapters
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Track progress, word count, and deadlines
        </p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {overallProgress}%
          </div>
          <div className="stat-label text-[10px] md:text-xs">
            Overall Progress
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {totalWords.toLocaleString()}
          </div>
          <div className="stat-label text-[10px] md:text-xs">
            Total Words Written
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-3xl md:text-5xl">
            {totalTarget.toLocaleString()}
          </div>
          <div className="stat-label text-[10px] md:text-xs">
            Target Word Count
          </div>
        </div>
      </div>

      {/* Chapters list */}
      <div className="space-y-4">
        {chapters.map((ch) => (
          <div key={ch.id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-400">
                    Chapter {ch.chapter_number}
                  </span>
                  <h3
                    className="text-base md:text-lg font-semibold text-white rtl"
                    dir="rtl"
                  >
                    {ch.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 flex-wrap">
                  <span>
                    {ch.word_count_current.toLocaleString()} /{" "}
                    {ch.word_count_target?.toLocaleString() || "?"} words
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span>{ch.progress_percentage}% complete</span>
                </div>
              </div>

              <select
                value={ch.status}
                onChange={(e) => updateStatus(ch.id, e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white text-xs md:text-sm px-3 py-1.5 md:py-2 rounded w-full sm:w-auto"
              >
                <option value="planning">Planning</option>
                <option value="drafting">Drafting</option>
                <option value="revising">Revising</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5 md:h-3">
                <div
                  className="bg-blue-500 h-2.5 md:h-3 rounded-full transition-all"
                  style={{ width: `${ch.progress_percentage}%` }}
                />
              </div>
            </div>

            {/* Edit mode */}
            {editing === ch.id ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    placeholder="Word count"
                    defaultValue={ch.word_count_current}
                    id={`words-${ch.id}`}
                    className="flex-1 bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Progress %"
                    min="0"
                    max="100"
                    defaultValue={ch.progress_percentage}
                    id={`progress-${ch.id}`}
                    className="w-full sm:w-24 bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const words =
                        parseInt(
                          document.getElementById(`words-${ch.id}`).value,
                        ) || 0;
                      const prog =
                        parseInt(
                          document.getElementById(`progress-${ch.id}`).value,
                        ) || 0;
                      updateProgress(ch.id, words, prog);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex-1 sm:flex-initial"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm flex-1 sm:flex-initial"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditing(ch.id)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Update progress →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
