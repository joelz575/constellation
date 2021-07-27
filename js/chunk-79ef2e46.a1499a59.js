(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79ef2e46"],{"169a":function(t,i,n){"use strict";var e=n("5530"),o=n("2909"),s=n("ade3"),a=(n("a9e3"),n("498a"),n("caad"),n("2532"),n("7db0"),n("368e"),n("480e")),c=n("4ad4"),l=n("b848"),r=n("75eb"),d=n("e707"),u=n("e4d3"),R=n("21be"),C=n("f2e7"),m=n("a293"),v=n("58df"),h=n("d9bd"),P=n("80d2"),T=Object(v["a"])(c["a"],l["a"],r["a"],d["a"],u["a"],R["a"],C["a"]);i["a"]=T.extend({name:"v-dialog",directives:{ClickOutside:m["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var t;return t={},Object(s["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(s["a"])(t,"v-dialog--active",this.isActive),Object(s["a"])(t,"v-dialog--persistent",this.persistent),Object(s["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(s["a"])(t,"v-dialog--scrollable",this.scrollable),Object(s["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var i;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(i=this.previousActiveElement)||i.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(h["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var i=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(i)||this.overlay&&i&&!this.overlay.$el.contains(i))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){t.previousActiveElement=document.activeElement,t.$refs.content.focus(),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===P["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var i=this.getActivator();this.$nextTick((function(){return i&&i.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var i=t.target;if(i&&![document,this.$refs.content].includes(i)&&!this.$refs.content.contains(i)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(i)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),e=Object(o["a"])(n).find((function(t){return!t.hasAttribute("disabled")}));e&&e.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(a["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(e["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(e["a"])(Object(e["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(P["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(P["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"2fa4":function(t,i,n){"use strict";n("20f68");var e=n("80d2");i["a"]=Object(e["h"])("spacer","div","v-spacer")},"362d":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-chip",{staticClass:"ma-1 my-1",attrs:{outlined:"",small:"",label:""}},[n("v-icon",{attrs:{small:"",left:"",color:"success"}},[t._v(" mdi-check ")]),t._v(" "+t._s(t.$t("licences.droits."+t.droit))+" ")],1)},o=[],s={name:"jetonDroit",props:["droit"]},a=s,c=n("2877"),l=n("6544"),r=n.n(l),d=n("cc20"),u=n("132d"),R=Object(c["a"])(a,e,o,!1,null,null,null);i["a"]=R.exports;r()(R,{VChip:d["a"],VIcon:u["a"]})},"368e":function(t,i,n){},"5cf6":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-chip",{staticClass:"ma-1 my-1",attrs:{outlined:"",small:"",label:""}},[n("v-icon",{attrs:{small:"",left:"",color:"error"}},[t._v(" mdi-close ")]),t._v(" "+t._s(t.$t("licences.limitations."+t.limitation))+" ")],1)},o=[],s={name:"jetonLimitation",props:["limitation"]},a=s,c=n("2877"),l=n("6544"),r=n.n(l),d=n("cc20"),u=n("132d"),R=Object(c["a"])(a,e,o,!1,null,null,null);i["a"]=R.exports;r()(R,{VChip:d["a"],VIcon:u["a"]})},"6a08":function(t,i,n){"use strict";n.d(i,"a",(function(){return a})),n.d(i,"b",(function(){return c})),n.d(i,"c",(function(){return l}));var e,o,s,a;n("b64b");(function(t){t["ATTR"]="attribution",t["ÉGAL"]="partageÉgal",t["INCL"]="inclureDroitDauteur",t["CHNG"]="indiquerChangements",t["SRCE"]="partagerCodeSource",t["USGR"]="usageRéseau"})(e||(e={})),function(t){t["PRTG"]="partager",t["ADPT"]="adapter",t["CMRC"]="usageComercial",t["PRV"]="usagePrivé",t["BREV"]="usageBrevets"}(o||(o={})),function(t){t["RSP"]="aucuneResponsabilité",t["GRNT"]="aucuneGarantie",t["MRCM"]="marqueCommerce",t["BREV"]="brevetExclu",t["SOUS"]="sousLicence"}(s||(s={})),function(t){t["BD"]="basesDeDonnées",t["ART"]="artistique",t["CODE"]="codeInformatique",t["AUTRE"]="autre"}(a||(a={}));var c={"ODbl-1_0":{droits:[o.CMRC,o.PRTG,o.PRV,o.ADPT],conditions:[e.ATTR,e.ÉGAL,e.INCL],limitations:[s.RSP,s.BREV,s.MRCM,s.GRNT],"catégorie":a.BD},"ODC-BY-1_0":{droits:[o.CMRC,o.PRTG,o.PRV,o.ADPT],conditions:[e.ATTR,e.INCL],limitations:[s.RSP,s.GRNT,s.MRCM,s.BREV],"catégorie":a.BD},PDDL:{droits:[o.CMRC,o.PRTG,o.ADPT,o.PRV],conditions:[],limitations:[s.RSP,s.GRNT,s.MRCM,s.BREV],"catégorie":a.BD},"rvca-open":{droits:[o.PRV,o.CMRC,o.ADPT,o.PRTG],conditions:[e.INCL,e.ATTR],limitations:[s.SOUS,s.RSP],"catégorie":a.BD,"spécialisée":!0},"CC-BY-SA-4_0":{droits:[o.PRTG,o.ADPT,o.CMRC,o.PRV],conditions:[e.INCL,e.CHNG,e.ÉGAL],limitations:[s.RSP,s.MRCM,s.BREV,s.GRNT],"catégorie":a.ART},"CC-BY-4_0":{droits:[o.CMRC,o.PRTG,o.ADPT,o.PRV],conditions:[e.ATTR,e.CHNG],limitations:[s.RSP,s.MRCM,s.BREV,s.GRNT],"catégorie":a.ART},"CC-0-1_0":{droits:[o.PRTG,o.ADPT,o.CMRC,o.PRV],conditions:[],limitations:[s.RSP,s.MRCM,s.BREV,s.GRNT],"catégorie":a.ART},"0bsd":{droits:[o.CMRC,o.PRTG,o.ADPT,o.PRV],conditions:[],limitations:[],"catégorie":a.CODE},"afl-3_0":{droits:[o.CMRC,o.PRTG,o.ADPT,o.PRV,o.BREV],conditions:[e.INCL,e.CHNG],limitations:[s.MRCM,s.RSP,s.GRNT],"catégorie":a.CODE},"agpl-3_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.CHNG,e.SRCE,e.USGR,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"apache-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.CHNG],limitations:[s.MRCM,s.RSP,s.GRNT],"catégorie":a.CODE},"artistic-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.CHNG],limitations:[s.RSP,s.MRCM,s.GRNT],"catégorie":a.CODE},"bsd-2-clause":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"bsd-3-clause-clear":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.BREV,s.GRNT],"catégorie":a.CODE},"bsd-3-clause":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"bsd-4-clause":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"bsl-1_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"cecill-2_1":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV,o.BREV],conditions:[e.INCL,e.SRCE,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"ecl-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.CHNG],limitations:[s.BREV,s.RSP,s.GRNT],"catégorie":a.CODE},"epl-1_0":{droits:[o.CMRC,o.PRTG,o.ADPT,o.BREV,o.PRV],conditions:[e.SRCE,e.INCL,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"epl-2_0":{droits:[o.CMRC,o.PRTG,o.ADPT,o.BREV,o.PRV],conditions:[e.SRCE,e.INCL,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"eupl-1_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.SRCE,e.CHNG,e.USGR,e.ÉGAL],limitations:[s.RSP,s.MRCM,s.GRNT],"catégorie":a.CODE},"eupl-1_2":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.SRCE,e.CHNG,e.USGR,e.ÉGAL],limitations:[s.RSP,s.MRCM,s.GRNT],"catégorie":a.CODE},"gpl-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL,e.CHNG,e.SRCE,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"gpl-3_0":{droits:[o.CMRC,o.ADPT,o.PRV,o.BREV,o.PRV],conditions:[e.INCL,e.CHNG,e.SRCE,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},isc:{droits:[o.CMRC,o.PRTG,o.ADPT,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"lgpl-2_1":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL,e.SRCE,e.CHNG,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"lgpl-3_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL,e.SRCE,e.CHNG,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"lppl-1_3c":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL,e.CHNG,e.SRCE],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"mit-0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},mit:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"mpl-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.SRCE,e.INCL,e.ÉGAL],limitations:[s.RSP,s.MRCM,s.GRNT],"catégorie":a.CODE},"ms-pl":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL],limitations:[s.GRNT,s.MRCM],"catégorie":a.CODE},"ms-rl":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.SRCE,e.INCL,e.ÉGAL],limitations:[s.GRNT,s.MRCM],"catégorie":a.CODE},"mulanpsl-2_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.MRCM,s.GRNT],"catégorie":a.CODE},ncsa:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"osl-3_0":{droits:[o.CMRC,o.PRTG,o.ADPT,o.BREV,o.PRV],conditions:[e.INCL,e.SRCE,e.CHNG,e.USGR,e.ÉGAL],limitations:[s.MRCM,s.RSP,s.GRNT],"catégorie":a.CODE},postgresql:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},unlicence:{droits:[o.PRV,o.CMRC,o.ADPT,o.PRTG],conditions:[],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"upl-1_0":{droits:[o.CMRC,o.ADPT,o.PRTG,o.BREV,o.PRV],conditions:[e.INCL],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},vim:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL,e.CHNG,e.SRCE,e.ÉGAL],limitations:[],"catégorie":a.CODE},wtfpl:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[],limitations:[],"catégorie":a.CODE},zlib:{droits:[o.CMRC,o.ADPT,o.PRTG,o.PRV],conditions:[e.INCL,e.CHNG],limitations:[s.RSP,s.GRNT],"catégorie":a.CODE},"ofl-1_1":{droits:[o.PRV,o.CMRC,o.ADPT,o.PRTG],conditions:[e.INCL,e.ÉGAL],limitations:[s.RSP,s.GRNT],"catégorie":a.AUTRE}},l=Object.keys(c)},8764:function(t,i,n){"use strict";n("caad"),n("2532"),n("fb6a");var e=n("2b0e"),o=n("d257"),s=n("6a08");i["a"]=e["a"].extend({data:function(){return{licences:s["c"],infoLicences:s["b"],droits:this.licence?s["b"][this.licence].droits:[],conditions:this.licence?s["b"][this.licence].conditions:[],limitations:this.licence?s["b"][this.licence].limitations:[]}},computed:{"licenceApprouvée":function(){return s["c"].includes(this.licence)},lienLicenceValid:function(){return this.licence&&"http"===this.$t("licences.info.".concat(this.licence,".lien")).slice(0,4)},nomLicence:function(){return this.licence&&!this.licenceApprouvée?this.licence:this.obtNomLicence(this.licence)}},watch:{licence:function(t){s["b"][t]&&(this.droits=s["b"][t].droits||[],this.conditions=s["b"][t].conditions||[],this.limitations=s["b"][t].limitations||[])}},methods:{ouvrirLienLicence:function(){this.licence&&Object(o["f"])(this.$t("licences.info.".concat(this.licence,".lien")))},obtNomLicence:function(t){return this.$t("licences.info.".concat(t||"introuvable",".nom"))}}})},ba0d:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-chip",{staticClass:"ma-1 my-1",attrs:{outlined:"",small:"",label:""}},[n("v-icon",{attrs:{small:"",left:"",color:"blue"}},[t._v(" mdi-information-outline ")]),t._v(" "+t._s(t.$t("licences.conditions."+t.condition))+" ")],1)},o=[],s={name:"jetonCondition",props:["condition"]},a=s,c=n("2877"),l=n("6544"),r=n.n(l),d=n("cc20"),u=n("132d"),R=Object(c["a"])(a,e,o,!1,null,null,null);i["a"]=R.exports;r()(R,{VChip:d["a"],VIcon:u["a"]})},c8da:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-menu",{attrs:{transition:"slide-y-transition",bottom:"","close-on-content-click":!1,"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(i){var e=i.on;return[n("v-btn",t._g({attrs:{icon:""}},e),[n("v-icon",[t._v("mdi-link")])],1)]}}])},[n("v-list",{attrs:{dense:""}},[n("v-list-item",[n("v-list-item-content",[t._v(t._s(t.lien))]),n("v-list-item-action",[n("v-btn",{attrs:{icon:"",small:""},on:{click:function(i){return t.copier(t.lien)}}},[n("v-icon",{attrs:{small:""}},[t._v(t._s(t.copié?"mdi-check":"mdi-content-copy"))])],1)],1)],1)],1)],1)},o=[],s=n("1da1"),a=(n("96cf"),{name:"lienOrbit",props:["lien"],data:function(){return{"copié":!1}},methods:{copier:function(t){var i=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(navigator.clipboard){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,navigator.clipboard.writeText(t);case 4:i.copié=!0;case 5:case"end":return n.stop()}}),n)})))()}}}),c=a,l=n("2877"),r=n("6544"),d=n.n(r),u=n("8336"),R=n("132d"),C=n("8860"),m=n("da13"),v=n("1800"),h=n("5d23"),P=n("e449"),T=Object(l["a"])(c,e,o,!1,null,null,null);i["a"]=T.exports;d()(T,{VBtn:u["a"],VIcon:R["a"],VList:C["a"],VListItem:m["a"],VListItemAction:v["a"],VListItemContent:h["b"],VMenu:P["a"]})},d10e:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-dialog",{attrs:{scrollable:"","max-width":"400"},scopedSlots:t._u([{key:"activator",fn:function(i){var n=i.on,e=i.attrs;return[t._t("activator",null,null,{on:n,attrs:e})]}}],null,!0),model:{value:t.dialogue,callback:function(i){t.dialogue=i},expression:"dialogue"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v(" "+t._s(t.nomLicence)+" "),t.permissionModifier?n("v-menu",{attrs:{transition:"slide-y-transition",bottom:"","offset-x":"","min-width":"225"},scopedSlots:t._u([{key:"activator",fn:function(i){var e=i.on;return[n("v-btn",t._g({staticClass:"mx-2",attrs:{icon:"",small:""}},e),[n("v-icon",{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!1,2925579818)},[n("v-list",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"300px"}},t._l(t.licences,(function(i){return n("v-list-item",{key:i,on:{click:function(n){return t.$emit("changerLicence",{licence:i})}}},[n("v-list-item-avatar",[i===t.licence?n("v-icon",[t._v("mdi-check")]):t._e()],1),n("v-list-item-content",{class:{"font-weight-bold":i===t.licence}},[t._v(t._s(t.obtNomLicence(i)))])],1)})),1)],1):t._e()],1),n("v-divider"),n("v-card-text",[n("p",{staticClass:"mt-3 mb-0"},[n("v-icon",{attrs:{small:""}},[t._v("mdi-alert-circle-outline")]),t._v(" "+t._s(t.$t("licences.avertissement"))+" ")],1),n("div",{staticClass:"text-center"},[n("v-btn",{staticClass:"mx-auto my-3",attrs:{outlined:"",small:"",disabled:!t.lienLicenceValid},on:{click:function(i){t.ouvrirLienLicence(t.$t("licences.info."+t.licence+".lien"))}}},[n("v-icon",{attrs:{left:""}},[t._v("mdi-scale-balance")]),t.lienLicenceValid?n("div",[t._v(" "+t._s(t.$t("licences.lire"))+" "),n("v-icon",{attrs:{right:""}},[t._v("mdi-open-in-new")])],1):n("div",[t._v(t._s(t.$t("licences.aucunLien")))])],1)],1),n("v-divider"),n("p",{staticClass:"mb-0 text-overline"},[t._v(t._s(t.$t("licences.droits.sousTitre")))]),t.droits.length?t._e():n("p",{staticClass:"text--disabled"},[t._v(" "+t._s(t.$t("licences.droits.aucune"))+" ")]),t._l(t.droits,(function(t){return n("jeton-droit",{key:t,staticClass:"ma-1 my-1",attrs:{droit:t,outlined:"",small:"",label:""}})})),n("p",{staticClass:"mb-0 text-overline"},[t._v(" "+t._s(t.$t("licences.conditions.sousTitre"))+" ")]),t.conditions.length?t._e():n("p",{staticClass:"text--disabled"},[t._v(" "+t._s(t.$t("licences.conditions.aucune"))+" ")]),t._l(t.conditions,(function(t){return n("jeton-condition",{key:t,staticClass:"ma-1 my-1",attrs:{condition:t,outlined:"",small:"",label:""}})})),n("p",{staticClass:"mb-0 text-overline"},[t._v(" "+t._s(t.$t("licences.limitations.sousTitre"))+" ")]),t.limitations.length?t._e():n("p",{staticClass:"text--disabled"},[t._v(" "+t._s(t.$t("licences.limitations.aucune"))+" ")]),t._l(t.limitations,(function(t){return n("jeton-limitation",{key:t,staticClass:"ma-1 my-1",attrs:{limitation:t,outlined:"",small:"",label:""}})}))],2),n("v-divider"),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"secondary",text:"",outlined:""},on:{click:function(i){t.dialogue=!1}}},[t._v(" "+t._s(t.$t("communs.fermer"))+" ")])],1)],1)],1)},o=[],s=n("8764"),a=n("362d"),c=n("5cf6"),l=n("ba0d"),r={name:"dialogueLicence",props:{licence:{type:String},permissionModifier:{default:!1,type:Boolean}},components:{jetonDroit:a["a"],jetonCondition:l["a"],jetonLimitation:c["a"]},mixins:[s["a"]],data:function(){return{dialogue:!1}}},d=r,u=n("2877"),R=n("6544"),C=n.n(R),m=n("8336"),v=n("b0af"),h=n("99d9"),P=n("169a"),T=n("ce7e"),f=n("132d"),g=n("8860"),G=n("da13"),p=n("8270"),b=n("5d23"),A=n("e449"),D=n("2fa4"),V=Object(u["a"])(d,e,o,!1,null,null,null);i["a"]=V.exports;C()(V,{VBtn:m["a"],VCard:v["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VDialog:P["a"],VDivider:T["a"],VIcon:f["a"],VList:g["a"],VListItem:G["a"],VListItemAvatar:p["a"],VListItemContent:b["b"],VMenu:A["a"],VSpacer:D["a"]})}}]);