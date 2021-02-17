import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-sysgroup",
  templateUrl: "./sysgroup.page.html",
  styleUrls: ["./sysgroup.page.scss"],
})
export class SysgroupPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  sub: Subscription;
  filterTerm: string;
  page = 0;
  maxpadding = 0;
  limit = 50;
  id: number;
  data = [];
  constructor(  public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public sysmenuSv: SysmenuSvService,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      group_name: ["", [Validators.required]],
      description: [""],
      highlight: [""],
    });
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
          this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        }
      });
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }
  
  submitForm() {
    //console.log(this.ionicForm.value);
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
        .crudsysgroup(this.ionicForm.value, typesql)
        .subscribe(
          (data) => {
            if (typesql === "insert") {
              this.data.unshift({
                id: data.id,
                group_name: this.ionicForm.controls.group_name.value,
                description: this.ionicForm.controls.description.value,
                highlight: true,
              });
            } else if (typesql === "update") {
              let item;
              item = this.data.filter((val) => val.id == data.id);
              item.forEach((item) => {
                for (const [key, value] of Object.entries(item)) {
                   item[key] = this.ionicForm.controls[key].value;
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

  selectData(id) {
    let item;
    item = this.data.filter((val) => val.id == id);
    //console.log(item);
    item.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        // console.log(key , value)
        this.ionicForm.controls[key].setValue(value);
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
            this.sub = this.sysmenuSv.crudsysgroup(item, 'cancel',data['cause']).subscribe(
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
