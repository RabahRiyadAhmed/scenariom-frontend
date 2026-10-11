export type SimpleTableRecord={id:number;firstName:string;lastName:string;userName:string};
export type EmployeeRecord={id:number;age:number;name:string;company:string;phone:string;subRows?:EmployeeRecord[]};

export const simpleTableRecords:SimpleTableRecord[]=[
  {id:1,firstName:'Mark',lastName:'Otto',userName:'@mdo'},
  {id:2,firstName:'Jacob',lastName:'Thornton',userName:'@fat'},
  {id:3,firstName:'Dave',lastName:'G',userName:'@dave'},
  {id:4,firstName:'Nik',lastName:'N',userName:'@nikn'},
  {id:5,firstName:'Shreyu',lastName:'Navadiya',userName:'@sn'},
];

export const employeeTableRecords:EmployeeRecord[]=[
  [1,32,'Burt','Kaggle','+1 (823) 532-2427'],[2,23,'Bruno','Magmina','+1 (813) 583-2089'],
  [3,31,'Alvarado','Translink','+1 (975) 468-3875'],[4,24,'Lilia','Digitalus','+1 (891) 537-3461'],
  [5,25,'Amanda','Bunga','+1 (916) 522-3747'],[6,20,'Alexandra','Conjurica','+1 (876) 492-3181'],
  [7,27,'Diana','Extragen','+1 (977) 417-3038'],[8,26,'Goodman','Aquamate','+1 (930) 545-2289'],
  [9,26,'Edith','Pyrami','+1 (854) 506-3468'],[10,29,'Juana','Singavera','+1 (872) 560-2324'],
  [11,21,'Fitzgerald','Dancerity','+1 (813) 573-2507'],[12,38,'Madden','Corpulse','+1 (935) 534-3876'],
  [13,40,'Jewell','Frenex','+1 (886) 516-3262'],[14,32,'Kerr','Artiq','+1 (807) 561-3077'],
  [15,20,'Washington','Organica','+1 (948) 458-3517'],[16,20,'Audrey','Softmicro','+1 (900) 592-3841'],
  [17,39,'Allison','Playce','+1 (998) 478-3810'],[18,25,'Holder','Paragonia','+1 (850) 536-2708'],
  [19,26,'Atkinson','Scentric','+1 (850) 467-2761'],[20,35,'Delaney','Telpod','+1 (934) 468-2218'],
].map(([id,age,name,company,phone])=>({id:id as number,age:age as number,name:name as string,company:company as string,phone:phone as string}));

export const expandableEmployeeRecords:EmployeeRecord[]=employeeTableRecords.slice(0,8).map((employee,index)=>({...employee,subRows:[{id:100+employee.id,age:22+index,name:`${employee.name} Jr.`,company:`${employee.company} Support`,phone:`+1 (555) 010-${String(index+1).padStart(4,'0')}`}] }));
