import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import {PoSvService} from '../sv/po-sv.service';
import * as moment_ from 'moment';
import 'moment/locale/th';  
const moment = moment_;
import { IonicSelectableComponent } from 'ionic-selectable';
import {PlaceSvService} from '../sv/place-sv.service';
import {Po01numberPage} from '../po01number/po01number.page';
//import * as $ from 'jquery';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-po01',
  templateUrl: './po01.page.html',
  styleUrls: ['./po01.page.scss'],
}) 
export class Po01Page implements OnInit {
  @Input() id:number;@Input() po_running:string;@Input() mode:string;@Input() modepayment:string;assign_type:number;@Input() tmppostatus:string;
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  @ViewChild('fileIngimg1') fileIngimg1: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;  ionicFormPayment: FormGroup;
  sub: Subscription;
  //id: number; 
  portControl_sale: FormControl; ports_sale: any;
  portControl_area: FormControl; ports_area: any;
  portControl_shipping: FormControl; ports_shipping: any;
  portControl_productmain: FormControl; ports_productmain: any;ports_productmain_number: any;
  portControl_customertype: FormControl; portscustomertype:any;
  portControl_green: FormControl; ports_green:any;
  portControl_payment: FormControl; ports_payment: any;
  portControl_member: FormControl; ports_member: any;
  tmpproduct =[];discount = []; commentproduct = [];
  tmpproductetc = []; //picpreview =[];
  allDiscount = 0;alltotalproduct=0;po_shipping_price=0;alltotal=0;
  myDate = new Date().toISOString();
  datePickerObj: any = {};
  group_id:any;
  privilege_payment = ['1','4','9']; 
  privilege_saveedit = [undefined,'0','1']; 

  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private poSv: PoSvService,public placeSv:PlaceSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { 
      //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
      this.group_id = this.configSv.group_id;
    }

