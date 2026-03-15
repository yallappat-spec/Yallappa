export const ASSET_TYPES = ["Laptop","Desktop","Mobile Device","Server","Monitor","Keyboard/Mouse","Peripheral"];
export const TYPE_ICONS = {"Laptop":"💻","Desktop":"🖥️","Mobile Device":"📱","Server":"🗄️","Monitor":"🖥","Keyboard/Mouse":"⌨️","Peripheral":"🔌"};
export const STATUSES = ["Active","Under Repair","Retired","In Storage"];
export const STATUS_META = {
  "Active":       {bg:"#052e16",border:"#166534",text:"#4ade80",dot:"#22c55e"},
  "Under Repair": {bg:"#2d1b00",border:"#92400e",text:"#fbbf24",dot:"#f59e0b"},
  "Retired":      {bg:"#1c1c1c",border:"#374151",text:"#9ca3af",dot:"#6b7280"},
  "In Storage":   {bg:"#0c1a2e",border:"#1e3a5f",text:"#60a5fa",dot:"#3b82f6"},
};
export const SAMPLE = [
  {id:"AST-0001",name:"Dell XPS 15",type:"Laptop",status:"Active",assignedTo:"Ravi Kumar",serial:"DXP-98761",location:"Bangalore HQ",purchase:"2023-01-15",warranty:"2026-01-15",notes:""},
  {id:"AST-0002",name:"MacBook Air M2",type:"Laptop",status:"Active",assignedTo:"Meena Sharma",serial:"MBA-M2-4421",location:"Hyderabad",purchase:"2023-09-01",warranty:"2025-09-01",notes:""},
  {id:"AST-0003",name:"iPhone 14 Pro",type:"Mobile Device",status:"Active",assignedTo:"Arjun Nair",serial:"IPH-14P-009",location:"Chennai",purchase:"2023-06-10",warranty:"2025-06-10",notes:""},
  {id:"AST-0004",name:"HP ProLiant G10",type:"Server",status:"Under Repair",assignedTo:"IT Team",serial:"HPPL-0023",location:"Bangalore HQ",purchase:"2021-09-10",warranty:"2024-09-10",notes:"RAM upgrade in progress"},
  {id:"AST-0005",name:'Dell UltraSharp 27"',type:"Monitor",status:"In Storage",assignedTo:"",serial:"DUS27-7890",location:"Mumbai WH",purchase:"2022-11-05",warranty:"2025-11-05",notes:"Spare unit"},
  {id:"AST-0006",name:"Logitech MX Keys",type:"Keyboard/Mouse",status:"Active",assignedTo:"Priya Rao",serial:"LGT-MX-221",location:"Bangalore HQ",purchase:"2023-03-20",warranty:"2025-03-20",notes:""},
];
export const TABLE_COLS = [
  {key:"id",label:"ID"},
  {key:"name",label:"Asset Name"},
  {key:"type",label:"Type"},
  {key:"status",label:"Status"},
  {key:"assignedTo",label:"Assigned To"},
  {key:"location",label:"Location"},
  {key:"warranty",label:"Warranty"},
];
let _counter = 7;
export const genId = () => `AST-${String(_counter++).padStart(4,"0")}`;
export const BLANK = {name:"",type:"Laptop",status:"Active",assignedTo:"",serial:"",location:"",purchase:"",warranty:"",notes:""};
