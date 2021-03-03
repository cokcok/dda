import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Poassign02Page} from '../poassign02/poassign02.page';

const moment = moment_;

@Component({
  selector: 'app-poassign01',
  templateUrl: './poassign01.page.html',
  styleUrls: ['./poassign01.page.scss'],
})
export class Poassign01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  datePickerObj: any = {};
  dataallarray = []; datasomearray = [];
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      typeserch_id: ["9"],
      txtserach: ["",[Validators.required]],
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
    this.sub = this.poSv
    .getpoassign(this.ionicForm.value,padding,this.limit)
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
  SerachData(padding: number,  infiniteScroll?){
    //if(this.tmptxtser == null){
    //  this.tmptxtser = this.ionicForm.controls['txtserach'].value;
   // }
    // if(this.tmptxtser != this.ionicForm.controls['txtserach'].value || padding == 0){
    //   this.data = [];
    // }
    if(padding == 0){this.data = []};
    this.ionicForm.controls['typeserch_id'].setValue(0);
    this.sub = this.poSv
    .getpoassign(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        //this.maxpadding = data["maxpadding"];
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
    //this.SearchData(this.page * this.limit, infiniteScroll);
    if (typeserach == 9){
      this.loaddata(this.page * this.limit, infiniteScroll);
    }else{
      this.SerachData(this.page * this.limit, infiniteScroll);
    }
    
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
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
     console.log(this.dataallarray);
   }

   selectDatasome(index,data,checked){
    //console.log(data,checked);
    if(checked){
      //console.log('not check');
      this.datasomearray = this.datasomearray.filter(item => item.po_recivedate !== data['po_recivedate'])
     }
     console.log(this.datasomearray);
   }

   async View(recivedate){
     let item = this.data.filter((val) => val.po_recivedate == recivedate);
     let itemsomedata = this.datasomearray.filter((val) => val.po_recivedate == recivedate);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Poassign02Page,
       cssClass: 'my-modal',
       componentProps:{recivedate:recivedate,itemsomedata:itemsomedata},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     if(role === 'somedata'){
      this.datasomearray = data;
      item[0].checksomedata = true;
     }
     
     //console.log(data,role);
    //  if(role === 'comfirm'){
    //    item[0].po_date = data[0]['po_date'];
    //    item[0].po_recivedate = data[0]['po_recivedate'];
    //    item[0].po_namewin = data[0]['po_namewin'];
    //    item[0].po_customer = data[0]['po_customer'];
    //    item[0].qty = data[0]['qty'];
    //    item[0].po_total = data[0]['po_total'];
    //  }else if(role === 'cancel'){
    //    item[0].po_statustext = data[0]['po_statustext'];
    //  }
   }

   submitForm(){
    console.log(this.dataallarray, this.datasomearray);
   
  }

}
