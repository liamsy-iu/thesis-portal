"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://thesis-portal-pythonversion3120.up.railway.app";

export default function Literature() {
  const [literature, setLiterature] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: "",
    source_type: "journal",
    url: "",
    abstract: "",
    tags: "",
  });

  const loadLiterature = useCallback(() => {
    const url =
      filter === "all"
        ? `${API_URL}/literature`
        : `${API_URL}/literature?status=${filter}`;
    axios.get(url).then((res) => setLiterature(res.data));
  }, [filter]);

  useEffect(() => {
    loadLiterature();
  }, [loadLiterature]);

  const addLiterature = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      year: formData.year ? parseInt(formData.year) : null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
    };
    await axios.post(`${API_URL}/literature`, payload);
    setShowForm(false);
    setFormData({
      title: "",
      authors: "",
      year: "",
      source_type: "journal",
      url: "",
      abstract: "",
      tags: "",
    });
    loadLiterature();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/literature/${id}/status?status=${status}`);
    loadLiterature();
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Literature Review
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Manage research sources and track reading progress
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "+ Add Source"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">
            Add New Source
          </h3>
          <form onSubmit={addLiterature} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Authors
                </label>
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) =>
                    setFormData({ ...formData, authors: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Source Type
                </label>
                <select
                  value={formData.source_type}
                  onChange={(e) =>
                    setFormData({ ...formData, source_type: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
                >
                  <option value="journal">Journal Article</option>
                  <option value="book">Book</option>
                  <option value="report">Report</option>
                  <option value="thesis">Thesis</option>
                  <option value="working_paper">Working Paper</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  URL / DOI
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="M-PESA, financial inclusion, Kenya"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Abstract / Notes
              </label>
              <textarea
                rows="3"
                value={formData.abstract}
                onChange={(e) =>
                  setFormData({ ...formData, abstract: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm md:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Add Source
            </button>
          </form>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "unread", "reading", "read"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 md:px-4 py-2 rounded text-xs md:text-sm ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Literature list */}
      <div className="space-y-3">
        {literature.length === 0 ? (
          <div className="card text-center text-gray-400">
            <p className="text-sm md:text-base">
              No sources yet. Click &quot;+ Add Source&quot; to get started.
            </p>
          </div>
        ) : (
          literature.map((item) => (
            <div
              key={item.id}
              className="card hover:border-gray-600 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-3">
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.authors && (
                    <p className="text-xs md:text-sm text-gray-400 mb-2">
                      {item.authors} ({item.year})
                    </p>
                  )}
                  {item.abstract && (
                    <p className="text-xs md:text-sm text-gray-500 mb-2 line-clamp-2">
                      {item.abstract}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] md:text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <select
                  value={item.read_status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-xs md:text-sm px-3 py-1.5 rounded w-full sm:w-auto"
                >
                  <option value="unread">Unread</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-blue-400 hover:text-blue-300"
                >
                  View source →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
