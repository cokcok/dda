import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import { PoSvService } from '../sv/po-sv.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
@Component({
  selector: 'app-po05',
  templateUrl: './po05.page.html',
  styleUrls: ['./po05.page.scss'],
})
export class Po05Page implements OnInit {
  @Input() id:number;@Input() po_running:string;
  ionicForm: FormGroup;isSubmitted = false;filterTerm: string;
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription;maxdatalimit=0;
  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      typeserch_id: [{id: 1}],
      txtserach: [this.po_running],
    });
    this.loadData(0);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loadData(padding,infiniteScroll?){
    this.sub = this.poSv
    .getcfmanage('manage',this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data !== null) {
         //console.log(data);
         this.maxpadding = data["maxpadding"];
         this.maxdatalimit = data["limit"];
         this.data =  data.data_detail.map((item) => Object.assign({}, item));
      }
    });
    //console.log(this.data);
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

   doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loadData(this.page * this.limit, infiniteScroll);
    }
  }
}
