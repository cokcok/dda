(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"84vV":function(e,t,i){"use strict";i.d(t,"a",function(){return s});var n=i("fXoL"),r=i("tk/3"),o=i("mPU2");let s=(()=>{class e{constructor(e,t){this.http=e,this.configSv=t,this.getpage=["mtd01.php","mtd_area.php","mtd_producttype.php","mtd_size.php","mtd_shipping.php","mtd_number.php","mtd_numberdetail.php","mtd_product.php","mtd_productdetail.php","mtd_member.php","mtd_green.php"]}getplace(){return this.http.get("./assets/data/place.json")}getmtd(e,t,i=9999999999,n){return this.http.post(this.configSv.ip+this.getpage[e],{padding:t,limit:i,condition:n,type_sql:"read"},{headers:{"Content-Type":"application/json"}})}crudmtd01(e,t,i){let n;return n="cancel"===t||"resetpwd"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,prefix_name:e.prefix_name,name:e.name,surname:e.surname,nickname:e.nickname,group_id:e.group_id.id,userpass:e.username,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd01.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdarea(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,area_name:e.area_name,area_name_desc:e.area_name_desc,area_day:e.area_day,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_area.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdproducttype(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,product_type:e.product_type,product_type_desc:e.product_type_desc,category_id:e.category_id.id,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_producttype.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdsize(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,size:e.size,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_size.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdshipping(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,shipping_desc:e.shipping_desc,shipping_price:e.shipping_price,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_shipping.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdnumber(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,color:e.color,color_acronym:e.color_acronym,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_number.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdnumberdetail(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,mtd_number_id:e.mtd_number_id,number:e.number,mtd_size_id:e.mtd_size_id.id,qty:e.qty,price:e.price,qty_remain:e.qty_remain,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_numberdetail.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdproduct(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,product_name:e.product_name,product_desc:e.product_desc,product_pattern:e.product_pattern,product_model:e.product_model,product_color:e.product_color,product_type_id:e.product_type_id.id,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_product.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdproductdetail(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,productid:e.productid,mtd_size_id:e.mtd_size_id.id,mtd_product_id:e.mtd_product_id,qty:e.qty,price:e.price,qty_remain:e.qty_remain,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_productdetail.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdmember(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,member_date:e.member_date,member_idcard:e.member_idcard,member_name:e.member_name,member_surname:e.member_surname,member_nickname:e.member_nickname,member_brithday:e.member_brithday,member_nationality:e.member_nationality,member_race:e.member_race,member_religion:e.member_religion,member_address:e.member_address,member_place:e.member_place,member_tel:e.member_tel,member_email:e.member_email,member_line:e.member_line,member_winname:e.member_winname,mtd_area_id:e.mtd_area_id.id,member_yellow:e.member_yellow,member_countwin:e.member_countwin,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_member.php",n,{headers:{"Content-Type":"application/json"}})}crudmtdgreen(e,t,i){let n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,namewin:e.namewin,mtd_area_id:e.mtd_area_id,qty:e.qty,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_green.php",n,{headers:{"Content-Type":"application/json"}})}}return e.\u0275fac=function(t){return new(t||e)(n.Ub(r.a),n.Ub(o.a))},e.\u0275prov=n.Gb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},tCFm:function(e,t,i){"use strict";i.r(t),i.d(t,"MtdareaPageModule",function(){return g});var n=i("ofXK"),r=i("3Pt+"),o=i("TEn/"),s=i("tyNb"),a=i("mrSG"),c=i("84vV"),d=i("fXoL"),p=i("mPU2"),m=i("cZdB");function l(e,t){1&e&&(d.Qb(0,"span",25),d.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e40\u0e02\u0e15(\u0e17\u0e35\u0e48\u0e41\u0e2a\u0e14\u0e07\u0e43\u0e19\u0e1b\u0e49\u0e32\u0e22\u0e40\u0e02\u0e35\u0e22\u0e27) "),d.Pb())}function b(e,t){1&e&&(d.Qb(0,"span",25),d.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e40\u0e02\u0e15\u0e23\u0e31\u0e1a\u0e1c\u0e34\u0e14\u0e0a\u0e2d\u0e1a "),d.Pb())}function _(e,t){1&e&&(d.Qb(0,"span",25),d.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e23\u0e2d\u0e1a\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e2a\u0e48\u0e07 "),d.Pb())}function h(e,t){if(1&e){const e=d.Rb();d.Qb(0,"ion-item-sliding",26),d.Yb("click",function(){d.tc(e);const i=t.$implicit;return d.ac().selectData(i.id)}),d.Qb(1,"ion-item"),d.Qb(2,"ion-label"),d.Qb(3,"ion-text",27),d.Qb(4,"h3"),d.Bc(5),d.Pb(),d.Qb(6,"h3"),d.Bc(7),d.Pb(),d.Pb(),d.Pb(),d.Qb(8,"ion-badge",28),d.Bc(9),d.Pb(),d.Pb(),d.Qb(10,"ion-item-options"),d.Qb(11,"ion-item-option",29),d.Yb("click",function(){d.tc(e);const i=t.$implicit;return d.ac().cancelData(i.id)}),d.Lb(12,"ion-icon",30),d.Bc(13," \u0e25\u0e1a "),d.Pb(),d.Pb(),d.Pb()}if(2&e){const e=t.$implicit;d.hc("ngClass",e.highlight?"newdata":""),d.zb(5),d.Cc(e.area_name),d.zb(2),d.Cc(e.area_day),d.zb(2),d.Cc(e.id)}}const u=[{path:"",component:(()=>{class e{constructor(e,t,i,n){this.mtdSv=e,this.formBuilder=t,this.configSv=i,this.alertCtrl=n,this.isSubmitted=!1,this.data=[],this.page=0,this.maxpadding=0,this.limit=50}ngOnInit(){this.ionicForm=this.formBuilder.group({id:[""],area_name:["",[r.l.required]],area_name_desc:["",[r.l.required]],area_day:["",[r.l.required]],highlight:[""]}),this.loaddata(this.page)}get errorControl(){return this.ionicForm.controls}submitForm(){if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;{let e;e=this.ionicForm.controls.id.value?"update":"insert",this.sub=this.mtdSv.crudmtdarea(this.ionicForm.value,e).subscribe(t=>{if(null!==t){if("insert"===e)"ok"===t.status&&this.data.unshift({id:t.id,area_name:this.ionicForm.controls.area_name.value,area_name_desc:this.ionicForm.controls.area_name_desc.value,area_day:this.ionicForm.controls.area_day.value,highlight:!0});else if("update"===e&&"ok"===t.status){let e;e=this.data.filter(e=>e.id==t.id),e.forEach(e=>{for(const[t,i]of Object.entries(e))e[t]=this.ionicForm.controls[t].value})}this.configSv.ChkformAlert(t.message)}},e=>{console.log(JSON.stringify(e))},()=>{this.refreshForm()})}}ngOnDestroy(){this.sub.unsubscribe()}refreshForm(){this.ionicForm.reset(),this.isSubmitted=!1}loaddata(e,t){let i;this.sub=this.mtdSv.getmtd(1,e,this.limit).subscribe(e=>{null!==e&&(this.maxpadding=e.maxpadding,i=e.limit,this.data=this.data.concat(e.data_detail.map(e=>Object.assign({},e))),t&&t.target.complete())})}selectData(e){let t;t=this.data.filter(t=>t.id==e),t.forEach(e=>{for(const[t,i]of Object.entries(e))this.ionicForm.controls[t].setValue(i)})}cancelData(e){return Object(a.a)(this,void 0,void 0,function*(){(yield this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e40\u0e25\u0e02\u0e23\u0e30\u0e1a\u0e1a\u0e17\u0e35\u0e48 "+e+" ? ",inputs:[{name:"cause",placeholder:"\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"}],buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:e=>{console.log("cancel ",e)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:t=>{t.cause?this.sub=this.mtdSv.crudmtdarea(e,"cancel",t.cause).subscribe(e=>{this.configSv.ChkformAlert(e.message)},e=>{console.log(JSON.stringify(e))},()=>{this.data=this.data.filter(t=>t.id!==e),this.refreshForm()}):this.configSv.ChkformAlert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e14\u0e49\u0e27\u0e22")}}]})).present()})}doInfinite(e){this.page++,this.loaddata(this.page*this.limit,e),this.page===this.maxpadding&&(e.target.disabled=!0)}}return e.\u0275fac=function(t){return new(t||e)(d.Kb(c.a),d.Kb(r.b),d.Kb(p.a),d.Kb(o.a))},e.\u0275cmp=d.Eb({type:e,selectors:[["app-mtdarea"]],decls:59,vars:9,consts:[["slot","start"],["slot","primary"],[3,"click"],["slot","icon-only","src","./assets/icons/refresh.svg"],["slot","icon-only","src","./assets/icons/save.svg"],["novalidate","",3,"formGroup"],["fixed",""],["type","text","formControlName","id","disabled","",1,"IDnoshowBG"],["position","floating",1,"showlabel"],["formControlName","area_name","type","text"],["class","error",4,"ngIf"],["formControlName","area_name_desc","type","text"],["interface","popover","formControlName","area_day"],["value","\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c"],["value","\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23"],["value","\u0e1e\u0e38\u0e18"],["value","\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35"],["value","\u0e28\u0e38\u0e01\u0e23\u0e4c"],["value","\u0e40\u0e2a\u0e32\u0e23\u0e4c"],["value","\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c"],["scrollY","true","id","myFixZone"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[1,"error"],[3,"ngClass","click"],["color","primary"],["slot","end","color","success"],["color","danger",3,"click"],["slot","end","name","trash"]],template:function(e,t){1&e&&(d.Qb(0,"ion-header"),d.Qb(1,"ion-toolbar"),d.Qb(2,"ion-buttons",0),d.Lb(3,"ion-menu-button"),d.Pb(),d.Qb(4,"ion-title"),d.Bc(5,"\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e40\u0e02\u0e15\u0e17\u0e35\u0e48\u0e15\u0e31\u0e49\u0e07"),d.Pb(),d.Qb(6,"ion-buttons",1),d.Qb(7,"ion-button",2),d.Yb("click",function(){return t.refreshForm()}),d.Lb(8,"ion-icon",3),d.Pb(),d.Pb(),d.Qb(9,"ion-buttons",1),d.Qb(10,"ion-button",2),d.Yb("click",function(){return t.submitForm()}),d.Lb(11,"ion-icon",4),d.Pb(),d.Pb(),d.Pb(),d.Pb(),d.Qb(12,"form",5),d.Qb(13,"ion-grid",6),d.Qb(14,"ion-row"),d.Qb(15,"ion-col"),d.Bc(16," \u0e40\u0e25\u0e02\u0e17\u0e35\u0e48\u0e23\u0e30\u0e1a\u0e1a "),d.Lb(17,"input",7),d.Pb(),d.Pb(),d.Qb(18,"ion-row"),d.Qb(19,"ion-col"),d.Qb(20,"ion-item"),d.Qb(21,"ion-label",8),d.Bc(22,"\u0e40\u0e02\u0e15(\u0e17\u0e35\u0e48\u0e41\u0e2a\u0e14\u0e07\u0e43\u0e19\u0e1b\u0e49\u0e32\u0e22\u0e40\u0e02\u0e35\u0e22\u0e27)"),d.Pb(),d.Lb(23,"ion-input",9),d.zc(24,l,2,0,"span",10),d.Pb(),d.Pb(),d.Qb(25,"ion-col"),d.Qb(26,"ion-item"),d.Qb(27,"ion-label",8),d.Bc(28,"\u0e40\u0e02\u0e15\u0e23\u0e31\u0e1a\u0e1c\u0e34\u0e14\u0e0a\u0e2d\u0e1a"),d.Pb(),d.Lb(29,"ion-input",11),d.zc(30,b,2,0,"span",10),d.Pb(),d.Pb(),d.Qb(31,"ion-col"),d.Qb(32,"ion-item"),d.Qb(33,"ion-label",8),d.Bc(34,"\u0e23\u0e2d\u0e1a\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48\u0e2a\u0e48\u0e07"),d.Pb(),d.Qb(35,"ion-select",12),d.Qb(36,"ion-select-option",13),d.Bc(37,"\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c"),d.Pb(),d.Qb(38,"ion-select-option",14),d.Bc(39,"\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23"),d.Pb(),d.Qb(40,"ion-select-option",15),d.Bc(41,"\u0e1e\u0e38\u0e18"),d.Pb(),d.Qb(42,"ion-select-option",16),d.Bc(43,"\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35"),d.Pb(),d.Qb(44,"ion-select-option",17),d.Bc(45,"\u0e28\u0e38\u0e01\u0e23\u0e4c"),d.Pb(),d.Qb(46,"ion-select-option",18),d.Bc(47,"\u0e40\u0e2a\u0e32\u0e23\u0e4c"),d.Pb(),d.Qb(48,"ion-select-option",19),d.Bc(49,"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c"),d.Pb(),d.Pb(),d.zc(50,_,2,0,"span",10),d.Pb(),d.Pb(),d.Pb(),d.Pb(),d.Pb(),d.Qb(51,"ion-content"),d.Qb(52,"div",20),d.Qb(53,"ion-searchbar",21),d.Yb("ngModelChange",function(e){return t.filterTerm=e}),d.Pb(),d.Qb(54,"ion-list"),d.zc(55,h,14,4,"ion-item-sliding",22),d.bc(56,"filter"),d.Pb(),d.Qb(57,"ion-infinite-scroll",23),d.Yb("ionInfinite",function(e){return t.doInfinite(e)}),d.Lb(58,"ion-infinite-scroll-content",24),d.Pb(),d.Pb(),d.Pb()),2&e&&(d.zb(12),d.hc("formGroup",t.ionicForm),d.zb(12),d.hc("ngIf",t.isSubmitted&&(null==t.errorControl.area_name.errors?null:t.errorControl.area_name.errors.required)),d.zb(6),d.hc("ngIf",t.isSubmitted&&(null==t.errorControl.area_name_desc.errors?null:t.errorControl.area_name_desc.errors.required)),d.zb(20),d.hc("ngIf",t.isSubmitted&&(null==t.errorControl.area_day.errors?null:t.errorControl.area_day.errors.required)),d.zb(3),d.hc("ngModel",t.filterTerm),d.zb(2),d.hc("ngForOf",d.dc(56,6,t.data,t.filterTerm)))},directives:[o.p,o.U,o.h,o.F,o.T,o.g,o.q,r.m,r.i,r.d,o.o,o.L,o.l,r.a,r.h,r.c,o.v,o.B,o.u,o.ib,n.k,o.N,o.hb,o.O,o.m,o.M,r.j,o.C,n.j,o.s,o.t,o.A,n.i,o.R,o.f,o.z,o.y],pipes:[m.a],styles:[""]}),e})()}];let f=(()=>{class e{}return e.\u0275mod=d.Ib({type:e}),e.\u0275inj=d.Hb({factory:function(t){return new(t||e)},imports:[[s.j.forChild(u)],s.j]}),e})(),g=(()=>{class e{}return e.\u0275mod=d.Ib({type:e}),e.\u0275inj=d.Hb({factory:function(t){return new(t||e)},imports:[[n.b,r.e,o.W,m.b,f,r.k]]}),e})()}}]);