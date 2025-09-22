import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function YcCard() {
  return (
    <Card className="min-w-64">
      <CardContent className="bg-gray-200">
        <Typography className="text-green-700 text-center">
          <p className="text-3xl">資管三甲</p>
        </Typography>
        <Typography className="text-blue-700 text-xl mb-2 text-center">
          <p className="text-xl">張詠程</p>
        </Typography>
        <Typography className="text-red-700 text-center">
          <p className="text-xl">興趣：釣魚、打遊戲</p>
        </Typography>
        <Typography className="text-yellow-700 text-center">
            <p className="text-xl">專長：我會飛</p>
        </Typography>
      </CardContent>
    </Card>
  );
}
 
