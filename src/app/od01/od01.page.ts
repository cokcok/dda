import { Component, OnInit,Input } from '@angular/core';
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
import {Od03Page} from '../od03/od03.page';
import { exit } from 'process';


@Component({
  selector: 'app-od01',
  templateUrl: './od01.page.html',
  styleUrls: ['./od01.page.scss'],
})
export class Od01Page implements OnInit {
  @Input() id:number;@Input() od_running:string;@Input() mode:string;@Input() modedelivered:string;@Input() odstatus:string;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;
  myDate = new Date().toISOString();
  datePickerObj: any = {}; 
  tmpproduct = []; od_qty = []; od_price = [];od_unit=[];
  portControl_sale: FormControl; ports_sale: any;
  portControl_suppliertype: FormControl; ports_suppliertype: any;
  portControl_supplier: FormControl; ports_supplier: any;
  ports_productmain_number: any;
  ports_productmain: any;alltotalproduct:number; vat7:number; sumtotal:number;
  edit = ['1']; editdata = ['0',undefined]
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
      od_status:[""],
      oldtmpproduct:[""],
    });
    this.loaddata_sale(0);this.fndate(); this.loaddata_suppliertype();this.loaddata_supplier(0);this.loaddata_product();this.loaddata_productnumber();
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
    //this.modalCtrl.dismiss();
    this.modalCtrl.dismiss(this.odstatus ,'back');
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

  loaddata_productnumber() {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readnumberAll')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain_number = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  } 

  public inqtywaring(qty: number,qty_remain:number): boolean{
    if (Number(qty) < Number(qty_remain) && Number(qty) !== 0){
      return true;
    }
  }

  public inqtyerror(qty: number,qty_remain:number): boolean{
    if (Number(qty) === 0){
      return true;
    }
  }

  portChange_Product(event: {
    component: IonicSelectableComponent,
    value: any
  },type) {
    let port = event.value;
    let tmpindex:number;
   if(this.tmpproduct.length === 0){
    tmpindex = 0;
   }else{
    tmpindex = Number(this.tmpproduct[this.tmpproduct.length-1]["id"]) + 1;
   }
  //  port.forEach((value, index) => {
  //   this.tmpproduct.push({
  //     id: index+Number(tmpindex),
  //     name: value.product_name +'/'+value.size+ '/' +value.price,
  //     product_id: value.id,
  //     product_name: value.product_name,
  //     size: value.size,
  //     price: value.price,
  //     total: value.price,
  //     od_qty:0,
  //     od_price:0,
  //     od_total:0,
  //     od_unit:null,
  //   });
  // });

  if(type === 'product'){
    port.forEach((value, index) => {
      this.tmpproduct.push({
        id: index+Number(tmpindex),
        name: value.product_name +'/'+value.size+ '/' +value.price,
        product_id: value.id,
        number_id:0,
        product_name: value.product_name,
        size: value.size,
        price: value.price,
        total: value.price,
        od_qty:0,
        od_price:0,
        od_total:0,
        od_unit:'ชิ้น',
      });
    });
   }else{
    port.forEach((value, index) => {
      this.tmpproduct.push({
        id: index+Number(tmpindex),
        name: value.product_name +'/'+value.size+ '/' +value.price,
        product_id: 0,
        number_id: value.id,
        product_name: value.product_name,
        size: value.size,
        price: value.price,
        total: value.price,
        od_qty:0,
        od_price:0,
        od_total:0,
        od_unit:'ชิ้น',
      });
    });

   }



    event.component.clear();
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
    
    
    
    let foundnull = this.tmpproduct.find(function (value){
      if(value.od_total === 0 ){
        return true;  //|| value.od_unit == null || typeof value.od_unit == 'undefined'
      }
   });

    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    if( typeof this.alltotalproduct !== 'undefined'){
      this.ionicForm.controls['total'].setValue(Number(this.alltotalproduct).toFixed(2));
      this.ionicForm.controls['vat'].setValue(Number(this.vat7).toFixed(2));
      this.ionicForm.controls['sumtotal'].setValue(Number(this.sumtotal).toFixed(2));
    }
    
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid || foundnull) {
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
    this.ionicForm.reset({od_date:moment().format("DD/MM/YYYY")});
    let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
    this.portControl_sale.setValue(item);
    this.isSubmitted = false;
    this.tmpproduct = []; this.od_qty = []; this.od_price = []; this.od_unit=[];
    this.alltotalproduct=0; this.vat7 = 0; this.sumtotal=0;
  }

  ionViewDidEnter(){
    this.loaddata_edit(); 
  }

  loaddata_edit(){
    if(typeof this.id !== 'undefined'){
      this.sub = this.odSv
      .getod_edit(this.id)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data);
          data.data_detail.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
              if(key === "mtd_user_id"){
                let value_a = this.ports_sale.filter(function (item1) {
                     return item1.id === value;
                 })[0];
                 this.portControl_sale.setValue(value_a);
               }else if(key === "supplier_type"){
                let value_a = this.ports_suppliertype.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_suppliertype.setValue(value_a);
                this.supplier_type = value_a['id'];
               }else if(key === "mtd_supplier_id"){
                let value_a = this.ports_supplier.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_supplier.setValue(value_a);
               }else{
                this.ionicForm.controls[key].setValue(value);
              }
             
            }
            this.tmpproduct = data.data_detail[0]['tmpproduct'];
            this.tmpproduct.forEach((item,index) => {
              this.od_qty[item['id']] = item['od_qty'];
              this.od_unit[item['id']] = item['od_unit'];
              this.od_price[item['id']] = item['od_price'];
            });
            this.alltotalproduct = data.data_detail[0]['total'];
            this.vat7 = data.data_detail[0]['vat'];
            this.sumtotal =  data.data_detail[0]['sumtotal'];
          });
        }
      });
    }
  }

  async cancelData() {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบใบสั่งของที่ '+ this.od_running +' ? ',
      inputs: [
        {
          name: 'cause',
          placeholder: 'ระบุเหตุผลในการยกเลิก',
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
           if(data['cause']){
             this.sub = this.odSv.crudod(this.ionicForm.value,'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    od_statustext:'ยกเลิกใบสั่งของ',
                  });
                  this.modalCtrl.dismiss(dataarray,'cancel');
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }
              }, (error) => {
                console.log(JSON.stringify(error));
              }, () => {
              }
            );
          } 
          else{
            this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการลบด้วย');
          }
        }
      }]
    });
    confirm.present();
  }

  
  async recive(id,od_running,iddetail,odstatus){
   //console.log(odstatus);
     let item = this.tmpproduct.filter((val) => val.id == iddetail);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Od03Page,
       cssClass: 'my-modal',
       componentProps:{id:id,od_running:od_running,item:item,odstatus:odstatus},
     }); 
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'confirm'){ 
       console.log(data);
       this.odstatus = data[0]['odstatus'];
       item[0].qty_recive = Number(item[0].qty_recive) + Number(data[0]['totalrecive']);
      //  item[0].od_date = data[0]['od_date'];
      //  item[0].supply_name = data[0]['supply_name'];
      //  item[0].countod = data[0]['countod'];
      //  item[0].total = data[0]['total'];
      //  item[0].vat = data[0]['vat'];
      //  item[0].sumtotal = data[0]['sumtotal'];
     }
   }

   async submitForm_recive() {
     console.log(this.id);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการเสร็จสิ้นการรับสินค้า',
      message: 'แน่ใจว่ารับสินค้าใบสั่งของที่ '+ this.od_running +' เสร็จสิ้นทั้งหมดแล้ว ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
             this.sub = this.odSv.crudod_recive(this.id,'update').subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    od_status:2,
                    od_statustext:'รับสินค้าทั้งหมดแล้ว',
                  });
                  this.modalCtrl.dismiss(dataarray,'updateAll');
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }
              }, (error) => {
                console.log(JSON.stringify(error));
              }, () => {
              }
            );

        }
      }]
    });
    confirm.present();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
