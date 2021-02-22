import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {PlaceSvService} from '../sv/place-sv.service';
import { MtdSvService} from '../sv/mtd-sv.service';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import * as $ from 'jquery';

@Component({
  selector: 'app-mtdmember',
  templateUrl: './mtdmember.page.html',
  styleUrls: ['./mtdmember.page.scss'],
})
export class MtdmemberPage implements OnInit {
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  place=[];sub: Subscription;filterTerm: string;
  id: number; data = [];  page = 0;maxpadding = 0;limit = 50;
  datePickerObj: any = {}; myDate = new Date().toISOString();
  portControl_area: FormControl; ports_area: any;
  picresizbase64Array: FormArray; picresizbase64:any; picpreview =[]; indexpic = 0;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,public placeSv:PlaceSvService,public mtdSv: MtdSvService) { }

  ngOnInit() {
    this.portControl_area = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      member_date: [moment().format('L'), [Validators.required]],
      member_idcard: ["", [Validators.required,Validators.minLength(13)]],
      member_name: ["", [Validators.required]],
      member_surname: ["", [Validators.required]] ,
      member_nickname: [""] ,
      member_brithday: [""] ,
      member_age :[{value: "",disabled: true}],
      member_nationality: [""],
      member_race: [""],
      member_religion: [""],
      member_address: ["", [Validators.required]],
      member_place: ["", [Validators.required]],
      member_tel: [""],
      member_email: [""],
      member_line: [""],
      member_winname: ["", [Validators.required]],
      mtd_area_id: this.portControl_area ,
      mtd_area_name: [""],
      member_yellow: ["", [Validators.required]],
      member_countwin: ["", [Validators.required]],
      picresizbase64List: this.picresizbase64Array,
      highlight: [""],

    });
    this.fndate();this.loaddata_area(0);this.loaddata(this.page);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate(){
    this.datePickerObj = {
      inputDate: moment(this.myDate),

       closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
       setLabel: 'เลือก',
       todayLabel: 'วันที่ปัจจุบัน',
       closeLabel: 'ปิด',
      // disabledDates: [],
      // titleLabel: 'Select a Date',
       monthsList: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
       weeksList: [ 'อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
      dateFormat: 'DD/MM/YYYY',
      // clearButton: false,
      // momentLocale: 'th-TH',
      // yearInAscending: true,
      // btnCloseSetInReverse: true,

      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: 'success'
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      }
    };
  }

  calage(value){
    //console.log(moment().format("DD/MM/YYYY"),value);
    var _value = moment(value,'DD/MM/YYYY');
    // var currentDate = new Date(); 
    // var diff = moment(currentDate).diff(_value, 'years',true);
    // console.log("Year", diff);
    var years = moment().diff(_value, 'years');
    //console.log(years,value);
    //var days = moment().diff('1981-01-01', 'days');
    this.ionicForm.controls['member_age'].setValue(years);
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
      .crudmtdmember(this.ionicForm.value,typesql)
      .subscribe((data) => {
        if (data !== null) {
          if (typesql === "insert") {
            if(data.status === 'ok'){
              this.data.unshift({
                id: data.id,
                member_date: this.ionicForm.controls.member_date.value,
                member_idcard: this.ionicForm.controls.member_idcard.value,
                member_name: this.ionicForm.controls.member_name.value,
                member_surname: this.ionicForm.controls.member_surname.value,
                member_nickname: this.ionicForm.controls.member_nickname.value,
                member_brithday: this.ionicForm.controls.member_brithday.value,
                member_age: this.ionicForm.controls.member_age.value,
                member_nationality: this.ionicForm.controls.member_nationality.value,
                member_race: this.ionicForm.controls.member_race.value,
                member_religion: this.ionicForm.controls.member_religion.value,
                member_address: this.ionicForm.controls.member_address.value,
                member_place: this.ionicForm.controls.member_place.value,
                member_tel: this.ionicForm.controls.member_tel.value,
                member_email: this.ionicForm.controls.member_email.value,
                member_line: this.ionicForm.controls.member_line.value,
                member_winname: this.ionicForm.controls.member_winname.value,
                mtd_area_id: this.ionicForm.controls.mtd_area_id.value.id,
                mtd_area_name: this.ionicForm.controls.mtd_area_id.value.area_name,
                member_yellow: this.ionicForm.controls.member_yellow.value,
                member_countwin: this.ionicForm.controls.member_countwin.value,
                picresizbase64List : this.ionicForm.controls.picresizbase64List.value,
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
                  if (key === "mtd_area_id") {
                    item[key] = this.ionicForm.controls[key].value.id;
                  }else if(key === "mtd_area_name"){
                    item[key] = this.ionicForm.controls['mtd_area_id'].value.area_name;
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
    this.ionicForm.reset({member_date:moment().format("DD/MM/YYYY")});
    this.isSubmitted = false;
    this.picresizbase64Array.clear();
    this.picpreview = [];
    this.indexpic = 0;
  }

  loaddata(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(9,padding,this.limit)
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
        if (key === "mtd_area_id") {
          let value_a = this.ports_area.filter(function (item1) {
            return item1.id === value;
          })[0];
          this.portControl_area.setValue(value_a);
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
            this.sub = this.mtdSv.crudmtdmember(item, 'cancel',data['cause']).subscribe(
              (data) => {
                //this.data = this.data.filter(obj => obj.id !== item);
               // console.log(this.data);
                if(data.status == 'ok')
                {   
                  this.data = this.data.filter(obj => obj.id !== item);
                  console.log(this.data);
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
