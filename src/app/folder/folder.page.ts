import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController,NavController } from '@ionic/angular';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    //this.menuCtrl.enable(true);
    /* this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.folder === 'Logout')
    {
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot('/signin');

    } */
    this.menuCtrl.enable(false);
    this.navCtrl.navigateRoot('/signin');
  }

}
