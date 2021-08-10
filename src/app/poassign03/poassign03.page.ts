import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import {Poassign04Page} from '../poassign04/poassign04.page';

import * as moment_ from 'moment';
import 'moment/locale/th';
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
  selector: 'app-poassign03',
  templateUrl: './poassign03.page.html',
  styleUrls: ['./poassign03.page.scss'],
})
export class Poassign03Page implements OnInit {
  ionicForm: FormGroup; isSubmitted = false;
  data = []; page = 0; maxpadding: number; limit = 50;
  sub: Subscription; maxdatalimit = 0; filterTerm: string;
  datePickerObj: any = {};
  // currentDate = new Date().toLocaleDateString();
  // currentTime = new Date().toLocaleTimeString();
 // colortxt = ['#000000', '#ffff00', '#FF00F3', '#008000', '#ffa500', '#87ceeb', '#800080', '#ff0000'];
  constructor(public configSv: ConfigService, private poSv: PoSvService, public formBuilder: FormBuilder, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      txtserach: [moment().format('DD/MM/YYYY'), [Validators.required]],
    });
    this.fndate(); this.loaddata(0);
    //console.log(this.currentDate,this.currentTime);
    //this.xx();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate() {
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
      weeksList: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
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

  loaddata(padding: number, infiniteScroll?) {
    if (padding == 0) { this.data = [] };
    this.sub = this.poSv
      .getpoassign('readassign', this.ionicForm.value, padding, this.limit)
      .subscribe((data) => {
        if (data !== null) {
          this.maxpadding = data["maxpadding"];
          this.maxdatalimit = data["limit"];
          this.data = this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        } else {
          this.data = [];
          this.maxpadding = 0; this.maxdatalimit = 0;
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

  PrintData(id) {
    //console.log(id);
    this.sub = this.poSv
      .getpoassignreport('cupon', id)
      .subscribe((data) => {
        if (data !== null) {
          this.DownloadPdf(data.data_detail);
          //console.log(this.getDataObject(data.data_detail));
        } 
      });
  }

  DownloadPdf(vdata) {
    //console.log(vdata);
    var docDefinition = {
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: 'คูปอง', alignment: 'left' },
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
        [{
          columns: [
            this.getDataObject(vdata, 'odd'),
            this.getDataObject(vdata, 'even'),
          ]
        }],
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "cupon.pdf");
  }

 
  getDataObject(vdata, type) {
    let data;
    if (type === 'odd') {
      data = vdata.filter((value, index) => index % 2 === 0);
    } else if (type === 'even') {
      data = vdata.filter((value, index) => index % 2 === 1);
    }
    
    if(data.length === 0){
      data.push({
        po_running : "" ,
        name : "" ,
        po_customer_tel : "" ,
        po_date : "" ,
        po_namewin : "" ,
        area_name : "" ,
        product_name : "" ,
        size : "" ,
        podetail_comment : "" ,
        po_recivedate : "" ,
        podetail_number : "" ,
        colorfront : "" ,
        colorback : "" ,
        pic : "" ,
        etc : "" ,
        po_statustxt : "" ,
      });
    }
    const exs = [];
    data.forEach((element, index) => {
      //console.log(element);
      // let a = moment(element['po_recivedate']).format("DD/MM/YYYY")
      // console.log(element['po_recivedate'], a,moment(a).isoWeekday(),moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday());
      //moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday();
      let head1,head2;
      if(element['assign_type'] === '0'){
        head1 = 'วันสั่งซื้อ: ';
        head2 = 'สถานะใบสั่งซื้อ: ';
      }else{
        head1 = 'วันเปลี่ยน: ';
        head2 = 'สถานะใบเปลี่ยน: ';
      }
      exs.push(
        [
          {
            border: [true, true, false, false],
            text: element['po_running']
          },
          {
            border: [false, true, false, false],
            text: 'ผู้ขาย: ' + element['name']
          },
          {
            border: [false, true, false, false],
            text: 'Tel: ' + element['po_customer_tel']
          },
          {
            border: [false, true, true, false],
            text: head1 + element['po_date']
          },
        ],
        [
          {
            colSpan: 2,
            border: [true, false, false, false],
            text: element['po_namewin']
          },'',{
            border: [false, false, false, false],
            text: 'เขต: ' + element['area_name']
          },{
            border: [false, false, true, false],
            text: 'เบอร์/สี: ' +  element['podetail_number'] + '/' + element['colorfront'] + '-' + element['colorback']
          }
        ],
        [
          {
            colSpan: 2,
            border: [true, false, false, false],
            text:  element['product_name']
          },'',{
            border: [false, false, false, false],
            text: 'ขนาด: ' + element['size']
          },{
            border: [false, false, true, false],
            fillColor: this.configSv.colortxt[moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday()],
            text: 'วันนัดรับ: ' +  element['po_recivedate'] 
          }
        ],
        [
          {
            colSpan: 3,
            border: [true, false, false, false],
            text:  'สินค้าอื่น: ' + element['etc']
          },'','',{
            border: [false, false, true, false],
            text: head2 + element['po_statustxt'] 
          },
        ],
        [
          {
            colSpan: 3,
            border: [true, false, false, true],
            text:  'หมายเหตุ: ' + element['podetail_comment']
          },'','',{
            border: [false, false, true, true],
            text: element['pic'] 
          },
        ],
      );
    });

    return {
      table: {
        widths: ['20%','20%','30%','30%'],
        //margin: [20, 20, 20, 20],
        //heights: [20, 20, 20,20],
        body: [
          ...exs
        ],
     
      }
    };
  }


  PrintData_Green(id,seq,assign_date) {
    //console.log(id);
    this.sub = this.poSv
      .getpoassignreport('green', id)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data);
          this.DownloadPdf1(data.data_detail,seq,assign_date);
          //console.log(this.getDataObject(data.data_detail));
        }else{
          this.configSv.ChkformAlert('ไม่พบข้อมูล');
        } 
      });
  }

  DownloadPdf1(vdata,seq,assign_date) {
   // console.log(vdata);
    let items = [];
   var self = this;
    items = vdata.map(function (item) {
      return [item.seq, item.po_namewin, item.area_name, { text: item.countid, alignment: 'center' }, {  fillColor: self.configSv.colortxt[moment(item.po_recivedate,'DD/MM/YYYY').isoWeekday()],text:item.po_recivedate } ,item.detail,{ text: item.status_greendup, alignment: 'center' }];
    });
    //console.log(vdata,items);
    var docDefinition = {
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: 'ป้ายเขียว', alignment: 'left' },
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
          this.getDataObjectGreen(vdata,seq,assign_date),
          //console.log(this.getDataObjectGreen(vdata))
      ],
      // content: [
      //   {
      //     style: 'tableExample',
      //     table: {
      //       widths: ['1.5%','20%','17%','7%','9%','*','5%'], //headerRows: 2,
      //       headerRows: 2,
      //       body: [
      //         [{text: 'รายชื่อวิน-ส่งปัก ปักที่ร้าน', style: 'tableHeader', colSpan: 3, alignment: 'center'},'','', { text: 'วันที่มอบหมายของวันที่ ' + assign_date +' ครั้งที่ ' + seq, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '',''],
      //         [{text: '#', style: 'tableHeader', alignment: 'center'}, {text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'}, {text: 'เขต', style: 'tableHeader', alignment: 'center'}, {text: 'จำนวนปัก', style: 'tableHeader', alignment: 'center'}, {text: 'วันนัดรับ', style: 'tableHeader', alignment: 'center'},{text: 'รายละเอียด', style: 'tableHeader', alignment: 'center'}, {text: 'ป้ายซ้ำ', style: 'tableHeader', alignment: 'center'}],
      //       ].concat( items)// detail data
      //     },
      //     pageBreak: "after",
          
      //   },
       
      // ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "green.pdf");
  }


  async ViewData(id,seq,assign_date,total){
    let item = this.data.filter((val) => val.id == id);
    const modal = await this.modalCtrl.create({
      component:Poassign04Page,
      cssClass: 'my-modal',
      componentProps:{id:id,assign_date:assign_date,seq:seq,total:total},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    // if(role === 'somedata'){
    //  this.datasomearray = data;
    //  item[0].checksomedata = true;
    // }
    if(role === 'delete'){
      //console.log(data,data[0]['id']);
      if(data[0]['id'] === 'all'){
        this.data = this.data.filter(obj => obj.id !== id);
        this.maxdatalimit = this.maxdatalimit - 1;
      }else{
        item[0].total  = data[0]['id'];
      }
    }
  }


  getDataObjectGreen(vdata,seq,assign_date){
    //console.log(vdata);
    const exs = [];
    exs.push(
      [{text: 'รายชื่อวิน-ส่งปัก ปักที่ร้าน', style: 'tableHeader', colSpan: 3, alignment: 'center'},'','', { text: 'วันที่มอบหมายของวันที่ ' + assign_date +' ครั้งที่ ' + seq, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '',''],
      [{text: '#', style: 'tableHeader', alignment: 'center'}, {text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'}, {text: 'เขต', style: 'tableHeader', alignment: 'center'}, {text: 'จำนวนปัก', style: 'tableHeader', alignment: 'center'}, {text: 'วันนัดรับ', style: 'tableHeader', alignment: 'center'},{text: 'รายละเอียด', style: 'tableHeader', alignment: 'center'}, {text: 'ป้ายซ้ำ', style: 'tableHeader', alignment: 'center'}],
    );

    let po_recivedate = null;

    vdata.forEach((element, index) => {
      if(element['pagebreak'] === 'false' ){
        exs.push(
          [
            { text: element['seq'] },
            { text: element['po_namewin'] },
            { text: element['area_name'] },
            { text: element['countid'], alignment: 'center' },
            {  text:element['po_recivedate'] },
            { text: element['detail'] },
            { text: element['status_greendup'], alignment: 'center'},
            //{ text: element['status_greendup'], alignment: 'center',pageBreak: "after"},
            //{ pageBreak: "after" },
          ],
          // [
          //   '',this.getdataDetail(element['detail']),'','','','','',
          //   //{ text: this.getdataDetail(element['detail']) },'','','','','','',
          // ]
        )
      }
      else
      {
        exs.push(
          [
            { text: element['seq'] },
            { text: element['po_namewin'] },
            { text: element['area_name'] },
            { text: element['countid'], alignment: 'center' },
            {  text:element['po_recivedate'] },
            { text: element['detail'] },
            { text: element['status_greendup'], alignment: 'center',pageBreak: "after"},
          ],
        )
      }
      po_recivedate = element['po_recivedate'];
    });
    return {

      table: {
        widths: ['1.5%','20%','17%','7%','9%','*','5%'],
        headerRows: 2,
       // dontBreakRows: true,
       // keepWithHeaderRows: true, 
       // unbreakable: true,
        body: [
          ...exs
        ],
     
      }

    };
  }

  getdataDetail(vdata){
    const exs1 = [];
    vdata.forEach((element, index) => {
      exs1.push(
        [  { text: element['nickname'] }]
      );
    });

    return {
      table: {
       // widths: ['auto','auto','auto','auto','auto','auto','auto'],
        body: [
          ...exs1
        ],
      }
    };
  }
  


  
}
