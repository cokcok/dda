import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Potf02Page} from '../potf02/potf02.page';
const moment = moment_;

@Component({
  selector: 'app-potf01',
  templateUrl: './potf01.page.html',
  styleUrls: ['./potf01.page.scss'],
})
export class Potf01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  datePickerObj: any = {};
  dataallarray = []; datasomearray = [];
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      typeserch_id: ["9"],
      txtserach: ["",[Validators.required]],
      dataall:[],
    }); 
    this.fndate();this.loaddata(0);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate(){
    this.datePickerObj = {
      inputDate: '',
      // showTodayButton: false,
       closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
       setLabel: 'เลือก',
       todayLabel: 'วันที่ปัจจุบัน',
       closeLabel: 'ปิด',
      // disabledDates: [],
      // titleLabel: 'Select a Date',
       monthsList: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
       weeksList: [ 'อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
      dateFormat: 'DD/MM/YYYY',
      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: 'success'
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      }
    };
  }
 
  loaddata(padding: number, infiniteScroll?){
    if(padding == 0){this.data = []};
    this.sub = this.poSv
    .getpotf('read',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        this.maxpadding = data["maxpadding"];
        this.maxdatalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }

  SearchData(padding: number,  infiniteScroll?){
    if(padding == 0){this.data = []};
    this.ionicForm.controls['typeserch_id'].setValue(0);
    this.sub = this.poSv
    .getpotf('read',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        this.maxpadding = data["maxpadding"];
        this.maxdatalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.data = [];
        this.maxpadding = 0;this.maxdatalimit=0;
      }
    });
  }

  SearchJustSend(padding: number,  infiniteScroll?){
    if(padding == 0){this.data = []};
    this.ionicForm.controls['typeserch_id'].setValue(1);
    this.sub = this.poSv
    .getpotf('read',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        this.maxpadding = data["maxpadding"];
        this.maxdatalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.data = [];
        this.maxpadding = 0;this.maxdatalimit=0;
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    let typeserach = this.ionicForm.controls['typeserch_id'].value;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      if (typeserach == 9){
        this.loaddata(this.page * this.limit, infiniteScroll);
      }else{
        this.SearchJustSend(this.page * this.limit, infiniteScroll);
      }
    }
  }


  async View(recivedate){
    let item = this.data.filter((val) => val.po_recivedate == recivedate);
    //console.log(item);
    const modal = await this.modalCtrl.create({
      component:Potf02Page,
      cssClass: 'my-modal',
      componentProps:{recivedate:recivedate},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      //console.log(data);
      if( data > 0){ 
        item[0].countjustsend = item[0].countjustsend - Number(data);
        item[0].countgoingsend = data;
      }
     }
  }

  selectData(index,data,checked){
    //console.log(data,checked);
    if(checked){
      //console.log('not check');
      this.dataallarray = this.dataallarray.filter(item => item.po_recivedate !== data['po_recivedate'])
     }else{
     // console.log('check');
      this.dataallarray.push(data);
     }
     //console.log(this.dataallarray);
   }

   async submitForm(){
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
    console.log(this.ionicForm.value);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันข้อมูลในการมอบหมายการส่ง',
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
            .crudpotf(this.ionicForm.value,'insertAll')
            .subscribe((data) => {
              if (data !== null) {
                  if(data.status === 'ok'){
                    //this.refreshForm();
                  this.configSv.ChkformAlert(data.message);
                  this.compareArray(this.data,this.dataallarray);
                  this.dataallarray = [];
                  
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
           if(array1Ttem.po_recivedate == array2Item.po_recivedate){
              array1Ttem.countgoingsend  = Number(array1Ttem.countgoingsend) + Number(array1Ttem.countjustsend);
              array1Ttem.countjustsend  = 0;
              array1Ttem.disable_checked = true;
              array1Ttem.status_checked = false;
          }
        });
      });
  }
}
