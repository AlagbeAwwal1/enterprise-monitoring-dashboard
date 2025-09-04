export default function MetricBar({label,value,icon}){
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">{icon}<span className="text-sm text-gray-600">{label}</span></div>
        <span className="text-sm font-medium">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${value>80?"bg-red-500":value>60?"bg-yellow-500":"bg-green-500"}`} style={{width:`${value}%`}}/>
      </div>
    </div>
  );
}