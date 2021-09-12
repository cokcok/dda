import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Potf04Page} from '../potf04/potf04.page';
const moment = moment_;

@Component({
  selector: 'app-potf05',
  templateUrl: './potf05.page.html',
  styleUrls: ['./potf05.page.scss'],
})
export class Potf05Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  datePickerObj: any = {};
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
    this.ionicForm.controls['typeserch_id'].setValue(9);
    this.sub = this.poSv
    .getpotf_cfwin('read_storefront',this.ionicForm.value,padding)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data.data_detail);
        this.data =  data.data_detail.map((item) => Object.assign({}, item));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }
  
  async View(recivedate){
    let item = this.data.filter((val) => val.po_recivedate == recivedate);
    //console.log(item);
    const modal = await this.modalCtrl.create({
      component:Potf04Page,
      cssClass: 'my-modal',
      componentProps:{recivedate:recivedate,view:'view'},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      //console.log(data);
      if( data[0]['countcf'] > 0 || data[0]['counterr'] > 0 ){ 
        item[0].countid = item[0].countid - (Number(data[0]['countcf']) + Number(data[0]['counterr']));
        item[0].countsus = Number(item[0].countsus) + Number(data[0]['countcf']);
        item[0].counterr = Number(item[0].counterr) + Number(data[0]['counterr']);
      }
     }
  }


  SearchData(padding: number,  infiniteScroll?){
    if(padding == 0){this.data = []};
    this.ionicForm.controls['typeserch_id'].setValue(0);
    this.sub = this.poSv
    .getpotf_cfwin('read_storefront',this.ionicForm.value,padding)
    .subscribe((data) => {
      if (data !== null) {
        this.data =  data.data_detail.map((item) => Object.assign({}, item));
        this.maxdatalimit = this.data.length;
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;this.maxdatalimit =0;
      }
    });
  }
 
   
  }