import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Po03Page} from '../po03/po03.page';

@Component({
  selector: 'app-po04',
  templateUrl: './po04.page.html',
  styleUrls: ['./po04.page.scss'],
})
export class Po04Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,1,2]; myarraytxtdate = [0];
  //postatuscolor1 = ['1','2','3','4'];
  //postatuscolor2 = ['5','7','8']; 
  datePickerObj: any = {};
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      txtserach: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
    this.loaddata(0);
  }

  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'วันที่สั่งซื้อ'},
      {id: 1,typeserch: 'ชื่อบริษัท'},
      {id: 2,typeserch: 'เลขที่ใบสั่งซื้อ'},
    ];
    //console.log(this.ports);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    let datalimit;
    this.sub = this.poSv
    .getto(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      //console.log(data);
      if (data !== null) {
        this.maxpadding = data["maxpadding"];
        datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
        //console.log( this.data);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }

  SearchData(padding,infiniteScroll?){
    if(padding == 0){this.data = []};
    this.sub = this.poSv
    .getto(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
         //console.log(data.data_detail);
         this.maxpadding = data["maxpadding"];
         this.maxdatalimit = data["limit"];
         this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
         if (infiniteScroll) {
           infiniteScroll.target.complete();
         }
      }else{
        this.maxpadding = 0;this.maxdatalimit=0;
        this.data = [];
      }
    });
    //console.log(this.data);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.SearchData(this.page * this.limit, infiniteScroll);
    }
  }

  async View(id,to_running,to_status){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Po03Page,
       cssClass: 'my-modal',
       componentProps:{id:id,to_running:to_running,to_status:to_status},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'comfirm'){
       item[0].to_date = data[0]['to_date'];
       item[0].company_name = data[0]['company_name'];
       item[0].total = data[0]['total'];
       item[0].vat = data[0]['vat'];
       item[0].sumtotal = data[0]['sumtotal'];
       item[0].qty = data[0]['qty'];
       item[0].todetail = data[0]['todetail'];
      
     }else if(role === 'cancel'){
       item[0].to_statustext = data[0]['to_statustext']; 
       item[0].to_status = 2; 
     }
   }


   async transport(id,to_running,to_status){
    let item = this.data.filter((val) => val.id == id);
    //console.log(item);  
    const modal = await this.modalCtrl.create({
      component:Po03Page,
      cssClass: 'my-modal',
      componentProps:{id:id,to_running:to_running,to_status:to_status,mode:'transport'},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    //console.log(data,role);
   if(role === 'transport_confirm'){
      item[0].to_statustext = data[0]['to_statustext']; 
      item[0].to_status = 1; 
    }
   }


}
