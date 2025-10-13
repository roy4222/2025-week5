import Link from "next/link";
import Navbar from "./navbar";

export default function Home() {
  const features = [
    {
      id: "product",
      icon: "📦",
      title: "產品",
      description: "瀏覽我們的產品系列",
      href: "/product"
    },
    {
      id: "customer",
      icon: "👥",
      title: "客戶",
      description: "了解客戶服務資訊",
      href: "/customer"
    },
    {
      id: "animate",
      icon: "🎬",
      title: "動漫",
      description: "發現熱門動漫推薦",
      href: "/animate"
    },
    {
      id: "store",
      icon: "🏪",
      title: "商店",
      description: "訪問我們的線上商店",
      href: "/store"
    }
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            歡迎來到我的網站
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            探索產品、客戶服務、動漫推薦和更多精彩內容
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature) => (
              <Link key={feature.id} href={feature.href} className="block">
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 我的網站. All rights reserved.</p>
      </footer>
    </div>
  );
}
