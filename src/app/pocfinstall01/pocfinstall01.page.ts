
import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms"; 
import * as moment_ from 'moment';
import 'moment/locale/th';
import { Pocfinstall02Page } from './../pocfinstall02/pocfinstall02.page';
const moment = moment_;


@Component({
  selector: 'app-pocfinstall01',
  templateUrl: './pocfinstall01.page.html',
  styleUrls: ['./pocfinstall01.page.scss'],
})
export class Pocfinstall01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  datePickerObj: any = {}; typesearch:boolean = false;
  array_status = ['0','2'];
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      po_assigndate:[ "" ,[Validators.required]],
      po_todaydate:[ moment().format('DD/MM/YYYY')],
      typeserach:[],
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
    .getcfinstall('read',this.ionicForm.value)
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

  SearchData(){
    this.typesearch = true;
    this.sub = this.poSv
    .getcfinstall('search',this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
        this.data =  data.data_detail.map((item) => Object.assign({}, item));
      }else{
        this.data = [];
      }
    });
  }

  async View(id,assign_date,seq,total){
    let item = this.data.filter((val) => val.id == id);
    const modal = await this.modalCtrl.create({
      component:Pocfinstall02Page,
      cssClass: 'my-modal',
      componentProps:{id:id,assign_date:assign_date,seq:seq,total:total},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    if(role === 'confirm'){
      if( typeof data != 'undefined'){ 
        item[0].po_assign_status = String(data);
        item[0].po_statustext = this.configSv.installalltxt[data];
      }
     }
  }

}