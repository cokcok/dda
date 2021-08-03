import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
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
  @Input() id:number;@Input() to_running:string;mode:string;@Input() to_status:string;
  @ViewChild('fileIngimg1') fileIngimg1: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  ionicForm_transport: FormGroup;
  sub: Subscription;
  portControl_sale: FormControl; ports_sale: any;
  portControl_vat: FormControl; ports_vat: any;
  portControl_productmain: FormControl; ports_productmain: any;
  tmpproduct =[];per_qty = [];per_price = [];
  alltotalproduct:number; vat7:number; sumtotal:number;

  myDate = new Date().toISOString();
  datePickerObj: any = {};

  picresizbase64Array: FormArray; picresizbase64:any;  picpreview =[];indexpic_payment = 0;
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
    this.loadform_transport();this.fndate();
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
      qty: value.qty,
      total: 0,
      status_send:'',
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
     if(value > item[0].qty){
      item[0].status_send = 0;
     }else{
      item[0].status_send = 1;
     }
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

    let foundtotalzero = this.tmpproduct.find(function (value){
      if(value.total === 0){
        return true;
      }
    });

    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
   
    if( typeof this.alltotalproduct !== 'undefined'){
      this.ionicForm.controls['total'].setValue(Number(this.alltotalproduct).toFixed(2));
      this.ionicForm.controls['vat'].setValue(Number(this.vat7).toFixed(2));
      this.ionicForm.controls['sumtotal'].setValue(Number(this.sumtotal).toFixed(2));
    }
    console.log(this.ionicForm.value);
    this.isSubmitted = true;
    if (!this.ionicForm.valid || foundtotalzero) {
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
                 
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  let detail_array = [];
                  this.tmpproduct.forEach((value, index) => {
                    detail_array.push({
                      product_name: value.product_name,
                      size : value.size,
                      to_qty : value.per_qty,
                      to_price : value.per_price,
                      to_total : value.total,
                    });
                  });
                  dataarray.push({ 
                    to_date:this.ionicForm.controls.to_date.value,
                    company_name:this.ionicForm.controls.company_name.value,
                    qty:this.tmpproduct.length,
                    total:this.ionicForm.controls.total.value,
                    vat:this.ionicForm.controls.vat.value,
                    sumtotal:this.ionicForm.controls.sumtotal.value,
                    todetail:detail_array,
                  });
                  //console.log(dataarray);
                  this.modalCtrl.dismiss(dataarray,'comfirm');
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

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  async cancelData() {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบใบสั่งของที่ '+ this.to_running +' ? ',
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
             this.sub = this.poSv.crudto(this.ionicForm.value,'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    to_statustext:'ยกเลิกใบสั่งซื้อ',
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

  ionViewDidEnter(){
    this.loaddata_edit(); 
   
  }

  loaddata_edit(){
    if(typeof this.id !== 'undefined'){
      this.sub = this.poSv
      .getto_edit(this.id,'readedit')
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
               }else if(key === "vat_type"){
                let value_a = this.ports_vat.filter(function (item1) {
                  return item1.id === value;
                })[0];  
                this.portControl_vat.setValue(value_a);
                //this.supplier_type = value_a['id'];
               }else{
                this.ionicForm.controls[key].setValue(value);
              }
             
            }
            this.tmpproduct = data.data_detail[0]['tmpproduct'];
            this.tmpproduct.forEach((item,index) => {
              this.per_qty[index] = item['per_qty'];
              this.per_price[index] = item['per_price'];
            });
            this.alltotalproduct = data.data_detail[0]['total'];
            this.vat7 = data.data_detail[0]['vat'];
            this.sumtotal =  data.data_detail[0]['sumtotal'];
          });
        }
      });

      if(this.mode === 'transport'){
        this.sub = this.poSv
      .getto_edit(this.id,'viewtransport')
      .subscribe((data) => {
        if (data !== null) {
          data.data_detail.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
              if(key === 'picresizbase64List'){
                this.picpreview = Object(value).map((item) => Object.assign({}, item));
                //console.log(this.picpreview);
                this.picpreview.forEach(task => {
                   //console.log(task)
                    this.indexpic_payment++;
                    this.picresizbase64Array.push(this.formBuilder.group({
                    id: [task.id],
                    url: [task.url],
                  }));
              });
              }else{
                this.ionicForm_transport.controls[key].setValue(value);
              }
            }
          });
        }
      });
      }
    }
  }


  async  submitForm_transport(){
    let foundqty = this.tmpproduct.find(function (value){
      if(value.status_send === 0){
        return true;
      }
    });

    if (foundqty) {
      this.configSv.ChkformAlert('ไม่สามารถส่งสินค้าได้ เนื่องจากสินค้าในสต๊อกมีน้อยกว่าที่จะส่ง');
      return false;
    }
    this.ionicForm_transport.controls['tmpproduct'].setValue(this.ionicForm.controls['oldtmpproduct'].value);
    this.isSubmitted = true;
    if (!this.ionicForm_transport.valid) {
      console.log("Please provide all the required values!");
      return false;
    }else{
     // console.log(this.ionicForm_transport.value);
      const confirm =  await this.alertCtrl.create({
        header: 'ยืนยันข้อมูลในการส่งสินค้า',
        buttons: [{
          text: 'ยกเลิก',
          handler: (data: any) => {
             //console.log('cancel ',data);
          }
        },
        {
          text: 'ตกลง',
            handler: (data: any) => {
              this.sub = this.poSv
              .crudto_transport(this.ionicForm_transport.value,'transport')
              .subscribe((data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    to_statustext:'ส่งของเรียบร้อยแล้ว',
                  });
                  this.modalCtrl.dismiss(dataarray,'transport_confirm');
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
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

  loadform_transport(){
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm_transport = this.formBuilder.group({
      id : [this.id],
      transport_date :["",[Validators.required]],
      transport_detail: ["",[Validators.required]],
      tmpproduct:[""],
      picresizbase64List: this.picresizbase64Array,
    }); 
  }

  get errorControl1() {
    return this.ionicForm_transport.controls;
  }

  fileUpload_payment() {
    this.fileIngimg1.nativeElement.click();
  }
  
  fileUpload_imgpayment(event) {
     const fileList: FileList =  this.fileIngimg1.nativeElement.files;
     //console.log(fileList[0].type);
     if (typeof fileList[0] !== 'undefined') {
       if (fileList[0].type.match(/image.*/)) {
         var reader = new FileReader();
         var self = this;
         reader.onloadend = function () {
           //self.picbase64 = reader.result
           var canvas = document.createElement("canvas");
           var ctx = canvas.getContext("2d");
           canvas.width = 200; // target width
           canvas.height = 200; // target height
           var image = new Image();
           image.src = reader.result as string;
           image.onload = function (e) {
             ctx.drawImage(image,
               0, 0, image.width, image.height,
               0, 0, canvas.width, canvas.height
             );
             var resampledImage = new Image();
             resampledImage.src = canvas.toDataURL();
             self.picresizbase64 = resampledImage.src;
               self.picpreview.push({
                 id:self.indexpic_payment,
                 url:resampledImage.src
               });
               
              self.picresizbase64Array.push(self.formBuilder.group({
                 id:[self.indexpic_payment],
                 url: [self.picresizbase64],
                
               }));
               self.indexpic_payment++;
           };
         }
         reader.readAsDataURL(fileList[0]);
       }
       else {
         alert('กรุณาระบุชนิดไฟล์รูปภาพ');
       }
     }
   }
  
   delImg_payment(index){
    this.picpreview = this.picpreview.filter(obj => obj.id !== index);
   this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(value => value.id === index));
   }
}
