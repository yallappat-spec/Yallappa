export default function DeleteModal({target, onConfirm, onClose}){
  if(!target) return null;
  return(
    <div className="overlay" onClick={onClose}>
      <div style={{background:"#18181b",border:"1px solid #27272a",borderRadius:14,width:400,maxWidth:"95vw"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"20px 28px",borderBottom:"1px solid #1c1c22",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontWeight:700,color:"#f87171"}}>Delete Asset</span>
          <button className="ico" onClick={onClose} style={{fontSize:22}}>×</button>
        </div>
        <div style={{padding:"20px 28px"}}>
          <p style={{fontSize:14,color:"#9ca3af",lineHeight:1.8,marginBottom:20}}>
            Permanently delete <strong style={{color:"#f9fafb"}}>{target.name}</strong> ({target.id})?<br/>This cannot be undone.
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
            <button className="btn-sec" onClick={onClose}>Cancel</button>
            <button className="btn-del" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
