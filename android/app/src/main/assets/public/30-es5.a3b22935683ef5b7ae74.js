!function(){function e(e,i){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var i=[],n=!0,r=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(i.push(a.value),!t||i.length!==t);n=!0);}catch(s){r=!0,o=s}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return i}(e,i)||function(e,i){if(!e)return;if("string"==typeof e)return t(e,i);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,i)}(e,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"84vV":function(e,t,n){"use strict";n.d(t,"a",function(){return s});var o=n("fXoL"),a=n("tk/3"),c=n("mPU2"),s=function(){var e=function(){function e(t,n){i(this,e),this.http=t,this.configSv=n,this.getpage=["mtd01.php","mtd_area.php","mtd_producttype.php","mtd_size.php","mtd_shipping.php","mtd_number.php","mtd_numberdetail.php","mtd_product.php","mtd_productdetail.php","mtd_member.php","mtd_green.php"]}return r(e,[{key:"getplace",value:function(){return this.http.get("./assets/data/place.json")}},{key:"getmtd",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:9999999999,n=arguments.length>3?arguments[3]:void 0;return this.http.post(this.configSv.ip+this.getpage[e],{padding:t,limit:i,condition:n,type_sql:"read"},{headers:{"Content-Type":"application/json"}})}},{key:"crudmtd01",value:function(e,t,i){var n;return n="cancel"===t||"resetpwd"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,prefix_name:e.prefix_name,name:e.name,surname:e.surname,nickname:e.nickname,group_id:e.group_id.id,userpass:e.username,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd01.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdarea",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,area_name:e.area_name,area_name_desc:e.area_name_desc,area_day:e.area_day,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_area.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdproducttype",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,product_type:e.product_type,product_type_desc:e.product_type_desc,category_id:e.category_id.id,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_producttype.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdsize",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,size:e.size,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_size.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdshipping",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,shipping_desc:e.shipping_desc,shipping_price:e.shipping_price,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_shipping.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdnumber",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,color:e.color,color_acronym:e.color_acronym,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_number.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdnumberdetail",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,mtd_number_id:e.mtd_number_id,number:e.number,mtd_size_id:e.mtd_size_id.id,qty:e.qty,price:e.price,qty_remain:e.qty_remain,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_numberdetail.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdproduct",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,product_name:e.product_name,product_desc:e.product_desc,product_pattern:e.product_pattern,product_model:e.product_model,product_color:e.product_color,product_type_id:e.product_type_id.id,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_product.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdproductdetail",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,productid:e.productid,mtd_size_id:e.mtd_size_id.id,mtd_product_id:e.mtd_product_id,qty:e.qty,price:e.price,qty_remain:e.qty_remain,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_productdetail.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdmember",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,member_date:e.member_date,member_idcard:e.member_idcard,member_name:e.member_name,member_surname:e.member_surname,member_nickname:e.member_nickname,member_brithday:e.member_brithday,member_nationality:e.member_nationality,member_race:e.member_race,member_religion:e.member_religion,member_address:e.member_address,member_place:e.member_place,member_tel:e.member_tel,member_email:e.member_email,member_line:e.member_line,member_winname:e.member_winname,mtd_area_id:e.mtd_area_id.id,member_yellow:e.member_yellow,member_countwin:e.member_countwin,pic:e.picresizbase64List,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_member.php",n,{headers:{"Content-Type":"application/json"}})}},{key:"crudmtdgreen",value:function(e,t,i){var n;return n="cancel"===t?{id:e,emp_id:this.configSv.emp_id,type_sql:t,cause:i}:{id:e.id,namewin:e.namewin,mtd_area_id:e.mtd_area_id,qty:e.qty,emp_id:this.configSv.emp_id,type_sql:t},this.http.post(this.configSv.ip+"mtd_green.php",n,{headers:{"Content-Type":"application/json"}})}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Ub(a.a),o.Ub(c.a))},e.\u0275prov=o.Gb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},Mwwi:function(t,n,o){"use strict";o.r(n),o.d(n,"MtdsizePageModule",function(){return k});var a=o("ofXK"),c=o("3Pt+"),s=o("TEn/"),d=o("tyNb"),p=o("mrSG"),m=o("fXoL"),u=o("84vV"),l=o("mPU2"),h=o("cZdB");function b(e,t){1&e&&(m.Qb(0,"span",16),m.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 \u0e02\u0e19\u0e32\u0e14 "),m.Pb())}function f(e,t){if(1&e){var i=m.Rb();m.Qb(0,"ion-item-sliding",17),m.Yb("click",function(){m.tc(i);var e=t.$implicit;return m.ac().selectData(e.id)}),m.Qb(1,"ion-item"),m.Qb(2,"ion-label"),m.Qb(3,"ion-text",18),m.Qb(4,"h3"),m.Bc(5),m.Pb(),m.Pb(),m.Pb(),m.Qb(6,"ion-badge",19),m.Bc(7),m.Pb(),m.Pb(),m.Qb(8,"ion-item-options"),m.Qb(9,"ion-item-option",20),m.Yb("click",function(){m.tc(i);var e=t.$implicit;return m.ac().cancelData(e.id)}),m.Lb(10,"ion-icon",21),m.Bc(11," \u0e25\u0e1a "),m.Pb(),m.Pb(),m.Pb()}if(2&e){var n=t.$implicit;m.hc("ngClass",n.highlight?"newdata":""),m.zb(5),m.Cc(n.size),m.zb(2),m.Cc(n.id)}}var _,g,y,v=[{path:"",component:(_=function(){function t(e,n,r,o){i(this,t),this.mtdSv=e,this.formBuilder=n,this.configSv=r,this.alertCtrl=o,this.isSubmitted=!1,this.data=[],this.page=0,this.maxpadding=0,this.limit=50}return r(t,[{key:"ngOnInit",value:function(){this.ionicForm=this.formBuilder.group({id:[""],size:["",[c.l.required]],highlight:[""]}),this.loaddata(this.page)}},{key:"submitForm",value:function(){var t,i=this;if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;t=this.ionicForm.controls.id.value?"update":"insert",this.sub=this.mtdSv.crudmtdsize(this.ionicForm.value,t).subscribe(function(n){null!==n&&("insert"===t?"ok"===n.status&&i.data.unshift({id:n.id,size:i.ionicForm.controls.size.value,highlight:!0}):"update"===t&&"ok"===n.status&&i.data.filter(function(e){return e.id==n.id}).forEach(function(t){for(var n=0,r=Object.entries(t);n<r.length;n++){var o=e(r[n],2),a=o[0];o[1],t[a]=i.ionicForm.controls[a].value}}),i.configSv.ChkformAlert(n.message))},function(e){console.log(JSON.stringify(e))},function(){i.refreshForm()})}},{key:"ngOnDestroy",value:function(){this.sub.unsubscribe()}},{key:"refreshForm",value:function(){this.ionicForm.reset(),this.isSubmitted=!1}},{key:"loaddata",value:function(e,t){var i=this;this.sub=this.mtdSv.getmtd(3,e,this.limit).subscribe(function(e){null!==e&&(i.maxpadding=e.maxpadding,e.limit,i.data=i.data.concat(e.data_detail.map(function(e){return Object.assign({},e)})),t&&t.target.complete())})}},{key:"selectData",value:function(t){var i=this;this.data.filter(function(e){return e.id==t}).forEach(function(t){for(var n=0,r=Object.entries(t);n<r.length;n++){var o=e(r[n],2),a=o[0],c=o[1];i.ionicForm.controls[a].setValue(c)}})}},{key:"cancelData",value:function(e){return Object(p.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var i=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.alertCtrl.create({header:"\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25",message:"\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e40\u0e25\u0e02\u0e23\u0e30\u0e1a\u0e1a\u0e17\u0e35\u0e48 "+e+" ? ",inputs:[{name:"cause",placeholder:"\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"}],buttons:[{text:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",handler:function(e){console.log("cancel ",e)}},{text:"\u0e15\u0e01\u0e25\u0e07",handler:function(t){t.cause?i.sub=i.mtdSv.crudmtdsize(e,"cancel",t.cause).subscribe(function(e){i.configSv.ChkformAlert(e.message)},function(e){console.log(JSON.stringify(e))},function(){i.data=i.data.filter(function(t){return t.id!==e}),i.refreshForm()}):i.configSv.ChkformAlert("\u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e43\u0e19\u0e01\u0e32\u0e23\u0e25\u0e1a\u0e14\u0e49\u0e27\u0e22")}}]});case 2:t.sent.present();case 3:case"end":return t.stop()}},t,this)}))}},{key:"doInfinite",value:function(e){this.page++,this.loaddata(this.page*this.limit,e),this.page===this.maxpadding&&(e.target.disabled=!0)}},{key:"errorControl",get:function(){return this.ionicForm.controls}}]),t}(),_.\u0275fac=function(e){return new(e||_)(m.Kb(u.a),m.Kb(c.b),m.Kb(l.a),m.Kb(s.a))},_.\u0275cmp=m.Eb({type:_,selectors:[["app-mtdsize"]],decls:33,vars:7,consts:[["slot","start"],["slot","primary"],[3,"click"],["slot","icon-only","src","./assets/icons/refresh.svg"],["slot","icon-only","src","./assets/icons/save.svg"],["novalidate","",3,"formGroup"],["fixed",""],["type","text","formControlName","id","disabled","",1,"IDnoshowBG"],["position","floating",1,"showlabel"],["formControlName","size","type","text"],["class","error",4,"ngIf"],["scrollY","true","id","myFixZone"],["placeholder","\u0e04\u0e49\u0e19\u0e2b\u0e32...","animated","true",3,"ngModel","ngModelChange"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[1,"error"],[3,"ngClass","click"],["color","primary"],["slot","end","color","success"],["color","danger",3,"click"],["slot","end","name","trash"]],template:function(e,t){1&e&&(m.Qb(0,"ion-header"),m.Qb(1,"ion-toolbar"),m.Qb(2,"ion-buttons",0),m.Lb(3,"ion-menu-button"),m.Pb(),m.Qb(4,"ion-title"),m.Bc(5,"\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e02\u0e19\u0e32\u0e14"),m.Pb(),m.Qb(6,"ion-buttons",1),m.Qb(7,"ion-button",2),m.Yb("click",function(){return t.refreshForm()}),m.Lb(8,"ion-icon",3),m.Pb(),m.Pb(),m.Qb(9,"ion-buttons",1),m.Qb(10,"ion-button",2),m.Yb("click",function(){return t.submitForm()}),m.Lb(11,"ion-icon",4),m.Pb(),m.Pb(),m.Pb(),m.Pb(),m.Qb(12,"form",5),m.Qb(13,"ion-grid",6),m.Qb(14,"ion-row"),m.Qb(15,"ion-col"),m.Bc(16," \u0e40\u0e25\u0e02\u0e17\u0e35\u0e48\u0e23\u0e30\u0e1a\u0e1a "),m.Lb(17,"input",7),m.Pb(),m.Pb(),m.Qb(18,"ion-row"),m.Qb(19,"ion-col"),m.Qb(20,"ion-item"),m.Qb(21,"ion-label",8),m.Bc(22,"\u0e02\u0e19\u0e32\u0e14"),m.Pb(),m.Lb(23,"ion-input",9),m.zc(24,b,2,0,"span",10),m.Pb(),m.Pb(),m.Pb(),m.Pb(),m.Pb(),m.Qb(25,"ion-content"),m.Qb(26,"div",11),m.Qb(27,"ion-searchbar",12),m.Yb("ngModelChange",function(e){return t.filterTerm=e}),m.Pb(),m.Qb(28,"ion-list"),m.zc(29,f,12,3,"ion-item-sliding",13),m.bc(30,"filter"),m.Pb(),m.Qb(31,"ion-infinite-scroll",14),m.Yb("ionInfinite",function(e){return t.doInfinite(e)}),m.Lb(32,"ion-infinite-scroll-content",15),m.Pb(),m.Pb(),m.Pb()),2&e&&(m.zb(12),m.hc("formGroup",t.ionicForm),m.zb(12),m.hc("ngIf",t.isSubmitted&&(null==t.errorControl.size.errors?null:t.errorControl.size.errors.required)),m.zb(3),m.hc("ngModel",t.filterTerm),m.zb(2),m.hc("ngForOf",m.dc(30,4,t.data,t.filterTerm)))},directives:[s.p,s.U,s.h,s.F,s.T,s.g,s.q,c.m,c.i,c.d,s.o,s.L,s.l,c.a,c.h,c.c,s.v,s.B,s.u,s.ib,a.k,s.m,s.M,c.j,s.C,a.j,s.s,s.t,s.A,a.i,s.R,s.f,s.z,s.y],pipes:[h.a],styles:[""]}),_)}],S=((y=function e(){i(this,e)}).\u0275mod=m.Ib({type:y}),y.\u0275inj=m.Hb({factory:function(e){return new(e||y)},imports:[[d.j.forChild(v)],d.j]}),y),k=((g=function e(){i(this,e)}).\u0275mod=m.Ib({type:g}),g.\u0275inj=m.Hb({factory:function(e){return new(e||g)},imports:[[a.b,c.e,s.W,S,c.k,h.b]]}),g)}}])}();