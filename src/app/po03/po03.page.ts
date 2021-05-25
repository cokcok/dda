import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import {PoSvService} from '../sv/po-sv.service';
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
  @Input() id:number;@Input() po_running:string;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;
  portControl_sale: FormControl; ports_sale: any;
  portControl_productmain: FormControl; ports_productmain: any;
  tmpproduct =[];per_amount = [];
  //allDiscount = 0;alltotalproduct=0;alltotal=0;
  myDate = new Date().toISOString();
  datePickerObj: any = {};


  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private poSv: PoSvService,public placeSv:PlaceSvService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      po_running:[""],
      po_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
    
    });
  }

}
