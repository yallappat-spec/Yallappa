import { ASSET_TYPES, STATUSES } from "../data";
const lbl = {display:"block",fontSize:11,fontWeight:600,letterSpacing:".9px",color:"#6b7280",textTransform:"uppercase",marginBottom:5};
const grid2 = {display:"grid",gridTemplateColumns:"1fr 1fr",gap:16};
function FField({label,val,set,type="text",ph=""}){
  return(
    <div>
      <label style={lbl}>{label}</label>
      <input className="inp" type={type} value={val} placeholder={ph} onChange={e=>set(e.target.value)}/>
    </div>
  );
}
function FSel({label,val,opts,set}){
  return(
    <div>
      <label style={lbl}>{label}</label>
      <select className="inp sel" value={val} onChange={e=>set(e.target.value)}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
export default function AssetModal({modal,form,setForm,err,onSave,onClose,onDelete}){
  if(!modal) return null;
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  return(
    <div className="overlay" onClick={onClose}>
      <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,width:700,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"20px 28px",borderBottom:"1px solid #1c1c22",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontWeight:700,fontSize:15,color:"#f9fafb"}}>
            {modal.mode==="add" ? "Add New Asset" : `Edit — ${modal.asset.id}`}
          </span>
          <button className="ico" onClick={onClose} style={{fontSize:22,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"24px 28px"}}>
          {err && <div style={{background:"#1f0606",border:"1px solid #7f1d1d",borderRadius:6,padding:"10px 14px",marginBottom:16,color:"#fca5a5",fontSize:13}}>{err}</div>}
          <div style={grid2}>
            <FField label="Asset Name *"    val={form.name}       set={v=>f("name",v)}/>
            <FField label="Serial Number *" val={form.serial}     set={v=>f("serial",v)}/>
            <FSel   label="Asset Type"      val={form.type}       opts={ASSET_TYPES} set={v=>f("type",v)}/>
            <FSel   label="Status"          val={form.status}     opts={STATUSES}    set={v=>f("status",v)}/>
            <FField label="Assigned To"     val={form.assignedTo} set={v=>f("assignedTo",v)} ph="Employee name"/>
            <FField label="Location"        val={form.location}   set={v=>f("location",v)}   ph="Office / Branch"/>
            <FField label="Purchase Date"   val={form.purchase}   set={v=>f("purchase",v)}   type="date"/>
            <FField label="Warranty Expiry" val={form.warranty}   set={v=>f("warranty",v)}   type="date"/>
          </div>
          <div style={{marginTop:16}}>
            <label style={lbl}>Notes</label>
            <textarea className="inp" rows={3} style={{resize:"vertical"}} value={form.notes} onChange={e=>f("notes",e.target.value)}/>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:22}}>
            {modal.mode==="edit" && <button className="btn-del" onClick={()=>onDelete(modal.asset)}>Delete</button>}
            <button className="btn-sec" onClick={onClose}>Cancel</button>
            <button className="btn-pri" onClick={onSave}>{modal.mode==="add" ? "Add Asset" : "Save Changes"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
