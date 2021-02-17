import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {MtdSvService} from '../sv/mtd-sv.service';
@Component({
  selector: 'app-mtdproducttype',
  templateUrl: './mtdproducttype.page.html',
  styleUrls: ['./mtdproducttype.page.scss'],
})
export class MtdproducttypePage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,
    public configSv: ConfigService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      product_type: ["", [Validators.required]],
      product_type_desc: [""],
      highlight: [""],
    });
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm(){
    //console.log(this.ionicForm.value)
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
      this.sub = this.mtdSv
      .crudmtdproducttype(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                product_type: this.ionicForm.controls.product_type.value,
                product_type_desc: this.ionicForm.controls.product_type_desc.value,
                highlight: true,
              });
            }
          } else if (typesql === "update") {
            if(data.status === 'ok'){
              let item;
              item = this.data.filter((val) => val.id == data.id);
              item.forEach((item) => {
                for (const [key, value] of Object.entries(item)) {
                  item[key] = this.ionicForm.controls[key].value;
                }
              });
            }
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

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(2,padding,this.limit)
      .subscribe((data) => {
        if (data !== null) {
          this.maxpadding = data["maxpadding"];
          datalimit = data["limit"];
          this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        }
      });
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
            this.sub = this.mtdSv.crudmtdproducttype(item, 'cancel',data['cause']).subscribe(
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

  doInfinite(infiniteScroll) {
    this.page++;
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

}