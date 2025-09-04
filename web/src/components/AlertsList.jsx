export default function AlertsList({alerts,onAck,onResolve}){
  const ordered = [...alerts].sort((a,b)=> new Date(b.ts) - new Date(a.ts));
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold text-gray-900">System Alerts</h3></div>
      <div className="divide-y">
        {ordered.map(a=> (
          <div key={a.id} className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-2 ${a.severity==='critical'?"bg-red-500":a.severity==='warning'?"bg-yellow-500":"bg-blue-500"}`}/>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{a.type}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${a.severity==='critical'?"bg-red-100 text-red-800":a.severity==='warning'?"bg-yellow-100 text-yellow-800":"bg-blue-100 text-blue-800"}`}>{a.severity}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{a.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>System: WS-{String(a.systemId).padStart(3,'0')}</span>
                    <span>{new Date(a.ts).toLocaleString()}</span>
                    {a.acknowledged && <span className="text-blue-600">Acknowledged</span>}
                    {a.resolved && <span className="text-green-600">Resolved</span>}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {!a.acknowledged && <button onClick={()=>onAck(a.id)} className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700">Acknowledge</button>}
                {!a.resolved && <button onClick={()=>onResolve(a.id)} className="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-700">Resolve</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}