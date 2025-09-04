import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
export default function HistoryLines({data}){
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/><YAxis domain={[0,100]}/>
        <Tooltip formatter={(v)=>[`${Number(v).toFixed(1)}%`]}/>
        <Line type="monotone" dataKey="cpu" name="CPU"/>
        <Line type="monotone" dataKey="memory" name="Memory"/>
        <Line type="monotone" dataKey="disk" name="Disk"/>
        <Line type="monotone" dataKey="network" name="Network"/>
      </LineChart>
    </ResponsiveContainer>
  );
}