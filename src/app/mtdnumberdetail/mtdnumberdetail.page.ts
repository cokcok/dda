import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MtdSvService} from '../sv/mtd-sv.service';

@Component({
  selector: 'app-mtdnumberdetail',
  templateUrl: './mtdnumberdetail.page.html',
  styleUrls: ['./mtdnumberdetail.page.scss'],
})
export class MtdnumberdetailPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  sub: Subscription;filterTerm: string; 
  page = 0;maxpadding = 0;limit = 50;
  id: number;
  data = [];
  color_name; color_id; portControl: FormControl; ports: any;
  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController) { 
      this.activatedRoute.queryParams.subscribe((res) => {
        let item = JSON.parse(res.value)
        //console.log(item);
        this.color_id = item[0]['id'];
        this.color_name = item[0]['color'];
        // console.log(res['xxx']);
      });

    }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id:[""],
      mtd_number_id:[this.color_id],
      number: ["",[Validators.required]],
      mtd_size_id: this.portControl,
      //qty: ["0",[Validators.required]],
      qty: [{value: 0,disabled: true},[Validators.required]],
      price: ["",[Validators.required]],
      size_name:[""],
      highlight: [""],
    }); 
    this.loaddata_size(this.page);
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


  loaddata_size(padding: number,  infiniteScroll?) {
    this.sub = this.mtdSv.getmtd(3,padding).subscribe((data) => {
      if (data !== null) {
        this.ports = data.data_detail.map((item) => Object.assign({}, item));
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
      .crudmtdnumberdetail(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                mtd_number_id: this.ionicForm.controls.mtd_number_id.value,
                number: this.ionicForm.controls.number.value,
                mtd_size_id: this.ionicForm.controls.mtd_size_id.value.id,
                size_name: this.ionicForm.controls.mtd_size_id.value.size,
                qty: this.ionicForm.controls.qty.value,
                price: this.ionicForm.controls.price.value,
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
                  //item[key] = this.ionicForm.controls[key].value;
                  if (key === "mtd_size_id") {
                    item[key] = this.ionicForm.controls[key].value.id;
                  }else if(key === "size_name"){
                    item[key] = this.ionicForm.controls['mtd_size_id'].value.size;
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
    //this.ionicForm.reset({qty: [{value: 0, disabled: true}]});
    
    this.ionicForm.reset({qty: 0,mtd_number_id:this.color_id});
    this.ionicForm.controls['qty'].disable();
    this.isSubmitted = false;

  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(6,padding,this.limit,this.color_id)
      .subscribe((data) => {
        if (data !== null) {
          this.maxpadding = data["maxpadding"];
          datalimit = data["limit"];
          this.data = data.data_detail.map((item) => Object.assign({}, item));
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
        if (key === "mtd_size_id") {
          let value_a = this.ports.filter(function (item1) {
            return item1.id === value;
          })[0];
          this.portControl.setValue(value_a);
        }else if(key === "update_flg"){
          //console.log(value);
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
            this.sub = this.mtdSv.crudmtdnumberdetail(item, 'cancel',data['cause']).subscribe(
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
