(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{TGzO:function(i,t,e){"use strict";e.r(t),e.d(t,"SyssubmenuPageModule",function(){return y});var o=e("ofXK"),n=e("3Pt+"),r=e("TEn/"),s=e("tyNb"),l=e("mrSG"),c=e("fXoL"),b=e("mPU2"),a=e("QmPH"),u=e("JmBq"),m=e("cZdB");function d(i,t){1&i&&(c.Qb(0,"span",24),c.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 TITLE "),c.Pb())}function h(i,t){1&i&&(c.Qb(0,"span",24),c.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 URL "),c.Pb())}function f(i,t){1&i&&(c.Qb(0,"span",24),c.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 SEQ "),c.Pb())}function p(i,t){1&i&&(c.Qb(0,"span",24),c.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07 "),c.Pb())}function g(i,t){if(1&i){const i=c.Rb();c.Qb(0,"ion-item-sliding",25),c.Yb("click",function(){c.tc(i);const e=t.$implicit;return c.ac().selectData(e.id)}),c.Qb(1,"ion-item"),c.Qb(2,"ion-label"),c.Qb(3,"ion-text",26),c.Qb(4,"h3"),c.Bc(5),c.Pb(),c.Pb(),c.Qb(6,"p"),c.Bc(7),c.Pb(),c.Qb(8,"p"),c.Bc(9),c.Pb(),c.Pb(),c.Qb(10,"ion-badge",27),c.Bc(11),c.Pb(),c.Pb(),c.Qb(12,"ion-item-options"),c.Qb(13,"ion-item-option",28),c.Yb("click",function(){c.tc(i);const e=t.$implicit;return c.ac().cancelData(e.id)}),c.Lb(14,"ion-icon",29),c.Bc(15," \u0e25\u0e1a "),c.Pb(),c.Pb(),c.Pb()}if(2&i){const i=t.$implicit;c.hc("ngClass",i.highlight?"newdata":""),c.zb(5),c.Cc(i.title),c.zb(2),c.Dc("\u0e25\u0e33\u0e14\u0e31\u0e1a ",i.seq,""),c.zb(2),c.Dc("\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e01\u0e31\u0e1a\u0e40\u0e21\u0e19\u0e39\u0e2b\u0e25\u0e31\u0e01 ",i.title_menu,""),c.zb(2),c.Cc(i.id)}}const P=[{path:"",component:(()=>{class i{constructor(i,t,e,o){this.formBuilder=i,this.configSv=t,this.sysmenuSv=e,this.alertCtrl=o,this.isSubmitted=!1,this.page=0,this.maxpadding=0,this.limit=50,this.data=[]}ngOnInit(){this.portControl=this.formBuilder.control("",n.l.required),this.ionicForm=this.formBuilder.group({id:[""],title:["",[n.l.required]],url:["",[n.l.required]],svg:[""],seq:["",[n.l.required,n.l.pattern("^[0-9]+$")]],open:[""],sys_menu_id:this.portControl,title_menu:[""],highlight:[""]}),this.loaddata_mainmenu(this.page),this.loaddata(this.page)}get errorControl(){return this.ionicForm.controls}submitForm(){if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;{let i;i=this.ionicForm.controls.id.value?"update":"insert",this.sub=this.sysmenuSv.crudsyssubmenu(this.ionicForm.value,i).subscribe(t=>{if("insert"===i)this.data.unshift({id:t.id,title:this.ionicForm.controls.title.value,url:this.ionicForm.controls.url.value,svg:this.ionicForm.controls.svg.value,seq:this.ionicForm.controls.seq.value,open:this.ionicForm.controls.open.value,sys_menu_id:this.ionicForm.controls.sys_menu_id.value.id,title_menu:this.ionicForm.controls.sys_menu_id.value.title,highlight:!0});else if("update"===i){let i;i=this.data.filter(i=>i.id==t.id),i.forEach(i=>{for(const[t,e]of Object.entries(i))i[t]=this.ionicForm.controls[t].value,"sys_menu_id"===t&&(i[t]=this.ionicForm.controls[t].value.id),"title_menu"===t&&(i[t]=this.ionicForm.controls.sys_menu_id.value.title)})}this.configSv.ChkformAlert(t.message)},i=>{console.log(JSON.stringify(i))},()=>{this.refreshForm()})}}refreshForm(){this.ionicForm.reset(),this.isSubmitted=!1}loaddata_mainmenu(i,t){this.sub=this.sysmenuSv.getsysmenu(i).subscribe(i=>{null!==i&&(this.ports=i.data_detail.map(i=>Object.assign({},i)))})}loaddata(i,t){let e;this.sub=this.sysmenuSv.getsyssubmenu(i,this.limit).subscribe(i=>{null!==i&&(this.maxpadding=i.maxpadding,e=i.limit,this.data=this.data.concat(i.data_detail.map(i=>Object.assign({},i))),t&&t.target.complete())})}ngOnDestroy(){this.sub.unsubscribe()}doInfinite(i){this.page++,this.loaddata(this.page*this.limit,i),this.page===this.maxpadding&&(i.target.disabled=!0)}selectData(i){let t;t=this.data.filter(t=>t.id==i),t.forEach(i=>{for(const[t,e]of Object.entries(i))if(this.ionicForm.controls[t].setValue(e),"sys_menu_id"===t){let i=this.ports.filter(function(i){return i.id===e})[0];this.portControl.setValue(i)}})}cancelData(i){return Object(l.a)(this,void 0,void 0,function*(){(yield this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e40\u0e25\u0e02\u0e23\u0e30\u0e1a\u0e1a\u0e17\u0e35\u0e48 "+i+" ? ",inputs:[{name:"cause",placeholder:"\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"}],buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:i=>{console.log("cancel ",i)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:t=>{t.cause?this.sub=this.sysmenuSv.crudsyssubmenu(i,"cancel",t.cause).subscribe(i=>{this.configSv.ChkformAlert(i.message)},i=>{console.log(JSON.stringify(i))},()=>{this.data=this.data.filter(t=>t.id!==i),this.refreshForm()}):this.configSv.ChkformAlert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e14\u0e49\u0e27\u0e22")}}]})).present()})}}return i.\u0275fac=function(t){return new(t||i)(c.Kb(n.b),c.Kb(b.a),c.Kb(a.a),c.Kb(r.a))},i.\u0275cmp=c.Eb({type:i,selectors:[["app-syssubmenu"]],decls:67,vars:13,consts:[["slot","start"],["slot","primary"],[3,"click"],["slot","icon-only","src","./assets/icons/refresh.svg"],["slot","icon-only","src","./assets/icons/save.svg"],["novalidate","",3,"formGroup"],["type","text","formControlName","id","disabled","",1,"IDnoshowBG"],["type","hidden","formControlName","highlight"],["lines","full"],["position","floating"],["formControlName","title","type","text"],["class","error",4,"ngIf"],["formControlName","url","type","text"],["formControlName","svg","type","text"],["formControlName","seq","type","number"],["formControlName","open","interface","popover","value",""],["value",""],["value","true"],["interface","popover","item-content","","formControlName","sys_menu_id","itemValueField","id","itemTextField","title","clearButtonText","\u0e25\u0e49\u0e32\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25","closeButtonText","\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",3,"items","canSearch","canClear"],["scrollY","true","id","myFixZone"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[1,"error"],[3,"ngClass","click"],["color","primary"],["slot","end","color","success"],["color","danger",3,"click"],["slot","end","name","trash"]],template:function(i,t){1&i&&(c.Qb(0,"ion-header"),c.Qb(1,"ion-toolbar"),c.Qb(2,"ion-title"),c.Bc(3,"\u0e40\u0e21\u0e19\u0e39\u0e22\u0e48\u0e2d\u0e22"),c.Pb(),c.Qb(4,"ion-buttons",0),c.Lb(5,"ion-menu-button"),c.Pb(),c.Qb(6,"ion-buttons",1),c.Qb(7,"ion-button",2),c.Yb("click",function(){return t.refreshForm()}),c.Lb(8,"ion-icon",3),c.Pb(),c.Pb(),c.Qb(9,"ion-buttons",1),c.Qb(10,"ion-button",2),c.Yb("click",function(){return t.submitForm()}),c.Lb(11,"ion-icon",4),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(12,"form",5),c.Qb(13,"ion-grid"),c.Qb(14,"ion-row"),c.Qb(15,"ion-col"),c.Bc(16," \u0e40\u0e25\u0e02\u0e17\u0e35\u0e48\u0e23\u0e30\u0e1a\u0e1a "),c.Lb(17,"input",6),c.Lb(18,"input",7),c.Pb(),c.Pb(),c.Qb(19,"ion-row"),c.Qb(20,"ion-col"),c.Qb(21,"ion-item",8),c.Qb(22,"ion-label",9),c.Bc(23,"TITLE"),c.Pb(),c.Lb(24,"ion-input",10),c.zc(25,d,2,0,"span",11),c.Pb(),c.Pb(),c.Qb(26,"ion-col"),c.Qb(27,"ion-item",8),c.Qb(28,"ion-label",9),c.Bc(29,"URL"),c.Pb(),c.Lb(30,"ion-input",12),c.zc(31,h,2,0,"span",11),c.Pb(),c.Pb(),c.Qb(32,"ion-col"),c.Qb(33,"ion-item",8),c.Qb(34,"ion-label",9),c.Bc(35,"SVG"),c.Pb(),c.Lb(36,"ion-input",13),c.Pb(),c.Pb(),c.Qb(37,"ion-col"),c.Qb(38,"ion-item",8),c.Qb(39,"ion-label",9),c.Bc(40,"SEQ"),c.Pb(),c.Lb(41,"ion-input",14),c.zc(42,f,2,0,"span",11),c.Pb(),c.Pb(),c.Qb(43,"ion-col"),c.Qb(44,"ion-item",8),c.Qb(45,"ion-label",9),c.Bc(46,"\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e21\u0e19\u0e39\u0e22\u0e48\u0e2d\u0e22\u0e43\u0e0a\u0e48\u0e44\u0e2b\u0e21??"),c.Pb(),c.Qb(47,"ion-select",15),c.Qb(48,"ion-select-option",16),c.Bc(49,"\u0e44\u0e21\u0e48\u0e40\u0e1b\u0e47\u0e19"),c.Pb(),c.Qb(50,"ion-select-option",17),c.Bc(51,"\u0e40\u0e1b\u0e47\u0e19"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(52,"ion-row"),c.Qb(53,"ion-col"),c.Qb(54,"ion-item"),c.Qb(55,"ion-label"),c.Bc(56,"\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07\u0e40\u0e21\u0e19\u0e39\u0e2b\u0e25\u0e31\u0e01"),c.Pb(),c.Lb(57,"ionic-selectable",18),c.Pb(),c.zc(58,p,2,0,"span",11),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Qb(59,"ion-content"),c.Qb(60,"div",19),c.Qb(61,"ion-searchbar",20),c.Yb("ngModelChange",function(i){return t.filterTerm=i}),c.Pb(),c.Qb(62,"ion-list"),c.zc(63,g,16,5,"ion-item-sliding",21),c.bc(64,"filter"),c.Pb(),c.Qb(65,"ion-infinite-scroll",22),c.Yb("ionInfinite",function(i){return t.doInfinite(i)}),c.Lb(66,"ion-infinite-scroll-content",23),c.Pb(),c.Pb(),c.Pb()),2&i&&(c.zb(12),c.hc("formGroup",t.ionicForm),c.zb(13),c.hc("ngIf",t.isSubmitted&&(null==t.errorControl.title.errors?null:t.errorControl.title.errors.required)),c.zb(6),c.hc("ngIf",t.isSubmitted&&(null==t.errorControl.url.errors?null:t.errorControl.url.errors.required)),c.zb(11),c.hc("ngIf",t.isSubmitted&&(null==t.errorControl.seq.errors?null:t.errorControl.seq.errors.required)),c.zb(15),c.hc("items",t.ports)("canSearch",!0)("canClear",!0),c.zb(1),c.hc("ngIf",t.isSubmitted&&(null==t.errorControl.sys_menu_id.errors?null:t.errorControl.sys_menu_id.errors.required)),c.zb(3),c.hc("ngModel",t.filterTerm),c.zb(2),c.hc("ngForOf",c.dc(64,10,t.data,t.filterTerm)))},directives:[r.p,r.U,r.T,r.h,r.F,r.g,r.q,n.m,n.i,n.d,r.o,r.L,r.l,n.a,n.h,n.c,r.v,r.B,r.u,r.ib,o.k,r.db,r.N,r.hb,r.O,u.a,r.m,r.M,n.j,r.C,o.j,r.s,r.t,r.A,o.i,r.R,r.f,r.z,r.y],pipes:[m.a],styles:[""]}),i})()}];let Q=(()=>{class i{}return i.\u0275mod=c.Ib({type:i}),i.\u0275inj=c.Hb({factory:function(t){return new(t||i)},imports:[[s.j.forChild(P)],s.j]}),i})();var v=e("CH/f");let y=(()=>{class i{}return i.\u0275mod=c.Ib({type:i}),i.\u0275inj=c.Hb({factory:function(t){return new(t||i)},imports:[[o.b,n.e,r.W,Q,n.k,m.b,v.a]]}),i})()}}]);