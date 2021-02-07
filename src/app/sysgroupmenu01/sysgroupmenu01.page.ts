import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
@Component({ 
  selector: 'app-sysgroupmenu01',
  templateUrl: './sysgroupmenu01.page.html',
  styleUrls: ['./sysgroupmenu01.page.scss'],
})
export class Sysgroupmenu01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;  portControl: FormControl;
  sub: Subscription;filterTerm: string;
  page = 0;maxpadding = 0;limit = 50;
  id: number;
  data = [];
  ports: any;
  group_name; group_id;
  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public sysmenuSv: SysmenuSvService,
    private alertCtrl: AlertController) {
    this.activatedRoute.queryParams.subscribe((res) => {
      let item = JSON.parse(res.value)
      console.log(item);
      this.group_id = item[0]['id'];
      this.group_name = item[0]['group_name'];
      // console.log(res['xxx']);
    });

  }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      syssubmenu_id: this.portControl,
      title_menu: [""],
      highlight: [""],
      group_id:[this.group_id]
    });
    this.loaddata_submenu(this.page);
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata_submenu(padding: number,  infiniteScroll?) {
    this.sub = this.sysmenuSv.getsyssubmenu_sysgroupmenu(padding,this.group_id,'readsubmenu').subscribe((data) => {
      if (data !== null) {
        this.ports = data.data_detail.map((item) => Object.assign({}, item));
        //console.log(this.ports);
      }
    });
  }
  loaddata(padding: number,  infiniteScroll?) {
    let datalimit;
    this.sub = this.sysmenuSv.getsyssubmenu_sysgroupmenu(padding,this.group_id,'read').subscribe((data) => {
      if (data !== null) {
        this.maxpadding = data["maxpadding"];
        datalimit = data["limit"];
        this.data = data.data_detail.map((item) => Object.assign({}, item));
        //console.log(this.ports);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }
    });
  }


  submitForm() {
    //console.log(this.ionicForm.value);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      let  typesql = "insert";
     // console.log(this.ports);
      //this.data = this.data.filter(obj => obj.id !== item);
     /*   this.ionicForm.controls.syssubmenu_id.value.forEach(value => {
        this.ports = this.ports.filter(obj => obj.id !== value['id']);
        //console.log(value['title_show']);
        //this.ports.deletePort(value['title_show']);
        
      });  */
    /*   console.log(this.ionicForm.value);
      this.ionicForm.controls.syssubmenu_id.value.forEach(value => {
        console.log(value['title_show']);
      }); */
        this.sub = this.sysmenuSv
        .crudsyssubmenu_sysgroupmenu(this.ionicForm.value, typesql)
        .subscribe(
          (data) => {
             if (typesql === "insert") {
              this.ionicForm.controls.syssubmenu_id.value.forEach((value,index) => {
                // console.log(value['title_show']);
                // console.log(data.id[index]);
                this.data.unshift({
                  id: data.id[index],
                  title_show: value['title_show'],
                  highlight: true,
                }); 
                this.ports = this.ports.filter(obj => obj.id !== value['id']);
              });
            } 
            this.configSv.ChkformAlert(data.message); 
          },
          (error) => {
            console.log(JSON.stringify(error));
          },
          () => {
            this.refreshForm();
          }
        ); 
    }
  }

  doInfinite(infiniteScroll) {
    this.page++;
    //console.log(this.page ,)
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }

  async deleteData(item){
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
            this.sub = this.sysmenuSv.crudsyssubmenu_sysgroupmenu(item, 'delete').subscribe(
              (data) => {
                if(data.message == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }              
              }, (error) => {
                console.log(JSON.stringify(error));
              }, () => {
                //console.log(this.data.filter(obj => obj.id == item));
                //console.log(this.data.filter((val) => val.id == item));
               // this.ports.push(this.data.filter((val) => val.id == item))
                this.data = this.data.filter(obj => obj.id !== item);
                this.refreshForm();
              }
            );
        }
      }]
    });
    confirm.present();

  }
}
