import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import StatCard from "../components/StatCard";
import SystemCard from "../components/SystemCard";
import AlertsList from "../components/AlertsList";
import DepartmentPie from "../components/charts/DepartmentPie";
import DepartmentBar from "../components/charts/DepartmentBar";
import SystemDetailModal from "../components/modals/SystemDetailModal";
import { Activity, Server, Bell, AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";
import { getStatusFromLatest } from "../utils/status";
import useDashboardData from "../hooks/useDashboardData";
import { apiGet } from "../api/client";

export default function Dashboard(){
  const { systems, alerts, lastUpdate, loading, refresh } = useDashboardData();
  const [active, setActive] = useState('overview');
  const [term, setTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  const tabs = useMemo(()=>[
    {id:'overview', label:'Overview', Icon:Activity},
    {id:'systems', label:'Systems', Icon:Server},
    {id:'alerts', label:'Alerts', Icon:Bell},
  ],[]);

  const filtered = useMemo(()=> systems.filter(s=>{
    const st = getStatusFromLatest(s.latest);
    const matches = [s.name,s.department,s.location].filter(Boolean).some(v=>v.toLowerCase().includes(term.toLowerCase()));
    return matches && (status==='all' || st===status);
  }),[systems,term,status]);

  const stats = useMemo(()=> ({
    total: systems.length,
    healthy: systems.filter(s=>getStatusFromLatest(s.latest)==='healthy').length,
    warning: systems.filter(s=>getStatusFromLatest(s.latest)==='warning').length,
    critical: systems.filter(s=>getStatusFromLatest(s.latest)==='critical').length,
  }),[systems]);

  const deptData = useMemo(()=> {
    const counts = systems.reduce((acc,s)=>{ const k=s.department||'Unknown'; acc[k]=(acc[k]||0)+1; return acc; },{});
    return Object.entries(counts).map(([name,value])=>({name,value}));
  },[systems]);

  async function openSystem(sys){
    setSelected(sys);
    const data = await apiGet(`/api/systems/${sys.id}/metrics/?hours=24`);
    const formatted = data.map(d=>({ time: new Date(d.ts).toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'}), ...d }));
    setHistory(formatted);
  }

  const onAck = (id)=>{};
  const onResolve = (id)=>{};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lastUpdate={lastUpdate} onRefresh={refresh} loading={loading}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs active={active} onChange={setActive} tabs={tabs}/>

        {active==='overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Total Systems" value={stats.total} Icon={Server} colorClass="text-gray-900" bgClass="bg-blue-100" iconClass="text-blue-600"/>
              <StatCard label="Healthy" value={stats.healthy} Icon={CheckCircle} colorClass="text-green-600" bgClass="bg-green-100" iconClass="text-green-600"/>
              <StatCard label="Warnings" value={stats.warning} Icon={AlertTriangle} colorClass="text-yellow-600" bgClass="bg-yellow-100" iconClass="text-yellow-600"/>
              <StatCard label="Critical" value={stats.critical} Icon={XCircle} colorClass="text-red-600" bgClass="bg-red-100" iconClass="text-red-600"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Systems by Department</h3>
                <DepartmentPie data={deptData}/>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
                <DepartmentBar data={deptData}/>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3></div>
              <AlertsList alerts={alerts.slice(0,5)} onAck={()=>{}} onResolve={()=>{}}/>
            </div>
          </div>
        )}

        {active==='systems' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                  <input className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search systems..." value={term} onChange={e=>setTerm(e.target.value)}/>
                </div>
                <div>
                  <select value={status} onChange={e=>setStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(s=> <SystemCard key={s.id} system={s} onClick={()=>openSystem(s)}/>) }
            </div>
          </div>
        )}

        {active==='alerts' && (
          <AlertsList alerts={alerts} onAck={onAck} onResolve={onResolve}/>
        )}

        <SystemDetailModal system={selected} history={history} onClose={()=>setSelected(null)}/>
      </div>
    </div>
  );
}