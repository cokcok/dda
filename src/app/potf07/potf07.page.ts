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
  data = []; page = 0;maxpadding:number;limit = 50;  data_tf = [];
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
      typeserch_id : ["",[Validators.required]],
      txtserach: [],
      txtserach1: [],
      txtserach_send :[],
      txtserach1_send :[],
      // txtserach: ["",[Validators.required]],
      // txtserach1: ["",[Validators.required]],
    }); 
    this.loaddata_typeserch();this.fndate();
  }


  loaddata_typeserch(){
    this.portssearch = [
      {id: 0,typeserch: 'ก่อนส่ง'},
      {id: 1,typeserch: 'หลังส่ง'},
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
    this.typeserch = port['id'];
    if(this.typeserch === 0){
      this.ionicForm.get('txtserach').setValidators(Validators.required);
      this.ionicForm.get('txtserach1').setValidators(Validators.required);
      this.ionicForm.get('txtserach_send').setValidators(null);
      this.ionicForm.get('txtserach1_send').setValidators(null);
    }else{
      this.ionicForm.get('txtserach_send').setValidators(Validators.required);
      this.ionicForm.get('txtserach1_send').setValidators(Validators.required);
      this.ionicForm.get('txtserach').setValidators(null);
      this.ionicForm.get('txtserach1').setValidators(null);
    }
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

  SearchData(padding){
    this.data= []; this.data_tf = [];
    this.sub = this.poSv
    .searchtfsummary(this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
         //console.log(data.data_detail);
         this.data =  data.data_detail.map((item) => Object. assign({}, item));   
      }
    });
  }

  get_report(data,type){
    let head;
   
    if(type === 'before')
    {
      head = 'สรุปการส่ง(ก่อน)';
    }
    else
    {
      head = 'สรุปการส่ง(หลัง)';
    }
    var docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: head , alignment: 'left' },
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
     
          this.getDataObject(data,type),
         
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "tfsummary.pdf");
  }

  getDataObject(data,type){
    const exs = [];
    let head;
    if(type === 'before')
    {
      head = 'วันที่มอบหมาย ';
    }
    else
    {
      head = 'วันที่ส่ง ';
    }
    data.forEach((element, index) => {
      if( element['mtd_shipping_id'] === '1'  ){
        element['emp_detail'].forEach((element1, index1) => {
          if( exs.length === 0 ){
            exs.push(
              [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 16 },'','','','','','','','','','','','','','',''], 
             ); 

          }else{
            exs.push(
              [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 16 ,pageBreak: "before"},'','','','','','','','','','','','','','',''], 
             ); 
          }
      

          exs.push(
            [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'},{text: 'ผู้ขาย', style: 'tableHeader', alignment: 'center'},{text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'},{text: 'เขต', style: 'tableHeader', alignment: 'center'},{text: 'สินค้า', style: 'tableHeader', alignment: 'center'},{text: 'ขนาด', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์', style: 'tableHeader', alignment: 'center'},{text: 'สี', style: 'tableHeader', alignment: 'center'},{text: 'ราคา', style: 'tableHeader', alignment: 'center'},{text: 'ค่ามัดจำ', style: 'tableHeader', alignment: 'center'},{text: 'สินค้าอื่นๆ', style: 'tableHeader', alignment: 'center'},{text: 'ลูกค้า', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์โทร', style: 'tableHeader', alignment: 'center'},{text: 'หมายเหตุ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
          );
          
          element1['po_detail'].forEach((element2, index2) => {
            exs.push(
              [
                { text: index2+1, alignment: 'center' },
                { text: element2['po_running'], alignment: 'center' },
                { text: element2['nickname'], alignment: 'center' },
                { text: element2['po_namewin'], alignment: 'center' },
                { text: element2['area_name'], alignment: 'center' },
                { text: element2['product_name'], alignment: 'center' },
                { text: element2['size'], alignment: 'center' },
                { text: element2['podetail_number'], alignment: 'center' },
                { text: element2['colorfront'], alignment: 'center' },
                { text: element2['po_total'], alignment: 'center' },
                { text: element2['po_deposit'], alignment: 'center' },
                { text: element2['product_other'], alignment: 'center' },
                { text: element2['po_customer'], alignment: 'center' },
                { text: element2['po_customer_tel'], alignment: 'center' },
                { text: element2['podetail_comment'], alignment: 'center' },
                { text:  element2['postatus'], alignment: 'center' },
              ] //,pageBreak: "before"
            );
          });

          element1['po_sum'].forEach((element3, index3) => {
            exs.push(
              [
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:'', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: 'รวม', alignment: 'center' },
                { text: element3['sumtotal'], alignment: 'center' },
                { text: element3['sumdeposit'], alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:  '', alignment: 'center' },
              ] //,pageBreak: "before"  
              );
          });


        });
      }
      else
      {
        if( exs.length === 0 ){
          exs.push(
            [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc']  , style: 'tableHeader', alignment: 'center',colSpan: 16 },'','','','','','','','','','','','','','',''], 
           ); 
        }else{
          exs.push(
            [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc']  , style: 'tableHeader', alignment: 'center',colSpan: 16,pageBreak: "before" },'','','','','','','','','','','','','','',''], 
           ); 
        }
         
        exs.push(
          [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'},{text: 'ผู้ขาย', style: 'tableHeader', alignment: 'center'},{text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'},{text: 'เขต', style: 'tableHeader', alignment: 'center'},{text: 'สินค้า', style: 'tableHeader', alignment: 'center'},{text: 'ขนาด', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์', style: 'tableHeader', alignment: 'center'},{text: 'สี', style: 'tableHeader', alignment: 'center'},{text: 'ราคา', style: 'tableHeader', alignment: 'center'},{text: 'ค่ามัดจำ', style: 'tableHeader', alignment: 'center'},{text: 'สินค้าอื่นๆ', style: 'tableHeader', alignment: 'center'},{text: 'ลูกค้า', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์โทร', style: 'tableHeader', alignment: 'center'},{text: 'หมายเหตุ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
        );


          element['po_detail'].forEach((element, index) => {
            exs.push(
              [
                { text: index+1, alignment: 'center' },
                { text: element['po_running'], alignment: 'center' },
                { text: element['nickname'], alignment: 'center' },
                { text: element['po_namewin'], alignment: 'center' },
                { text: element['area_name'], alignment: 'center' },
                { text: element['product_name'], alignment: 'center' },
                { text: element['size'], alignment: 'center' },
                { text: element['podetail_number'], alignment: 'center' },
                { text: element['colorfront'], alignment: 'center' },
                { text: element['po_total'], alignment: 'center' },
                { text: element['po_deposit'], alignment: 'center' },
                { text: element['product_other'], alignment: 'center' },
                { text: element['po_customer'], alignment: 'center' },
                { text: element['po_customer_tel'], alignment: 'center' },
                { text: element['podetail_comment'], alignment: 'center' },
                { text:  element['postatus'], alignment: 'center' },
              ] //,pageBreak: "before"
            );
          });

          element['po_sum'].forEach((element3, index3) => {
            exs.push(
              [
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:'', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: 'รวม', alignment: 'center' },
                { text: element3['sumtotal'], alignment: 'center' },
                { text: element3['sumdeposit'], alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:  '', alignment: 'center' },
              ] //,pageBreak: "before"  
              );
          });

        }
    });
   
   
    return {
      table: {
        widths: ['2%','7.4%','4%','10%','10%','10%','3%','2.4%','5%','5.5%','5%','10%','6.2%','6%','9%','5%'],
        //widths: ['1.5%','25%','20%','7%','9%','25%','5%'],
        //headerRows: 2,
        //dontBreakRows: true,
        //keepWithHeaderRows: true, 
       // unbreakable: true,
        body: [
          ...exs
        ],
      }
    };
  }


  SearchData_Send(padding){
    this.data= []; this.data_tf = [];
    this.sub = this.poSv
    .searchtfsummary_tf(this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
         //console.log(data.data_detail);
         this.data_tf =  data.data_detail.map((item) => Object. assign({}, item));   
      }
    });
  }

  get_reporttf(data,type){
    let head;
   
    if(type === 'before')
    {
      head = 'สรุปการส่ง(ก่อน)';
    }
    else
    {
      head = 'สรุปการส่ง(หลัง)';
    }
    var docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: head , alignment: 'left' },
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
     
          this.getDataObject_tf(data,type),
         
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "tfsummary.pdf");
  }

  getDataObject_tf(data,type){
    const exs = [];
    let head;
    if(type === 'before')
    {
      head = 'วันที่มอบหมาย ';
    }
    else
    {
      head = 'วันที่ส่ง ';
    }
    data.forEach((element, index) => {
      //if( element['mtd_shipping_id'] === '1'  ){
        element['emp_detail'].forEach((element1, index1) => {
          if( exs.length === 0 ){
            exs.push(
              [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 16 },'','','','','','','','','','','','','','',''], 
             ); 

          }else{
            exs.push(
              [{text: head +  element['transferdate'] + ' ประเภทการส่ง ' + element['shipping_desc'] + ' ผู้ส่ง  ' +   element1['name'] , style: 'tableHeader', alignment: 'center',colSpan: 16 ,pageBreak: "before"},'','','','','','','','','','','','','','',''], 
             ); 
          }
          // exs.push(
          //   [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'},{text: 'ผู้ขาย', style: 'tableHeader', alignment: 'center'},{text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'},{text: 'เขต', style: 'tableHeader', alignment: 'center'},{text: 'สินค้า', style: 'tableHeader', alignment: 'center'},{text: 'ขนาด', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์', style: 'tableHeader', alignment: 'center'},{text: 'สี', style: 'tableHeader', alignment: 'center'},{text: 'ราคา', style: 'tableHeader', alignment: 'center'},{text: 'ค่ามัดจำ', style: 'tableHeader', alignment: 'center'},{text: 'สินค้าอื่นๆ', style: 'tableHeader', alignment: 'center'},{text: 'ลูกค้า', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์โทร', style: 'tableHeader', alignment: 'center'},{text: 'หมายเหตุ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
          // )
            // element1['po_detail'].forEach((element2, index2) => {
          //   exs.push(
          //     [
          //       { text: index2+1, alignment: 'center' },
          //       { text: element2['po_running'], alignment: 'center' },
          //       { text: element2['po_date'], alignment: 'center' },
          //       { text: element2['nickname'], alignment: 'center' },
          //       { text: element2['po_namewin'], alignment: 'center' },
          //       { text: element2['area_name'], alignment: 'center' },
          //       { text: element2['product_name'], alignment: 'center' },
          //       { text: element2['podetail_number'], alignment: 'center' },
          //       { text: element2['size'], alignment: 'center' },
          //       { text: element2['product_other'], alignment: 'center' },
          //       { text: element2['po_total'], alignment: 'center' },
          //       { text: element2['po_customer_tel'], alignment: 'center' },
          //       { text: element2['po_recivedate'], alignment: 'center' },
          //       { text: element2['podetail_comment'], alignment: 'center' },
          //       { text:  element2['postatus'], alignment: 'center' },
          //     ] //,pageBreak: "before"
          //   );
          // });

          exs.push(
            [{text: '#', style: 'tableHeader', alignment: 'center'},{text: 'เลขที่ใบสั่งซื้อ', style: 'tableHeader', alignment: 'center'},{text: 'ผู้ขาย', style: 'tableHeader', alignment: 'center'},{text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'},{text: 'เขต', style: 'tableHeader', alignment: 'center'},{text: 'สินค้า', style: 'tableHeader', alignment: 'center'},{text: 'ขนาด', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์', style: 'tableHeader', alignment: 'center'},{text: 'สี', style: 'tableHeader', alignment: 'center'},{text: 'ราคา', style: 'tableHeader', alignment: 'center'},{text: 'ค่ามัดจำ', style: 'tableHeader', alignment: 'center'},{text: 'สินค้าอื่นๆ', style: 'tableHeader', alignment: 'center'},{text: 'ลูกค้า', style: 'tableHeader', alignment: 'center'},{text: 'เบอร์โทร', style: 'tableHeader', alignment: 'center'},{text: 'หมายเหตุ', style: 'tableHeader', alignment: 'center'}, {text: 'สถานะ', style: 'tableHeader', alignment: 'center'}]
          );
        

          element1['po_detail'].forEach((element2, index2) => {
            exs.push(
              [
                { text: index2+1, alignment: 'center' },
                { text: element2['po_running'], alignment: 'center' },
                { text: element2['nickname'], alignment: 'center' },
                { text: element2['po_namewin'], alignment: 'center' },
                { text: element2['area_name'], alignment: 'center' },
                { text: element2['product_name'], alignment: 'center' },
                { text: element2['size'], alignment: 'center' },
                { text: element2['podetail_number'], alignment: 'center' },
                { text: element2['colorfront'], alignment: 'center' },
                { text: element2['po_total'], alignment: 'center' },
                { text: element2['po_deposit'], alignment: 'center' },
                { text: element2['product_other'], alignment: 'center' },
                { text: element2['po_customer'], alignment: 'center' },
                { text: element2['po_customer_tel'], alignment: 'center' },
                { text: element2['podetail_comment'], alignment: 'center' },
                { text:  element2['postatus'], alignment: 'center' },
              ] //,pageBreak: "before"
            );
          });

          element1['po_sum'].forEach((element3, index3) => {
            exs.push(
              [
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:'', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: 'รวม', alignment: 'center' },
                { text: element3['sumtotal'], alignment: 'center' },
                { text: element3['sumdeposit'], alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text: '', alignment: 'center' },
                { text:  '', alignment: 'center' },
              ] 
              );
          });  

        });
    });
   
   
    return {
      table: {
        //widths: ['2%','8%','6.2%','4%','10%','10%','*','3%','3%','*','6%','6.2%','6.2%','6%','5%'],
        widths: ['2%','7.4%','4%','10%','10%','10%','3%','2.4%','5%','5.5%','5%','10%','6.2%','6%','9%','5%'],
        body: [
          ...exs
        ],
      }
    };
  }


}
