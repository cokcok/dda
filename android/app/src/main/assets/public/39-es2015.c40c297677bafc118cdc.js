(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{aoXZ:function(i,t,o){"use strict";o.r(t),o.d(t,"MtdproductPageModule",function(){return F});var e=o("ofXK"),r=o("3Pt+"),n=o("TEn/"),c=o("tyNb"),s=o("mrSG"),a=o("fXoL"),l=o("84vV"),b=o("mPU2"),d=o("44PX"),u=o("JmBq"),p=o("cZdB");const m=["fileIngimg"];function h(i,t){1&i&&(a.Qb(0,"span",28),a.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 "),a.Pb())}function f(i,t){1&i&&(a.Qb(0,"span",28),a.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 "),a.Pb())}function g(i,t){if(1&i){const i=a.Rb();a.Qb(0,"div",29),a.Lb(1,"ion-img",30),a.Qb(2,"ion-button",2),a.Yb("click",function(){a.tc(i);const o=t.$implicit;return a.ac().delImg(o.id)}),a.Lb(3,"ion-icon",31),a.Pb(),a.Pb()}if(2&i){const i=t.$implicit;a.zb(1),a.hc("src",i.url)}}function v(i,t){if(1&i){const i=a.Rb();a.Qb(0,"ion-item-option",37),a.Yb("click",function(){a.tc(i);const t=a.ac().$implicit;return a.ac().cancelData(t.id)}),a.Lb(1,"ion-icon",38),a.Bc(2," \u0e25\u0e1a "),a.Pb()}}function _(i,t){if(1&i){const i=a.Rb();a.Qb(0,"ion-item-sliding",32),a.Yb("click",function(){a.tc(i);const o=t.$implicit;return a.ac().selectData(o.id)}),a.Qb(1,"ion-item"),a.Qb(2,"ion-label"),a.Qb(3,"ion-text",33),a.Qb(4,"h3"),a.Bc(5),a.Pb(),a.Qb(6,"h3"),a.Bc(7),a.Pb(),a.Pb(),a.Pb(),a.Qb(8,"ion-badge",34),a.Bc(9),a.Pb(),a.Pb(),a.Qb(10,"ion-item-options"),a.Qb(11,"ion-item-option",2),a.Yb("click",function(){a.tc(i);const o=t.$implicit;return a.ac().addData(o.id)}),a.Lb(12,"ion-icon",35),a.Bc(13," \u0e40\u0e1e\u0e34\u0e48\u0e21\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 "),a.Pb(),a.zc(14,v,3,0,"ion-item-option",36),a.Pb(),a.Pb()}if(2&i){const i=t.$implicit,o=t.index;a.hc("ngClass",i.highlight?"newdata":""),a.zb(5),a.Fc("\u0e25\u0e33\u0e14\u0e31\u0e1a\u0e17\u0e35\u0e48 ",o+1," \u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 : ",i.product_name," \u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32: ",i.product_type_name,""),a.zb(2),a.Fc("\u0e41\u0e1a\u0e1a : ",i.product_pattern," \u0e23\u0e48\u0e38\u0e19 : ",i.product_model," \u0e2a\u0e35 : ",i.product_color,""),a.zb(2),a.Cc(i.id),a.zb(5),a.hc("ngIf",0==i.number_qty)}}const P=[{path:"",component:(()=>{class i{constructor(i,t,o,e,r){this.mtdSv=i,this.formBuilder=t,this.configSv=o,this.alertCtrl=e,this.navCtrl=r,this.isSubmitted=!1,this.data=[],this.page=0,this.maxpadding=0,this.limit=50,this.picpreview=[],this.indexpic=0}ngOnInit(){this.portControl=this.formBuilder.control("",r.l.required),this.picresizbase64Array=this.formBuilder.array([]),this.ionicForm=this.formBuilder.group({id:[""],product_name:["",[r.l.required]],product_desc:[""],product_pattern:[""],product_model:[""],product_color:[""],product_type_id:this.portControl,product_type_name:[""],number_qty:[""],picresizbase64List:this.picresizbase64Array,highlight:[""]}),this.loaddata_producttype(this.page),this.loaddata(this.page)}get errorControl(){return this.ionicForm.controls}loaddata_producttype(i,t){this.sub=this.mtdSv.getmtd(2,i).subscribe(i=>{null!==i&&(this.ports=i.data_detail.map(i=>Object.assign({},i)))})}submitForm(){if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;{let i;i=this.ionicForm.controls.id.value?"update":"insert",this.sub=this.mtdSv.crudmtdproduct(this.ionicForm.value,i).subscribe(t=>{if(null!==t){if("insert"===i)"ok"===t.status?this.data.unshift({id:t.id,product_name:this.ionicForm.controls.product_name.value,product_desc:this.ionicForm.controls.product_desc.value,product_pattern:this.ionicForm.controls.product_pattern.value,product_model:this.ionicForm.controls.product_model.value,product_color:this.ionicForm.controls.product_color.value,product_type_id:this.ionicForm.controls.product_type_id.value.id,product_type_name:this.ionicForm.controls.product_type_id.value.product_type,picresizbase64List:this.ionicForm.controls.picresizbase64List.value,number_qty:0,highlight:!0}):this.configSv.ChkformAlert(t.message);else if("update"===i)if("ok"===t.status){let i;i=this.data.filter(i=>i.id==t.id),i.forEach(i=>{for(const[t,o]of Object.entries(i))i[t]="product_type_id"===t?this.ionicForm.controls[t].value.id:"product_type_name"===t?this.ionicForm.controls.product_type_id.value.product_type:"picresizbase64List"===t?this.ionicForm.controls.picresizbase64List.value:this.ionicForm.controls[t].value})}else this.configSv.ChkformAlert(t.message);"ok"===t.status&&(this.configSv.ChkformAlert(t.message),this.refreshForm())}},i=>{console.log(JSON.stringify(i))})}}ngOnDestroy(){this.sub.unsubscribe()}refreshForm(){this.ionicForm.reset(),this.isSubmitted=!1,this.picresizbase64Array.clear(),this.picpreview=[],this.indexpic=0}loaddata(i,t){let o;this.sub=this.mtdSv.getmtd(7,i,this.limit).subscribe(i=>{null!==i&&(this.maxpadding=i.maxpadding,o=i.limit,this.data=this.data.concat(i.data_detail.map(i=>Object.assign({},i))),t&&t.target.complete())})}selectData(i){let t;this.picpreview=[],this.picresizbase64Array.clear(),t=this.data.filter(t=>t.id==i),t.forEach(i=>{for(const[t,o]of Object.entries(i))if("product_type_id"===t){let i=this.ports.filter(function(i){return i.id===o})[0];this.portControl.setValue(i)}else"picresizbase64List"===t?(this.picpreview=Object(o).map(i=>Object.assign({},i)),this.picpreview.forEach(i=>{this.indexpic++,this.picresizbase64Array.push(this.formBuilder.group({id:[i.id],url:[i.url]}))})):this.ionicForm.controls[t].setValue(o)})}cancelData(i){return Object(s.a)(this,void 0,void 0,function*(){(yield this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e40\u0e25\u0e02\u0e23\u0e30\u0e1a\u0e1a\u0e17\u0e35\u0e48 "+i+" ? ",inputs:[{name:"cause",placeholder:"\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"}],buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:i=>{console.log("cancel ",i)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:t=>{t.cause?this.sub=this.mtdSv.crudmtdproduct(i,"cancel",t.cause).subscribe(t=>{"ok"==t.status?(this.configSv.ChkformAlert(t.message),this.data=this.data.filter(t=>t.id!==i)):this.configSv.ChkformAlert(t.message)},i=>{console.log(JSON.stringify(i))},()=>{this.refreshForm()}):this.configSv.ChkformAlert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e14\u0e49\u0e27\u0e22")}}]})).present()})}doInfinite(i){this.page++,this.loaddata(this.page*this.limit,i),this.page===this.maxpadding&&(i.target.disabled=!0)}addData(i){this.navCtrl.navigateForward(["/mtdproductdetail"],{queryParams:{value:JSON.stringify(this.data.filter(function(t){return t.id==i}))}})}onClick_fileUpload(){this.fileIngimg.nativeElement.click()}fileUpload_img(i){var t=i.srcElement.files[0];if(void 0!==t)if(t.type.match(/image.*/)){var o=new FileReader,e=this;o.onloadend=function(){var i=document.createElement("canvas"),t=i.getContext("2d");i.width=200,i.height=200;var r=new Image;r.src=o.result,r.onload=function(o){t.drawImage(r,0,0,r.width,r.height,0,0,i.width,i.height);var n=new Image;n.src=i.toDataURL(),e.picresizbase64=n.src,e.picpreview.push({id:e.indexpic,url:n.src}),e.picresizbase64Array.push(e.formBuilder.group({id:[e.indexpic],url:[e.picresizbase64]})),e.indexpic++}},o.readAsDataURL(t)}else alert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e0a\u0e19\u0e34\u0e14\u0e44\u0e1f\u0e25\u0e4c\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e")}delImg(i){this.picpreview=this.picpreview.filter(t=>t.id!==i),this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(t=>t.id===i))}}return i.\u0275fac=function(t){return new(t||i)(a.Kb(l.a),a.Kb(r.b),a.Kb(b.a),a.Kb(n.a),a.Kb(n.bb))},i.\u0275cmp=a.Eb({type:i,selectors:[["app-mtdproduct"]],viewQuery:function(i,t){var o;1&i&&a.Hc(m,!0),2&i&&a.pc(o=a.Zb())&&(t.fileIngimg=o.first)},decls:76,vars:11,consts:[["slot","start"],["slot","primary"],[3,"click"],["slot","icon-only","src","./assets/icons/refresh.svg"],["slot","icon-only","src","./assets/icons/save.svg"],["heading","\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21","id","tab1"],["novalidate","",3,"formGroup"],["fixed",""],["type","text","formControlName","id","disabled","",1,"IDnoshowBG"],["position","floating",1,"showlabel"],["formControlName","product_name","type","text"],["class","error",4,"ngIf"],["formControlName","product_desc","type","text"],["interface","floating","item-content","","formControlName","product_type_id","itemValueField","id","itemTextField","product_type","closeButtonText","\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",3,"items","canSearch"],["formControlName","product_pattern","type","text"],["formControlName","product_model","type","text"],["formControlName","product_color","type","text"],["type","file","id","file-input",2,"position","absolute","top","-999999px",3,"change"],["fileIngimg",""],["ion-button","",3,"click"],["style","display: inline-block;",4,"ngFor","ngForOf"],["heading","\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14","id","tab2"],["scrollY","true","id","myFixZone"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[1,"content_alert"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[1,"error"],[2,"display","inline-block"],[2,"width","100px","height","100px",3,"src"],["slot","icon-only","size","small","name","trash"],[3,"ngClass","click"],["color","primary"],["slot","end","color","success"],["slot","end","name","add"],["color","danger",3,"click",4,"ngIf"],["color","danger",3,"click"],["slot","end","name","trash"]],template:function(i,t){1&i&&(a.Qb(0,"ion-header"),a.Qb(1,"ion-toolbar"),a.Qb(2,"ion-buttons",0),a.Lb(3,"ion-menu-button"),a.Pb(),a.Qb(4,"ion-title"),a.Bc(5,"\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25 \u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32"),a.Pb(),a.Qb(6,"ion-buttons",1),a.Qb(7,"ion-button",2),a.Yb("click",function(){return t.refreshForm()}),a.Lb(8,"ion-icon",3),a.Pb(),a.Pb(),a.Qb(9,"ion-buttons",1),a.Qb(10,"ion-button",2),a.Yb("click",function(){return t.submitForm()}),a.Lb(11,"ion-icon",4),a.Pb(),a.Pb(),a.Pb(),a.Pb(),a.Qb(12,"ion-content"),a.Qb(13,"tabset"),a.Qb(14,"tab",5),a.Qb(15,"form",6),a.Qb(16,"ion-grid",7),a.Qb(17,"ion-row"),a.Qb(18,"ion-col"),a.Bc(19," \u0e40\u0e25\u0e02\u0e17\u0e35\u0e48\u0e23\u0e30\u0e1a\u0e1a "),a.Lb(20,"input",8),a.Pb(),a.Pb(),a.Qb(21,"ion-row"),a.Qb(22,"ion-col"),a.Qb(23,"ion-item"),a.Qb(24,"ion-label",9),a.Bc(25,"\u0e0a\u0e37\u0e48\u0e2d\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32"),a.Pb(),a.Lb(26,"ion-input",10),a.zc(27,h,2,0,"span",11),a.Pb(),a.Pb(),a.Qb(28,"ion-col"),a.Qb(29,"ion-item"),a.Qb(30,"ion-label",9),a.Bc(31,"\u0e23\u0e32\u0e22\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32"),a.Pb(),a.Lb(32,"ion-input",12),a.Pb(),a.Pb(),a.Qb(33,"ion-col"),a.Qb(34,"ion-item"),a.Qb(35,"ion-label",9),a.Bc(36,"\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32"),a.Pb(),a.Lb(37,"ionic-selectable",13),a.zc(38,f,2,0,"span",11),a.Pb(),a.Pb(),a.Pb(),a.Qb(39,"ion-row"),a.Qb(40,"ion-col"),a.Qb(41,"ion-item"),a.Qb(42,"ion-label",9),a.Bc(43,"\u0e41\u0e1a\u0e1a"),a.Pb(),a.Lb(44,"ion-input",14),a.Pb(),a.Pb(),a.Qb(45,"ion-col"),a.Qb(46,"ion-item"),a.Qb(47,"ion-label",9),a.Bc(48,"\u0e23\u0e38\u0e48\u0e19"),a.Pb(),a.Lb(49,"ion-input",15),a.Pb(),a.Pb(),a.Qb(50,"ion-col"),a.Qb(51,"ion-item"),a.Qb(52,"ion-label",9),a.Bc(53,"\u0e2a\u0e35"),a.Pb(),a.Lb(54,"ion-input",16),a.Pb(),a.Pb(),a.Pb(),a.Qb(55,"ion-row"),a.Qb(56,"ion-col"),a.Qb(57,"p"),a.Bc(58,"\u0e41\u0e19\u0e1a\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 "),a.Qb(59,"input",17,18),a.Yb("change",function(i){return t.fileUpload_img(i)}),a.Pb(),a.Qb(61,"button",19),a.Yb("click",function(){return t.onClick_fileUpload()}),a.Bc(62,"Upload"),a.Pb(),a.Pb(),a.Qb(63,"div"),a.zc(64,g,4,1,"div",20),a.Pb(),a.Lb(65,"p"),a.Pb(),a.Pb(),a.Pb(),a.Pb(),a.Pb(),a.Qb(66,"tab",21),a.Qb(67,"div",22),a.Qb(68,"ion-searchbar",23),a.Yb("ngModelChange",function(i){return t.filterTerm=i}),a.Pb(),a.Qb(69,"ion-list"),a.Qb(70,"div",24),a.Bc(71,"**\u0e08\u0e30\u0e25\u0e1a\u0e44\u0e14\u0e49\u0e01\u0e47\u0e15\u0e48\u0e2d\u0e40\u0e21\u0e37\u0e48\u0e2d \u0e22\u0e2d\u0e14\u0e04\u0e07\u0e40\u0e2b\u0e25\u0e37\u0e2d\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e40\u0e17\u0e48\u0e32\u0e01\u0e31\u0e1a 0"),a.Pb(),a.zc(72,_,15,9,"ion-item-sliding",25),a.bc(73,"filter"),a.Pb(),a.Qb(74,"ion-infinite-scroll",26),a.Yb("ionInfinite",function(i){return t.doInfinite(i)}),a.Lb(75,"ion-infinite-scroll-content",27),a.Pb(),a.Pb(),a.Pb(),a.Pb(),a.Pb()),2&i&&(a.zb(15),a.hc("formGroup",t.ionicForm),a.zb(12),a.hc("ngIf",t.isSubmitted&&(null==t.errorControl.product_name.errors?null:t.errorControl.product_name.errors.required)),a.zb(10),a.hc("items",t.ports)("canSearch",!0),a.zb(1),a.hc("ngIf",t.isSubmitted&&(null==t.errorControl.product_type_id.errors?null:t.errorControl.product_type_id.errors.required)),a.zb(26),a.hc("ngForOf",t.picpreview),a.zb(4),a.hc("ngModel",t.filterTerm),a.zb(4),a.hc("ngForOf",a.dc(73,8,t.data,t.filterTerm)))},directives:[n.p,n.U,n.h,n.F,n.T,n.g,n.q,n.m,d.c,d.a,r.m,r.i,r.d,n.o,n.L,n.l,r.a,r.h,r.c,n.v,n.B,n.u,n.ib,e.k,u.a,e.j,n.M,r.j,n.C,n.s,n.t,n.r,n.A,e.i,n.R,n.f,n.z,n.y],pipes:[p.a],styles:[""]}),i})()}];let y=(()=>{class i{}return i.\u0275mod=a.Ib({type:i}),i.\u0275inj=a.Hb({factory:function(t){return new(t||i)},imports:[[c.j.forChild(P)],c.j]}),i})();var Q=o("CH/f");let F=(()=>{class i{}return i.\u0275mod=a.Ib({type:i}),i.\u0275inj=a.Hb({factory:function(t){return new(t||i)},imports:[[e.b,r.e,n.W,y,r.k,p.b,Q.a,d.b]]}),i})()}}]);