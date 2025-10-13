import Link from "next/link";
import Navbar from "../navbar";
export default function Product() {
  const products = [
    { id: 1, name: "5060 Ti", description: "16GB VRAM" },
    { id: 2, name: "5070 Ti", description: "16GB VRAM" },
    { id: 3, name: "5080 Ti", description: "16GB VRAM" },
  ];
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-600">顯示卡</h1>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold text-gray-600">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}