!function(){function t(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n,i,e,o,a,r){try{var c=t[a](r),s=c.value}catch(u){return void i(u)}c.done?n(s):Promise.resolve(s).then(e,o)}function o(t){return function(){var n=this,i=arguments;return new Promise(function(o,a){var r=t.apply(n,i);function c(t){e(r,o,a,c,s,"next",t)}function s(t){e(r,o,a,c,s,"throw",t)}c(void 0)})}}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0/6H":function(t,n,i){"use strict";i.d(n,"a",function(){return r});var e=i("A36C"),o=i("iWo5"),a=i("qULd"),r=function(t,n){var i,r,c=function(t,e,o){if("undefined"!=typeof document){var a=document.elementFromPoint(t,e);a&&n(a)?a!==i&&(u(),s(a,o)):u()}},s=function(t,n){i=t,r||(r=i);var o=i;Object(e.f)(function(){return o.classList.add("ion-activated")}),n()},u=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(i){var n=i;Object(e.f)(function(){return n.classList.remove("ion-activated")}),t&&r!==i&&i.click(),i=void 0}};return Object(o.createGesture)({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:function(t){return c(t.currentX,t.currentY,a.a)},onMove:function(t){return c(t.currentX,t.currentY,a.b)},onEnd:function(){u(!0),Object(a.e)(),r=void 0}})}},"74mu":function(t,n,i){"use strict";i.d(n,"a",function(){return a}),i.d(n,"b",function(){return r}),i.d(n,"c",function(){return e}),i.d(n,"d",function(){return s});var e=function(t,n){return null!==n.closest(t)},a=function(t,n){return"string"==typeof t&&t.length>0?Object.assign((o=!0,(e="ion-color-"+t)in(i={"ion-color":!0})?Object.defineProperty(i,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[e]=o,i),n):n;var i,e,o},r=function(t){var n={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(function(t){return null!=t}).map(function(t){return t.trim()}).filter(function(t){return""!==t}):[]}(t).forEach(function(t){return n[t]=!0}),n},c=/^[a-z][a-z0-9+\-.]*:/,s=function(){var t=o(regeneratorRuntime.mark(function t(n,i,e,o){var a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(null==n||"#"===n[0]||c.test(n)){t.next=4;break}if(!(a=document.querySelector("ion-router"))){t.next=4;break}return t.abrupt("return",(null!=i&&i.preventDefault(),a.push(n,e,o)));case 4:return t.abrupt("return",!1);case 5:case"end":return t.stop()}},t)}));return function(n,i,e,o){return t.apply(this,arguments)}}()},"9N89":function(t,n,e){"use strict";e.d(n,"a",function(){return r});var o=e("ofXK"),a=e("fXoL"),r=function(){var t=function t(){i(this,t)};return t.\u0275mod=a.Ib({type:t}),t.\u0275inj=a.Hb({factory:function(n){return new(n||t)},imports:[[o.b]]}),t}()},LG92:function(t,e,o){"use strict";o.d(e,"a",function(){return g});var a=o("mrSG"),r=o("HgE5"),c=o("fXoL"),s=o("3Pt+"),u=o("mPU2"),l=o("TEn/"),b=o("KQWd"),d=o("ofXK"),p=o("cZdB");function f(t,n){if(1&t){var i=c.Rb();c.Qb(0,"ion-buttons",8),c.Qb(1,"ion-button",1),c.Yb("click",function(){return c.tc(i),c.ac().submitForm()}),c.Lb(2,"ion-icon",9),c.Pb(),c.Pb()}}function h(t,n){if(1&t&&(c.Qb(0,"ion-row"),c.Qb(1,"ion-col",15),c.Qb(2,"u",11),c.Bc(3,"\u0e40\u0e25\u0e02\u0e40\u0e2a\u0e37\u0e49\u0e2d\u0e40\u0e1a\u0e2d\u0e23\u0e4c:"),c.Pb(),c.Bc(4),c.Pb(),c.Qb(5,"ion-col",15),c.Qb(6,"u",11),c.Bc(7,"\u0e14\u0e49\u0e32\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e2a\u0e35:"),c.Pb(),c.Bc(8),c.Pb(),c.Qb(9,"ion-col",15),c.Qb(10,"u",11),c.Bc(11,"\u0e14\u0e49\u0e32\u0e19\u0e2b\u0e25\u0e31\u0e07\u0e2a\u0e35:"),c.Pb(),c.Bc(12),c.Pb(),c.Pb()),2&t){var i=n.$implicit;c.zb(4),c.Dc(" ",i.podetail_number,""),c.zb(4),c.Dc(" ",i.color_front,""),c.zb(4),c.Dc(" ",i.color_back,"")}}function m(t,n){if(1&t){var i=c.Rb();c.Qb(0,"ion-card"),c.Qb(1,"ion-item"),c.Qb(2,"ion-checkbox",10),c.Yb("click",function(){c.tc(i);var t=n.index,e=n.$implicit,o=c.ac();return o.selectData(t,o.data[t],e.checked)})("ngModelChange",function(t){return c.tc(i),n.$implicit.checked=t}),c.Pb(),c.Qb(3,"ion-row"),c.Qb(4,"ion-col"),c.Qb(5,"ion-label",11),c.Bc(6),c.Pb(),c.Pb(),c.Pb(),c.Qb(7,"ion-button",12),c.Yb("click",function(){c.tc(i);var t=n.$implicit;return c.ac().View(t.id,t.po_running)}),c.Bc(8),c.Pb(),c.Pb(),c.Qb(9,"ion-item"),c.Qb(10,"ion-grid",13),c.Qb(11,"ion-row"),c.Qb(12,"ion-col"),c.Qb(13,"ion-label"),c.Qb(14,"u",11),c.Bc(15,"\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e2a\u0e31\u0e48\u0e07\u0e0b\u0e37\u0e49\u0e2d:"),c.Pb(),c.Bc(16),c.Pb(),c.Pb(),c.Qb(17,"ion-col"),c.Qb(18,"ion-label"),c.Qb(19,"u",11),c.Bc(20,"\u0e0a\u0e37\u0e48\u0e2d\u0e27\u0e34\u0e19:"),c.Pb(),c.Bc(21),c.Pb(),c.Pb(),c.Qb(22,"ion-col"),c.Qb(23,"ion-label"),c.Qb(24,"u",11),c.Bc(25,"\u0e40\u0e02\u0e15:"),c.Pb(),c.Bc(26),c.Pb(),c.Pb(),c.Pb(),c.Qb(27,"ion-row"),c.Qb(28,"ion-col"),c.Qb(29,"ion-label"),c.Qb(30,"u",11),c.Bc(31,"\u0e0a\u0e37\u0e48\u0e2d\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(32),c.Pb(),c.Pb(),c.Qb(33,"ion-col"),c.Qb(34,"ion-label"),c.Qb(35,"u",11),c.Bc(36,"\u0e40\u0e1a\u0e2d\u0e23\u0e4c\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(37),c.Pb(),c.Pb(),c.Pb(),c.Qb(38,"ion-row"),c.Qb(39,"ion-col"),c.Qb(40,"ion-label"),c.Qb(41,"u",11),c.Bc(42,"\u0e08\u0e33\u0e19\u0e27\u0e19\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(43),c.Pb(),c.Pb(),c.Qb(44,"ion-col"),c.Qb(45,"ion-label"),c.Qb(46,"u",11),c.Bc(47,"\u0e23\u0e32\u0e04\u0e32\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14:"),c.Pb(),c.Bc(48),c.bc(49,"number"),c.Pb(),c.Pb(),c.Qb(50,"ion-col"),c.Qb(51,"ion-label"),c.Qb(52,"u",11),c.Bc(53,"\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e23\u0e31\u0e1a:"),c.Pb(),c.Bc(54),c.Pb(),c.Pb(),c.Pb(),c.zc(55,h,13,3,"ion-row",5),c.Qb(56,"ion-row"),c.Qb(57,"ion-col"),c.Qb(58,"ion-label"),c.Qb(59,"u",11),c.Bc(60,"\u0e2a\u0e16\u0e32\u0e19\u0e30 :"),c.Pb(),c.Qb(61,"span",14),c.Bc(62),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb()}if(2&t){var e=n.$implicit,o=n.index;c.zb(2),c.hc("ngModel",e.checked),c.zb(4),c.Cc(e.po_running),c.zb(2),c.Dc("\u0e14\u0e39\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14\u0e25\u0e33\u0e14\u0e31\u0e1a\u0e17\u0e35\u0e48 ",o+1,""),c.zb(8),c.Dc(" ",e.po_date,""),c.zb(5),c.Dc(" ",e.po_namewin,""),c.zb(5),c.Dc(" ",e.area_name,""),c.zb(6),c.Dc(" ",e.po_customer,""),c.zb(5),c.Dc(" ",e.po_customer_tel,""),c.zb(6),c.Dc(" ",e.qty,""),c.zb(5),c.Dc(" ",c.cc(49,14,e.po_total),""),c.zb(6),c.Dc(" ",e.po_recivedate,""),c.zb(1),c.hc("ngForOf",e.ponumberdetail),c.zb(6),c.hc("ngClass",8==e.po_status?"postatus_alert":"postatus_ok"),c.zb(1),c.Dc(" ",e.po_statustext,"")}}var g=function(){var t=function(){function t(n,e,o,a,r){i(this,t),this.formBuilder=n,this.configSv=e,this.alertCtrl=o,this.poSv=a,this.modalCtrl=r,this.itemsomedata=[],this.isSubmitted=!1,this.data=[],this.page=0,this.limit=50,this.maxdatalimit=0,this.dataallarray=[]}return n(t,[{key:"ngOnInit",value:function(){this.ionicForm=this.formBuilder.group({typeserch_id:["4"],txtserach:[this.recivedate]}),this.loaddata(0),this.dataallarray=this.itemsomedata}},{key:"dismissModal",value:function(){this.modalCtrl.dismiss()}},{key:"loaddata",value:function(t,n){var i=this;this.sub=this.poSv.getpo(this.ionicForm.value,t,this.limit).subscribe(function(e){null!==e?(i.maxpadding=e.maxpadding,e.limit,i.data=i.data.concat(e.data_detail.map(function(t){return Object.assign({},t)})),0===t&&i.compareArray(i.data,i.itemsomedata),n&&n.target.complete()):i.maxpadding=0})}},{key:"doInfinite",value:function(t){this.page++,this.loaddata(this.page*this.limit,t),this.page===this.maxpadding&&(t.target.disabled=!0)}},{key:"selectData",value:function(t,n,i){i?this.dataallarray=this.dataallarray.filter(function(t){return t.id!==n.id}):this.dataallarray.push(n)}},{key:"submitForm",value:function(){console.log(this.dataallarray),this.modalCtrl.dismiss(this.dataallarray,"somedata")}},{key:"compareArray",value:function(t,n){t.forEach(function(i){n.forEach(function(n){i.id==n.id&&(t=t.filter(function(t){return t.id!==n.id})).unshift(n)})}),this.data=t}},{key:"View",value:function(t,n){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function i(){var e,o,a,c,s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e=this.data.filter(function(n){return n.id==t}),i.next=3,this.modalCtrl.create({component:r.a,cssClass:"my-modal",componentProps:{id:t,po_running:n,mode:"view"}});case 3:return o=i.sent,i.next=6,o.present();case 6:return i.next=8,o.onWillDismiss();case 8:a=i.sent,c=a.data,"comfirm"===(s=a.role)?(e[0].po_date=c[0].po_date,e[0].po_recivedate=c[0].po_recivedate,e[0].po_namewin=c[0].po_namewin,e[0].po_customer=c[0].po_customer,e[0].qty=c[0].qty,e[0].po_total=c[0].po_total):"cancel"===s&&(e[0].po_statustext=c[0].po_statustext);case 12:case"end":return i.stop()}},i,this)}))}}]),t}();return t.\u0275fac=function(n){return new(n||t)(c.Kb(s.b),c.Kb(u.a),c.Kb(l.a),c.Kb(b.a),c.Kb(l.ab))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-poassign02"]],inputs:{recivedate:"recivedate",itemsomedata:"itemsomedata"},decls:15,vars:7,consts:[["slot","start"],[3,"click"],["slot","icon-only","name","arrow-back-outline"],["slot","primary",4,"ngIf"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],["slot","primary"],["slot","icon-only","src","./assets/icons/save.svg"],["color","dark","slot","start",3,"ngModel","click","ngModelChange"],[1,"showlabelheader"],["fill","outline","slot","end","color","success",3,"click"],["fixed",""],[3,"ngClass"],["size","auto"]],template:function(t,n){1&t&&(c.Qb(0,"ion-header"),c.Qb(1,"ion-toolbar"),c.Qb(2,"ion-buttons",0),c.Qb(3,"ion-button",1),c.Yb("click",function(){return n.dismissModal()}),c.Lb(4,"ion-icon",2),c.Pb(),c.Pb(),c.Qb(5,"ion-title"),c.Bc(6),c.Pb(),c.zc(7,f,3,0,"ion-buttons",3),c.Pb(),c.Pb(),c.Qb(8,"ion-content"),c.Qb(9,"div"),c.Qb(10,"ion-searchbar",4),c.Yb("ngModelChange",function(t){return n.filterTerm=t}),c.Pb(),c.zc(11,m,63,16,"ion-card",5),c.bc(12,"filter"),c.Qb(13,"ion-infinite-scroll",6),c.Yb("ionInfinite",function(t){return n.doInfinite(t)}),c.Lb(14,"ion-infinite-scroll-content",7),c.Pb(),c.Pb(),c.Pb()),2&t&&(c.zb(6),c.Dc("\u0e19\u0e31\u0e14\u0e23\u0e31\u0e1a\u0e02\u0e2d\u0e07\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48 ",n.recivedate,""),c.zb(1),c.hc("ngIf",n.dataallarray.length>0),c.zb(3),c.hc("ngModel",n.filterTerm),c.zb(1),c.hc("ngForOf",c.dc(12,4,n.data,n.filterTerm)))},directives:[l.p,l.U,l.h,l.g,l.q,l.T,d.k,l.m,l.M,l.ib,s.h,s.j,d.j,l.s,l.t,l.i,l.v,l.j,l.b,l.L,l.l,l.B,l.o,d.i],pipes:[p.a,d.d],styles:[""]}),t}()},QmPH:function(t,e,o){"use strict";o.d(e,"a",function(){return s});var a=o("fXoL"),r=o("tk/3"),c=o("mPU2"),s=function(){var t=function(){function t(n,e){i(this,t),this.http=n,this.configSv=e}return n(t,[{key:"getsysmenu",value:function(t){var n,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9999999999;return n={padding:t,limit:i,type_sql:"read"},this.http.post(this.configSv.ip+"sysmenu.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudsysmenu",value:function(t,n,i){var e;return e="cancel"===n?{id:t,emp_id:this.configSv.emp_id,type_sql:n,cause:i}:{id:t.id,title:t.title,url:t.url,svg:t.svg,seq:t.seq,submenu_flg:t.submenu,emp_id:this.configSv.emp_id,type_sql:n},this.http.post(this.configSv.ip+"sysmenu.php",e,{headers:{"Content-Type":"application/json"}})}},{key:"getsyssubmenu",value:function(t){var n,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9999999999;return n={padding:t,limit:i,type_sql:"read"},this.http.post(this.configSv.ip+"syssubmenu.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudsyssubmenu",value:function(t,n,i){var e;return e="cancel"===n?{id:t,emp_id:this.configSv.emp_id,type_sql:n,cause:i}:{id:t.id,title:t.title,url:t.url,svg:t.svg,seq:t.seq,open:t.open,sys_menu_id:t.sys_menu_id.id,emp_id:this.configSv.emp_id,type_sql:n},this.http.post(this.configSv.ip+"syssubmenu.php",e,{headers:{"Content-Type":"application/json"}})}},{key:"getsysgroup",value:function(t){var n,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9999999999;return n={padding:t,limit:i,type_sql:"read"},this.http.post(this.configSv.ip+"sysgroup.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudsysgroup",value:function(t,n,i){var e;return e="cancel"===n?{id:t,emp_id:this.configSv.emp_id,type_sql:n,cause:i}:{id:t.id,group_name:t.group_name,description:t.description,emp_id:this.configSv.emp_id,type_sql:n},this.http.post(this.configSv.ip+"sysgroup.php",e,{headers:{"Content-Type":"application/json"}})}},{key:"getsyssubmenu_sysgroupmenu",value:function(t,n,i){var e,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:9999999999;return e={group_id:n,padding:t,limit:o,type_sql:i},this.http.post(this.configSv.ip+"sysgroupmenu.php",e,{headers:{"Content-Type":"application/json"}})}},{key:"crudsyssubmenu_sysgroupmenu",value:function(t,n,i){var e;return e="delete"===n?{id:t,emp_id:this.configSv.emp_id,type_sql:n}:{group_id:t.group_id,submenu:t.syssubmenu_id,emp_id:this.configSv.emp_id,type_sql:n},this.http.post(this.configSv.ip+"sysgroupmenu.php",e,{headers:{"Content-Type":"application/json"}})}},{key:"getpublicize",value:function(){var t;return t={type_sql:"read"},this.http.post(this.configSv.ip+"syspublicize.php",t,{headers:{"Content-Type":"application/json"}})}},{key:"crudpublicize",value:function(t,n){var i;return i={name:t,emp_id:this.configSv.emp_id,type_sql:n},this.http.post(this.configSv.ip+"syspublicize.php",i,{headers:{"Content-Type":"application/json"}})}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Ub(r.a),a.Ub(c.a))},t.\u0275prov=a.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},ZaV5:function(t,n,i){"use strict";i.d(n,"a",function(){return e}),i.d(n,"b",function(){return a});var e=function(){var t=o(regeneratorRuntime.mark(function t(n,i,e,o,a){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=2;break}return t.abrupt("return",n.attachViewToDom(i,e,a,o));case 2:if("string"==typeof e||e instanceof HTMLElement){t.next=4;break}throw new Error("framework delegate is missing");case 4:if(r="string"==typeof e?i.ownerDocument&&i.ownerDocument.createElement(e):e,o&&o.forEach(function(t){return r.classList.add(t)}),a&&Object.assign(r,a),i.appendChild(r),t.t0=r.componentOnReady,!t.t0){t.next=12;break}return t.next=12,r.componentOnReady();case 12:return t.abrupt("return",r);case 13:case"end":return t.stop()}},t)}));return function(n,i,e,o,a){return t.apply(this,arguments)}}(),a=function(t,n){if(n){if(t)return t.removeViewFromDom(n.parentElement,n);n.remove()}return Promise.resolve()}},h3R7:function(t,n,i){"use strict";i.d(n,"a",function(){return e});var e={bubbles:{dur:1e3,circles:9,fn:function(t,n,i){var e=t*n/i-t+"ms",o=2*Math.PI*n/i;return{r:5,style:{top:9*Math.sin(o)+"px",left:9*Math.cos(o)+"px","animation-delay":e}}}},circles:{dur:1e3,circles:8,fn:function(t,n,i){var e=n/i,o=t*e-t+"ms",a=2*Math.PI*e;return{r:5,style:{top:9*Math.sin(a)+"px",left:9*Math.cos(a)+"px","animation-delay":o}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:function(){return{r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}}}},crescent:{dur:750,circles:1,fn:function(){return{r:26,style:{}}}},dots:{dur:750,circles:3,fn:function(t,n){return{r:6,style:{left:9-9*n+"px","animation-delay":-110*n+"ms"}}}},lines:{dur:1e3,lines:12,fn:function(t,n,i){return{y1:17,y2:29,style:{transform:"rotate(".concat(30*n+(n<6?180:-180),"deg)"),"animation-delay":t*n/i-t+"ms"}}}},"lines-small":{dur:1e3,lines:12,fn:function(t,n,i){return{y1:12,y2:20,style:{transform:"rotate(".concat(30*n+(n<6?180:-180),"deg)"),"animation-delay":t*n/i-t+"ms"}}}}}},kmKk:function(t,e,o){"use strict";o.d(e,"a",function(){return d});var a=o("fXoL"),r=o("3Pt+"),c=o("mPU2"),s=o("TEn/"),u=o("KQWd"),l=o("ofXK");function b(t,n){1&t&&(a.Qb(0,"ion-buttons",4),a.Qb(1,"ion-button"),a.Lb(2,"ion-icon",5),a.Pb(),a.Pb())}var d=function(){var t=function(){function t(n,e,o,a,r){i(this,t),this.formBuilder=n,this.configSv=e,this.alertCtrl=o,this.poSv=a,this.modalCtrl=r,this.isSubmitted=!1,this.data=[],this.page=0,this.limit=50,this.maxdatalimit=0,this.dataallarray=[]}return n(t,[{key:"ngOnInit",value:function(){this.ionicForm=this.formBuilder.group({po_recivedate:[this.recivedate]}),this.loaddata(0)}},{key:"dismissModal",value:function(){this.modalCtrl.dismiss()}},{key:"loaddata",value:function(t,n){var i=this;this.sub=this.poSv.getpotf("view",this.ionicForm.value,t).subscribe(function(t){null!==t?(console.log(t.data_detail),i.data=t.data_detail.map(function(t){return Object.assign({},t)})):i.maxpadding=0})}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Kb(r.b),a.Kb(c.a),a.Kb(s.a),a.Kb(u.a),a.Kb(s.ab))},t.\u0275cmp=a.Eb({type:t,selectors:[["app-potf02"]],inputs:{recivedate:"recivedate"},decls:9,vars:2,consts:[["slot","start"],[3,"click"],["slot","icon-only","name","arrow-back-outline"],["slot","primary",4,"ngIf"],["slot","primary"],["slot","icon-only","src","./assets/icons/save.svg"]],template:function(t,n){1&t&&(a.Qb(0,"ion-header"),a.Qb(1,"ion-toolbar"),a.Qb(2,"ion-buttons",0),a.Qb(3,"ion-button",1),a.Yb("click",function(){return n.dismissModal()}),a.Lb(4,"ion-icon",2),a.Pb(),a.Pb(),a.Qb(5,"ion-title"),a.Bc(6),a.Pb(),a.zc(7,b,3,0,"ion-buttons",3),a.Pb(),a.Pb(),a.Lb(8,"ion-content")),2&t&&(a.zb(6),a.Dc("\u0e19\u0e31\u0e14\u0e23\u0e31\u0e1a\u0e02\u0e2d\u0e07\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48 ",n.recivedate,""),a.zb(1),a.hc("ngIf",n.dataallarray.length>0))},directives:[s.p,s.U,s.h,s.g,s.q,s.T,l.k,s.m],styles:[""]}),t}()},qULd:function(t,n,i){"use strict";i.d(n,"a",function(){return a}),i.d(n,"b",function(){return r}),i.d(n,"c",function(){return o}),i.d(n,"d",function(){return s}),i.d(n,"e",function(){return c});var e={getEngine:function(){var t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){return!!window.Capacitor},impact:function(t){var n=this.getEngine();if(n){var i=this.isCapacitor()?t.style.toUpperCase():t.style;n.impact({style:i})}},notification:function(t){var n=this.getEngine();if(n){var i=this.isCapacitor()?t.style.toUpperCase():t.style;n.notification({style:i})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},o=function(){e.selection()},a=function(){e.selectionStart()},r=function(){e.selectionChanged()},c=function(){e.selectionEnd()},s=function(t){e.impact(t)}},tTht:function(t,e,o){"use strict";o.d(e,"a",function(){return m});var a=o("mrSG"),r=o("HgE5"),c=o("fXoL"),s=o("3Pt+"),u=o("mPU2"),l=o("TEn/"),b=o("KQWd"),d=o("ofXK"),p=o("cZdB");function f(t,n){if(1&t){var i=c.Rb();c.Qb(0,"ion-buttons",8),c.Qb(1,"ion-button",1),c.Yb("click",function(){return c.tc(i),c.ac().cancelData()}),c.Lb(2,"ion-icon",9),c.Pb(),c.Pb()}}function h(t,n){if(1&t){var i=c.Rb();c.Qb(0,"ion-card"),c.Qb(1,"ion-item"),c.Qb(2,"ion-checkbox",10),c.Yb("click",function(){c.tc(i);var t=n.index,e=n.$implicit,o=c.ac();return o.selectData(t,o.data[t],e.checked)})("ngModelChange",function(t){return c.tc(i),n.$implicit.checked=t}),c.Pb(),c.Qb(3,"ion-row"),c.Qb(4,"ion-col"),c.Qb(5,"ion-label",11),c.Bc(6),c.Pb(),c.Pb(),c.Pb(),c.Qb(7,"ion-button",12),c.Yb("click",function(){c.tc(i);var t=n.$implicit;return c.ac().View(t.id,t.po_running)}),c.Bc(8),c.Pb(),c.Pb(),c.Qb(9,"ion-item"),c.Qb(10,"ion-grid",13),c.Qb(11,"ion-row"),c.Qb(12,"ion-col"),c.Qb(13,"ion-label"),c.Qb(14,"u",11),c.Bc(15,"\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e2a\u0e31\u0e48\u0e07\u0e0b\u0e37\u0e49\u0e2d:"),c.Pb(),c.Bc(16),c.Pb(),c.Pb(),c.Qb(17,"ion-col"),c.Qb(18,"ion-label"),c.Qb(19,"u",11),c.Bc(20,"\u0e0a\u0e37\u0e48\u0e2d\u0e27\u0e34\u0e19:"),c.Pb(),c.Bc(21),c.Pb(),c.Pb(),c.Qb(22,"ion-col"),c.Qb(23,"ion-label"),c.Qb(24,"u",11),c.Bc(25,"\u0e40\u0e02\u0e15:"),c.Pb(),c.Bc(26),c.Pb(),c.Pb(),c.Pb(),c.Qb(27,"ion-row"),c.Qb(28,"ion-col"),c.Qb(29,"ion-label"),c.Qb(30,"u",11),c.Bc(31,"\u0e0a\u0e37\u0e48\u0e2d\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(32),c.Pb(),c.Pb(),c.Qb(33,"ion-col"),c.Qb(34,"ion-label"),c.Qb(35,"u",11),c.Bc(36,"\u0e40\u0e1a\u0e2d\u0e23\u0e4c\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(37),c.Pb(),c.Pb(),c.Pb(),c.Qb(38,"ion-row"),c.Qb(39,"ion-col"),c.Qb(40,"ion-label"),c.Qb(41,"u",11),c.Bc(42,"\u0e08\u0e33\u0e19\u0e27\u0e19\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32:"),c.Pb(),c.Bc(43),c.Pb(),c.Pb(),c.Qb(44,"ion-col"),c.Qb(45,"ion-label"),c.Qb(46,"u",11),c.Bc(47,"\u0e23\u0e32\u0e04\u0e32\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14:"),c.Pb(),c.Bc(48),c.bc(49,"number"),c.Pb(),c.Pb(),c.Qb(50,"ion-col"),c.Qb(51,"ion-label"),c.Qb(52,"u",11),c.Bc(53,"\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e23\u0e31\u0e1a:"),c.Pb(),c.Bc(54),c.Pb(),c.Pb(),c.Pb(),c.Qb(55,"ion-row"),c.Qb(56,"ion-col",14),c.Qb(57,"u",11),c.Bc(58,"\u0e40\u0e25\u0e02\u0e40\u0e2a\u0e37\u0e49\u0e2d\u0e40\u0e1a\u0e2d\u0e23\u0e4c:"),c.Pb(),c.Bc(59),c.Pb(),c.Qb(60,"ion-col",14),c.Qb(61,"u",11),c.Bc(62,"\u0e14\u0e49\u0e32\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e2a\u0e35:"),c.Pb(),c.Bc(63),c.Pb(),c.Qb(64,"ion-col",14),c.Qb(65,"u",11),c.Bc(66,"\u0e14\u0e49\u0e32\u0e19\u0e2b\u0e25\u0e31\u0e07\u0e2a\u0e35:"),c.Pb(),c.Bc(67),c.Pb(),c.Pb(),c.Qb(68,"ion-row"),c.Qb(69,"ion-col"),c.Qb(70,"ion-label"),c.Qb(71,"u",11),c.Bc(72,"\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e1b\u0e31\u0e01\u0e40\u0e25\u0e02 :"),c.Pb(),c.Qb(73,"span",15),c.Bc(74),c.Pb(),c.Pb(),c.Pb(),c.Qb(75,"ion-col"),c.Qb(76,"ion-label"),c.Qb(77,"u",11),c.Bc(78,"\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e1b\u0e49\u0e32\u0e22\u0e40\u0e02\u0e35\u0e22\u0e27 :"),c.Pb(),c.Qb(79,"span",15),c.Bc(80),c.Pb(),c.Pb(),c.Pb(),c.Qb(81,"ion-col"),c.Qb(82,"ion-label"),c.Qb(83,"u",11),c.Bc(84,"\u0e2a\u0e16\u0e32\u0e19\u0e30\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a :"),c.Pb(),c.Qb(85,"span",15),c.Bc(86),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb()}if(2&t){var e=n.$implicit,o=n.index;c.zb(2),c.hc("ngModel",e.checked),c.zb(4),c.Cc(e.po_running),c.zb(2),c.Dc("\u0e14\u0e39\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14\u0e25\u0e33\u0e14\u0e31\u0e1a\u0e17\u0e35\u0e48 ",o+1,""),c.zb(8),c.Dc(" ",e.po_date,""),c.zb(5),c.Dc(" ",e.po_namewin,""),c.zb(5),c.Dc(" ",e.area_name,""),c.zb(6),c.Dc(" ",e.po_customer,""),c.zb(5),c.Dc(" ",e.po_customer_tel,""),c.zb(6),c.Dc(" ",e.qty,""),c.zb(5),c.Dc(" ",c.cc(49,20,e.po_total),""),c.zb(6),c.Dc(" ",e.po_recivedate,""),c.zb(5),c.Dc(" ",e.podetail_number,""),c.zb(4),c.Dc(" ",e.color_front,""),c.zb(4),c.Dc(" ",e.color_back,""),c.zb(6),c.hc("ngClass",0==e.assign_status?"postatus_alert":"postatus_ok"),c.zb(1),c.Dc(" ",e.assign_statustext,""),c.zb(5),c.hc("ngClass",0==e.assign_status1?"postatus_alert":"postatus_ok"),c.zb(1),c.Dc(" ",e.assign_status1text,""),c.zb(5),c.hc("ngClass",0==e.assign_status2?"postatus_alert":"postatus_ok"),c.zb(1),c.Dc(" ",e.assign_status2text,"")}}var m=function(){var t=function(){function t(n,e,o,a,r){i(this,t),this.formBuilder=n,this.configSv=e,this.alertCtrl=o,this.poSv=a,this.modalCtrl=r,this.isSubmitted=!1,this.data=[],this.page=0,this.limit=50,this.maxdatalimit=0,this.dataallarray=[]}return n(t,[{key:"ngOnInit",value:function(){this.ionicForm=this.formBuilder.group({id:[this.id],total:[this.total],dataall:[]}),this.loaddata(0)}},{key:"dismissModal",value:function(){this.modalCtrl.dismiss()}},{key:"loaddata",value:function(t,n){var i=this;this.sub=this.poSv.getpoassignreport("readcancel",this.ionicForm.value.id,t,this.limit).subscribe(function(t){null!==t&&(i.maxpadding=t.maxpadding,t.limit,i.data=i.data.concat(t.data_detail.map(function(t){return Object.assign({},t)})),n&&n.target.complete())})}},{key:"doInfinite",value:function(t){this.page++,this.loaddata(this.page*this.limit,t),this.page===this.maxpadding&&(t.target.disabled=!0)}},{key:"selectData",value:function(t,n,i){i?this.dataallarray=this.dataallarray.filter(function(t){return t.id!==n.id}):this.dataallarray.push(n)}},{key:"cancelData",value:function(){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.ionicForm.controls.dataall.setValue(this.dataallarray),console.log(this.ionicForm.value),t.next=4,this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e01\u0e32\u0e23\u0e21\u0e2d\u0e1a\u0e2b\u0e21\u0e32\u0e22\u0e17\u0e35\u0e48\u0e40\u0e25\u0e37\u0e2d\u0e01 "+this.dataallarray.length+" \u0e23\u0e32\u0e22\u0e01\u0e32\u0e23? ",inputs:[{name:"cause",placeholder:"\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"}],buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:function(t){console.log("cancel ",t)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:function(t){t.cause?n.sub=n.poSv.crudpoassign(n.ionicForm.value,"delete",t.cause).subscribe(function(t){if("ok"==t.status){var i=[];i.push({id:t.id}),n.modalCtrl.dismiss(i,"delete"),n.configSv.ChkformAlert(t.message)}else n.configSv.ChkformAlert(t.message)},function(t){console.log(JSON.stringify(t))}):n.configSv.ChkformAlert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e14\u0e49\u0e27\u0e22")}}]});case 4:t.sent.present();case 5:case"end":return t.stop()}},t,this)}))}},{key:"View",value:function(t,n){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function i(){var e,o,a,c,s;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return e=this.data.filter(function(n){return n.id==t}),i.next=3,this.modalCtrl.create({component:r.a,cssClass:"my-modal",componentProps:{id:t,po_running:n,mode:"view"}});case 3:return o=i.sent,i.next=6,o.present();case 6:return i.next=8,o.onWillDismiss();case 8:a=i.sent,c=a.data,"comfirm"===(s=a.role)?(e[0].po_date=c[0].po_date,e[0].po_recivedate=c[0].po_recivedate,e[0].po_namewin=c[0].po_namewin,e[0].po_customer=c[0].po_customer,e[0].qty=c[0].qty,e[0].po_total=c[0].po_total):"cancel"===s&&(e[0].po_statustext=c[0].po_statustext);case 12:case"end":return i.stop()}},i,this)}))}}]),t}();return t.\u0275fac=function(n){return new(n||t)(c.Kb(s.b),c.Kb(u.a),c.Kb(l.a),c.Kb(b.a),c.Kb(l.ab))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-poassign04"]],inputs:{id:"id",assign_date:"assign_date",seq:"seq",total:"total"},decls:15,vars:8,consts:[["slot","start"],[3,"click"],["slot","icon-only","name","arrow-back-outline"],["slot","primary",4,"ngIf"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],["slot","primary"],["slot","icon-only","name","trash"],["color","dark","slot","start",3,"ngModel","click","ngModelChange"],[1,"showlabelheader"],["fill","outline","slot","end","color","success",3,"click"],["fixed",""],["size","auto"],[3,"ngClass"]],template:function(t,n){1&t&&(c.Qb(0,"ion-header"),c.Qb(1,"ion-toolbar"),c.Qb(2,"ion-buttons",0),c.Qb(3,"ion-button",1),c.Yb("click",function(){return n.dismissModal()}),c.Lb(4,"ion-icon",2),c.Pb(),c.Pb(),c.Qb(5,"ion-title"),c.Bc(6),c.Pb(),c.zc(7,f,3,0,"ion-buttons",3),c.Pb(),c.Pb(),c.Qb(8,"ion-content"),c.Qb(9,"div"),c.Qb(10,"ion-searchbar",4),c.Yb("ngModelChange",function(t){return n.filterTerm=t}),c.Pb(),c.zc(11,h,87,22,"ion-card",5),c.bc(12,"filter"),c.Qb(13,"ion-infinite-scroll",6),c.Yb("ionInfinite",function(t){return n.doInfinite(t)}),c.Lb(14,"ion-infinite-scroll-content",7),c.Pb(),c.Pb(),c.Pb()),2&t&&(c.zb(6),c.Ec("\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01\u0e01\u0e32\u0e23\u0e21\u0e2d\u0e1a\u0e2b\u0e21\u0e32\u0e22\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48 ",n.assign_date," \u0e04\u0e23\u0e31\u0e49\u0e07\u0e17\u0e35\u0e48 ",n.seq,""),c.zb(1),c.hc("ngIf",n.dataallarray.length>0),c.zb(3),c.hc("ngModel",n.filterTerm),c.zb(1),c.hc("ngForOf",c.dc(12,5,n.data,n.filterTerm)))},directives:[l.p,l.U,l.h,l.g,l.q,l.T,d.k,l.m,l.M,l.ib,s.h,s.j,d.j,l.s,l.t,l.i,l.v,l.j,l.b,l.L,l.l,l.B,l.o,d.i],pipes:[p.a,d.d],styles:[""]}),t}()}}])}();