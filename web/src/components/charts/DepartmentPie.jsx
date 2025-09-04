import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { hashHsl } from "../../utils/colors";
export default function DepartmentPie({data}){
  const dd = data.map(d=> ({...d, color: hashHsl(d.name)}));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip formatter={(value ,_name , {payload})=>[value,payload.name]} />
        <Pie data={dd} dataKey="value" nameKey="name" outerRadius={120}>
          {dd.map((e,i)=> <Cell key={i} fill={e.color}/>) }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}