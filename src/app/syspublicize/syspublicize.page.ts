import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-syspublicize',
  templateUrl: './syspublicize.page.html',
  styleUrls: ['./syspublicize.page.scss'],
})
export class SyspublicizePage implements OnInit {
  publicize:any;sub: Subscription;
  constructor(private navCtrl: NavController,public configSv: ConfigService, public sysmenuSv: SysmenuSvService) { 
    this.loaddata()

  }

  loaddata() {
    let datalimit;
    this.sub = this.sysmenuSv
      .getpublicize()
      .subscribe((data) => {
        if (data !== null) {
            this.publicize = data.data_detail[0]['name'];
        }
      });
  }
  
  ngOnInit(){}

  submitForm(value){
    this.sub = this.sysmenuSv
    .crudpublicize(value, 'update')
    .subscribe(
      (data) => {
        this.configSv.ChkformAlert(data.message);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );

  }

}
