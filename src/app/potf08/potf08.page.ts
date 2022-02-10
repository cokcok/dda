import { Component, OnInit } from '@angular/core';
import { MenuController,ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
@Component({
  selector: 'app-potf08',
  templateUrl: './potf08.page.html',
  styleUrls: ['./potf08.page.scss'],
})
export class Potf08Page implements OnInit {

  constructor(public menuCtrl: MenuController,public configSv: ConfigService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private poSv: PoSvService) { }

  ngOnInit() {
    this.poSv.publishSomeData_tf(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

}
