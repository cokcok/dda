import { Component, OnInit } from "@angular/core";
import {FormBuilder,FormGroup,Validators,FormControl,} from "@angular/forms";
import { ConfigService } from "./../sv/config.service";
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-syssubmenu",
  templateUrl: "./syssubmenu.page.html",
  styleUrls: ["./syssubmenu.page.scss"],
})
export class SyssubmenuPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  portControl: FormControl;
  sub: Subscription;
  filterTerm: string;
  page = 0;
  maxpadding = 0;
  limit = 50;
  id: number;
  data = [];
  ports: any;
  /*  ports = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
  ];  */
  constructor(
    public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public sysmenuSv: SysmenuSvService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      title: ["", [Validators.required]],
      url: ["", [Validators.required]],
      svg: [""],
      seq: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      open: [""],
      sys_menu_id: this.portControl,
      title_menu: [""],
      highlight: [""],
    });
    this.loaddata_mainmenu(this.page);

    this.loaddata(this.page);
  }
 
  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    //console.log(this.ionicForm.value);
    // console.log(this.ionicForm.controls.port.value.id);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      let typesql: string;
      if (!this.ionicForm.controls.id.value) {
        typesql = "insert";
      } else {
        typesql = "update";
      }
      //console.log(this.ionicForm.value);
      this.sub = this.sysmenuSv
        .crudsyssubmenu(this.ionicForm.value, typesql)
        .subscribe(
          (data) => {
            if (typesql === "insert") {
              this.data.unshift({
                id: data.id,
                title: this.ionicForm.controls.title.value,
                url: this.ionicForm.controls.url.value,
                svg: this.ionicForm.controls.svg.value,
                seq: this.ionicForm.controls.seq.value,
                open: this.ionicForm.controls.open.value,
                sys_menu_id: this.ionicForm.controls.sys_menu_id.value.id,
                title_menu: this.ionicForm.controls.sys_menu_id.value.title,
                highlight: true,
              });
            } else if (typesql === "update") {
              let item;
              item = this.data.filter((val) => val.id == data.id);
              item.forEach((item) => {
                for (const [key, value] of Object.entries(item)) {
                   item[key] = this.ionicForm.controls[key].value;
                    if(key === 'sys_menu_id'){
                      item[key] = this.ionicForm.controls[key].value.id;
                    }
                    if(key === 'title_menu'){
                      item[key] = this.ionicForm.controls['sys_menu_id'].value.title;
                    }
                }
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

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }

  loaddata_mainmenu(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.sysmenuSv.getsysmenu(padding).subscribe((data) => {
      if (data !== null) {
        this.ports = data.data_detail.map((item) => Object.assign({}, item));
        //console.log(this.ports);
      }
    });
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.sysmenuSv
      .getsyssubmenu(padding, this.limit)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data.data_detail);
          this.maxpadding = data["maxpadding"];
          datalimit = data["limit"];
          this.data = data.data_detail.map((item) => Object.assign({}, item));
          // console.log(this.data, this.maxpadding);
          /*     for (let i = 0; i < datalimit; i++) {
            //console.log(data['data_detail'][i]['id']);
            this.data.push({
              'id': data['data_detail'][i]['id'],
              'title': data['data_detail'][i]['title'],
              'url': data['data_detail'][i]['url'],
              'svg': data['data_detail'][i]['svg'],
              'seq': data['data_detail'][i]['seq'],
              'submenu': data['data_detail'][i]['submenu'],
            });
          } */
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
    //console.log(this.page, this.maxpadding);
    /*  setTimeout(() => {
       this.loaddata(this.page * this.limit , infiniteScroll);     
     },1000); */
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  selectData(id) {
    //console.log(this.ports);
    let item;
    item = this.data.filter((val) => val.id == id);
    //console.log(item);
    item.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        // console.log(key , value)
        this.ionicForm.controls[key].setValue(value);
        if (key === "sys_menu_id") {
          let a = this.ports.filter(function (item1) {
            return item1.id === value;
          })[0];
          //console.log(this.ports,value,a);
          this.portControl.setValue(a);
        }
      }
    });
  }

  async cancelData(item: any) {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
      inputs: [
        {
          name: 'cause',
          placeholder: 'ระบุเหตุผลในการยกเลิก',
        },
      ],
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
           if(data['cause']){
            this.sub = this.sysmenuSv.crudsyssubmenu(item, 'cancel',data['cause']).subscribe(
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
                this.data = this.data.filter(obj => obj.id !== item);
                this.refreshForm();
              }
            );
          } 
          else{
            this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการลบด้วย');
          }
        }
      }]
    });
    confirm.present();
  }
}
