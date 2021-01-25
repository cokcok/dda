import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {SigninSvService} from '../sv/signin-sv.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-chpass',
  templateUrl: './chpass.page.html',
  styleUrls: ['./chpass.page.scss'],
})
export class ChpassPage implements OnInit {
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;ionicForm1: FormGroup;isSubmitted1 = false
  portControl: FormControl;sub: Subscription;
  id: number;  picresizbase64Array: FormArray; picresizbase64:any; 
  data = []; picpreview =[];   indexpic = 0;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public signinSv: SigninSvService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicForm = this.formBuilder.group({
      id: [""],
      prefix_name: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      picresizbase64List:  this.picresizbase64Array,
    });
    this.ionicForm1 = this.formBuilder.group({
      id: [this.configSv.emp_id],
      oldpass: ["", [Validators.required]],
      newpass: ["", [Validators.required]],
      comfirm_newpass: ["", [Validators.required]],
    },{validator: this.checkPasswords});

    this.loaddata()
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('newpass').value;
  let confirmPass = group.get('comfirm_newpass').value;

  return pass === confirmPass ? null : { notSame: true }     
}


  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loaddata() {
    this.sub = this.signinSv
      .getchpass(13,'read')
      .subscribe((data) => {
        if (data !== null) {
          data.data_detail.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
              if(key === 'picresizbase64List'){
                this.picpreview = Object(value).map((item) => Object.assign({}, item));
                this.picpreview.forEach(task => {
                    //console.log('a',task.id,task.url);
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
      });
  }

  onClick_fileUpload() {
    this.fileIngimg.nativeElement.click();
  }

  fileUpload_img(event) {
    var file = event.srcElement.files[0];
    if (typeof file !== 'undefined') {      
      if (file.type.match(/image.*/)) {
        this.picresizbase64Array.clear();
        this.picpreview = [];
        this.indexpic = 0;
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

  chData(){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      console.log(this.ionicForm.value);
      this.sub = this.signinSv
      .crudchpass(this.ionicForm.value, 'chdata')
      .subscribe(
        (data) => {
            if(data.status === "ok"){
              this.configSv.ChkformAlert(data.message);
              this.signinSv.publishSomeData1(this.ionicForm.value);
            }
            else{
              this.configSv.ChkformAlert(data.message);
            }              
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  get errorControl1() {
    return this.ionicForm1.controls;
  }

  chPass(){
    this.isSubmitted1 = true;
    console.log(this.ionicForm1.value);
    if (!this.ionicForm1.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      console.log(this.ionicForm1.value);
      this.sub = this.signinSv
      .crudchpass(this.ionicForm1.value, 'chpass')
      .subscribe(
        (data) => {
            if(data.status === "ok"){
              this.configSv.ChkformAlert(data.message);
            }
            else{
              this.configSv.ChkformAlert(data.message);
            }              
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

}
