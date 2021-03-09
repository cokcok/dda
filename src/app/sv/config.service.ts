import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Injectable({
  providedIn: 'root'
}) 
export class ConfigService {
  public ip = 'http://localhost:8012/ws_dda/';
  public token;
  public emp_id:number; 
  public group_id:number; public pic:string;
  public prefix_name:string;public surname:string;public name:string
  //emp_name:string; dept_name:string;pic:string;
  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener,private loadingController: LoadingController,private alertCtrl: AlertController) { }


  async loadingAlert(dur:number) {

    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลดข้อมูล...',
      duration: dur
    });
    return await loading.present();
   
   // return loading;
  } 

  async ChkformAlert(text:string){
    const alert = await this.alertCtrl.create({
      message: text,
      buttons: ['ตกลง']
      });
      return await alert.present();
  }

  saveToDevice(pdfobj: any, savefile: any) {
    if (this.plt.is('cordova')) {
      pdfobj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.externalDataDirectory, savefile, blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.externalDataDirectory + savefile, 'application/pdf');
        },
          (error) => {// สำหรับ รัน add platform browser
            pdfobj.download();
          }
        )
      });
    } else {
      // On a browser simply use download!
      pdfobj.download();
    }
  }
}
 