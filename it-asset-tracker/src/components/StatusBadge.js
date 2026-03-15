import { STATUS_META } from "../data";
export default function StatusBadge({ s }) {
  const m = STATUS_META[s] || STATUS_META["Active"];
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:m.bg,color:m.text,border:`1px solid ${m.border}`}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:m.dot}}/>
      {s}
    </span>
  );
}
