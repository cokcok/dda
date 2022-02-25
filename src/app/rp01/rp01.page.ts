import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import {RpSvService} from '../sv/rp-sv.service';
import { saveAs } from 'file-saver';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

//ต้องระบุตามชื่อของ ไฟล์ font
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
 }
@Component({
  selector: 'app-rp01',
  templateUrl: './rp01.page.html',
  styleUrls: ['./rp01.page.scss'],
})
export class Rp01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;

  currentYear= new Date().getFullYear() + 543;
  years: any = []; sub: Subscription; 
  data_rp = [];

  datePickerObj: any = {};
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();


  ArrayMonth = [
        {id: '01', text: 'มกราคม'},
        {id: '02', text: 'กุมภาพันธ์'},
        {id: '03', text: 'มีนาคม'},
        {id: '04', text: 'เมษายน'},
        {id: '05', text: 'พฤษภาคม'},
        {id: '06', text: 'มิถุนายน'},
        {id: '07', text: 'กรกฏาคม'},
        {id: '08', text: 'สิงหาคม'},
        {id: '09', text: 'กันยายน'},
        {id: '10', text: 'ตุลาคม'},
        {id: '11', text: 'พฤศจิกายน'},
        {id: '12', text: 'ธันวาคม'},
  ];

  constructor(public formBuilder: FormBuilder,public configSv: ConfigService,public rpSv: RpSvService,private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    for (let i = this.currentYear - 5; i <= this.currentYear ; i++) {
      this.years.push(i);
    }
    this.loadForm();this.fndate();
  }

  loadForm(){
    this.ionicForm = this.formBuilder.group({
      rp_type: ["", [Validators.required]],
      rp_type1: ["", [Validators.required]],
      txtdate: [],
      txtdate1: [],
      txtmonth:[],
      txtmonth1:[],
      txtyear:[],
      txtyear1:[],
    });
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
      // disabledDates: disabledDates,
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
  
  Checkvalid(data){
    //console.log(data);
    this.ionicForm.controls['txtdate'].setValidators(null);
    this.ionicForm.controls['txtdate1'].setValidators(null);
    this.ionicForm.controls['txtmonth'].setValidators(null);
    this.ionicForm.controls['txtmonth1'].setValidators(null);
    this.ionicForm.controls['txtyear'].setValidators(null);
    this.ionicForm.controls['txtyear1'].setValidators(null);
    this.ionicForm.controls['txtdate'].updateValueAndValidity();
    this.ionicForm.controls['txtdate1'].updateValueAndValidity();
    this.ionicForm.controls['txtmonth'].updateValueAndValidity();
    this.ionicForm.controls['txtmonth1'].updateValueAndValidity();
    this.ionicForm.controls['txtyear'].updateValueAndValidity();
    this.ionicForm.controls['txtyear1'].updateValueAndValidity();
    if(data == "0"){
      this.ionicForm.get('txtdate').setValidators(Validators.required);
      this.ionicForm.get('txtdate1').setValidators(Validators.required);
    }
    else if(data == "1"){
      this.ionicForm.get('txtmonth').setValidators(Validators.required);
      this.ionicForm.get('txtmonth1').setValidators(Validators.required);
      this.ionicForm.get('txtyear').setValidators(Validators.required);
      this.ionicForm.get('txtyear1').setValidators(Validators.required);
    } else if(data == "2"){
      this.ionicForm.get('txtyear').setValidators(Validators.required);
      this.ionicForm.get('txtyear1').setValidators(Validators.required);
    }
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  SearchData(){
    this.data_rp= []; 
    //console.log(this.ionicForm.value);
    this.sub = this.rpSv
    .searchdata_rp01(this.ionicForm.value)
    .subscribe((data) => {
      console.log(data);
      if (data !== null) {
          //console.log(data.data_detail);  
          this.DownloadPdf(data.data_detail);  
      }
      else
      {
        this.configSv.ChkformAlert('ไม่พบข้อมูล');
      }
    });
  }


  DownloadPdf(vdata) {
    // console.log(vdata);
    let items = [];
    let header_rp,header_rp1,header_rp2
    if(this.ionicForm.controls['rp_type1'].value === "0")
    {
      header_rp1 = this.ionicForm.controls['txtdate'].value + ' ถึง ' + this.ionicForm.controls['txtdate1'].value;
      if(this.ionicForm.controls['rp_type'].value === "number")
      {
        header_rp = '[งานปักตัวเลข]';
        header_rp2 = 'ตัวเลข/สี';
      }
      else if(this.ionicForm.controls['rp_type'].value === "green")
      {
        header_rp = '[งานปักป้ายเขียว]';
        header_rp2 = 'ป้ายเขียว';
      }
      else if(this.ionicForm.controls['rp_type'].value === "install")
      {
        header_rp = '[งานประกอบ]';
        header_rp2 = 'สินค้า';
      }

    }
    else if(this.ionicForm.controls['rp_type1'].value === "1")
    {
      
      let headmonthtext = this.ArrayMonth.filter((val)=> val.id == this.ionicForm.controls['txtmonth'].value );
      let headmonthtext1 = this.ArrayMonth.filter((val)=> val.id == this.ionicForm.controls['txtmonth1'].value );
      header_rp1 = headmonthtext[0]["text"] + ' ' + this.ionicForm.controls['txtyear'].value + ' ถึง ' + headmonthtext1[0]["text"] + ' ' + this.ionicForm.controls['txtyear1'].value;
      if(this.ionicForm.controls['rp_type'].value === "number")
      {
        header_rp = '[งานปักตัวเลข]';
        header_rp2 = 'ตัวเลข/สี';
      }
      else if(this.ionicForm.controls['rp_type'].value === "green")
      {
        header_rp = '[งานปักป้ายเขียว]';
        header_rp2 = 'ป้ายเขียว';
      }
      else if(this.ionicForm.controls['rp_type'].value === "install")
      {
        header_rp = '[งานประกอบ]';
        header_rp2 = 'สินค้า';
      }
    }
    else if(this.ionicForm.controls['rp_type1'].value === "2")
    {
      header_rp1 = this.ionicForm.controls['txtyear'].value + ' ถึง '  + this.ionicForm.controls['txtyear1'].value;
      if(this.ionicForm.controls['rp_type'].value === "number")
      {
        header_rp = '[งานปักตัวเลข]';
        header_rp2 = 'ตัวเลข/สี';
      }
      else if(this.ionicForm.controls['rp_type'].value === "green")
      {
        header_rp = '[งานปักป้ายเขียว]';
        header_rp2 = 'ป้ายเขียว';
      }
      else if(this.ionicForm.controls['rp_type'].value === "install")
      {
        header_rp = '[งานประกอบ]';
        header_rp2 = 'สินค้า';
      }
    }
    items = vdata.map(function (item) {
      return [
        {text : item.seq,alignment: 'center'},
        {text : item.podetail_number,alignment: 'center'}, 
        {text: item.c_count,alignment: 'center'}, 
        {text: item.assign_status_date,alignment: 'center'}
      ];
    });
     var docDefinition = {
       pageSize: 'A4',
       pageMargins: [ 10,30,10,10 ],
       header: {
        margin: [5,5,5,5],
        columns: [{
          table: {
            widths: ['20%','60%', '20%'],
            body: [
              [
              {text: header_rp, alignment: 'left'},
              {text: header_rp1,style: 'header'},
              {text: this.currentDate + ' ' + this.currentTime , alignment: 'right'}
              ],
            ]
            }, layout: 'noBorders'
        }]
       },
        content: [
           {
            columns: [
              { width: '20%', text: '' },
              {
              width: '70%',
              table: {
                headerRows: 1,
                widths: ['5%','40%','20%','20%'],
                body: [
                  [{ text: '#', style: 'tableHeader' },
                  { text: header_rp2, style: 'tableHeader' },
                  { text: 'จำนวน', style: 'tableHeader' },
                  { text: 'ช่วงเวลา', style: 'tableHeader' },
                  ] //Head column
                ].concat(items) // detail data
              }
            },
            { width: '0%', text: '' },
          ]
          } 
       ],
       styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center'
        },
        tableHeader: {
          //fontSize: 15,
          alignment: 'center',
          bold: true,
        }
      },
       defaultStyle: {
         font: 'THSarabunNew'
       }
     }
     this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "green.pdf");
   }



}
