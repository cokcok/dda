import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {PlaceSvService} from '../sv/place-sv.service';
@Component({
  selector: 'app-mtdsupplier',
  templateUrl: './mtdsupplier.page.html',
  styleUrls: ['./mtdsupplier.page.scss'],
})
export class MtdsupplierPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  place=[];sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    private alertCtrl: AlertController,private placeSv:PlaceSvService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      supply_name: ["", [Validators.required]],
      supply_address: ["", [Validators.required]],
      supply_place: ["", [Validators.required]],
      supply_tel: ["", [Validators.required]] ,
      supply_taxid: ["", [Validators.required]] ,
      supply_email: [""],
      highlight: [""],

    });
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.placeSv
      .getmtdsupply(padding, this.limit)
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

  submitForm(){
    console.log(this.ionicForm.value)
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
      this.sub = this.placeSv
      .crudsupply(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            this.data.unshift({
              id: data.id,
              supply_name: this.ionicForm.controls.supply_name.value,
              supply_address: this.ionicForm.controls.supply_address.value,
              supply_place: this.ionicForm.controls.supply_place.value,
              supply_tel: this.ionicForm.controls.supply_tel.value,
              supply_taxid: this.ionicForm.controls.supply_taxid.value,
              supply_email: this.ionicForm.controls.supply_email.value,
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
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
      () => {
        this.refreshForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
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
            this.sub = this.placeSv.crudsupply(item, 'cancel',data['cause']).subscribe(
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
