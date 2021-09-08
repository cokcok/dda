import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from "@ionic/angular";
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;

@Component({
  selector: 'app-pocfcupon03',
  templateUrl: './pocfcupon03.page.html',
  styleUrls: ['./pocfcupon03.page.scss'],
})
export class Pocfcupon03Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [9,1]; myarraytxtdate = [0];
  datePickerObj: any = {};search:boolean = false;
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private iab: InAppBrowser, private alertCtrl: AlertController) { }

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
      {id: 0,typeserch: 'วันที่มอบหมาย'},
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
    .getcfmanage('manage',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
         //console.log(data);
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

  getColor(value) {
    let _value = moment(value,'DD/MM/YYYY').isoWeekday();
    //console.log(_value);
    return this.configSv.colortxt[_value];
  }

  showImg(detail_id,name){
    let url = this.configSv.ip + 'po01/productdetail/' + detail_id + '/' +  name
    const browser = this.iab.create(url).show();
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

  async RestoreData(id,type){
    let item = this.data.filter((val) => val.assign_id == id);
    //console.log(item);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการคืนค่า',
      message: 'แน่ใจว่าต้องการคืนค่าสถานะใช่ไหม ? ',
      inputs: [
        {
          name: 'cause',
          placeholder: 'ระบุเหตุผลในการคืนค่าสถานะ',
        },
      ],
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
            // if(type === 'number'){
            //   item[0].assign_status = 0;
            //   item[0].assign_statustext = 'รอปักเลข';
            //   item[0].assignstatus_edit = true;
            // }
           if(data['cause']){
            this.sub = this.poSv.crudcfmanage(item, 'restore',data['cause'],type).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  if(type === 'number'){
                      item[0].assign_status = 0;
                      item[0].assign_statustext = 'รอปักเลข';
                      item[0].assignstatus_edit = true;
                  }else if(type === 'green'){
                      item[0].assign_status1 = 0;
                      item[0].assign_status1text = 'รอปักป้ายเขียว';
                      item[0].assignstatus1_edit = true;
                  }else if(type === 'install'){
                    item[0].assign_status2 = 0;
                    item[0].assign_status2text = 'รอประกอบ';
                    item[0].assignstatus2_edit = true;
                }
                  this.configSv.ChkformAlert(data.message);
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }              
              }, (error) => {
                console.log(JSON.stringify(error));
              }
            );
          } 
          else{
            this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการคืนค่าด้วย');
          }
        }
      }]
    });
    confirm.present();

  }

}
