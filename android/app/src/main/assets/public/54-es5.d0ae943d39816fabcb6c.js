!function(){function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{qsnK:function(n,e,o){"use strict";o.r(e),o.d(e,"Sysgroupmenu01PageModule",function(){return C});var r=o("ofXK"),s=o("3Pt+"),a=o("TEn/"),u=o("tyNb"),c=o("mrSG"),l=o("fXoL"),b=o("mPU2"),d=o("QmPH"),m=o("JmBq"),h=o("cZdB");function f(t,i){1&t&&(l.Qb(0,"span",15),l.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07 "),l.Pb())}function g(t,i){if(1&t){var n=l.Rb();l.Qb(0,"ion-item-sliding",16),l.Qb(1,"ion-item"),l.Qb(2,"ion-label"),l.Qb(3,"ion-text",17),l.Qb(4,"h3"),l.Bc(5),l.Pb(),l.Pb(),l.Pb(),l.Qb(6,"ion-badge",18),l.Bc(7),l.Pb(),l.Pb(),l.Qb(8,"ion-item-options"),l.Qb(9,"ion-item-option",19),l.Yb("click",function(){l.tc(n);var t=i.$implicit;return l.ac().deleteData(t.id)}),l.Lb(10,"ion-icon",20),l.Bc(11," \u0e25\u0e1a "),l.Pb(),l.Pb(),l.Pb()}if(2&t){var e=i.$implicit;l.hc("ngClass",e.highlight?"newdata":""),l.zb(5),l.Cc(e.title_show),l.zb(2),l.Cc(e.id)}}var p,v,y,P=[{path:"",component:(p=function(){function n(i,e,o,r,s,a){var u=this;t(this,n),this.navCtrl=i,this.activatedRoute=e,this.formBuilder=o,this.configSv=r,this.sysmenuSv=s,this.alertCtrl=a,this.isSubmitted=!1,this.page=0,this.maxpadding=0,this.limit=50,this.data=[],this.activatedRoute.queryParams.subscribe(function(t){var i=JSON.parse(t.value);console.log(i),u.group_id=i[0].id,u.group_name=i[0].group_name})}var e,o,r;return e=n,(o=[{key:"ngOnInit",value:function(){this.portControl=this.formBuilder.control("",s.l.required),this.ionicForm=this.formBuilder.group({syssubmenu_id:this.portControl,title_menu:[""],highlight:[""],group_id:[this.group_id]}),this.loaddata_submenu(this.page),this.loaddata(this.page)}},{key:"loaddata_submenu",value:function(t,i){var n=this;this.sub=this.sysmenuSv.getsyssubmenu_sysgroupmenu(t,this.group_id,"readsubmenu").subscribe(function(t){null!==t&&(n.ports=t.data_detail.map(function(t){return Object.assign({},t)}))})}},{key:"loaddata",value:function(t,i){var n=this;this.sub=this.sysmenuSv.getsyssubmenu_sysgroupmenu(t,this.group_id,"read").subscribe(function(t){null!==t&&(n.maxpadding=t.maxpadding,t.limit,n.data=t.data_detail.map(function(t){return Object.assign({},t)}),i&&i.target.complete())})}},{key:"submitForm",value:function(){var t=this;if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;var i="insert";this.sub=this.sysmenuSv.crudsyssubmenu_sysgroupmenu(this.ionicForm.value,i).subscribe(function(i){t.ionicForm.controls.syssubmenu_id.value.forEach(function(n,e){t.data.unshift({id:i.id[e],title_show:n.title_show,highlight:!0}),t.ports=t.ports.filter(function(t){return t.id!==n.id})}),t.configSv.ChkformAlert(i.message)},function(t){console.log(JSON.stringify(t))},function(){t.refreshForm()})}},{key:"doInfinite",value:function(t){this.page++,this.loaddata(this.page*this.limit,t),this.page===this.maxpadding&&(t.target.disabled=!0)}},{key:"refreshForm",value:function(){this.ionicForm.reset(),this.isSubmitted=!1}},{key:"deleteData",value:function(t){return Object(c.a)(this,void 0,void 0,regeneratorRuntime.mark(function i(){var n=this;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e40\u0e25\u0e02\u0e23\u0e30\u0e1a\u0e1a\u0e17\u0e35\u0e48 "+t+" ? ",buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:function(t){console.log("cancel ",t)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:function(i){n.sub=n.sysmenuSv.crudsyssubmenu_sysgroupmenu(t,"delete").subscribe(function(t){n.configSv.ChkformAlert(t.message)},function(t){console.log(JSON.stringify(t))},function(){n.data=n.data.filter(function(i){return i.id!==t}),n.refreshForm()})}}]});case 2:i.sent.present();case 3:case"end":return i.stop()}},i,this)}))}},{key:"errorControl",get:function(){return this.ionicForm.controls}}])&&i(e.prototype,o),r&&i(e,r),n}(),p.\u0275fac=function(t){return new(t||p)(l.Kb(a.bb),l.Kb(u.a),l.Kb(s.b),l.Kb(b.a),l.Kb(d.a),l.Kb(a.a))},p.\u0275cmp=l.Eb({type:p,selectors:[["app-sysgroupmenu01"]],decls:31,vars:12,consts:[["slot","start"],["slot","primary"],[3,"click"],["slot","icon-only","src","./assets/icons/refresh.svg"],["slot","icon-only","src","./assets/icons/save.svg"],["novalidate","",3,"formGroup"],["type","hidden","formControlName","highlight"],["type","hidden","formControlName","group_id"],["interface","popover","item-content","","formControlName","syssubmenu_id","itemValueField","id","itemTextField","title_show","clearButtonText","\u0e25\u0e49\u0e32\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25","closeButtonText","\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",3,"items","isMultiple","canSearch","canClear"],["class","error",4,"ngIf"],["scrollY","true","id","myFixZone"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[1,"error"],[3,"ngClass"],["color","primary"],["slot","end","color","success"],["color","danger",3,"click"],["slot","end","name","trash"]],template:function(t,i){1&t&&(l.Qb(0,"ion-header"),l.Qb(1,"ion-toolbar"),l.Qb(2,"ion-buttons",0),l.Lb(3,"ion-back-button"),l.Pb(),l.Qb(4,"ion-title"),l.Bc(5),l.Pb(),l.Qb(6,"ion-buttons",1),l.Qb(7,"ion-button",2),l.Yb("click",function(){return i.refreshForm()}),l.Lb(8,"ion-icon",3),l.Pb(),l.Pb(),l.Qb(9,"ion-buttons",1),l.Qb(10,"ion-button",2),l.Yb("click",function(){return i.submitForm()}),l.Lb(11,"ion-icon",4),l.Pb(),l.Pb(),l.Pb(),l.Pb(),l.Qb(12,"form",5),l.Lb(13,"input",6),l.Lb(14,"input",7),l.Qb(15,"ion-grid"),l.Qb(16,"ion-row"),l.Qb(17,"ion-col"),l.Qb(18,"ion-item"),l.Qb(19,"ion-label"),l.Bc(20,"\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07\u0e40\u0e21\u0e19\u0e39\u0e22\u0e48\u0e2d\u0e22"),l.Pb(),l.Lb(21,"ionic-selectable",8),l.Pb(),l.zc(22,f,2,0,"span",9),l.Pb(),l.Pb(),l.Pb(),l.Pb(),l.Qb(23,"ion-content"),l.Qb(24,"div",10),l.Qb(25,"ion-searchbar",11),l.Yb("ngModelChange",function(t){return i.filterTerm=t}),l.Pb(),l.Qb(26,"ion-list"),l.zc(27,g,12,3,"ion-item-sliding",12),l.bc(28,"filter"),l.Pb(),l.Qb(29,"ion-infinite-scroll",13),l.Yb("ionInfinite",function(t){return i.doInfinite(t)}),l.Lb(30,"ion-infinite-scroll-content",14),l.Pb(),l.Pb(),l.Pb()),2&t&&(l.zb(5),l.Dc("\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e40\u0e21\u0e19\u0e39\u0e01\u0e31\u0e1a\u0e01\u0e25\u0e38\u0e48\u0e21\u0e1c\u0e39\u0e49\u0e43\u0e0a\u0e49 ",i.group_name,""),l.zb(7),l.hc("formGroup",i.ionicForm),l.zb(9),l.hc("items",i.ports)("isMultiple",!0)("canSearch",!0)("canClear",!0),l.zb(1),l.hc("ngIf",i.isSubmitted&&(null==i.errorControl.syssubmenu_id.errors?null:i.errorControl.syssubmenu_id.errors.required)),l.zb(3),l.hc("ngModel",i.filterTerm),l.zb(2),l.hc("ngForOf",l.dc(28,9,i.data,i.filterTerm)))},directives:[a.p,a.U,a.h,a.d,a.e,a.T,a.g,a.q,s.m,s.i,s.d,s.a,s.h,s.c,a.o,a.L,a.l,a.v,a.B,m.a,r.k,a.m,a.M,a.ib,s.j,a.C,r.j,a.s,a.t,a.A,r.i,a.R,a.f,a.z,a.y],pipes:[h.a],styles:[""]}),p)}],Q=((v=function i(){t(this,i)}).\u0275mod=l.Ib({type:v}),v.\u0275inj=l.Hb({factory:function(t){return new(t||v)},imports:[[u.j.forChild(P)],u.j]}),v),_=o("CH/f"),C=((y=function i(){t(this,i)}).\u0275mod=l.Ib({type:y}),y.\u0275inj=l.Hb({factory:function(t){return new(t||y)},imports:[[r.b,s.e,a.W,_.a,Q,s.k,h.b]]}),y)}}])}();