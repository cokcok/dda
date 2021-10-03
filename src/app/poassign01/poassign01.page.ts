import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Poassign02Page} from '../poassign02/poassign02.page';
const moment = moment_;
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

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
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      typeserch_id: ["9"],
      txtserach: ["",[Validators.required]],
      po_assigndate:[ moment().format('DD/MM/YYYY') ,[Validators.required]],
      seq: [],
      dataall:[], 
      datasome:[],
      total: [],
      //tmpproduct_qty :[{value: 0,disabled: true}],
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
    .getpoassign('read',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data);
        this.maxpadding = data["maxpadding"];
        this.maxdatalimit = data["limit"];
        this.ionicForm.controls['seq'].setValue(data["seq"]);
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
    //if(this.tmptxtser == null){
    //  this.tmptxtser = this.ionicForm.controls['txtserach'].value;
   // }
    // if(this.tmptxtser != this.ionicForm.controls['txtserach'].value || padding == 0){
    //   this.data = [];
    // } 
    if(padding == 0){this.data = []};
    this.ionicForm.controls['typeserch_id'].setValue(0);
    this.sub = this.poSv
    .getpoassign('read',this.ionicForm.value,padding,this.limit)
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
      this.SearchData(this.page * this.limit, infiniteScroll);
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
     //console.log(this.dataallarray);
   }

   selectDatasome(index,data,checked){
    //console.log(data,checked);
    if(checked){
      //console.log('not check');
      this.datasomearray = this.datasomearray.filter(item => item.po_recivedate !== data['po_recivedate'])
     }
     //console.log(this.datasomearray);
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
    
   }

   async submitForm(){
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
    this.ionicForm.controls['datasome'].setValue(this.datasomearray);
    let total = 0;
    total = this.dataallarray.reduce((acc,current) => acc + Number(current.countsus), 0) + this.datasomearray.reduce((acc,current) => acc + Number(current.qty), 0);
    //console.log(total);
    this.ionicForm.controls['total'].setValue(total);
    console.log(this.ionicForm.value);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันข้อมูลในการบันทึก',
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
          .crudpoassign(this.ionicForm.value,'insert')
          .subscribe((data) => {
            if (data !== null) {
                if(data.status === 'ok'){
                  //this.refreshForm();
                this.configSv.ChkformAlert(data.message);
                this.dataallarray = [];this.datasomearray = [];
                this.loaddata(0);
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


  get_dataexcel(v_date){

    let data1 = {
      typeserch_id: {id:4},
      txtserach: v_date,
    }
   
    //console.log(data);

    this.sub = this.poSv
    .getpo_excel(data1,'readassign')
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

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'poassign' + this.currentDate + ' ' + this.currentTime + '.xlsx');

  }

  Update_status(po_recivedate){
    let data1 = {
      po_recivedate:po_recivedate
    }
   
    this.sub = this.poSv
    .crudpoassign(data1,'update')
    .subscribe((data) => {
      if (data !== null) {
          if(data.status === 'ok'){
           this.configSv.ChkformAlert(data.message);
           let item = this.data.filter((val) => val.po_recivedate == po_recivedate);
          
           if(data.id > 0){
            item[0]['countsus'] =  Number(item[0]['countsus']) + Number(data.id);
            item[0]['disable_checked'] = false;
           }
         // this.dataallarray = [];this.datasomearray = [];
           //this.loaddata(0);
          }
      }
    },
    (error) => {
      console.log(JSON.stringify(error));
    });


  }

}
