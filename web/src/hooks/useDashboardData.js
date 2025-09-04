import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../api/client";
export default function useDashboardData(){
  const [systems,setSystems] = useState([]);
  const [alerts,setAlerts] = useState([]);
  const [lastUpdate,setLastUpdate] = useState(Date.now());
  const [loading,setLoading] = useState(false);

  const refresh = useCallback(async()=>{
    setLoading(true);
    const [s,a] = await Promise.all([apiGet('/api/systems/'), apiGet('/api/alerts/')]);
    setSystems(s); setAlerts(a); setLastUpdate(Date.now()); setLoading(false);
  },[]);

  useEffect(()=>{ refresh(); const id=setInterval(refresh,30000); return ()=>clearInterval(id); },[refresh]);
  return { systems, alerts, lastUpdate, loading, refresh };
}