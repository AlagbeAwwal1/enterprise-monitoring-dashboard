import { Monitor, Cpu, MemoryStick, HardDrive } from "lucide-react";
import StatusBadge from "./StatusBadge";
import MetricBar from "./MetricBar";
import { getStatusFromLatest } from "../utils/status";
export default function SystemCard({system,onClick}){
  const status = getStatusFromLatest(system.latest);
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Monitor className="w-8 h-8 text-gray-400"/>
            <div>
              <h3 className="font-semibold text-gray-900">{system.name}</h3>
              <p className="text-sm text-gray-500">{system.department}</p>
            </div>
          </div>
          <StatusBadge status={status}/>
        </div>
        {system.latest ? (
          <div className="space-y-3">
            <MetricBar label="CPU" value={system.latest.cpu} icon={<Cpu className="w-4 h-4 text-gray-400"/>}/>
            <MetricBar label="Memory" value={system.latest.memory} icon={<MemoryStick className="w-4 h-4 text-gray-400"/>}/>
            <MetricBar label="Disk" value={system.latest.disk} icon={<HardDrive className="w-4 h-4 text-gray-400"/>}/>
            <div className="pt-2 border-t flex justify-between items-center text-sm">
              <span className="text-gray-600">Health Score</span>
              <span className={`font-medium ${system.latest.healthScore>80?"text-green-600":system.latest.healthScore>60?"text-yellow-600":"text-red-600"}`}>{system.latest.healthScore}/100</span>
            </div>
          </div>
        ):<p className="text-sm text-gray-500">No data yet</p>}
      </div>
    </div>
  );
}