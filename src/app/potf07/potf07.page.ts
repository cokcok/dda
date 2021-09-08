import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { PoSvService } from '../sv/po-sv.service';
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
import { saveAs } from 'file-saver';
const moment = moment_;

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
  selector: 'app-potf07',
  templateUrl: './potf07.page.html',
  styleUrls: ['./potf07.page.scss'],
})
export class Potf07Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch: any;typeserch:number = 9;
  myarraytxt = [1]; myarraytxtdate = [0];
  datePickerObj: any = {};
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();


  constructor(public configSv: ConfigService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private poSv: PoSvService) { }

  ngOnInit() {
   // this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      txtserach: ["",[Validators.required]],
      txtserach1: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
  }


  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'วันที่มอบหมายการส่ง'},
      {id: 1,typeserch: 'เลขที่ใบสั่งซื้อ'},
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
    .searchtfsummary(this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
         console.log(data.data_detail);
         this.data =  data.data_detail.map((item) => Object. assign({}, item));   
      }
    });
  }

  get_report(){
    var docDefinition = {
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: 'สรุปการส่ง', alignment: 'left' },
        {
          text: {
            function(currentPage, pageCount) {
              return currentPage.toString() + ' / ' + pageCount;
            }
          }, alignment: 'center'
        }
          , { text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), alignment: 'right' }
        ]
      },
      content: [
          this.getDataObject(),
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "tfsummary.pdf");
  }

  getDataObject(){
    const exs = [];
    this.data.forEach((element, index) => {
      if( element['mtd_shipping_id'] === '1'){
        element['emp_detail'].forEach((element1, index1) => {
          if( exs.length === 0 ){
            exs.push(
              [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 3 },'',''], 
             ); 

          }else{
            exs.push(
              [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 3 ,pageBreak: "before"},'',''], 
             ); 
          }
          exs.push(
            [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
          )
          element1['po_detail'].forEach((element2, index2) => {
            exs.push(
              [
                { text: index2+1, alignment: 'center' },
                { text: element2['po_running'], alignment: 'center' },
                { text:  element2['postatus'], alignment: 'center' },
              ] //,pageBreak: "before"
            );
          });
        });
      }
      else
      {
        if( exs.length === 0 ){
          exs.push(
            [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] , style: 'tableHeader', alignment: 'center',colSpan: 3 },'',''],
          ); 
        }else{
          exs.push(
            [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] , style: 'tableHeader', alignment: 'center',colSpan: 3,pageBreak: "before" },'',''],
          ); 
        }
          exs.push(
            [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
          );
          element['po_detail'].forEach((element, index) => {
            exs.push(
              [
                {text: index+1, alignment: 'center' },
                {text: element['po_running'], alignment: 'center'},
                {text: element['postatus'], alignment: 'center'},
              ] 
            );
          });  
      }
      // if( element['emp_detail'] != null   ){
      //   exs.push(
      //     [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +  element['emp_detail'][index]['name'] , style: 'tableHeader', alignment: 'center',colSpan: 3 },'',''], 
      //   ); 
      // }else{
      //   exs.push(
      //     [{text: 'วันที่มอบหมาย ' +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] , style: 'tableHeader', alignment: 'center',colSpan: 3,pageBreak: "before" },'',''],
      //   ); 
      // }
      // exs.push(
      //   [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
      // )
     
      // if(element['emp_detail'] != null ){
      //   element['emp_detail'][index]['po_detail'].forEach((element1, index1) => {
      //     exs.push(
      //       [
      //         { text: index1+1, alignment: 'center' },
      //         { text: element1['po_running'], alignment: 'center' },
      //         { text:  element1['postatus'], alignment: 'center' },
      //       ] //,pageBreak: "before"
      //     );
      //   });
      // }
      // else{
      //   element['po_detail'].forEach((element, index) => {
      //     exs.push(
      //       [
      //         {text: index+1, alignment: 'center' },
      //         {text: element['po_running'], alignment: 'center'},
      //         {text: element['postatus'], alignment: 'center'},
      //       ] //,pageBreak: "after"
      //     );
      //   });
      // }
      //i++;
    });
   
   
    return {
      table: {
        widths: ['2%','*','*'],
        //widths: ['1.5%','25%','20%','7%','9%','25%','5%'],
       // headerRows: 1,
        //dontBreakRows: true,
        //keepWithHeaderRows: true, 
       // unbreakable: true,
        body: [
          ...exs
        ],
      }
    };
  }

}
