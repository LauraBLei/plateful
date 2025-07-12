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
  switch (minutes) {
    case 30:
      return "30 min";
    case 60:
      return "1 hour";
    case 90:
      return "1.5 hours";
    case 120:
      return "2 hours";
    default:
      return "> 2 hours";
  }
};

export default CookingTime;
