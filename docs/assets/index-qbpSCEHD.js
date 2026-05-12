var vn=r=>{throw TypeError(r)};var X=(r,e,t)=>e.has(r)?vn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,t);function bn(r,e){for(var t=0;t<e.length;t++){const n=e[t];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in r)){const s=Object.getOwnPropertyDescriptor(n,i);s&&Object.defineProperty(r,i,s.get?s:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class Cn{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return _n(e).buffer}}function _n(r){let e=0;for(const i of r)e+=i.byteLength;const t=new Uint8Array(e);let n=0;for(const i of r){const s=new Uint8Array(i.buffer,i.byteOffset,i.byteLength);t.set(s,n),n+=i.byteLength}return t}function at(r){return new Sn(r).unpack()}function ct(r){const e=new Tn,t=e.pack(r);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class Sn{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let n=0,i="",s,o;for(;n<e;)s=t[n],s<160?(o=s,n++):(s^192)<32?(o=(s&31)<<6|t[n+1]&63,n+=2):(s^224)<16?(o=(s&15)<<12|(t[n+1]&63)<<6|t[n+2]&63,n+=3):(o=(s&7)<<18|(t[n+1]&63)<<12|(t[n+2]&63)<<6|t[n+3]&63,n+=4),i+=String.fromCodePoint(o);return this.index+=e,i}unpack_array(e){const t=new Array(e);for(let n=0;n<e;n++)t[n]=this.unpack();return t}unpack_map(e){const t={};for(let n=0;n<e;n++){const i=this.unpack();t[i]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,n=(e>>23&255)-127,i=e&8388607|8388608;return(t===0?1:-1)*i*2**(n-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),n=e>>31,i=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(i-20)+t*2**(i-52);return(n===0?1:-1)*o}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class Tn{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const n=this.pack_array(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const n=e;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const n=this.pack_object(e);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),n=t.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const n=i=>{if(i<t){const s=this.pack(e[i]);return s instanceof Promise?s.then(()=>n(i+1)):n(i+1)}};return n(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const n=Math.floor(Math.log(e)/Math.LN2),i=e/2**n-1,s=Math.floor(i*2**52),o=2**32,a=t<<31|n+1023<<20|s/o&1048575,c=s%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),n=t.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");const i=s=>{if(s<t.length){const o=t[s];if(e.hasOwnProperty(o)){this.pack(o);const a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>i(s+1))}return i(s+1)}};return i(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),n=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Cn,this._textEncoder=new TextEncoder}}let lt=!0,dt=!0;function Z(r,e,t){const n=r.match(e);return n&&n.length>=t&&parseFloat(n[t],10)}function V(r,e,t){if(!r.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Ue("Unable to polyfill events");return}const i=r.RTCPeerConnection.prototype,s=i.addEventListener;i.addEventListener=function(a,c){if(a!==e)return s.apply(this,arguments);const l=d=>{const p=t(d);p&&(c.handleEvent?c.handleEvent(p):c(p))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),s.apply(this,[a,l])};const o=i.removeEventListener;i.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(i,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function kn(r){return typeof r!="boolean"?new Error("Argument type: "+typeof r+". Please use a boolean."):(lt=r,r?"adapter.js logging disabled":"adapter.js logging enabled")}function xn(r){return typeof r!="boolean"?new Error("Argument type: "+typeof r+". Please use a boolean."):(dt=!r,"adapter.js deprecation warnings "+(r?"disabled":"enabled"))}function Ue(){if(typeof window=="object"){if(lt)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function ze(r,e){dt&&console.warn(r+" is deprecated, please use "+e+" instead.")}function Rn(r){const e={browser:null,version:null};if(typeof r>"u"||!r.navigator||!r.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=r;if(t.userAgentData&&t.userAgentData.brands){const n=t.userAgentData.brands.find(i=>i.brand==="Chromium");if(n)return{browser:"chrome",version:parseInt(n.version,10)}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Z(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||r.isSecureContext===!1&&r.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Z(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(r.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Z(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=r.RTCRtpTransceiver&&"currentDirection"in r.RTCRtpTransceiver.prototype,e._safariVersion=Z(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function We(r){return Object.prototype.toString.call(r)==="[object Object]"}function pt(r){return We(r)?Object.keys(r).reduce(function(e,t){const n=We(r[t]),i=n?pt(r[t]):r[t],s=n&&!Object.keys(i).length;return i===void 0||s?e:Object.assign(e,{[t]:i})},{}):r}function Re(r,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(n=>{n.endsWith("Id")?Re(r,r.get(e[n]),t):n.endsWith("Ids")&&e[n].forEach(i=>{Re(r,r.get(i),t)})}))}function Ye(r,e,t){const n=t?"outbound-rtp":"inbound-rtp",i=new Map;if(e===null)return i;const s=[];return r.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&s.push(o)}),s.forEach(o=>{r.forEach(a=>{a.type===n&&a.trackId===o.id&&Re(r,a,i)})}),i}const Ke=Ue;function ft(r,e){const t=r&&r.navigator;if(!t.mediaDevices)return;const n=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const d=typeof a[l]=="object"?a[l]:{ideal:a[l]};d.exact!==void 0&&typeof d.exact=="number"&&(d.min=d.max=d.exact);const p=function(f,h){return f?f+h.charAt(0).toUpperCase()+h.slice(1):h==="deviceId"?"sourceId":h};if(d.ideal!==void 0){c.optional=c.optional||[];let f={};typeof d.ideal=="number"?(f[p("min",l)]=d.ideal,c.optional.push(f),f={},f[p("max",l)]=d.ideal,c.optional.push(f)):(f[p("",l)]=d.ideal,c.optional.push(f))}d.exact!==void 0&&typeof d.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[p("",l)]=d.exact):["min","max"].forEach(f=>{d[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[p(f,l)]=d[f])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},i=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(d,p,f){p in d&&!(f in d)&&(d[f]=d[p],delete d[p])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=n(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const d=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!d)){delete a.video.facingMode;let p;if(l.exact==="environment"||l.ideal==="environment"?p=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(p=["front"]),p)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(g=>g.kind==="videoinput");let h=f.find(g=>p.some(b=>g.label.toLowerCase().includes(b)));return!h&&f.length&&p.includes("back")&&(h=f[f.length-1]),h&&(a.video.deviceId=l.exact?{exact:h.deviceId}:{ideal:h.deviceId}),a.video=n(a.video),Ke("chrome: "+JSON.stringify(a)),c(a)})}a.video=n(a.video)}return Ke("chrome: "+JSON.stringify(a)),c(a)},s=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){i(a,d=>{t.webkitGetUserMedia(d,c,p=>{l&&l(s(p))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){const a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return i(c,l=>a(l).then(d=>{if(l.audio&&!d.getAudioTracks().length||l.video&&!d.getVideoTracks().length)throw d.getTracks().forEach(p=>{p.stop()}),new DOMException("","NotFoundError");return d},d=>Promise.reject(s(d))))}}}function ut(r){r.MediaStream=r.MediaStream||r.webkitMediaStream}function ht(r,e){if(!(e.version>102))if(typeof r=="object"&&r.RTCPeerConnection&&!("ontrack"in r.RTCPeerConnection.prototype)){Object.defineProperty(r.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});const t=r.RTCPeerConnection.prototype.setRemoteDescription;r.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=i=>{i.stream.addEventListener("addtrack",s=>{let o;r.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):o={track:s.track};const a=new Event("track");a.track=s.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[i.stream],this.dispatchEvent(a)}),i.stream.getTracks().forEach(s=>{let o;r.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.id):o={track:s};const a=new Event("track");a.track=s,a.receiver=o,a.transceiver={receiver:o},a.streams=[i.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else V(r,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function mt(r){if(typeof r=="object"&&r.RTCPeerConnection&&!("getSenders"in r.RTCPeerConnection.prototype)&&"createDTMFSender"in r.RTCPeerConnection.prototype){const e=function(i,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=i.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:i}};if(!r.RTCPeerConnection.prototype.getSenders){r.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const i=r.RTCPeerConnection.prototype.addTrack;r.RTCPeerConnection.prototype.addTrack=function(a,c){let l=i.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};const s=r.RTCPeerConnection.prototype.removeTrack;r.RTCPeerConnection.prototype.removeTrack=function(a){s.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const t=r.RTCPeerConnection.prototype.addStream;r.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(o=>{this._senders.push(e(this,o))})};const n=r.RTCPeerConnection.prototype.removeStream;r.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],n.apply(this,[s]),s.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof r=="object"&&r.RTCPeerConnection&&"getSenders"in r.RTCPeerConnection.prototype&&"createDTMFSender"in r.RTCPeerConnection.prototype&&r.RTCRtpSender&&!("dtmf"in r.RTCRtpSender.prototype)){const e=r.RTCPeerConnection.prototype.getSenders;r.RTCPeerConnection.prototype.getSenders=function(){const n=e.apply(this,[]);return n.forEach(i=>i._pc=this),n},Object.defineProperty(r.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function gt(r,e){if(e.version>=67||!(typeof r=="object"&&r.RTCPeerConnection&&r.RTCRtpSender&&r.RTCRtpReceiver))return;if(!("getStats"in r.RTCRtpSender.prototype)){const n=r.RTCPeerConnection.prototype.getSenders;n&&(r.RTCPeerConnection.prototype.getSenders=function(){const o=n.apply(this,[]);return o.forEach(a=>a._pc=this),o});const i=r.RTCPeerConnection.prototype.addTrack;i&&(r.RTCPeerConnection.prototype.addTrack=function(){const o=i.apply(this,arguments);return o._pc=this,o}),r.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>Ye(a,o.track,!0))}}if(!("getStats"in r.RTCRtpReceiver.prototype)){const n=r.RTCPeerConnection.prototype.getReceivers;n&&(r.RTCPeerConnection.prototype.getReceivers=function(){const s=n.apply(this,[]);return s.forEach(o=>o._pc=this),s}),V(r,"track",i=>(i.receiver._pc=i.srcElement,i)),r.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(o=>Ye(o,s.track,!1))}}if(!("getStats"in r.RTCRtpSender.prototype&&"getStats"in r.RTCRtpReceiver.prototype))return;const t=r.RTCPeerConnection.prototype.getStats;r.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof r.MediaStreamTrack){const i=arguments[0];let s,o,a;return this.getSenders().forEach(c=>{c.track===i&&(s?a=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===i&&(o?a=!0:o=c),c.track===i)),a||s&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function yt(r){r.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const e=r.RTCPeerConnection.prototype.addTrack;r.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const t=r.RTCPeerConnection.prototype.addStream;r.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(p=>p.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const n=r.RTCPeerConnection.prototype.removeStream;r.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};const i=r.RTCPeerConnection.prototype.removeTrack;r.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),i.apply(this,arguments)}}function vt(r,e){if(!r.RTCPeerConnection)return;if(r.RTCPeerConnection.prototype.addTrack&&e.version>=65)return yt(r);const t=r.RTCPeerConnection.prototype.getLocalStreams;r.RTCPeerConnection.prototype.getLocalStreams=function(){const d=t.apply(this);return this._reverseStreams=this._reverseStreams||{},d.map(p=>this._reverseStreams[p.id])};const n=r.RTCPeerConnection.prototype.addStream;r.RTCPeerConnection.prototype.addStream=function(d){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},d.getTracks().forEach(p=>{if(this.getSenders().find(h=>h.track===p))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[d.id]){const p=new r.MediaStream(d.getTracks());this._streams[d.id]=p,this._reverseStreams[p.id]=d,d=p}n.apply(this,[d])};const i=r.RTCPeerConnection.prototype.removeStream;r.RTCPeerConnection.prototype.removeStream=function(d){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},i.apply(this,[this._streams[d.id]||d]),delete this._reverseStreams[this._streams[d.id]?this._streams[d.id].id:d.id],delete this._streams[d.id]},r.RTCPeerConnection.prototype.addTrack=function(d,p){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(b=>b===d))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(b=>b.track===d))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[p.id];if(g)g.addTrack(d),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const b=new r.MediaStream([d]);this._streams[p.id]=b,this._reverseStreams[b.id]=p,this.addStream(b)}return this.getSenders().find(b=>b.track===d)};function s(l,d){let p=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const h=l._reverseStreams[f],g=l._streams[h.id];p=p.replace(new RegExp(g.id,"g"),h.id)}),new RTCSessionDescription({type:d.type,sdp:p})}function o(l,d){let p=d.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const h=l._reverseStreams[f],g=l._streams[h.id];p=p.replace(new RegExp(h.id,"g"),g.id)}),new RTCSessionDescription({type:d.type,sdp:p})}["createOffer","createAnswer"].forEach(function(l){const d=r.RTCPeerConnection.prototype[l],p={[l](){const f=arguments;return arguments.length&&typeof arguments[0]=="function"?d.apply(this,[g=>{const b=s(this,g);f[0].apply(null,[b])},g=>{f[1]&&f[1].apply(null,g)},arguments[2]]):d.apply(this,arguments).then(g=>s(this,g))}};r.RTCPeerConnection.prototype[l]=p[l]});const a=r.RTCPeerConnection.prototype.setLocalDescription;r.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(r.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(r.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:s(this,l)}}),r.RTCPeerConnection.prototype.removeTrack=function(d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!d._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(d._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(h=>{this._streams[h].getTracks().find(b=>d.track===b)&&(f=this._streams[h])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(d.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Ee(r,e){!r.RTCPeerConnection&&r.webkitRTCPeerConnection&&(r.RTCPeerConnection=r.webkitRTCPeerConnection),r.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const n=r.RTCPeerConnection.prototype[t],i={[t](){return arguments[0]=new(t==="addIceCandidate"?r.RTCIceCandidate:r.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};r.RTCPeerConnection.prototype[t]=i[t]})}function bt(r,e){e.version>102||V(r,"negotiationneeded",t=>{const n=t.target;if(!((e.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return t})}const Xe=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:bt,shimAddTrackRemoveTrack:vt,shimAddTrackRemoveTrackWithNative:yt,shimGetSendersWithDtmf:mt,shimGetUserMedia:ft,shimMediaStream:ut,shimOnTrack:ht,shimPeerConnection:Ee,shimSenderReceiverGetStats:gt},Symbol.toStringTag,{value:"Module"}));function Ct(r,e){const t=r&&r.navigator,n=r&&r.MediaStreamTrack;if(t.getUserMedia=function(i,s,o){ze("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(i).then(s,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const i=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),i(o.audio,"autoGainControl","mozAutoGainControl"),i(o.audio,"noiseSuppression","mozNoiseSuppression")),s(o)},n&&n.prototype.getSettings){const o=n.prototype.getSettings;n.prototype.getSettings=function(){const a=o.apply(this,arguments);return i(a,"mozAutoGainControl","autoGainControl"),i(a,"mozNoiseSuppression","noiseSuppression"),a}}if(n&&n.prototype.applyConstraints){const o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),i(a,"autoGainControl","mozAutoGainControl"),i(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function En(r,e){r.navigator.mediaDevices&&"getDisplayMedia"in r.navigator.mediaDevices||r.navigator.mediaDevices&&(r.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){const i=new DOMException("getDisplayMedia without video constraints is undefined");return i.name="NotFoundError",i.code=8,Promise.reject(i)}return n.video===!0?n.video={mediaSource:e}:n.video.mediaSource=e,r.navigator.mediaDevices.getUserMedia(n)})}function _t(r){typeof r=="object"&&r.RTCTrackEvent&&"receiver"in r.RTCTrackEvent.prototype&&!("transceiver"in r.RTCTrackEvent.prototype)&&Object.defineProperty(r.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Pe(r,e){typeof r!="object"||!(r.RTCPeerConnection||r.mozRTCPeerConnection)||(!r.RTCPeerConnection&&r.mozRTCPeerConnection&&(r.RTCPeerConnection=r.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const n=r.RTCPeerConnection.prototype[t],i={[t](){return arguments[0]=new(t==="addIceCandidate"?r.RTCIceCandidate:r.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};r.RTCPeerConnection.prototype[t]=i[t]}))}function St(r,e){if(typeof r!="object"||!(r.RTCPeerConnection||r.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=r.RTCPeerConnection.prototype.getStats;r.RTCPeerConnection.prototype.getStats=function(){const[s,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[s||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((d,p)=>{c.set(p,Object.assign({},d,{type:t[d.type]||d.type}))})}return c}).then(o,a)}}function Tt(r){if(!(typeof r=="object"&&r.RTCPeerConnection&&r.RTCRtpSender)||r.RTCRtpSender&&"getStats"in r.RTCRtpSender.prototype)return;const e=r.RTCPeerConnection.prototype.getSenders;e&&(r.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i});const t=r.RTCPeerConnection.prototype.addTrack;t&&(r.RTCPeerConnection.prototype.addTrack=function(){const i=t.apply(this,arguments);return i._pc=this,i}),r.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function kt(r){if(!(typeof r=="object"&&r.RTCPeerConnection&&r.RTCRtpSender)||r.RTCRtpSender&&"getStats"in r.RTCRtpReceiver.prototype)return;const e=r.RTCPeerConnection.prototype.getReceivers;e&&(r.RTCPeerConnection.prototype.getReceivers=function(){const n=e.apply(this,[]);return n.forEach(i=>i._pc=this),n}),V(r,"track",t=>(t.receiver._pc=t.srcElement,t)),r.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function xt(r){!r.RTCPeerConnection||"removeStream"in r.RTCPeerConnection.prototype||(r.RTCPeerConnection.prototype.removeStream=function(t){ze("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&t.getTracks().includes(n.track)&&this.removeTrack(n)})})}function Rt(r){r.DataChannel&&!r.RTCDataChannel&&(r.RTCDataChannel=r.DataChannel)}function Et(r){if(!(typeof r=="object"&&r.RTCPeerConnection))return;const e=r.RTCPeerConnection.prototype.addTransceiver;e&&(r.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let n=arguments[1]&&arguments[1].sendEncodings;n===void 0&&(n=[]),n=[...n];const i=n.length>0;i&&n.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const s=e.apply(this,arguments);if(i){const{sender:o}=s,a=o.getParameters();(!("encodings"in a)||a.encodings.length===1&&Object.keys(a.encodings[0]).length===0)&&(a.encodings=n,o.sendEncodings=n,this.setParametersPromises.push(o.setParameters(a).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return s})}function Pt(r){if(!(typeof r=="object"&&r.RTCRtpSender))return;const e=r.RTCRtpSender.prototype.getParameters;e&&(r.RTCRtpSender.prototype.getParameters=function(){const n=e.apply(this,arguments);return"encodings"in n||(n.encodings=[].concat(this.sendEncodings||[{}])),n})}function It(r){if(!(typeof r=="object"&&r.RTCPeerConnection))return;const e=r.RTCPeerConnection.prototype.createOffer;r.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function Mt(r){if(!(typeof r=="object"&&r.RTCPeerConnection))return;const e=r.RTCPeerConnection.prototype.createAnswer;r.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}const we=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:Et,shimCreateAnswer:Mt,shimCreateOffer:It,shimGetDisplayMedia:En,shimGetParameters:Pt,shimGetStats:St,shimGetUserMedia:Ct,shimOnTrack:_t,shimPeerConnection:Pe,shimRTCDataChannel:Rt,shimReceiverGetStats:kt,shimRemoveStream:xt,shimSenderGetStats:Tt},Symbol.toStringTag,{value:"Module"}));function $t(r){if(!(typeof r!="object"||!r.RTCPeerConnection)){if("getLocalStreams"in r.RTCPeerConnection.prototype||(r.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in r.RTCPeerConnection.prototype)){const e=r.RTCPeerConnection.prototype.addTrack;r.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(i=>e.call(this,i,n)),n.getVideoTracks().forEach(i=>e.call(this,i,n))},r.RTCPeerConnection.prototype.addTrack=function(n,...i){return i&&i.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in r.RTCPeerConnection.prototype||(r.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const n=this._localStreams.indexOf(t);if(n===-1)return;this._localStreams.splice(n,1);const i=t.getTracks();this.getSenders().forEach(s=>{i.includes(s.track)&&this.removeTrack(s)})})}}function Ot(r){if(!(typeof r!="object"||!r.RTCPeerConnection)&&("getRemoteStreams"in r.RTCPeerConnection.prototype||(r.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in r.RTCPeerConnection.prototype))){Object.defineProperty(r.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(i=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(i))return;this._remoteStreams.push(i);const s=new Event("addstream");s.stream=i,this.dispatchEvent(s)})})}});const e=r.RTCPeerConnection.prototype.setRemoteDescription;r.RTCPeerConnection.prototype.setRemoteDescription=function(){const n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(i){i.streams.forEach(s=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(s)>=0)return;n._remoteStreams.push(s);const o=new Event("addstream");o.stream=s,n.dispatchEvent(o)})}),e.apply(n,arguments)}}}function Dt(r){if(typeof r!="object"||!r.RTCPeerConnection)return;const e=r.RTCPeerConnection.prototype,t=e.createOffer,n=e.createAnswer,i=e.setLocalDescription,s=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,d){const p=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[p]);return d?(f.then(l,d),Promise.resolve()):f},e.createAnswer=function(l,d){const p=arguments.length>=2?arguments[2]:arguments[0],f=n.apply(this,[p]);return d?(f.then(l,d),Promise.resolve()):f};let a=function(c,l,d){const p=i.apply(this,[c]);return d?(p.then(l,d),Promise.resolve()):p};e.setLocalDescription=a,a=function(c,l,d){const p=s.apply(this,[c]);return d?(p.then(l,d),Promise.resolve()):p},e.setRemoteDescription=a,a=function(c,l,d){const p=o.apply(this,[c]);return d?(p.then(l,d),Promise.resolve()):p},e.addIceCandidate=a}function Lt(r){const e=r&&r.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,n=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=i=>n(At(i))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=(function(n,i,s){e.mediaDevices.getUserMedia(n).then(i,s)}).bind(e))}function At(r){return r&&r.video!==void 0?Object.assign({},r,{video:pt(r.video)}):r}function jt(r){if(!r.RTCPeerConnection)return;const e=r.RTCPeerConnection;r.RTCPeerConnection=function(n,i){if(n&&n.iceServers){const s=[];for(let o=0;o<n.iceServers.length;o++){let a=n.iceServers[o];a.urls===void 0&&a.url?(ze("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,s.push(a)):s.push(n.iceServers[o])}n.iceServers=s}return new e(n,i)},r.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(r.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Bt(r){typeof r=="object"&&r.RTCTrackEvent&&"receiver"in r.RTCTrackEvent.prototype&&!("transceiver"in r.RTCTrackEvent.prototype)&&Object.defineProperty(r.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Ft(r){const e=r.RTCPeerConnection.prototype.createOffer;r.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);const i=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&i?i.direction==="sendrecv"?i.setDirection?i.setDirection("sendonly"):i.direction="sendonly":i.direction==="recvonly"&&(i.setDirection?i.setDirection("inactive"):i.direction="inactive"):n.offerToReceiveAudio===!0&&!i&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function Ut(r){typeof r!="object"||r.AudioContext||(r.AudioContext=r.webkitAudioContext)}const Ze=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:Ut,shimCallbacksAPI:Dt,shimConstraints:At,shimCreateOfferLegacy:Ft,shimGetUserMedia:Lt,shimLocalStreamsAPI:$t,shimRTCIceServerUrls:jt,shimRemoteStreamsAPI:Ot,shimTrackEventTransceiver:Bt},Symbol.toStringTag,{value:"Module"}));function Pn(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var zt={exports:{}};(function(r){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
`).map(n=>n.trim())},e.splitSections=function(t){return t.split(`
m=`).map((i,s)=>(s>0?"m="+i:i).trim()+`\r
`)},e.getDescription=function(t){const n=e.splitSections(t);return n&&n[0]},e.getMediaSections=function(t){const n=e.splitSections(t);return n.shift(),n},e.matchPrefix=function(t,n){return e.splitLines(t).filter(i=>i.indexOf(n)===0)},e.parseCandidate=function(t){let n;t.indexOf("a=candidate:")===0?n=t.substring(12).split(" "):n=t.substring(10).split(" ");const i={foundation:n[0],component:{1:"rtp",2:"rtcp"}[n[1]]||n[1],protocol:n[2].toLowerCase(),priority:parseInt(n[3],10),ip:n[4],address:n[4],port:parseInt(n[5],10),type:n[7]};for(let s=8;s<n.length;s+=2)switch(n[s]){case"raddr":i.relatedAddress=n[s+1];break;case"rport":i.relatedPort=parseInt(n[s+1],10);break;case"tcptype":i.tcpType=n[s+1];break;case"ufrag":i.ufrag=n[s+1],i.usernameFragment=n[s+1];break;default:i[n[s]]===void 0&&(i[n[s]]=n[s+1]);break}return i},e.writeCandidate=function(t){const n=[];n.push(t.foundation);const i=t.component;i==="rtp"?n.push(1):i==="rtcp"?n.push(2):n.push(i),n.push(t.protocol.toUpperCase()),n.push(t.priority),n.push(t.address||t.ip),n.push(t.port);const s=t.type;return n.push("typ"),n.push(s),s!=="host"&&t.relatedAddress&&t.relatedPort!==void 0&&(n.push("raddr"),n.push(t.relatedAddress),n.push("rport"),n.push(t.relatedPort)),t.tcpType&&t.protocol.toLowerCase()==="tcp"&&(n.push("tcptype"),n.push(t.tcpType)),(t.usernameFragment||t.ufrag)&&(n.push("ufrag"),n.push(t.usernameFragment||t.ufrag)),"candidate:"+n.join(" ")},e.parseIceOptions=function(t){return t.substring(14).split(" ")},e.parseRtpMap=function(t){let n=t.substring(9).split(" ");const i={payloadType:parseInt(n.shift(),10)};return n=n[0].split("/"),i.name=n[0],i.clockRate=parseInt(n[1],10),i.channels=n.length===3?parseInt(n[2],10):1,i.numChannels=i.channels,i},e.writeRtpMap=function(t){let n=t.payloadType;t.preferredPayloadType!==void 0&&(n=t.preferredPayloadType);const i=t.channels||t.numChannels||1;return"a=rtpmap:"+n+" "+t.name+"/"+t.clockRate+(i!==1?"/"+i:"")+`\r
`},e.parseExtmap=function(t){const n=t.substring(9).split(" ");return{id:parseInt(n[0],10),direction:n[0].indexOf("/")>0?n[0].split("/")[1]:"sendrecv",uri:n[1],attributes:n.slice(2).join(" ")}},e.writeExtmap=function(t){return"a=extmap:"+(t.id||t.preferredId)+(t.direction&&t.direction!=="sendrecv"?"/"+t.direction:"")+" "+t.uri+(t.attributes?" "+t.attributes:"")+`\r
`},e.parseFmtp=function(t){const n={};let i;const s=t.substring(t.indexOf(" ")+1).split(";");for(let o=0;o<s.length;o++)i=s[o].trim().split("="),n[i[0].trim()]=i[1];return n},e.writeFmtp=function(t){let n="",i=t.payloadType;if(t.preferredPayloadType!==void 0&&(i=t.preferredPayloadType),t.parameters&&Object.keys(t.parameters).length){const s=[];Object.keys(t.parameters).forEach(o=>{t.parameters[o]!==void 0?s.push(o+"="+t.parameters[o]):s.push(o)}),n+="a=fmtp:"+i+" "+s.join(";")+`\r
`}return n},e.parseRtcpFb=function(t){const n=t.substring(t.indexOf(" ")+1).split(" ");return{type:n.shift(),parameter:n.join(" ")}},e.writeRtcpFb=function(t){let n="",i=t.payloadType;return t.preferredPayloadType!==void 0&&(i=t.preferredPayloadType),t.rtcpFeedback&&t.rtcpFeedback.length&&t.rtcpFeedback.forEach(s=>{n+="a=rtcp-fb:"+i+" "+s.type+(s.parameter&&s.parameter.length?" "+s.parameter:"")+`\r
`}),n},e.parseSsrcMedia=function(t){const n=t.indexOf(" "),i={ssrc:parseInt(t.substring(7,n),10)},s=t.indexOf(":",n);return s>-1?(i.attribute=t.substring(n+1,s),i.value=t.substring(s+1)):i.attribute=t.substring(n+1),i},e.parseSsrcGroup=function(t){const n=t.substring(13).split(" ");return{semantics:n.shift(),ssrcs:n.map(i=>parseInt(i,10))}},e.getMid=function(t){const n=e.matchPrefix(t,"a=mid:")[0];if(n)return n.substring(6)},e.parseFingerprint=function(t){const n=t.substring(14).split(" ");return{algorithm:n[0].toLowerCase(),value:n[1].toUpperCase()}},e.getDtlsParameters=function(t,n){return{role:"auto",fingerprints:e.matchPrefix(t+n,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(t,n){let i="a=setup:"+n+`\r
`;return t.fingerprints.forEach(s=>{i+="a=fingerprint:"+s.algorithm+" "+s.value+`\r
`}),i},e.parseCryptoLine=function(t){const n=t.substring(9).split(" ");return{tag:parseInt(n[0],10),cryptoSuite:n[1],keyParams:n[2],sessionParams:n.slice(3)}},e.writeCryptoLine=function(t){return"a=crypto:"+t.tag+" "+t.cryptoSuite+" "+(typeof t.keyParams=="object"?e.writeCryptoKeyParams(t.keyParams):t.keyParams)+(t.sessionParams?" "+t.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(t){if(t.indexOf("inline:")!==0)return null;const n=t.substring(7).split("|");return{keyMethod:"inline",keySalt:n[0],lifeTime:n[1],mkiValue:n[2]?n[2].split(":")[0]:void 0,mkiLength:n[2]?n[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(t){return t.keyMethod+":"+t.keySalt+(t.lifeTime?"|"+t.lifeTime:"")+(t.mkiValue&&t.mkiLength?"|"+t.mkiValue+":"+t.mkiLength:"")},e.getCryptoParameters=function(t,n){return e.matchPrefix(t+n,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(t,n){const i=e.matchPrefix(t+n,"a=ice-ufrag:")[0],s=e.matchPrefix(t+n,"a=ice-pwd:")[0];return i&&s?{usernameFragment:i.substring(12),password:s.substring(10)}:null},e.writeIceParameters=function(t){let n="a=ice-ufrag:"+t.usernameFragment+`\r
a=ice-pwd:`+t.password+`\r
`;return t.iceLite&&(n+=`a=ice-lite\r
`),n},e.parseRtpParameters=function(t){const n={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},s=e.splitLines(t)[0].split(" ");n.profile=s[2];for(let a=3;a<s.length;a++){const c=s[a],l=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(l){const d=e.parseRtpMap(l),p=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(d.parameters=p.length?e.parseFmtp(p[0]):{},d.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),n.codecs.push(d),d.name.toUpperCase()){case"RED":case"ULPFEC":n.fecMechanisms.push(d.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(a=>{n.headerExtensions.push(e.parseExtmap(a))});const o=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return n.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(d=>d.type===c.type&&d.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),n},e.writeRtpDescription=function(t,n){let i="";i+="m="+t+" ",i+=n.codecs.length>0?"9":"0",i+=" "+(n.profile||"UDP/TLS/RTP/SAVPF")+" ",i+=n.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,i+=`c=IN IP4 0.0.0.0\r
`,i+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,n.codecs.forEach(o=>{i+=e.writeRtpMap(o),i+=e.writeFmtp(o),i+=e.writeRtcpFb(o)});let s=0;return n.codecs.forEach(o=>{o.maxptime>s&&(s=o.maxptime)}),s>0&&(i+="a=maxptime:"+s+`\r
`),n.headerExtensions&&n.headerExtensions.forEach(o=>{i+=e.writeExtmap(o)}),i},e.parseRtpEncodingParameters=function(t){const n=[],i=e.parseRtpParameters(t),s=i.fecMechanisms.indexOf("RED")!==-1,o=i.fecMechanisms.indexOf("ULPFEC")!==-1,a=e.matchPrefix(t,"a=ssrc:").map(f=>e.parseSsrcMedia(f)).filter(f=>f.attribute==="cname"),c=a.length>0&&a[0].ssrc;let l;const d=e.matchPrefix(t,"a=ssrc-group:FID").map(f=>f.substring(17).split(" ").map(g=>parseInt(g,10)));d.length>0&&d[0].length>1&&d[0][0]===c&&(l=d[0][1]),i.codecs.forEach(f=>{if(f.name.toUpperCase()==="RTX"&&f.parameters.apt){let h={ssrc:c,codecPayloadType:parseInt(f.parameters.apt,10)};c&&l&&(h.rtx={ssrc:l}),n.push(h),s&&(h=JSON.parse(JSON.stringify(h)),h.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},n.push(h))}}),n.length===0&&c&&n.push({ssrc:c});let p=e.matchPrefix(t,"b=");return p.length&&(p[0].indexOf("b=TIAS:")===0?p=parseInt(p[0].substring(7),10):p[0].indexOf("b=AS:")===0?p=parseInt(p[0].substring(5),10)*1e3*.95-50*40*8:p=void 0,n.forEach(f=>{f.maxBitrate=p})),n},e.parseRtcpParameters=function(t){const n={},i=e.matchPrefix(t,"a=ssrc:").map(a=>e.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];i&&(n.cname=i.value,n.ssrc=i.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");n.reducedSize=s.length>0,n.compound=s.length===0;const o=e.matchPrefix(t,"a=rtcp-mux");return n.mux=o.length>0,n},e.writeRtcpParameters=function(t){let n="";return t.reducedSize&&(n+=`a=rtcp-rsize\r
`),t.mux&&(n+=`a=rtcp-mux\r
`),t.ssrc!==void 0&&t.cname&&(n+="a=ssrc:"+t.ssrc+" cname:"+t.cname+`\r
`),n},e.parseMsid=function(t){let n;const i=e.matchPrefix(t,"a=msid:");if(i.length===1)return n=i[0].substring(7).split(" "),{stream:n[0],track:n[1]};const s=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(s.length>0)return n=s[0].value.split(" "),{stream:n[0],track:n[1]}},e.parseSctpDescription=function(t){const n=e.parseMLine(t),i=e.matchPrefix(t,"a=max-message-size:");let s;i.length>0&&(s=parseInt(i[0].substring(19),10)),isNaN(s)&&(s=65536);const o=e.matchPrefix(t,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:n.fmt,maxMessageSize:s};const a=e.matchPrefix(t,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:s}}},e.writeSctpDescription=function(t,n){let i=[];return t.protocol!=="DTLS/SCTP"?i=["m="+t.kind+" 9 "+t.protocol+" "+n.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+n.port+`\r
`]:i=["m="+t.kind+" 9 "+t.protocol+" "+n.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+n.port+" "+n.protocol+` 65535\r
`],n.maxMessageSize!==void 0&&i.push("a=max-message-size:"+n.maxMessageSize+`\r
`),i.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(t,n,i){let s;const o=n!==void 0?n:2;return t?s=t:s=e.generateSessionId(),`v=0\r
o=`+(i||"thisisadapterortc")+" "+s+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(t,n){const i=e.splitLines(t);for(let s=0;s<i.length;s++)switch(i[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return i[s].substring(2)}return n?e.getDirection(n):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const i=e.splitLines(t)[0].substring(2).split(" ");return{kind:i[0],port:parseInt(i[1],10),protocol:i[2],fmt:i.slice(3).join(" ")}},e.parseOLine=function(t){const i=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:i[0],sessionId:i[1],sessionVersion:parseInt(i[2],10),netType:i[3],addressType:i[4],address:i[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const n=e.splitLines(t);for(let i=0;i<n.length;i++)if(n[i].length<2||n[i].charAt(1)!=="=")return!1;return!0},r.exports=e})(zt);var Nt=zt.exports;const W=Pn(Nt),In=bn({__proto__:null,default:W},[Nt]);function ae(r){if(!r.RTCIceCandidate||r.RTCIceCandidate&&"foundation"in r.RTCIceCandidate.prototype)return;const e=r.RTCIceCandidate;r.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){const i=new e(n),s=W.parseCandidate(n.candidate);for(const o in s)o in i||Object.defineProperty(i,o,{value:s[o]});return i.toJSON=function(){return{candidate:i.candidate,sdpMid:i.sdpMid,sdpMLineIndex:i.sdpMLineIndex,usernameFragment:i.usernameFragment}},i}return new e(n)},r.RTCIceCandidate.prototype=e.prototype,V(r,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new r.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Ie(r){!r.RTCIceCandidate||r.RTCIceCandidate&&"relayProtocol"in r.RTCIceCandidate.prototype||V(r,"icecandidate",e=>{if(e.candidate){const t=W.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function ce(r,e){if(!r.RTCPeerConnection)return;"sctp"in r.RTCPeerConnection.prototype||Object.defineProperty(r.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const t=function(a){if(!a||!a.sdp)return!1;const c=W.splitSections(a.sdp);return c.shift(),c.some(l=>{const d=W.parseMLine(l);return d&&d.kind==="application"&&d.protocol.indexOf("SCTP")!==-1})},n=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},i=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const d=W.matchPrefix(a.sdp,"a=max-message-size:");return d.length>0?l=parseInt(d[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=r.RTCPeerConnection.prototype.setRemoteDescription;r.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=n(arguments[0]),l=i(c),d=s(arguments[0],c);let p;l===0&&d===0?p=Number.POSITIVE_INFINITY:l===0||d===0?p=Math.max(l,d):p=Math.min(l,d);const f={};Object.defineProperty(f,"maxMessageSize",{get(){return p}}),this._sctp=f}return o.apply(this,arguments)}}function le(r,e){if(!(r.RTCPeerConnection&&"createDataChannel"in r.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>149||e.browser==="firefox"&&e.version>60)return;function t(i,s){const o=i.send;i.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(i.readyState==="open"&&s.sctp&&l>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return o.apply(i,arguments)}}const n=r.RTCPeerConnection.prototype.createDataChannel;r.RTCPeerConnection.prototype.createDataChannel=function(){const s=n.apply(this,arguments);return t(s,this),s},V(r,"datachannel",i=>(t(i.channel,i.target),i))}function Me(r){if(!r.RTCPeerConnection||"connectionState"in r.RTCPeerConnection.prototype)return;const e=r.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const n=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=i=>{const s=i.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const o=new Event("connectionstatechange",i);s.dispatchEvent(o)}return i},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function $e(r,e){if(!r.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=r.RTCPeerConnection.prototype.setRemoteDescription;r.RTCPeerConnection.prototype.setRemoteDescription=function(i){if(i&&i.sdp&&i.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=i.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);r.RTCSessionDescription&&i instanceof r.RTCSessionDescription?arguments[0]=new r.RTCSessionDescription({type:i.type,sdp:s}):i.sdp=s}return t.apply(this,arguments)}}function de(r,e){if(!(r.RTCPeerConnection&&r.RTCPeerConnection.prototype))return;const t=r.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(r.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function pe(r,e){if(!(r.RTCPeerConnection&&r.RTCPeerConnection.prototype))return;const t=r.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(r.RTCPeerConnection.prototype.setLocalDescription=function(){let i=arguments[0]||{};if(typeof i!="object"||i.type&&i.sdp)return t.apply(this,arguments);if(i={type:i.type,sdp:i.sdp},!i.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":i.type="offer";break;default:i.type="answer";break}return i.sdp||i.type!=="offer"&&i.type!=="answer"?t.apply(this,[i]):(i.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}const Mn=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:$e,shimAddIceCandidateNullOrEmpty:de,shimConnectionState:Me,shimMaxMessageSize:ce,shimParameterlessSetLocalDescription:pe,shimRTCIceCandidate:ae,shimRTCIceCandidateRelayProtocol:Ie,shimSendThrowTypeError:le},Symbol.toStringTag,{value:"Module"}));function $n({window:r}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Ue,n=Rn(r),i={browserDetails:n,commonShim:Mn,extractVersion:Z,disableLog:kn,disableWarnings:xn,sdp:In};switch(n.browser){case"chrome":if(!Xe||!Ee||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),i;if(n.version===null)return t("Chrome shim can not determine version, not shimming."),i;t("adapter.js shimming chrome."),i.browserShim=Xe,de(r,n),pe(r),ft(r,n),ut(r),Ee(r,n),ht(r,n),vt(r,n),mt(r),gt(r,n),bt(r,n),ae(r),Ie(r),Me(r),ce(r,n),le(r,n),$e(r,n);break;case"firefox":if(!we||!Pe||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),i;t("adapter.js shimming firefox."),i.browserShim=we,de(r,n),pe(r),Ct(r,n),Pe(r,n),St(r,n),_t(r),xt(r),Tt(r),kt(r),Rt(r),Et(r),Pt(r),It(r),Mt(r),ae(r),Me(r),ce(r,n),le(r,n);break;case"safari":if(!Ze||!e.shimSafari)return t("Safari shim is not included in this adapter release."),i;t("adapter.js shimming safari."),i.browserShim=Ze,de(r,n),pe(r),jt(r),Ft(r),Dt(r),$t(r),Ot(r),Bt(r),Lt(r),Ut(r),ae(r),Ie(r),ce(r,n),le(r,n),$e(r,n);break;default:t("Unsupported browser!");break}return i}const et=$n({window:typeof window>"u"?void 0:window});function G(r,e,t,n){Object.defineProperty(r,e,{get:t,set:n,enumerable:!0,configurable:!0})}class qt{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],n=e.byteLength,i=Math.ceil(n/this.chunkedMTU);let s=0,o=0;for(;o<n;){const a=Math.min(n,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:s,data:c,total:i};t.push(l),o=a,s++}return this._dataCount++,t}}}function On(r){let e=0;for(const i of r)e+=i.byteLength;const t=new Uint8Array(e);let n=0;for(const i of r)t.set(i,n),n+=i.byteLength;return t}const _e=et.default||et,w=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const r=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(r)?r==="chrome"?e>=this.minChromeVersion:r==="firefox"?e>=this.minFirefoxVersion:r==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return _e.browserDetails.browser}getVersion(){return _e.browserDetails.version||0}isUnifiedPlanSupported(){const r=this.getBrowser(),e=_e.browserDetails.version||0;if(r==="chrome"&&e<this.minChromeVersion)return!1;if(r==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,n=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),n=!0}catch{}finally{t&&t.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Dn=r=>!r||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(r),Vt=()=>Math.random().toString(36).slice(2),tt={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class Ln extends qt{noop(){}blobToArrayBuffer(e,t){const n=new FileReader;return n.onload=function(i){i.target&&t(i.target.result)},n.readAsArrayBuffer(e),n}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=tt,this.browser=w.getBrowser(),this.browserVersion=w.getVersion(),this.pack=ct,this.unpack=at,this.supports=function(){const t={browser:w.isBrowserSupported(),webRTC:w.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let n;try{n=new RTCPeerConnection(tt),t.audioVideo=!0;let i;try{i=n.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!i.ordered;try{i.binaryType="blob",t.binaryBlob=!w.isIOS}catch{}}catch{}finally{i&&i.close()}}catch{}finally{n&&n.close()}return t}(),this.validateId=Dn,this.randomToken=Vt}}const S=new Ln,An="PeerJS: ";class jn{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const n=[An,...t];for(const i in n)n[i]instanceof Error&&(n[i]="("+n[i].name+") "+n[i].message);e>=3?console.log(...n):e>=2?console.warn("WARNING",...n):e>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}}var u=new jn,Ne={},Bn=Object.prototype.hasOwnProperty,_="~";function se(){}Object.create&&(se.prototype=Object.create(null),new se().__proto__||(_=!1));function Fn(r,e,t){this.fn=r,this.context=e,this.once=t||!1}function Gt(r,e,t,n,i){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new Fn(t,n||r,i),o=_?_+e:e;return r._events[o]?r._events[o].fn?r._events[o]=[r._events[o],s]:r._events[o].push(s):(r._events[o]=s,r._eventsCount++),r}function fe(r,e){--r._eventsCount===0?r._events=new se:delete r._events[e]}function v(){this._events=new se,this._eventsCount=0}v.prototype.eventNames=function(){var e=[],t,n;if(this._eventsCount===0)return e;for(n in t=this._events)Bn.call(t,n)&&e.push(_?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};v.prototype.listeners=function(e){var t=_?_+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,s=n.length,o=new Array(s);i<s;i++)o[i]=n[i].fn;return o};v.prototype.listenerCount=function(e){var t=_?_+e:e,n=this._events[t];return n?n.fn?1:n.length:0};v.prototype.emit=function(e,t,n,i,s,o){var a=_?_+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,d,p;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,i),!0;case 5:return c.fn.call(c.context,t,n,i,s),!0;case 6:return c.fn.call(c.context,t,n,i,s,o),!0}for(p=1,d=new Array(l-1);p<l;p++)d[p-1]=arguments[p];c.fn.apply(c.context,d)}else{var f=c.length,h;for(p=0;p<f;p++)switch(c[p].once&&this.removeListener(e,c[p].fn,void 0,!0),l){case 1:c[p].fn.call(c[p].context);break;case 2:c[p].fn.call(c[p].context,t);break;case 3:c[p].fn.call(c[p].context,t,n);break;case 4:c[p].fn.call(c[p].context,t,n,i);break;default:if(!d)for(h=1,d=new Array(l-1);h<l;h++)d[h-1]=arguments[h];c[p].fn.apply(c[p].context,d)}}return!0};v.prototype.on=function(e,t,n){return Gt(this,e,t,n,!1)};v.prototype.once=function(e,t,n){return Gt(this,e,t,n,!0)};v.prototype.removeListener=function(e,t,n,i){var s=_?_+e:e;if(!this._events[s])return this;if(!t)return fe(this,s),this;var o=this._events[s];if(o.fn)o.fn===t&&(!i||o.once)&&(!n||o.context===n)&&fe(this,s);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||i&&!o[a].once||n&&o[a].context!==n)&&c.push(o[a]);c.length?this._events[s]=c.length===1?c[0]:c:fe(this,s)}return this};v.prototype.removeAllListeners=function(e){var t;return e?(t=_?_+e:e,this._events[t]&&fe(this,t)):(this._events=new se,this._eventsCount=0),this};v.prototype.off=v.prototype.removeListener;v.prototype.addListener=v.prototype.on;v.prefixed=_;v.EventEmitter=v;Ne=v;var H={};G(H,"ConnectionType",()=>F);G(H,"PeerErrorType",()=>m);G(H,"BaseConnectionErrorType",()=>Oe);G(H,"DataConnectionErrorType",()=>qe);G(H,"SerializationType",()=>ve);G(H,"SocketEventType",()=>j);G(H,"ServerMessageType",()=>y);var F=function(r){return r.Data="data",r.Media="media",r}({}),m=function(r){return r.BrowserIncompatible="browser-incompatible",r.Disconnected="disconnected",r.InvalidID="invalid-id",r.InvalidKey="invalid-key",r.Network="network",r.PeerUnavailable="peer-unavailable",r.SslUnavailable="ssl-unavailable",r.ServerError="server-error",r.SocketError="socket-error",r.SocketClosed="socket-closed",r.UnavailableID="unavailable-id",r.WebRTC="webrtc",r}({}),Oe=function(r){return r.NegotiationFailed="negotiation-failed",r.ConnectionClosed="connection-closed",r}({}),qe=function(r){return r.NotOpenYet="not-open-yet",r.MessageToBig="message-too-big",r}({}),ve=function(r){return r.Binary="binary",r.BinaryUTF8="binary-utf8",r.JSON="json",r.None="raw",r}({}),j=function(r){return r.Message="message",r.Disconnected="disconnected",r.Error="error",r.Close="close",r}({}),y=function(r){return r.Heartbeat="HEARTBEAT",r.Candidate="CANDIDATE",r.Offer="OFFER",r.Answer="ANSWER",r.Open="OPEN",r.Error="ERROR",r.IdTaken="ID-TAKEN",r.InvalidKey="INVALID-KEY",r.Leave="LEAVE",r.Expire="EXPIRE",r}({});const Ht="1.5.5";class Un extends Ne.EventEmitter{constructor(e,t,n,i,s,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=e?"wss://":"ws://";this._baseUrl=a+t+":"+n+i+"peerjs?key="+s}start(e,t){this._id=e;const n=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+Ht),this._disconnected=!1,this._socket.onmessage=i=>{let s;try{s=JSON.parse(i.data),u.log("Server message received:",s)}catch{u.log("Invalid server message",i.data);return}this.emit(j.Message,s)},this._socket.onclose=i=>{this._disconnected||(u.log("Socket closed.",i),this._cleanup(),this._disconnected=!0,this.emit(j.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),u.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){u.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:y.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(j.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Qt{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===F.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const n=this.connection,i={ordered:!!e.reliable},s=t.createDataChannel(n.label,i);n._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){u.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,n=this.connection.connectionId,i=this.connection.type,s=this.connection.provider;u.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(u.log(`Received ICE candidates for ${t}:`,o.candidate),s.socket.send({type:y.Candidate,payload:{candidate:o.candidate,type:i,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":u.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Oe.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":u.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Oe.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":u.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},u.log("Listening for data channel"),e.ondatachannel=o=>{u.log("Received data channel");const a=o.channel;s.getConnection(t,n)._initializeDataChannel(a)},u.log("Listening for remote stream"),e.ontrack=o=>{u.log("Received remote stream");const a=o.streams[0],c=s.getConnection(t,n);if(c.type===F.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){u.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let n=!1;const i=this.connection.dataChannel;i&&(n=!!i.readyState&&i.readyState!=="closed"),(t||n)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=await e.createOffer(this.connection.options.constraints);u.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),u.log("Set localDescription:",n,`for:${this.connection.peer}`);let i={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===F.Data){const s=this.connection;i={...i,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:y.Offer,payload:i,dst:this.connection.peer})}catch(i){i!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(m.WebRTC,i),u.log("Failed to setLocalDescription, ",i))}}catch(n){t.emitError(m.WebRTC,n),u.log("Failed to createOffer, ",n)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const n=await e.createAnswer();u.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),u.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:y.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(i){t.emitError(m.WebRTC,i),u.log("Failed to setLocalDescription, ",i)}}catch(n){t.emitError(m.WebRTC,n),u.log("Failed to create answer, ",n)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const n=this.connection.peerConnection,i=this.connection.provider;u.log("Setting remote description",t);const s=this;try{await n.setRemoteDescription(t),u.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(o){i.emitError(m.WebRTC,o),u.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){u.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),u.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(m.WebRTC,t),u.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(u.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return u.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){u.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class Jt extends Ne.EventEmitter{emitError(e,t){u.error("Error:",t),this.emit("error",new zn(`${e}`,t))}}class zn extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class Wt extends Jt{get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}}var Ae;const re=class re extends Wt{get type(){return F.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,n){super(e,t,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||re.ID_PREFIX+S.randomToken(),this._negotiator=new Qt(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{u.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{u.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){u.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,n=e.payload;switch(e.type){case y.Answer:this._negotiator.handleSDP(t,n.sdp),this._open=!0;break;case y.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:u.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){u.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const n=this.provider._getMessages(this.connectionId);for(const i of n)this.handleMessage(i);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};Ae=new WeakMap,X(re,Ae,re.ID_PREFIX="mc_");let he=re;class Nn{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:n,port:i,path:s,key:o}=this._options,a=new URL(`${t}://${n}:${i}${s}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Ht),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){u.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==S.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===S.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw u.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var je,Be;const N=class N extends Wt{get type(){return F.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||N.ID_PREFIX+Vt(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Qt(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{u.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{u.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{u.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(qe.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case y.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case y.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:u.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};je=new WeakMap,Be=new WeakMap,X(N,je,N.ID_PREFIX="dc_"),X(N,Be,N.MAX_BUFFERED_AMOUNT=8388608);let me=N;class Ve extends me{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>me.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return u.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Se extends Ve{close(e){super.close(e),this._chunkedData={}}constructor(e,t,n){super(e,t,n),this.chunker=new qt,this.serialization=ve.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=at(e),n=t.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=new Uint8Array(e.data),n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];const i=On(n.data);this._handleDataMessage({data:i})}}_send(e,t){const n=ct(e);if(n instanceof Promise)return this._send_blob(n);if(!t&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);u.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const n of t)this.send(n,!0)}}class qn extends Ve{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=ve.None}}class Vn extends Ve{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),n=t.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const n=this.encoder.encode(this.stringify(e));if(n.byteLength>=S.chunkedMTU){this.emitError(qe.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...e){super(...e),this.serialization=ve.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Fe;const ie=class ie extends Jt{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,n]of this._connections)e[t]=n;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:qn,json:Vn,binary:Se,"binary-utf8":Se,default:Se},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(e&&e.constructor==Object?t=e:e&&(n=e.toString()),t={debug:0,host:S.CLOUD_HOST,port:S.CLOUD_PORT,path:"/",key:ie.DEFAULT_KEY,token:S.randomToken(),config:S.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==S.CLOUD_HOST?this._options.secure=S.isSecure():this._options.host==S.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&u.setLogFunction(this._options.logFunction),u.logLevel=this._options.debug||0,this._api=new Nn(t),this._socket=this._createServerConnection(),!S.supports.audioVideo&&!S.supports.data){this._delayedAbort(m.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!S.validateId(n)){this._delayedAbort(m.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(i=>this._initialize(i)).catch(i=>this._abort(m.ServerError,i))}_createServerConnection(){const e=new Un(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(j.Message,t=>{this._handleMessage(t)}),e.on(j.Error,t=>{this._abort(m.SocketError,t)}),e.on(j.Disconnected,()=>{this.disconnected||(this.emitError(m.Network,"Lost connection to server."),this.disconnect())}),e.on(j.Close,()=>{this.disconnected||this._abort(m.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,n=e.payload,i=e.src;switch(t){case y.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case y.Error:this._abort(m.ServerError,n.msg);break;case y.IdTaken:this._abort(m.UnavailableID,`ID "${this.id}" is taken`);break;case y.InvalidKey:this._abort(m.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case y.Leave:u.log(`Received leave message from ${i}`),this._cleanupPeer(i),this._connections.delete(i);break;case y.Expire:this.emitError(m.PeerUnavailable,`Could not connect to peer ${i}`);break;case y.Offer:{const s=n.connectionId;let o=this.getConnection(i,s);if(o&&(o.close(),u.warn(`Offer received for existing Connection ID:${s}`)),n.type===F.Media){const c=new he(i,this,{connectionId:s,_payload:n,metadata:n.metadata});o=c,this._addConnection(i,o),this.emit("call",c)}else if(n.type===F.Data){const c=new this._serializers[n.serialization](i,this,{connectionId:s,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=c,this._addConnection(i,o),this.emit("connection",c)}else{u.warn(`Received malformed connection type:${n.type}`);return}const a=this._getMessages(s);for(const c of a)o.handleMessage(c);break}default:{if(!n){u.warn(`You received a malformed message from ${i} of type ${t}`);return}const s=n.connectionId,o=this.getConnection(i,s);o&&o.peerConnection?o.handleMessage(e):s?this._storeMessage(s,e):u.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){u.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(m.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const n=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,n),n}call(e,t,n={}){if(this.disconnected){u.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(m.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){u.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const i=new he(e,this,{...n,_stream:t});return this._addConnection(e,i),i}_addConnection(e,t){u.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const n=t.indexOf(e);n!==-1&&t.splice(n,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const n=this._connections.get(e);if(!n)return null;for(const i of n)if(i.connectionId===t)return i;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){u.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(u.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const n of t)n.close()}disconnect(){if(this.disconnected)return;const e=this.id;u.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)u.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)u.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(m.ServerError,t))}};Fe=new WeakMap,X(ie,Fe,ie.DEFAULT_KEY="peerjs");let De=ie;var Yt=De;const Kt="codigo-";let E=null,M=null,ee=[];const Ge=new Map,$=(r,...e)=>{var t;return(t=Ge.get(r))==null?void 0:t(...e)},T=(r,e)=>Ge.set(r,e),Xt=()=>String(Math.floor(1e3+Math.random()*9e3));function wt(r){E=new Yt(Kt+r),E.on("open",()=>$("ready")),E.on("connection",e=>{ee.push(e),e.on("open",()=>$("connected",e)),e.on("data",t=>$("message",t,e)),e.on("close",()=>{ee=ee.filter(t=>t!==e),$("peer-left",e)})}),E.on("error",e=>$("error",e))}function Zt(r){E=new Yt,E.on("open",()=>{M=E.connect(Kt+r,{reliable:!0}),M.on("open",()=>$("connected")),M.on("data",e=>$("message",e)),M.on("close",()=>$("disconnected")),M.on("error",e=>$("error",e))}),E.on("error",e=>$("error",e))}const K=r=>(M==null?void 0:M.open)&&M.send(r),I=(r,e)=>(r==null?void 0:r.open)&&r.send(e),be=r=>ee.filter(e=>e.open).forEach(e=>e.send(r));function en(){E&&(E.destroy(),E=null),M=null,ee=[],Ge.clear()}const Gn=`
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
`,Hn=Gn.trim().split(`
`).map(r=>r.trim().toUpperCase()).filter(Boolean),k=["#8c3232","#2e5fa8","#d8c9a8","#111115"];function Qn(){const r=Math.random()<.5,e=[...Array(r?9:8).fill(0),...Array(r?8:9).fill(1),...Array(7).fill(2),...Array(1).fill(3)];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}const t=[...Hn];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=t.slice(0,25);return{tiles:e,isTeamOneFirst:r,words:n}}function tn(r){r.animate([{transform:"scale(0.88)",opacity:.6},{transform:"scale(1.06)",opacity:1},{transform:"scale(1)",opacity:1}],{duration:240,easing:"ease-out",fill:"none"})}function He(r){const e=document.createElement("canvas");e.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999",document.body.appendChild(e);const t=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight;const i=Array.from({length:120},()=>({x:Math.random()*e.width,y:-20-Math.random()*80,vx:(Math.random()-.5)*4,vy:2+Math.random()*4,rot:Math.random()*Math.PI*2,vrot:(Math.random()-.5)*.2,w:8+Math.random()*8,h:5+Math.random()*5,color:Math.random()<.6?r:"#fbb954",alpha:1}));let s;const o=()=>{t.clearRect(0,0,e.width,e.height);let a=!1;for(const c of i)c.x+=c.vx,c.y+=c.vy,c.vy+=.08,c.rot+=c.vrot,c.y>e.height*.85&&(c.alpha-=.03),!(c.alpha<=0)&&(a=!0,t.save(),t.globalAlpha=c.alpha,t.translate(c.x,c.y),t.rotate(c.rot),t.fillStyle=c.color,t.fillRect(-c.w/2,-c.h/2,c.w,c.h),t.restore());a?s=requestAnimationFrame(o):e.remove()};s=requestAnimationFrame(o),setTimeout(()=>{cancelAnimationFrame(s),e.remove()},4e3)}let Te=null;const Jn=()=>(Te||(Te=new(window.AudioContext||window.webkitAudioContext)),Te);function q({freq:r=440,end:e,dur:t=.15,vol:n=.28,type:i="sine",at:s=0}){const o=Jn(),a=o.createOscillator(),c=o.createGain();a.connect(c),c.connect(o.destination),a.type=i,a.frequency.setValueAtTime(r,o.currentTime+s),e!=null&&a.frequency.exponentialRampToValueAtTime(e,o.currentTime+s+t),c.gain.setValueAtTime(n,o.currentTime+s),c.gain.exponentialRampToValueAtTime(.001,o.currentTime+s+t),a.start(o.currentTime+s),a.stop(o.currentTime+s+t+.05)}function nn(r){q(r===0?{freq:523,end:659,dur:.12,vol:.25}:r===1?{freq:349,end:440,dur:.12,vol:.25}:r===2?{freq:420,end:400,dur:.09,vol:.12}:{freq:180,end:70,dur:.28,vol:.35,type:"sawtooth"})}function rn(){q({freq:420,end:300,dur:.08,vol:.1})}function sn(r){const e=r===0?523:440;[1,1.25,1.5,2,2.5].forEach((t,n)=>q({freq:e*t,dur:.18,vol:.28,at:n*.11}))}function on(){q({freq:660,end:220,dur:.22,vol:.18,type:"triangle"})}let te=[],U=[0,0],Le=[0,0],A=null,D=[],Q=null,J=new Array(25).fill(null);function Wn(r){A=null,D=[],Q=null,J=new Array(25).fill(null);const e=Xt();r.innerHTML=`
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Abre la app en tu móvil e ingresa este código:</p>
      <div class="room-code">${e}</div>
      <p id="status" class="status">Esperando al móvil…</p>
    </div>
  `,T("connected",t=>{A?(D.push(t),Q?I(t,{type:"sync",role:"spectator",board:Q,revealed:J}):I(t,{type:"role",role:"spectator"})):(A=t,Q?I(t,{type:"sync",role:"captain",board:Q,revealed:J}):I(t,{type:"role",role:"captain"})),nt()}),T("peer-left",t=>{t===A&&(A=null),D=D.filter(n=>n!==t),nt()}),T("message",t=>{t.type==="board"&&(Q={...t},J=new Array(25).fill(null),Yn(r,t),D.filter(n=>n.open).forEach(n=>I(n,{type:"board-update",...t}))),t.type==="reveal"&&(J[t.index]={color:t.color,tileType:t.tileType},Xn(t.index,t.color,t.tileType),D.filter(n=>n.open).forEach(n=>I(n,{type:"reveal",index:t.index,color:t.color}))),t.type==="hide"&&(J[t.index]=null,wn(t.index,t.tileType),D.filter(n=>n.open).forEach(n=>I(n,{type:"hide",index:t.index}))),t.type==="win"&&(Zn(t.team,r),D.filter(n=>n.open).forEach(n=>I(n,{type:"win",team:t.team})))}),T("error",t=>{const n=document.getElementById("status");n&&(n.textContent=`Error: ${t.type}`)}),wt(e)}function nt(){const r=document.getElementById("status");if(!r)return;const e=D.filter(n=>n.open).length,t=[];A!=null&&A.open&&t.push("¡Capitán conectado!"),e>0&&t.push(`${e} espectador${e>1?"es":""} conectado${e>1?"s":""}`),r.textContent=t.length?t.join(" · "):"Esperando al móvil…"}function Yn(r,e){te=[];const t=k[e.isTeamOneFirst?0:1];Le=[e.tiles.filter(i=>i===0).length,e.tiles.filter(i=>i===1).length],U=[...Le],r.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${t}22; border-bottom:3px solid ${t}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${k[0]}">${U[0]}</span>
          <span class="counter" id="c1" style="color:${k[1]}">${U[1]}</span>
        </div>
      </div>
      <div class="board tv-board" id="board"></div>
      <div class="team-banner" style="background:${t}22; border-top:3px solid ${t}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.5)">michicho.com</span>
      </div>
    </div>
  `;const n=document.getElementById("board");e.tiles.forEach((i,s)=>{const o=document.createElement("div");o.className="tile tile-neutral",o.innerHTML=`<span class="tile-word">${e.words[s]??""}</span>`,n.appendChild(o),te.push(o)}),requestAnimationFrame(()=>te.forEach(Kn))}function Kn(r){const e=r.querySelector(".tile-word");if(!e)return;let t=parseFloat(getComputedStyle(e).fontSize);for(;e.scrollWidth>e.clientWidth+1&&t>9;)t-=.5,e.style.fontSize=`${t}px`;e.scrollWidth>e.clientWidth+1&&(e.style.letterSpacing="0"),e.scrollWidth>e.clientWidth+1&&(e.style.whiteSpace="normal")}function Xn(r,e,t){const n=te[r];if(n){if(n.style.background=e,n.dataset.type=t,n.classList.remove("tile-neutral"),n.classList.add("revealed"),t===2){const i=n.querySelector(".tile-word");i&&(i.style.color="rgba(255,255,255,0.92)")}tn(n),nn(t),(t===0||t===1)&&(U[t]=Math.max(0,U[t]-1),an(t))}}function wn(r,e){const t=te[r];if(!t)return;t.style.background="",t.classList.remove("revealed"),t.classList.add("tile-neutral");const n=t.querySelector(".tile-word");n&&(n.style.color=""),rn(),(e===0||e===1)&&(U[e]=Math.min(Le[e],U[e]+1),an(e))}function an(r){const e=document.getElementById(`c${r}`);e&&(e.textContent=U[r])}function Zn(r,e){sn(r);const t=k[r],n=r===0?"EQUIPO 1":"EQUIPO 2";He(t);const i=document.createElement("div");i.className="win-overlay",i.innerHTML=`<div class="win-text" style="color:${t}">${n} GANA!</div>`,e.appendChild(i)}let P=null,B=[],ke=[],L=[0,0],cn=[0,0],Qe=!1,ge=null,ne=[];function er(r){ge=r,r.innerHTML=`
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Ingresa el código de 4 dígitos que aparece en el televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric"
             pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONECTAR</button>
      <p id="status" class="status"></p>
    </div>
  `;const e=document.getElementById("code-input"),t=document.getElementById("connect-btn"),n=document.getElementById("status"),i=()=>{const s=e.value.trim();if(s.length!==4){n.textContent="Ingresa el código de 4 dígitos completo";return}t.disabled=!0,n.textContent="Conectando…",T("connected",()=>{n.textContent="Conectado, esperando…"}),T("message",o=>{o.type==="role"&&(o.role==="captain"&&ye(r),o.role==="spectator"&&xe(r,null,[])),o.type==="sync"&&(o.role==="captain"&&ye(r,o.board,o.revealed),o.role==="spectator"&&xe(r,o.board,o.revealed)),o.type==="board-update"&&xe(r,o,new Array(25).fill(null)),o.type==="reveal"&&ln(o.index,o.color),o.type==="hide"&&rr(o.index),o.type==="win"&&ir(o.team,r)}),T("error",o=>{n.textContent=o.type==="peer-unavailable"?"❌ Código incorrecto — revisa el televisor":`❌ ${o.type}`,t.disabled=!1}),Zt(s)};t.onclick=i,e.addEventListener("keydown",s=>{s.key==="Enter"&&i()})}function ye(r,e=null,t=null){ge=r,P=e||Qn(),Qe=!1,ke=[],B=t?t.map(s=>s!==null):new Array(25).fill(!1),cn=[P.tiles.filter(s=>s===0).length,P.tiles.filter(s=>s===1).length],L=[P.tiles.filter((s,o)=>s===0&&!B[o]).length,P.tiles.filter((s,o)=>s===1&&!B[o]).length];const n=k[P.isTeamOneFirst?0:1];r.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${n}22; border-bottom:3px solid ${n}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${k[0]}">${L[0]}</span>
          <span class="counter" id="c1" style="color:${k[1]}">${L[1]}</span>
        </div>
      </div>
      <div class="board phone-board" id="board"></div>
      <div class="team-banner" style="background:${n}22; border-top:3px solid ${n}">
        <button class="new-board-btn" id="new-board-btn">NUEVO TABLERO</button>
      </div>
    </div>
  `;const i=document.getElementById("board");P.tiles.forEach((s,o)=>{const a=document.createElement("div");a.className="tile",a.dataset.type=s,a.style.background=k[s],a.innerHTML=`<span class="tile-word">${P.words[o]??""}</span>`,a.addEventListener("click",()=>tr(o,a)),B[o]&&a.classList.add("checked"),i.appendChild(a),ke.push(a)}),requestAnimationFrame(()=>ke.forEach(dn)),e||K({type:"board",...P}),document.getElementById("new-board-btn").addEventListener("click",()=>{confirm("¿Generar un nuevo tablero? Esto reinicia el televisor también.")&&(on(),ye(r))})}function tr(r,e){if(Qe)return;B[r]=!B[r],e.classList.toggle("checked",B[r]);const t=P.tiles[r];B[r]?(tn(e),nn(t),K({type:"reveal",index:r,color:k[t],tileType:t}),(t===0||t===1)&&(L[t]=Math.max(0,L[t]-1),rt(t),nr(t))):(rn(),K({type:"hide",index:r,tileType:t}),(t===0||t===1)&&(L[t]=Math.min(cn[t],L[t]+1),rt(t)))}function rt(r){const e=document.getElementById(`c${r}`);e&&(e.textContent=L[r])}function nr(r){if(L[r]>0)return;Qe=!0,sn(r),He(k[r]),K({type:"win",team:r});const e=document.createElement("div");e.className="win-overlay";const t=r===0?"EQUIPO 1":"EQUIPO 2";e.innerHTML=`
    <div class="win-text" style="color:${k[r]}">${t} GANA!</div>
    <button class="btn" id="win-new-btn">NUEVA PARTIDA</button>
  `,ge.appendChild(e),document.getElementById("win-new-btn").addEventListener("click",()=>{on(),ye(ge)})}function xe(r,e,t){if(ne=[],!e){r.innerHTML=`
      <div class="scene">
        <h1 class="title">CODIGO</h1>
        <p class="label" style="opacity:0.6">Esperando tablero…</p>
      </div>
    `;return}const n=k[e.isTeamOneFirst?0:1];r.innerHTML=`
    <div class="scene board-scene">
      <div class="team-banner" style="background:${n}22; border-bottom:3px solid ${n}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.45)">ESPECTADOR</span>
      </div>
      <div class="board phone-board" id="spec-board"></div>
      <div class="team-banner" style="background:${n}22; border-top:3px solid ${n}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.3); font-size:0.85rem">michicho.com</span>
      </div>
    </div>
  `;const i=document.getElementById("spec-board");e.tiles.forEach((s,o)=>{const a=document.createElement("div");a.className="tile tile-neutral",a.innerHTML=`<span class="tile-word">${e.words[o]??""}</span>`,i.appendChild(a),ne.push(a)}),requestAnimationFrame(()=>ne.forEach(dn)),t.forEach((s,o)=>{s&&ln(o,s.color)})}function ln(r,e){const t=ne[r];t&&(t.style.background=e,t.classList.remove("tile-neutral"),t.classList.add("revealed"))}function rr(r){const e=ne[r];e&&(e.style.background="",e.classList.remove("revealed"),e.classList.add("tile-neutral"))}function ir(r,e){const t=k[r],n=r===0?"EQUIPO 1":"EQUIPO 2";He(t);const i=document.createElement("div");i.className="win-overlay",i.innerHTML=`<div class="win-text" style="color:${t}">${n} GANA!</div>`,e.appendChild(i)}function dn(r){const e=r.querySelector(".tile-word");if(!e)return;let t=parseFloat(getComputedStyle(e).fontSize);for(;e.scrollWidth>e.clientWidth+1&&t>9;)t-=.5,e.style.fontSize=`${t}px`;e.scrollWidth>e.clientWidth+1&&(e.style.letterSpacing="0"),e.scrollWidth>e.clientWidth+1&&(e.style.whiteSpace="normal")}const pn=[{q:"¿Cuál es el océano más grande del mundo?",options:["Atlántico","Índico","Ártico","Pacífico"],answer:3},{q:"¿Quién pintó la Mona Lisa?",options:["Van Gogh","Picasso","Leonardo da Vinci","Miguel Ángel"],answer:2},{q:"¿Cuál es el país más grande del mundo?",options:["China","Estados Unidos","Canadá","Rusia"],answer:3},{q:"¿Cuál es el metal cuyo símbolo químico es Au?",options:["Plata","Oro","Aluminio","Cobre"],answer:1},{q:"¿En qué continente está Egipto?",options:["Asia","Europa","África","Oceanía"],answer:2},{q:"¿Cuál es el planeta rojo?",options:["Venus","Marte","Júpiter","Mercurio"],answer:1},{q:"¿Cuántos días tiene una semana?",options:["5","6","7","8"],answer:2},{q:"¿Cuál es el idioma más hablado del mundo?",options:["Español","Inglés","Mandarín","Francés"],answer:2},{q:"¿Qué gas respiramos principalmente?",options:["Oxígeno","Hidrógeno","Nitrógeno","Helio"],answer:2},{q:"¿Quién escribió Don Quijote de la Mancha?",options:["Federico García Lorca","Miguel de Cervantes","Pablo Neruda","Julio Cortázar"],answer:1},{q:"¿Cuál es el río más largo del mundo?",options:["Nilo","Amazonas","Yangtsé","Misisipi"],answer:1},{q:"¿Qué instrumento mide la temperatura?",options:["Barómetro","Termómetro","Altímetro","Higrómetro"],answer:1},{q:"¿Cuál es la capital de Japón?",options:["Seúl","Pekín","Tokio","Bangkok"],answer:2},{q:"¿Cuántos continentes hay?",options:["5","6","7","8"],answer:2},{q:"¿Qué animal es conocido como el rey de la selva?",options:["Tigre","Elefante","León","Jaguar"],answer:2},{q:"¿Cuál es el idioma oficial de Brasil?",options:["Español","Portugués","Francés","Inglés"],answer:1},{q:"¿Qué planeta tiene anillos visibles?",options:["Marte","Saturno","Venus","Mercurio"],answer:1},{q:"¿Cuánto es 9 x 7?",options:["56","63","72","49"],answer:1},{q:"¿Cuál es la capital de Italia?",options:["Milán","Roma","Venecia","Nápoles"],answer:1},{q:"¿Qué órgano bombea sangre en el cuerpo humano?",options:["Pulmón","Hígado","Cerebro","Corazón"],answer:3},{q:"¿Qué animal pone huevos?",options:["Perro","Gato","Gallina","Caballo"],answer:2},{q:"¿Cuál es el resultado de 15 + 6?",options:["20","19","21","22"],answer:2},{q:"¿Cuál es la capital de Alemania?",options:["Berlín","Múnich","Hamburgo","Frankfurt"],answer:0},{q:"¿Qué planeta está más cerca del Sol?",options:["Mercurio","Venus","Tierra","Marte"],answer:0},{q:"¿Cuál es el animal más grande del planeta?",options:["Elefante","Ballena azul","Jirafa","Hipopótamo"],answer:1},{q:"¿Cuántas horas tiene un día?",options:["12","18","24","36"],answer:2},{q:"¿Qué color se obtiene mezclando azul y amarillo?",options:["Rojo","Verde","Naranja","Violeta"],answer:1},{q:"¿Cuál es el idioma oficial de Argentina?",options:["Portugués","Italiano","Español","Inglés"],answer:2},{q:"¿Quién descubrió América en 1492?",options:["Napoleón","Cristóbal Colón","Magallanes","Einstein"],answer:1},{q:"¿Cuántos lados tiene un triángulo?",options:["3","4","5","6"],answer:0},{q:"¿Qué animal es famoso por su cuello largo?",options:["Cebra","Camello","Jirafa","Ciervo"],answer:2},{q:"¿Cuál es la capital de Canadá?",options:["Toronto","Vancouver","Ottawa","Montreal"],answer:2},{q:"¿Qué parte de la planta absorbe agua?",options:["Flor","Hoja","Raíz","Tallo"],answer:2},{q:"¿Cuánto es 100 dividido 4?",options:["20","25","30","40"],answer:1},{q:"¿Cuál es el desierto más grande del mundo?",options:["Sahara","Atacama","Gobi","Kalahari"],answer:0},{q:"¿Qué animal vive en el agua?",options:["Águila","Tiburón","León","Lobo"],answer:1},{q:"¿Cuál es el satélite natural de la Tierra?",options:["Marte","Luna","Sol","Venus"],answer:1},{q:"¿Qué país tiene forma de bota?",options:["España","Chile","Italia","México"],answer:2},{q:"¿Cuál es el resultado de 8 x 8?",options:["56","64","72","88"],answer:1},{q:"¿Qué animal es conocido por cambiar de color?",options:["Elefante","Camaleón","Mono","Perro"],answer:1},{q:"¿Cuál es la capital de Australia?",options:["Sídney","Melbourne","Canberra","Perth"],answer:2},{q:"¿Qué vitamina obtenemos principalmente del Sol?",options:["Vitamina A","Vitamina B","Vitamina C","Vitamina D"],answer:3},{q:"¿Cuál es el animal terrestre más rápido?",options:["León","Guepardo","Caballo","Tigre"],answer:1},{q:"¿Qué instrumento tiene teclas blancas y negras?",options:["Guitarra","Violín","Piano","Flauta"],answer:2},{q:"¿Cuál es el resultado de 50 - 17?",options:["31","32","33","34"],answer:2},{q:"¿Qué continente tiene más países?",options:["Europa","Asia","África","América"],answer:2},{q:"¿Cuál es la capital de México?",options:["Guadalajara","Monterrey","Cancún","Ciudad de México"],answer:3},{q:"¿Qué planeta es el más grande del sistema solar?",options:["Saturno","Júpiter","Neptuno","Urano"],answer:1},{q:"¿Cuál es el hueso más largo del cuerpo humano?",options:["Fémur","Tibia","Húmero","Radio"],answer:0},{q:"¿Qué animal produce lana?",options:["Cabra","Vaca","Oveja","Cerdo"],answer:2}],fn=10,sr=Math.min(10,pn.length),or=["A","B","C","D"];let Ce=null,x=new Map,R=-1,z=null,O=[];function ar(r){const e=[...r];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function cr(r){Ce=r,x=new Map,R=-1,z&&(clearInterval(z),z=null),O=ar(pn).slice(0,sr);const e=Xt();r.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <div class="room-code">${e}</div>
      <p class="label">Únete desde tu móvil e ingresa este código</p>
      <div id="player-list" class="trivia-player-list"></div>
      <button class="btn" id="start-btn" disabled>EMPEZAR</button>
    </div>
  `,T("connected",()=>{}),T("peer-left",t=>{x.delete(t),it()}),T("message",(t,n)=>{t.type==="trivia-join"&&(x.set(n,{name:t.name,score:0,answered:!1}),I(n,{type:"trivia-waiting"}),it()),t.type==="trivia-answer"&&fr(n,t)}),document.getElementById("start-btn").addEventListener("click",lr),wt(e)}function it(){const r=document.getElementById("player-list");if(!r)return;r.innerHTML=[...x.values()].map(t=>`<span class="player-chip">${t.name}</span>`).join("");const e=document.getElementById("start-btn");e&&(e.disabled=x.size===0)}function lr(){x.forEach(r=>{r.score=0}),be({type:"trivia-start",total:O.length}),R=-1,un()}function un(){if(R++,R>=O.length){gn();return}x.forEach(e=>{e.answered=!1});const r=O[R];dr(r,R),be({type:"trivia-question",index:R,total:O.length,q:r.q,options:r.options,answer:r.answer}),pr()}function dr(r,e){Ce.innerHTML=`
    <div class="trivia-tv-scene">
      <div class="trivia-tv-top">
        <span class="trivia-tv-progress">${e+1} / ${O.length}</span>
        <span class="trivia-tv-timer" id="tv-timer">${fn}</span>
      </div>
      <div class="trivia-tv-question">${r.q}</div>
      <div class="trivia-tv-options">
        ${r.options.map((t,n)=>`
          <div class="trivia-tv-option" id="opt-${n}">
            <span class="trivia-opt-label">${or[n]}</span>
            <span class="trivia-opt-text">${t}</span>
          </div>
        `).join("")}
      </div>
      <div class="trivia-tv-players" id="tv-players"></div>
    </div>
  `,hn()}function pr(){let r=fn;z=setInterval(()=>{r--;const e=document.getElementById("tv-timer");e&&(e.textContent=r,e.className="trivia-tv-timer"+(r<=3?" timer-urgent":"")),r<=0&&(clearInterval(z),z=null,mn())},1e3)}function fr(r,e){const t=x.get(r);if(!t||t.answered||e.questionIndex!==R)return;t.answered=!0;const n=e.answerIndex===O[R].answer;n&&t.score++,I(r,{type:"trivia-feedback",correct:n}),hn(),[...x.values()].every(i=>i.answered)&&(clearInterval(z),z=null,mn())}function hn(){const r=document.getElementById("tv-players");r&&(r.innerHTML=[...x.values()].map(e=>`<span class="player-dot ${e.answered?"dot-answered":""}">${e.name}</span>`).join(""))}function mn(){const r=O[R].answer;document.querySelectorAll(".trivia-tv-option").forEach((t,n)=>{t.classList.add(n===r?"opt-correct":"opt-wrong")});const e=[...x.values()].map(t=>({name:t.name,score:t.score}));be({type:"trivia-reveal",correctIndex:r,scores:e}),setTimeout(()=>ur(e),2500)}function ur(r){const e=R<O.length-1,t=[...r].sort((n,i)=>i.score-n.score);Ce.innerHTML=`
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${t.map((n,i)=>`
          <div class="score-row">
            <span class="score-rank">${i+1}</span>
            <span class="score-name">${n.name}</span>
            <span class="score-pts">${n.score}</span>
          </div>
        `).join("")}
      </div>
      ${e?'<p class="label" style="margin-top:12px;opacity:0.5">Siguiente pregunta en 3s…</p>':""}
    </div>
  `,setTimeout(e?un:gn,3e3)}function gn(){var e;const r=[...x.values()].map(t=>({name:t.name,score:t.score})).sort((t,n)=>n.score-t.score);Ce.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">GANADOR</h1>
      <div class="winner-name">${((e=r[0])==null?void 0:e.name)??"—"}</div>
      <div class="trivia-scoreboard" style="margin-top:24px">
        ${r.map((t,n)=>`
          <div class="score-row">
            <span class="score-rank">${n+1}</span>
            <span class="score-name">${t.name}</span>
            <span class="score-pts">${t.score} / ${O.length}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `,be({type:"trivia-end",scores:r})}const hr=["#8c3232","#2e5fa8","#2d7a4f","#7a4fa8"];let Y="",st=[],ue=!1,oe=0,Je=0,C=null;function mr(r){oe=0,Je=0,ue=!1,C&&(clearInterval(C),C=null),gr(r)}function gr(r){r.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">Código del televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <input id="name-input" type="text" maxlength="14" placeholder="Tu nombre" class="name-input" autocomplete="off" spellcheck="false">
      <button class="btn" id="join-btn">UNIRSE</button>
      <p id="status" class="status"></p>
    </div>
  `;const e=()=>{const t=document.getElementById("code-input").value.trim(),n=document.getElementById("name-input").value.trim(),i=document.getElementById("status");if(t.length!==4){i.textContent="Ingresa el código de 4 dígitos";return}if(!n){i.textContent="Ingresa tu nombre";return}Y=n,document.getElementById("join-btn").disabled=!0,i.textContent="Conectando…",T("connected",()=>{K({type:"trivia-join",name:Y})}),T("message",s=>{s.type==="trivia-waiting"&&yr(r),s.type==="trivia-start"&&(Je=s.total,oe=0),s.type==="trivia-question"&&vr(r,s),s.type==="trivia-feedback"&&br(s.correct),s.type==="trivia-end"&&Cr(r,s.scores)}),T("error",s=>{const o=document.getElementById("status");o&&(o.textContent=s.type==="peer-unavailable"?"❌ Código incorrecto — revisa el televisor":`❌ ${s.type}`);const a=document.getElementById("join-btn");a&&(a.disabled=!1)}),Zt(t)};document.getElementById("join-btn").onclick=e,document.getElementById("name-input").addEventListener("keydown",t=>{t.key==="Enter"&&e()})}function yr(r){r.innerHTML=`
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">¡Conectado como <strong style="color:#fff">${Y}</strong>!</p>
      <p class="label" style="opacity:0.45;margin-top:4px">Esperando que el televisor empiece…</p>
    </div>
  `}function vr(r,e){ue=!1,C&&(clearInterval(C),C=null);const t=[0,1,2,3];for(let o=3;o>0;o--){const a=Math.floor(Math.random()*(o+1));[t[o],t[a]]=[t[a],t[o]]}st=t;const n=t.map(o=>e.options[o]);r.innerHTML=`
    <div class="trivia-phone-scene">
      <div class="trivia-phone-top">
        <span class="trivia-phone-progress">${e.index+1} / ${e.total}</span>
        <span class="trivia-phone-score" id="phone-score">${oe} pts</span>
        <span class="trivia-phone-timer" id="phone-timer">10</span>
      </div>
      <div class="trivia-phone-question">${e.q}</div>
      <div class="trivia-phone-options">
        ${n.map((o,a)=>`
          <button class="trivia-phone-option" data-display="${a}" style="background:${hr[a]}">
            ${o}
          </button>
        `).join("")}
      </div>
      <div id="phone-status" class="trivia-phone-status"></div>
    </div>
  `,document.querySelectorAll(".trivia-phone-option").forEach(o=>{o.addEventListener("click",()=>{if(ue)return;ue=!0,C&&(clearInterval(C),C=null);const a=parseInt(o.dataset.display),c=st[a];K({type:"trivia-answer",answerIndex:c,questionIndex:e.index}),document.querySelectorAll(".trivia-phone-option").forEach(l=>{l.disabled=!0,l.style.opacity="0.4"}),o.style.opacity="1",o.style.outline="4px solid white",o.style.outlineOffset="-4px",document.getElementById("phone-status").textContent="¡Respuesta enviada!"})});let i=10;const s=document.getElementById("phone-timer");C=setInterval(()=>{i--,s&&(s.textContent=i,i<=3&&(s.className="trivia-phone-timer timer-urgent")),i<=0&&(clearInterval(C),C=null)},1e3)}function br(r){r&&oe++;const e=document.getElementById("phone-status");e&&(e.textContent=r?"✓ ¡Correcto!":"✗ Incorrecto",e.style.color=r?"#4ade80":"#f87171");const t=document.getElementById("phone-score");t&&(t.textContent=`${oe} pts`)}function Cr(r,e){C&&(clearInterval(C),C=null);const t=e.find(i=>i.name===Y),n=e.findIndex(i=>i.name===Y)+1;r.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:2rem">FIN</h1>
      <div class="trivia-my-score">
        <div class="trivia-my-score-num">${(t==null?void 0:t.score)??0}</div>
        <div class="trivia-my-score-label">de ${Je} correctas</div>
        <div class="trivia-my-score-rank">Puesto ${n} de ${e.length}</div>
      </div>
      <div class="trivia-scoreboard">
        ${e.map((i,s)=>`
          <div class="score-row ${i.name===Y?"score-row-me":""}">
            <span class="score-rank">${s+1}</span>
            <span class="score-name">${i.name}</span>
            <span class="score-pts">${i.score}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function yn(r){en(),r.innerHTML=`
    <div class="scene">
      <h1 class="title">CÓDIGO</h1>
      <button class="btn" id="cs-btn">CÓDIGO SECRETO</button>
      <button class="btn" id="trivia-btn" style="background:#6b3fa0">TRIVIA</button>
    </div>
  `,document.getElementById("cs-btn").focus(),document.getElementById("cs-btn").onclick=()=>ot(r,"cs"),document.getElementById("trivia-btn").onclick=()=>ot(r,"trivia")}function ot(r,e){en();const t=e==="cs"?"CÓDIGO SECRETO":"TRIVIA";r.innerHTML=`
    <div class="scene">
      <h1 class="title" style="font-size:clamp(1.6rem,7vw,3.5rem)">${t}</h1>
      <button class="btn" id="tv-btn">TELEVISOR</button>
      <button class="btn" id="phone-btn">MÓVIL</button>
      <button class="btn-back" id="back-btn">← VOLVER</button>
    </div>
  `,document.getElementById("tv-btn").focus(),document.getElementById("tv-btn").onclick=()=>e==="cs"?Wn(r):cr(r),document.getElementById("phone-btn").onclick=()=>e==="cs"?er(r):mr(r),document.getElementById("back-btn").onclick=()=>yn(r)}yn(document.getElementById("app"));
