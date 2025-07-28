import { Clock } from "lucide-react";

interface CookingTimeProps {
  time: number;
}

const CookingTime: React.FC<CookingTimeProps> = ({ time }) => (
  <div className="flex items-center gap-2 whitespace-nowrap">
    <Clock className="w-[20px]" />
    <span className="text-sm">{getCookingTimeLabel(time)}</span>
  </div>
);

const getCookingTimeLabel = (minutes: number): string => {
  if (!minutes || isNaN(minutes)) return "N/A";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0)
    return `${hrs} hour${hrs > 1 ? "s" : ""} ${mins} min`;
  if (hrs > 0) return `${hrs} hour${hrs > 1 ? "s" : ""}`;
  return `${mins} min`;
};

export default CookingTime;
