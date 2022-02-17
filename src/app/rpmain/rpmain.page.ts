import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import {RpSvService} from '../sv/rp-sv.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-rpmain',
  templateUrl: './rpmain.page.html',
  styleUrls: ['./rpmain.page.scss'],
})
export class RpmainPage implements OnInit {
  filterTerm: string;data = [];sub: Subscription;
  constructor( private navCtrl: NavController,public configSv: ConfigService,public rpSv: RpSvService,) { }

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    let datalimit;
    this.sub = this.rpSv
      .getmtd_report()
      .subscribe((data) => { 
        if (data !== null) {
          this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));   
          
        }
      });
  }

  goToSelect(url) {
    this.navCtrl.navigateForward(url);
    }

}
