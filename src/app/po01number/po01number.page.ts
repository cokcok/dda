import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import { PoSvService } from '../sv/po-sv.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-po01number',
  templateUrl: './po01number.page.html',
  styleUrls: ['./po01number.page.scss'],
})
export class Po01numberPage implements OnInit {
  @Input() index:number;
  ionicForm: FormGroup;isSubmitted = false; 
  sub: Subscription;filterfront: string;filterback: string; 
  portControl_front: FormControl; ports_front=[];
  portControl_back: FormControl; ports_back: any;
  constructor(private modalCtrl:ModalController,private navCtrl: NavController,public formBuilder: FormBuilder,public configSv: ConfigService,public mtdSv: MtdSvService,private alertCtrl: AlertController,private poSv: PoSvService) { }

  ngOnInit() {
    this.portControl_front = this.formBuilder.control("", Validators.required);
    this.portControl_back = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      podetail_number:["",[Validators.required, Validators.pattern('^[0-9]+$')]],
      color_front:[""],
      color_back:[""],
      mtd_numberfront_id:this.portControl_front,
      mtd_numberback_id: this.portControl_back,
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  ChkNumber(){
    const name = new String(this.ionicForm.controls.podetail_number.value)
    console.log(name);
    const map = Array.prototype.map
    const tmp_number = map.call(name, eachLetter => {
        return eachLetter
    });
    this.sub = this.poSv
    .getnumber('readnumber',tmp_number)
    .subscribe((data) => {
      if (data !== null) {
        this.ports_front  = data.numberhead;
        //console.log(this.ports_front);
      }
    });
  }

  public inqtyerror(qty: number,qty_remain:number): boolean{
    if (Number(qty) < Number(qty_remain)){
      return true;
    }
  }

  radioGroupChange_front(event) {
    //console.log("radioGroupChange",event.detail);
    let item = this.ports_front.filter((val) => val.id == event.detail.value);
    //console.log(item,item[0]['front_number']);
    this.portControl_front.setValue(item[0]['front_number']);
    this.ionicForm.controls['color_front'].setValue(item[0]['color']);
   
    //this.selectedRadioGroup = event.detail;
  }

  radioGroupChange_back(event) {
    let item = this.ports_front.filter((val) => val.id == event.detail.value);
    this.portControl_back.setValue(item[0]['back_number']);
    this.ionicForm.controls['color_back'].setValue(item[0]['color']);
  }


  submitForm(){
    //console.log(this.ionicForm.value)
    //let data = ['aaa','dddd','ccc'];
    //this.modalCtrl.dismiss(data);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      this.modalCtrl.dismiss(this.ionicForm.value,'comfirm');
    }

  }

}


//       // const user = {
//       //   groups: ["1"]
//       // };  
//       //const result = data.numberhead.filter(role => role.numberdata_detail.find(group => user.groups.includes(group.mtd_size_id)));
//       //const result = data.numberhead.filter((role) => role.numberdata_detail.filter((group) => group.mtd_size_id === '1'));

//       // const result = data.numberhead.filter((role) => role.numberdata_detail.filter(function(elem){
//       //     return elem.size_name == 'เล็ก';
//       // }));
//       // console.log(result);

//       //let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
//       //const result = roles.filter(role => role.groups.find(group => user.groups.includes(group.id)));
//       console.log(data.numberhead.filter(data => data.numberdata_detail.filter(function(subdata){
//         return subdata.mtd_size_id === '1';
//    })));  //subdata =>  subdata.mtd_size_id === '1')
// let frontdata =   data.numberhead.forEach(function(numberdetail){
//        return numberdetail.numberdata_detail.filter((val) => val.mtd_size_id === '1');
//     // numberdetail.numberdata_detail.forEach(function(data){
//     //   //return numberdetail.numberdata_detail.filter((val) => val.mtd_size_id ==='1')
//     //   console.log(numberdetail.numberdata_detail.filter((val) => val.mtd_size_id ==='1'))
      
//     //    //console.log(data,data.mtd_size_id);
//     //    // console.log(data.mtd_size_id);
//     //    //return data;
//     //   // return Object.keys(data).filter((val) => val['mtd_size_id'] == '1');
//     //   // console.log(Object.keys(data));
//     //   // Object.keys(data).find(function(rcpts) {
//     //   //   return rcpts['mtd_size_id'] === 1;
//     //   //  })
//     // });
//   });
//   console.log(frontdata);
//   // let filters = ['เล็ก'];
//   // let fontdata = data.numberhead.filter(x => x.numberdata_detail(g =>  filters.includes(g)));
// //   university.classes.forEach(function(uniClass) {
// //     uniClass.students.forEach(function(student) {
// //         student.exams = student.exams.filter(function (el) {
// //             return el.passed;
// //         });
// //     });
// //  });
// // User can be part of many groups
// // const user = {
// //   groups: ["group2"]
// // };
// // const roles = [{
// //   name: "role1",
// //   groups: [{
// //     id: "group1"
// //   }]
// // }, {
// //   name: "role2",
// //   groups: [{
// //     id: "group1"
// //   }, {
// //     id: "group2"
// //   }]
// // }];

// // const result = roles.filter(role => role.groups.find(group => user.groups.includes(group.id)));
// // console.log(result);