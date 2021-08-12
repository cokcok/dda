import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
 
@Component({
  selector: 'app-pocfcupon02',
  templateUrl: './pocfcupon02.page.html',
  styleUrls: ['./pocfcupon02.page.scss'],
})
export class Pocfcupon02Page implements OnInit {
  @Input() id:number;@Input() assign_date:string; @Input() seq:string;@Input() total:string;@Input() totalsus:string; 
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  dataallarray = []; assign_statusAll:number; allsus:number;
  checkallstatus:boolean = false;data_check=[];checkall:boolean;
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private alertCtrl: AlertController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      total:[this.total],
      totalsus:[this.totalsus],
      dataall:[],
    });
    this.loaddata(0)
  }

  dismissModal(){
    //this.modalCtrl.dismiss();

    let dataarray = []; 
    dataarray.push({ 
     allsus:this.allsus,
     assign_status:this.assign_statusAll,
    });

    this.modalCtrl.dismiss(dataarray,'confirm');
  }

  loaddata(padding: number, infiniteScroll?){
    if(padding == 0){this.data = []};
    this.sub = this.poSv
    .getcfcupon('readid',this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
        this.data =  data.data_detail.map((item) => Object.assign({}, item));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }
 
  getColor(value) {
    let _value = moment(value,'DD/MM/YYYY').isoWeekday();
    //console.log(_value);
    return this.configSv.colortxt[_value];
  }

  showImg(detail_id,name){
    let url = this.configSv.ip + 'po01/productdetail/' + detail_id + '/' +  name
    const browser = this.iab.create(url).show();
   }
   
   selectDataAll(){
     if(this.checkallstatus ===false){
      this.data_check = this.data.filter((val) => val.status_checked == false)
      for (var i = 0; i < this.data_check.length; i++) {
        this.data_check[i]['status_checked'] = true;
      }
      this.dataallarray = this.data_check; this.checkallstatus = true;this.checkall =false;
     }else{
      for (var i = 0; i <  this.data_check.length; i++) {
        this.data_check[i]['status_checked'] = false;
      }
      this.checkallstatus = false;this.dataallarray = [];
     }
   }

   selectData(index,data,checked){
    if(checked){
      this.dataallarray = this.dataallarray.filter(item => item.assign_id !== data['assign_id'])
      if(this.dataallarray.length === 0){this.checkall = false;}
     }else{
      this.dataallarray.push(data);
     }
     //console.log(this.dataallarray);
    
   }

   async submitForm(){
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
    //console.log(this.ionicForm.value);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันข้อมูลในการปรับสถานะการปัก',
      //message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           //console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
          this.sub = this.poSv
          .crudcfcupon(this.ionicForm.value,'insert')
          .subscribe((data) => {
            if (data !== null) {
                if(data.status === 'ok'){
                 this.allsus = Number(data.id) + this.ionicForm.controls.totalsus.value;
                  if(this.allsus == this.ionicForm.controls.total.value){
                    this.assign_statusAll = 1;
                  }else{
                    this.assign_statusAll = 2;

                  }
                  //this.assign_statusAll = data.id;
                  this.ionicForm.controls['totalsus'].setValue(this.allsus);
                  this.compareArray(this.data,this.dataallarray);
                  this.configSv.ChkformAlert(data.message);
                  this.dataallarray = [];
                  this.checkallstatus = false;this.checkall =false;
                }
            }
          },
          (error) => {
            console.log(JSON.stringify(error));
          });
        }
      }]
    });
    confirm.present();
  }

  compareArray(dataall,dataselect) {
    dataall.forEach( array1Ttem => {
        dataselect.forEach( array2Item => {
           if(array1Ttem.assign_id == array2Item.assign_id){
              array1Ttem.disable_checked  = true;
              array1Ttem.status_checked  = true;
              array1Ttem.poassign_number  = 1;
              array1Ttem.poassign_numbertxt  = 'งานปักเลขสำเร็จ';
          }
        });
      });
  }
}
