import RoyCard from "@/card/RoyCard";
import PatrickStarCard from "@/card/PatrickStarCard";
import WesleyCard from "@/card/WesleyCard";
import YcCard from "@/card/ycCard";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen gap-4 bg-gradient-to-br from-red-400 via-green-500 to-yellow-500">
      <RoyCard />
      <PatrickStarCard />
      <YcCard />
      <WesleyCard />
    </div>
  );
}
