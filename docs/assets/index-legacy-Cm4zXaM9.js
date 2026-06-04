(function(){function Qa(p,g){var v=Object.keys(p);if(Object.getOwnPropertySymbols){var w=Object.getOwnPropertySymbols(p);g&&(w=w.filter(function(Q){return Object.getOwnPropertyDescriptor(p,Q).enumerable})),v.push.apply(v,w)}return v}function ve(p){for(var g=1;g<arguments.length;g++){var v=arguments[g]!=null?arguments[g]:{};g%2?Qa(Object(v),!0).forEach(function(w){dn(p,w,v[w])}):Object.getOwnPropertyDescriptors?Object.defineProperties(p,Object.getOwnPropertyDescriptors(v)):Qa(Object(v)).forEach(function(w){Object.defineProperty(p,w,Object.getOwnPropertyDescriptor(v,w))})}return p}function dn(p,g,v){return(g=un(g))in p?Object.defineProperty(p,g,{value:v,enumerable:!0,configurable:!0,writable:!0}):p[g]=v,p}function un(p){var g=pn(p,"string");return typeof g=="symbol"?g:g+""}function pn(p,g){if(typeof p!="object"||!p)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var w=v.call(p,g||"default");if(typeof w!="object")return w;throw new TypeError("@@toPrimitive must return a primitive value.")}return(g==="string"?String:Number)(p)}System.register([],function(p,g){"use strict";var v,w,Q,b,h,ce,de,Ae,M,d,ne,Le,ka,Pa,q,Ie,Ba,ue,H,Te,k,he,P,J,_,Ye,Qe,x,V,ke,z,Ze,Pe,G,pe,Be,Xe,Re,xe,ea,Ra,we,aa,f,S,me,A,L,$,na,oa,ia,ra,sa,oe,ta,N,Ge,Y,Z,$e,ie,re,Ne,Oe,la,ze,xa,De,W,ye,B,qe,je,ge,R,C,u,m,O,c,U,ca,X,Fe,He,da,Ce,D,ua,se,T,I,pa;function Ga(e){h=new WebSocket(v),h.addEventListener("open",e),h.addEventListener("error",()=>Q("error",{type:"network"})),h.addEventListener("close",()=>{ce==="phone"&&Q("disconnected")}),h.addEventListener("message",a=>{let n;try{n=JSON.parse(a.data)}catch{return}mn(n)})}function mn(e){switch(e.type){case"ready":break;case"peer-joined":{const a={id:e.peerId,open:!0};de.set(e.peerId,a),Q("connected",a);break}case"from-peer":{const a=de.get(e.peerId);a&&Q("message",e.payload,a);break}case"peer-left":{const a=de.get(e.peerId);a&&(a.open=!1,de.delete(e.peerId),Q("peer-left",a));break}case"joined":Q("connected");break;case"from-host":Q("message",e.payload);break;case"host-left":Q("disconnected");break;case"error":Q("error",{type:e.error});break}}function ma(e){ce="tv",Ga(()=>h.send(JSON.stringify({type:"host",code:e})))}function ga(e){ce="phone",Ga(()=>h.send(JSON.stringify({type:"join",code:e})))}function Ee(){h&&(h.close(),h=null),ce=null,de.clear(),w.clear()}function $a(){const e=Math.random()<.5,a=[...Array(e?9:8).fill(0),...Array(e?8:9).fill(1),...Array(7).fill(2),...Array(1).fill(3)];for(let i=a.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[a[i],a[r]]=[a[r],a[i]]}const n=[...Pa];for(let i=n.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[n[i],n[r]]=[n[r],n[i]]}const o=n.slice(0,25);return{tiles:a,isTeamOneFirst:e,words:o}}function ba(e){e.animate&&e.animate([{transform:"scale(0.88)",opacity:.6},{transform:"scale(1.06)",opacity:1},{transform:"scale(1)",opacity:1}],{duration:240,easing:"ease-out",fill:"none"})}function be(e){const a=document.createElement("canvas");a.style.cssText="position:fixed;top:0;right:0;bottom:0;left:0;inset:0;width:100%;height:100%;pointer-events:none;z-index:999",document.body.appendChild(a);const n=a.getContext("2d");a.width=window.innerWidth,a.height=window.innerHeight;const i=Array.from({length:120},()=>({x:Math.random()*a.width,y:-20-Math.random()*80,vx:(Math.random()-.5)*4,vy:2+Math.random()*4,rot:Math.random()*Math.PI*2,vrot:(Math.random()-.5)*.2,w:8+Math.random()*8,h:5+Math.random()*5,color:Math.random()<.6?e:"#fbb954",alpha:1}));let r;const l=()=>{n.clearRect(0,0,a.width,a.height);let s=!1;for(const t of i)t.x+=t.vx,t.y+=t.vy,t.vy+=.08,t.rot+=t.vrot,t.y>a.height*.85&&(t.alpha-=.03),!(t.alpha<=0)&&(s=!0,n.save(),n.globalAlpha=t.alpha,n.translate(t.x,t.y),n.rotate(t.rot),n.fillStyle=t.color,n.fillRect(-t.w/2,-t.h/2,t.w,t.h),n.restore());s?r=requestAnimationFrame(l):a.remove()};r=requestAnimationFrame(l),setTimeout(()=>{cancelAnimationFrame(r),a.remove()},4e3)}function y({freq:e=440,end:a,dur:n=.15,vol:o=.28,type:i="sine",at:r=0}){const l=Ba(),s=l.createOscillator(),t=l.createGain();s.connect(t),t.connect(l.destination),s.type=i,s.frequency.setValueAtTime(e,l.currentTime+r),a!=null&&s.frequency.exponentialRampToValueAtTime(a,l.currentTime+r+n),t.gain.setValueAtTime(o,l.currentTime+r),t.gain.exponentialRampToValueAtTime(.001,l.currentTime+r+n),s.start(l.currentTime+r),s.stop(l.currentTime+r+n+.05)}function fa(e){y(e===0?{freq:523,end:659,dur:.12,vol:.25}:e===1?{freq:349,end:440,dur:.12,vol:.25}:e===2?{freq:420,end:400,dur:.09,vol:.12}:{freq:180,end:70,dur:.28,vol:.35,type:"sawtooth"})}function va(){y({freq:420,end:300,dur:.08,vol:.1})}function Na(e){const a=e===0?523:440;[1,1.25,1.5,2,2.5].forEach((n,o)=>y({freq:a*n,dur:.18,vol:.28,at:o*.11}))}function ha(){y({freq:660,end:220,dur:.22,vol:.18,type:"triangle"})}function wa(){y({freq:900,end:750,dur:.06,vol:.14,type:"square"})}function Oa(){y({freq:260,end:140,dur:.35,vol:.28,type:"sawtooth"})}function Je(){y({freq:440,end:523,dur:.13,vol:.22}),y({freq:660,end:784,dur:.22,vol:.3,at:.11})}function za(){y({freq:260,end:140,dur:.3,vol:.22,type:"sawtooth"})}function Me(){y({freq:620,end:520,dur:.04,vol:.09})}function Da(){[523,659,784,1047,784,1047,1319].forEach((e,a)=>y({freq:e,end:e*.96,dur:.22,vol:.3,at:a*.1}))}function ja(){y({freq:480,end:450,dur:.09,vol:.1})}function ya(){y({freq:440,end:560,dur:.12,vol:.14})}function gn(){y({freq:330,end:660,dur:.2,vol:.13,type:"triangle"})}function bn(e){k=null,he=null,P=[],J=null,_=new Array(25).fill(null);const a=Ae();e.innerHTML=`
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Abre la app en tu móvil e ingresa este código:</p>
      <div class="room-code">${a}</div>
      <p id="status" class="status">Esperando al móvil…</p>
    </div>
  `,b("connected",()=>{}),b("peer-left",n=>{n===k&&(k=null),P=P.filter(o=>o!==n),Fa()}),b("message",(n,o)=>{if(n.type==="cs-hello"){fn(o,n.clientId);return}n.type==="board"&&(J=ve({},n),_=new Array(25).fill(null),vn(e,n),P.filter(i=>i.open).forEach(i=>d(i,ve({type:"board-update"},n)))),n.type==="reveal"&&(_[n.index]={color:n.color,tileType:n.tileType},wn(n.index,n.color,n.tileType),P.filter(i=>i.open).forEach(i=>d(i,{type:"reveal",index:n.index,color:n.color}))),n.type==="hide"&&(_[n.index]=null,yn(n.index,n.tileType),P.filter(i=>i.open).forEach(i=>d(i,{type:"hide",index:n.index}))),n.type==="win"&&(qn(n.team,e),P.filter(i=>i.open).forEach(i=>d(i,{type:"win",team:n.team})))}),b("error",n=>{const o=document.getElementById("status");o&&(o.textContent=`Error: ${n.type}`)}),ma(a)}function fn(e,a){var n;const o=a&&a===he,i=!((n=k)!==null&&n!==void 0&&n.open);o||i?(k&&k!==e&&(P.push(k),J?d(k,{type:"sync",role:"spectator",board:J,revealed:_}):d(k,{type:"role",role:"spectator"})),k=e,he=a||he,J?d(e,{type:"sync",role:"captain",board:J,revealed:_}):d(e,{type:"role",role:"captain"})):(P.includes(e)||P.push(e),J?d(e,{type:"sync",role:"spectator",board:J,revealed:_}):d(e,{type:"role",role:"spectator"})),Fa()}function Fa(){var e;const a=document.getElementById("status");if(!a)return;const n=P.filter(i=>i.open).length,o=[];(e=k)!==null&&e!==void 0&&e.open&&o.push("¡Capitán conectado!"),n>0&&o.push(`${n} espectador${n>1?"es":""} conectado${n>1?"s":""}`),a.textContent=o.length?o.join(" · "):"Esperando al móvil…"}function vn(e,a){ue=[];const n=q[a.isTeamOneFirst?0:1];Te=[a.tiles.filter(i=>i===0).length,a.tiles.filter(i=>i===1).length],H=[...Te],e.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${n}22; border-bottom:3px solid ${n}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${q[0]}">${H[0]}</span>
          <span class="counter" id="c1" style="color:${q[1]}">${H[1]}</span>
        </div>
      </div>
      <div class="board tv-board" id="board"></div>
      <div class="team-banner" style="background:${n}22; border-top:3px solid ${n}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.5)">michicho.com</span>
      </div>
    </div>
  `;const o=document.getElementById("board");a.tiles.forEach((i,r)=>{var l;const s=document.createElement("div");s.className="tile tile-neutral",s.innerHTML=`<span class="tile-word">${(l=a.words[r])!==null&&l!==void 0?l:""}</span>`,o.appendChild(s),ue.push(s)}),requestAnimationFrame(()=>ue.forEach(hn))}function hn(e){const a=e.querySelector(".tile-word");if(!a)return;let n=parseFloat(getComputedStyle(a).fontSize);for(;a.scrollWidth>a.clientWidth+1&&n>9;)n-=.5,a.style.fontSize=`${n}px`;a.scrollWidth>a.clientWidth+1&&(a.style.letterSpacing="0"),a.scrollWidth>a.clientWidth+1&&(a.style.whiteSpace="normal")}function wn(e,a,n){const o=ue[e];if(o){if(o.style.background=a,o.dataset.type=n,o.classList.remove("tile-neutral"),o.classList.add("revealed"),n===2){const i=o.querySelector(".tile-word");i&&(i.style.color="rgba(255,255,255,0.92)")}ba(o),fa(n),(n===0||n===1)&&(H[n]=Math.max(0,H[n]-1),Ha(n))}}function yn(e,a){const n=ue[e];if(!n)return;n.style.background="",n.classList.remove("revealed"),n.classList.add("tile-neutral");const o=n.querySelector(".tile-word");o&&(o.style.color=""),va(),(a===0||a===1)&&(H[a]=Math.min(Te[a],H[a]+1),Ha(a))}function Ha(e){const a=document.getElementById(`c${e}`);a&&(a.textContent=H[e])}function qn(e,a){Na(e);const n=q[e],o=e===0?"EQUIPO 1":"EQUIPO 2";be(n);const i=document.createElement("div");i.className="win-overlay",i.innerHTML=`<div class="win-text" style="color:${n}">${o} GANA!</div>`,a.appendChild(i)}function Ve(){try{let l=localStorage.getItem(Ye);if(!l){var e,a,n;l=(e=(a=(n=crypto).randomUUID)===null||a===void 0?void 0:a.call(n))!==null&&e!==void 0?e:`${Date.now()}-${Math.random().toString(36).slice(2)}`,localStorage.setItem(Ye,l)}return l}catch{var o,i,r;return(o=(i=(r=crypto).randomUUID)===null||i===void 0?void 0:i.call(r))!==null&&o!==void 0?o:`${Date.now()}-${Math.random().toString(36).slice(2)}`}}function qa(e){sessionStorage.setItem(Qe,JSON.stringify(ve(ve({},e),{},{savedAt:Date.now()})))}function Ca(){try{const e=sessionStorage.getItem(Qe);return e?JSON.parse(e):null}catch{return null}}function We(){sessionStorage.removeItem(Qe)}function Cn(e){G=e,En(),e.innerHTML=`
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Ingresa el código de 4 dígitos que aparece en el televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric"
             pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONECTAR</button>
      <p id="status" class="status"></p>
    </div>
  `;const a=document.getElementById("code-input"),n=document.getElementById("connect-btn"),o=document.getElementById("status"),i=()=>{const r=a.value.trim();if(r.length!==4){o.textContent="Ingresa el código de 4 dígitos completo";return}n.disabled=!0,o.textContent="Conectando…",Ja(r)};n.onclick=i,a.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function Ja(e){Be=e,qa({mode:"cs",code:e}),Ee(),b("connected",()=>{const a=document.getElementById("status");a&&(a.textContent="Conectado, esperando…"),M({type:"cs-hello",clientId:Ve()})}),b("message",a=>{a.type==="role"&&(a.role==="captain"&&Ue(G),a.role==="spectator"&&Ea(G,null,[])),a.type==="sync"&&(a.role==="captain"&&Ue(G,a.board,a.revealed),a.role==="spectator"&&Ea(G,a.board,a.revealed)),a.type==="board-update"&&Ea(G,a,new Array(25).fill(null)),a.type==="reveal"&&Wa(a.index,a.color),a.type==="hide"&&An(a.index),a.type==="win"&&Ln(a.team,G)}),b("error",a=>{const n=document.getElementById("status"),o=document.getElementById("connect-btn");n&&(n.textContent=a.type==="peer-unavailable"?"❌ Código incorrecto — revisa el televisor":`❌ ${a.type}`),o&&(o.disabled=!1)}),ga(e)}function En(){if(Xe)return;Xe=!0;const e=()=>{if(document.visibilityState!=="visible"||!Be)return;const a=Ca();a?.mode==="cs"&&(Le()||Ja(Be))};document.addEventListener("visibilitychange",e),window.addEventListener("focus",e),window.addEventListener("online",e)}function Ue(e,a=null,n=null){G=e,x=a||$a(),Pe=!1,ke=[],V=n?n.map(r=>r!==null):new Array(25).fill(!1),Ze=[x.tiles.filter(r=>r===0).length,x.tiles.filter(r=>r===1).length],z=[x.tiles.filter((r,l)=>r===0&&!V[l]).length,x.tiles.filter((r,l)=>r===1&&!V[l]).length];const o=q[x.isTeamOneFirst?0:1];e.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${o}22; border-bottom:3px solid ${o}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${q[0]}">${z[0]}</span>
          <span class="counter" id="c1" style="color:${q[1]}">${z[1]}</span>
        </div>
      </div>
      <div class="board phone-board" id="board"></div>
      <div class="team-banner" style="background:${o}22; border-top:3px solid ${o}">
        <button class="new-board-btn" id="new-board-btn">NUEVO TABLERO</button>
      </div>
    </div>
  `;const i=document.getElementById("board");x.tiles.forEach((r,l)=>{var s;const t=document.createElement("div");t.className="tile",t.dataset.type=r,t.style.background=q[r],t.innerHTML=`<span class="tile-word">${(s=x.words[l])!==null&&s!==void 0?s:""}</span>`,t.addEventListener("click",()=>Mn(l,t)),V[l]&&t.classList.add("checked"),i.appendChild(t),ke.push(t)}),requestAnimationFrame(()=>ke.forEach(Ua)),a||M(ve({type:"board"},x)),document.getElementById("new-board-btn").addEventListener("click",()=>{confirm("¿Generar un nuevo tablero? Esto reinicia el televisor también.")&&(ha(),Ue(e))})}function Mn(e,a){if(Pe)return;V[e]=!V[e],a.classList.toggle("checked",V[e]);const n=x.tiles[e];V[e]?(ba(a),fa(n),M({type:"reveal",index:e,color:q[n],tileType:n}),(n===0||n===1)&&(z[n]=Math.max(0,z[n]-1),Va(n),Sn(n))):(va(),M({type:"hide",index:e,tileType:n}),(n===0||n===1)&&(z[n]=Math.min(Ze[n],z[n]+1),Va(n)))}function Va(e){const a=document.getElementById(`c${e}`);a&&(a.textContent=z[e])}function Sn(e){if(z[e]>0)return;Pe=!0,Na(e),be(q[e]),M({type:"win",team:e});const a=document.createElement("div");a.className="win-overlay";const n=e===0?"EQUIPO 1":"EQUIPO 2";a.innerHTML=`
    <div class="win-text" style="color:${q[e]}">${n} GANA!</div>
    <button class="btn" id="win-new-btn">NUEVA PARTIDA</button>
  `,G.appendChild(a),document.getElementById("win-new-btn").addEventListener("click",()=>{ha(),Ue(G)})}function Ea(e,a,n){if(pe=[],!a){e.innerHTML=`
      <div class="scene">
        <h1 class="title">CODIGO</h1>
        <p class="label" style="opacity:0.6">Esperando tablero…</p>
      </div>
    `;return}const o=q[a.isTeamOneFirst?0:1];e.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${o}22; border-bottom:3px solid ${o}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.45)">ESPECTADOR</span>
      </div>
      <div class="board phone-board" id="spec-board"></div>
      <div class="team-banner" style="background:${o}22; border-top:3px solid ${o}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.3); font-size:0.85rem">michicho.com</span>
      </div>
    </div>
  `;const i=document.getElementById("spec-board");a.tiles.forEach((r,l)=>{var s;const t=document.createElement("div");t.className="tile tile-neutral",t.innerHTML=`<span class="tile-word">${(s=a.words[l])!==null&&s!==void 0?s:""}</span>`,i.appendChild(t),pe.push(t)}),requestAnimationFrame(()=>pe.forEach(Ua)),n.forEach((r,l)=>{r&&Wa(l,r.color)})}function Wa(e,a){const n=pe[e];n&&(n.style.background=a,n.classList.remove("tile-neutral"),n.classList.add("revealed"))}function An(e){const a=pe[e];a&&(a.style.background="",a.classList.remove("revealed"),a.classList.add("tile-neutral"))}function Ln(e,a){const n=q[e],o=e===0?"EQUIPO 1":"EQUIPO 2";be(n);const i=document.createElement("div");i.className="win-overlay",i.innerHTML=`<div class="win-text" style="color:${n}">${o} GANA!</div>`,a.appendChild(i)}function Ua(e){const a=e.querySelector(".tile-word");if(!a)return;let n=parseFloat(getComputedStyle(a).fontSize);for(;a.scrollWidth>a.clientWidth+1&&n>9;)n-=.5,a.style.fontSize=`${n}px`;a.scrollWidth>a.clientWidth+1&&(a.style.letterSpacing="0"),a.scrollWidth>a.clientWidth+1&&(a.style.whiteSpace="normal")}function Se(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ka(e){const a=[...e];for(let n=a.length-1;n>0;n--){const o=Math.floor(Math.random()*(n+1));[a[n],a[o]]=[a[o],a[n]]}return a}function In(e,a){we=e,aa=a,f=new Map,S=-1,$="lobby",A&&(clearInterval(A),A=null),L=Ka(Re).slice(0,ea);const n=Ae();ra=n,e.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <div class="room-code">${n}</div>
      <p class="label">Únete desde tu móvil e ingresa este código</p>
      <div id="player-list" class="trivia-player-list"></div>
      <button class="btn" id="start-btn" disabled>EMPEZAR</button>
    </div>
  `,document.getElementById("start-btn").focus(),b("connected",()=>{}),b("peer-left",o=>{if($==="lobby"){for(const[i,r]of f)if(r.conn===o){f.delete(i);break}Ma()}else{for(const i of f.values())if(i.conn===o){i.conn=null;break}Ke()}}),b("message",(o,i)=>{o.type==="trivia-join"&&Tn(i,o),o.type==="trivia-answer"&&Rn(o)}),document.getElementById("start-btn").addEventListener("click",kn),ma(n)}function Tn(e,a){const n=a.clientId;if(!n)return;const o=f.get(n);if(o){o.conn=e,o.name=a.name||o.name,_a(e,o);return}if($!=="lobby"){f.set(n,{name:a.name,score:0,answered:!1,conn:e}),_a(e,f.get(n)),ya();return}f.set(n,{name:a.name,score:0,answered:!1,conn:e}),d(e,{type:"trivia-waiting"}),ya(),Ma()}function _a(e,a){if($==="lobby"){d(e,{type:"trivia-waiting"}),Ma();return}if($==="question"){const n=L[S],o=Date.now()-ia,i=Math.max(0,sa-o);d(e,{type:"trivia-question",index:S,total:L.length,q:n.q,options:n.options,answer:n.answer,remainingMs:i,myScore:a.score,alreadyAnswered:a.answered}),me&&d(e,{type:"trivia-reveal",correctIndex:n.answer,scores:Qn()}),Ke();return}if($==="interlude"){d(e,{type:"trivia-interlude",scores:na,myScore:a.score});return}if($==="end"){d(e,{type:"trivia-end",scores:oa});return}}function Qn(){return[...f.values()].map(e=>({name:e.name,score:e.score}))}function Ma(){const e=document.getElementById("player-list");if(!e)return;e.innerHTML=[...f.values()].map(o=>`<span class="player-chip">${Se(o.name)}</span>`).join("");const a=document.getElementById("start-btn");if(!a)return;const n=a.disabled;a.disabled=f.size===0,n&&!a.disabled&&a.focus()}function kn(){f.forEach(e=>{e.score=0}),ne({type:"trivia-start",total:L.length}),S=-1,Sa()}function Sa(){if(S++,me=!1,S>=L.length){Za();return}f.forEach(a=>{a.answered=!1}),$="question",ia=Date.now();const e=L[S];gn(),Pn(e,S),ne({type:"trivia-question",index:S,total:L.length,q:e.q,options:e.options,answer:e.answer,remainingMs:sa}),Bn()}function Pn(e,a){const n="background:rgba(46,95,168,0.12);";we.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="${n}border-bottom:3px solid var(--accent);justify-content:space-between">
        <span class="trivia-tv-progress">${a+1} / ${L.length}</span>
        <span class="trivia-tv-timer" id="tv-timer">${xe}</span>
      </div>
      <div class="trivia-tv-body">
        <div class="trivia-tv-question">${e.q}</div>
        <div class="trivia-tv-options">
          ${e.options.map((o,i)=>`
            <div class="trivia-tv-option" id="opt-${i}">
              <span class="trivia-opt-label">${Ra[i]}</span>
              <span class="trivia-opt-text">${o}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="team-banner" style="${n}border-top:3px solid var(--accent)">
        <div id="tv-players" class="trivia-tv-players"></div>
      </div>
    </div>
  `,Ke()}function Bn(){let e=xe;A=setInterval(()=>{e--;const a=document.getElementById("tv-timer");a&&(a.textContent=e,a.className="trivia-tv-timer"+(e<=3?" timer-urgent":"")),e>0&&e<=3&&wa(),e<=0&&(clearInterval(A),A=null,Oa(),Ya())},1e3)}function Rn(e){const a=f.get(e.clientId);if(!a||a.answered||e.questionIndex!==S)return;a.answered=!0;const n=e.answerIndex===L[S].answer;n&&a.score++,a.conn&&d(a.conn,{type:"trivia-feedback",correct:n}),Ke(),[...f.values()].every(o=>o.answered)&&(clearInterval(A),A=null,Ya())}function Ke(){const e=document.getElementById("tv-players");e&&(e.innerHTML=[...f.values()].map(a=>`<span class="player-dot ${a.answered?"dot-answered":""}">${Se(a.name)}</span>`).join(""))}function Ya(){if(me)return;me=!0;const e=L[S].answer;document.querySelectorAll(".trivia-tv-option").forEach((n,o)=>{n.classList.add(o===e?"opt-correct":"opt-wrong")}),Je();const a=[...f.values()].map(n=>({name:n.name,score:n.score}));ne({type:"trivia-reveal",correctIndex:e,scores:a}),setTimeout(()=>xn(a),2500)}function xn(e){const a=S<L.length-1,n=[...e].sort((o,i)=>i.score-o.score);if($="interlude",na=n,we.innerHTML=`
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${n.map((o,i)=>`
          <div class="score-row">
            <span class="score-rank">${i+1}</span>
            <span class="score-name">${Se(o.name)}</span>
            <span class="score-pts">${o.score}</span>
          </div>
        `).join("")}
      </div>
      ${a?'<p class="label" style="margin-top:16px;opacity:0.6">Siguiente en <span id="interlude-count">3</span>…</p>':""}
    </div>
  `,a){ne({type:"trivia-interlude",scores:n});let o=3;A=setInterval(()=>{o--,ja();const i=document.getElementById("interlude-count");i&&(i.textContent=o),o<=0&&(clearInterval(A),A=null,Sa())},1e3)}else setTimeout(Za,1500)}function Za(){var e,a;const n=[...f.values()].map(s=>({name:s.name,score:s.score})).sort((s,t)=>t.score-s.score);$="end",oa=n;const o=(e=(a=n[0])===null||a===void 0?void 0:a.score)!==null&&e!==void 0?e:0,i=n.filter(s=>s.score===o&&o>0),l=i.length>1?"EMPATE":i.length?"GANADOR":"FIN";Da(),be(n[0]?"#2e5fa8":"#a78bfa"),we.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">${l}</h1>
      ${i.length?i.map(s=>`<div class="winner-name">${Se(s.name)}</div>`).join(""):'<div class="winner-name">—</div>'}
      <div class="trivia-scoreboard" style="margin-top:24px">
        ${n.map((s,t)=>`
          <div class="score-row">
            <span class="score-rank">${t+1}</span>
            <span class="score-name">${Se(s.name)}</span>
            <span class="score-pts">${s.score} / ${L.length}</span>
          </div>
        `).join("")}
      </div>
      <div class="end-join-block">
        <span class="end-join-label">¿Quieres jugar? Únete con</span>
        <span class="end-join-code">${ra}</span>
      </div>
      <div class="end-btn-row">
        <button class="btn" id="again-btn">JUGAR DE NUEVO</button>
        <button class="btn" id="menu-btn">MENÚ PRINCIPAL</button>
      </div>
    </div>
  `,ne({type:"trivia-end",scores:n}),document.getElementById("again-btn").focus(),document.getElementById("again-btn").onclick=()=>Gn(),document.getElementById("menu-btn").onclick=()=>{var s;return(s=aa)===null||s===void 0?void 0:s()}}function Gn(){me=!1,A&&(clearInterval(A),A=null),L=Ka(Re).slice(0,ea),f.forEach(e=>{e.score=0,e.answered=!1}),ne({type:"trivia-start",total:L.length}),S=-1,Sa()}function $n(e,a){oe=e,ta=a,Z=0,$e=0,Y=!1,fe(),Nn(),On(e)}function Nn(){if(la)return;la=!0;const e=()=>{if(document.visibilityState!=="visible"||!Ge||!N)return;const a=Ca();a?.mode==="trivia"&&(Le()||Xa(Ge,N))};document.addEventListener("visibilitychange",e),window.addEventListener("focus",e),window.addEventListener("online",e)}function fe(){ie&&(clearInterval(ie),ie=null),re&&(clearInterval(re),re=null)}function On(e){e.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">Código del televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <input id="name-input" type="text" maxlength="14" placeholder="Tu nombre" class="name-input" autocomplete="off" spellcheck="false">
      <button class="btn" id="join-btn">UNIRSE</button>
      <p id="status" class="status"></p>
    </div>
  `;const a=()=>{const n=document.getElementById("code-input").value.trim(),o=document.getElementById("name-input").value.trim(),i=document.getElementById("status");if(n.length!==4){i.textContent="Ingresa el código de 4 dígitos";return}if(!o){i.textContent="Ingresa tu nombre";return}document.getElementById("join-btn").disabled=!0,i.textContent="Conectando…",Xa(n,o)};document.getElementById("join-btn").onclick=a,document.getElementById("name-input").addEventListener("keydown",n=>{n.key==="Enter"&&a()})}function Xa(e,a){Ge=e,N=a,qa({mode:"trivia",code:e,name:a}),Ee(),b("connected",()=>{M({type:"trivia-join",name:N,clientId:Ve()})}),b("message",n=>{n.type==="trivia-waiting"&&en(oe),n.type==="trivia-start"&&($e=n.total,Z=0,en(oe)),n.type==="trivia-question"&&zn(oe,n),n.type==="trivia-feedback"&&Dn(n.correct),n.type==="trivia-reveal"&&jn(n.correctIndex),n.type==="trivia-interlude"&&Fn(oe,n),n.type==="trivia-end"&&Hn(oe,n.scores)}),b("error",n=>{const o=document.getElementById("status");o&&(o.textContent=n.type==="peer-unavailable"?"❌ Código incorrecto — revisa el televisor":`❌ ${n.type}`);const i=document.getElementById("join-btn");i&&(i.disabled=!1)}),ga(e)}function en(e){fe(),e.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">¡Conectado como <strong style="color:#fff">${N}</strong>!</p>
      <p class="label" style="opacity:0.45;margin-top:4px">Esperando que el televisor empiece…</p>
    </div>
  `}function zn(e,a){Y=!!a.alreadyAnswered,Oe=-1,Ne=a.answer,typeof a.myScore=="number"&&(Z=a.myScore),fe();const n="background:rgba(46,95,168,0.12);";e.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner trivia-safe-top" style="${n}border-bottom:3px solid var(--accent);justify-content:space-between">
        <span class="trivia-phone-progress">${a.index+1} / ${a.total}</span>
        <span class="trivia-phone-score" id="phone-score">${Z} pts</span>
        <span class="trivia-phone-timer" id="phone-timer">15</span>
      </div>
      <div class="trivia-phone-body">
        <div class="trivia-phone-question">${a.q}</div>
        <div class="trivia-phone-options">
          ${a.options.map((s,t)=>`
            <button class="trivia-phone-option" data-idx="${t}">${s}</button>
          `).join("")}
        </div>
        <div id="phone-status" class="trivia-phone-status"></div>
      </div>
    </div>
  `,document.querySelectorAll(".trivia-phone-option").forEach(s=>{if(Y){s.disabled=!0;return}s.addEventListener("click",()=>{if(Y)return;Y=!0,Me(),fe();const t=parseInt(s.dataset.idx);Oe=t,M({type:"trivia-answer",answerIndex:t,questionIndex:a.index,clientId:Ve()}),document.querySelectorAll(".trivia-phone-option").forEach(F=>{F.disabled=!0}),s.style.outline="4px solid white",s.style.outlineOffset="-4px",document.getElementById("phone-status").textContent="¡Respuesta enviada!"})});const o=document.getElementById("phone-score");o&&(o.textContent=`${Z} pts`),Y&&(document.getElementById("phone-status").textContent="¡Respuesta enviada!");const i=typeof a.remainingMs=="number"?a.remainingMs:15e3;let r=Math.max(0,Math.ceil(i/1e3));const l=document.getElementById("phone-timer");l&&(l.textContent=r),ie=setInterval(()=>{r--,l&&(l.textContent=r,r<=3&&(l.className="trivia-phone-timer timer-urgent")),r<=0&&(clearInterval(ie),ie=null)},1e3)}function Dn(e){e&&Z++;const a=document.getElementById("phone-status");a&&(a.textContent=e?"✓ ¡Correcto!":"✗ Incorrecto",a.style.color=e?"#4ade80":"#f87171");const n=document.getElementById("phone-score");n&&(n.textContent=`${Z} pts`),document.querySelectorAll(".trivia-phone-option").forEach(o=>{const i=parseInt(o.dataset.idx);o.style.outline="",o.style.outlineOffset="",i===Ne?o.classList.add("opt-correct"):i===Oe?o.classList.add("opt-mine-wrong"):o.classList.add("opt-wrong")}),e?Je():za()}function jn(e){if(Y)return;Ne=e,document.querySelectorAll(".trivia-phone-option").forEach(n=>{const o=parseInt(n.dataset.idx);n.disabled=!0,o===e?n.classList.add("opt-correct"):n.classList.add("opt-wrong")});const a=document.getElementById("phone-status");a&&(a.textContent="⏱ Tiempo agotado",a.style.color="#f87171")}function Fn(e,a){fe();const n=a.scores;e.innerHTML=`
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${n.map((i,r)=>`
          <div class="score-row ${i.name===N?"score-row-me":""}">
            <span class="score-rank">${r+1}</span>
            <span class="score-name">${i.name}</span>
            <span class="score-pts">${i.score}</span>
          </div>
        `).join("")}
      </div>
      <p class="label" style="margin-top:16px;opacity:0.6">Siguiente en <span id="phone-interlude-count">3</span>…</p>
    </div>
  `;let o=3;re=setInterval(()=>{o--,ja();const i=document.getElementById("phone-interlude-count");i&&(i.textContent=o),o<=0&&(clearInterval(re),re=null)},1e3)}function Hn(e,a){var n,o,i;fe();const r=a.find(E=>E.name===N),l=a.findIndex(E=>E.name===N)+1,s=(n=(o=a[0])===null||o===void 0?void 0:o.score)!==null&&n!==void 0?n:0,t=a.filter(E=>E.score===s&&s>0),F=t.some(E=>E.name===N),ln=t.length>1;F&&be("#2e5fa8");let _e;F&&ln?_e='<h1 class="title" style="font-size:2rem">🏆 ¡EMPATE!</h1>':F?_e='<h1 class="title" style="font-size:2rem">🏆 ¡GANASTE!</h1>':_e='<h1 class="title" style="font-size:1.6rem;opacity:0.7">FIN</h1>';let cn="";!F&&t.length&&(cn=`
      <div style="text-align:center;margin-top:-4px">
        <div style="font-size:0.85rem;letter-spacing:0.1em;color:rgba(255,255,255,0.45);font-weight:700">${ln?"GANADORES":"GANADOR"}</div>
        <div class="winner-name" style="font-size:clamp(1.4rem,5vw,2.4rem);margin-top:2px">
          ${t.map(Ta=>Ta.name).join(" · ")}
        </div>
      </div>
    `),e.innerHTML=`
    <div class="scene">
      ${_e}
      ${cn}
      <div class="trivia-my-score">
        <div class="trivia-my-score-num">${(i=r?.score)!==null&&i!==void 0?i:0}</div>
        <div class="trivia-my-score-label">de ${$e} correctas</div>
        <div class="trivia-my-score-rank">Puesto ${l} de ${a.length}</div>
      </div>
      <div class="trivia-scoreboard">
        ${a.map((E,Ta)=>`
          <div class="score-row ${E.name===N?"score-row-me":""}">
            <span class="score-rank">${Ta+1}</span>
            <span class="score-name">${E.name}</span>
            <span class="score-pts">${E.score}</span>
          </div>
        `).join("")}
      </div>
      <button class="btn" id="menu-btn" style="margin-top:16px">MENÚ PRINCIPAL</button>
    </div>
  `,document.getElementById("menu-btn").onclick=()=>{var E;We(),(E=ta)===null||E===void 0||E()}}function te(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Jn(e,a){W=e,ye=a,an(),B=null,qe=null,c="lobby",U=Ae(),rn(),b("connected",()=>{}),b("peer-left",n=>{n===B&&(B=null,C&&(clearInterval(C),C=null),ro())}),b("message",(n,o)=>{if(n.type==="mimica-hello")return Vn(o,n.clientId);if(n.type==="mimica-setup-teams")return Wn(n.count);if(n.type==="mimica-begin-turn")return Un();if(n.type==="mimica-correct")return Kn();if(n.type==="mimica-skip")return _n();if(n.type==="mimica-next-team")return Yn();if(n.type==="mimica-restart")return Zn()}),ma(U)}function an(){C&&(clearInterval(C),C=null),je="",ge=new Set,u=[],m=0,O=0,R=0}function Vn(e,a){var n;const o=a&&a===qe,i=!((n=B)!==null&&n!==void 0&&n.open);o||i?(B=e,qe=a||qe,ya(),c==="lobby"&&(c="setup"),c==="playing"&&!C&&nn(),K(),le()):d(e,{type:"mimica-rejected",reason:"captain-taken"})}function K(){B&&(c==="setup"?d(B,{type:"mimica-setup-needed"}):c==="turn-ready"?d(B,{type:"mimica-turn-ready",teams:u,currentTeamIdx:m}):c==="playing"?d(B,{type:"mimica-word",word:je,remaining:R,aciertosThisTurn:O,teams:u,currentTeamIdx:m}):c==="turn-end"?d(B,{type:"mimica-turn-end",teams:u,currentTeamIdx:m,aciertosThisTurn:O,hasMore:m<u.length-1}):c==="game-end"&&d(B,{type:"mimica-game-end",teams:u}))}function Wn(e){if(c!=="setup")return;const a=Math.max(2,Math.min(6,Number(e)||0));u=Array.from({length:a},(n,o)=>({name:`Equipo ${o+1}`,score:0})),m=0,O=0,c="turn-ready",K(),le()}function Un(){c==="turn-ready"&&(O=0,R=xa,c="playing",Aa(),nn(),K(),le())}function Kn(){c==="playing"&&(O++,u[m].score++,Je(),Aa(),K(),sn())}function _n(){c==="playing"&&(Aa(),K(),sn())}function Yn(){if(c==="turn-end"){if(m>=u.length-1){Xn();return}m++,O=0,c="turn-ready",K(),le()}}function Zn(){c==="game-end"&&(an(),c="setup",K(),le())}function Aa(){ge.size>=ze.length&&ge.clear();let e;do e=ze[Math.floor(Math.random()*ze.length)];while(ge.has(e));ge.add(e),je=e}function nn(){C&&clearInterval(C),C=setInterval(()=>{R--;const e=document.getElementById("mimica-timer");e&&(e.textContent=R,e.className="mimica-timer"+(R<=5?" timer-urgent":"")),R>0&&R<=5&&wa(),R<=0&&(clearInterval(C),C=null,Oa(),c="turn-end",K(),le())},1e3)}function Xn(){var e;c="game-end",C&&(clearInterval(C),C=null),Da();const a=[...u].sort((n,o)=>o.score-n.score);be((e=De[u.indexOf(a[0])])!==null&&e!==void 0?e:"#2e5fa8"),K(),le()}function le(){if(c==="lobby")return rn();if(c==="setup")return eo();if(c==="turn-ready")return ao();if(c==="playing")return no();if(c==="turn-end")return oo();if(c==="game-end")return io()}function ee(e){return De[e%De.length]}function on(e=-1){return`
    <div class="mimica-scoreboard">
      ${u.map((a,n)=>`
        <div class="mimica-score-row ${n===e?"mimica-score-row-current":""}"
             style="--team-color:${ee(n)}">
          <span class="mimica-score-dot"></span>
          <span class="mimica-score-name">${te(a.name)}</span>
          <span class="mimica-score-pts">${a.score}</span>
        </div>
      `).join("")}
    </div>
  `}function rn(){W.innerHTML=`
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">Conecta tu móvil con este código:</p>
      <div class="room-code">${U}</div>
      <p class="status">Esperando al capitán…</p>
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `,document.getElementById("menu-btn").onclick=()=>{var e;return(e=ye)===null||e===void 0?void 0:e()}}function eo(){W.innerHTML=`
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">¡Capitán conectado!</p>
      <p class="status" style="margin-top:8px">Esperando que elija la cantidad de equipos…</p>
      <div class="end-join-block" style="margin-top:32px">
        <span class="end-join-label">Otro capitán puede entrar con</span>
        <span class="end-join-code">${U}</span>
      </div>
    </div>
  `}function ao(){const e=u[m];W.innerHTML=`
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-code">${U}</span>
        <span class="mimica-progress">Turno ${m+1} / ${u.length}</span>
      </div>
      <div class="mimica-ready-center">
        <div class="mimica-ready-label">TURNO DEL</div>
        <div class="mimica-ready-team" style="color:${ee(m)}">${te(e.name)}</div>
        <div class="mimica-ready-help">Pasa el móvil al capitán de este equipo</div>
      </div>
      <div class="mimica-foot">${on(m)}</div>
    </div>
  `}function no(){const e=u[m];W.innerHTML=`
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-team-tag" style="background:${ee(m)}22;color:${ee(m)}">${te(e.name)}</span>
        <span class="mimica-aciertos">Aciertos: <strong id="mimica-aciertos">${O}</strong></span>
      </div>
      <div class="mimica-timer-wrap">
        <div class="mimica-timer-label">SEGUNDOS</div>
        <div class="mimica-timer${R<=5?" timer-urgent":""}" id="mimica-timer">${R}</div>
      </div>
      <div class="mimica-foot">¡A actuar! El capitán ve la palabra.</div>
    </div>
  `}function sn(){const e=document.getElementById("mimica-aciertos");e&&(e.textContent=O)}function oo(){const e=u[m],a=m>=u.length-1;W.innerHTML=`
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-code">${U}</span>
        <span class="mimica-progress">Turno ${m+1} / ${u.length}</span>
      </div>
      <div class="mimica-turnend-center">
        <div class="mimica-timeup-flash">¡TIEMPO!</div>
        <div class="mimica-turnend-team" style="color:${ee(m)}">${te(e.name)}</div>
        <div class="mimica-turnend-stat">+${O} <span style="opacity:0.55;font-size:0.5em">aciertos</span></div>
      </div>
      <div class="mimica-foot">
        ${on(m)}
        <p style="margin-top:14px;opacity:0.6;font-weight:700">${a?"Esperando a ver el ganador…":"Esperando al siguiente equipo…"}</p>
      </div>
    </div>
  `}function io(){var e,a;const n=[...u].sort((s,t)=>t.score-s.score),o=(e=(a=n[0])===null||a===void 0?void 0:a.score)!==null&&e!==void 0?e:0,i=n.filter(s=>s.score===o&&o>0),l=i.length>1?"EMPATE":i.length?"GANA":"FIN";W.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">${l}</h1>
      ${i.length?i.map(s=>`<div class="winner-name" style="color:${ee(u.indexOf(s))}">${te(s.name)}</div>`).join(""):'<div class="winner-name">—</div>'}
      <div class="mimica-scoreboard" style="margin-top:24px;max-width:520px;width:100%">
        ${n.map(s=>{const t=u.indexOf(s);return`
          <div class="mimica-score-row" style="--team-color:${ee(t)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${te(s.name)}</span>
            <span class="mimica-score-pts">${s.score}</span>
          </div>`}).join("")}
      </div>
      <div class="end-join-block">
        <span class="end-join-label">¿Quieres jugar? Únete con</span>
        <span class="end-join-code">${U}</span>
      </div>
      <button class="btn" id="menu-btn" style="margin-top:8px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `,document.getElementById("menu-btn").onclick=()=>{var s;return(s=ye)===null||s===void 0?void 0:s()}}function ro(){W.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:1.8rem">CAPITÁN DESCONECTADO</h1>
      <p class="label">Esperando reconexión…</p>
      <div class="room-code" style="font-size:clamp(3rem,12vw,6rem)">${U}</div>
      ${u.length?`<div class="mimica-scoreboard" style="margin-top:16px;max-width:420px;width:100%">
        ${u.map((e,a)=>`
          <div class="mimica-score-row" style="--team-color:${ee(a)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${te(e.name)}</span>
            <span class="mimica-score-pts">${e.score}</span>
          </div>
        `).join("")}
      </div>`:""}
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `,document.getElementById("menu-btn").onclick=()=>{var e;return(e=ye)===null||e===void 0?void 0:e()}}function so(e,a){X=e,Fe=a,to(),lo(e)}function to(){if(da)return;da=!0;const e=()=>{if(document.visibilityState!=="visible"||!He)return;const a=Ca();a?.mode==="mimica"&&(Le()||tn(He))};document.addEventListener("visibilitychange",e),window.addEventListener("focus",e),window.addEventListener("online",e)}function j(e){return ca[e%ca.length]}function lo(e){e.innerHTML=`
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">Ingresa el código del televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONECTAR</button>
      <p id="status" class="status"></p>
    </div>
  `;const a=document.getElementById("code-input"),n=document.getElementById("connect-btn"),o=document.getElementById("status"),i=()=>{const r=a.value.trim();if(r.length!==4){o.textContent="Ingresa el código de 4 dígitos";return}n.disabled=!0,o.textContent="Conectando…",tn(r)};n.onclick=i,a.addEventListener("keydown",r=>{r.key==="Enter"&&i()})}function tn(e){He=e,qa({mode:"mimica",code:e}),Ee(),ae(),b("connected",()=>{M({type:"mimica-hello",clientId:Ve()})}),b("message",a=>{if(a.type==="mimica-setup-needed")return co();if(a.type==="mimica-turn-ready")return uo(a);if(a.type==="mimica-word")return po(a);if(a.type==="mimica-turn-end")return bo(a);if(a.type==="mimica-game-end")return fo(a);if(a.type==="mimica-rejected")return vo()}),b("error",a=>{const n=document.getElementById("status");n&&(n.textContent=a.type==="peer-unavailable"?"❌ Código incorrecto — revisa el televisor":`❌ ${a.type}`);const o=document.getElementById("connect-btn");o&&(o.disabled=!1)}),ga(e)}function co(){ae(),X.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem">¿CUÁNTOS EQUIPOS?</h1>
      <p class="label">Cada equipo tiene 90 segundos para adivinar la mayor cantidad de películas.</p>
      <div class="mimica-setup-grid">
        ${[2,3,4,5,6].map(e=>`<button class="btn mimica-setup-btn" data-n="${e}">${e}</button>`).join("")}
      </div>
    </div>
  `,document.querySelectorAll(".mimica-setup-btn").forEach(e=>{e.onclick=()=>{Me(),M({type:"mimica-setup-teams",count:parseInt(e.dataset.n)})}})}function uo(e){ae(),T=e.teams,I=e.currentTeamIdx;const a=T[I];X.innerHTML=`
    <div class="scene">
      <p class="mimica-ready-label" style="font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.55)">TURNO DEL</p>
      <h1 class="title" style="font-size:clamp(2.4rem,10vw,4rem);color:${j(I)};margin:8px 0 16px">${a.name}</h1>
      <p class="label">Cuando estés listo, presiona EMPEZAR. Tendrás 90 segundos.</p>
      <button class="btn" id="begin-btn" style="margin-top:24px;background:${j(I)};color:#fff">EMPEZAR</button>
      <div class="mimica-mini-scoreboard">
        ${T.map((o,i)=>`
          <div class="mimica-mini-row ${i===I?"mimica-mini-row-current":""}" style="--team-color:${j(i)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${o.name}</span>
            <span class="mimica-score-pts">${o.score}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;const n=document.getElementById("begin-btn");n.focus(),n.onclick=()=>{Me(),M({type:"mimica-begin-turn"})}}function po(e){ua=e.word,D=e.remaining,se=e.aciertosThisTurn,T=e.teams,I=e.currentTeamIdx,mo(),go()}function mo(){const e=T[I];X.innerHTML=`
    <div class="scene mimica-phone-scene">
      <div class="mimica-phone-top" style="border-bottom-color:${j(I)}55">
        <span class="mimica-team-tag" style="background:${j(I)}22;color:${j(I)}">${e.name}</span>
        <span class="mimica-phone-aciertos">Aciertos: <strong id="phone-aciertos">${se}</strong></span>
        <span class="mimica-phone-timer${D<=5?" timer-urgent":""}" id="mimica-phone-timer">${D}s</span>
      </div>
      <div class="mimica-word-wrap">
        <div class="mimica-word">${ua}</div>
      </div>
      <div class="mimica-phone-actions">
        <button class="mimica-btn mimica-btn-pass" id="pass-btn">PASAR</button>
        <button class="mimica-btn mimica-btn-correct" id="correct-btn">¡ACERTÓ!</button>
      </div>
    </div>
  `,document.getElementById("correct-btn").onclick=()=>{Je(),se++;const a=document.getElementById("phone-aciertos");a&&(a.textContent=se),M({type:"mimica-correct"})},document.getElementById("pass-btn").onclick=()=>{za(),M({type:"mimica-skip"})}}function go(){ae(),Ce=setInterval(()=>{D--;const e=document.getElementById("mimica-phone-timer");e&&(e.textContent=`${D}s`,D<=5&&e.classList.add("timer-urgent")),D>0&&D<=5&&wa(),D<=0&&ae()},1e3)}function ae(){Ce&&(clearInterval(Ce),Ce=null)}function bo(e){ae(),T=e.teams,I=e.currentTeamIdx,se=e.aciertosThisTurn;const a=T[I],n=!e.hasMore;X.innerHTML=`
    <div class="scene">
      <div class="mimica-timeup-label" style="margin-top:0">¡TIEMPO!</div>
      <h1 class="title" style="font-size:clamp(1.6rem,6vw,2.4rem);color:${j(I)};margin:8px 0">${a.name}</h1>
      <div class="mimica-turnend-stat" style="font-size:clamp(2.8rem,12vw,5rem);font-weight:900;line-height:1">+${se}</div>
      <p class="label" style="margin-top:-4px;opacity:0.55">aciertos esta ronda</p>
      <div class="mimica-mini-scoreboard">
        ${T.map((i,r)=>`
          <div class="mimica-mini-row ${r===I?"mimica-mini-row-current":""}" style="--team-color:${j(r)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${i.name}</span>
            <span class="mimica-score-pts">${i.score}</span>
          </div>
        `).join("")}
      </div>
      <button class="btn" id="next-btn" style="margin-top:16px">${n?"VER GANADOR":"SIGUIENTE EQUIPO"}</button>
    </div>
  `;const o=document.getElementById("next-btn");o.focus(),o.onclick=()=>{Me(),M({type:"mimica-next-team"})}}function fo(e){var a,n;ae(),T=e.teams;const o=[...T].sort((t,F)=>F.score-t.score),i=(a=(n=o[0])===null||n===void 0?void 0:n.score)!==null&&a!==void 0?a:0,r=o.filter(t=>t.score===i&&i>0),s=r.length>1?"🏆 ¡EMPATE!":r.length?"🏆 ¡GANADOR!":"FIN";X.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:8px">${s}</h1>
      ${r.length?r.map(t=>`<div class="winner-name" style="color:${j(T.indexOf(t))}">${t.name}</div>`).join(""):'<div class="winner-name">—</div>'}
      <div class="mimica-mini-scoreboard" style="margin-top:24px">
        ${o.map(t=>{const F=T.indexOf(t);return`
          <div class="mimica-mini-row" style="--team-color:${j(F)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${t.name}</span>
            <span class="mimica-score-pts">${t.score}</span>
          </div>`}).join("")}
      </div>
      <div class="end-btn-row">
        <button class="btn" id="again-btn">JUGAR DE NUEVO</button>
        <button class="btn" id="menu-btn">MENÚ PRINCIPAL</button>
      </div>
    </div>
  `,document.getElementById("again-btn").focus(),document.getElementById("again-btn").onclick=()=>{Me(),M({type:"mimica-restart"})},document.getElementById("menu-btn").onclick=()=>{var t;We(),(t=Fe)===null||t===void 0||t()}}function vo(){ae(),X.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:1.6rem">CAPITÁN YA CONECTADO</h1>
      <p class="label">Espera a que el capitán actual se desconecte.</p>
      <button class="btn" id="back-btn" style="margin-top:24px">VOLVER AL MENÚ</button>
    </div>
  `,document.getElementById("back-btn").onclick=()=>{var e;We(),(e=Fe)===null||e===void 0||e()}}function ho(e,a){n();function n(){const o=$a(),i=q[o.isTeamOneFirst?0:1];e.innerHTML=`
      <div class="scene board-scene">
        <div class="team-banner" style="background:${i}22; border-bottom:3px solid ${i}">
          <button class="btn-back" id="back-btn">← VOLVER</button>
        </div>
        <div class="board phone-board mapa-board" id="board"></div>
        <div class="team-banner" style="background:${i}22; border-top:3px solid ${i}">
          <button class="new-board-btn" id="new-map-btn">NUEVO MAPA</button>
        </div>
      </div>
    `;const r=document.getElementById("board");o.tiles.forEach(l=>{const s=document.createElement("div");s.className="tile",s.dataset.type=l,s.style.background=q[l],s.addEventListener("click",()=>{const t=!s.classList.contains("checked");s.classList.toggle("checked",t),t?(ba(s),fa(l)):va()}),r.appendChild(s)}),document.getElementById("back-btn").onclick=a,document.getElementById("new-map-btn").onclick=()=>{confirm("¿Generar un nuevo mapa?")&&(ha(),n())}}}function wo(){pa||(pa=!0,document.addEventListener("keydown",e=>{if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;const a=[...document.querySelectorAll(".btn")];if(!a.length)return;const n=a.indexOf(document.activeElement);e.key==="ArrowDown"&&a[Math.min(n+1,a.length-1)].focus(),e.key==="ArrowUp"&&a[Math.max(n-1,0)].focus(),e.preventDefault()}))}function La(e){Ee(),We(),wo(),e.innerHTML=`
    <div class="scene">
      <h1 class="title">CÓDIGO</h1>
      <button class="btn" id="cs-btn">CÓDIGO SECRETO</button>
      <button class="btn" id="trivia-btn">TRIVIA</button>
      <button class="btn" id="mimica-btn">MÍMICA</button>
      <button class="btn" id="mapa-btn">MAPA</button>
    </div>
  `,document.getElementById("cs-btn").focus(),document.getElementById("cs-btn").onclick=()=>Ia(e,"cs"),document.getElementById("trivia-btn").onclick=()=>Ia(e,"trivia"),document.getElementById("mimica-btn").onclick=()=>Ia(e,"mimica"),document.getElementById("mapa-btn").onclick=()=>ho(e,()=>La(e))}function Ia(e,a){Ee();const o={cs:"CÓDIGO SECRETO",trivia:"TRIVIA",mimica:"MÍMICA"}[a];e.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:clamp(1.6rem,7vw,3.5rem)">${o}</h1>
      <button class="btn" id="tv-btn">TELEVISOR</button>
      <button class="btn" id="phone-btn">MÓVIL</button>
      <button class="btn-back" id="back-btn">← VOLVER</button>
    </div>
  `,document.getElementById("tv-btn").focus();const i=()=>La(e);document.getElementById("tv-btn").onclick=()=>{if(a==="cs")return bn(e);if(a==="trivia")return In(e,i);if(a==="mimica")return Jn(e,i)},document.getElementById("phone-btn").onclick=()=>{if(a==="cs")return Cn(e);if(a==="trivia")return $n(e,i);if(a==="mimica")return so(e,i)},document.getElementById("back-btn").onclick=i}return{setters:[],execute:function(){v=typeof window<"u"&&window.CODIGO_WS_URL||"",w=new Map,Q=(e,...a)=>{var n;return(n=w.get(e))===null||n===void 0?void 0:n(...a)},b=(e,a)=>w.set(e,a),h=null,ce=null,de=new Map,Ae=()=>String(Math.floor(1e3+Math.random()*9e3)),M=e=>{var a;((a=h)===null||a===void 0?void 0:a.readyState)===WebSocket.OPEN&&h.send(JSON.stringify({type:"to-host",payload:e}))},d=(e,a)=>{var n;((n=h)===null||n===void 0?void 0:n.readyState)===WebSocket.OPEN&&h.send(JSON.stringify({type:"to-peer",peerId:e.id,payload:a}))},ne=e=>{var a;((a=h)===null||a===void 0?void 0:a.readyState)===WebSocket.OPEN&&h.send(JSON.stringify({type:"broadcast",payload:e}))},Le=()=>{var e;return((e=h)===null||e===void 0?void 0:e.readyState)===WebSocket.OPEN&&ce==="phone"},ka=`
abogado
aceite
áfrica
agente
agua
águila
aguja
agujero
aire
alemania
algodón
alianza
alpes
ambulancia
américa
ángel
anillo
antártida
antorcha
araña
archivo
arco
argentina
artículo
as
atlántida
azteca
baile
bala
ballena
banco
banda
baño
barco
barra
batería
berlín
bermudas
bicho
blanco
bloque
boca
bola
bolsa
bomba
bosque
bota
botella
botón
brazo
bruja
caballero
caballo
cabeza
cabina
cabo
cactus
cadena
caja
calentito
cama
cámara
cambio
campana
campo
canal
canguro
canto
caña
capa
capital
caqui
cara
caravana
carga
carrera
carro
carta
casco
casino
caza
cementerio
centauro
centro
cervantes
checo
chocolate
choque
chuleta
científico
cinta
cinturón
círculo
clase
coche
cocinero
coco
código
cola
cólera
columna
cometa
compás
concierto
conejo
contrabandista
copa
corazón
corneta
corona
corredor
corriente
corte
cresta
cromo
cruz
cuadro
cuarto
cubierta
cubo
cuchillo
cuello
cuerda
cuerno
cura
dama
delta
destino
día
diamante
diana
diario
diente
dinosaurio
disco
don
dragón
duende
egipto
embajada
emperador
enano
enfermedad
enfermera
enlace
escorpión
espacio
espía
estación
estadio
estado
estrella
estudio
etiqueta
europa
extraterrestre
falda
fantasma
faro
ficha
fiesta
figura
flauta
flecha
forro
foso
francia
frente
fuego
fuente
fuerza
furgoneta
gancho
gato
genio
gigante
golfo
golondrina
golpe
goma
góndola
gota
grado
granada
grano
grecia
grifo
guante
guardia
guerra
gusano
helado
helicóptero
hielo
hierba
hoja
hollywood
horca
hospital
hotel
iglesia
imán
india
índice
inglaterra
italia
jarra
judía
juicio
kiwi
ladrón
lago ness
láser
látigo
lengua
león
libra
lima
limusina
línea
lista
llama
llave
lomo
londres
luna
luz
maestro
magia
malta
mancha
mando
manga
mango
mano
manzana
mañana
marca
marcha
marfil
masa
máscara
mazo
médico
mercurio
mesa
metro
méxico
micro
microscopio
mielo
millonario
mina
misil
modelo
módulo
monitor
mono
mortero
moscú
motor
muelle
muerte
muñeca
muro
naranja
nave
nieve
nilo
ninja
noche
nota
nudo
nueva york
obra
ojo
ola
olimpo
ópera
orden
órgano
ornitorrinco
oro
oso
pala
palma
pantalla
papel
paracaídas
pase
paso
pasta
pastel
pavo
pedo
pekín
película
pelotón
pendiente
perro
pez
pico
pie
pieza
pila
piloto
pincho
pingüino
pinta
piña
pirámide
pirata
pista
pistola
placa
plano
planta
plátano
playa
plomo
pluma
policía
polo
portada
portero
potro
prensa
prima
princesa
puente
puerto
pulpo
pulso
punta
punto
radio
rascacielos
ratón
rayo
red
regla
reina
reserva
revolución
rey
robot
rojo
roma
ronda
rosa
ruleta
sable
sahara
salsa
satélite
saturno
señal
serie
serpiente
sierra
silla
sirena
sobre
soldado
submarinista
suerte
superhéroe
tabla
tableta
taco
tacto
talón
tanque
tapa
tarde
teatro
teclado
telescopio
testigo
tiempo
tienda
tierra
tokio
topo
torre
trama
tronco
tubería
tubo
unicornio
vacío
vado
vampiro
vela
veneno
venus
vestido
vida
vidrio
viento
yema
zanahoria
zapato
zócalo
`,Pa=ka.trim().split(`
`).map(e=>e.trim().toUpperCase()).filter(Boolean),q=["#8c3232","#2e5fa8","#d8c9a8","#111115"],Ie=null,Ba=()=>(Ie||(Ie=new(window.AudioContext||window.webkitAudioContext)),Ie),ue=[],H=[0,0],Te=[0,0],k=null,he=null,P=[],J=null,_=new Array(25).fill(null),Ye="codigo-client-id",Qe="codigo-session",x=null,V=[],ke=[],z=[0,0],Ze=[0,0],Pe=!1,G=null,pe=[],Be="",Xe=!1,Re=[{q:"¿En qué año comenzó la Segunda Guerra Mundial?",options:["1937","1939","1941","1945"],answer:1},{q:"Pregunta difícil: ¿Quién fue el primer emperador romano?",options:["Julio César","Augusto","Nerón","Trajano"],answer:1},{q:"Trivia: ¿Qué civilización construyó Machu Picchu?",options:["Azteca","Maya","Inca","Olmeca"],answer:2},{q:"¿Qué muro cayó en 1989?",options:["Muro de Adriano","Muro de Berlín","Gran Muralla China","Muro de Varsovia"],answer:1},{q:"Dato curioso: ¿Quién descubrió la penicilina?",options:["Louis Pasteur","Alexander Fleming","Isaac Newton","Charles Darwin"],answer:1},{q:"¿Cuál es el único país del mundo que se encuentra en los cuatro hemisferios?",options:["Kiribati","Indonesia","Brasil","Kenia"],answer:0},{q:"¿Qué país tiene la línea de costa más larga del mundo?",options:["Rusia","Canadá","Australia","Noruega"],answer:1},{q:"¿Cuál es el nombre de la capital más alta del mundo (por altitud)?",options:["Quito","La Paz","Timbu","Bogotá"],answer:1},{q:"¿En qué país se encuentra el Salar de Uyuni?",options:["Chile","Argentina","Bolivia","Perú"],answer:2},{q:"¿Qué río africano es conocido como 'el río que se traga los barcos' y es el más profundo del mundo?",options:["Nilo","Níger","Zambeze","Congo"],answer:3},{q:"¿Cuál es la capital de Mongolia?",options:["Astaná","Ulán Bator","Biskek","Dushambé"],answer:1},{q:"¿Qué país europeo tiene más islas en su territorio (más de 200.000)?",options:["Grecia","Noruega","Suecia","Finlandia"],answer:2},{q:"¿En qué mar desemboca el río Danubio?",options:["Mar Caspio","Mar Negro","Mar Adriático","Mar Tirreno"],answer:1},{q:"¿Cuál es el país más pequeño del sudeste asiático?",options:["Brunei","Timor Oriental","Singapur","Laos"],answer:2},{q:"¿Qué cordillera atraviesa Kirguistán, Tayikistán y el oeste de China?",options:["Altái","Tian Shan","Pamir","Kunlun"],answer:1},{q:"¿Cuál es el punto más bajo de la superficie terrestre (fuera del océano)?",options:["Valle de la Muerte","Depresión de Afar","Mar Muerto","Depresión de Turfán"],answer:2},{q:"¿A qué país pertenecen las Islas Feroe?",options:["Islandia","Reino Unido","Noruega","Dinamarca"],answer:3},{q:"¿Qué desierto se extiende por gran parte de Botsuana, Namibia y Sudáfrica?",options:["Kalahari","Namib","Karoo","Gobi"],answer:0},{q:"¿Cuál es la capital de Nigeria?",options:["Lagos","Kano","Abuya","Ibadán"],answer:2},{q:"¿Qué estrecho separa la isla de Tasmania del continente australiano?",options:["Estrecho de Bass","Estrecho de Cook","Estrecho de Torres","Estrecho de Dampier"],answer:0},{q:"¿En qué país se encuentra el macizo del Annapurna?",options:["Bután","India","Pakistán","Nepal"],answer:3},{q:"¿Cuál es la capital de Marruecos?",options:["Casablanca","Marrakech","Rabat","Fez"],answer:2},{q:"¿Qué lago es el más antiguo y profundo de agua dulce del mundo?",options:["Lago Superior","Lago Victoria","Lago Baikal","Lago Tanganica"],answer:2},{q:"¿Qué país tiene como moneda el esloty (PLN)?",options:["Hungría","Polonia","República Checa","Rumania"],answer:1},{q:"¿Cuál es el nombre del golfo que separa la península de los Balcanes de la península Itálica?",options:["Mar Jónico","Mar Tirreno","Mar Adriático","Mar Egeo"],answer:2},{q:"¿Qué país se independizó de Etiopía en 1993?",options:["Yibuti","Eritrea","Somalia","Sudán del Sur"],answer:1},{q:"¿Cuál es la capital de Vietnam?",options:["Ho Chi Minh","Da Nang","Hanoi","Huế"],answer:2},{q:"¿Qué isla es la más grande del archipiélago de Japón?",options:["Hokkaido","Kyushu","Shikoku","Honshu"],answer:3},{q:"¿En qué océano se encuentran las Islas Seychelles?",options:["Pacífico","Atlántico","Índico","Ártico"],answer:2},{q:"¿Qué canal conecta el Mar Rojo con el Mar Mediterráneo?",options:["Canal de Corinto","Canal de Panamá","Canal de Kiel","Canal de Suez"],answer:3},{q:"¿Cuál es la capital de Canadá?",options:["Toronto","Vancouver","Montreal","Ottawa"],answer:3},{q:"¿Qué país es el mayor productor de cacao del mundo?",options:["Ghana","Costa de Marfil","Brasil","Ecuador"],answer:1},{q:"¿En qué país se encuentran los Montes Grampianos?",options:["Gales","Irlanda","Escocia","Inglaterra"],answer:2},{q:"¿Cuál es el volcán activo más alto del mundo?",options:["Etna","Kilauea","Ojos del Salado","Monte Fuji"],answer:2},{q:"¿Qué país atraviesa la Línea del Ecuador y no tiene costa en el Atlántico?",options:["Colombia","Ecuador","Brasil","Gabón"],answer:1},{q:"¿Cuál es la capital de Nueva Zelanda?",options:["Auckland","Christchurch","Wellington","Hamilton"],answer:2},{q:"¿Qué país posee la mayor cantidad de husos horarios?",options:["Rusia","Estados Unidos","Francia","China"],answer:2},{q:"¿Cuál es el río más largo de Europa Occidental?",options:["Rin","Ebro","Ródano","Loira"],answer:0},{q:"¿Qué desierto es conocido como el 'Lugar Vacío' (Rub al-Jali)?",options:["Sáhara","Arábigo","Gobi","Atacama"],answer:1},{q:"¿Cuál es la capital de Finlandia?",options:["Helsinki","Turku","Tampere","Oulu"],answer:0},{q:"¿Qué país limita con España, Francia y el Mar Cantábrico?",options:["Portugal","Andorra","Mónaco","Ninguno"],answer:3},{q:"¿En qué país se encuentra la ciudad de Tombuctú?",options:["Níger","Mali","Argelia","Chad"],answer:1},{q:"¿Cuál es el brazo de agua que separa Gran Bretaña de Francia?",options:["Canal de la Mancha","Estrecho de Dover","Estrecho de Gibraltar","Mar del Norte"],answer:0},{q:"¿Cuál es la capital de Islandia?",options:["Oslo","Reikiavik","Copenhague","Estocolmo"],answer:1},{q:"¿Qué país es conocido como 'la tierra de los mil lagos'?",options:["Canadá","Finlandia","Noruega","Suiza"],answer:1},{q:"¿En qué continente se encuentra el macizo Vinson?",options:["Oceanía","África","Asia","Antártida"],answer:3},{q:"¿Cuál es el estado más grande de los Estados Unidos por superficie?",options:["Texas","California","Alaska","Montana"],answer:2},{q:"¿Qué país tiene la ciudad de Estambul en dos continentes?",options:["Grecia","Rusia","Egipto","Turquía"],answer:3},{q:"¿Cuál es la capital de Kenia?",options:["Mombasa","Nairobi","Kisumu","Nakuru"],answer:1},{q:"¿Qué mar separa a Grecia de Turquía?",options:["Mar Egeo","Mar Adriático","Mar de Coral","Mar Muerto"],answer:0},{q:"¿Cuál es el país más densamente poblado del mundo?",options:["Mónaco","Singapur","China","India"],answer:0},{q:"¿En qué país se encuentra la Gran Barrera de Coral?",options:["Belice","Indonesia","Australia","Filipinas"],answer:2},{q:"¿Cuál es la capital de Portugal?",options:["Oporto","Lisboa","Coímbra","Faro"],answer:1},{q:"¿Qué país es el único que ocupa un continente entero?",options:["Groenlandia","Australia","Madagascar","Islandia"],answer:1},{q:"¿Cuál es el punto más alto del continente africano?",options:["Monte Kenia","Monte Kilimanjaro","Monte Meru","Monte Elgon"],answer:1},{q:"¿En qué año se produjo la caída del Muro de Berlín?",options:["1987","1989","1991","1985"],answer:1},{q:"¿Quién fue el primer emperador de la Dinastía Qin en unificar China?",options:["Han Wudi","Qin Shi Huang","Sun Yat-sen","Kublai Khan"],answer:1},{q:"¿Qué tratado puso fin formalmente a la Primera Guerra Mundial?",options:["Tratado de Trianon","Tratado de Versalles","Tratado de Utrecht","Pacto de Varsovia"],answer:1},{q:"¿En qué año ocurrió la Revolución Rusa?",options:["1905","1914","1917","1921"],answer:2},{q:"¿Cuál era el nombre del código secreto de la invasión alemana a la Unión Soviética en 1941?",options:["Operación Overlord","Operación Antorcha","Operación Barbarroja","Operación Urano"],answer:2},{q:"¿Quién fue la última reina de la dinastía ptolemaica de Egipto?",options:["Nefertiti","Hatshepsut","Cleopatra VII","Arsínoe IV"],answer:2},{q:"¿En qué ciudad se firmó la Declaración de Independencia de los Estados Unidos?",options:["Nueva York","Washington D.C.","Boston","Filadelfia"],answer:3},{q:"¿Qué civilización precolombina fundó la ciudad de Tenochtitlán?",options:["Incas","Mayas","Aztecas","Olmecas"],answer:2},{q:"¿Cómo se llamaba el sistema de segregación racial oficial en Sudáfrica hasta 1992?",options:["Jim Crow","Apartheid","Gulag","Sionismo"],answer:1},{q:"¿Qué batalla de 1815 marcó la derrota definitiva de Napoleón Bonaparte?",options:["Batalla de Leipzig","Batalla de Austerlitz","Batalla de Waterloo","Batalla de Trafalgar"],answer:2},{q:"¿Quién fue el líder de la Revolución Haitiana, la primera rebelión de esclavos exitosa?",options:["Simón Bolívar","Toussaint Louverture","José de San Martín","Jean-Jacques Dessalines"],answer:1},{q:"¿En qué período histórico se sitúa la Guerra de los Cien Años?",options:["1337-1453","1412-1512","1215-1315","1500-1600"],answer:0},{q:"¿Quién fue el principal responsable de las purgas conocidas como el 'Gran Terror' en la URSS?",options:["Lenin","Trotsky","Stalin","Kruschev"],answer:2},{q:"¿Qué faraón egipcio intentó instaurar el monoteísmo dedicado al dios Atón?",options:["Tutankamón","Ramsés II","Akenatón","Seti I"],answer:2},{q:"¿En qué año llegaron los primeros seres humanos a la Luna (Misión Apolo 11)?",options:["1965","1969","1971","1967"],answer:1},{q:"¿Qué conflicto bélico enfrentó a los Lancaster y los York en Inglaterra?",options:["Guerra de las Rosas","Guerra de los Treinta Años","Guerra Civil Inglesa","Guerra de los Siete Años"],answer:0},{q:"¿Cuál fue el nombre de la ruta comercial que conectaba China con el Mediterráneo?",options:["Ruta de las Especias","Ruta de la Seda","Camino Real","Vía Apia"],answer:1},{q:"¿Qué evento desencadenó el inicio de la Gran Depresión en 1929?",options:["El incendio del Reichstag","El crack de la bolsa de Nueva York","La huelga de mineros en GB","La invasión de Polonia"],answer:1},{q:"¿Quién era el presidente de EE. UU. durante la Crisis de los Misiles en Cuba?",options:["Dwight Eisenhower","Lyndon B. Johnson","John F. Kennedy","Richard Nixon"],answer:2},{q:"¿Qué ciudad-estado griega era conocida por su rigurosa educación militar?",options:["Atenas","Corinto","Esparta","Tebas"],answer:2},{q:"¿En qué año se fundó el Estado de Israel?",options:["1945","1948","1950","1939"],answer:1},{q:"¿Qué explorador lideró la primera expedición en circunnavegar el mundo?",options:["Cristóbal Colón","Vasco da Gama","Fernando de Magallanes","Américo Vespucio"],answer:2},{q:"¿Qué imperio fue derrotado por Hernán Cortés en 1521?",options:["Imperio Inca","Imperio Maya","Imperio Azteca","Imperio Chibcha"],answer:2},{q:"¿Quién fue el autor de 'Las 95 tesis', iniciando la Reforma Protestante?",options:["Juan Calvino","Martín Lutero","Enrique VIII","Erasmo de Rotterdam"],answer:1},{q:"¿Cómo se llamaba la facción radical liderada por Robespierre durante la Revolución Francesa?",options:["Girondinos","Jacobinos","Sans-culottes","Monárquicos"],answer:1},{q:"¿Qué país fue invadido por Alemania el 1 de septiembre de 1939?",options:["Francia","Checoslovaquia","Austria","Polonia"],answer:3},{q:"¿Quién fue el primer presidente de la Sudáfrica democrática post-apartheid?",options:["Desmond Tutu","Nelson Mandela","F.W. de Klerk","Thabo Mbeki"],answer:1},{q:"¿Qué invento de Johannes Gutenberg revolucionó la difusión del conocimiento?",options:["El telescopio","La brújula","La imprenta","El astrolabio"],answer:2},{q:"¿Quién fue el canciller alemán que unificó Alemania en 1871?",options:["Otto von Bismarck","Guillermo II","Federico el Grande","Konrad Adenauer"],answer:0},{q:"¿Qué nombre recibe la guerra civil que enfrentó al norte y al sur de EE. UU.?",options:["Guerra de Independencia","Guerra de Secesión","Guerra Franco-Prusiana","Guerra de los Siete Años"],answer:1},{q:"¿En qué año cayó Constantinopla en manos de los turcos otomanos?",options:["1492","1453","1204","1350"],answer:1},{q:"¿Quién fue el líder de la independencia de la India que promovió la no violencia?",options:["Jawaharlal Nehru","Mahatma Gandhi","Subhas Chandra Bose","Indira Gandhi"],answer:1},{q:"¿Qué tratado dividió el 'Nuevo Mundo' entre España y Portugal en 1494?",options:["Tratado de Zaragoza","Tratado de Tordesillas","Tratado de Madrid","Bula Inter Caetera"],answer:1},{q:"¿Qué monarca inglés rompió con la Iglesia Católica para fundar la Iglesia Anglicana?",options:["Ricardo Corazón de León","Enrique VIII","Eduardo I","Jacobo I"],answer:1},{q:"¿Cómo se llamaba el plan de ayuda económica de EE. UU. para reconstruir Europa tras la Segunda Guerra Mundial?",options:["Plan New Deal","Plan Marshall","Plan Molotov","Plan Schlieffen"],answer:1},{q:"¿Quién fue el primer emperador romano?",options:["Julio César","Augusto","Nerón","Tiberio"],answer:1},{q:"¿Qué imperio dominaba gran parte de los Andes antes de la llegada de los españoles?",options:["Moche","Tiwanaku","Inca","Chimú"],answer:2},{q:"¿En qué año se disolvió oficialmente la Unión Soviética?",options:["1989","1990","1991","1992"],answer:2},{q:"¿Qué conferencia de 1945 reunió a Stalin, Roosevelt y Churchill para planear la posguerra?",options:["Conferencia de Yalta","Conferencia de Potsdam","Conferencia de Teherán","Conferencia de Casablanca"],answer:0},{q:"¿Quién fue la 'Dama de Hierro', Primera Ministra del Reino Unido?",options:["Theresa May","Angela Merkel","Margaret Thatcher","Indira Gandhi"],answer:2},{q:"¿Qué nombre recibió la política de apertura económica en la URSS bajo Gorbachov?",options:["Glasnost","Perestroika","Duma","Soviet"],answer:1},{q:"¿En qué año terminó la Guerra Civil Española?",options:["1931","1936","1939","1945"],answer:2},{q:"¿Qué filósofo griego fue el maestro de Alejandro Magno?",options:["Sócrates","Platón","Aristóteles","Epicuro"],answer:2},{q:"¿Qué nombre se le da al exterminio sistemático de judíos por el régimen nazi?",options:["Pogromo","Holocausto","Apartheid","Éxodo"],answer:1},{q:"¿Cuál fue la capital del Imperio Bizantino?",options:["Roma","Atenas","Constantinopla","Alejandría"],answer:2},{q:"¿Qué civilización antigua construyó la ciudad de Petra en la actual Jordania?",options:["Fenicios","Nabateos","Asirios","Hititas"],answer:1},{q:"¿Quién lideró la expedición que conquistó el Imperio Inca?",options:["Hernán Cortés","Francisco Pizarro","Pedro de Valdivia","Diego de Almagro"],answer:1},{q:"¿Qué reina gobernó el Reino Unido durante el auge de la Revolución Industrial?",options:["Isabel I","Ana","Victoria","Isabel II"],answer:2},{q:"¿En qué año comenzó la Revolución Francesa?",options:["1776","1789","1793","1804"],answer:1},{q:"¿Qué científico propuso la Teoría de la Relatividad?",options:["Isaac Newton","Niels Bohr","Albert Einstein","Stephen Hawking"],answer:2},{q:"¿En qué año se firmó la Carta Magna, limitando por primera vez los poderes del rey de Inglaterra?",options:["1066","1215","1348","1415"],answer:1},{q:"¿Quién fue el líder del movimiento de independencia de Vietnam contra el dominio francés?",options:["Mao Zedong","Pol Pot","Ho Chi Minh","Sukarno"],answer:2},{q:"¿Qué batalla de la Guerra de Secesión de EE. UU. es considerada el punto de inflexión a favor de la Unión?",options:["Bull Run","Gettysburg","Antietam","Shiloh"],answer:1},{q:"¿Cuál fue la última dinastía imperial que gobernó China?",options:["Ming","Han","Tang","Qing"],answer:3},{q:"¿En qué ciudad ocurrió el asesinato del archiduque Francisco Fernando, detonante de la Gran Guerra?",options:["Belgrado","Viena","Sarajevo","Praga"],answer:2},{q:"¿Quién fue el general cartaginés que cruzó los Alpes para atacar a Roma en la Segunda Guerra Púnica?",options:["Amílcar Barca","Asdrúbal","Aníbal","Escipión"],answer:2},{q:"¿Qué tratado de 1648 puso fin a la Guerra de los Treinta Años?",options:["Paz de Westfalia","Tratado de Utrecht","Paz de Augsburgo","Tratado de los Pirineos"],answer:0},{q:"¿En qué año cayó el Imperio Romano de Occidente?",options:["395 d.C.","410 d.C.","476 d.C.","527 d.C."],answer:2},{q:"¿Quién fue el principal estratega detrás de la unificación de Italia (Risorgimento)?",options:["Garibaldi","Cavour","Mazzini","Víctor Manuel II"],answer:1},{q:"¿Qué civilización antigua desarrolló la escritura cuneiforme?",options:["Egipcia","Sumeria","Fenicia","Hicsa"],answer:1},{q:"¿Cómo se llamaba la esposa de Luis XVI que murió en la guillotina durante la Revolución Francesa?",options:["Catalina de Médici","María Antonieta","Madame de Pompadour","Ana de Austria"],answer:1},{q:"¿En qué año se proclamó la Declaración de los Derechos del Hombre y del Ciudadano?",options:["1776","1783","1789","1791"],answer:2},{q:"¿Quién lideró la 'Larga Marcha' durante la Guerra Civil China?",options:["Chiang Kai-shek","Deng Xiaoping","Mao Zedong","Sun Yat-sen"],answer:2},{q:"¿Qué nombre recibió la campaña de bombardeos sistemáticos de la Luftwaffe sobre el Reino Unido en 1940?",options:["Sea Lion","The Blitz","Operation Eagle","Stuka Night"],answer:1},{q:"¿Cuál era la capital del Imperio Persa bajo el reinado de Darío I?",options:["Susa","Babilonia","Persépolis","Ecbátana"],answer:2},{q:"¿En qué país tuvo lugar la Revolución de los Claveles en 1974?",options:["España","Portugal","Grecia","Chile"],answer:1},{q:"¿Quién fue el primer presidente de la Quinta República Francesa?",options:["Georges Pompidou","Charles de Gaulle","François Mitterrand","Jean Monnet"],answer:1},{q:"¿Qué imperio fue disuelto tras la victoria de las fuerzas de la Entente en 1918?",options:["Imperio Alemán","Imperio Austro-Húngaro","Imperio Otomano","Todos los anteriores"],answer:3},{q:"¿En qué año comenzó la construcción del Muro de Berlín?",options:["1945","1953","1961","1963"],answer:2},{q:"¿Quién fue el conquistador macedonio que llegó hasta las puertas de la India?",options:["Filipo II","Ptolomeo I","Alejandro Magno","Antíoco III"],answer:2},{q:"¿Qué evento histórico es conocido como la 'Noche de los Cristales Rotos'?",options:["Inicio de la Guerra Fría","Un pogromo contra judíos en la Alemania nazi","La caída del zarismo","El incendio del Reichstag"],answer:1},{q:"¿Cuál fue el nombre del primer satélite artificial puesto en órbita por la URSS en 1957?",options:["Vostok 1","Sputnik 1","Soyuz","Mir"],answer:1},{q:"¿Quién escribió 'El Manifiesto Comunista' junto a Karl Marx?",options:["Vladimir Lenin","Friedrich Engels","Mijaíl Bakunin","Rosa Luxemburgo"],answer:1},{q:"¿En qué ciudad se celebraron los juicios contra los líderes nazis tras la Segunda Guerra Mundial?",options:["Berlín","Múnich","Nuremberg","Frankfurt"],answer:2},{q:"¿Qué rey de Francia era conocido como el 'Rey Sol'?",options:["Luis XIII","Luis XIV","Luis XV","Felipe IV"],answer:1},{q:"¿Cómo se llamaba el ejército fundado por León Trotsky durante la Guerra Civil Rusa?",options:["Ejército Blanco","Ejército Rojo","Cuerpo de Voluntarios","Guardia de Hierro"],answer:1},{q:"¿Qué conflicto bélico enfrentó a Argentina y el Reino Unido en 1982?",options:["Guerra del Chaco","Guerra de las Malvinas","Guerra de los Balcanes","Guerra del Canal"],answer:1},{q:"¿Quién fue el faraón que descubrió Howard Carter en 1922?",options:["Ramsés II","Seti I","Tutankamón","Keops"],answer:2},{q:"¿Qué país invadió Irak en 1990, provocando la Guerra del Golfo?",options:["Irán","Arabia Saudita","Kuwait","Siria"],answer:2},{q:"¿En qué año se produjo la toma de la Bastilla?",options:["1788","1789","1790","1791"],answer:1},{q:"¿Qué orden religiosa fue fundada por San Ignacio de Loyola en 1540?",options:["Franciscanos","Dominicos","Jesuitas","Agustinos"],answer:2},{q:"¿Cuál fue la capital de la República Federal Alemana durante la Guerra Fría?",options:["Berlín Occidental","Hamburgo","Bonn","Múnich"],answer:2},{q:"¿Quién fue el autor de la 'Ilíada' y la 'Odisea'?",options:["Sófocles","Eurípides","Homero","Hesíodo"],answer:2},{q:"¿Qué emperador japonés gobernó durante la Segunda Guerra Mundial?",options:["Meiji","Taisho","Hirohito","Akihito"],answer:2},{q:"¿En qué año ocurrió el desastre de la planta nuclear de Chernóbil?",options:["1984","1986","1988","1990"],answer:1},{q:"¿Quién fue el navegante portugués que llegó por primera vez a la India bordeando África?",options:["Bartolomé Díaz","Vasco da Gama","Pedro Álvares Cabral","Fernão Magalhães"],answer:1},{q:"¿Qué tratado de 1929 reconoció al Vaticano como estado soberano?",options:["Tratado de Letrán","Pacto de Roma","Concordato de Viena","Tratado de Aviñón"],answer:0},{q:"¿Cuál fue el nombre de la primera civilización de la Grecia antigua?",options:["Micénica","Minoica","Arcaica","Dorios"],answer:1},{q:"¿Qué líder soviético impulsó la 'Desestalinización' en 1956?",options:["Leonid Brézhnev","Nikita Kruschev","Yuri Andrópov","Mijaíl Gorbachov"],answer:1},{q:"¿En qué año se fundó la ONU?",options:["1944","1945","1946","1948"],answer:1},{q:"¿Quién fue el líder de los 'Camisas Rojas' durante la unificación italiana?",options:["Mazzini","Garibaldi","Víctor Manuel II","Umberto I"],answer:1},{q:"¿Qué nombre recibió la red de rutas comerciales que cruzaban el desierto del Sáhara?",options:["Ruta del Incienso","Comercio Transahariano","Ruta de la Sal","Camino del Oro"],answer:1},{q:"¿Quién fue la primera mujer en ganar un Premio Nobel?",options:["Rosalind Franklin","Marie Curie","Ada Lovelace","Irène Joliot-Curie"],answer:1},{q:"¿En qué año fue asesinado Martin Luther King Jr.?",options:["1963","1965","1968","1970"],answer:2},{q:"¿Qué dinastía gobernaba Rusia antes de la Revolución de 1917?",options:["Rúrik","Habsburgo","Romanov","Valois"],answer:2},{q:"¿Cuál fue el principal motivo de la Guerra del Opio?",options:["Disputas territoriales en Corea","Restricciones comerciales de China al opio británico","Invasión japonesa de Manchuria","El control del té en India"],answer:1},{q:"¿Qué explorador noruego llegó al Polo Sur por primera vez en 1911?",options:["Robert Falcon Scott","Roald Amundsen","Ernest Shackleton","Fridtjof Nansen"],answer:1},{q:"¿Quién fue el autor de la 'Summa Theologiae'?",options:["San Agustín","Santo Tomás de Aquino","Erasmo","San Anselmo"],answer:1},{q:"¿En qué año comenzó la Guerra de los Treinta Años?",options:["1618","1648","1598","1600"],answer:0},{q:"¿Qué ciudad fue la sede del papado durante gran parte del siglo XIV?",options:["Roma","Florencia","Aviñón","Nápoles"],answer:2},{q:"¿Cómo se llama el proceso por el cual una célula consume energía para mover moléculas contra su gradiente de concentración?",options:["Difusión facilitada","Ósmosis","Transporte activo","Diálisis"],answer:2},{q:"¿Qué base nitrogenada es exclusiva del ARN y reemplaza a la timina?",options:["Citosina","Guanina","Uracilo","Adenina"],answer:2},{q:"¿En qué fase de la mitosis los cromosomas se alinean en el plano ecuatorial de la célula?",options:["Profase","Metafase","Anafase","Telofase"],answer:1},{q:"¿Qué enzima es la encargada de 'desenrollar' la doble hélice del ADN durante la replicación?",options:["ADN Polimerasa","Ligasa","Helicasa","Topoisomerasa"],answer:2},{q:"¿Cuál es la principal función de los ribosomas?",options:["Síntesis de lípidos","Respiración celular","Síntesis de proteínas","Digestión celular"],answer:2},{q:"¿Qué tipo de enlace químico mantiene unidas las dos hebras de la doble hélice del ADN?",options:["Covalente","Iónico","Puentes de hidrógeno","Fuerzas de Van der Waals"],answer:2},{q:"¿Cómo se denominan los organismos que obtienen su energía de la oxidación de compuestos inorgánicos?",options:["Fotoautótrofos","Quimioautótrofos","Heterótrofos","Saprofitos"],answer:1},{q:"¿Qué parte de la planta es responsable de la mayor parte de la fotosíntesis?",options:["Tallo","Raíz","Parénquima clorofílico","Floema"],answer:2},{q:"¿Cuál es el resultado final de la glucólisis por cada molécula de glucosa?",options:["2 moléculas de piruvato","1 molécula de lactato","2 moléculas de acetil-CoA","6 moléculas de CO2"],answer:0},{q:"¿Qué hormona es producida por las células beta del páncreas?",options:["Glucagón","Insulina","Somatostatina","Adrenalina"],answer:1},{q:"¿Cómo se llama el conjunto de tres bases nitrogenadas en el ARNm que codifica un aminoácido?",options:["Anticodón","Codón","Intrón","Exón"],answer:1},{q:"¿Qué orgánulo contiene enzimas hidrolíticas para degradar material celular viejo?",options:["Peroxisoma","Lisosoma","Vacuola","Mitocondria"],answer:1},{q:"¿Qué pigmento le da el color rojo a los glóbulos rojos y transporta oxígeno?",options:["Mioglobina","Clorofila","Hemoglobina","Bilirrubina"],answer:2},{q:"¿En qué parte de la mitocondria ocurre el ciclo de Krebs?",options:["Membrana interna","Espacio intermembrana","Matriz mitocondrial","Crestas"],answer:2},{q:"¿Qué ley de Mendel establece que los alelos de un gen se separan durante la formación de gametos?",options:["Ley de la uniformidad","Ley de la segregación","Ley de la transmisión independiente","Ley de la dominancia"],answer:1},{q:"¿Cuál es el componente principal de la pared celular de los hongos?",options:["Celulosa","Peptidoglicano","Quitina","Lignina"],answer:2},{q:"¿Qué tipo de inmunidad se adquiere a través de la leche materna?",options:["Activa natural","Pasiva natural","Activa artificial","Pasiva artificial"],answer:1},{q:"¿Qué vitamina es esencial para la coagulación sanguínea?",options:["Vitamina C","Vitamina A","Vitamina K","Vitamina D"],answer:2},{q:"¿Cómo se llama el proceso de muerte celular programada?",options:["Necrosis","Apoptosis","Autofagia","Senescencia"],answer:1},{q:"¿Qué estructura bacteriana permite la transferencia de plásmidos entre células?",options:["Flagelo","Cápsula","Pili (o Pelos)","Fimbrias"],answer:2},{q:"¿Cuál es la unidad funcional del riñón?",options:["Neurona","Alvéolo","Nefrona","Sarcómero"],answer:2},{q:"¿Qué gas se libera como subproducto de la fase luminosa de la fotosíntesis?",options:["CO2","N2","O2","H2"],answer:2},{q:"¿Qué macromolécula está formada por cadenas de aminoácidos?",options:["Carbohidratos","Lípidos","Proteínas","Ácidos nucleicos"],answer:2},{q:"¿Cómo se llama la relación simbiótica donde ambos organismos se benefician?",options:["Comensalismo","Parasitismo","Mutualismo","Amensalismo"],answer:2},{q:"¿Qué tejido vegetal transporta agua y minerales desde la raíz a las hojas?",options:["Floema","Xilema","Esclerénquima","Meristemo"],answer:1},{q:"¿Cuál es el principal reservorio de nitrógeno en la Tierra?",options:["El suelo","Los océanos","La atmósfera","Las rocas"],answer:2},{q:"¿Qué científico propuso la teoría de la selección natural simultáneamente con Darwin?",options:["Lamarck","Alfred Russel Wallace","Gregor Mendel","Linneo"],answer:1},{q:"¿Qué parte de la neurona recibe los impulsos nerviosos de otras células?",options:["Axón","Soma","Dendrita","Vaina de mielina"],answer:2},{q:"¿Cuál es el azúcar presente en el ADN?",options:["Ribosa","Fructosa","Desoxirribosa","Glucosa"],answer:2},{q:"¿Qué dominio incluye a los organismos procariotas que suelen vivir en condiciones extremas?",options:["Bacteria","Eukarya","Archaea","Protista"],answer:2},{q:"¿Qué técnica se utiliza para amplificar pequeñas secuencias de ADN?",options:["Electroforesis","PCR","Western Blot","Cromatografía"],answer:1},{q:"¿Cuál es la proteína más abundante en el cuerpo humano?",options:["Queratina","Colágeno","Albúmina","Elastina"],answer:1},{q:"¿Qué parte del ojo regula la cantidad de luz que entra?",options:["Córnea","Retina","Iris","Cristalino"],answer:2},{q:"¿Qué tipo de ARN transporta los aminoácidos al ribosoma?",options:["ARNm","ARNr","ARNt","miRNA"],answer:2},{q:"¿Cuál es el hueso más largo del cuerpo humano?",options:["Húmero","Tibia","Fémur","Radio"],answer:2},{q:"¿Qué proceso biológico convierte el nitrógeno atmosférico en amoníaco?",options:["Nitrificación","Desnitrificación","Fijación de nitrógeno","Amonificación"],answer:2},{q:"¿Qué glándula es conocida como la 'glándula maestra' del sistema endocrino?",options:["Tiroides","Suprarrenal","Hipófisis","Páncreas"],answer:2},{q:"¿Qué orgánulo es el sitio principal de la síntesis de ATP?",options:["Núcleo","Mitocondria","Retículo endoplasmático","Cloroplasto"],answer:1},{q:"¿Cómo se llama la capa externa de un virus?",options:["Cápside","Membrana plasmática","Pared celular","Tegumento"],answer:0},{q:"¿Cuál es la fase más larga del ciclo celular?",options:["Mitosis","Interfase","Citocinesis","Meiosis"],answer:1},{q:"¿Qué tipo de articulación es la del hombro?",options:["Bisagra","Sutura","Enartrosis","Pivotante"],answer:2},{q:"¿Qué organismo es el productor primario en las cadenas tróficas marinas?",options:["Zooplancton","Fitoplancton","Corales","Cefalópodos"],answer:1},{q:"¿Cómo se llama el proceso de formación de glóbulos rojos?",options:["Hemólisis","Eritropoyesis","Leucopoyesis","Fagocitosis"],answer:1},{q:"¿Cuál es el principal lípido constituyente de las membranas biológicas?",options:["Triglicéridos","Colesterol","Fosfolípidos","Ceras"],answer:2},{q:"¿Qué par craneal es responsable del sentido de la vista?",options:["I par","II par","III par","V par"],answer:1},{q:"¿Cómo se denomina a un organismo que posee ambos órganos reproductores funcionales?",options:["Dioico","Monoico (Hermafrodita)","Asexual","Partenogénico"],answer:1},{q:"¿En qué órgano se produce la bilis?",options:["Vesícula biliar","Estómago","Hígado","Páncreas"],answer:2},{q:"¿Qué estructura celular eucariota está formada por microtúbulos en disposición 9+2?",options:["Pared celular","Cilios y flagelos","Ribosomas","Membrana nuclear"],answer:1},{q:"¿Qué hormona estimula las contracciones uterinas durante el parto?",options:["Progesterona","Estrógeno","Oxitocina","Prolactina"],answer:2},{q:"¿Qué nombre recibe el estudio de los tejidos biológicos?",options:["Citología","Histología","Fisiología","Etología"],answer:1},{q:"¿Quién es el único boxeador en la historia en ganar títulos mundiales en ocho categorías de peso distintas?",options:["Floyd Mayweather Jr.","Manny Pacquiao","Oscar De La Hoya","Sugar Ray Leonard"],answer:1},{q:"¿Qué país ha ganado más veces la Copa Davis de tenis?",options:["España","Francia","Estados Unidos","Australia"],answer:2},{q:"¿En qué ciudad se celebraron los primeros Juegos Olímpicos de la era moderna en 1896?",options:["París","Atenas","Londres","Roma"],answer:1},{q:"¿Qué ciclista ostenta el récord de más victorias en las clasificaciones secundarias (puntos y montaña) del Tour de Francia?",options:["Eddy Merckx","Richard Virenque","Peter Sagan","Erik Zabel"],answer:2},{q:"¿Qué selección nacional de fútbol posee el récord de haber disputado más finales de la Copa del Mundo sin ganar ninguna?",options:["Hungría","Países Bajos","Checoslovaquia","Suecia"],answer:1},{q:"¿Cuál es la distancia exacta de una maratón en kilómetros?",options:["42,000 km","42,195 km","41,500 km","42,500 km"],answer:1},{q:"¿Quién tiene el récord de más puntos anotados en un solo partido de la NBA?",options:["Kobe Bryant","Michael Jordan","Wilt Chamberlain","LeBron James"],answer:2},{q:"¿Qué equipo de la Fórmula 1 ha ganado más Campeonatos de Constructores en la historia?",options:["McLaren","Williams","Mercedes","Ferrari"],answer:3},{q:"¿En qué deporte se compite por la 'Stanley Cup'?",options:["Lacrosse","Hockey sobre hielo","Rugby Union","Críquet"],answer:1},{q:"¿Quién fue el primer atleta en bajar de los 10 segundos en los 100 metros lisos (cronometraje electrónico)?",options:["Carl Lewis","Jim Hines","Usain Bolt","Jesse Owens"],answer:1},{q:"¿Qué selección de rugby es conocida como los 'Springboks'?",options:["Nueva Zelanda","Australia","Sudáfrica","Argentina"],answer:2},{q:"¿En qué año se celebraron los Juegos Olímpicos de Múnich, marcados por el trágico atentado terrorista?",options:["1968","1972","1976","1980"],answer:1},{q:"¿Qué nadador ostenta el récord de más medallas de oro olímpicas en una sola edición de los Juegos?",options:["Mark Spitz","Ian Thorpe","Michael Phelps","Caeleb Dressel"],answer:2},{q:"¿Cuál es el hándicap máximo permitido para un jugador de golf profesional?",options:["0","5","10","15"],answer:0},{q:"¿Qué país ganó la primera Copa del Mundo de fútbol en 1930?",options:["Brasil","Argentina","Uruguay","Italia"],answer:2},{q:"¿Quién es el máximo goleador histórico de la UEFA Champions League?",options:["Lionel Messi","Robert Lewandowski","Cristiano Ronaldo","Karim Benzema"],answer:2},{q:"¿Cómo se llama el trofeo que se entrega al ganador del torneo de tenis de Wimbledon en la categoría masculina?",options:["Copa de los Mosqueteros","Challenge Cup","Gentlemen's Singles Trophy","Norman Brookes Challenge Cup"],answer:2},{q:"¿En qué deporte se utiliza el término 'Home Run'?",options:["Críquet","Béisbol","Softbol","Ambos Béisbol y Softbol"],answer:3},{q:"¿Qué ciudad albergará los Juegos Olímpicos de Verano en 2028?",options:["París","Los Ángeles","Brisbane","Tokio"],answer:1},{q:"¿Quién es el piloto con más títulos mundiales de MotoGP (contando todas las categorías)?",options:["Valentino Rossi","Marc Márquez","Giacomo Agostini","Angel Nieto"],answer:2},{q:"¿En qué país se inventó el voleibol?",options:["Canadá","Francia","Estados Unidos","Brasil"],answer:2},{q:"¿Qué equipo de béisbol ha ganado más Series Mundiales en la MLB?",options:["Boston Red Sox","Los Angeles Dodgers","New York Yankees","St. Louis Cardinals"],answer:2},{q:"¿Qué gimnasta fue la primera en obtener una puntuación perfecta de 10 en unos Juegos Olímpicos?",options:["Simone Biles","Nadia Comăneci","Olga Korbut","Svetlana Khorkina"],answer:1},{q:"¿Cuál es la duración de un partido de rugby union (sin contar el tiempo extra)?",options:["70 minutos","80 minutos","90 minutos","60 minutos"],answer:1},{q:"¿Quién fue el primer tenista masculino en ganar el 'Golden Slam' (los 4 Grand Slams y el Oro Olímpico en el mismo año)?",options:["Roger Federer","Rafael Nadal","Andre Agassi","Ninguno (solo lo logró Steffi Graf)"],answer:3},{q:"¿En qué deporte se puede realizar un 'Birdie', un 'Eagle' o un 'Albatross'?",options:["Golf","Bolos","Tiro con arco","Dardos"],answer:0},{q:"¿Qué país ha ganado más medallas de oro en la historia de los Juegos Olímpicos de Invierno?",options:["Estados Unidos","Noruega","Alemania","Canadá"],answer:1},{q:"¿Cómo se llama el área de 2.74 metros de largo por 1.525 metros de ancho donde se juega al tenis de mesa?",options:["La red","El tablero","La mesa","La pista"],answer:2},{q:"¿Qué jugador de la NFL tiene más anillos de Super Bowl como jugador?",options:["Joe Montana","Peyton Manning","Tom Brady","Patrick Mahomes"],answer:2},{q:"¿Qué selección de fútbol es apodada 'La Azzurra'?",options:["Francia","Uruguay","Italia","Grecia"],answer:2},{q:"¿Cuál es el puntaje máximo que se puede obtener en una sola tirada (frame) de bolos/bowling?",options:["10","20","30","300"],answer:2},{q:"¿Quién ostenta el récord mundial de salto de altura masculino desde 1993?",options:["Mutaz Essa Barshim","Javier Sotomayor","Patrik Sjöberg","Dick Fosbury"],answer:1},{q:"¿En qué disciplina deportiva destacó el estadounidense Jesse Owens en Berlín 1936?",options:["Natación","Atletismo","Boxeo","Esgrima"],answer:1},{q:"¿Qué equipo de la NBA tiene el récord de más victorias en una temporada regular (73-9)?",options:["Chicago Bulls","Los Angeles Lakers","Golden State Warriors","Boston Celtics"],answer:2},{q:"¿En qué país se corre anualmente la carrera de resistencia 'Las 24 Horas de Le Mans'?",options:["Bélgica","Alemania","Francia","Italia"],answer:2},{q:"¿Qué arte marcial significa 'el camino de la mano vacía'?",options:["Judo","Taekwondo","Karate","Aikido"],answer:2},{q:"¿Quién ganó el primer campeonato del mundo de Fórmula 1 en 1950?",options:["Juan Manuel Fangio","Giuseppe Farina","Alberto Ascari","Stirling Moss"],answer:1},{q:"¿Cuántos jugadores por equipo hay en la cancha en un partido de balonmano?",options:["5","6","7","11"],answer:2},{q:"¿Qué país ha ganado más mundiales de baloncesto masculino (FIBA)?",options:["España","Serbia/Yugoslavia","Estados Unidos","Unión Soviética"],answer:2},{q:"¿Quién es el ciclista con más victorias de etapa en la historia del Tour de Francia?",options:["Eddy Merckx","Mark Cavendish","Bernard Hinault","Lance Armstrong"],answer:1},{q:"¿En qué deporte se utiliza un objeto llamado 'puck'?",options:["Lacrosse","Curling","Hockey sobre hielo","Polo"],answer:2},{q:"¿Cómo se llama el lanzamiento de tres puntos en el baloncesto cuando el jugador no toca el aro?",options:["Slam Dunk","Airball","Swish (o Limpio)","Layup"],answer:2},{q:"¿Qué selección nacional de fútbol femenino ha ganado más Copas del Mundo?",options:["Alemania","Noruega","Estados Unidos","Japón"],answer:2},{q:"¿En qué ciudad se encuentra el estadio de Maracaná?",options:["Buenos Aires","São Paulo","Río de Janeiro","Montevideo"],answer:2},{q:"¿Quién fue el primer piloto en ganar 7 títulos mundiales de Fórmula 1?",options:["Lewis Hamilton","Sebastian Vettel","Michael Schumacher","Alain Prost"],answer:2},{q:"¿Qué país es el actual campeón (2023) del Mundial de Rugby?",options:["Francia","Nueva Zelanda","Sudáfrica","Inglaterra"],answer:2},{q:"¿Cuál es la altura reglamentaria de un aro de baloncesto en metros?",options:["2,90 m","3,00 m","3,05 m","3,15 m"],answer:2},{q:"¿En qué deporte se compite por la 'America's Cup'?",options:["Equitación","Vela","Polo","Esgrima"],answer:1},{q:"¿Qué tenista tiene el récord de más semanas consecutivas como número 1 del ranking ATP?",options:["Novak Djokovic","Roger Federer","Pete Sampras","Ivan Lendl"],answer:1},{q:"¿Cómo se llama el estilo de natación que se realiza sobre la espalda?",options:["Crol","Mariposa","Braza","Dorso"],answer:3},{q:"¿Qué película ostenta el récord de ser la más premiada en la historia de los Oscar con 11 estatuillas (empate triple)?",options:["Ben-Hur, Titanic y El Retorno del Rey","Lo que el viento se llevó, Ben-Hur y Avatar","La Lista de Schindler, Titanic y West Side Order","El Padrino, Titanic y Ben-Hur"],answer:0},{q:"¿Quién dirigió la película de terror psicológico 'El Resplandor' (1980)?",options:["Alfred Hitchcock","Stanley Kubrick","John Carpenter","Steven Spielberg"],answer:1},{q:"¿Qué álbum de Michael Jackson es el más vendido de todos los tiempos?",options:["Bad","Off the Wall","Thriller","Dangerous"],answer:2},{q:"¿Cuál es el nombre del intervalo musical que abarca doce semitonos?",options:["Quinta justa","Octava","Tritono","Séptima mayor"],answer:1},{q:"¿Qué director es conocido como el 'Maestro del Suspenso'?",options:["Martin Scorsese","Alfred Hitchcock","Christopher Nolan","David Fincher"],answer:1},{q:"¿Qué banda británica lanzó el álbum 'The Dark Side of the Moon' en 1973?",options:["The Rolling Stones","Led Zeppelin","Pink Floyd","The Who"],answer:2},{q:"¿Quién interpretó a Jack Sparrow en la franquicia 'Piratas del Caribe'?",options:["Orlando Bloom","Geoffrey Rush","Johnny Depp","Javier Bardem"],answer:2},{q:"¿Qué actor ganó un Oscar póstumo por su interpretación del Joker en 'The Dark Knight'?",options:["Joaquin Phoenix","Jack Nicholson","Heath Ledger","Jared Leto"],answer:2},{q:"¿En qué año se estrenó la primera película de 'Star Wars' (Episodio IV)?",options:["1975","1977","1980","1983"],answer:1},{q:"¿Qué cantante es conocida como la 'Reina del Pop'?",options:["Whitney Houston","Madonna","Cher","Britney Spears"],answer:1},{q:"¿Quién compuso la banda sonora de películas como 'Interstellar', 'Inception' y 'El Rey León'?",options:["John Williams","Hans Zimmer","Ennio Morricone","Danny Elfman"],answer:1},{q:"¿Qué película ganó el primer Oscar a la Mejor Película de Animación en 2002?",options:["Toy Story","Shrek","Monsters, Inc.","El Viaje de Chihiro"],answer:1},{q:"¿Cómo se llama el guitarrista principal de la banda Queen?",options:["Roger Taylor","John Deacon","Brian May","Freddie Mercury"],answer:2},{q:"¿Cuál es la película con mayor recaudación de la historia (sin ajustar por inflación)?",options:["Avengers: Endgame","Titanic","Avatar","Star Wars: The Force Awakens"],answer:2},{q:"¿Qué famoso festival de música se llevó a cabo en 1969 bajo el lema '3 días de paz y música'?",options:["Glastonbury","Woodstock","Coachella","Lollapalooza"],answer:1},{q:"¿Quién dirigió la 'Trilogía del Dólar' (Westerns protagonizados por Clint Eastwood)?",options:["John Ford","Sergio Leone","Quentin Tarantino","Howard Hawks"],answer:1},{q:"¿Qué nota musical se encuentra un tono por encima de Fa?",options:["Mi","Sol","La","Si b"],answer:1},{q:"¿Quién es el actor con más premios Oscar a Mejor Actor (3 estatuillas)?",options:["Marlon Brando","Jack Nicholson","Daniel Day-Lewis","Anthony Hopkins"],answer:2},{q:"¿Qué banda de Seattle lideró el movimiento Grunge a principios de los 90?",options:["Pearl Jam","Soundgarden","Nirvana","Alice in Chains"],answer:2},{q:"¿En qué ciudad se entrega el premio 'Palma de Oro'?",options:["Venecia","Berlín","Cannes","San Sebastián"],answer:2},{q:"¿Quién interpretó a la heroína Ellen Ripley en la saga 'Alien'?",options:["Linda Hamilton","Sigourney Weaver","Jamie Lee Curtis","Carrie Fisher"],answer:1},{q:"¿Qué instrumento tocaba Miles Davis?",options:["Saxofón","Piano","Trompeta","Contrabajo"],answer:2},{q:"¿Qué película de 1994 narra la vida de un hombre con discapacidad intelectual que presencia hitos históricos de EE. UU.?",options:["Pulp Fiction","Forrest Gump","The Shawshank Redemption","Leon"],answer:1},{q:"¿Quién es el creador de la serie de animación 'Los Simpson'?",options:["Seth MacFarlane","Matt Groening","Mike Judge","Butch Hartman"],answer:1},{q:"¿Cuál es el nombre real de Lady Gaga?",options:["Stefani Joanne Angelina Germanotta","Robyn Fenty","Katheryn Hudson","Onika Tanya Maraj"],answer:0},{q:"¿Qué director japonés es responsable de clásicos como 'Los siete samuráis' y 'Rashomon'?",options:["Hayao Miyazaki","Akira Kurosawa","Yasujirō Ozu","Takeshi Kitano"],answer:1},{q:"¿Qué rapero protagonizó la película autobiográfica '8 Mile'?",options:["Jay-Z","Snoop Dogg","Eminem","Dr. Dre"],answer:2},{q:"¿Qué actor dio vida a Iron Man en el Universo Cinematográfico de Marvel?",options:["Chris Evans","Robert Downey Jr.","Mark Ruffalo","Chris Hemsworth"],answer:1},{q:"¿En qué tonalidad está escrita la 'Quinta Sinfonía' de Beethoven?",options:["Do Mayor","Do Menor","Re Menor","Sol Mayor"],answer:1},{q:"¿Quién dirigió 'Pulp Fiction'?",options:["David Lynch","Quentin Tarantino","Guy Ritchie","Coen Brothers"],answer:1},{q:"¿Qué grupo sueco ganó Eurovisión en 1974 con la canción 'Waterloo'?",options:["A-ha","Roxette","ABBA","Ace of Base"],answer:2},{q:"¿Cómo se llama el reino ficticio donde se desarrolla 'Black Panther'?",options:["Asgard","Wakanda","Sokovia","Xandar"],answer:1},{q:"¿Qué cantante de jazz y soul es conocida por el álbum 'Back to Black'?",options:["Adele","Amy Winehouse","Duffy","Norah Jones"],answer:1},{q:"¿Cuál fue la primera película de la historia en tener sonido sincrónico (1927)?",options:["Metrópolis","El Cantor de Jazz","Luces de la Ciudad","Nosferatu"],answer:1},{q:"¿Qué banda de rock argentina lideró Gustavo Cerati?",options:["Patricio Rey y sus Redonditos de Ricota","Sui Generis","Soda Stereo","Divididos"],answer:2},{q:"¿Quién es el autor de la famosa fotografía de la portada del álbum 'Abbey Road'?",options:["Annie Leibovitz","Iain Macmillan","Robert Capa","Richard Avedon"],answer:1},{q:"¿Qué actor interpretó a Michael Corleone en 'El Padrino'?",options:["Marlon Brando","Robert De Niro","Al Pacino","James Caan"],answer:2},{q:"¿Qué película de ciencia ficción de 1982 presenta a 'Replicantes'?",options:["Tron","Blade Runner","E.T.","The Thing"],answer:1},{q:"¿Quién es conocido como el 'Rey del Rock and Roll'?",options:["Chuck Berry","Little Richard","Elvis Presley","Jerry Lee Lewis"],answer:2},{q:"¿Qué mítica discoteca neoyorquina fue el epicentro de la música disco en los 70?",options:["The Cavern","Studio 54","CBGB","The Roxy"],answer:1},{q:"¿Quién dirigió la película 'Parásitos' (2019), ganadora del Oscar a Mejor Película?",options:["Park Chan-wook","Bong Joon-ho","Kim Ki-duk","Lee Chang-dong"],answer:1},{q:"¿Qué vocalista lideró la banda The Doors?",options:["Mick Jagger","Jim Morrison","Robert Plant","Janis Joplin"],answer:1},{q:"¿Cuál es el nombre del muñeco diabólico en la película 'Child's Play'?",options:["Pennywise","Chucky","Annabelle","Freddy"],answer:1},{q:"¿Qué actriz ganó el Oscar por su papel en 'La La Land'?",options:["Jennifer Lawrence","Emma Stone","Anne Hathaway","Natalie Portman"],answer:1},{q:"¿Qué músico compuso las 'Cuatro Estaciones'?",options:["Bach","Mozart","Vivaldi","Handel"],answer:2},{q:"¿Quién es el director de la película 'El laberinto del fauno'?",options:["Alfonso Cuarón","Alejandro González Iñárritu","Guillermo del Toro","Pedro Almodóvar"],answer:2},{q:"¿Qué banda de rock lanzó el álbum 'Appetite for Destruction'?",options:["Mötley Crüe","Guns N' Roses","Metallica","Aerosmith"],answer:1},{q:"¿Qué técnica de animación utiliza figuras sólidas capturadas fotograma a fotograma?",options:["CGI","Rotoscopia","Stop-motion","Cel shading"],answer:2},{q:"¿Quién es el 'Camaleón del Rock'?",options:["Iggy Pop","David Bowie","Freddie Mercury","Prince"],answer:1},{q:"¿Cómo se llama el festival de cine más antiguo del mundo?",options:["Festival de Cannes","Festival de Berlín","Festival de Venecia","Festival de Sundance"],answer:2},{q:"¿Quién dirigió la película 'Psicosis' (1960), famosa por su escena en la ducha?",options:["John Ford","Alfred Hitchcock","Brian De Palma","Billy Wilder"],answer:1},{q:"¿Qué artista tiene el récord de más premios Grammy ganados en la historia?",options:["Beyoncé","Georg Solti","Quincy Jones","Stevie Wonder"],answer:0},{q:"¿Cuál fue el primer largometraje animado de Disney estrenado en 1937?",options:["Pinocho","Dumbo","Bambi","Blancanieves y los siete enanitos"],answer:3},{q:"¿Qué banda de rock lanzó el álbum 'Rumours' en 1977?",options:["Fleetwood Mac","The Eagles","Steely Dan","Blondie"],answer:0},{q:"¿Quién interpretó a Vito Corleone en 'El Padrino' (1972)?",options:["Al Pacino","Marlon Brando","Robert De Niro","James Caan"],answer:1},{q:"¿Qué director es conocido por su 'Trilogía del Caballero Oscuro'?",options:["Zack Snyder","Christopher Nolan","Tim Burton","Joel Schumacher"],answer:1},{q:"¿Qué cantante de soul grabó el álbum 'What's Going On'?",options:["Sam Cooke","Marvin Gaye","Otis Redding","Ray Charles"],answer:1},{q:"¿En qué película de 1982 debutó Drew Barrymore como actriz infantil?",options:["Poltergeist","E.T., el extraterrestre","Annie","The Shining"],answer:1},{q:"¿Qué grupo de música electrónica francés es famoso por usar cascos de robot?",options:["Justice","Air","Daft Punk","M83"],answer:2},{q:"¿Quién dirigió la película épica 'Lawrence de Arabia' (1962)?",options:["David Lean","Cecil B. DeMille","John Huston","William Wyler"],answer:0},{q:"¿Qué instrumento musical tiene 47 cuerdas y 7 pedales?",options:["Cítara","Arpa","Laúd","Clavicordio"],answer:1},{q:"¿Qué película ganó el Oscar a Mejor Película en 1994, superando a 'Pulp Fiction'?",options:["Braveheart","Forrest Gump","El Rey León","Schindler's List"],answer:1},{q:"¿Quién es el compositor de la ópera 'La Traviata'?",options:["Giacomo Puccini","Giuseppe Verdi","Gioachino Rossini","Richard Wagner"],answer:1},{q:"¿Qué actor protagonizó 'Taxi Driver' bajo la dirección de Martin Scorsese?",options:["Robert De Niro","Harvey Keitel","Al Pacino","Dustin Hoffman"],answer:0},{q:"¿Qué banda de rock australiana es famosa por el álbum 'Back in Black'?",options:["INXS","Silverchair","AC/DC","Midnight Oil"],answer:2},{q:"¿Cuál es el nombre del protagonista de 'La Naranja Mecánica'?",options:["Alex DeLarge","Arthur Fleck","Patrick Bateman","Tyler Durden"],answer:0},{q:"¿Qué famosa cantante es apodada 'La Diva del Bronx'?",options:["Gloria Estefan","Jennifer Lopez","Selena","Thalía"],answer:1},{q:"¿Quién dirigió '2001: Odisea del Espacio'?",options:["George Lucas","Ridley Scott","Stanley Kubrick","James Cameron"],answer:2},{q:"¿Qué rapero lanzó el influyente álbum 'To Pimp a Butterfly'?",options:["Drake","Kendrick Lamar","Kanye West","J. Cole"],answer:1},{q:"¿Qué película de 1950 comienza con un cadáver flotando en una piscina narrando su propia historia?",options:["La Jungla de Asfalto","Sunset Boulevard","All About Eve","Double Indemnity"],answer:1},{q:"¿Qué músico es considerado el 'Padre del Delta Blues'?",options:["B.B. King","Robert Johnson","Muddy Waters","Buddy Guy"],answer:1},{q:"¿Quién interpretó a la malvada enfermera Ratched en 'Atrapado sin salida'?",options:["Faye Dunaway","Louise Fletcher","Diane Keaton","Ellen Burstyn"],answer:1},{q:"¿Qué banda inglesa lanzó el álbum 'London Calling'?",options:["The Sex Pistols","The Clash","The Jam","Joy Division"],answer:1},{q:"¿Cómo se llama el proceso de sincronizar la voz de un actor con el movimiento de sus labios en postproducción?",options:["Foley","Dubbing (Doblaje)","ADR","Scoring"],answer:2},{q:"¿Quién escribió el musical 'Hamilton'?",options:["Stephen Sondheim","Andrew Lloyd Webber","Lin-Manuel Miranda","Jonathan Larson"],answer:2},{q:"¿Qué película de terror popularizó el subgénero 'slasher' en 1978?",options:["Friday the 13th","Halloween","A Nightmare on Elm Street","The Texas Chain Saw Massacre"],answer:1},{q:"¿Qué guitarrista era conocido como 'Slowhand'?",options:["Jeff Beck","Eric Clapton","Jimmy Page","Keith Richards"],answer:1},{q:"¿Quién ganó el Oscar a Mejor Director por 'La lista de Schindler'?",options:["Francis Ford Coppola","Steven Spielberg","Oliver Stone","James Cameron"],answer:1},{q:"¿Qué banda lideró Thom Yorke?",options:["Muse","Radiohead","The Smile","Blur"],answer:1},{q:"¿Qué película de ciencia ficción presenta el concepto de 'La Matriz'?",options:["Inception","The Matrix","The Thirteenth Floor","eXistenZ"],answer:1},{q:"¿Qué cantante de jazz era apodada 'Lady Day'?",options:["Ella Fitzgerald","Billie Holiday","Sarah Vaughan","Nina Simone"],answer:1},{q:"¿Quién es el autor de la banda sonora de la saga 'Star Wars'?",options:["John Williams","Jerry Goldsmith","James Horner","Alan Silvestri"],answer:0},{q:"¿Qué actor interpretó a Truman Burbank en 'The Truman Show'?",options:["Tom Hanks","Jim Carrey","Adam Sandler","Robin Williams"],answer:1},{q:"¿Qué álbum de Radiohead es considerado una obra maestra de la electrónica y el rock alternativo de 1997?",options:["Kid A","The Bends","OK Computer","In Rainbows"],answer:2},{q:"¿Qué directora se convirtió en la primera mujer en ganar el Oscar a Mejor Dirección?",options:["Greta Gerwig","Kathryn Bigelow","Sofia Coppola","Jane Campion"],answer:1},{q:"¿Cómo se llama el alter ego de David Bowie que llegó del espacio?",options:["Major Tom","Ziggy Stardust","The Thin White Duke","Aladdin Sane"],answer:1},{q:"¿Qué película de 1939 termina con la frase: 'Francamente, querida, me importa un bledo'?",options:["Casablanca","Lo que el viento se llevó","Ciudadano Kane","Rebecca"],answer:1},{q:"¿Quién es el vocalista de la banda The Rolling Stones?",options:["Keith Richards","Mick Jagger","Charlie Watts","Ronnie Wood"],answer:1},{q:"¿Qué película animada de 1995 fue la primera en ser creada totalmente por computadora?",options:["A Bug's Life","Toy Story","Antz","Shrek"],answer:1},{q:"¿Qué cantante lanzó el álbum 'Lemonade'?",options:["Rihanna","Beyoncé","Solange","Alicia Keys"],answer:1},{q:"¿En qué ciudad se desarrolla la trama del musical 'Los Miserables'?",options:["Londres","París","Lyon","Marsella"],answer:1},{q:"¿Qué actor protagonizó la película 'El precio del poder' (Scarface) en 1983?",options:["Robert De Niro","Al Pacino","Andy García","John Travolta"],answer:1},{q:"¿Qué grupo de rock progresivo creó la obra 'The Wall'?",options:["Genesis","Yes","Pink Floyd","King Crimson"],answer:2},{q:"¿Quién dirigió 'Ciudadano Kane', considerada a menudo la mejor película de la historia?",options:["Alfred Hitchcock","Orson Welles","John Ford","Howard Hawks"],answer:1},{q:"¿Qué artista grabó el álbum 'Blue' en 1971?",options:["Joan Baez","Joni Mitchell","Carole King","Janis Joplin"],answer:1},{q:"¿Qué película de Quentin Tarantino está dividida en dos volúmenes?",options:["Pulp Fiction","Kill Bill","Reservoir Dogs","Django Unchained"],answer:1},{q:"¿Cuál es la ópera más famosa de Georges Bizet, ambientada en Sevilla?",options:["Don Giovanni","Carmen","Tosca","Aida"],answer:1},{q:"¿Qué actor interpretó a Indiana Jones en su primera película 'En busca del arca perdida'?",options:["Harrison Ford","Sean Connery","Mark Hamill","Kurt Russell"],answer:0},{q:"¿Qué banda de heavy metal lanzó el álbum 'Master of Puppets'?",options:["Iron Maiden","Black Sabbath","Metallica","Slayer"],answer:2},{q:"¿Quién dirigió la película 'Seven' (Se7en)?",options:["Christopher Nolan","David Fincher","Ridley Scott","Jonathan Demme"],answer:1},{q:"¿Quién es el autor de la novela épica 'Los miserables'?",options:["Alexandre Dumas","Gustave Flaubert","Victor Hugo","Honoré de Balzac"],answer:2},{q:"¿En qué ciudad se desarrolla la acción de 'Ulises', la obra maestra de James Joyce?",options:["Londres","Dublín","París","Trieste"],answer:1},{q:"¿Qué autor ruso escribió 'Crimen y castigo'?",options:["León Tolstói","Fiódor Dostoyevski","Antón Chéjov","Iván Turguénev"],answer:1},{q:"¿Cuál es el nombre del ingenioso hidalgo en la obra de Miguel de Cervantes?",options:["Sancho Panza","Alonso Quijano","Dulcineo del Toboso","Pedro Pérez"],answer:1},{q:"¿Qué escritora británica es la autora de 'Frankenstein o el moderno Prometeo'?",options:["Jane Austen","Charlotte Brontë","Mary Shelley","Virginia Woolf"],answer:2},{q:"¿Quién escribió la tragedia 'Hamlet'?",options:["Christopher Marlowe","William Shakespeare","Ben Jonson","John Milton"],answer:1},{q:"¿A qué movimiento literario pertenece el poeta nicaragüense Rubén Darío?",options:["Romanticismo","Realismo","Modernismo","Surrealismo"],answer:2},{q:"¿Qué novela de Gabriel García Márquez comienza con el coronel Aureliano Buendía frente al pelotón de fusilamiento?",options:["El amor en los tiempos del cólera","Crónica de una muerte anunciada","Cien años de soledad","El otoño del patriarca"],answer:2},{q:"¿Quién es el autor de 'La divina comedia'?",options:["Petrarca","Boccaccio","Dante Alighieri","Maquiavelo"],answer:2},{q:"¿En qué país nació el escritor Franz Kafka?",options:["Alemania","Austria","República Checa (Imperio austrohúngaro)","Hungría"],answer:2},{q:"¿Qué autor estadounidense escribió 'El gran Gatsby'?",options:["Ernest Hemingway","William Faulkner","F. Scott Fitzgerald","John Steinbeck"],answer:2},{q:"¿Cuál es el seudónimo de Neftalí Ricardo Reyes Basoalto?",options:["Gabriela Mistral","Pablo Neruda","Octavio Paz","Jorge Luis Borges"],answer:1},{q:"¿Qué obra de George Orwell es una sátira de la Revolución Rusa protagonizada por animales?",options:["1984","Homenaje a Cataluña","Rebelión en la granja","Los días de Birmania"],answer:2},{q:"¿Quién escribió 'La metamorfosis'?",options:["Thomas Mann","Franz Kafka","Hermann Hesse","Stefan Zweig"],answer:1},{q:"¿Qué autor es conocido por crear el género del relato detectivesco con Auguste Dupin?",options:["Arthur Conan Doyle","Agatha Christie","Edgar Allan Poe","Raymond Chandler"],answer:2},{q:"¿Cuál es el título de la primera parte de 'En busca del tiempo perdido' de Marcel Proust?",options:["A la sombra de las muchachas en flor","El mundo de Guermantes","Por el camino de Swann","Sodoma y Gomorra"],answer:2},{q:"¿Qué premio Nobel de Literatura escribió 'El extranjero'?",options:["Jean-Paul Sartre","Albert Camus","André Gide","Samuel Beckett"],answer:1},{q:"¿Quién es la autora de la serie de novelas de 'Harry Potter'?",options:["C.S. Lewis","J.K. Rowling","Ursula K. Le Guin","Enid Blyton"],answer:1},{q:"¿Qué filósofo y escritor español es el autor de 'Niebla'?",options:["Miguel de Unamuno","José Ortega y Gasset","Pío Baroja","Antonio Machado"],answer:0},{q:"¿Cuál es el nombre del capitán en la novela 'Moby Dick' de Herman Melville?",options:["Ismael","Queequeg","Starbuck","Ahab"],answer:3},{q:"¿Qué autor colombiano escribió 'La vorágine'?",options:["Jorge Isaacs","José Eustasio Rivera","Álvaro Mutis","Gabriel García Márquez"],answer:1},{q:"¿Quién escribió 'Esperando a Godot'?",options:["Eugène Ionesco","Samuel Beckett","Harold Pinter","Bertolt Brecht"],answer:1},{q:"¿Qué poeta romano escribió 'La Eneida'?",options:["Ovidio","Horacio","Virgilio","Catulo"],answer:2},{q:"¿Quién es el autor de la distopía 'Un mundo feliz'?",options:["Aldous Huxley","Ray Bradbury","Anthony Burgess","H.G. Wells"],answer:0},{q:"¿Qué escritora mexicana es la autora de 'Como agua para chocolate'?",options:["Elena Poniatowska","Laura Esquivel","Rosario Castellanos","Sor Juana Inés de la Cruz"],answer:1},{q:"¿Cuál es el poema épico más antiguo que se conserva de la literatura española?",options:["Cantar de Mio Cid","Libro de buen amor","La Celestina","Coplas a la muerte de su padre"],answer:0},{q:"¿Quién escribió 'El nombre de la rosa'?",options:["Italo Calvino","Umberto Eco","Primo Levi","Dario Fo"],answer:1},{q:"¿Qué autor perteneció a la 'Generación del 27' y escribió 'Bodas de sangre'?",options:["Federico García Lorca","Rafael Alberti","Luis Cernuda","Vicente Aleixandre"],answer:0},{q:"¿Quién es el autor de 'Fausto'?",options:["Friedrich Schiller","Johann Wolfgang von Goethe","Heinrich Heine","Novalis"],answer:1},{q:"¿Qué novela de Virginia Woolf sigue un día en la vida de una mujer de la alta sociedad londinense?",options:["Al faro","Las olas","La señora Dalloway","Orlando"],answer:2},{q:"¿Quién escribió 'El principito'?",options:["Antoine de Saint-Exupéry","Jules Verne","Charles Perrault","Albert Camus"],answer:0},{q:"¿Qué autor peruano ganó el Premio Nobel de Literatura en 2010?",options:["César Vallejo","Mario Vargas Llosa","José María Arguedas","Julio Ramón Ribeyro"],answer:1},{q:"¿Cuál es la obra cumbre del escritor portugués José Saramago?",options:["El evangelio según Jesucristo","Ensayo sobre la ceguera","Las intermitencias de la muerte","Memorial del convento"],answer:1},{q:"¿Quién escribió la serie de relatos 'El Aleph'?",options:["Jorge Luis Borges","Julio Cortázar","Adolfo Bioy Casares","Ernesto Sabato"],answer:0},{q:"¿Qué poeta estadounidense escribió 'Hojas de hierba'?",options:["Robert Frost","T.S. Eliot","Walt Whitman","Ezra Pound"],answer:2},{q:"¿Quién es el autor de 'Cumbres borrascosas'?",options:["Charlotte Brontë","Emily Brontë","Anne Brontë","Jane Austen"],answer:1},{q:"¿Qué autor escribió 'Los pasos perdidos'?",options:["Alejo Carpentier","Miguel Ángel Asturias","Juan Rulfo","Carlos Fuentes"],answer:0},{q:"¿Cuál es el título de la obra de Homero que narra el regreso de un héroe a Ítaca?",options:["La Ilíada","La Odisea","La Eneida","Edipo Rey"],answer:1},{q:"¿Quién escribió 'Pedro Páramo'?",options:["Juan Rulfo","Octavio Paz","Mariano Azuela","Juan José Arreola"],answer:0},{q:"¿Qué escritora chilena es la autora de 'La casa de los espíritus'?",options:["Gabriela Mistral","Isabel Allende","Marcela Serrano","María Luisa Bombal"],answer:1},{q:"¿Quién es el autor de 'El retrato de Dorian Gray'?",options:["Oscar Wilde","Bram Stoker","Robert Louis Stevenson","H.G. Wells"],answer:0},{q:"¿Qué autor francés escribió la saga de 'Los tres mosqueteros'?",options:["Jules Verne","Alexandre Dumas","Stendhal","Guy de Maupassant"],answer:1},{q:"¿Quién escribió 'Rayuela', una novela que se puede leer en diferentes órdenes?",options:["Julio Cortázar","Jorge Luis Borges","Mario Benedetti","Juan Carlos Onetti"],answer:0},{q:"¿Qué obra de teatro de Samuel Beckett es considerada el exponente máximo del teatro del absurdo?",options:["Final de partida","La última cinta de Krapp","Esperando a Godot","Los días felices"],answer:2},{q:"¿Quién es el autor de 'Madame Bovary'?",options:["Honoré de Balzac","Gustave Flaubert","Émile Zola","Stendhal"],answer:1},{q:"¿Qué poeta español escribió 'Campos de Castilla'?",options:["Antonio Machado","Juan Ramón Jiménez","Federico García Lorca","Miguel Hernández"],answer:0},{q:"¿Quién escribió la novela de terror 'Drácula'?",options:["Mary Shelley","Bram Stoker","H.P. Lovecraft","Stephen King"],answer:1},{q:"¿Qué autor estadounidense ganó el Nobel tras escribir 'El viejo y el mar'?",options:["William Faulkner","Ernest Hemingway","John Steinbeck","Sinclair Lewis"],answer:1},{q:"¿Quién es la autora de 'Orgullo y prejuicio'?",options:["Jane Austen","Charlotte Brontë","George Eliot","Virginia Woolf"],answer:0},{q:"¿Qué filósofo francés escribió la obra existencialista 'La náusea'?",options:["Albert Camus","Jean-Paul Sartre","Simone de Beauvoir","Michel Foucault"],answer:1},{q:"¿Cuál es la partícula elemental responsable de mediar la fuerza electromagnética?",options:["Gluón","Fotón","Bosón de Higgs","Gravitón"],answer:1},{q:"¿Qué lenguaje de programación es considerado el 'padre' de C, Java y Python por su estructura de bloques?",options:["Fortran","ALGOL","Pascal","Assembly"],answer:1},{q:"¿Cómo se llama el horizonte de sucesos de un agujero negro donde la velocidad de escape iguala a la de la luz?",options:["Límite de Chandrasekhar","Radio de Schwarzschild","Punto de Lagrange","Singularidad de Penrose"],answer:1},{q:"¿Qué componente de la computadora se encarga de realizar operaciones aritméticas y lógicas?",options:["RAM","ALU","BIOS","Chipset"],answer:1},{q:"¿Cuál es el elemento químico más abundante en la corteza terrestre?",options:["Hierro","Silicio","Oxígeno","Aluminio"],answer:2},{q:"¿Qué científico propuso el modelo atómico donde los electrones orbitan en niveles de energía discretos?",options:["Rutherford","Niels Bohr","Dalton","Schrödinger"],answer:1},{q:"¿Cómo se denomina a la técnica que permite editar genes utilizando una enzima y una guía de ARN?",options:["PCR","CRISPR-Cas9","Secuenciación de Sanger","Optogenética"],answer:1},{q:"¿Qué protocolo se utiliza para transferir archivos de forma segura a través de una red?",options:["HTTP","SFTP","UDP","SNMP"],answer:1},{q:"¿Cuál es el valor aproximado de la constante de aceleración de la gravedad en la superficie de la Tierra?",options:["8.9 m/s²","9.8 m/s²","10.2 m/s²","11.1 m/s²"],answer:1},{q:"¿Qué empresa lanzó el primer microprocesador comercial del mundo, el 4004?",options:["IBM","AMD","Intel","Motorola"],answer:2},{q:"¿Cómo se llama la temperatura teórica más baja posible donde el movimiento molecular cesa?",options:["Punto de congelación","Cero absoluto","Cero Kelvin","Ambas Cero absoluto y Cero Kelvin"],answer:3},{q:"¿Qué telescopio espacial fue lanzado en 2021 para suceder al Hubble?",options:["Kepler","James Webb","Spitzer","Chandra"],answer:1},{q:"¿Cuál es la unidad de medida de la inductancia eléctrica?",options:["Faradio","Henrio","Ohmio","Vatio"],answer:1},{q:"¿Qué compuesto químico tiene la fórmula H2SO4?",options:["Ácido clorhídrico","Ácido nítrico","Ácido sulfúrico","Ácido fosfórico"],answer:2},{q:"¿En qué año se fundó la World Wide Web (WWW) de la mano de Tim Berners-Lee?",options:["1985","1989","1991","1995"],answer:1},{q:"¿Qué rama de la física estudia el comportamiento de la luz y su interacción con la materia?",options:["Termodinámica","Óptica","Acústica","Electromagnetismo"],answer:1},{q:"¿Cuál es el nombre del primer satélite artificial puesto en órbita por el hombre?",options:["Explorer 1","Vostok 1","Sputnik 1","Telstar"],answer:2},{q:"¿Qué tipo de memoria es volátil y pierde su información al apagar la computadora?",options:["SSD","HDD","RAM","ROM"],answer:2},{q:"¿Quién descubrió la penicilina en 1928?",options:["Louis Pasteur","Alexander Fleming","Marie Curie","Robert Koch"],answer:1},{q:"¿Cómo se llama el proceso por el cual un núcleo atómico pesado se divide en dos más ligeros?",options:["Fusión nuclear","Fisión nuclear","Desintegración alfa","Ionización"],answer:1},{q:"¿Qué gas es el principal responsable del efecto invernadero en la Tierra?",options:["Metano","Dióxido de Carbono","Ozono","Óxido nitroso"],answer:1},{q:"¿Qué científico formuló las tres leyes del movimiento y la ley de gravitación universal?",options:["Galileo Galilei","Johannes Kepler","Isaac Newton","Nicola Tesla"],answer:2},{q:"¿Cuál es la velocidad de la luz en el vacío?",options:["299,792 km/s","300,000 km/h","150,000 km/s","450,000 km/s"],answer:0},{q:"¿Qué metal es líquido a temperatura ambiente?",options:["Galio","Mercurio","Cesio","Magnesio"],answer:1},{q:"¿Cuál es el pH de una sustancia neutra como el agua pura?",options:["0","5","7","14"],answer:2},{q:"¿Qué siglas corresponden a la Inteligencia Artificial capaz de realizar cualquier tarea intelectual humana?",options:["ANI","AGI","ASI","NLP"],answer:1},{q:"¿Quién es considerada la primera programadora de la historia?",options:["Grace Hopper","Ada Lovelace","Margaret Hamilton","Joan Clarke"],answer:1},{q:"¿Qué parte de la célula eucariota contiene el material genético?",options:["Citoplasma","Ribosoma","Núcleo","Mitocondria"],answer:2},{q:"¿Cuál es el prefijo del Sistema Internacional que representa 10 a la potencia de -9?",options:["Pico","Nano","Micro","Femto"],answer:1},{q:"¿Qué ley establece que la presión de un gas es inversamente proporcional a su volumen (a temperatura constante)?",options:["Ley de Charles","Ley de Boyle","Ley de Gay-Lussac","Ley de Avogadro"],answer:1},{q:"¿Qué sistema operativo utiliza el kernel Linux?",options:["macOS","Windows 11","Ubuntu","Solaris"],answer:2},{q:"¿Cuál es la estrella más cercana a nuestro sistema solar?",options:["Sirio","Próxima Centauri","Betelgeuse","Vega"],answer:1},{q:"¿Qué proceso convierte el azúcar en alcohol y dióxido de carbono mediante levaduras?",options:["Fotosíntesis","Fermentación","Combustión","Oxidación"],answer:1},{q:"¿Qué unidad mide la frecuencia, equivalente a ciclos por segundo?",options:["Vatio","Hertz (Hz)","Julio","Newton"],answer:1},{q:"¿Quién desarrolló la teoría de la relatividad general?",options:["Max Planck","Albert Einstein","Stephen Hawking","Richard Feynman"],answer:1},{q:"¿Cómo se llama el lenguaje de marcado estándar para crear páginas web?",options:["XML","CSS","HTML","PHP"],answer:2},{q:"¿Qué mineral es el más duro según la escala de Mohs?",options:["Corindón","Topacio","Diamante","Cuarzo"],answer:2},{q:"¿Qué tipo de enlace se forma cuando dos átomos comparten electrones?",options:["Enlace iónico","Enlace covalente","Enlace metálico","Enlace de Van der Waals"],answer:1},{q:"¿Cuál es el planeta más grande de nuestro sistema solar?",options:["Saturno","Neptuno","Júpiter","Urano"],answer:2},{q:"¿Qué científico descubrió los grupos sanguíneos humanos (A, B, O)?",options:["Karl Landsteiner","Gregor Mendel","Louis Pasteur","Ivan Pavlov"],answer:0},{q:"¿Qué tecnología permite conectar dispositivos de forma inalámbrica en distancias cortas?",options:["Ethernet","Bluetooth","NFC","Infrarrojo"],answer:1},{q:"¿Qué fenómeno describe el cambio de frecuencia de una onda cuando la fuente se mueve respecto al observador?",options:["Efecto Joule","Efecto Doppler","Efecto Fotoeléctrico","Efecto Tyndall"],answer:1},{q:"¿Cuál es el componente principal del gas natural?",options:["Propano","Butano","Metano","Etano"],answer:2},{q:"¿Qué red social fue la primera en superar los 1,000 millones de usuarios activos?",options:["Twitter","Facebook","Instagram","WhatsApp"],answer:1},{q:"¿Quién es el fundador de la compañía SpaceX?",options:["Jeff Bezos","Elon Musk","Richard Branson","Bill Gates"],answer:1},{q:"¿Qué descubrió Marie Curie junto a su esposo Pierre?",options:["La electricidad","El Radio y el Polonio","Los Rayos X","La penicilina"],answer:1},{q:"¿Cómo se llama el buscador de Internet que domina el mercado desde finales de los 90?",options:["Yahoo","Bing","Google","DuckDuckGo"],answer:2},{q:"¿Qué mide un sismógrafo?",options:["La humedad","La presión atmosférica","La intensidad de los terremotos","La velocidad del viento"],answer:2},{q:"¿Cuál es el nombre de la galaxia en la que se encuentra la Tierra?",options:["Andrómeda","Sombrero","Vía Láctea","Triángulo"],answer:2},{q:"¿Qué parte de la planta absorbe el agua y los nutrientes del suelo?",options:["Hoja","Tallo","Raíz","Flor"],answer:2},{q:"¿Cuál es el río más largo del mundo?",options:["Nilo","Amazonas","Misisipi","Yangtsé"],answer:1},{q:"¿En qué año cayó el Muro de Berlín?",options:["1987","1989","1991","1993"],answer:1},{q:"¿Qué país tiene forma de bota?",options:["Grecia","España","Italia","Portugal"],answer:2},{q:"¿Cuál es el lugar más seco de la Tierra?",options:["Desierto del Sahara","Desierto de Atacama","Valle de la Muerte","Desierto de Gobi"],answer:1},{q:"¿Quién fue el primer hombre en pisar la Luna?",options:["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","Michael Collins"],answer:2},{q:"¿Qué ciudad es conocida como 'La Gran Manzana'?",options:["Londres","París","Nueva York","Los Ángeles"],answer:2},{q:"¿Cuál es la capital de Australia?",options:["Sídney","Melbourne","Canberra","Perth"],answer:2},{q:"¿En qué guerra se utilizó por primera vez la bomba atómica?",options:["Primera Guerra Mundial","Guerra de Vietnam","Segunda Guerra Mundial","Guerra de Corea"],answer:2},{q:"¿Qué selección nacional ha ganado más Copas del Mundo de la FIFA?",options:["Alemania","Italia","Brasil","Argentina"],answer:2},{q:"¿Cuál es el océano más grande del mundo?",options:["Atlántico","Índico","Ártico","Pacífico"],answer:3},{q:"¿Qué civilización construyó las pirámides de Giza?",options:["Maya","Inca","Egipcia","Azteca"],answer:2},{q:"¿Quién pintó 'La última cena'?",options:["Miguel Ángel","Rafael","Leonardo da Vinci","Donatello"],answer:2},{q:"¿Cuál es el idioma más hablado en el mundo (nativos y no nativos)?",options:["Chino mandarín","Inglés","Español","Hindi"],answer:1},{q:"¿En qué continente se encuentra el monte Kilimanjaro?",options:["Asia","América","África","Oceanía"],answer:2},{q:"¿Quién fue la primera mujer en ganar un Premio Nobel?",options:["Marie Curie","Rosalind Franklin","Ada Lovelace","Frida Kahlo"],answer:0},{q:"¿Qué país regaló la Estatua de la Libertad a Estados Unidos?",options:["Reino Unido","Francia","Alemania","Italia"],answer:1},{q:"¿Cuál es el metal precioso cuyo símbolo químico es Au?",options:["Plata","Oro","Platino","Cobre"],answer:1},{q:"¿Quién escribió 'El diario de Ana Frank'?",options:["Ana Frank","Virginia Woolf","Agatha Christie","Simone de Beauvoir"],answer:0},{q:"¿Cuál es el país más pequeño del mundo?",options:["Mónaco","Nauru","Ciudad del Vaticano","San Marino"],answer:2},{q:"¿En qué año comenzó la Revolución Francesa?",options:["1776","1789","1804","1812"],answer:1},{q:"¿Cuál es la montaña más alta del mundo sobre el nivel del mar?",options:["K2","Everest","Kangchenjunga","Lhotse"],answer:1},{q:"¿Qué estrecho separa a Europa de África?",options:["Estrecho de Magallanes","Estrecho de Bering","Estrecho de Gibraltar","Estrecho de Ormuz"],answer:2},{q:"¿Quién es el autor de 'El origen de las especies'?",options:["Isaac Newton","Gregor Mendel","Charles Darwin","Louis Pasteur"],answer:2},{q:"¿Qué deporte practica Rafael Nadal?",options:["Golf","Tenis","Fútbol","Baloncesto"],answer:1},{q:"¿Cuál es el edificio más alto del mundo actualmente?",options:["Burj Khalifa","Empire State","Torre de Shanghái","One World Trade Center"],answer:0},{q:"¿En qué país se originó la pizza?",options:["Grecia","Italia","Turquía","Egipto"],answer:1},{q:"¿Quién fue el líder de la Revolución Rusa de 1917?",options:["Stalin","Lenin","Trotsky","Nicolás II"],answer:1},{q:"¿Qué órgano del cuerpo humano es el encargado de bombear sangre?",options:["Pulmones","Cerebro","Corazón","Hígado"],answer:2},{q:"¿Cuál es la capital de Japón?",options:["Kioto","Osaka","Tokio","Hiroshima"],answer:2},{q:"¿Qué evento marcó el inicio de la Segunda Guerra Mundial?",options:["Ataque a Pearl Harbor","Invasión de Polonia","Batalla de Stalingrado","Desembarco de Normandía"],answer:1},{q:"¿Quién descubrió América en 1492?",options:["Américo Vespucio","Cristóbal Colón","Fernando de Magallanes","Vasco da Gama"],answer:1},{q:"¿Qué selección ganó el Mundial de Fútbol de Qatar 2022?",options:["Francia","Croacia","Argentina","Marruecos"],answer:2},{q:"¿Cuál es el elemento químico del diamante?",options:["Silicio","Carbono","Nitrógeno","Oxígeno"],answer:1},{q:"¿En qué ciudad se encuentran los Jardines Colgantes, una de las maravillas del mundo antiguo?",options:["Atenas","Roma","Babilonia","Alejandría"],answer:2},{q:"¿Qué país tiene la mayor población del mundo actualmente?",options:["China","India","Estados Unidos","Indonesia"],answer:1},{q:"¿Quién escribió 'La Ilíada'?",options:["Sófocles","Platón","Homero","Aristóteles"],answer:2},{q:"¿Cuál es el desierto más grande del mundo (incluyendo zonas polares)?",options:["Sahara","Gobi","Antártida","Ártico"],answer:2},{q:"¿Qué filósofo fue maestro de Alejandro Magno?",options:["Sócrates","Aristóteles","Platón","Heráclito"],answer:1},{q:"¿Qué país inventó la pólvora?",options:["India","Egipto","China","Grecia"],answer:2},{q:"¿Cuál es la moneda oficial del Reino Unido?",options:["Euro","Dólar","Libra esterlina","Franco"],answer:2},{q:"¿Qué científico propuso que la Tierra gira alrededor del Sol?",options:["Ptolomeo","Nicolás Copérnico","Isaac Newton","Tycho Brahe"],answer:1},{q:"¿En qué país se encuentra la ciudad de Petra?",options:["Egipto","Jordania","Irak","Irán"],answer:1},{q:"¿Qué famosa pintora mexicana es conocida por sus autorretratos?",options:["Diego Rivera","Leonora Carrington","Frida Kahlo","Remedios Varo"],answer:2},{q:"¿Cuál es la capital de Canadá?",options:["Toronto","Vancouver","Ottawa","Montreal"],answer:2},{q:"¿Qué imperio fue gobernado por Julio César?",options:["Imperio Griego","Imperio Otomano","Imperio Romano","Imperio Mongol"],answer:2},{q:"¿Cómo se llama el proceso por el cual las plantas fabrican su alimento?",options:["Respiración","Fotosíntesis","Transpiración","Fermentación"],answer:1},{q:"¿Quién fue el 'Rey Sol' de Francia?",options:["Luis XIV","Luis XVI","Napoleón","Carlos Magno"],answer:0},{q:"¿Cuál es la ciudad más poblada de África?",options:["El Cairo","Lagos","Johannesburgo","Nairobi"],answer:1},{q:"¿Qué instrumento tocaba Ludwig van Beethoven?",options:["Violín","Flauta","Piano","Guitarra"],answer:2},{q:"¿Qué país se separó de la Unión Soviética primero en 1990?",options:["Estonia","Letonia","Lituania","Ucrania"],answer:2},{q:"¿Cuál es el canal que une el océano Atlántico con el Pacífico?",options:["Canal de Suez","Canal de Corinto","Canal de Panamá","Canal de Kiel"],answer:2},{q:"¿Qué metal es el mejor conductor de la electricidad?",options:["Oro","Cobre","Plata","Aluminio"],answer:2},{q:"¿Quién escribió 'La Odisea'?",options:["Homero","Virgilio","Esquilo","Eurípides"],answer:0},{q:"¿Cuál es el nombre de la fosa marina más profunda del mundo?",options:["Fosa de Java","Fosa de las Marianas","Fosa de Puerto Rico","Fosa de Tonga"],answer:1},{q:"¿Qué país tiene más islas en el mundo?",options:["Canadá","Filipinas","Suecia","Indonesia"],answer:2},{q:"¿Quién pintó 'El grito'?",options:["Vincent van Gogh","Edvard Munch","Pablo Picasso","Salvador Dalí"],answer:1},{q:"¿Cuál es el animal terrestre más rápido?",options:["León","Guepardo","Antílope","Tigre"],answer:1},{q:"¿Qué gas respiramos principalmente del aire?",options:["Oxígeno","Dióxido de carbono","Nitrógeno","Argón"],answer:2},{q:"¿Cuál es la capital de Brasil?",options:["Río de Janeiro","São Paulo","Brasilia","Salvador"],answer:2},{q:"¿En qué año terminó la Primera Guerra Mundial?",options:["1914","1917","1918","1920"],answer:2},{q:"¿Quién fue la primera mujer en el espacio?",options:["Sally Ride","Valentina Tereshkova","Yuri Gagarin","Svetlana Savitskaya"],answer:1},{q:"¿Cuál es el nombre del famoso detective creado por Arthur Conan Doyle?",options:["Hércules Poirot","Sherlock Holmes","Sam Spade","Philip Marlowe"],answer:1},{q:"¿Qué país es el mayor productor de café del mundo?",options:["Colombia","Vietnam","Brasil","Etiopía"],answer:2},{q:"¿Quién fue el autor de la 'Relatividad'?",options:["Isaac Newton","Albert Einstein","Stephen Hawking","Niels Bohr"],answer:1},{q:"¿Qué país tiene como lengua oficial el portugués en Sudamérica?",options:["Argentina","Brasil","Chile","Uruguay"],answer:1},{q:"¿Cuál es el símbolo químico del Hierro?",options:["Hi","He","Fe","Ir"],answer:2},{q:"¿Qué evento deportivo se celebra cada 4 años y utiliza una antorcha?",options:["Mundial de Fútbol","Juegos Olímpicos","Tour de Francia","Super Bowl"],answer:1},{q:"¿Quién fundó el movimiento del Cubismo junto a Georges Braque?",options:["Salvador Dalí","Pablo Picasso","Joan Miró","Claude Monet"],answer:1},{q:"¿Cuál es el punto de ebullición del agua al nivel del mar?",options:["90°C","100°C","110°C","120°C"],answer:1},{q:"¿Qué país es conocido como 'La Tierra del Sol Naciente'?",options:["China","Japón","Corea del Sur","Tailandia"],answer:1},{q:"¿Quién fue el arquitecto principal de la Sagrada Familia en Barcelona?",options:["Le Corbusier","Frank Lloyd Wright","Antoni Gaudí","Oscar Niemeyer"],answer:2},{q:"¿Cuál es el órgano más grande del cuerpo humano?",options:["Hígado","Intestino","Piel","Pulmones"],answer:2},{q:"¿En qué año llegó el hombre a la Luna?",options:["1965","1969","1972","1975"],answer:1},{q:"¿Cuál es la capital de Rusia?",options:["San Petersburgo","Kiev","Moscú","Minsk"],answer:2},{q:"¿Qué artista es famoso por pintar latas de sopa Campbell?",options:["Andy Warhol","Jackson Pollock","Roy Lichtenstein","Banksy"],answer:0},{q:"¿Cuál es la nacionalidad de Nelson Mandela?",options:["Keniana","Etíope","Sudafricana","Nigeriana"],answer:2},{q:"¿Qué cordillera separa a España de Francia?",options:["Alpes","Pirineos","Cárpatos","Apeninos"],answer:1},{q:"¿Cuál es el planeta más cercano al Sol?",options:["Venus","Marte","Mercurio","Tierra"],answer:2},{q:"¿Quién escribió 'Don Quijote de la Mancha'?",options:["Lope de Vega","Miguel de Cervantes","Francisco de Quevedo","Federico García Lorca"],answer:1},{q:"¿Cuál es el idioma oficial de Austria?",options:["Austríaco","Francés","Alemán","Húngaro"],answer:2},{q:"¿Qué ciudad italiana es famosa por sus canales?",options:["Roma","Florencia","Venecia","Milán"],answer:2},{q:"¿Quién fue el primer presidente de los Estados Unidos?",options:["Thomas Jefferson","Abraham Lincoln","George Washington","John Adams"],answer:2},{q:"¿Qué sustancia otorga el color verde a las plantas?",options:["Caroteno","Xantofila","Clorofila","Antocianina"],answer:2},{q:"¿Cuál es la capital de Italia?",options:["Venecia","Nápoles","Roma","Florencia"],answer:2},{q:"¿Qué inventor patentó la bombilla eléctrica de larga duración?",options:["Nikola Tesla","Alexander Graham Bell","Thomas Edison","Benjamin Franklin"],answer:2},{q:"¿Cuál es la fobia a las arañas?",options:["Acrofobia","Claustrofobia","Aracnofobia","Agorafobia"],answer:2},{q:"¿Qué país tiene la bandera con una hoja de arce roja?",options:["Canadá","Líbano","Suiza","Japón"],answer:0},{q:"¿Quién escribió 'Romeo y Julieta'?",options:["Charles Dickens","William Shakespeare","Oscar Wilde","Mark Twain"],answer:1},{q:"¿Qué océano baña las costas de la India?",options:["Atlántico","Pacífico","Índico","Antártico"],answer:2},{q:"¿Cuál es el nombre del proceso de cambio de sólido a gas sin pasar por líquido?",options:["Evaporación","Fusión","Sublimación","Solidificación"],answer:2},{q:"¿En qué país se encuentra la Torre Eiffel?",options:["España","Alemania","Francia","Bélgica"],answer:2},{q:"¿Quién pintó la 'Mona Lisa'?",options:["Vincent van Gogh","Leonardo da Vinci","Pablo Picasso","Claude Monet"],answer:1},{q:"¿Cuál es la capital de Egipto?",options:["Alejandría","Luxor","El Cairo","Giza"],answer:2},{q:"¿Qué vitamina obtenemos principalmente del Sol?",options:["Vitamina A","Vitamina B12","Vitamina C","Vitamina D"],answer:3},{q:"¿Cuál es el país más grande de Sudamérica?",options:["Argentina","Colombia","Brasil","Perú"],answer:2},{q:"¿Quién fue el autor de 'El túnel'?",options:["Julio Cortázar","Ernesto Sabato","Jorge Luis Borges","Mario Benedetti"],answer:1},{q:"¿Qué instrumento de viento es típico del jazz y fue popularizado por Charlie Parker?",options:["Trompeta","Trombón","Saxofón","Clarinete"],answer:2},{q:"¿Cuál es el hueso más largo del cuerpo humano?",options:["Húmero","Tibia","Fémur","Radio"],answer:2},{q:"¿Qué civilización antigua inventó la democracia?",options:["Romana","Egipcia","Griega","Mesopotámica"],answer:2},{q:"¿En qué país se encuentra el Taj Mahal?",options:["Pakistán","India","Bangladesh","Nepal"],answer:1}],xe=15,ea=Math.min(10,Re.length),Ra=["A","B","C","D"],we=null,aa=null,f=new Map,S=-1,me=!1,A=null,L=[],$="lobby",na=[],oa=[],ia=0,ra="",sa=xe*1e3,oe=null,ta=null,N="",Ge="",Y=!1,Z=0,$e=0,ie=null,re=null,Ne=-1,Oe=-1,la=!1,ze=["Titanic","El Rey León","Toy Story","Coco","Frozen","Buscando a Nemo","Shrek","Avatar","Matrix","El Padrino","Volver al Futuro","Jurassic Park","Forrest Gump","El Señor de los Anillos","Harry Potter","Star Wars","Joker","Batman","El Hombre Araña","Iron Man","Los Vengadores","Capitán América","Thor","La Mujer Maravilla","Encanto","Moana","Intensamente","Cars","Ratatouille","WALL-E","Los Increíbles","Monsters Inc","Up","La Bella y la Bestia","La Sirenita","Aladdín","Cenicienta","Mulán","El Libro de la Selva","Roma","Amores Perros","Y Tu Mamá También","El Laberinto del Fauno","Relatos Salvajes","El Secreto de sus Ojos","Nueve Reinas","Diarios de Motocicleta","Ciudad de Dios","Bohemian Rhapsody","Rápidos y Furiosos","Buscando a Dory","Soul","Luca","Valiente","Enredados","Ralph el Demoledor","Grandes Héroes","Zootopia","Red","Lightyear","Pinocho","101 Dálmatas","Dumbo","Bambi","Tiempos Violentos","El Origen","Interestelar","Tenet","Memento","El Caballero de la Noche","Blade Runner","El Octavo Pasajero","Depredador","Terminator","Mad Max","Doctor Strange","Viuda Negra","Hulk","Ant-Man","Deadpool","Guardianes de la Galaxia","Pantera Negra","Aquaman","James Bond","Misión Imposible","John Wick","Transformers","Indiana Jones","E.T. el Extraterrestre","Tiburón","Psicosis","El Exorcista","El Resplandor","Halloween","El Juego del Miedo","It","Mi Pobre Angelito","Loco por Mary","Una Esposa de Mentira","Ricky Bobby","Diario de una Pasión","Crepúsculo","50 Sombras de Grey","Bridget Jones","Mujer Bonita","Ghost","Dirty Dancing","Anastasia","El Príncipe de Egipto","Madagascar","La Era de Hielo","Kung Fu Panda","Cómo Entrenar a tu Dragón","Río","Hotel Transilvania","La La Land","Mamma Mia","Grease","Chicago","Moulin Rouge","Sonrisas y Lágrimas","Rescatando al Soldado Ryan","La Lista de Schindler","El Pianista","Apocalipsis Ahora","Pelotón","1917","Dunkerque","Rocky","Million Dollar Baby","Rambo","El Viaje de Chihiro","Mi Vecino Totoro","La Princesa Mononoke","Volver","Todo Sobre mi Madre","El Hijo de la Novia","La Historia Oficial","Camila","Ocho Apellidos Vascos","Coraline","El Extraño Mundo de Jack","Bichos","Avengers: Endgame","Logan","Cuenta Conmigo","La Vida es Bella","Cinema Paradiso","Amelie","Trainspotting","El Club de la Pelea","Mar Adentro","Tarzán","Hércules","Pocahontas","El Jorobado de Notre Dame","El Planeta del Tesoro","Atlantis: El Imperio Perdido","Hermano Oso","Vacas Vaqueras","Bolt","La Princesa y el Sapo","Lilo y Stitch","Spirit: El Corcel Indomable","Onward: Unidos","Wonka","Migración","La Familia Mitchell vs. Las Máquinas","Spider-Man: A Través del Spider-Verso","Vaiana 2","Bee Movie","El Espantatiburones","Hormiguitas","El Camino a El Dorado","Sinbad: La Leyenda de los Siete Mares","Mi Villano Favorito","Los Minions","Sing: Ven y Canta","La Vida Secreta de Tus Mascotas","Trolls","El Bebé Jefazo","La Gran Aventura LEGO","Lego Batman: La Película","Klaus","Las Aventuras de Tintín","ParaNorman","Frankenweenie","Robots","Rango","Megamente","Lluvia de Hamburguesas","El Castillo Ambulante","Ponyo","El Servicio de Entregas de Kiki","Nausicaä del Valle del Viento","Porco Rosso","La Tumba de las Luciérnagas","El Cuento de la Princesa Kaguya","Persépolis","Akira","Capitana Marvel","Eternos","Shang-Chi","Daredevil","Blade","Venom","X-Men","Wolverine","Hellboy","Watchmen","Kick-Ass","Kingsman","Linterna Verde","The Flash","Liga de la Justicia","Shazam","Escuadrón Suicida","Aves de Presa","El Hombre de Acero","Superman","Constantine","Guerra Civil","Guerra del Infinito","Spider-Man: Lejos de Casa","Spider-Man: Sin Camino a Casa","Thor: Ragnarok","Wonder Woman 1984","Casino Royale","Skyfall","Spectre","Sin Tiempo Para Morir","GoldenEye","Identidad Desconocida","Búsqueda Implacable","Los Mercenarios","300","Top Gun","Top Gun: Maverick","Tomb Raider","Lara Croft: Cuna de la Vida","Resident Evil","Underworld","Hitman","Tropa de Élite","Sicario: Tierra de Nadie","La Estafa Maestra","La Gran Evasión","Atrápame si Puedes","Black Hawk Derribado","Francotirador","Hasta el Último Hombre","Robocop","Aliens: El Regreso","Terminator 2: El Juicio Final","Duro de Matar","Arma Mortal","La Roca","Cara a Cara","Speed: Máxima Potencia","Punto de Quiebre","La Red Social","Los Infiltrados","Spotlight","Snatch: Cerdos y Diamantes","Buenos Muchachos","Casino","Heat","Sospechosos de Siempre","Perros de la Calle","Kill Bill","Bastardos sin Gloria","Django sin Cadenas","Había una Vez en Hollywood","Los Odiosos Ocho","Cara Cortada","El Gran Lebowski","Sin City","Drive","Chinatown","La Naranja Mecánica","Star Trek","2001: Odisea del Espacio","Ex Machina","Her","Distrito 9","Snowpiercer: Expreso del Apocalipsis","Looper","Al Filo del Mañana","Yo, Robot","Sentencia Previa","El Vengador del Futuro","Vanilla Sky","El Sexto Sentido","Señales","La Llegada","Marte: Operación Rescate","Gravedad","Dune","Dune Parte Dos","Pasajeros","Doce Monos","El Curioso Caso de Benjamin Button","El Imperio Contraataca","El Retorno del Jedi","La Amenaza Fantasma","El Despertar de la Fuerza","Rogue One","Pesadilla en Elm Street","Viernes 13","Scream: Vigila Quién Llama","El Silencio de los Inocentes","Los Otros","El Aro","El Conjuro","Annabelle","La Monja","Insidious","Get Out","Midsommar","Hereditary","Un Lugar en Silencio","Bird Box: A Ciegas","La Cosa","28 Días Después","Carrie","Misery","La Llorona","El Hoyo","REC","El Orfanato","Tesis","Abre los Ojos","Verónica","Sinister","La Cabaña del Terror","Cementerio de Animales","Cisne Negro","Réquiem por un Sueño","La Ciénaga","El Aura","Pizza, Birra, Faso","Iluminados por el Fuego","Tiempo de Valientes","El Robo del Siglo","Argentina, 1985","La Sociedad de la Nieve","Esperando la Carroza","Comodines","Tesis sobre un Homicidio","Plata Quemada","Un Cuento Chino","La Estrategia del Caracol","María Llena Eres de Gracia","Pájaros de Verano","Monos","La Vendedora de Rosas","Rosario Tijeras","Como Agua para Chocolate","Cronos","El Espinazo del Diablo","La Forma del Agua","Pacific Rim","Carancho","El Estudiante","El Mismo Amor, La Misma Lluvia","Wakolda","Las Acacias","El Clan","Animal","Granizo","Mujeres al Borde de un Ataque de Nervios","Átame","La Piel que Habito","Hable con Ella","Tacones Lejanos","Carne Trémula","La Mala Educación","Madres Paralelas","Dolor y Gloria","Ágora","Memorias del Subdesarrollo","Fresa y Chocolate","Barbie","Oppenheimer","Pobres Criaturas","Asesinos de la Luna","Los Que Se Quedan","Cónclave","Bullet Train","Knives Out: Entre Navajas y Secretos","Glass Onion","El Caballero Oscuro: La Leyenda Renace","¿Y Dónde Está el Piloto?","¿Qué Pasó Ayer?","Sucedió en Manhattan","Una Historia del Bronx","Hitch: Especialista en Citas","Click: Perdiendo el Control","Son Como Niños","Una Guerra de Película","Zoolander","El Reportero","Old School","De Boda en Boda","Una Pareja Despareja","Mira Quién Habla","Quisiera Ser Grande","Cazafantasmas","Hombres de Negro","Una Noche en el Museo","Stuart Little","Beethoven: Uno Más de la Familia","Las Tortugas Ninja","Mejor Imposible","Atrapado en el Tiempo","El Show de Truman","Náufrago","Cuatro Bodas y un Funeral","Notting Hill","Love Actually","Mientras Dormías","Cómo Perder a un Hombre en 10 Días","10 Cosas que Odio de Ti","(500) Días con Ella","Crazy Stupid Love","Antes del Amanecer","Antes del Atardecer","Yo Antes de Ti","Rocketman","Steve Jobs","El Aviador","Una Mente Brillante","La Teoría del Todo","El Código Enigma","Johnny y June","Ray","Selena","Whiplash: Música y Obsesión","Birdman","El Renacido","El Gran Hotel Budapest","Wicked","Cats","El Fantasma de la Ópera","El Cazador","Buenos Días Vietnam","Cartas desde Iwo Jima","Banderas de Nuestros Padres","Nacido el 4 de Julio","Lo Que el Viento se Llevó","Casablanca","Lawrence de Arabia","Patton","12 Años de Esclavitud","El Mago de Oz","Vértigo","Los Pájaros","La Ventana Indiscreta","Con la Muerte en los Talones","12 Hombres Sin Piedad","Cantando Bajo la Lluvia","Desayuno en Tiffany's","Bonnie y Clyde","Expreso Polar","Buddy el Elfo","Crónicas de Navidad","El Grinch","La Princesa Prometida","Jumanji","Jumanji: En la Selva","Karate Kid","Cool Runnings: Pasta Caliente","Space Jam","Un Sueño Posible","Coach Carter","Slumdog Millionaire","El Discurso del Rey","Memorias de un Geisha","El Diario de la Princesa","Boyhood: Momentos de una Vida","Manchester Junto al Mar","Lady Bird","Moonrise Kingdom","Los Tenenbaums","El Árbol de la Vida","La Vida Acuática","Edward Manos de Tijera","Beetlejuice","Los Goonies","Gremlins","La Máscara","Mentiroso Mentiroso","Eterno Resplandor de una Mente sin Recuerdos","Donnie Darko","Petróleo Sangriento","Lost in Translation","Babe: El Chanchito Valiente","Todo en un Día","El Club de los Cinco","Ace Ventura: Detective de Mascotas","Una Boda en Tiempos de Locura"],xa=90,De=["#ed8099","#4d65b4","#fbb954","#7ad36b","#b774e0","#5fd6c8"],W=null,ye=null,B=null,qe=null,je="",ge=new Set,R=0,C=null,u=[],m=0,O=0,c="lobby",U="",ca=["#ed8099","#4d65b4","#fbb954","#7ad36b","#b774e0","#5fd6c8"],X=null,Fe=null,He="",da=!1,Ce=null,D=0,ua="",se=0,T=[],I=0,pa=!1,La(document.getElementById("app"))}}})})();
