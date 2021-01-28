import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {PlaceSvService} from '../sv/place-sv.service';
import {data_detail} from '../../../../raot_tech/src/models/datamodel';


@Component({
  selector: 'app-mtdcompany',
  templateUrl: './mtdcompany.page.html',
  styleUrls: ['./mtdcompany.page.scss'],
})
export class MtdcompanyPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  place=[];sub: Subscription;filterTerm: string;
  id: number; data = []; 

  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    private alertCtrl: AlertController,private placeSv:PlaceSvService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      company_name: ["", [Validators.required]],
      company_address: ["", [Validators.required]],
      company_place: ["", [Validators.required]],
      company_tel: ["", [Validators.required]] ,
      company_email: [""],
      company_website: [""],
      company_fb: [""],
      company_line: [""],
      company_ig: [""],
      company_twitter: [""],
    });
    this.loadPlace();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


  submitForm(){
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      this.sub = this.placeSv
      .crudcompany(this.ionicForm.value,'update')
      .subscribe((dataplace) => {
        if (dataplace !== null) {
          this.configSv.ChkformAlert(dataplace.message);
        }
      });
    }
  }

  loadPlace(){
    this.sub = this.placeSv
    .getcompany()
    .subscribe((dataplace) => {
      if (dataplace !== null) {
        dataplace.data_detail.forEach((item) => {
          for (const [key, value] of Object.entries(item)) {
              this.ionicForm.controls[key].setValue(value);
          }
        });
      }
    });
  }
}
