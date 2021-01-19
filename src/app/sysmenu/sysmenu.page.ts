import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from './../sv/config.service';
import { SysmenuSvService } from '../sv/sysmenu-sv.service';
import { Subscription } from 'rxjs';
import { data } from '../../../../githost/src/app/model/data';
import {  AlertController } from '@ionic/angular';
@Component({
  selector: 'app-sysmenu',
  templateUrl: './sysmenu.page.html',
  styleUrls: ['./sysmenu.page.scss'],
})
export class SysmenuPage implements OnInit {
  ionicForm: FormGroup; isSubmitted = false;
  sub: Subscription; filterTerm: string;
  page = 0; maxpadding = 0; limit = 50;
  id: number;
  data = [];


  constructor(public formBuilder: FormBuilder, public configSv: ConfigService, public sysmenuSv: SysmenuSvService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      url: [''],
      svg: [''],
      seq: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      submenu: [''],
      highlight: ['']
    });
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    //console.log(this.ionicForm.value);
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      let typesql: string;
      if (!this.ionicForm.controls.id.value) {
        typesql = 'insert';
      }
      else {
        typesql = 'update';
      }
      // console.log(this.ionicForm.value);

      this.sub = this.sysmenuSv.crudsysmenu(this.ionicForm.value, typesql).subscribe(
        (data) => {
          if (typesql === 'insert') {
            this.data.unshift({
              id: data.id,
              title: this.ionicForm.controls.title.value,
              url: this.ionicForm.controls.url.value,
              svg: this.ionicForm.controls.svg.value,
              seq: this.ionicForm.controls.seq.value,
              submenu: this.ionicForm.controls.submenu.value,
              highlight: true
            });
          }
          else if (typesql === 'update') {
            let item;
            item = this.data.filter(val => val.id == data.id);
            item.forEach(item => {
              for (const [key, value] of Object.entries(item)) {
                item[key] = this.ionicForm.controls[key].value;
                //console.log(key , value);
                //console.log(item[key] = 0);
                //this.ionicForm.controls[key].setValue(value);
              }
            });

          }
          this.configSv.ChkformAlert(data.message);
        }, (error) => {
          console.log(JSON.stringify(error));
        }, () => {

          this.refreshForm();
        }
      );
    }
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.sysmenuSv.getsysmenu(padding, this.limit).subscribe(
      (data) => {
        if (data !== null) {
          //console.log(data.data_detail);
          this.maxpadding = data['maxpadding'];
          datalimit = data['limit'];
          // console.log(this.data, this.maxpadding);
          for (let i = 0; i < datalimit; i++) {
            //console.log(data['data_detail'][i]['id']);
            this.data.push({
              'id': data['data_detail'][i]['id'],
              'title': data['data_detail'][i]['title'],
              'url': data['data_detail'][i]['url'],
              'svg': data['data_detail'][i]['svg'],
              'seq': data['data_detail'][i]['seq'],
              'submenu': data['data_detail'][i]['submenu'],
            });
          }
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  doInfinite(infiniteScroll) {
    this.page++;
    console.log(this.page, this.maxpadding);
    /*  setTimeout(() => {
       this.loaddata(this.page * this.limit , infiniteScroll);     
     },1000); */
    this.loaddata(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;

  }

  selectData(id) {
    let item;
    item = this.data.filter(val => val.id == id);
    //console.log(item);
    item.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
        //console.log(key , value)
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
         // console.log('ok ', data,data['cause']);
          //this.data = this.data.filter(obj => obj.id !== item);
         // console.log(this.data);
           if(data['cause']){
            this.sub = this.sysmenuSv.crudsysmenu(item, 'cancel',data['cause']).subscribe(
              (data) => {
                //this.data = this.data.filter(obj => obj.id !== item);
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
