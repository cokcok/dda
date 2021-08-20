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
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      po_recivedate: [this.recivedate],
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
    .getpotf('view',this.ionicForm.value,padding)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data.data_detail);
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
  }

  selectData(index,data,checked){
    if(checked){
      this.dataallarray = this.dataallarray.filter(item => item.assign_id !== data['assign_id'])
      if(this.dataallarray.length === 0){this.checkall = false;}
     }else{
      this.dataallarray.push(data);
     }
     //console.log(this.dataallarray);
   }

   async submitForm(){
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
    //console.log(this.ionicForm.value);

    this.isSubmitted = true;

    // let foundempnull = this.dataallarray.find(function (value){
    //   if(value.tf_empid === '0'){
    //     return true;
    //   }
    // });

    if (!this.ionicForm.valid ) {
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
           if(array1Ttem.assign_id == array2Item.assign_id){
              array1Ttem.disable_checked  = true;
              array1Ttem.status_checked  = true;
              array1Ttem.transfer_txt  = 'อยู่ระหว่างส่งสินค้า';
              array1Ttem.transfer_flag  = '1';
              array1Ttem.tf_empname  =this.tf_empname;
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
    //console.log(port);
    //data.tf_empid = port['id'];
    //data.tf_empname = port['prefix_name'] + ' ' +  port['name'] + ' ' +  port['surname'];
    this.tf_empname = port['prefix_name'] + ' ' +  port['name'] + ' ' +  port['surname'];
    //console.log(data.tf_empid);
  }

}
