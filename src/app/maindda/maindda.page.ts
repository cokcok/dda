import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-maindda',
  templateUrl: './maindda.page.html',
  styleUrls: ['./maindda.page.scss'],
})
export class MainddaPage implements OnInit {
  name:any;sub: Subscription;
  constructor(public menuCtrl: MenuController, public sysmenuSv: SysmenuSvService) { 
    this.loaddata();
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    
  }


  loaddata() {
    let datalimit;
    this.sub = this.sysmenuSv
      .getpublicize()
      .subscribe((data) => {
        if (data !== null) {
            this.name = data.data_detail[0]['name'];
        }
      });
  }

}
