import { Monitor, RefreshCw } from "lucide-react";
export default function Header({ lastUpdate, onRefresh, loading }){
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Monitor className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Enterprise System Monitor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Last updated: {new Date(lastUpdate).toLocaleTimeString()}</span>
            <button onClick={onRefresh} disabled={loading} className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 mr-1 ${loading?"animate-spin":""}`} /> Refresh
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}