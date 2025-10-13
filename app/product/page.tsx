import Link from "next/link";
import Navbar from "../navbar";
export default function Product() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <h1>Product</h1>
      <Link href="/" className="bg-blue-500 text-white p-2 rounded-md">
        go to home
      </Link>
    </div>
  );
}