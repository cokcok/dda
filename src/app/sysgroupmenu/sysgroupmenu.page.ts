import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../sv/config.service";
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sysgroupmenu',
  templateUrl: './sysgroupmenu.page.html',
  styleUrls: ['./sysgroupmenu.page.scss'],
})
export class SysgroupmenuPage implements OnInit {
  sub: Subscription;
  filterTerm: string;
  page = 0;
  maxpadding = 0;
  limit = 50; data = [];
  constructor(public configSv: ConfigService,
    public sysmenuSv: SysmenuSvService, private navCtrl: NavController, public router: Router) { }

  ngOnInit() {
    this.loaddata(this.page);
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.sysmenuSv
      .getsysgroup(padding, this.limit)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data.data_detail);
          this.maxpadding = data["maxpadding"];
          datalimit = data["limit"];
          this.data = data.data_detail.map((item) => Object.assign({}, item));
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  selectData(id) {
    // this.navCtrl.navigateForward('/sysgroupmenu01');
    /* let item = this.data.filter((val) => val.id == id);
     this.navCtrl.navigateForward(['/sysgroupmenu01', {'item':item}]);
   } */

    /*  let item = this.data.filter((val) => val.id == id);
   this.router.navigate(['/sysgroupmenu01'],{
     queryParams: this.data.filter((val) => val.id == id),
     });
   } */

    /* this.navCtrl.navigateForward(['/sysgroupmenu01', {
      'item':this.data.filter(function (val) { return val.id == id;})}]); */

      this.navCtrl.navigateForward(['/sysgroupmenu01'],{
        queryParams: {
           value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
           xxx :'aaa',
          },
        });

  }
}
