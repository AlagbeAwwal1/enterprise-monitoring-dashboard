import { CheckCircle, AlertTriangle, XCircle, Monitor } from "lucide-react";
import { getStatusColor } from "../utils/status";
const IconFor = (s)=>({healthy:CheckCircle, warning:AlertTriangle, critical:XCircle}[s]||Monitor);
export default function StatusBadge({status}){
  const Icon = IconFor(status);
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(status)}`}>
      <Icon className="w-4 h-4"/><span className="capitalize">{status}</span>
    </div>
  );
}