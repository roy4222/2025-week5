import Link from "next/link";
export default function Animate() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1>Animate</h1>
      <Link href="/" className="bg-blue-500 text-white p-2 rounded-md">
        go to home
      </Link>
    </div>
  );
}
