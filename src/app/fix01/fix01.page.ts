import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { MtdSvService} from '../sv/mtd-sv.service';
import {FxSvService} from '../sv/fx-sv.service';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import { IonicSelectableComponent } from 'ionic-selectable';
import {PlaceSvService} from '../sv/place-sv.service';
import {Po01numberPage} from '../po01number/po01number.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-fix01',
  templateUrl: './fix01.page.html',
  styleUrls: ['./fix01.page.scss'],
})
export class Fix01Page implements OnInit {
  @Input() id:number;@Input() po_running:string;@Input() mode:string;@Input() modepayment:string;
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  @ViewChild('fileIngimg1') fileIngimg1: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;  ionicFormPayment: FormGroup;
  sub: Subscription;
  //id: number; 
  portControl_sale: FormControl; ports_sale: any;
  portControl_area: FormControl; ports_area: any;
  portControl_shipping: FormControl; ports_shipping: any;
  portControl_productmain: FormControl; ports_productmain: any;
  portControl_customertype: FormControl; portscustomertype:any;
  portControl_payment: FormControl; ports_payment: any;
  portControl_member: FormControl; ports_member: any;
  tmpproduct =[];discount = []; commentproduct = [];
  tmpproductetc = []; //picpreview =[];
  allDiscount = 0;alltotalproduct=0;po_shipping_price=0;alltotal=0;
  myDate = new Date().toISOString();
  datePickerObj: any = {};
  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private fxSv: FxSvService,public placeSv:PlaceSvService,private modalCtrl:ModalController,private iab: InAppBrowser) { }

  ngOnInit() {
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.portControl_area = this.formBuilder.control("", Validators.required);
    this.portControl_shipping = this.formBuilder.control("", Validators.required);
    this.portControl_customertype = this.formBuilder.control("", Validators.required);
    this.portControl_member = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      fx_running:[""],
      fx_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
      fx_namewin: ["",[Validators.required]],
      mtd_area_id: this.portControl_area,
      customer_type_id :  this.portControl_customertype,
      fx_customer:[""], 
      fx_customer_tel:[""],
      mtd_member_id: this.portControl_member,
      fx_totalproduct:[""],
      fx_discount:[""],
      fx_total:[""],
      fx_add:[""],
      fx_recivedate:["",[Validators.required]],
      mtd_shipping_id:this.portControl_shipping,
      fx_shipping_price:["",[Validators.required]],
      fx_address:[""],
      fx_address_place:[""],
      tmpproduct:["",[Validators.required]],
      fx_ems:[""],
      fx_status:[""],
      fx_transferdate:[""],
      oldtmpproduct:[""],
      namewin_comment:[""],
      fx_deposit:["0"],
    });
    this.loaddata_sale(0);this.loaddata_area(0);this.loaddata_shipping(0);this.loaddata_customertype();this.loaddata_member(0);
    this.fndate(); this.loaddata_product(0);//this.loadform_payment();

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
      this.ionicForm.get('fx_customer').setValidators(Validators.required);
      this.ionicForm.get('fx_customer_tel').setValidators(Validators.required);
      this.ionicForm.get('mtd_member_id').setValidators(null);
      this.ionicForm.get('mtd_member_id').setValue(null);
      this.ionicForm.controls['fx_customer'].setValue(null);
      this.ionicForm.controls['fx_customer_tel'].setValue(null);
    }else{
      this.ionicForm.get('mtd_member_id').setValidators(Validators.required);
      this.ionicForm.get('fx_customer').setValidators(null);
      this.ionicForm.get('fx_customer_tel').setValidators(null);
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
    this.ionicForm.controls['fx_customer'].setValue(cus_name);
    this.ionicForm.controls['fx_customer_tel'].setValue(cus_tel);
  } 

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    //console.log(port,port['shipping_price']);
    this.ionicForm.controls['fx_shipping_price'].setValue(port['shipping_price']);
    this.cul_total();
  }

 
  public cul_total(){
    //console.log(this.tmpproduct,this.tmpproductetc);
    this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0) +  this.tmpproductetc.reduce((acc,current) => acc + Number(current.etctotalall), 0);
    this.allDiscount = this.tmpproduct.reduce((acc,current) => acc + Number(current.discount), 0) +  this.tmpproductetc.reduce((acc,current) => acc + Number(current.etctotaldiscount), 0);
    this.alltotal = Number(this.alltotalproduct) + Number(this.po_shipping_price);
    
  }

  loaddata_product(padding) {
    let datalimit;
    this.sub = this.mtdSv
      .getmtd(11,padding)
      .subscribe((data) => {
        if (data !== null) {
          this.ports_productmain = data.data_detail.map((item) => Object.assign({}, item));
        }
      });
  }

  portChange_Product(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    let tmpindex:number;
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
   port.forEach((value, index) => {
    this.tmpproduct.push({
      id: index+Number(tmpindex),
      name: value.fix_name +'/' +value.fix_price,
      product_id: value.id,
      product_name: value.fix_name,
      price: value.fix_price,
      discount:'0',
      total: value.fix_price,
      commentproduct: '',
      picresizbase64List: [],
      numbervalue: null,
      fix_cupon: value.fix_cupon ,
			fix_green: value.fix_green ,
			fix_install: value.fix_install,
			cut_number: value.cut_number,
			cut_green: value.cut_green,
    });
  });
    //console.log(this.tmpproduct);
    event.component.clear();
    this.cul_total();
    
  }

  Discount(id,value){
    let item = this.tmpproduct.filter((val) => val.id == id);
    item[0].discount = value;
    if(value <= item[0].price){
      item[0].total = Number(item[0].price) - Number(value);
      this.cul_total();
    }
 
  }

  Commentproduct(id,value){
    let item = this.tmpproduct.filter((val) => val.id == id);
    item[0].commentproduct = value;
  }

  Deltmpproduct(id,index){
    //console.log(id,index);
    this.discount[index] = null; this.commentproduct[index] = null
    this.tmpproduct = this.tmpproduct.filter(obj => obj.id !== id);
    this.tmpproductetc = this.tmpproductetc.filter(obj => obj.id !== id);
    this.cul_total();


    
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
    var plusTen = []
    itempic[0]['picresizbase64List'].forEach((itm,index) => {
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
      componentProps:{index:index,id:id,mode:'fix'}
    });
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
      this.cul_total();
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  async submitForm(){
    let founddiscount = this.tmpproduct.find(function (value){
        if(value.discount > value.price){
          return true;
        }
    });
 
   
    this.ionicForm.controls['tmpproduct'].setValue(this.tmpproduct);
    this.ionicForm.controls['fx_discount'].setValue(this.allDiscount);
    this.ionicForm.controls['fx_totalproduct'].setValue(this.alltotalproduct);
    this.ionicForm.controls['fx_total'].setValue(this.alltotal);
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid || founddiscount) {
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
            this.sub = this.fxSv
            .crudfx(this.ionicForm.value,typesql)
            .subscribe((data) => {
              if (data !== null) {
                if(typesql === 'insert'){
                  if(data.status === 'ok'){
                    this.refreshForm();
                    this.configSv.ChkformAlert(data.message);
                  }
                }else if(typesql === 'update'){
                 
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  
                  let fixdetail_array = [];
                  this.tmpproduct.forEach((value, index) => {
                    let fixname;
                    if(value.cut_number == 'true'){
                     // console.log(value.numbervalue);
                      fixname = value.product_name + ' (เบอร์: ' + value.numbervalue['podetail_number'] + ' ด้านหน้าสี: ' + value.numbervalue['color_front'] + ' ด้านหลังสี: ' + value.numbervalue['color_back'] + ')' 
                    }else{
                      fixname = value.product_name;
                    }
                    fixdetail_array.push({
                      fixdetail: fixname
                    });
                  });

                  //console.log(this.tmpproduct,fixdetail_array);
                  dataarray.push({ 
                    po_date:this.ionicForm.controls.fx_date.value,
                    po_recivedate:this.ionicForm.controls.fx_recivedate.value,
                    po_namewin:this.ionicForm.controls.fx_namewin.value,
                    area_name:this.ionicForm.controls.mtd_area_id.value.area_name,
                    po_customer:this.ionicForm.controls.fx_customer.value,
                    po_customer_tel:this.ionicForm.controls.fx_customer_tel.value,
                    po_total: this.ionicForm.controls.fx_total.value,
                    qty:this.tmpproduct.length,
                    fixdetail:fixdetail_array,
                    //ponumberdetail:ponumberdetail,
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
            () => { });
          }
        }]
      });
      confirm.present();
    }
  }

  showImg(detail_id,name){
    let url = this.configSv.ip + 'fx01/productdetail/' + detail_id + '/' +  name
    const browser = this.iab.create(url).show();
   }


   refreshForm() {
    this.ionicForm.reset({fx_date:moment().format("DD/MM/YYYY")});
    let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
    this.portControl_sale.setValue(item);
    this.isSubmitted = false;
    this.tmpproduct =[];this.discount = []; this.commentproduct = [];
    this.tmpproductetc =[];this.indexpic = 0;
    this.alltotalproduct=0;this.allDiscount=0;this.po_shipping_price=0;this.alltotal=0;  this.cus_type
    //this.portControl_customertype.setValue(this.portscustomertype[0]);
  }

  async cancelData() {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบใบเปลี่ยน '+ this.po_running +' ? ',
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
             this.sub = this.fxSv.crudfx(this.ionicForm.value,'cancel',data['cause']).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  let dataarray = []; 
                  dataarray.push({
                    po_statustext:'ยกเลิกใบเปลี่ยน',
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

  ionViewDidEnter(){
    this.loaddata_edit();
  
  }

  loaddata_edit(){
    //console.log(this.id);
     if(typeof this.id !== 'undefined'){
      // console.log(this.id);
       this.sub = this.fxSv
       .getfx_edit(this.id)
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
               }else if(key === "fx_customertype"){
                 let value_a = this.portscustomertype.filter(function (item1) {
                   return item1.id === value;
                 })[0];
                 this.portControl_customertype.setValue(value_a);
                 this.cus_type = value_a['id'];
                 if(this.cus_type == '0'){
                   this.ionicForm.get('fx_customer').setValidators(Validators.required);
                   this.ionicForm.get('fx_customer_tel').setValidators(Validators.required);
                 }else{
                   this.ionicForm.get('mtd_member_id').setValidators(Validators.required);
                 }
               }else{
                 //console.log(key,value)
                 this.ionicForm.controls[key].setValue(value);
               }
             }
 
             this.tmpproduct = data.data_detail[0]['tmpproduct'];
             //console.log(this.tmpproduct);
             this.allDiscount = data.data_detail[0]['fx_discount'];
             this.alltotalproduct = data.data_detail[0]['fx_totalproduct'];
             this.alltotal = data.data_detail[0]['fx_total'];
             this.tmpproduct.forEach((item,index) => {
               this.discount[index] = item['discount'];
               this.commentproduct[index] = item['commentproduct'];
               item['picresizbase64List'].forEach(element => {
                 this.indexpic = element['indexpic'];
               });
             });
 
            //  if(this.modepayment === 'ok' || this.modepayment === 'view' ){
            //    let moneypad = Number(data.data_detail[0]['po_total']) - Number(data.data_detail[0]['po_deposit']);
            //    this.ionicFormPayment.controls['moneypay'].setValue(moneypad);
 
            //    if(this.modepayment === 'view'){
            //      this.sub = this.poSv.getpotf_cfwin('viewpayment',this.id,0).subscribe((data1) => {
            //        if (data1 !== null) {
            //          data1.data_detail.forEach((item) => {
            //            for (const [key, value] of Object.entries(item)) {
            //              if(key === "typepayment"){
            //                let value_a = this.ports_payment.filter(function (item1) {
            //                     return item1.id == value;
            //                 })[0];
            //                 this.portControl_payment.setValue(value_a);
            //                 this.paymenttype = Number(value);
            //               }else if(key === 'picresizbase64List'){
            //                 this.showrowpaymenttype1 = false;
            //                this.picpreview = Object(value).map((item) => Object.assign({}, item));
            //                //console.log(this.picpreview);
            //                this.picpreview.forEach(task => {
            //                   //console.log(task)
            //                    this.indexpic++;
            //                    this.picresizbase64Array.push(this.formBuilder.group({
            //                    id: [task.id],
            //                    url: [task.url],
            //                  }));
            //              });
            //              }else{
            //                this.ionicFormPayment.controls[key].setValue(value);
            //              }
            //            }
            //          });
            //        }
            //      });
            //    }
            //  }


           });
           this.indexpic++
         }
       });
     }
   }

}