  ngOnInit() {
   
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.portControl_area = this.formBuilder.control("", Validators.required);
    this.portControl_shipping = this.formBuilder.control("", Validators.required);
    this.portControl_customertype = this.formBuilder.control("", Validators.required);
    this.portControl_green = this.formBuilder.control("", Validators.required);
    this.portControl_member = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      po_running:[""],
      po_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
      po_namewin: ["",[Validators.required]],
      mtd_area_id: this.portControl_area,
      customer_type_id :  this.portControl_customertype,
      po_customer:[""], 
      po_customer_tel:[""],
      mtd_member_id: this.portControl_member,
      //po_green:["0"],
      po_green: this.portControl_green,
      po_totalproduct:[""],
      po_discount:[""],
      po_total:[""],
      po_add:[""],
      po_recivedate:["",[Validators.required]],
      mtd_shipping_id:this.portControl_shipping,
      po_shipping_price:["",[Validators.required]],
      po_address:[""],
      po_address_place:[""],
      tmpproduct:["",[Validators.required]],
      po_ems:[""],
      po_status:[""],
      po_transferdate:[""],
      oldtmpproduct:[""],
      namewin_comment:[""],
      po_deposit:["0"],
    });
    this.loaddata_sale(0);this.loaddata_area(0);this.loaddata_shipping(0);this.loaddata_customertype();this.loaddata_member(0);
    this.fndate();   this.loadform_payment();this.loaddata_greentype();
  }

  ionViewDidEnter(){
    this.loaddata_edit();
  
  }

  loaddata_edit(){
   //console.log(this.id);
    if(typeof this.id !== 'undefined'){
     // console.log(this.id);
      this.sub = this.poSv
      .getpo_edit(this.id)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data);
          data.data_detail.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
               //console.log(key , value);
               if(key === "mtd_user_id"){
                let value_a = this.ports_sale.filter(function (item1) {
                     return item1.id === value;
                 })[0];
                 this.portControl_sale.setValue(value_a);
               }else if(key === "mtd_area_id"){
                let value_a = this.ports_area.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_area.setValue(value_a);
               }else if(key === "mtd_member_id"){
                let value_a = this.ports_member.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_member.setValue(value_a);
              }else if(key === "mtd_shipping_id"){
                let value_a = this.ports_shipping.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_shipping.setValue(value_a);
              }else if(key === "po_customertype"){
                let value_a = this.portscustomertype.filter(function (item1) {
                  return item1.id === value;
                })[0];
                this.portControl_customertype.setValue(value_a);
                this.cus_type = value_a['id'];
                if(this.cus_type == '0'){
                  this.ionicForm.get('po_customer').setValidators(Validators.required);
                  this.ionicForm.get('po_customer_tel').setValidators(Validators.required);
                }else{
                  this.ionicForm.get('mtd_member_id').setValidators(Validators.required);
                }
              }else if(key === "po_green"){
                let value_a = this.ports_green.filter(function (item1) {
                  return item1.id == value;
                })[0];
                this.portControl_green.setValue(value_a);
                
                if(value_a['id']===1){
                  this.loaddata_productnumber();
                  this.loaddata_product(null);
                }else{
                  this.loaddata_product(0);
                }
              }else{
                this.ionicForm.controls[key].setValue(value);
              }
            }
           // console.log(this.ionicForm.value);
            this.tmpproduct = data.data_detail[0]['tmpproduct'];
            this.allDiscount = data.data_detail[0]['po_discount'];
            this.alltotalproduct = data.data_detail[0]['po_totalproduct'];
            this.alltotal = data.data_detail[0]['po_total'];
            this.tmpproduct.forEach((item,index) => {
              this.discount[item['id']] = item['discount'];
              this.commentproduct[item['id']] = item['commentproduct'];
              item['picresizbase64List'].forEach(element => {
                this.indexpic = element['indexpic'];
              });
            });

            if(this.modepayment === 'ok' || this.modepayment === 'view' ){
              let moneypad = Number(data.data_detail[0]['po_total']) - Number(data.data_detail[0]['po_deposit']);
              this.ionicFormPayment.controls['moneypay'].setValue(moneypad);

              if(this.modepayment === 'view'){
                let data = {
                  poid : this.id,
                  assign_type : this.assign_type,
                };
                this.sub = this.poSv.getpotf_cfwin('viewpayment',data,0).subscribe((data1) => {
                  if (data1 !== null) {
                    data1.data_detail.forEach((item) => {
                      for (const [key, value] of Object.entries(item)) {
                        if(key === "typepayment"){
                          let value_a = this.ports_payment.filter(function (item1) {
                               return item1.id == value;
                           })[0];
                           this.portControl_payment.setValue(value_a);
                           this.paymenttype = Number(value);
                         }else if(key === 'picresizbase64List'){
                           this.showrowpaymenttype1 = false;
                          this.picpreview = Object(value).map((item) => Object.assign({}, item));
                          //console.log(this.picpreview);
                          this.picpreview.forEach(task => {
                             //console.log(task)
                              this.indexpic++;
                              this.picresizbase64Array.push(this.formBuilder.group({
                              id: [task.id],
                              url: [task.url],
                            }));
                        });
                        }else{
                          this.ionicFormPayment.controls[key].setValue(value);
                        }
                      }
                    });
                  }
                });
              }
            }
          }); 
          this.indexpic++
        }
      });
    }else{
      this.loaddata_product(0);
    }
  }

  fndate(){
    this.datePickerObj = {
      inputDate: moment(this.myDate),
      // inputDate: new Date('12'), // If you want to set month in dateObject of date-picker
      // inputDate: new Date('2018'), // If you want to set year in dateObject of date-picker
      // inputDate: new Date('2018-12'), // If you want to set year & month in dateObject of date-picker
      // inputDate: new Date('2018-12-01'), // If you want to set date in dateObject of date-picker
      // inputDate: '1', // If you want to set date as a string in date-picker
      // inputDate: '2018', // If you want to set date as a string in date-picker
      // inputDate: '2018-12', // If you want to set date as a string in date-picker
      // inputDate: '2018-12-12', // If you want to set date as a string in date-picker
      // inputDate: moment(new Date('12')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018-12')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018-12-12')), // If you want to set date as a moment object in date-picker

      // fromDate: new Date('2019-03-05'), // need this in order to have toDate
      // toDate: new Date('2019-03-28'),
      // showTodayButton: false,
       closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
       setLabel: 'เลือก',
       todayLabel: 'วันที่ปัจจุบัน',
       closeLabel: 'ปิด',
      // disabledDates: [],
      // titleLabel: 'Select a Date',
       monthsList: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
       weeksList: [ 'อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
      dateFormat: 'DD/MM/YYYY',
      // clearButton: false,
      // momentLocale: 'th-TH',
      // yearInAscending: true,
      // btnCloseSetInReverse: true,

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

 

  get errorControl() {
    return this.ionicForm.controls;
  }

  get errorControl_Payment() {
    return this.ionicFormPayment.controls;
  }

  loaddata_sale(padding: number, infiniteScroll?) {
    this.sub = this.mtdSv
      .getmtd(0,padding,null,'po')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_sale = data.data_detail.map((item) => Object.assign({}, item));
          let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
          //console.log(item);
          this.portControl_sale.setValue(item);
        }
      });

  }

  loaddata_area(padding: number, infiniteScroll?) {
    this.sub = this.mtdSv
      .getmtd(1,padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_area = data.data_detail.map((item) => Object.assign({}, item)); 
        }
      });
  }

  loaddata_shipping(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(4,padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_shipping = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  loaddata_member(padding: number, infiniteScroll?) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(9,padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_member = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  loaddata_greentype(){
    this.ports_green = [
      {id: 0,typegreen: 'ปักป้ายเขียว'},
      {id: 1,typegreen: 'ไม่ต้องปักป้ายเขียว'},
    ];
    this.portControl_green.setValue(this.ports_green[0]);
    //console.log(this.ports);
  }

  portChange_green(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
   // let port = event.value;
    //console.log(port,port['shipping_price']);
    //this.ionicForm.controls['po_shipping_price'].setValue(port['shipping_price']);
   // this.cul_total();
   this.tmpproduct =[];this.discount = []; this.commentproduct = [];
   this.tmpproductetc =[];this.indexpic = 0;
   this.alltotalproduct=0;this.allDiscount=0;this.po_shipping_price=0;this.alltotal=0;this.cus_type
   if(event.value === 0 ){
     this. loaddata_product(0);
   }else{
    this.loaddata_product(null);
    this.loaddata_productnumber();
   }
  }

  loaddata_product(type) {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readproduct',type)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    //console.log(port,port['shipping_price']);
    this.ionicForm.controls['po_shipping_price'].setValue(port['shipping_price']);
    this.cul_total();
  }

  loaddata_productnumber() {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readnumberAll')
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain_number = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
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
 
  public cul_total(){
    //console.log(this.tmpproduct,this.tmpproductetc);
    this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0) +  this.tmpproductetc.reduce((acc,current) => acc + Number(current.etctotalall), 0);
    this.allDiscount = this.tmpproduct.reduce((acc,current) => acc + Number(current.discount), 0) +  this.tmpproductetc.reduce((acc,current) => acc + Number(current.etctotaldiscount), 0);
    this.alltotal = Number(this.alltotalproduct) + Number(this.po_shipping_price);
    
  }

  portChange_Product(event: {
    component: IonicSelectableComponent,
    value: any
  },type) {
    let port = event.value; 
    let tmpindex:number;
    //console.log(type);
    //this.tmpproduct = port.map((item) => Object.assign({}, item));
  //console.log(this.tmpproduct.length );
   if(this.tmpproduct.length === 0){
    tmpindex = 0;
   }else{
    //console.log(this.tmpproduct[this.tmpproduct.length-1]["id"] + 1);
    tmpindex = Number(this.tmpproduct[this.tmpproduct.length-1]["id"]) + 1;
   }
   //console.log(this.tmpproduct[this.tmpproduct.length-1]["id"],tmpindex);
   //let picresizbase64Array = Array;
   let statusqty,statusqty_flg;
   if(type === 'product'){
    port.forEach((value, index) => {
      let item = this.ports_productmain.filter((val) => val.id == value.id);
     
      if((item[0].qty - 1) >= 0){
        statusqty = 0; statusqty_flg ='';
        item[0].qty =  item[0].qty - 1;
      }else{
        statusqty =  1;
        statusqty_flg = value.product_name +'/'+value.size + ' สินค้าขาด';
      }
      this.tmpproduct.push({
        id: index+Number(tmpindex),
        name: value.product_name +'/'+value.size+ '/' +value.price,
        product_id: value.id,
        product_name: value.product_name,
        size: value.size,
        price: value.price,
        discount:'0',
        total: value.price,
        commentproduct: '',
        picresizbase64List: [],
        numbervalue: null,
        productetc: null,
        type:type,
        statusqty:statusqty,
        statusqty_flg:statusqty_flg,
      });
    });
   }else{
    port.forEach((value, index) => {
      let item = this.ports_productmain_number.filter((val) => val.id == value.id);
     
      if((item[0].qty - 1) >= 0){
        statusqty = 0; statusqty_flg ='';
        item[0].qty =  item[0].qty - 1;
      }else{
        statusqty = 1;
        statusqty_flg = value.product_name +'/'+value.size + ' สินค้าขาด';
      }
      this.tmpproduct.push({
        id: index+Number(tmpindex),
        name: value.product_name +'/'+value.size+ '/' +value.price,
        number_id: value.id,
        product_name: value.product_name,
        size: value.size,
        price: value.price,
        discount:'0',
        total: value.price,
        commentproduct: '',
        picresizbase64List: [],
        numbervalue: null,
        productetc: null,
        type:type,
        statusqty:statusqty,
        statusqty_flg:statusqty_flg,
      });
    });

   }
  
    //this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    event.component.clear();
    this.cul_total();
    
  }


  Discount(id,value){
    let item = this.tmpproduct.filter((val) => val.id == id);
    item[0].discount = value;
    if(value <= item[0].price){
      item[0].total = Number(item[0].price) - Number(value);
      this.cul_total();
      // this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0);
      // this.allDiscount = this.tmpproduct.reduce((acc,current) => acc + Number(current.discount), 0);
     
    }
 
  }

  Commentproduct(id,value){
    let item = this.tmpproduct.filter((val) => val.id == id);
    item[0].commentproduct = value;
   // item[0].total = Number(item[0].price) - Number(value);
  }

  Deltmpproduct(id,index,type,product_id,number_id,statusqty){
    //console.log(id,index);
    this.discount[index] = null; this.commentproduct[index] = null
    this.tmpproduct = this.tmpproduct.filter(obj => obj.id !== id);
    this.tmpproductetc = this.tmpproductetc.filter(obj => obj.id !== id);
    this.cul_total();
    //console.log(statusqty);
    if(statusqty == 0){
      if(type === 'product'){
        let item = this.ports_productmain.filter((val) => val.id == product_id);
        item[0].qty =  Number(item[0].qty) + 1;
      }else if(type === 'number'){
        let item = this.ports_productmain_number.filter((val) => val.id == number_id);
        item[0].qty =  Number(item[0].qty) + 1;
      }
    }
  
    // this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0);
    // this.allDiscount = this.tmpproduct.reduce((acc,current) => acc + Number(current.discount), 0);

    
  }
  img_id:number;indexpic = 0;
  onClick_fileUpload(id) {
    this.img_id = id;
    this.fileIngimg.nativeElement.click();
  }

  fileUpload_img(event) {
    const fileList: FileList =  this.fileIngimg.nativeElement.files;
    //console.log(event,file);
    let item = this.tmpproduct.filter((val) => val.id == this.img_id);
    //console.log(item);
    let pic = [];
    if (typeof fileList[0] !== 'undefined') {
      if (fileList[0].type.match(/image.*/)) {
        var reader = new FileReader();
        var self = this;
        reader.onloadend = function () {
          //self.picbase64 = reader.result
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 500; // target width
          canvas.height = 500; // target height
          var image = new Image();
          image.src = reader.result as string;
          image.onload = function (e) {
            ctx.drawImage(image,
              0, 0, image.width, image.height,
              0, 0, canvas.width, canvas.height
            );
            // create a new base64 encoding
            var resampledImage = new Image();
            resampledImage.src = canvas.toDataURL();

            pic.push({
              tmpproductid : item[0].id,
              indexpic : self.indexpic,
              urlorignal:reader.result,
              urlresize:resampledImage.src,
            });
            item[0].picresizbase64List = item[0].picresizbase64List.concat(pic);
            self.indexpic++;
          };
        }
        //this.label = file.name;
        reader.readAsDataURL(fileList[0]);
        //console.log(self.picpreview);
        //this.ionicForm.controls.picresizbase64.setValue(self.picresizbase64);
      }
      else {
        alert('กรุณาระบุชนิดไฟล์รูปภาพ');
      }
    }
  }

  delImg(tmpproductid,index){
    let item = this.tmpproduct.filter(obj => obj.id == tmpproductid);
    let itempic =  item.map((element) => {
      return { picresizbase64List: element.picresizbase64List.filter((subElement) => subElement.indexpic !== index)}
    });
    //console.log(itempic);  
    //console.log(item[0].picresizbase64List.map((itempic) => Object.assign({}, item)));
    var plusTen = []
    itempic[0]['picresizbase64List'].forEach((itm,index) => {
      // console.log(itm['indexpic']);
      //console.log(itm.picresizbase64List[index]['tmpproductid']);
        plusTen.push({
        tmpproductid: itm['tmpproductid'], 
        indexpic: itm['indexpic'], 
        urlorignal: itm['urlorignal'] , 
        urlresize : itm['urlresize'],
      })
    });

    item[0].picresizbase64List = plusTen;
    //console.log(item);
  }

  async Addnumber(index,id :number){
    let item = this.tmpproduct.filter((val) => val.id == id);
   //console.log(item);  
    const modal = await this.modalCtrl.create({
      component:Po01numberPage,
      cssClass: 'my-modal',
      componentProps:{index:index,id:id}
      
    })

    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    //console.log(data,role);
    if(role === 'comfirm'){ 
      item[0].numbervalue = data;
    }else if(role === 'comfirm1'){
      item[0].productetc = data;
      let array_data  = []; //data;
      array_data.push(data);  //convert object to array
      this.tmpproductetc = array_data;
      // console.log(this.tmpproductetc);
      // console.log(a);
      // console.log( a.reduce((acc,current) => Number(acc) + Number(current.etctotaldiscount), 0));

      this.cul_total();
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  async submitForm(){
    let foundaddnumber = false;
    if(this.ionicForm.controls['po_green'].value.id === 0 ){
      foundaddnumber  = this.tmpproduct.find(function (value){
        if(value.numbervalue  === null){
          return true;
        }
      });
    }
  

    let founddiscount = this.tmpproduct.find(function (value){
        if(Number(value.discount) > Number(value.price)){
          return true;
        }
    });
 
    
   
    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    this.ionicForm.controls['po_discount'].setValue(this.allDiscount);
    this.ionicForm.controls['po_totalproduct'].setValue(this.alltotalproduct);
    this.ionicForm.controls['po_total'].setValue(this.alltotal);
    //console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid || founddiscount || foundaddnumber) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      const confirm =  await this.alertCtrl.create({
        header: 'ยืนยันข้อมูลในการบันทึก',
        //message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
        buttons: [{
          text: 'ยกเลิก',
          handler: (data: any) => {
             //console.log('cancel ',data);
          }
        },
        {
          text: 'ตกลง',
            handler: (data: any) => {
            //console.log('submit');
            let typesql: string;
            if (!this.ionicForm.controls.id.value) {
              typesql = "insert";
            } else {
              typesql = "update";
            }
            this.sub = this.poSv
            .crudpo(this.ionicForm.value,typesql)
            .subscribe((data) => {
              if (data !== null) {
                if(typesql === 'insert'){
                  if(data.status === 'ok'){
                    this.refreshForm();
                    this.configSv.ChkformAlert(data.message);
                  }
                }else if(typesql === 'update'){
                  //console.log('update');
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  let ponumberdetail = this.tmpproduct.map(function (item) {
                    return item.numbervalue
                  });
                
                  if(ponumberdetail[0] !== null){
                    ponumberdetail = ponumberdetail.filter(function(val){
                      return val;
                    });
                  }else{
                    ponumberdetail = null;
                  }
                  dataarray.push({ 
                    po_date:this.ionicForm.controls.po_date.value,
                    po_recivedate:this.ionicForm.controls.po_recivedate.value,
                    po_namewin:this.ionicForm.controls.po_namewin.value,
                    area_name:this.ionicForm.controls.mtd_area_id.value.area_name,
                    po_customer:this.ionicForm.controls.po_customer.value,
                    po_customer_tel:this.ionicForm.controls.po_customer_tel.value,
                    po_total: this.ionicForm.controls.po_total.value,
                    qty:this.tmpproduct.length,
                    ponumberdetail:ponumberdetail,
                  });
                  //console.log(dataarray);
                  this.modalCtrl.dismiss(dataarray,'comfirm');
                 // this.ionicForm.controls.podetail_number.value

                }
              }
            },
            (error) => {
              console.log(JSON.stringify(error));
            },
            () => {
              //this.refreshForm();
            });
          }
        }]
      });
      confirm.present();
    }
  }

 

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  refreshForm() {
    this.ionicForm.reset({po_date:moment().format("DD/MM/YYYY"),po_deposit:0});
    let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
    this.portControl_sale.setValue(item);
    this.isSubmitted = false;
    this.tmpproduct =[];this.discount = []; this.commentproduct = [];
    this.tmpproductetc =[];this.indexpic = 0;
    this.alltotalproduct=0;this.allDiscount=0;this.po_shipping_price=0;this.alltotal=0; this.loaddata_product(0); this.cus_type
    this.portControl_green.setValue(this.ports_green[0]);
    //this.portControl_customertype.setValue(this.portscustomertype[0]);
  }

 
  loaddata_customertype(){
    this.portscustomertype = [
      {id: '0',type: 'ลูกค้าทั่วไป'},
      {id: '1',type: 'สมาชิก'},
    ];
    //this.portControl_customertype.setValue(this.portscustomertype[0]);
  }
  cus_type:any;
  portChangeCus(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.cus_type = port['id'];
    if(this.cus_type == '0'){
      this.ionicForm.get('po_customer').setValidators(Validators.required);
      this.ionicForm.get('po_customer_tel').setValidators(Validators.required);
      this.ionicForm.get('mtd_member_id').setValidators(null);
      this.ionicForm.get('mtd_member_id').setValue(null);
      this.ionicForm.controls['po_customer'].setValue(null);
      this.ionicForm.controls['po_customer_tel'].setValue(null);
    }else{
      this.ionicForm.get('mtd_member_id').setValidators(Validators.required);
      this.ionicForm.get('po_customer').setValidators(null);
      this.ionicForm.get('po_customer_tel').setValidators(null);
    }

  }
  
  portChange_member(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    let item = this.ports_member.filter((val) => val.id == port['id']);
  
    let cus_name = item[0].member_name + ' ' + item[0].member_surname;
    let cus_tel = item[0].member_tel; 
    //console.log(item,cus_name,cus_tel);
    this.ionicForm.controls['po_customer'].setValue(cus_name);
    this.ionicForm.controls['po_customer_tel'].setValue(cus_tel);
  }

  showImg(detail_id,name){
   let url = this.configSv.ip + 'po01/productdetail/' + detail_id + '/' +  name
   const browser = this.iab.create(url).show();
  }

  async cancelData() {
    //console.log(this.ionicForm.value);
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบใบสั่งซื้อที่ '+ this.po_running +' ? ',
      inputs: [
        {
          name: 'cause',
          placeholder: 'ระบุเหตุผลในการยกเลิก',
        },
      ],
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
           if(data['cause']){
             this.sub = this.poSv.crudpo(this.ionicForm.value,'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    po_statustext:'ยกเลิกใบเสร็จ',
                  });
                  this.modalCtrl.dismiss(dataarray,'cancel');
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }
              }, (error) => {
                console.log(JSON.stringify(error));
              }, () => {
                //this.data = this.data.filter(obj => obj.id !== item);
                //this.refreshForm();
              }
            );
          } 
          else{
            this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการลบด้วย');
          }
        }
      }]
    });
    confirm.present();
  }
  
  src:any;
  loadform_payment(){
    this.portControl_payment = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicFormPayment = this.formBuilder.group({
      poid : [this.id],
      assign_type :[this.assign_type],
      typepayment: this.portControl_payment,
      payment_date:[ moment().format('DD/MM/YYYY') ,[Validators.required]],
      moneypay: [""],
      cashmoney_0:[""],
      change_0:[""],
      ems_2:[""],
      payment_cancel_3:[""],
      problem_cause_4:[""],
      tmpproduct:[""],
      picresizbase64List: this.picresizbase64Array,
    }); 
    
    this.loaddata_paymenttype();
  }

  loaddata_paymenttype(){
    this.ports_payment = [
      {id: 0,typeserch: 'เงินสด'},
      {id: 1,typeserch: 'โอนเงิน'},
      {id: 2,typeserch: 'พัสดุ'},
      {id: 3,typeserch: 'ยกเลิกการส่ง'},
      {id: 4,typeserch: 'งานมีปัญหา'},
    ];
    //console.log(this.ports);
  }
  paymenttype:number;
  portChange_payment(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.ionicFormPayment.setValidators(null);
    let port = event.value; 
    this.paymenttype = port['id'];
    this.ionicFormPayment.controls['cashmoney_0'].setValidators(null);
    this.ionicFormPayment.controls['change_0'].setValidators(null);
    this.picresizbase64Array.setValidators(null);
    this.ionicFormPayment.controls['ems_2'].setValidators(null);
    this.ionicFormPayment.controls['payment_cancel_3'].setValidators(null);
    this.ionicFormPayment.controls['problem_cause_4'].setValidators(null);
    this.ionicFormPayment.controls['cashmoney_0'].updateValueAndValidity();
    this.ionicFormPayment.controls['change_0'].updateValueAndValidity();
    this.ionicFormPayment.controls['ems_2'].updateValueAndValidity();
    this.ionicFormPayment.controls['payment_cancel_3'].updateValueAndValidity();
    this.ionicFormPayment.controls['problem_cause_4'].updateValueAndValidity();
    if(this.paymenttype === 0){
      this.ionicFormPayment.get('cashmoney_0').setValidators(Validators.required);
      this.ionicFormPayment.get('change_0').setValidators(Validators.min(0));
    }
    else if(this.paymenttype === 1){
      this.src = "./assets/img/qr_payment.jpg";
      //this.ionicFormPayment.get('picresizbase64List').setValidators(Validators.required);
      this.picresizbase64Array.setValidators(Validators.required);
      this.picresizbase64Array.updateValueAndValidity();
    }
    else if(this.paymenttype === 2){
      this.ionicFormPayment.get('ems_2').setValidators(Validators.required);
    }
    else if(this.paymenttype === 3){
      this.ionicFormPayment.get('payment_cancel_3').setValidators(Validators.required);
    }
    else if(this.paymenttype === 4){
      this.ionicFormPayment.get('problem_cause_4').setValidators(Validators.required);
      
    }
   
  }

  cul_cashmoney_0(){
    let total =  Number(this.ionicFormPayment.controls['cashmoney_0'].value) - Number(this.ionicFormPayment.controls['moneypay'].value);
    this.ionicFormPayment.controls['change_0'].setValue(total);
  }

  async submitForm_Payment() {
    this.ionicFormPayment.controls['tmpproduct'].setValue(this.ionicForm.controls['oldtmpproduct'].value);
    //console.log(this.ionicFormPayment.value)
    this.isSubmitted = true;
    if (!this.ionicFormPayment.valid ) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการบันทึกการส่งสินค้า ' + this.po_running,
     // message: 'แน่ใจว่าต้องการลบใบสั่งซื้อที่ '+ this.po_running +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
             this.sub = this.poSv.crudtf_cfwin(this.ionicFormPayment.value,'insert').subscribe(
              (data) => { 
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    po_status: String(data.id),
                    po_statustext: data._value,
                  });
                  this.modalCtrl.dismiss(dataarray,'confirm');
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }              
              }, (error) => {
                console.log(JSON.stringify(error));
              }
            );
         
        }
      }]
    });
    confirm.present();
  }
 }
  
 showqr_payment(){
  let url = this.configSv.ip + 'img/qr_payment.jpg'
  const browser = this.iab.create(url).show();
 }

 picresizbase64Array: FormArray; picresizbase64:any;  picpreview =[];indexpic_payment = 0; showrowpaymenttype1:boolean= true;
 fileUpload_payment() {
  this.fileIngimg1.nativeElement.click();
}

