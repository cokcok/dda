import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MtdSvService} from '../sv/mtd-sv.service';
@Component({
  selector: 'app-mtdgreen',
  templateUrl: './mtdgreen.page.html',
  styleUrls: ['./mtdgreen.page.scss'],
})
export class MtdgreenPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,public configSv: ConfigService,private alertCtrl: AlertController) { }
  portControl_area: FormControl; ports_area: any;


  ngOnInit() {
    this.portControl_area = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      namewin: ["", [Validators.required]],
      mtd_area_id: this.portControl_area,
      qty: [{value: 0,disabled: true},[Validators.required]],
      tmpqty :[{value: 0,disabled: true}],  
      highlight: [""],
      area_name:[""],
    });
    this.loaddata_area(0);this.loaddata(0);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


  loaddata_area(padding: number, infiniteScroll?) {
    this.sub = this.mtdSv
      .getmtd(1,padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_area = data.data_detail.map((item) => Object.assign({}, item)); 
        }
      });
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
      .crudmtdgreen(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                namewin: this.ionicForm.controls.namewin.value,
                mtd_area_id: this.ionicForm.controls.mtd_area_id.value.id,
                area_name: this.ionicForm.controls.mtd_area_id.value.area_name,
                qty: 0,
                update_flg:0,
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
                  if (key === "mtd_area_id") {
                    item[key] = this.ionicForm.controls[key].value.id;
                  }else if(key === "area_name"){
                    item[key] = this.ionicForm.controls['mtd_area_id'].value.area_name;
                  }else if(key === "update_flg"){
                    this.ionicForm.controls['qty'].enable();
                  }else{
                    item[key] = this.ionicForm.controls[key].value;
                  }
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  refreshForm() {
    this.ionicForm.reset({qty: 0});
    this.ionicForm.controls['qty'].disable();
    this.isSubmitted = false;
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(10,padding,this.limit)
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
        if (key === "mtd_area_id") {
          let value_a = this.ports_area.filter(function (item1) {
            return item1.id === value;
          })[0];
          this.portControl_area.setValue(value_a);
        }else if(key === "update_flg"){
          if(value === '1'){
            this.ionicForm.controls['qty'].disable();
          }else{
            this.ionicForm.controls['qty'].enable();
          }
        }else{
          this.ionicForm.controls[key].setValue(value);
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
            this.sub = this.mtdSv.crudmtdgreen(item, 'cancel',data['cause']).subscribe(
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

  doInfinite(infiniteScroll) {
    this.page++;
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

}
