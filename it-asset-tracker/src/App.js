import { useState, useMemo } from "react";
import { SAMPLE, BLANK, TABLE_COLS, TYPE_ICONS, genId } from "./data";
import StatusBadge from "./components/StatusBadge";
import AssetModal from "./components/AssetModal";
import DeleteModal from "./components/DeleteModal";
const now = new Date();
const isExpired  = d => d && new Date(d) < now;
const isExpiring = d => { if(!d||isExpired(d)) return false; return (new Date(d)-now)/86400000<=90; };
const Dash = () => <span style={{color:"#374151"}}>—</span>;
export default function App(){
  const [assets,setAssets]       = useState(SAMPLE);
  const [search,setSearch]       = useState("");
  const [fType,setFType]         = useState("All");
  const [fStatus,setFStatus]     = useState("All");
  const [sort,setSort]           = useState({col:"id",dir:"asc"});
  const [modal,setModal]         = useState(null);
  const [form,setForm]           = useState(BLANK);
  const [err,setErr]             = useState("");
  const [delTarget,setDelTarget] = useState(null);
  const [toast,setToast]         = useState(null);
  const showToast=(msg,type="ok")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),2600); };
  const openAdd  =()=>{ setForm(BLANK); setErr(""); setModal({mode:"add"}); };
  const openEdit =a=>{ setForm({...a}); setErr(""); setModal({mode:"edit",asset:a}); };
  const closeModal=()=>setModal(null);
  const doSort=col=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}));
  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return [...assets]
      .filter(a=>!q||[a.name,a.id,a.assignedTo,a.serial,a.location].join(" ").toLowerCase().includes(q))
      .filter(a=>fType==="All"||a.type===fType)
      .filter(a=>fStatus==="All"||a.status===fStatus)
      .sort((a,b)=>{ const va=a[sort.col]||"",vb=b[sort.col]||""; return sort.dir==="asc"?va.localeCompare(vb):vb.localeCompare(va); });
  },[assets,search,fType,fStatus,sort]);
  const save=()=>{
    if(!form.name.trim())   return setErr("Asset name is required.");
    if(!form.serial.trim()) return setErr("Serial number is required.");
    if(modal.mode==="add"){ setAssets(p=>[...p,{...form,id:genId()}]); showToast("Asset added."); }
    else { setAssets(p=>p.map(a=>a.id===modal.asset.id?{...form,id:a.id}:a)); showToast("Asset updated."); }
    closeModal();
  };
  const doDelete=()=>{
    setAssets(p=>p.filter(a=>a.id!==delTarget.id));
    showToast("Asset deleted.","warn");
    setDelTarget(null); closeModal();
  };
  const exportCSV=()=>{
    const keys=["id","name","type","status","assignedTo","serial","location","purchase","warranty","notes"];
    const rows=[keys.join(","),...filtered.map(a=>keys.map(k=>`"${(a[k]||"").replace(/"/g,'""')}"`).join(","))];
    const el=document.createElement("a");
    el.href=URL.createObjectURL(new Blob([rows.join("\n")],{type:"text/csv"}));
    el.download="it-assets.csv"; el.click();
  };
  const counts=useMemo(()=>({
    total:assets.length,
    active:assets.filter(a=>a.status==="Active").length,
    repair:assets.filter(a=>a.status==="Under Repair").length,
    expired:assets.filter(a=>isExpired(a.warranty)).length,
  }),[assets]);
  return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:"#09090b",minHeight:"100vh",color:"#e5e7eb"}}>
      <style>{CSS}</style>
      <header style={{background:"#111113",borderBottom:"1px solid #1c1c22",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"13px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,background:"#0c1e30",border:"1px solid #0ea5e940",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2.5"/><path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:"#f9fafb"}}>IT Asset Tracker</div>
              <div style={{fontSize:11,color:"#4b5563",marginTop:2,letterSpacing:.4}}>Kushals Retail · Asset Registry</div>
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn-sec" onClick={exportCSV}>⬇ Export CSV</button>
            <button className="btn-pri" onClick={openAdd}>+ Add Asset</button>
          </div>
        </div>
      </header>
      <main style={{maxWidth:1200,margin:"0 auto",padding:28}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
          {[{label:"Total Assets",val:counts.total,accent:"#0ea5e9"},{label:"Active",val:counts.active,accent:"#22c55e"},{label:"Under Repair",val:counts.repair,accent:"#f59e0b"},{label:"Warranty Expired",val:counts.expired,accent:"#f87171"}]
            .map(c=>(
              <div key={c.label} style={{background:"#111113",border:"1px solid #1c1c22",borderTop:`3px solid ${c.accent}`,borderRadius:10,padding:"18px 22px"}}>
                <div style={{fontSize:30,fontWeight:700,color:c.accent,lineHeight:1}}>{c.val}</div>
                <div style={{fontSize:11,color:"#6b7280",marginTop:6,letterSpacing:.4}}>{c.label}</div>
              </div>
            ))}
        </div>
        <div style={{display:"flex",gap:12,marginBottom:18,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:"1 1 260px",minWidth:220}}>
            <svg style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="inp" style={{paddingLeft:36}} placeholder="Search by name, ID, serial, assignee or location…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="inp sel" value={fType} onChange={e=>setFType(e.target.value)} style={{minWidth:160}}>
            <option value="All">All Types</option>
            {["Laptop","Desktop","Mobile Device","Server","Monitor","Keyboard/Mouse","Peripheral"].map(t=><option key={t}>{t}</option>)}
          </select>
          <select className="inp sel" value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{minWidth:150}}>
            <option value="All">All Statuses</option>
            {["Active","Under Repair","Retired","In Storage"].map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:12,color:"#4b5563",whiteSpace:"nowrap",marginLeft:"auto"}}>{filtered.length} / {assets.length}</span>
        </div>
        <div style={{background:"#111113",border:"1px solid #1c1c22",borderRadius:12,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {TABLE_COLS.map(c=>(
                  <th key={c.key} className="th" onClick={()=>doSort(c.key)}>
                    {c.label}
                    <span style={{marginLeft:5,fontSize:9,opacity:sort.col===c.key?1:.2}}>
                      {sort.col===c.key?(sort.dir==="asc"?"▲":"▼"):"▲"}
                    </span>
                  </th>
                ))}
                <th className="th" style={{textAlign:"right"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={8} style={{padding:"60px 0",textAlign:"center",color:"#374151",fontSize:14}}>No assets match your filters.</td></tr>
                : filtered.map(a=>(
                  <tr key={a.id} className="row">
                    <td className="td mono sky">{a.id}</td>
                    <td className="td"><span style={{marginRight:8}}>{TYPE_ICONS[a.type]||"📦"}</span><strong style={{color:"#f9fafb"}}>{a.name}</strong></td>
                    <td className="td muted sm">{a.type}</td>
                    <td className="td"><StatusBadge s={a.status}/></td>
                    <td className="td muted">{a.assignedTo||<Dash/>}</td>
                    <td className="td muted sm">{a.location||<Dash/>}</td>
                    <td className="td">
                      {a.warranty
                        ? <span className={isExpired(a.warranty)?"wexp":isExpiring(a.warranty)?"woon":"wnorm"}>
                            {isExpired(a.warranty)?"⚠ ":isExpiring(a.warranty)?"⏰ ":""}{a.warranty}
                          </span>
                        : <Dash/>}
                    </td>
                    <td className="td" style={{textAlign:"right"}}>
                      <button className="ico" title="Edit" onClick={()=>openEdit(a)}>✏️</button>
                      <button className="ico danger" title="Delete" onClick={()=>setDelTarget(a)}>🗑</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      <AssetModal modal={modal} form={form} setForm={setForm} err={err} onSave={save} onClose={closeModal} onDelete={t=>{setDelTarget(t);closeModal();}}/>
      <DeleteModal target={delTarget} onConfirm={doDelete} onClose={()=>setDelTarget(null)}/>
      {toast && (
        <div style={{position:"fixed",bottom:28,right:28,padding:"12px 18px",borderRadius:8,fontSize:13,fontWeight:600,border:"1px solid",zIndex:999,...(toast.type==="warn"?{background:"#2d0707",borderColor:"#991b1b",color:"#fca5a5"}:{background:"#052e16",borderColor:"#166534",color:"#4ade80"})}}>
          {toast.type==="warn"?"🗑 ":"✓ "}{toast.msg}
        </div>
      )}
    </div>
  );
}
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:#09090b}
  ::-webkit-scrollbar-thumb{background:#27272a;border-radius:3px}
  .inp{width:100%;background:#09090b;border:1px solid #27272a;color:#f4f4f5;border-radius:7px;padding:9px 12px;font-size:13px;font-family:inherit;outline:none;transition:border .15s}
  .inp:focus{border-color:#0ea5e9;box-shadow:0 0 0 2px #0ea5e918}
  .inp::placeholder{color:#3f3f46}
  .sel{cursor:pointer}
  select option{background:#18181b}
  .th{padding:11px 16px;text-align:left;font-size:11px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;color:#52525b;background:#0d0d0f;cursor:pointer;white-space:nowrap;user-select:none;border-bottom:1px solid #1c1c22}
  .th:hover{color:#a1a1aa}
  .td{padding:13px 16px;font-size:13px;border-bottom:1px solid #18181b;vertical-align:middle}
  .row:last-child .td{border-bottom:none}
  .row:hover .td{background:#111113}
  .mono{font-family:ui-monospace,'Cascadia Code',monospace;font-size:12px;font-weight:600}
  .sky{color:#0ea5e9}
  .muted{color:#71717a}
  .sm{font-size:12px}
  .wexp{font-size:12px;color:#f87171}
  .woon{font-size:12px;color:#fbbf24}
  .wnorm{font-size:12px;color:#52525b}
  .btn-pri{display:inline-flex;align-items:center;gap:6px;background:#0ea5e9;color:#fff;border:none;border-radius:7px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
  .btn-pri:hover{background:#38bdf8}
  .btn-sec{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#a1a1aa;border:1px solid #27272a;border-radius:7px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
  .btn-sec:hover{border-color:#52525b;color:#f4f4f5}
  .btn-del{background:#dc2626;color:#fff;border:none;border-radius:7px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
  .btn-del:hover{background:#ef4444}
  .ico{background:none;border:none;cursor:pointer;padding:5px 7px;border-radius:5px;font-size:14px;color:#52525b;transition:all .15s}
  .ico:hover{background:#1c1c22;color:#f4f4f5}
  .ico.danger:hover{background:#2d0707}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
`;
