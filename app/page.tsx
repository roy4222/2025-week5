import Navbar from "./navbar";
export default function Home() {

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar/>
      <main className="flex-1 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </main>
    </div>
  );
}
