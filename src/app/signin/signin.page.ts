import { Component, OnInit,Injectable } from '@angular/core';
import { MenuController, IonSlides,NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {SigninSvService} from '../sv/signin-sv.service';
import {ConfigService} from '../sv/config.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm: FormGroup;sub: Subscription;
  isSubmitted = false;
  versionNumber: string|number;
 
ConfigService
  constructor(public formBuilder: FormBuilder,public menuCtrl: MenuController,private navCtrl: NavController,private signinSv:SigninSvService,public configSv:ConfigService) { 


  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['dda', [Validators.required]],
      password: ['dda', [Validators.required]]
      /* ,email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] */
    });
  }
 
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    const aux: any = document.getElementsByTagName('META');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aux.length; i++) {
     if (aux[i].name === 'version') {
       this.versionNumber = aux[i].content;
      }
    }
  }

  
  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
     // console.log(this.ionicForm.value);
     // console.log(this.ionicForm.controls.name.value);

     this.configSv.loadingAlert(2000);
      this.sub = this.signinSv.signin(this.ionicForm.controls.name.value,this.ionicForm.controls.password.value,this.configSv.token).subscribe(
        (data) => {
          console.log(data);
          if (data !== null){
            //console.log(data); 
            this.signinSv.publishSomeData(data); 
             setTimeout(() => {
              this.navCtrl.navigateForward('/maindda');
            }, 2100); 
          }
          else
          {
            setTimeout(() => {
            this.configSv.ChkformAlert('ไม่พบข้อมูล/รหัสผ่านไม่ถูกต้อง');
            }, 2100);
          }
        },(error) => {
          console.log(JSON.stringify(error));
          //loader.dismiss();        
        }
        );
     
     
    }
  }




}
