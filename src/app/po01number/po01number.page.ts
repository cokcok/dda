import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import { PoSvService } from '../sv/po-sv.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-po01number',
  templateUrl: './po01number.page.html',
  styleUrls: ['./po01number.page.scss'],
})
export class Po01numberPage implements OnInit {
  @Input() index:number;
  ionicForm: FormGroup;isSubmitted = false; 
  sub: Subscription;
  portControl_front: FormControl; ports_front: any;
  portControl_back: FormControl; ports_back: any;
  constructor(private modalCtrl:ModalController,private navCtrl: NavController,public formBuilder: FormBuilder,public configSv: ConfigService,public mtdSv: MtdSvService,private alertCtrl: AlertController,private poSv: PoSvService) { }

  ngOnInit() {
    this.portControl_front = this.formBuilder.control("", Validators.required);
    this.portControl_back = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      podetail_number:["",[Validators.required]],
      tmp_number:[],
      mtd_numberfront_id:this.portControl_front,
      mtd_numberback_id: this.portControl_back,
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  ChkNumber(){
    const name = new String(this.ionicForm.controls.podetail_number.value)
    const map = Array.prototype.map
    const tmp_number = map.call(name, eachLetter => {
        return eachLetter
    });
    this.sub = this.poSv
    .getnumber('readnumber',tmp_number)
    .subscribe((data) => {
      if (data !== null) {
       // this.ports_productmain = data.data_detail.map((item) => Object.assign({}, item));
      }
    });
  }

  submitForm(){
    let data = ['aaa','dddd','ccc'];
    this.modalCtrl.dismiss(data);
  }

}
