import Navbar from "../navbar";

export default function Animate() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-3 text-center text-gray-600">
          動漫推薦
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, title: "進擊的巨人", genre: "動作", rating: 9.0 },
            { id: 2, title: "鬼滅之刃", genre: "冒險", rating: 8.7 },
            { id: 3, title: "咒術迴戰", genre: "奇幻", rating: 8.6 },
            { id: 4, title: "間諜家家酒", genre: "喜劇", rating: 8.5 },
            { id: 5, title: "葬送的芙莉蓮", genre: "奇幻", rating: 9.2 },
            { id: 6, title: "我推的孩子", genre: "劇情", rating: 8.4 },
          ].map((anime) => (
            <div key={anime.id}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                <h2 className="text-xl text-gray-600 font-semibold mb-2">
                  {anime.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  類型: {anime.genre}
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="ml-1 text-gray-700">
                    {anime.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
