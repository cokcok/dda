import { Component, OnInit } from '@angular/core';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { firebase } from '@firebase/app';
import { environment } from '../environments/environment';
import { NotificationsService } from './sv/notifications.service';
import { Router } from '@angular/router';
import { ConfigService } from './sv/config.service';
import { SigninSvService } from './sv/signin-sv.service';
import { page } from './models/signin_model';
import { PoSvService } from './sv/po-sv.service';
PoSvService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0; chkAuten = false; filterTerm: string;
  // public appPages = [
  //   {
  //     title: 'สร้างเมนูหลัก',
  //     url: '/sysmenu',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'สร้างเมนูย่อย',
  //     url: '/syssubmenu',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'กลุ่มผู้ใช้',
  //     url: '/sysgroup',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'เชื่อมกลุ่มผู้ใช้กับเมนู',
  //     url: '/sysgroupmenu',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'ประชาสัมพันธ์',
  //     url: '/maindda',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'จัดการประชาสัมพันธ์',
  //     url: '/syspublicize',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'ข้อมูลหลัก',
  //     url: '',
  //     children: [
  //       {
  //         title: 'ข้อมูลผู้ใช้',
  //         url: '/mtd01',
  //         icon: 'trash',
  //         svg: 'logout',
  //         open: 'true'
  //       },
  //       {
  //         title: 'ข้อมูลหลัก 2',
  //         url: '/mtd02',
  //         icon: 'trash',
  //         svg: 'logout',
  //         open: 'true'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'ใบสั่งเสื้อ',
  //     url: '/po01',
  //     icon: 'trash',
  //     open: ''
  //   },
  //   {
  //     title: 'ออกจากระบบ',
  //     url: '/folder/Logout',
  //     svg: 'logout'
  //   }
  // ];
  public appPages: any;
 //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  emp_name: string; dept_name: string; pic: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationsService: NotificationsService,
    private navCtrl: NavController,
    private router: Router, public configSv: ConfigService, public signinSv: SigninSvService, public menuCtrl: MenuController,
    private poSv: PoSvService
  ) {
    this.initializeApp();
    this.Showversion();
  }

  initializeApp() { 
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 

      // this.poSv.getObservable_tf().subscribe((data) => {
      //   //this.chkAuten = data;
      //  //console.log(this.chkAuten);
      //   this.chklogin(data); 
      // });

      //this.chklogin();  // เช็ด ต้องผ่านหน้า login ก่อน 
     // this.configSv.chkidle(); // เช็ด ถ้าไม่มีการ active ที่หน้าจอ จะย้อนกลับไปหน้า login 
      this.signinSv.getObservable().subscribe((data) => {
        //console.log('Data received', data);
        this.configSv.emp_id = data['employee'][0]['id'];
        this.emp_name = data['employee'][0]['emp_name'];
        this.dept_name = data['employee'][0]['dept_name'];
        this.pic = data['employee'][0]['pic'];
        this.appPages = data['employee'][0]['page'];
        this.configSv.group_id = data['employee'][0]['sys_group_id'];
        // this.configSv.pic = data['employee'][0]['pic'];
        // this.configSv.prefix_name = data['employee'][0]['prefix_name'];
        // this.configSv.name = data['employee'][0]['name'];
        // this.configSv.surname = data['employee'][0]['surname'];
        //console.log(this.appPages)
      });


      this.signinSv.getObservable1().subscribe((data) => {
        //console.log('Data received', data,data['picresizbase64List'][0]['url']);
        this.emp_name = data['prefix_name'] + ' ' + data['name'] + ' ' + data['surname']; 
        if(data['picresizbase64List'].length > 0){
          this.pic = data['picresizbase64List'][0]['url'];
        }else{
          this.pic = null;
        }
        
      });
    });
    //this.chkAuten = true;
    //this.menuCtrl.close();

  

  }

  async ngOnInit() {
    firebase.initializeApp(environment.firebase);
    await this.notificationsService.init();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    //this.menuCtrl.close();
  }

  ngAfterViewInit() {
    this.platform.ready().then(async () => {
      await this.notificationsService.requestPermission();
    });
  }

  chklogin(data) {
    if (this.chkAuten === false || data !== true) {
      console.log(data);
      this.router.navigateByUrl('/signin');
    }
  }

  chPass() {
    // this.navCtrl.navigateForward(['/sysgroupmenu01'],{
    //   queryParams: {
    //      value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
    //      xxx :'aaa',
    //     },
    //   });
    this.menuCtrl.close();
    this.navCtrl.navigateForward(['/chpass']);
    //this.router.navigateByUrl('/chpass');

  }
  versionNumber: string|number;
  Showversion() {
    const aux: any = document.getElementsByTagName('META');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aux.length; i++) {
     if (aux[i].name === 'version') {
       this.versionNumber = aux[i].content;
      }
    }
  }

}
