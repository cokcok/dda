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
      console.log(data);
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

}
