!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).CardDragSort={},e.Vue)}(this,(function(e,t){"use strict";var n=document.createElement("style");n.textContent=".card-drag-sort[data-v-5a9c119d]{position:relative;width:100%;height:var(--57911cb1)}.card-drag-sort .card-wrap[data-v-5a9c119d]{position:absolute;display:flex;flex-direction:column;overflow:hidden;border-radius:6px;box-shadow:0 0 8px #ccc;transition:all var(--f41f9bea);-webkit-user-select:none;user-select:none}.card-drag-sort .card-wrap .card-header[data-v-5a9c119d]{height:50px;cursor:move;border-bottom:1px solid #e0e0e0}.card-drag-sort .card-wrap .card-title[data-v-5a9c119d]{line-height:49px;font-size:14px;color:gray;background-color:#fff;padding:0 15px}.card-drag-sort .card-wrap .empty-text[data-v-5a9c119d]{height:100%;background-color:#fff;display:flex;justify-content:center;align-items:center;font-size:14px;color:gray}\n",document.head.appendChild(n);const o=["id"],d=["onMousedown"],r={class:"card-title"},a=(e=>(t.pushScopeId("data-v-5a9c119d"),e=e(),t.popScopeId(),e))((()=>t.createElementVNode("div",{class:"empty-text"},"暂无内容",-1))),i=((e,t)=>{const n=e.__vccOpts||e;for(const[o,d]of t)n[o]=d;return n})(t.defineComponent({name:"CardDragSort",__name:"index",props:{data:{type:Array,required:!0},columns:{type:Number,default:3},width:{type:Number,default:500},height:{type:Number,default:300},columnSpace:{type:Number,default:20},rowSpace:{type:Number,default:20},duration:{type:Number,default:200}},emits:["dragStart","dragStop"],setup(e,{emit:n}){t.useCssVars((e=>({"57911cb1":s.value,f41f9bea:u.value})));const i=n,l=e,c=t.computed((()=>l.data.map(((e,t)=>({index:t,...e}))))),s=t.computed((()=>{const e=c.value.length;return Math.ceil(e/l.columns-1)*(l.height+l.rowSpace)+l.height+"px"})),u=t.computed((()=>l.duration+"ms"));function p(e){return Math.floor(e/l.columns)*(l.height+l.rowSpace)+"px"}function f(e){return e%l.columns*(l.width+l.columnSpace)+"px"}let m,x,v,y,h,g,b,E,S=0,w=0,I=0,k=!0;function _(e){S=v+(e.clientY-h),w=y+(e.clientX-g),m.style.top=S+I+"px",m.style.left=w+"px",E=setTimeout((()=>{!function(e,t){const n=Array.from(L.value.children);for(const o of n){const n=e-parseInt(o.style.top),d=t-parseInt(o.style.left);if(Math.abs(n)<l.height/2&&Math.abs(d)<l.width/2&&x&&o.id!==x.id){const e=c.value.find((e=>o.id===e.id));if(!e||e.id===x.id)return;const t=e.index;let n;n=x.index>e.index?c.value.filter((t=>{if(t.index>=e.index&&t.index<x.index)return t.index+=1,t})):c.value.filter((t=>{if(t.index<=e.index&&t.index>x.index)return t.index-=1,t})),x.index=t;for(const o of n){const e=document.getElementById(o.id);e&&(e.style.top=p(o.index),e.style.left=f(o.index))}}}}(parseInt(m.style.top),parseInt(m.style.left)),clearTimeout(E)}),l.duration)}const L=t.ref();function N(){k=!1,c.value.sort(((e,t)=>e.index-t.index)),i("dragStop",c.value),document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",N),document.removeEventListener("scroll",B),m.style.transition=`all ${u.value}`,m.style.top=v+"px",m.style.left=y+"px",m.style.zIndex="0",m.style.top=p(x.index),m.style.left=f(x.index)}function B(){I=document.documentElement.scrollTop-b,m.style.top=S+I+"px"}function M(){k=!0,this.removeEventListener("transitionend",M)}return(n,l)=>(t.openBlock(),t.createElementBlock("div",{class:"card-drag-sort",ref_key:"cardDrag",ref:L},[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(c.value,(l=>(t.openBlock(),t.createElementBlock("div",{class:"card-wrap",key:l.id,id:l.id,style:t.normalizeStyle({width:`${e.width}px`,height:`${e.height}px`,top:p(l.index),left:f(l.index)})},[t.createElementVNode("div",{class:"card-header",onMousedown:e=>function(e,t){if(!k)return;i("dragStart",t);const n=document.getElementById(t);n&&(m=n,x=c.value.find((e=>e.id===t)),v=parseInt(m.style.top),y=parseInt(m.style.left),m.style.zIndex="100",m.style.transition="none",h=e.clientY,g=e.clientX,b=document.documentElement.scrollTop,document.addEventListener("mousemove",_),document.addEventListener("mouseup",N),document.addEventListener("scroll",B),m.addEventListener("transitionend",M))}(e,l.id)},[t.renderSlot(n.$slots,"header",{card:l},(()=>[t.createElementVNode("div",r,t.toDisplayString(l.title||"无标题"),1)]),!0)],40,d),t.renderSlot(n.$slots,"content",{card:l},(()=>[a]),!0)],12,o)))),128))],512))}}),[["__scopeId","data-v-5a9c119d"]]),l=[i];e.CardDragSort=i,e.default=e=>{l.forEach((t=>{e.component(t.__name,t)}))},Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})}));
