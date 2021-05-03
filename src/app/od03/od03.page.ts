import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { OdSvService } from '../sv/od-sv.service';
import { ConfigService } from "../sv/config.service";
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
@Component({
  selector: 'app-od03',
  templateUrl: './od03.page.html',
  styleUrls: ['./od03.page.scss'],
})
export class Od03Page implements OnInit {
  @Input() id:number;@Input() od_running:string; @Input() item:any;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;
  myDate = new Date().toISOString();
  datePickerObj: any = {}; 
  constructor(private modalCtrl:ModalController,public formBuilder: FormBuilder,private poSv: PoSvService,private odSv: OdSvService,public configSv: ConfigService,private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this.item);
    this.ionicForm = this.formBuilder.group({
      od_main_id:[this.id],
      od_main_detail_id:[this.item[0]['detail_id']],
      od_recive_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      recive_seq:[this.item[0]['recive_seq']],
      qty_recive:["",[Validators.required]],
      od_recive_detail:[""],
      od_qty:[this.item[0]['od_qty'] + ' ' + this.item[0]['od_unit'] ],
      od_unit:[this.item[0]['od_unit']],
      product_name:[this.item[0]['product_name']],
      size:[this.item[0]['size']],
    });
    this.fndate();
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  fndate(){
    this.datePickerObj = {
      inputDate: moment(this.myDate),
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
      // clearButton: false,
      // momentLocale: 'th-TH',
      // yearInAscending: true,
      // btnCloseSetInReverse: true,

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

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm(){
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid ) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      const confirm =  await this.alertCtrl.create({
        header: 'ยืนยันข้อมูลในการบันทึก',
        buttons: [{
          text: 'ยกเลิก',
          handler: (data: any) => {
             //console.log('cancel ',data);
          }
        },
        {
          text: 'ตกลง',
            handler: (data: any) => {
            this.sub = this.odSv
            .crudod_recive(this.ionicForm.value,'insert')
            .subscribe((data) => {
              if (data !== null) {
                  if(data.status === 'ok'){
                    this.configSv.ChkformAlert(data.message);
                  }
              }
            },
            (error) => {
              console.log(JSON.stringify(error));
            },
            () => {
            });
          }
        }]
      });
      confirm.present();

    }
  }

}
