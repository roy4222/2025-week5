"use client";

import React, { useState } from "react";
import Navbar from "../navbar";

type Game = {
  id: number;
  title: string;
  genre: string;
  rating: number;
};

export default function Animate() {
  const [items, setItems] = useState<Game[]>([
    { id: 1, title: "特戰英豪", genre: "第一人稱射擊", rating: 9.0 },
    { id: 2, title: "call of duty", genre: "第一人稱射擊", rating: 8.7 },
    { id: 3, title: "艾爾登法環", genre: "動作/魂類", rating: 8.6 },
    { id: 4, title: "隻狼", genre: "動作/魂類", rating: 8.5 },
    { id: 5, title: "貓娘樂園", genre: "第一人稱射擊", rating: 9.2 },
    { id: 6, title: "飢荒", genre: "沙盒生存", rating: 8.4 },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !genre.trim() || rating === "") {
      setError("請填寫 title、genre 與 rating");
      return;
    }

    const parsed = Number(rating);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 10) {
      setError("rating 必須是 0 到 10 的數字");
      return;
    }

    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem: Game = { id: nextId, title: title.trim(), genre: genre.trim(), rating: parsed };
    setItems((prev) => [newItem, ...prev]);

    // reset
    setTitle("");
    setGenre("");
    setRating("");
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-3 text-center text-gray-600">遊戲推薦</h1>

        <form className="max-w-2xl mx-auto mb-6 p-4 bg-gray-50 rounded" onSubmit={handleAdd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              aria-label="title"
              className="p-2 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              aria-label="genre"
              className="p-2 border rounded"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              aria-label="rating"
              className="p-2 border rounded"
              placeholder="Rating (0-10)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-red-600">{error}</div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              新增
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((anime) => (
            <div key={anime.id}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                <h2 className="text-xl text-gray-600 font-semibold mb-2">{anime.title}</h2>
                <p className="text-gray-600 mb-2">類型: {anime.genre}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="ml-1 text-gray-700">{anime.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
