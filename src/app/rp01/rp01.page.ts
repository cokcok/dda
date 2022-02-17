import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,FormArray} from "@angular/forms"; 
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import {RpSvService} from '../sv/rp-sv.service';

@Component({
  selector: 'app-rp01',
  templateUrl: './rp01.page.html',
  styleUrls: ['./rp01.page.scss'],
})
export class Rp01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;
  datePickerObj: any = {};
  currentTime = new Date().getFullYear() + 543;
  years: any = [];
  constructor(public formBuilder: FormBuilder,public configSv: ConfigService,public rpSv: RpSvService,private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    for (let i = this.currentTime - 5; i <= this.currentTime ; i++) {
      this.years.push(i);
    }
    this.loadForm();this.fndate();
  }

  loadForm(){
    this.ionicForm = this.formBuilder.group({
      rp_type: ["", [Validators.required]],
      rp_type1: ["", [Validators.required]],
      txtdate: [],
      txtdate1: [],
      txtmonth:[],
      txtmonth1:[],
      txtyear:[],
      txtyear1:[],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate(){
    this.datePickerObj = {
      inputDate: '',
      // showTodayButton: false,
       closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
       setLabel: 'เลือก',
       todayLabel: 'วันที่ปัจจุบัน',
       closeLabel: 'ปิด',
      // disabledDates: disabledDates,
      // titleLabel: 'Select a Date',
       monthsList: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
       weeksList: [ 'อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
      dateFormat: 'DD/MM/YYYY',
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
  
  Checkvalid(data){
    //console.log(data);
    this.ionicForm.controls['txtdate'].setValidators(null);
    this.ionicForm.controls['txtdate1'].setValidators(null);
    this.ionicForm.controls['txtmonth'].setValidators(null);
    this.ionicForm.controls['txtmonth1'].setValidators(null);
    this.ionicForm.controls['txtyear'].setValidators(null);
    this.ionicForm.controls['txtyear1'].setValidators(null);
    this.ionicForm.controls['txtdate'].updateValueAndValidity();
    this.ionicForm.controls['txtdate1'].updateValueAndValidity();
    this.ionicForm.controls['txtmonth'].updateValueAndValidity();
    this.ionicForm.controls['txtmonth1'].updateValueAndValidity();
    this.ionicForm.controls['txtyear'].updateValueAndValidity();
    this.ionicForm.controls['txtyear1'].updateValueAndValidity();
    if(data == "0"){
      this.ionicForm.get('txtdate').setValidators(Validators.required);
      this.ionicForm.get('txtdate1').setValidators(Validators.required);
    }
    else if(data == "1"){
      this.ionicForm.get('txtmonth').setValidators(Validators.required);
      this.ionicForm.get('txtmonth1').setValidators(Validators.required);
    } else if(data == "2"){
      this.ionicForm.get('txtyear').setValidators(Validators.required);
      this.ionicForm.get('txtyear1').setValidators(Validators.required);
    }
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
