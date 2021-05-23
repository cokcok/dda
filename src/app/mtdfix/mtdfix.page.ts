import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MtdSvService} from '../sv/mtd-sv.service';

@Component({
  selector: 'app-mtdfix',
  templateUrl: './mtdfix.page.html',
  styleUrls: ['./mtdfix.page.scss'],
})
export class MtdfixPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,public configSv: ConfigService,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      fix_name: ["", [Validators.required]],
      fix_price: ["", [Validators.required]],
      fix_cupon :[false],
      fix_green :[false],
      fix_install :[false],
      cut_number :[false],
      cut_green : [false],
      highlight: [""],
    });
    this.loaddata(0);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

 

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
     this.sub = this.mtdSv
      .crudmtdfix(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                fix_name: this.ionicForm.controls.fix_name.value,
                fix_price: this.ionicForm.controls.fix_price.value,
                fix_cupon: this.ionicForm.controls.fix_cupon.value,
                fix_green: this.ionicForm.controls.fix_green.value,
                cut_number: this.ionicForm.controls.cut_number.value,
                cut_green: this.ionicForm.controls.cut_green.value,
                highlight: true,
              });
            }else{
              this.configSv.ChkformAlert(data.message);
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
            }else{
              this.configSv.ChkformAlert(data.message);
            }
           
          }
          if(data.status === 'ok'){
            this.configSv.ChkformAlert(data.message);
          }       
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

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(11,padding,this.limit)
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


  doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  selectData(id) {
    let item;
    item = this.data.filter((val) => val.id == id);
    //console.log(item);
    item.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
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
            this.sub = this.mtdSv.crudmtdfix(item, 'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
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