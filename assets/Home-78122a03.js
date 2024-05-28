import{r,o as a,c as N,w as M,a as e,u as V,t as d,R as A,b as i,d as E,e as S,f as _,g as h,v as Z,h as q,n as G,F as C,i as L,j as b,k as m,s as D,l as J}from"./index-9d8f7865.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const K=["src"],O={class:"card-body"},Q={class:"card-title"},X={class:"card-description"},Y={__name:"DrinkCard",props:["product"],setup(g){const n=r(g.product),l=n.value.image,x=l&&l.url?l.url:"/images/placeholder_mug.webp";return(w,y)=>(a(),N(V(A),{class:"card",to:"/drink/"+n.value.id},{default:M(()=>[e("img",{src:V(x),alt:"Product Image",class:"card-image"},null,8,K),e("div",O,[e("h2",Q,d(n.value.name),1),e("p",X,d(n.value.description),1)])]),_:1},8,["to"]))}},ee={class:"card"},se=E('<div class="card-image"><svg class="h-full w-full animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle class="circle stroke-slate-200" cx="12" cy="12" r="10" stroke-width="2" fill="none" stroke-dasharray="31.42" stroke-dashoffset="15.71"></circle></svg></div><div class="card-body animate-pulse"><h2 class="card-title">Loading...</h2><p class="card-description">loading....</p></div>',2),te=[se],le={__name:"Loadingcard",setup(g){return(u,n)=>(a(),i("span",ee,te))}},oe={},ae={xmlns:"http://www.w3.org/2000/svg",class:"ml-2 h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},ne=e("path",{"fill-rule":"evenodd",d:"M9.293 16.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z","clip-rule":"evenodd"},null,-1),re=[ne];function ie(g,u){return a(),i("svg",ae,re)}const j=T(oe,[["render",ie]]),ce={},de={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"h-12 w-12"},ue=e("path",{"fill-rule":"evenodd",d:"M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z","clip-rule":"evenodd"},null,-1),ve=[ue];function fe(g,u){return a(),i("svg",de,ve)}const pe=T(ce,[["render",fe]]),_e={class:"flex w-full justify-center"},he=e("h1",{class:"pb-0"},"Caffeine Critics",-1),me={class:"pt-0"},ge={class:"flex h-full w-full justify-center"},xe={class:"flex h-full w-full flex-col justify-center bg-slate-200 p-2 px-6 xl:w-4/5"},we={class:"flex w-full justify-center"},ke={class:"flex w-full justify-center"},ye={class:"flex w-4/5 justify-center"},$e={class:"z-10 h-0"},Ce={class:"flex justify-end"},be=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"h-6 w-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m4.5 18.75 7.5-7.5 7.5 7.5"}),e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m4.5 12.75 7.5-7.5 7.5 7.5"})],-1),je=[be],Pe=e("h2",null,"Producers",-1),Se={class:"grid grid-cols-4 gap-4"},Le=["onUpdate:modelValue"],De={class:"grid w-full grid-cols-3 gap-4"},Ne={class:"flex justify-start"},Ve={class:"flex justify-center"},ze={class:"flex flex-col justify-center"},Be={class:"flex justify-end"},Fe={class:"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"},Me={class:"grid w-full grid-cols-3 gap-4"},Ae={class:"flex justify-start"},Te={class:"flex justify-center"},Ue={class:"flex flex-col justify-center"},We={class:"flex justify-end"},Re={__name:"Home",setup(g){const u=r([]),n=r(24),l=r(0),x=r(0),w=r(""),y=r(!0),f=r(!1),$=r([]),v=S(()=>Math.max(0,Math.ceil(x.value/n.value)-1)),U=S(()=>l.value*n.value),W=S(()=>(l.value+1)*n.value-1);function I(c){x.value=c,l.value>=v.value&&(l.value=v.value)}async function k(){y.value=!0;let c=$.value.filter(o=>o.isSelected).map(o=>o.id),s=D.from("drinks").select("id, name, description, producer, image( url )").order("name",{ascending:!0}),t=D.from("drinks").select("*",{count:"exact",head:!0});if(c.length>0&&(s=s.in("producer",c),t=t.in("producer",c)),w.value!==""){const F=w.value.split(" ").filter(P=>P!=="").map(P=>P+":*").join(" & ");s=s.textSearch("fts",F),t=t.textSearch("fts",F)}await t.then(o=>{I(o.count)}),s=s.range(U.value,W.value),s.then(o=>{const p=o.data;if(p===null){u.value=[];return}u.value=p,y.value=!1})}function H(){D.from("producers").select("id, name").then(c=>{const s=c.data;if(s===null){$.value=[];return}let t=s.map(o=>({...o,isSelected:!1}));t=t.sort(function(o,p){return o.name.toLowerCase()<p.name.toLowerCase()?-1:o.name.toLowerCase()>p.name.toLowerCase()?1:0}),$.value=t})}function z(){l.value>=v.value||(l.value+=1,k())}function B(){l.value<=0||(l.value-=1,k())}function R(){f.value=!f.value}return H(),k(),(c,s)=>(a(),i(C,null,[e("div",_e,[e("div",null,[he,e("h3",me,"Now having "+d(x.value)+" of drinks",1)])]),e("div",ge,[e("div",xe,[e("div",we,[_(V(A),{class:"button m-4 w-4/5 text-2xl font-bold",to:"/add-drink"},{default:M(()=>[m("Add Drink")]),_:1})]),e("div",ke,[e("div",ye,[h(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=t=>w.value=t),class:"w-5/6 rounded border border-gray-400 px-4 py-2",placeholder:"Search drinks...",onInput:s[1]||(s[1]=t=>k())},null,544),[[Z,w.value]]),_(pe,{class:"ml-2 h-12 w-12 hover:cursor-pointer",onClick:s[2]||(s[2]=t=>R())})])]),f.value?(a(),i("div",{key:0,class:"fixed left-0 right-0 top-0 z-0 h-screen w-screen bg-transparent",onClick:s[3]||(s[3]=t=>f.value=!1)})):q("",!0),e("div",$e,[e("div",{class:G(["static my-2 origin-bottom transform rounded-lg bg-slate-400 duration-500 ease-in-out",f.value?"translate-y-0 p-4":"-translate-y-full scale-y-0"])},[e("div",Ce,[e("div",{onClick:s[4]||(s[4]=t=>f.value=!1)},je)]),Pe,e("div",Se,[(a(!0),i(C,null,L($.value,t=>(a(),i("div",{key:t.id},[e("label",null,[h(e("input",{type:"checkbox",id:"producer.id","onUpdate:modelValue":o=>t.isSelected=o,onChange:s[5]||(s[5]=o=>k())},null,40,Le),[[J,t.isSelected]]),m(" "+d(t.name),1)])]))),128))])],2)]),e("div",De,[e("div",Ne,[h(e("button",{class:"m-2 flex items-center rounded-l-full p-2 px-4",onClick:s[6]||(s[6]=t=>B())},[_(j,{class:"rotate-180"}),m(" Previous page ")],512),[[b,l.value!=0]])]),e("span",Ve,[e("span",ze,d(l.value+1)+" of "+d(v.value+1),1)]),e("div",Be,[h(e("button",{class:"m-2 flex items-center rounded-r-full p-2 px-4",onClick:s[7]||(s[7]=t=>z())},[m(" Next page "),_(j)],512),[[b,l.value<v.value]])])]),e("div",Fe,[y.value?(a(!0),i(C,{key:0},L(n.value,t=>(a(),N(le,{key:t}))),128)):(a(!0),i(C,{key:1},L(u.value,t=>(a(),N(Y,{product:t,key:t.id},null,8,["product"]))),128))]),e("div",Me,[e("div",Ae,[h(e("button",{class:"m-2 flex items-center rounded-l-full p-2 px-4",onClick:s[8]||(s[8]=t=>B())},[_(j,{class:"rotate-180"}),m(" Previous page ")],512),[[b,l.value!=0]])]),e("span",Te,[e("span",Ue,d(l.value+1)+" of "+d(v.value+1),1)]),e("div",We,[h(e("button",{class:"m-2 flex items-center rounded-r-full p-2 px-4",onClick:s[9]||(s[9]=t=>z())},[m(" Next page "),_(j)],512),[[b,l.value<v.value]])])])])])],64))}};export{Re as default};
