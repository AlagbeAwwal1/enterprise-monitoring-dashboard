import HistoryLines from "../charts/HistoryLines";
import MetricBar from "../MetricBar";
export default function SystemDetailModal({system,history,onClose}){
  if(!system) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{system.name} - System Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">System Information</h3>
              <KV k="Hostname" v={system.hostname}/>
              <KV k="Department" v={system.department}/>
              <KV k="Location" v={system.location}/>
              <KV k="OS" v={system.os}/>
              <KV k="Version" v={system.version}/>
              <KV k="Last Seen" v={new Date(system.last_seen).toLocaleString()}/>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Current Metrics</h3>
              {system.latest ? (
                Object.entries(system.latest).filter(([k])=>["cpu","memory","disk","network"].includes(k)).map(([k,v])=> (
                  <MetricBar key={k} label={k} value={v} icon={<span className="w-4"/>}/>
                ))
              ) : <p className="text-sm text-gray-500">No recent metrics.</p>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">24-Hour Performance History</h3>
            <HistoryLines data={history}/>
          </div>
        </div>
      </div>
    </div>
  );
}
const KV = ({k:kk,v})=> (
  <div className="flex justify-between text-sm"><span className="text-gray-600">{kk}:</span><span className="ml-2 text-gray-900">{v}</span></div>
);