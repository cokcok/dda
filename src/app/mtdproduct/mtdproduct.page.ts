import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import { MtdSvService} from '../sv/mtd-sv.service';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-mtdproduct',
  templateUrl: './mtdproduct.page.html',
  styleUrls: ['./mtdproduct.page.scss'],
})
export class MtdproductPage implements OnInit {
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  portControl: FormControl; ports: any;
  picresizbase64Array: FormArray; picresizbase64:any; picpreview =[]; indexpic = 0;
  constructor(public mtdSv: MtdSvService,public formBuilder: FormBuilder,public configSv: ConfigService,private alertCtrl: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      product_name: ["", [Validators.required]],
      product_desc: [""],
      product_pattern: [""],
      product_model: [""],
      product_color: [""],
      product_type_id: this.portControl,
      product_type_name:[""],
      number_qty: [""],
      picresizbase64List: this.picresizbase64Array,
      highlight: [""],
    });
    this.loaddata_producttype(this.page);
    this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata_producttype(padding: number,  infiniteScroll?) {
    this.sub = this.mtdSv.getmtd(2,padding).subscribe((data) => {
      if (data !== null) {
        this.ports =  data.data_detail.map((item) => Object.assign({}, item));  
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
      .crudmtdproduct(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                product_name: this.ionicForm.controls.product_name.value,
                product_desc: this.ionicForm.controls.product_desc.value,
                product_pattern: this.ionicForm.controls.product_pattern.value,
                product_model: this.ionicForm.controls.product_model.value,
                product_color: this.ionicForm.controls.product_color.value,
                product_type_id: this.ionicForm.controls.product_type_id.value.id,
                product_type_name: this.ionicForm.controls.product_type_id.value.product_type,
                picresizbase64List : this.ionicForm.controls.picresizbase64List.value,
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
                  //item[key] = this.ionicForm.controls[key].value;
                  if (key === "product_type_id") {
                    item[key] = this.ionicForm.controls[key].value.id;
                  }else if(key === "product_type_name"){
                    item[key] = this.ionicForm.controls['product_type_id'].value.product_type;
                  }else if(key === 'picresizbase64List'){
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
            this.refreshForm();
          }       
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
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
      .getmtd(7,padding,this.limit)
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
    let item;this.picpreview = [];this.picresizbase64Array.clear();
    item = this.data.filter((val) => val.id == id);
    //console.log(item);
    item.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === "product_type_id") {
          let value_a = this.ports.filter(function (item1) {
            return item1.id === value;
          })[0];
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
            this.sub = this.mtdSv.crudmtdproduct(item, 'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  this.data = this.data.filter(obj => obj.id !== item);
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

  addData(id){
    this.navCtrl.navigateForward(['/mtdproductdetail'],{
      queryParams: {
         value : JSON.stringify(this.data.filter(function (val) { return val.id == id;}))
         //,xxx :'aaa',
        },
      });
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
