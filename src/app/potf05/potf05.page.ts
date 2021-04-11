import { Component, OnInit,Input, ElementRef, ViewChild } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-potf05',
  templateUrl: './potf05.page.html',
  styleUrls: ['./potf05.page.scss'],
})
export class Potf05Page implements OnInit {
  myImg: any;
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  imgURI: string = null;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,private alertCtrl: AlertController,private poSv: PoSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
  }


  dismissModal(){
    this.modalCtrl.dismiss(); //this.countassign,'confirm'
  }


  takePicture() {
    // // กำหนด options ให้กับ Camera
    // // ดูรายละเอียด options เพ􀀄มิ เติมได้ท􀀄ี https://github.com/apache/cordova-plugincamera
    // const options: CameraOptions = {
    // destinationType: this.camera.DestinationType.DATA_URL,
    // // เลือก sourceType เป็นกล้อง หรือหากต้องการเลือกจาก Gallery ก็ใช้ sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM
    // sourceType: this.camera.PictureSourceType.CAMERA,
    // encodingType: this.camera.EncodingType.JPEG, // ลือกนามสกุลรูปเป็น jpeg
    // targetWidth: 400,
    // targetHeight: 400,
    // saveToPhotoAlbum: false,
    // correctOrientation: true
    // };
    // this.camera.getPicture(options).then((imageData) => {
    // // imageData is either a base64 encoded string or a file URI
    // // If it's base64:
    // // เมื􀀄อถ่ายรูปสำเร็จก็จะ encode เป็น base64 แล้วกำหนดให้กับ myImg แล้วนำไปแสดงผลที􀀄 template
    // // ในจังหวะนี􀀭เราสามารถใช้ตัวแปร this.myImg บันทึกเก็บลงฐานข้อมูลได้เลย และให้คอลัมน์ในตารางฐานข้อมูลมีชนิดเป็น TEXT
    // // ถ้าเก็บลงฐานข้อมูลแล้ว เราก็สามารถดึงคอลัมน์นี􀀭มาแสดงผลรูปภาพได้ทันที
    // this.myImg = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    // // Handle error
    // });
     }

     openPWAPhotoPicker() {
      if (this.pwaphoto == null) {
        return;
      }
  
      this.pwaphoto.nativeElement.click();
    }
  
    uploadPWA() {
  
      if (this.pwaphoto == null) {
        return;
      }
  
      const fileList: FileList = this.pwaphoto.nativeElement.files;
  
      if (fileList && fileList.length > 0) {
        this.firstFileToBase64(fileList[0]).then((result: string) => {
          this.imgURI = result;
        }, (err: any) => {
          // Ignore error, do nothing
          this.imgURI = null;
        });
      }
    }
  
    private firstFileToBase64(fileImage: File): Promise<{}> {
      return new Promise((resolve, reject) => {
        let fileReader: FileReader = new FileReader();
        if (fileReader && fileImage != null) {
          fileReader.readAsDataURL(fileImage);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
  
          fileReader.onerror = (error) => {
            reject(error);
          };
        } else {
          reject(new Error('No file found'));
        }
      });
    }
   
  }