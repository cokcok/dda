import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import {Po01Page} from '../po01/po01.page';

@Component({
  selector: 'app-poassign04',
  templateUrl: './poassign04.page.html',
  styleUrls: ['./poassign04.page.scss'],
})
export class Poassign04Page implements OnInit {
  @Input() id:number;@Input() assign_date:string; @Input() seq:string;@Input() total:string;
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  dataallarray = []; 
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [this.id], 
      total: [this.total], 
      dataall:[],
    }); 
    this.loaddata(0);
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    //console.log(padding,this.data);
    this.sub = this.poSv
    .getpoassignreport('readcancel',this.ionicForm.value.id,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data); 
        
        this.maxpadding = data["maxpadding"];
        datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
        
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    //console.log( this.page);
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  selectData(index,data,checked){
    if(checked){
      this.dataallarray = this.dataallarray.filter(item => item.id !== data['id'])
     }else{
      this.dataallarray.push(data);
     }
   }


  async cancelData() {
    this.ionicForm.controls['dataall'].setValue(this.dataallarray);
   
    console.log(this.ionicForm.value);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบการมอบหมายที่เลือก ' + this.dataallarray.length  + ' รายการ? ',
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
              this.sub = this.poSv.crudpoassign(this.ionicForm.value,'delete',data['cause']).subscribe(
                (data) => {
                  if(data.status == 'ok')
                  {   
                    // this.configSv.ChkformAlert(data.message);
                    let dataarray = []; 
                    dataarray.push({
                      id: data.id,
                    });
                    //console.log(data.id);
                    this.modalCtrl.dismiss(dataarray,'delete');
                    this.configSv.ChkformAlert(data.message);
                  }
                  else
                  {
                    this.configSv.ChkformAlert(data.message);
                  }
                }, (error) => {
                  console.log(JSON.stringify(error));
                }
              );
            }else{
              this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการลบด้วย');
            }
        }
      }]
    });
    confirm.present();
  }

  async View(id,po_running){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id);
     //console.log(item);
     const modal = await this.modalCtrl.create({
       component:Po01Page,
       cssClass: 'my-modal',
       componentProps:{id:id,po_running:po_running,mode:'view'},
     });
     await modal.present();
     const {data,role} = await modal.onWillDismiss();
     //console.log(data,role);
     if(role === 'comfirm'){
       item[0].po_date = data[0]['po_date'];
       item[0].po_recivedate = data[0]['po_recivedate'];
       item[0].po_namewin = data[0]['po_namewin'];
       item[0].po_customer = data[0]['po_customer'];
       item[0].qty = data[0]['qty'];
       item[0].po_total = data[0]['po_total'];
     }else if(role === 'cancel'){
       item[0].po_statustext = data[0]['po_statustext'];
     }
   }
}
