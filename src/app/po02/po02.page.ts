import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;

@Component({
  selector: 'app-po02',
  templateUrl: './po02.page.html',
  styleUrls: ['./po02.page.scss'],
})
export class Po02Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding = 0;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,2,3]; myarraytxtdate = [0,1];
  datePickerObj: any = {};
  constructor( public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      txtserach: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
    this.loaddata(this.page);
  }

  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    console.log(padding,this.data);
    this.sub = this.poSv
    .getpo(this.ionicForm.value,padding,10)
    .subscribe((data) => {
      if (data !== null) {
        console.log(data);
        this.maxpadding = data["maxpadding"];
        datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
        console.log( this.data);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
        
      }
    });
  }


  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'วันที่สั่งซื้อ'},
      {id: 1,typeserch: 'วันที่รับ'},
      {id: 2,typeserch: 'ชื่อวิน'},
      {id: 3,typeserch: 'ชื่อลูกค้า'},
    ];
    //console.log(this.ports);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    //console.log(port,port['id']);
    this.typeserch = port['id'];
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

  SearchData(padding,infiniteScroll?){
    this.sub = this.poSv
    .getpo(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        console.log(data);
         this.maxpadding = data["maxpadding"];
         this.maxdatalimit = data["limit"];
         this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
         if (infiniteScroll) {
           infiniteScroll.target.complete();
         }
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    //console.log( this.page);
    //this.SearchData(this.page * this.limit, infiniteScroll);
     this.loaddata(this.page * 10, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }
  
}
