(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29a77190"],{"0a06":function(e,t,n){"use strict";var r=n("c532"),o=n("30b59"),s=n("f6b4"),i=n("5270"),a=n("4a7b");function c(e){this.defaults=e,this.interceptors={request:new s,response:new s}}c.prototype.request=function(e){"string"===typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=a(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],n=Promise.resolve(e);this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));while(t.length)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(a(r||{},{method:e,url:t,data:n}))}})),e.exports=c},"0df6":function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"1d2b":function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},2444:function(e,t,n){"use strict";(function(t){var r=n("c532"),o=n("c8af"),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function a(){var e;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof t&&"[object process]"===Object.prototype.toString.call(t))&&(e=n("b50d")),e}var c={adapter:a(),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"===typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(s)})),e.exports=c}).call(this,n("4362"))},"2d83":function(e,t,n){"use strict";var r=n("387f");e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},"2e67":function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"2fa4":function(e,t,n){"use strict";n("20f68");var r=n("80d2");t["a"]=Object(r["h"])("spacer","div","v-spacer")},"30b59":function(e,t,n){"use strict";var r=n("c532");function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(r.isURLSearchParams(t))s=t.toString();else{var i=[];r.forEach(t,(function(e,t){null!==e&&"undefined"!==typeof e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},"387f":function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},3934:function(e,t,n){"use strict";var r=n("c532");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return function(){return!0}}()},"467f":function(e,t,n){"use strict";var r=n("2d83");e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},"4a7b":function(e,t,n){"use strict";var r=n("c532");e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],s=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(s,u),r.forEach(i,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(a,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var f=o.concat(s).concat(i).concat(a),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===f.indexOf(e)}));return r.forEach(l,u),n}},5270:function(e,t,n){"use strict";var r=n("c532"),o=n("c401"),s=n("2e67"),i=n("2444");function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){a(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]}));var t=e.adapter||i.adapter;return t(e).then((function(t){return a(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(a(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},"55c7":function(e,t,n){e.exports=n.p+"img/macOS.293d9f0d.png"},"5e23":function(e,t,n){},"5f02":function(e,t,n){"use strict";e.exports=function(e){return"object"===typeof e&&!0===e.isAxiosError}},"6d39":function(e,t,n){e.exports=n.p+"img/Linux.4c7acef3.png"},"73d1":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("titre",{attrs:{"entête":e.$t("téléchargements.entête")}}),n("v-col",{attrs:{cols:"12"}},[n("v-toolbar",{staticClass:"mb-4"},[n("v-row",[n("v-col",{attrs:{cols:"4"}},[n("v-select",{attrs:{dense:"","hide-details":"",label:"Version",clearable:"",items:e.versions,outlined:""},model:{value:e.version,callback:function(t){e.version=t},expression:"version"}})],1),n("v-col",{attrs:{cols:"4"}},[n("v-select",{attrs:{dense:"","hide-details":"",clearable:"",label:"Système opératoire",items:e.systèmesOpératoirs.map((function(e){return e.nom})),outlined:""},model:{value:e.système,callback:function(t){e.système=t},expression:"système"}})],1),n("v-col",{attrs:{cols:"4"}},[n("v-btn",{attrs:{tiled:"",outlined:"",color:"primary"},on:{click:function(t){return e.ouvrirLien(e.URL_TÉLÉCHARGEMENTS)}}},[e._v(" Voir toutes les versions "),n("v-icon",{attrs:{right:""}},[e._v("mdi-open-in-new")])],1)],1)],1)],1),n("v-slide-x-transition",{staticClass:"d-flex flex-wrap justify-center",attrs:{group:""}},e._l(e.fichiersChoisis,(function(t){return n("carte-fichier-installation",{key:t.id,attrs:{url:t.browser_download_url,version:t.version,img:e.imageFichier(t.name),SO:e.soFichier(t.name).nom}})})),1)],1)],1)},o=[],s=n("5530"),i=n("2909"),a=n("b85c"),c=n("1da1"),u=(n("96cf"),n("ac1f"),n("1276"),n("7db0"),n("4de4"),n("caad"),n("2532"),n("b0c0"),n("99af"),n("d81d"),n("bc3a")),f=n.n(u),l=n("63a6"),d=n.n(l),p=n("d257"),h=n("482f"),m=n("1a02"),v=n("db45"),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"ma-3 pa-5",attrs:{"max-width":"300"},on:{click:function(t){return e.ouvrirLien(e.url)}}},[n("v-img",{attrs:{src:e.img,contain:"","max-height":"150"}}),n("v-card-title",[e._v(" "+e._s(e.SO)+" "),n("v-spacer"),n("v-btn",{attrs:{icon:""}},[n("v-icon",[e._v("mdi-download")])],1)],1),n("v-card-text",[e._v("Constellation version "+e._s(e.version.split(".").map((function(t){return e.formatterChiffre(t)})).join(".").replace(/\.\./g,".").replace(/\.$/,"")))])],1)},b=[],x=n("4bd7"),y={name:"carteFichierInstallation",props:["url","SO","img","version"],mixins:[x["a"]],methods:{ouvrirLien:p["f"]}},w=y,C=n("2877"),O=n("6544"),E=n.n(O),j=n("8336"),S=n("b0af"),R=n("99d9"),A=n("132d"),B=n("adda"),T=n("2fa4"),_=Object(C["a"])(w,g,b,!1,null,null,null),N=_.exports;E()(_,{VBtn:j["a"],VCard:S["a"],VCardText:R["c"],VCardTitle:R["d"],VIcon:A["a"],VImg:B["a"],VSpacer:T["a"]});var L=function(e){return console.log(e),e.split(".").pop()},k={name:"Téléchargements",components:{Titre:v["a"],carteFichierInstallation:N},mixins:[m["a"]],data:function(){return{"URL_TÉLÉCHARGEMENTS":h["e"],"IPA_TÉLÉCHARGEMENTS":h["a"],fichiers:[],versions:[],"systèmesOpératoirs":[{nom:"Linux",logo:n("6d39"),exts:["AppImage"]},{nom:"macOS",logo:n("55c7"),exts:["dmg"]},{nom:"Windows",logo:n("8a65"),exts:["exe"]}],"système":null,version:null,"électron":d()()}},computed:{fichiersChoisis:function(){var e=this,t=this.système?this.systèmesOpératoirs.find((function(t){return t.nom===e.système})).exts:[];return this.fichiers.filter((function(t){return!e.version||t.version===e.version})).filter((function(e){return!t.length||t.includes(L(e.name))}))}},methods:{ouvrirLien:p["f"],soFichier:function(e){var t=L(e),n=this.systèmesOpératoirs.find((function(e){return e.exts.includes(t)}));return n},imageFichier:function(e){var t=this.soFichier(e);return t.logo||this.image("docs")}},mounted:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,c,u=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(h["a"]);case 2:t=e.sent.data,n=["AppImage","dmg","exe"],r=Object(a["a"])(t);try{for(c=function(){var e=o.value,t=e.name;u.fichiers=[].concat(Object(i["a"])(u.fichiers),Object(i["a"])(e.assets.map((function(e){return Object(s["a"])(Object(s["a"])({},e),{},{version:t})})).filter((function(e){return n.includes(L(e.name))})))),u.versions=[].concat(Object(i["a"])(u.versions),[t]),u.versions.length&&(u.version=u.versions[0])},r.s();!(o=r.n()).done;)c()}catch(l){r.e(l)}finally{r.f()}case 6:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},U=k,P=n("62ad"),V=n("a523"),H=n("0fd9"),q=n("b974"),$=n("0789"),F=n("3835"),I=(n("a9e3"),n("0481"),n("5e23"),n("8dd9")),D=n("80d2"),M=n("d9bd"),z=I["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var e=this.computedContentHeight;if(!this.isExtended)return e;var t=parseInt(this.extensionHeight);return this.isCollapsed?e:e+(isNaN(t)?0:t)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(s["a"])(Object(s["a"])({},I["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(s["a"])(Object(s["a"])({},this.measurableStyles),{},{height:Object(D["g"])(this.computedHeight)})}},created:function(){var e=this,t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach((function(t){var n=Object(F["a"])(t,2),r=n[0],o=n[1];e.$attrs.hasOwnProperty(r)&&Object(M["a"])(r,o,e)}))},methods:{genBackground:function(){var e={height:Object(D["g"])(this.computedHeight),src:this.src},t=this.$scopedSlots.img?this.$scopedSlots.img({props:e}):this.$createElement(B["a"],{props:e});return this.$createElement("div",{staticClass:"v-toolbar__image"},[t])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(D["g"])(this.computedContentHeight)}},Object(D["r"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(D["g"])(this.extensionHeight)}},Object(D["r"])(this,"extension"))}},render:function(e){this.isExtended=this.extended||!!this.$scopedSlots.extension;var t=[this.genContent()],n=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&t.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&t.unshift(this.genBackground()),e(this.tag,n,t)}}),J=Object(C["a"])(U,r,o,!1,null,null,null);t["default"]=J.exports;E()(J,{VBtn:j["a"],VCol:P["a"],VContainer:V["a"],VIcon:A["a"],VRow:H["a"],VSelect:q["a"],VSlideXTransition:$["e"],VToolbar:z})},"7a77":function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},"7aac":function(e,t,n){"use strict";var r=n("c532");e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"83b9":function(e,t,n){"use strict";var r=n("d925"),o=n("e683");e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},"8a65":function(e,t,n){e.exports=n.p+"img/Windows.9afcb275.png"},"8df4":function(e,t,n){"use strict";var r=n("7a77");function o(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e,t=new o((function(t){e=t}));return{token:t,cancel:e}},e.exports=o},b50d:function(e,t,n){"use strict";var r=n("c532"),o=n("467f"),s=n("7aac"),i=n("30b59"),a=n("83b9"),c=n("c345"),u=n("3934"),f=n("2d83");e.exports=function(e){return new Promise((function(t,n){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var v=a(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),i(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,s=e.responseType&&"text"!==e.responseType?p.response:p.responseText,i={data:s,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,n,i),p=null}},p.onabort=function(){p&&(n(f("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(f("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||u(v))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){"undefined"===typeof l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(b){if("json"!==e.responseType)throw b}"function"===typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),l||(l=null),p.send(l)}))}},bc3a:function(e,t,n){e.exports=n("cee4")},c345:function(e,t,n){"use strict";var r=n("c532"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}})),i):i}},c401:function(e,t,n){"use strict";var r=n("c532");e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},c532:function(e,t,n){"use strict";var r=n("1d2b"),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return"undefined"===typeof e}function a(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function c(e){return"[object ArrayBuffer]"===o.call(e)}function u(e){return"undefined"!==typeof FormData&&e instanceof FormData}function f(e){var t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer,t}function l(e){return"string"===typeof e}function d(e){return"number"===typeof e}function p(e){return null!==e&&"object"===typeof e}function h(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function m(e){return"[object Date]"===o.call(e)}function v(e){return"[object File]"===o.call(e)}function g(e){return"[object Blob]"===o.call(e)}function b(e){return"[object Function]"===o.call(e)}function x(e){return p(e)&&b(e.pipe)}function y(e){return"undefined"!==typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function C(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function O(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}function E(){var e={};function t(t,n){h(e[n])&&h(t)?e[n]=E(e[n],t):h(t)?e[n]=E({},t):s(t)?e[n]=t.slice():e[n]=t}for(var n=0,r=arguments.length;n<r;n++)O(arguments[n],t);return e}function j(e,t,n){return O(t,(function(t,o){e[o]=n&&"function"===typeof t?r(t,n):t})),e}function S(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}e.exports={isArray:s,isArrayBuffer:c,isBuffer:a,isFormData:u,isArrayBufferView:f,isString:l,isNumber:d,isObject:p,isPlainObject:h,isUndefined:i,isDate:m,isFile:v,isBlob:g,isFunction:b,isStream:x,isURLSearchParams:y,isStandardBrowserEnv:C,forEach:O,merge:E,extend:j,trim:w,stripBOM:S}},c8af:function(e,t,n){"use strict";var r=n("c532");e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},cee4:function(e,t,n){"use strict";var r=n("c532"),o=n("1d2b"),s=n("0a06"),i=n("4a7b"),a=n("2444");function c(e){var t=new s(e),n=o(s.prototype.request,t);return r.extend(n,s.prototype,t),r.extend(n,t),n}var u=c(a);u.Axios=s,u.create=function(e){return c(i(u.defaults,e))},u.Cancel=n("7a77"),u.CancelToken=n("8df4"),u.isCancel=n("2e67"),u.all=function(e){return Promise.all(e)},u.spread=n("0df6"),u.isAxiosError=n("5f02"),e.exports=u,e.exports.default=u},d925:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},db45:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"mt-3 text-center"},[n("v-col",[n("h1",{staticClass:"display-2 font-weight-bold"},[e._v(" "+e._s(e.entête)+" ")])]),e.image?n("v-col",{attrs:{cols:"12"}},[e.imageRonde?n("v-avatar",{staticClass:"mb-3",attrs:{size:"175"}},[n("v-img",{attrs:{src:e.image}})],1):n("v-img",{staticClass:"mb-3",attrs:{src:e.image,contain:"",height:"175"}})],1):e._e(),e.soustitre?n("v-col",{attrs:{cols:"12"}},[n("h2",{staticClass:"headline font-weight-bold mb-5"},[e._v(" "+e._s(e.soustitre)+" ")])]):e._e()],1)},o=[],s=n("2b0e"),i=s["a"].extend({name:"Titre",props:["entête","soustitre","image","imageRonde"]}),a=i,c=n("2877"),u=n("6544"),f=n.n(u),l=n("8212"),d=n("62ad"),p=n("adda"),h=n("0fd9"),m=Object(c["a"])(a,r,o,!1,null,null,null);t["a"]=m.exports;f()(m,{VAvatar:l["a"],VCol:d["a"],VImg:p["a"],VRow:h["a"]})},e683:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},f6b4:function(e,t,n){"use strict";var r=n("c532");function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o}}]);