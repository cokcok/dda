import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService } from '../sv/mtd-sv.service';
import { PoSvService } from '../sv/po-sv.service';
import { OdSvService } from '../sv/od-sv.service';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import { IonicSelectableComponent } from 'ionic-selectable';
import {PlaceSvService} from '../sv/place-sv.service';
//import * as $ from 'jquery';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-od01',
  templateUrl: './od01.page.html',
  styleUrls: ['./od01.page.scss'],
})
export class Od01Page implements OnInit {
  @Input() id:number;@Input() od_running:string;@Input() mode:string;@Input() modedelivered:string;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;
  myDate = new Date().toISOString();
  datePickerObj: any = {};
  tmpproduct = []; od_qty = []; od_price = [];od_unit=[];
  portControl_sale: FormControl; ports_sale: any;
  portControl_suppliertype: FormControl; ports_suppliertype: any;
  portControl_supplier: FormControl; ports_supplier: any;
  ports_productmain: any;alltotalproduct:number; vat7:number; sumtotal:number;
  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private modalCtrl:ModalController,private iab: InAppBrowser,public placeSv:PlaceSvService,private poSv: PoSvService , private odSv: OdSvService) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.portControl_suppliertype = this.formBuilder.control("", Validators.required);
    this.portControl_supplier = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      od_running:[""],
      od_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
      supplier_type_id :  this.portControl_suppliertype,
      mtd_supplier_id: this.portControl_supplier,
      supply_name: [""],
      supply_address: [""],
      supply_place: [""],
      supply_tel: [""] ,
      supply_fax: [""] ,
      supply_taxid: [""] ,
      supply_email: [""],
      contact_name:["",[Validators.required]],
      contact_tel:["",[Validators.required]],
      contact_email:[""],
      total:[this.alltotalproduct],
      vat:[this.vat7],
      sumtotal:[this.sumtotal],
      tmpproduct:["",[Validators.required]],
    });
    this.loaddata_sale(0);this.fndate(); this.loaddata_suppliertype();this.loaddata_supplier(0);this.loaddata_product();
   
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

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loaddata_sale(padding: number, infiniteScroll?) {
    this.sub = this.mtdSv
      .getmtd(0,padding,null,'po')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_sale = data.data_detail.map((item) => Object.assign({}, item));
          let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
          this.portControl_sale.setValue(item);
        }
      });

  }


  loaddata_suppliertype(){
    this.ports_suppliertype = [
      {id: '0',type: 'ร้านค้าทั่วไป'},
      {id: '1',type: 'ร้านค้าสมาชิก'},
    ];
  }

  supplier_type:any;
  portChangeSup(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.supplier_type = port['id'];
    if(this.supplier_type == '0'){
      this.ionicForm.controls['mtd_supplier_id'].setValue(null);
      this.ionicForm.controls['supply_name'].setValue(null);
      this.ionicForm.controls['supply_address'].setValue(null);
      this.ionicForm.controls['supply_place'].setValue(null);
      this.ionicForm.controls['supply_tel'].setValue(null);
      this.ionicForm.controls['supply_fax'].setValue(null);
      this.ionicForm.controls['supply_taxid'].setValue(null);
      this.ionicForm.controls['supply_email'].setValue(null);
      this.ionicForm.get('supply_name').setValidators(Validators.required);
      this.ionicForm.get('supply_address').setValidators(Validators.required);
      this.ionicForm.get('supply_place').setValidators(Validators.required);
      this.ionicForm.get('supply_tel').setValidators(Validators.required);
      this.ionicForm.get('supply_taxid').setValidators(Validators.required);
      this.ionicForm.get('supply_name').updateValueAndValidity();
      this.ionicForm.get('supply_address').updateValueAndValidity();
      this.ionicForm.get('supply_place').updateValueAndValidity();
      this.ionicForm.get('supply_tel').updateValueAndValidity();
      this.ionicForm.get('supply_taxid').updateValueAndValidity();
      this.ionicForm.get('mtd_supplier_id').setValidators(null);
      this.ionicForm.get('mtd_supplier_id').updateValueAndValidity();
    }else{
      this.ionicForm.get('mtd_supplier_id').setValidators(Validators.required);
      this.ionicForm.get('mtd_supplier_id').updateValueAndValidity();
      this.ionicForm.get('supply_name').setValidators(null);
      this.ionicForm.get('supply_address').setValidators(null);
      this.ionicForm.get('supply_place').setValidators(null);
      this.ionicForm.get('supply_tel').setValidators(null);
      this.ionicForm.get('supply_taxid').setValidators(null);
      this.ionicForm.get('supply_name').updateValueAndValidity();
      this.ionicForm.get('supply_address').updateValueAndValidity();
      this.ionicForm.get('supply_place').updateValueAndValidity();
      this.ionicForm.get('supply_tel').updateValueAndValidity();
      this.ionicForm.get('supply_taxid').updateValueAndValidity();
    }
  }

  loaddata_supplier(padding: number) {
    let datalimit;
    this.sub = this.placeSv
      .getmtdsupply(padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_supplier = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  portChange_supplier(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    let item = this.ports_supplier.filter((val) => val.id == port['id']);
   // console.log(item);
    //this.ionicForm.controls['mtd_supplier_id'].setValue(item[0].id);
    this.ionicForm.controls['supply_name'].setValue(item[0].supply_name);
    this.ionicForm.controls['supply_address'].setValue(item[0].supply_address);
    this.ionicForm.controls['supply_place'].setValue(item[0].supply_place);
    this.ionicForm.controls['supply_tel'].setValue(item[0].supply_tel);
    this.ionicForm.controls['supply_fax'].setValue(item[0].supply_fax);
    this.ionicForm.controls['supply_taxid'].setValue(item[0].supply_taxid);
    this.ionicForm.controls['supply_email'].setValue(item[0].supply_email);

  }

  loaddata_product() {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readproduct')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
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
      total: value.price,
      od_qty:0,
      od_price:0,
      od_total:0,
      od_unit:null,
    });
  });
    //this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    event.component.clear();
    //this.cul_total();
    
  }

  Caltotal(id,value,type){
     let item = this.tmpproduct.filter((val) => val.id == id);
     if(type === 'qty'){
      item[0].od_qty = value;
      item[0].od_total = Number(item[0].od_price) * Number(value);
     }else if(type === 'price'){
      item[0].od_price = value;
      item[0].od_total = Number(value) * Number(item[0].od_qty);
     }
     this.CulSumtotal();
  }

  Commentunit(id,value){
    let item = this.tmpproduct.filter((val) => val.id == id);
    item[0].od_unit = value;
  }

  Deltmpproduct(id,index){
    this.od_price[index] = null; this.od_qty[index] = null; this.od_unit[index] = null; 
    this.tmpproduct = this.tmpproduct.filter(obj => obj.id !== id);
    this.CulSumtotal();
  }

  CulSumtotal(){
    this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.od_total), 0);
    this.vat7 = this.alltotalproduct * 0.07;
    this.sumtotal = this.alltotalproduct + this.vat7;
  }

  async submitForm(){
    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    if( typeof this.alltotalproduct !== 'undefined'){
      this.ionicForm.controls['total'].setValue(this.alltotalproduct.toFixed(2));
      this.ionicForm.controls['vat'].setValue(this.vat7.toFixed(2));
      this.ionicForm.controls['sumtotal'].setValue(this.sumtotal.toFixed(2));
    }
    
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
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
            this.sub = this.odSv
            .crudod(this.ionicForm.value,typesql)
            .subscribe((data) => {
              if (data !== null) {
                if(typesql === 'insert'){
                  if(data.status === 'ok'){
                    //this.refreshForm();
                    this.configSv.ChkformAlert(data.message);
                  }
                }else if(typesql === 'update'){
                //   //console.log('update');
                //   this.configSv.ChkformAlert(data.message);
                //   let dataarray = []; 
                //   let ponumberdetail = this.tmpproduct.map(function (item) {
                //     return item.numbervalue
                //   });
                
                //   if(ponumberdetail[0] !== null){
                //     ponumberdetail = ponumberdetail;
                //   }else{
                //     ponumberdetail = null;
                //   }
                //   dataarray.push({ 
                //     po_date:this.ionicForm.controls.po_date.value,
                //     po_recivedate:this.ionicForm.controls.po_recivedate.value,
                //     po_namewin:this.ionicForm.controls.po_namewin.value,
                //     area_name:this.ionicForm.controls.mtd_area_id.value.area_name,
                //     po_customer:this.ionicForm.controls.po_customer.value,
                //     po_customer_tel:this.ionicForm.controls.po_customer_tel.value,
                //     po_total: this.ionicForm.controls.po_total.value,
                //     qty:this.tmpproduct.length,
                //     ponumberdetail:ponumberdetail,
                //   });
                //   //console.log(dataarray);
                //   this.modalCtrl.dismiss(dataarray,'comfirm');
                //  // this.ionicForm.controls.podetail_number.value

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
