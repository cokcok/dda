import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as moment_ from 'moment';
import 'moment/locale/th';
import {Po01Page} from '../po01/po01.page';
import {Fix01Page} from '../fix01/fix01.page';

const moment = moment_;
 
@Component({
  selector: 'app-potf04',
  templateUrl: './potf04.page.html',
  styleUrls: ['./potf04.page.scss'],
})
export class Potf04Page implements OnInit {
  @Input() recivedate:string;
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  countcf=0;counterr=0;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      po_recivedate: [this.recivedate],
    }); 
    this.loaddata(0);
  }

  dismissModal(){
    let dataarray = []; 
    dataarray.push({
      countcf: this.countcf,
      counterr: this.counterr,
    });
    this.modalCtrl.dismiss(dataarray,'confirm'); //
  }

  loaddata(padding: number, infiniteScroll?){
    let datalimit;
    //console.log(padding,this.data);
    this.sub = this.poSv
    .getpotf_cfwin('view',this.ionicForm.value,padding)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data.data_detail);
        this.data =  data.data_detail.map((item) => Object.assign({}, item));   
      }else{
        this.maxpadding = 0;
      }
    });
  }

  async View(id,po_running,status){
    let item = this.data.filter((val) => val.id == id);
    //console.log(item);
    let modepay
    if(item[0].po_status == 6 || item[0].po_status == 3 || item[0].po_status == 5){
      modepay = 'view';
    }else{
      modepay = 'ok';
    }
    if(item[0].assign_type == 0){
      const modal = await this.modalCtrl.create({
        component:Po01Page,
        cssClass: 'my-modal',
        componentProps:{id:id,po_running:po_running,mode:'view',modepayment:modepay,assign_type:item[0].assign_type},
      });
      await modal.present();
      const {data,role} = await modal.onWillDismiss();
      if(role === 'confirm'){ 
        //console.log(data);
        item[0].po_status = data[0]['po_status'];
        item[0].po_statustext = data[0]['po_statustext'];
        if(data[0]['po_status'] == 6){
          this.countcf = this.countcf + 1;
        }else{
          this.counterr = this.counterr + 1;
        }
       }
    }else{
      const modal = await this.modalCtrl.create({
        component:Fix01Page,
        cssClass: 'my-modal',
        componentProps:{id:id,po_running:po_running,mode:'view',modepayment:modepay,assign_type:item[0].assign_type},
      });
      await modal.present();
      const {data,role} = await modal.onWillDismiss();
      if(role === 'confirm'){ 
        //console.log(data);
        item[0].po_status = data[0]['po_status'];
        item[0].po_statustext = data[0]['po_statustext'];
        if(data[0]['po_status'] == 6){
          this.countcf = this.countcf + 1;
        }else{
          this.counterr = this.counterr + 1;
        }
       }

    }
    
  }

}
