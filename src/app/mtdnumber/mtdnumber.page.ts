import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms";  
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
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
  picresizbase64Array: FormArray; picresizbase64:any; picpreview =[]; indexpic = 0;
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,public configSv: ConfigService,private alertCtrl: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      color: ["", [Validators.required]],
      color_acronym: ["", [Validators.required]],
      number_qty: [""],
      highlight: [""],
      picresizbase64List: this.picresizbase64Array,
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
                picresizbase64List : this.ionicForm.controls.picresizbase64List.value,
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

                  if(key === 'picresizbase64List'){
                    item[key] = this.ionicForm.controls.picresizbase64List.value;
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
    this.ionicForm.reset();
    this.isSubmitted = false;
    this.picresizbase64Array.clear();
    this.picpreview = [];
    this.indexpic = 0;
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
       // this.ionicForm.controls[key].setValue(value);
      if(key === 'picresizbase64List'){
        this.picpreview = Object(value).map((item) => Object.assign({}, item));
        //console.log(this.picpreview);
        this.picpreview.forEach(task => {
           //console.log(task)
            this.indexpic++;
            this.picresizbase64Array.push(this.formBuilder.group({
            id: [task.id],
            url: [task.url],
          }));
      });
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

  onClick_fileUpload() {
    this.fileIngimg.nativeElement.click();
  }

  fileUpload_img(event) {
    var file = event.srcElement.files[0];
    //console.log(file);
    if (typeof file !== 'undefined') {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        var self = this;
        reader.onloadend = function () {
          //self.picbase64 = reader.result
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 200; // target width
          canvas.height = 200; // target height
          var image = new Image();
          image.src = reader.result as string;
          image.onload = function (e) {
            ctx.drawImage(image,
              0, 0, image.width, image.height,
              0, 0, canvas.width, canvas.height
            );
            // create a new base64 encoding
            var resampledImage = new Image();
            resampledImage.src = canvas.toDataURL();
            self.picresizbase64 = resampledImage.src;
              self.picpreview.push({
                id:self.indexpic,
                url:resampledImage.src
              });
              
             self.picresizbase64Array.push(self.formBuilder.group({
                id:[self.indexpic],
                url: [self.picresizbase64],
               
              }));
              self.indexpic++;
          };
        }
        reader.readAsDataURL(file);
      }
      else {
        alert('กรุณาระบุชนิดไฟล์รูปภาพ');
      }
    }
  }

  delImg(index){
    this.picpreview = this.picpreview.filter(obj => obj.id !== index);
   this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(value => value.id === index));
  }


}
