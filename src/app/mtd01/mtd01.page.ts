import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MtdSvService } from '../sv/mtd-sv.service';
import { SysmenuSvService } from "../sv/sysmenu-sv.service";
import * as $ from 'jquery';


@Component({
  selector: 'app-mtd01',
  templateUrl: './mtd01.page.html',
  styleUrls: ['./mtd01.page.scss'],
})
export class Mtd01Page implements OnInit {
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  //@ViewChild('pwaphoto') pwaphoto: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  portControl: FormControl;sub: Subscription;
  filterTerm: string;page = 0;maxpadding = 0;limit = 50;
  id: number;  picresizbase64Array: FormArray; picresizbase64:any; 
  imgURI: any = null;
  data = []; picpreview =[]; groups:any;   indexpic = 0;
  disableSelect = false;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public mtdSv: MtdSvService, public sysmenuSv: SysmenuSvService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      prefix_name: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      nickname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      group_id: this.portControl,
      group_name: [""],
      //picresizbase64List: this.formBuilder.array([]),
      picresizbase64List: this.picresizbase64Array,
      highlight: [""],
    });
    //this.picresizbase64Array = this.ionicForm.get('picresizbase64List') as FormArray;
    this.loaddata_sysgroup(0);  this.loaddata(0);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  onClick_fileUpload() {
    this.fileIngimg.nativeElement.click();
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
      this.sub = this.mtdSv
        .crudmtd01(this.ionicForm.value, typesql)
        .subscribe(
          (data) => {
            if (typesql === "insert") {
              if(data.status === "ok"){
                this.data.unshift({
                  id: data.id,
                  prefix_name: this.ionicForm.controls.prefix_name.value,
                  name: this.ionicForm.controls.name.value,
                  surname: this.ionicForm.controls.surname.value,
                  nickname: this.ionicForm.controls.nickname.value,
                  username: this.ionicForm.controls.username.value,
                  group_id: this.ionicForm.controls.group_id.value.id,
                  group_name: this.ionicForm.controls.group_id.value.description,
                  picresizbase64List : this.ionicForm.controls.picresizbase64List.value,
                  highlight: true,
                });             
              }
              else{
                this.configSv.ChkformAlert(data.message);
              }              
            } else if (typesql === "update") {
              let item;
              item = this.data.filter((val) => val.id == data.id);
              item.forEach((item) => {
                for (const [key, value] of Object.entries(item)) {
                  if (key === "group_id") {
                    item[key] = this.ionicForm.controls[key].value.id;
                  }else if(key === "group_name"){
                    item[key] = this.ionicForm.controls.group_id.value.description;
                  }else if(key === 'picresizbase64List'){
                    item[key] = this.ionicForm.controls.picresizbase64List.value;
                  }else{
                    item[key] =  this.ionicForm.controls[key].value;
                  }
                }
              });
            }
             if(data.status === "ok"){this.configSv.ChkformAlert(data.message)}; 
            
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
  
  fileUpload_img(event) {
   // var file = event.srcElement.files[0];
    const fileList: FileList =  this.fileIngimg.nativeElement.files;
    //console.log(fileList[0].type);
    if (typeof fileList[0] !== 'undefined') {
      if (fileList[0].type.match(/image.*/)) {
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
        reader.readAsDataURL(fileList[0]);
      }
      else {
        alert('กรุณาระบุชนิดไฟล์รูปภาพ');
      }
    }
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(0,padding,this.limit)
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

  loaddata_sysgroup(padding: number, infiniteScroll?) {
    this.sub = this.sysmenuSv
      .getsysgroup(padding)
      .subscribe((data) => {
        if (data !== null) {
          this.groups =  data.data_detail.map((item) => Object.assign({}, item));   
        }
      });
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
    this.picresizbase64Array.clear();
    this.picpreview = [];
    this.indexpic = 0;
    this.disableSelect = false;
  }

  delImg(index){
    //console.log(index);
    this.picpreview = this.picpreview.filter(obj => obj.id !== index);
   this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(value => value.id === index));
    //delete this.picpreview[index];
    //delete this.picresizbase64List[index];
    /* this.picpreview.slice(index,1);
    this.picpreview = this.picpreview
     */
  }


  selectData(id) {
    //console.log(this.ports);
    let item;this.picpreview = [];this.picresizbase64Array.clear();
    item = this.data.filter((val) => val.id == id);
    this.disableSelect = true;
    //console.log(item);
    //this.ionicForm.controls['username'].disable();
    item.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
         //console.log(key , value)
        if (key === "group_id") {
          let value_a = this.groups.filter(function (item1) {
            return item1.id === value;
          })[0];
          //console.log(this.ports,value,a);
          this.portControl.setValue(value_a);
        }else if(key === 'picresizbase64List'){
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
        }
        else{
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
            this.sub = this.mtdSv.crudmtd01(item, 'cancel',data['cause']).subscribe(
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

  async resetPass(item: any) {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการ Reset Password',
      message: 'แน่ใจว่าต้องการ Reset Password เลขระบบที่ '+ item +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
            this.sub = this.mtdSv.crudmtd01(item, 'resetpwd').subscribe(
              (data) => {
                console.log(data);
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
                this.refreshForm();
              }
            );
        }
      }]
    });
    confirm.present();
  }


  // openPWAPhotoPicker() {
  //   if (this.pwaphoto == null) {
  //     return;
  //   }
  //   this.pwaphoto.nativeElement.click();
  // }

  // uploadPWA() {
  //   if (this.pwaphoto == null) {
  //     return;
  //   }
  //   const fileList: FileList = this.pwaphoto.nativeElement.files;
  //   if (fileList && fileList.length > 0) {
  //     //this.fileUpload_img(fileList);
  //     this.firstFileToBase64(fileList[0]).then((result: string) => {
  //       this.imgURI = result;
  //     }, (err: any) => {
  //       // Ignore error, do nothing
  //       this.imgURI = null;
  //     });
  //   }
  // }

  // private firstFileToBase64(fileImage: File): Promise<{}> {
  //   return new Promise((resolve, reject) => {
  //     let fileReader: FileReader = new FileReader();
  //     if (fileReader && fileImage != null) {
  //       fileReader.readAsDataURL(fileImage);
  //       fileReader.onload = () => {
  //         resolve(fileReader.result);
  //       };
  //       fileReader.onerror = (error) => {
  //         reject(error);
  //       };
  //     } else {
  //       reject(new Error('No file found'));
  //     }
  //   });
  // }


}
