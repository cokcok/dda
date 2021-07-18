import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import {FxSvService} from '../sv/fx-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Fix01Page} from '../fix01/fix01.page';
import { utils, write, WorkBook } from 'xlsx';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';

const moment = moment_;

@Component({
  selector: 'app-fix02',
  templateUrl: './fix02.page.html',
  styleUrls: ['./fix02.page.scss'],
})
export class Fix02Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,2,3,5]; myarraytxtdate = [0,1];
  postatuscolor1 = ['1','2','3','4'];
  postatuscolor2 = ['5','7','8']; 
  datePickerObj: any = {};
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
  constructor(public configSv: ConfigService,private fxSv: FxSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      txtserach: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
    this.loaddata(this.page);
  }

  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'วันที่สั่งเปลี่ยน'},
      {id: 1,typeserch: 'วันที่รับ'},
      {id: 2,typeserch: 'ชื่อวิน'},
      {id: 3,typeserch: 'ชื่อลูกค้า'},
      {id: 5,typeserch: 'เลขที่ใบเปลี่ยน'},
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
    if(padding == 0){this.data = []};
    this.sub = this.fxSv
    .getfx(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      //console.log(data);
      if (data !== null) {
       
        this.maxpadding = data["maxpadding"];
        //datalimit = data["limit"];
        this.maxdatalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
        //console.log( this.data);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;this.maxdatalimit=0;
        this.data = [];
      }
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.typeserch = port['id'];
  }

  // SearchData(padding,infiniteScroll?){
  //   if(padding == 0){this.data = []};
  //   this.sub = this.fxSv
  //   .getfx(this.ionicForm.value,padding,this.limit)
  //   .subscribe((data) => {
  //     if (data !== null) {
  //       //console.log(data.data_detail);
  //        this.maxpadding = data["maxpadding"];
  //        this.maxdatalimit = data["limit"];
  //        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
  //        if (infiniteScroll) {
  //          infiniteScroll.target.complete();
  //        }
  //     }else{
  //       this.maxpadding = 0;this.maxdatalimit=0;
  //       this.data = [];
  //     }
  //   });
  //   //console.log(this.data);
  // }

  doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  async View(id,po_running){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Fix01Page,
       cssClass: 'my-modal',
       componentProps:{id:id,po_running:po_running,tmppostatus: item[0].po_status},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'comfirm'){
       item[0].po_date = data[0]['po_date'];
       item[0].po_recivedate = data[0]['po_recivedate'];
       item[0].po_namewin = data[0]['po_namewin'];
       item[0].po_customer = data[0]['po_customer'];
       item[0].po_customer_tel = data[0]['po_customer_tel'];
       item[0].qty = data[0]['qty'];
       item[0].po_total = data[0]['po_total'];
      //  if(data[0]['ponumberdetail'] != null){
      //    item[0].ponumberdetail = data[0]['ponumberdetail'];
      //  }
       if(data[0]['fixdetail'] != null){
        item[0].fixdetail = data[0]['fixdetail'];
       }
     }else if(role === 'cancel'){
       item[0].po_statustext = data[0]['po_statustext']; 
       item[0].po_status ='8'; 
     }
   }


   get_dataexcel(){
    this.sub = this.fxSv
    .getfx_excel(this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
         this.loadexcel( data.data_detail.map((item) => Object.assign({}, item)));
       
      }else{
        this.maxpadding = 0;this.maxdatalimit=0;
        this.data = [];
      }
    });

  }
  loadexcel(data) {

    if (data.length === 0) {
      this.configSv.ChkformAlert('ไม่พบข้อมูล');
      return false;
    }
    //console.log(data);
    const ws_name = 'sheetname';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    //const ws: any = utils.json_to_sheet(this.table);
    const ws: any = utils.json_to_sheet(data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, {
      bookType: 'xlsx', bookSST: true, type:
        'binary'
    });


    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'po' + this.currentDate + ' ' + this.currentTime + '.xlsx');




  }

}