fileUpload_imgpayment(event) {
   const fileList: FileList =  this.fileIngimg1.nativeElement.files;
   //console.log(fileList[0].type);
   if (typeof fileList[0] !== 'undefined') {
     if (fileList[0].type.match(/image.*/)) {
       var reader = new FileReader();
       var self = this;
       reader.onloadend = function () {
         //self.picbase64 = reader.result
         var canvas = document.createElement("canvas");
         var ctx = canvas.getContext("2d");
         canvas.width = 200; // target width
         canvas.height = 200; // target height
         var image = new Image();
         image.src = reader.result as string;
         image.onload = function (e) {
           ctx.drawImage(image,
             0, 0, image.width, image.height,
             0, 0, canvas.width, canvas.height
           );
           var resampledImage = new Image();
           resampledImage.src = canvas.toDataURL();
           self.picresizbase64 = resampledImage.src;
             self.picpreview.push({
               id:self.indexpic_payment,
               url:resampledImage.src
             });
             
            self.picresizbase64Array.push(self.formBuilder.group({
               id:[self.indexpic_payment],
               url: [self.picresizbase64],
              
             }));
             self.indexpic_payment++;
         };
       }
       reader.readAsDataURL(fileList[0]);
     }
     else {
       alert('กรุณาระบุชนิดไฟล์รูปภาพ');
     }
   }
 }

 delImg_payment(index){
  this.picpreview = this.picpreview.filter(obj => obj.id !== index);
 this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(value => value.id === index));
 }


 check_discout(discount,total){
  if(Number(discount) > Number(total)){
    return true;
  }
 }

}
