import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import { PoSvService } from '../sv/po-sv.service';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import { IonicSelectableComponent } from 'ionic-selectable';
import {PlaceSvService} from '../sv/place-sv.service';


@Component({
  selector: 'app-po03',
  templateUrl: './po03.page.html',
  styleUrls: ['./po03.page.scss'],
}) 
export class Po03Page implements OnInit {
  @Input() id:number;@Input() to_running:string;mode:string;@Input() modepayment:string;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;
  portControl_sale: FormControl; ports_sale: any;
  portControl_vat: FormControl; ports_vat: any;
  portControl_productmain: FormControl; ports_productmain: any;
  tmpproduct =[];per_qty = [];per_price = [];
  alltotalproduct:number; vat7:number; sumtotal:number;

  myDate = new Date().toISOString();
  datePickerObj: any = {};


  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private poSv: PoSvService,public placeSv:PlaceSvService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.portControl_vat = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      to_running:[""],
      to_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
      company_name:["",[Validators.required]],
      company_address:["",[Validators.required]],
      company_address_place:["",[Validators.required]],
      company_addresssend:["",[Validators.required]],
      company_addresssend_place:["",[Validators.required]],
      contact_name:["",[Validators.required]],
      contact_tel:["",[Validators.required]],
      contact_fax:["",[Validators.required]],
      tmpproduct:["",[Validators.required]],
      total:[this.alltotalproduct],
      vat:[this.vat7],
      sumtotal:[this.sumtotal],
      to_status:[""],
      oldtmpproduct:[""], 
      vat_type: this.portControl_vat,
    });
    this.loaddata_sale(0);this.loaddata_product();this.loaddata_typevat();
  }

  fndate(){
    this.datePickerObj = {
      inputDate: moment(this.myDate),
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

  loaddata_sale(padding: number, infiniteScroll?) {
    this.sub = this.mtdSv
      .getmtd(0,padding,null,'po')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_sale = data.data_detail.map((item) => Object.assign({}, item));
          let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
          //console.log(item);
          this.portControl_sale.setValue(item);
        }
      });
  }

  loaddata_product() {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readproduct',2)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  loaddata_typevat(){
    this.ports_vat = [
      {id: '0',type: 'คำนวณภาษี'},
      {id: '1',type: 'ไม่คำนวณภาษี'},
    ];
  }

  public inqtyerror(qty: number,qty_remain:number): boolean{
    if (Number(qty) < Number(qty_remain)){
      return true;
    }
  }

  portChange_Product(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    let tmpindex:number;
   if(this.tmpproduct.length === 0){
    tmpindex = 0;
   }else{
    tmpindex = Number(this.tmpproduct[this.tmpproduct.length-1]["id"]) + 1;
   }
   port.forEach((value, index) => {
    this.tmpproduct.push({
      id: index+Number(tmpindex),
      name: value.product_name +'/'+value.size+ '/' +value.price,
      product_id: value.id,
      product_name: value.product_name,
      size: value.size,
      price: value.price,
      per_price: value.price,
      per_qty:'',
      total: 0,
    });
    this.per_price[index+Number(tmpindex)] =  value.price;
  });
    event.component.clear();
  
  }

  portChange_typevat(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.CulSumtotal();
  }

  Caltotal(id,value,type){
    let item = this.tmpproduct.filter((val) => val.id == id);
    if(type === 'qty'){
     item[0].per_qty = value;
     item[0].total = Number(item[0].per_price) * Number(value);
    }else if(type === 'price'){
      item[0].per_price = value;
      item[0].total = Number(item[0].per_qty) * Number(value);
    }
    this.CulSumtotal();
 }

 Deltmpproduct(id,index){
  this.per_price[index] = null; this.per_qty[index] = null; 
  this.tmpproduct = this.tmpproduct.filter(obj => obj.id !== id);
  this.CulSumtotal();
}

CulSumtotal(){
  this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0);
  if(this.ionicForm.controls.vat_type.value.id === '0'){
    this.vat7 = this.alltotalproduct * 0.07;
  }else{
    this.vat7 = 0;
  }
  
  this.sumtotal = this.alltotalproduct + this.vat7;
}

  async submitForm(){
    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
   
    if( typeof this.alltotalproduct !== 'undefined'){
      this.ionicForm.controls['total'].setValue(Number(this.alltotalproduct).toFixed(2));
      this.ionicForm.controls['vat'].setValue(Number(this.vat7).toFixed(2));
      this.ionicForm.controls['sumtotal'].setValue(Number(this.sumtotal).toFixed(2));
    }
    console.log(this.ionicForm.value);
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
            let typesql: string;
            if (!this.ionicForm.controls.id.value) {
              typesql = "insert";
            } else {
              typesql = "update";
            }
            this.sub = this.poSv
            .crudto(this.ionicForm.value,typesql)
            .subscribe((data) => {
              if (data !== null) {
                if(typesql === 'insert'){
                  if(data.status === 'ok'){
                    this.refreshForm();
                    this.configSv.ChkformAlert(data.message);
                  }
                }else if(typesql === 'update'){
                //   //console.log('update');
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({ 
                    od_date:this.ionicForm.controls.od_date.value,
                    supply_name:this.ionicForm.controls.supply_name.value,
                    countod:this.tmpproduct.length,
                    total:this.ionicForm.controls.total.value,
                    vat:this.ionicForm.controls.vat.value,
                    sumtotal:this.ionicForm.controls.sumtotal.value,
                  });
                  //console.log(dataarray);
                  this.modalCtrl.dismiss(dataarray,'comfirm');
                 // this.ionicForm.controls.podetail_number.value

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

  refreshForm() {
    this.ionicForm.reset({to_date:moment().format("DD/MM/YYYY")});
    let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
    this.portControl_sale.setValue(item);
    this.isSubmitted = false;
    this.tmpproduct = []; this.per_qty = []; this.per_price = []; 
    this.alltotalproduct=0; this.vat7 = 0; this.sumtotal=0;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
