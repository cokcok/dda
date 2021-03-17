import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';

@Component({
  selector: 'app-pocfcupon02',
  templateUrl: './pocfcupon02.page.html',
  styleUrls: ['./pocfcupon02.page.scss'],
})
export class Pocfcupon02Page implements OnInit {
  @Input() id:number;@Input() assign_date:string; @Input() seq:string;@Input() total:string;
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  dataallarray = []; 
  constructor(public configSv: ConfigService,private poSv: PoSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id:[ this.id],
    });
    this.loaddata(0)
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  loaddata(padding: number, infiniteScroll?){
    if(padding == 0){this.data = []};
    this.sub = this.poSv
    .getcfcupon('readid',this.ionicForm.value)
    .subscribe((data) => {
      if (data !== null) {
        console.log(data);
        this.data =  data.data_detail.map((item) => Object.assign({}, item));
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
      }else{
        this.maxpadding = 0;
      }
    });
  }

}
