export default function StatCard({label,value,Icon,colorClass,bgClass,iconClass}){
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
        </div>
        <div className={`${bgClass} rounded-full p-3`}>{Icon && <Icon className={`w-6 h-6 ${iconClass}`}/>}</div>
      </div>
    </div>
  );
}