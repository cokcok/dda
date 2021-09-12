import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import {Po05Page} from '../po05/po05.page';
import {Po01Page} from '../po01/po01.page';
@Component({
  selector: 'app-potf02',
  templateUrl: './potf02.page.html',
  styleUrls: ['./potf02.page.scss'],
})
export class Potf02Page implements OnInit {
  @Input() recivedate:string;
  portControl_sale: FormControl; ports_sale: any;
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  dataallarray = []; checkallstatus:boolean = false;data_check=[];checkall:boolean;tf_empname:any;
  array_status = ['0','2','9','null']; countassign=0;
  count_shipping = [];  count_shipping1 = []; count_shipping2 = []; count_shipping3 = [];
  postatuscolor1 = ['0','1'];
  postatuscolor2 = ['2','3','4','5','7','8']; 
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      po_recivedate: [this.recivedate],
      po_assigndate:[ moment().format('DD/MM/YYYY') ,[Validators.required]],
      dataall:[],
      transfer_userid :this.portControl_sale,
    }); 
    this.loaddata(0);this.loaddata_sale(0);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  dismissModal(){
   
    this.modalCtrl.dismiss(this.countassign,'confirm');
  }
 
  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    //console.log(padding,this.data);
    this.sub = this.poSv
    .getpotf('view1',this.ionicForm.value,padding)
    //.getpo(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        console.log(data.data_detail);
        this.data =  data.data_detail.map((item) => Object.assign({}, item));   
      }else{
        this.maxpadding = 0;
      }
    });
  }

  getColor(value) {
    let _value = moment(value,'DD/MM/YYYY').isoWeekday();
    //console.log(_value);
    return this.configSv.colortxt[_value];
  }

  showImg(detail_id,name){
    let url = this.configSv.ip + 'po01/productdetail/' + detail_id + '/' +  name
    const browser = this.iab.create(url).show();
   }

   selectDataAll(){
    if(this.checkallstatus ===false){
     this.data_check = this.data.filter((val) => val.disable_checked == false)
     for (var i = 0; i < this.data_check.length; i++) {
       this.data_check[i]['status_checked'] = true;
     }
     this.dataallarray = this.data_check; this.checkallstatus = true;this.checkall =false;
    }else{
     for (var i = 0; i <  this.data_check.length; i++) {
       this.data_check[i]['status_checked'] = false;
     }
     this.checkallstatus = false;this.dataallarray = [];
    }
    this.summary_tf();
  }

  selectData(index,data1,checked){
    if(checked){
      this.dataallarray = this.dataallarray.filter(item => item.id !== data1['id'])
     // console.log(this.dataallarray,checked,data1['poid']);
      if(this.dataallarray.length === 0){this.checkall = false;}
     }else{
     // let  data_true = this.data.filter(item => item.poid === data1['poid']);
     // let  data_true =  this.data.filter(item => item.poid === data1['poid']).map((item) => Object.assign({}, item));
     // console.log(this.toObject(data_true),data1);
      
      this.dataallarray.push(data1);
     // console.log(this.dataallarray,checked);
     }

     this.summary_tf();
   }

 toObject(arr) {
    var obj = arr.reduce(function(acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {});
  }

   async submitForm(){
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
    this.isSubmitted = true;
    //console.log(this.ionicForm.value);
    // let foundempnull = this.dataallarray.find(function (value){
    //   if(value.tf_empid === '0'){
    //     return true;
    //   }
    // });

    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    }

    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันข้อมูลในมอบหมายการส่งสินค้า',
      //message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
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
          .crudpotf(this.ionicForm.value,'insert')
          .subscribe((data) => {
            if (data !== null) {
                if(data.status === 'ok'){
                  //this.assign_statusAll = data.id;
                  this.countassign = this.countassign + Number(data.id);
                  this.compareArray(this.data,this.dataallarray);
                  this.configSv.ChkformAlert(data.message);
                  this.dataallarray = [];
                  this.checkallstatus = false;this.checkall =false;
                  this.summary_tf();
                }
                //console.log(this.countassign);
            }
          },
          (error) => {
            console.log(JSON.stringify(error));
          });
        }
      }]
    });
    confirm.present();
  }

  compareArray(dataall,dataselect) {
    dataall.forEach( array1Ttem => {
        dataselect.forEach( array2Item => {
           if(array1Ttem.id == array2Item.id){
              array1Ttem.disable_checked  = true;
              array1Ttem.status_checked  = true;
              //array1Ttem.transfer_txt  = 'อยู่ระหว่างส่งสินค้า';
              //array1Ttem.transfer_flag  = '1';
              if( array1Ttem.shipping_id === '1'){
                array1Ttem.tf_empname  = this.tf_empname;
              }
             
          }
        });
      });
  }

  loaddata_sale(padding: number, infiniteScroll?) {
    this.sub = this.poSv
      .getusertf(0,padding)
      .subscribe((data) => {
        if (data !== null) {
         this.ports_sale = data.data_detail.map((item) => Object.assign({}, item));
         // let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
         // this.portControl_sale.setValue(item);
        }
      });
  }

  portChangeEmptf(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.tf_empname = port['prefix_name'] + ' ' +  port['name'] + ' ' +  port['surname'];

  }



  summary_tf(){
   
    this.count_shipping = this.dataallarray.filter((val) => val.shipping_id == '1');
    this.count_shipping1 = this.dataallarray.filter((val) => val.shipping_id == '2');
    this.count_shipping2 = this.dataallarray.filter((val) => val.shipping_id == '3');
    this.count_shipping3 = this.dataallarray.filter((val) => val.shipping_id == '4');

    if(this.count_shipping.length > 0){
      this.ionicForm.get('transfer_userid').setValidators(Validators.required);
    }else{
      this.ionicForm.get('transfer_userid').setValidators(null);
      this.ionicForm.controls['transfer_userid'].updateValueAndValidity();
    }
  }


  async View(id,po_running){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id);
     //console.log(item);  
     const modal = await this.modalCtrl.create({
       component:Po01Page,
       cssClass: 'my-modal',
       componentProps:{id:id,po_running:po_running,tmppostatus:item[0].po_status},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'comfirm'){
       
       item[0].po_date = data[0]['po_date'];
       item[0].po_recivedate = data[0]['po_recivedate'];
       item[0].po_namewin = data[0]['po_namewin'];
       item[0].po_customer = data[0]['po_customer'];
       item[0].po_customer_tel = data[0]['po_customer_tel'];
       item[0].qty = data[0]['qty'];
       item[0].po_total = data[0]['po_total'];
       if(data[0]['ponumberdetail'] != null){
         item[0].ponumberdetail = data[0]['ponumberdetail'];
       }
     }else if(role === 'cancel'){
       item[0].po_statustext = data[0]['po_statustext']; 
       item[0].po_status = '8'; 
     }
   }


   async viewassign(id,po_running){

     const modal = await this.modalCtrl.create({
       component:Po05Page,
       cssClass: 'my-modal',
       componentProps:{id:id,po_running:po_running},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
   }

}
