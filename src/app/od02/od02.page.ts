import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import {OdSvService} from '../sv/od-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Od01Page} from '../od01/od01.page';
const moment = moment_;

@Component({
  selector: 'app-od02',
  templateUrl: './od02.page.html',
  styleUrls: ['./od02.page.scss'],
})
export class Od02Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,1,2]; myarraytxtdate = [0];
  datePickerObj: any = {};

  constructor(public configSv: ConfigService,private poSv: PoSvService,private odSv: OdSvService,  public formBuilder: FormBuilder,private modalCtrl:ModalController) { }

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
      {id: 0,typeserch: 'วันที่สั่งของ'},
      {id: 1,typeserch: 'ชื่อร้านค้า'},
      {id: 2,typeserch: 'เลขที่ใบสั่งของ'},
    ];
    //console.log(this.ports);
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

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    //console.log(port,port['id']);
    this.typeserch = port['id'];
  }

  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    //console.log(padding,this.data);
    if(padding == 0){this.data = []};
    this.sub = this.odSv
    .getod(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data);
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

  doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  async View(id,od_running){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Od01Page,
       cssClass: 'my-modal',
       componentProps:{id:id,od_running:od_running},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'comfirm'){ 
       item[0].od_date = data[0]['od_date'];
       item[0].supply_name = data[0]['supply_name'];
       item[0].countod = data[0]['countod'];
       item[0].total = data[0]['total'];
       item[0].vat = data[0]['vat'];
       item[0].sumtotal = data[0]['sumtotal'];
     }else if(role === 'cancel'){
       item[0].od_statustext = data[0]['od_statustext']; 
       item[0].od_status = 3; 
     }
   }

}
 