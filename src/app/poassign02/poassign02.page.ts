import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import {Po01Page} from '../po01/po01.page';
import {Fix01Page} from '../fix01/fix01.page';
 
@Component({
  selector: 'app-poassign02',
  templateUrl: './poassign02.page.html',
  styleUrls: ['./poassign02.page.scss'],
})
export class Poassign02Page implements OnInit {
  @Input() recivedate:string;    @Input() itemsomedata=[]; 

  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  dataallarray = []; 
  postatuscolor1 = ['1','2','3','4'];
  postatuscolor2 = ['5','7','8'];
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      typeserch_id: [{id:4}],
      txtserach: [this.recivedate],
      typeassign:['1'],
    }); 
    this.loaddata(0);
    this.dataallarray = this.itemsomedata;
    //console.log(this.itemsomedata);
    //this.compareArray(this.data,this.itemsomedata);
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    //console.log(padding,this.data);
    this.sub = this.poSv
    .getpo(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
        console.log(data);
        this.maxpadding = data["maxpadding"];
        datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
        if(padding === 0){
          this.compareArray(this.data,this.itemsomedata);
        }
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }


  doInfinite(infiniteScroll) {
    this.page++;
    //console.log( this.page);
  
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  selectData(index,data,checked){
    //console.log(data,checked);
    if(checked){
      //console.log('not check');
      this.dataallarray = this.dataallarray.filter(item => item.id !== data['id'])
     }else{
     // console.log('check');
      this.dataallarray.push(data);
     }
     //console.log(this.datacheckarray);
   }


   submitForm(){
    console.log(this.dataallarray);
    this.modalCtrl.dismiss(this.dataallarray,'somedata');
  }

  compareArray(dataall,datasome) {
    dataall.forEach( array1Ttem => {
        datasome.forEach( array2Item => {
           if(array1Ttem.id == array2Item.id){
              //console.log("It's match",array1Ttem);
              dataall = dataall.filter(obj => obj.id !== array2Item.id);
              dataall.unshift(array2Item);
          }
        });
      });
      this.data = dataall;
  }

  async View(id,po_running,assign_type){
    // console.log(id);
     let item = this.data.filter((val) => val.id == id && val.assign_type == assign_type);
     //console.log(item);
     //const modal;
     if(assign_type === '0'){
      const modal = await this.modalCtrl.create({
        component:Po01Page,
        cssClass: 'my-modal',
        componentProps:{id:id,po_running:po_running,mode:'view'},
      });
      await modal.present();
      const {data,role} = await modal.onWillDismiss();
     }else if(assign_type === '1'){
      const modal = await this.modalCtrl.create({
        component:Fix01Page,
        cssClass: 'my-modal',
        componentProps:{id:id,po_running:po_running,mode:'view'},
      });
      await modal.present();
      const {data,role} = await modal.onWillDismiss();

     }
     
    
     //console.log(data,role);
    //  if(role === 'comfirm'){
    //    item[0].po_date = data[0]['po_date'];
    //    item[0].po_recivedate = data[0]['po_recivedate'];
    //    item[0].po_namewin = data[0]['po_namewin'];
    //    item[0].po_customer = data[0]['po_customer'];
    //    item[0].qty = data[0]['qty'];
    //    item[0].po_total = data[0]['po_total'];
    //  }else if(role === 'cancel'){
    //    item[0].po_statustext = data[0]['po_statustext'];
    //  }
   }
}
