(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{"0m0A":function(n,o,t){"use strict";t.r(o),t.d(o,"SigninPageModule",function(){return g});var r=t("ofXK"),e=t("3Pt+"),i=t("TEn/"),s=t("tyNb"),a=t("fXoL"),b=t("UhpB"),l=t("mPU2");function c(n,o){1&n&&(a.Qb(0,"span",12),a.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 Username "),a.Pb())}function p(n,o){1&n&&(a.Qb(0,"span",12),a.Bc(1," \u0e01\u0e23\u0e38\u0e13\u0e32\u0e23\u0e30\u0e1a\u0e38 Password "),a.Pb())}const d=[{path:"",component:(()=>{class n{constructor(n,o,t,r,e){this.formBuilder=n,this.menuCtrl=o,this.navCtrl=t,this.signinSv=r,this.configSv=e,this.isSubmitted=!1}ngOnInit(){this.ionicForm=this.formBuilder.group({name:["dda",[e.l.required]],password:["dda",[e.l.required]]})}ionViewWillEnter(){this.menuCtrl.enable(!1);const n=document.getElementsByTagName("META");for(let o=0;o<n.length;o++)"version"===n[o].name&&(this.versionNumber=n[o].content);this.configSv.stopidle()}get errorControl(){return this.ionicForm.controls}submitForm(){if(this.isSubmitted=!0,!this.ionicForm.valid)return console.log("Please provide all the required values!"),!1;this.configSv.loadingAlert(2e3),this.sub=this.signinSv.signin(this.ionicForm.controls.name.value,this.ionicForm.controls.password.value,this.configSv.token).subscribe(n=>{console.log(n),null!==n?(this.signinSv.publishSomeData(n),setTimeout(()=>{this.isSubmitted=!1,this.ionicForm.reset(),this.navCtrl.navigateForward("/maindda")},2100)):setTimeout(()=>{this.configSv.ChkformAlert("\u0e44\u0e21\u0e48\u0e1e\u0e1a\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25/\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19\u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07")},2100)},n=>{console.log(JSON.stringify(n))})}}return n.\u0275fac=function(o){return new(o||n)(a.Kb(e.b),a.Kb(i.Z),a.Kb(i.bb),a.Kb(b.a),a.Kb(l.a))},n.\u0275cmp=a.Eb({type:n,selectors:[["app-signin"]],decls:22,vars:4,consts:[["text-center",""],[1,"main"],["align","center",1,"sign"],["novalidate","",3,"formGroup","ngSubmit"],["lines","full",1,"un"],["position","floating",1,"showlabel"],["formControlName","name","type","text"],["class","error",4,"ngIf"],["lines","full",1,"pass"],["formControlName","password","type","password"],["type","submit","color","danger","expand","block"],[1,"appversion"],[1,"error"]],template:function(n,o){1&n&&(a.Qb(0,"ion-content",0),a.Qb(1,"div",1),a.Qb(2,"p",2),a.Bc(3,"\u0e14\u0e27\u0e07\u0e14\u0e35 Appilcation"),a.Pb(),a.Qb(4,"form",3),a.Yb("ngSubmit",function(){return o.submitForm()}),a.Qb(5,"ion-item",4),a.Qb(6,"ion-label",5),a.Bc(7,"Username"),a.Pb(),a.Lb(8,"ion-input",6),a.zc(9,c,2,0,"span",7),a.Pb(),a.Qb(10,"ion-item",8),a.Qb(11,"ion-label",5),a.Bc(12,"Password"),a.Pb(),a.Lb(13,"ion-input",9),a.zc(14,p,2,0,"span",7),a.Pb(),a.Qb(15,"ion-row"),a.Qb(16,"ion-col"),a.Qb(17,"ion-button",10),a.Bc(18,"\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e23\u0e30\u0e1a\u0e1a"),a.Pb(),a.Pb(),a.Pb(),a.Qb(19,"ion-row",11),a.Qb(20,"ion-col"),a.Bc(21),a.Pb(),a.Pb(),a.Pb(),a.Pb(),a.Pb()),2&n&&(a.zb(4),a.hc("formGroup",o.ionicForm),a.zb(5),a.hc("ngIf",o.isSubmitted&&(null==o.errorControl.name.errors?null:o.errorControl.name.errors.required)),a.zb(5),a.hc("ngIf",o.isSubmitted&&(null==o.errorControl.password.errors?null:o.errorControl.password.errors.required)),a.zb(7),a.Dc(" App Version : ",o.versionNumber," "))},directives:[i.m,e.m,e.i,e.d,i.v,i.B,i.u,i.ib,e.h,e.c,r.k,i.L,i.l,i.g],styles:[".main[_ngcontent-%COMP%]{background-color:#fff;width:400px;height:450px;margin:7em auto;border-radius:1.5em;box-shadow:0 11px 35px 2px rgba(0,0,0,.14)}.sign[_ngcontent-%COMP%]{padding-top:40px;color:#8c55aa;font-size:23px}.sign[_ngcontent-%COMP%], .un[_ngcontent-%COMP%]{font-family:Ubuntu,sans-serif;font-weight:700}.un[_ngcontent-%COMP%]{width:76%;color:#263238;font-size:14px;letter-spacing:1px;background:hsla(0,4%,51.4%,.04);padding:10px 20px;border:none;border-radius:20px;outline:none;box-sizing:border-box;border:2px solid rgba(0,0,0,.02);margin-left:46px;text-align:center;margin-bottom:27px}form.form1[_ngcontent-%COMP%]{padding-top:40px}.pass[_ngcontent-%COMP%]{width:76%;color:#263238;font-weight:700;font-size:14px;letter-spacing:1px;background:hsla(0,4%,51.4%,.04);padding:10px 20px;border:none;border-radius:20px;outline:none;box-sizing:border-box;border:2px solid rgba(0,0,0,.02);margin-left:46px;text-align:center;margin-bottom:27px;font-family:Ubuntu,sans-serif}.pass[_ngcontent-%COMP%]:focus, .un[_ngcontent-%COMP%]:focus{border:2px solid rgba(0,0,0,.18)!important}.submit[_ngcontent-%COMP%]{cursor:pointer;border-radius:5em;color:#fff;background:linear-gradient(90deg,#9c27b0,#e040fb);border:0;padding:10px 40px;font-family:Ubuntu,sans-serif;margin-left:35%;font-size:13px;box-shadow:0 0 20px 1px rgba(0,0,0,.04)}.forgot[_ngcontent-%COMP%]{text-shadow:0 0 3px hsla(0,0%,45.9%,.12);color:#e1bee7;padding-top:15px}.error[_ngcontent-%COMP%]{color:red;display:table;margin-left:auto;margin-right:auto}.appversion[_ngcontent-%COMP%]{color:rgba(0,0,0,.21176470588235294);font-size:9px;text-align:center}a[_ngcontent-%COMP%]{text-shadow:0 0 3px hsla(0,0%,45.9%,.12);color:#e1bee7;text-decoration:none}@media (max-width:600px){.main[_ngcontent-%COMP%]{border-radius:0}}"]}),n})()}];let u=(()=>{class n{}return n.\u0275mod=a.Ib({type:n}),n.\u0275inj=a.Hb({factory:function(o){return new(o||n)},imports:[[s.j.forChild(d)],s.j]}),n})(),g=(()=>{class n{}return n.\u0275mod=a.Ib({type:n}),n.\u0275inj=a.Hb({factory:function(o){return new(o||n)},imports:[[r.b,e.e,i.W,e.k,u]]}),n})()}}]);