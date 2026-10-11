import { useMemo, useState, type ReactNode } from "react";
import { Animated, PanResponder, Text, View } from "react-native";
import { UiButton, UiCard, UiCardBody, UiCardDescription, UiCardTitle, UiIcon, UiIconButton } from "@scenariom/design-system/ui";
type Node={id:string;text:string;children?:Node[]};
const listOne:Node[]=[{id:"0",text:"Choose a smartwatch"},{id:"1",text:"Send design for review",children:[{id:"2",text:"Coffee with the team"},{id:"3",text:"Ready my new work"},{id:"4",text:"Make a wireframe",children:[{id:"5",text:"Video app redesign"},{id:"6",text:"iOS apps design completed"},{id:"7",text:"Dashboard design started"}]},{id:"8",text:"Homepage design"},{id:"9",text:"Developed UI Kit"}]}];
const listTwo:Node[]=[{id:"13",text:"Item 13"},{id:"14",text:"Item 14"},{id:"15",text:"Item 15",children:[{id:"16",text:"Item 16"},{id:"17",text:"Item 17"},{id:"18",text:"Item 18"}]}];
function clone(nodes:Node[]):Node[]{return nodes.map(node=>({...node,children:node.children?clone(node.children):undefined}))}
function arrayAt(nodes:Node[],parentPath:number[]){let current=nodes;for(const index of parentPath)current=current[index].children??=[];return current}
function moveNode(nodes:Node[],path:number[],direction:-1|1){const next=clone(nodes),parent=arrayAt(next,path.slice(0,-1)),from=path[path.length-1],to=from+direction;if(to<0||to>=parent.length)return nodes;const[item]=parent.splice(from,1);parent.splice(to,0,item);return next}
function indentNode(nodes:Node[],path:number[]){const next=clone(nodes),parent=arrayAt(next,path.slice(0,-1)),index=path[path.length-1];if(index<=0)return nodes;const[item]=parent.splice(index,1),previous=parent[index-1];previous.children=[...(previous.children??[]),item];return next}
function outdentNode(nodes:Node[],path:number[]){if(path.length<2)return nodes;const next=clone(nodes),parentPath=path.slice(0,-1),siblings=arrayAt(next,parentPath),index=path[path.length-1],[item]=siblings.splice(index,1),grandPath=parentPath.slice(0,-1),grand=arrayAt(next,grandPath),parentIndex=parentPath[parentPath.length-1];grand.splice(parentIndex+1,0,item);return next}
function GestureNode({children,onDrop}:{children:ReactNode;onDrop:(dx:number,dy:number)=>void}){const [position]=useState(()=>new Animated.ValueXY());const responder=useMemo(()=>PanResponder.create({onStartShouldSetPanResponder:()=>false,onMoveShouldSetPanResponder:(_,g)=>Math.abs(g.dx)>5||Math.abs(g.dy)>5,onPanResponderMove:Animated.event([null,{dx:position.x,dy:position.y}],{useNativeDriver:false}),onPanResponderRelease:(_,g)=>{onDrop(g.dx,g.dy);Animated.spring(position,{toValue:{x:0,y:0},useNativeDriver:true}).start()},onPanResponderTerminate:()=>Animated.spring(position,{toValue:{x:0,y:0},useNativeDriver:true}).start()}),[onDrop,position]);return <Animated.View {...responder.panHandlers} style={{transform:position.getTranslateTransform(),zIndex:1}}>{children}</Animated.View>}
function Tree({items,onChange,collapsed}:{items:Node[];onChange:(items:Node[])=>void;collapsed:boolean}){
  const[closed,setClosed]=useState<Set<string>>(new Set());
  const toggle=(id:string)=>setClosed(value=>{const next=new Set(value);next.has(id)?next.delete(id):next.add(id);return next});
  const render=(nodes:Node[],parentPath:number[]=[],depth=0):ReactNode=>nodes.map((node,index)=>{
    const path=[...parentPath,index],isClosed=collapsed||closed.has(node.id);
    return <View key={node.id}>
      <GestureNode onDrop={(dx,dy)=>Math.abs(dx)>55?onChange(dx>0?indentNode(items,path):outdentNode(items,path)):Math.abs(dy)>40&&onChange(moveNode(items,path,dy>0?1:-1))}>
        <View className="mb-2 rounded-md border border-border bg-surface p-2 shadow-sm" style={{marginStart:depth*14}}>
          <View className="min-h-10 flex-row items-center gap-2">
            <View className="size-8 items-center justify-center"><UiIcon name="more"/></View>
            {node.children?.length?<UiIconButton icon={isClosed?"chevron-right":"chevron-down"} tone="secondary" size="sm" variant="outline" accessibilityLabel={isClosed?"Expand item":"Collapse item"} onPress={()=>toggle(node.id)}/>:<View className="size-9"/>}
            <Text className="min-w-0 flex-1 text-sm font-medium text-foreground">{node.text}</Text>
          </View>
          <View className="mt-2 flex-row flex-wrap items-center justify-end gap-2 border-t border-border pt-2">
            <UiIconButton icon="chevron-up" tone="secondary" size="sm" variant="outline" disabled={index===0} accessibilityLabel="Move up" onPress={()=>onChange(moveNode(items,path,-1))}/>
            <UiIconButton icon="chevron-down" tone="secondary" size="sm" variant="outline" disabled={index===nodes.length-1} accessibilityLabel="Move down" onPress={()=>onChange(moveNode(items,path,1))}/>
            <UiIconButton icon="arrow-right" tone="secondary" size="sm" variant="outline" disabled={index===0} accessibilityLabel="Indent" onPress={()=>onChange(indentNode(items,path))}/>
            <UiIconButton icon="arrow-left" tone="secondary" size="sm" variant="outline" disabled={path.length<2} accessibilityLabel="Outdent" onPress={()=>onChange(outdentNode(items,path))}/>
          </View>
        </View>
      </GestureNode>
      {!isClosed&&node.children&&render(node.children,path,depth+1)}
    </View>
  });
  return <View>{render(items)}</View>
}
export function NestableListTemplatePreview(){const[collapsed,setCollapsed]=useState(false),[one,setOne]=useState(listOne),[two,setTwo]=useState(listTwo);return <View className="gap-5"><UiButton size="sm" onPress={()=>setCollapsed(value=>!value)} icon={collapsed?"chevron-down":"chevron-up"}>{collapsed?"Expand all":"Collapse all"}</UiButton><UiCard><UiCardBody><View className="gap-6"><View><UiCardTitle>Nestable Lists 1</UiCardTitle><UiCardDescription>Drag and drop hierarchical lists with mouse, touch and keyboard sensors.</UiCardDescription><View className="mt-5"><Tree items={one} onChange={setOne} collapsed={collapsed}/></View></View><View><UiCardTitle>Nestable Lists 2</UiCardTitle><UiCardDescription>Use the same component for menu builders, task outlines and CMS trees.</UiCardDescription><View className="mt-5"><Tree items={two} onChange={setTwo} collapsed={collapsed}/></View></View></View></UiCardBody></UiCard></View>}
