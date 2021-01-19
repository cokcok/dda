import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
}) 
export class ConfigService {
  public ip = 'http://localhost:8012/ws_dda/';
  public token;
  public emp_id:number; public emp_name:string;public dept_name:string;
  constructor(private loadingController: LoadingController,private alertCtrl: AlertController) { }


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
}
 