import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { MtdSvService} from '../sv/mtd-sv.service';
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-search01',
  templateUrl: './search01.page.html',
  styleUrls: ['./search01.page.scss'],
})
export class Search01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch = [];


  constructor(public configSv: ConfigService,private poSv: PoSvService,public mtdSv: MtdSvService,public formBuilder: FormBuilder,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      txtserach: ["",[Validators.required]],
    }); 
    this.loaddata_producttype();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata_producttype() {
    this.portssearch = [
      {id: 0,product_type: 'ตัวเลข'},
      {id: 1,product_type: 'สินค้า'},
    ];
  }
 
  public inqtywaring(qty: number,qty_remain:number): boolean{
    if (Number(qty) < Number(qty_remain) && Number(qty) !== 0){
      return true;
    }
  }
 
  public inqtyerror(qty: number,qty_remain:number): boolean{
    if (Number(qty) === 0){
      return true;
    }
  }

  SearchData(padding){
    this.sub = this.poSv
    .searchpo(this.ionicForm.value,padding,this.limit)
    .subscribe((data) => {
      if (data.data_detail !== null) {
        // console.log(data.data_detail);
         this.maxpadding = data["maxpadding"];
         this.maxdatalimit = data["limit"];
         this.data =  data.data_detail.map((item) => Object.assign({}, item));
      }else{
        this.maxpadding = 0;this.maxdatalimit=0;
        this.data = [];
      }
    });
  }

 

}
