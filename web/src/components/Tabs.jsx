export default function Tabs({active,onChange,tabs}){
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6 max-w-md">
      {tabs.map(({id,label,Icon})=> (
        <button key={id} onClick={()=>onChange(id)} className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${active===id?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`}>
          {Icon && <Icon className="w-4 h-4 mr-2"/>}{label}
        </button>
      ))}
    </div>
  );
}