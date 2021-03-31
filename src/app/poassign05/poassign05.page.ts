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
  selector: 'app-poassign05',
  templateUrl: './poassign05.page.html',
  styleUrls: ['./poassign05.page.scss'],
})
export class Poassign05Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,1]; myarraytxtdate = [0];
  datePickerObj: any = {};search:boolean = false;
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      txtserach: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
    this.SearchData(0,false);
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


  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'วันที่ยกเลิก'},
      {id: 1,typeserch: 'ใบสั่งซื้อ'},
    ];
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

  SearchData(padding,search,infiniteScroll?){
    this.search=search;
    if(padding == 0){this.data = []};
    this.sub = this.poSv
    .getpoassigncancel('readassigncancel',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
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
      this.SearchData(this.page * this.limit,this.search, infiniteScroll);
    }
  }

}
