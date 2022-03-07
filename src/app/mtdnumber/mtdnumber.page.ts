import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs"; 
import { AlertController } from "@ionic/angular";
import { MtdSvService} from '../sv/mtd-sv.service';
import { NavController } from '@ionic/angular';
import { utils, write, WorkBook } from 'xlsx';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mtdnumber',
  templateUrl: './mtdnumber.page.html',
  styleUrls: ['./mtdnumber.page.scss'],
})
export class MtdnumberPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,public configSv: ConfigService,private alertCtrl: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      color: ["", [Validators.required]],
      color_acronym: ["", [Validators.required]],
      number_qty: [""],
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
      .crudmtdnumber(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                color: this.ionicForm.controls.color.value,
                color_acronym: this.ionicForm.controls.color_acronym.value,
                number_qty:0,
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
      .getmtd(5,padding,this.limit)
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
            this.sub = this.mtdSv.crudmtdnumber(item, 'cancel',data['cause']).subscribe(
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
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  addData(id,color){
    this.navCtrl.navigateForward(['/mtdnumberdetail'],{
      queryParams: {
         value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
         xxx :'aaa',
        },
      });
  }

  report() {
    this.sub = this.mtdSv
      .getreport_number('report')
      .subscribe((data) => {
        if (data !== null) {
          this.loadexcel(data.data_detail.map((item) => Object.assign({}, item)))
        }
      });
  }

  loadexcel(data) {
    if (data.length === 0) {
      this.configSv.ChkformAlert('ไม่พบข้อมูล');
      return false;
    }
    //console.log(data);
    const ws_name = 'sheetname';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    //const ws: any = utils.json_to_sheet(this.table);
    const ws: any = utils.json_to_sheet(data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, {
      bookType: 'xlsx', bookSST: true, type:
        'binary'
    });


    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'nb' + this.currentDate + ' ' + this.currentTime + '.xlsx');




  }
}
