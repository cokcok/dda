import { Component, OnInit } from '@angular/core';
import { MenuController,NavController } from '@ionic/angular';
@Component({
  selector: 'app-syspublicize',
  templateUrl: './syspublicize.page.html',
  styleUrls: ['./syspublicize.page.scss'],
})
export class SyspublicizePage implements OnInit {

  constructor(public menuCtrl: MenuController,private navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

}
