"use client";

import { useState } from "react";
import Navbar from "../navbar";

interface Anime {
  id: number;
  title: string;
  genre: string;
  rating: number;
}

export default function Animate() {
  const [animes, setAnimes] = useState<Anime[]>([
    { id: 1, title: "進擊的巨人", genre: "動作", rating: 9.0 },
    { id: 2, title: "鬼滅之刃", genre: "冒險", rating: 8.7 },
    { id: 3, title: "咒術迴戰", genre: "奇幻", rating: 8.6 },
    { id: 4, title: "間諜家家酒", genre: "喜劇", rating: 8.5 },
    { id: 5, title: "葬送的芙莉蓮", genre: "奇幻", rating: 9.2 },
    { id: 6, title: "我推的孩子", genre: "劇情", rating: 8.4 },
  ]);

  const addNewAnime = () => {
    const newAnime: Anime = {
      id: Date.now(), // 使用時間戳確保唯一 ID
      title: "新動漫",
      genre: "未分類",
      rating: 0.0,
    };
    setAnimes([...animes, newAnime]);
  };

  const updateAnime = (id: number, field: keyof Anime, value: string | number) => {
    setAnimes(
      animes.map((anime) =>
        anime.id === id ? { ...anime, [field]: value } : anime
      )
    );
  };

  
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4 overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold text-center text-gray-600 flex-grow">
            動漫推薦
          </h1>
          <button
            onClick={addNewAnime}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            ➕ 新增卡片
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animes.map((anime) => (
            <div key={anime.id}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full relative">

                {/* 標題輸入框 */}
                <input
                  type="text"
                  value={anime.title}
                  onChange={(e) => updateAnime(anime.id, "title", e.target.value)}
                  className="text-xl text-gray-600 font-semibold mb-2 w-full border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="動漫名稱"
                />

                {/* 類型輸入框 */}
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 mr-2">類型:</span>
                  <input
                    type="text"
                    value={anime.genre}
                    onChange={(e) => updateAnime(anime.id, "genre", e.target.value)}
                    className="text-gray-600 flex-grow border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="類型"
                  />
                </div>

                {/* 評分輸入框 */}
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg mr-1">★</span>
                  <input
                    type="number"
                    value={anime.rating}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 10) {
                        updateAnime(anime.id, "rating", value);
                      }
                    }}
                    min="0"
                    max="10"
                    step="1"
                    className="ml-1 text-gray-700 w-16 border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
