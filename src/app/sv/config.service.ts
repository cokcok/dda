import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController,NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
@Injectable({
  providedIn: 'root'
}) 
export class ConfigService {
  public ip = 'http://localhost:8012/ws_dda/';
  //public ip = 'http://localhost/ws_dda/';
  //public ip = 'http://192.168.1.47/ws_dda/';
  public token;
  public emp_id:number; 
  public group_id:number; public pic:string;
  public prefix_name:string;public surname:string;public name:string
  //emp_name:string; dept_name:string;pic:string;
  idleState = 'Not started.';timedOut = false;lastPing?: Date = null;
  colortxt = ['#000000', '#ffff00', '#FF00F3', '#008000', '#ffa500', '#87ceeb', '#800080', '#ff0000'];
  numberalltxt = ['รอปักเลขทั้งหมด','ปักเลขทั้งหมดแล้ว','รอปักเลขบางส่วน'];
  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener,private loadingController: LoadingController,private alertCtrl: AlertController,private idle: Idle, private keepalive: Keepalive,private navCtrl: NavController) { }


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

  chkidle(){
    //console.log('aaa');
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      //this.ChkformAlert('session_timeout');
    });
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
     
      this.timedOut = true;
      this.resetidle();
    
      this.navCtrl.navigateForward('/signin');
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      //this.ChkformAlert('session_timeout');
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.resetidle();
   }

  resetidle() {
    //console.log('a');
    this.idle.watch();
    //this.idleState = 'Started.';
    this.timedOut = false;
   
  }

  stopidle(){
    console.log('stop',this.timedOut);
    //this.ChkformAlert('session_timeout');
    this.idle.timeout();
  }


}
 