export const getStatusFromLatest = (m)=>{
  if(!m) return "unknown";
  if(m.cpu>85||m.disk>90||m.memory>85) return "critical";
  if(m.cpu>70||m.disk>80||m.memory>75) return "warning";
  return "healthy";
};
export const getStatusColor=(s)=>({
  healthy:"text-green-600 bg-green-100",
  warning:"text-yellow-600 bg-yellow-100",
  critical:"text-red-600 bg-red-100",
  unknown:"text-gray-600 bg-gray-100"
}[s]||"text-gray-600 bg-gray-100");