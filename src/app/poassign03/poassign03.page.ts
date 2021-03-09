import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
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
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString()//--แก้ตรงนี้
  constructor(public configSv: ConfigService, private poSv: PoSvService, public formBuilder: FormBuilder, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      txtserach: [moment().format('L'), [Validators.required]],
    });
    this.fndate(); this.loaddata(0);
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


  PrintData(id) {
    console.log(id);

    this.sub = this.poSv
      .getpoassignreport('cupon', this.ionicForm.value)
      .subscribe((data) => {
        if (data !== null) {

          this.DownloadPdf(data.data_detail);
          //console.log(this.getDataObject(data.data_detail));

        } else {
          this.data = [];
          this.maxpadding = 0; this.maxdatalimit = 0;
        }
      });


    // var docDefinition = {
    //   content: [
    //     { text: 'สวัสดีประเทศไทย reat pdf demo ', fontSize: 15 },
    //   ],
    //   defaultStyle:{
    //     font : 'THSarabunNew'
    //   }
    // };
    // //pdfMake.createPdf(docDefinition).open()
    // this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "HrReport.pdf");
  }

  DownloadPdf(vdata) {
    console.log(vdata);
    var docDefinition = {
      pageOrientation: 'landscape',
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
          , { text: this.currentDate + ' ' + this.currentTime, alignment: 'right' }
        ]
      },
      content: [
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
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
    //console.log(data);
    const exs = [];
    data.forEach((element, index) => {
      //console.log(element);
      // exs.push(
      //   [{
      //     columns: [
      //       [{
      //         text: element['po_running']
      //       },
      //       {
      //         rowSpan: 2,
      //         text: 'ชื่อวิน: ' + element['po_namewin']
      //       },
      //       {
      //          width: 100,
      //         text: 'สินค้า: ' + element['product_name']
      //       },
      //       {
      //         text: ''
      //       }],
      //       [{
      //         text: 'ผู้ขาย: ' + element['name']
      //       },
      //       {
      //         text: 'เขต: ' + element['area_name']
      //       },
      //       {
      //         text: 'ขนาด: ' + element['size']
      //       }
      //       ],
      //       [{
      //         text: 'Tel: ' + element['po_customer_tel']
      //       },
      //       {
      //         text: 'เบอร์: ' + element['podetail_number']
      //       }],
      //       [{
      //         text: 'วันรับ: ' + element['po_date']
      //       },
      //       {
      //         text: 'สี: ' + element['colorfront'] + '/' + element['colorback']
      //       }],
      //       [{
      //         text: 'วันที่ส่ง: ' + element['po_recivedate']
      //       }]
      //     ],columnGap: 10
      //   }]
      // )
      // exs.push(
      //   [{
      //         columns: [ 
      //           [{
      //             text: element['po_running']
      //           },
      //           {
      //             text: 'ชื่อวิน: ' + element['po_namewin']
      //           }],
      //           [{
      //             text: 'ผู้ขาย: ' + element['name']
      //           },
      //           {
      //             text: 'เขต: ' + element['area_name']
      //           },
      //           // {
      //           //   text: 'ขนาด: ' + element['size']
      //           // },
      //           ]
      //         ]
      //   }],
      //   [{
      //     columns: [ 
      //       [{
      //         border: [false, false, false, false],
      //         text: element['product_name']
      //       },]]
      //    }], 
      // )
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
            text: 'วันที่รับ: ' + element['po_date']
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
            text: 'วันที่ส่ง: ' +  element['po_recivedate'] 
          }
        ],
        [
          {
            colSpan: 4,
            border: [true, false, true, false],
            text:  'สินค้าอื่น: ' + element['etc']
          },'','','',
        ],
        [
          {
            colSpan: 4,
            border: [true, false, true, true],
            text:  'หมายเหตุ: ' + element['podetail_comment']
          },'','','',
        ],
      );
    });

    // exs.push(
    //   [
    //     {
    //       colSpan: 3,
    //       text: 'colSpan: 3\n\nborder:\n[false, false, false, false]',
    //       fillColor: '#eeeeee',
    //       border: [false, false, false, false]
    //     },
    //     '',
    //     ''
    //   ],
    //   [
    //     'border:\nundefined',
    //     'border:\nundefined',
    //     'border:\nundefined'
    //   ]
    // );
    // exs.push(
    //   [
    //     {
    //       text: 'element[po_running]'
    //     },
    //     {
    //       text: 'ผู้ขาย'
    //     },
    //     {
    //       text: 'Tel'
    //     },
    //     {
    //       text: 'วันที่รับ'
    //     },
    //   ],
    //   [
    //     {
    //       colSpan: 2,
    //       border: [true, false, false, false],
    //       text: 'ชื่อวิน'
    //     },'',{
    //       text: 'เขต'
    //     },{
    //       text: 'เบอร์/สี'
    //     }
    //   ]
    // );
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

}
