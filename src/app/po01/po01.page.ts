import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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
import * as $ from 'jquery';
@Component({
  selector: 'app-po01',
  templateUrl: './po01.page.html',
  styleUrls: ['./po01.page.scss'],
})
export class Po01Page implements OnInit {
  @Input() id:number;@Input() po_running:string;
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false; 
  sub: Subscription;
  //id: number; 
  portControl_sale: FormControl; ports_sale: any;
  portControl_area: FormControl; ports_area: any;
  portControl_shipping: FormControl; ports_shipping: any;
  portControl_productmain: FormControl; ports_productmain: any;
  portControl_customertype: FormControl; portscustomertype:any;
  portControl_member: FormControl; ports_member: any;
  tmpproduct =[];discount = []; commentproduct = [];
  tmpproductetc = []; //picpreview =[];
  allDiscount = 0;alltotalproduct=0;po_shipping_price=0;alltotal=0;
  myDate = new Date().toISOString();
  datePickerObj: any = {};

  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigService,public mtdSv: MtdSvService,
    private alertCtrl: AlertController,private poSv: PoSvService,public placeSv:PlaceSvService,private modalCtrl:ModalController) { 
      //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
      //console.log(this.id);
    }

  ngOnInit() {
    
    this.portControl_sale = this.formBuilder.control("", Validators.required);
    this.portControl_area = this.formBuilder.control("", Validators.required);
    this.portControl_shipping = this.formBuilder.control("", Validators.required);
    this.portControl_customertype = this.formBuilder.control("", Validators.required);
    this.portControl_member = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      id:[this.id],
      po_running:[""],
      po_date:[moment().format('L'),[Validators.required]],
      mtd_user_id:this.portControl_sale,
      po_namewin: ["",[Validators.required]],
      mtd_area_id: this.portControl_area,
      customer_type_id :  this.portControl_customertype,
      po_customer:[""], 
      po_customer_tel:[""],
      mtd_member_id: this.portControl_member,
      po_green:["0"],
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
    });
    this.loaddata_sale(0);this.loaddata_area(0);this.loaddata_shipping(0);this.loaddata_product();this.loaddata_customertype();this.loaddata_member(0);
    this.fndate(); this.loaddata_edit();
  }

  loaddata_edit(){
   //console.log(this.id);
    if(typeof this.id !== 'undefined'){
      console.log(this.id);
      this.sub = this.poSv
      .getpo_edit(this.id)
      .subscribe((data) => {
        if (data !== null) {
          console.log(data);
          data.data_detail.forEach((item) => {
            for (const [key, value] of Object.entries(item)) {
               //console.log(key , value);
               this.ionicForm.controls[key].setValue(value);
              // if (key === "mtd_size_id") {
              //   let value_a = this.ports.filter(function (item1) {
              //     return item1.id === value;
              //   })[0];
              //   this.portControl.setValue(value_a);
              // }else if(key === "update_flg"){
              //   //console.log(value);
              //   if(value === '1'){
              //     this.ionicForm.controls['qty'].disable();
              //   }else{
              //     this.ionicForm.controls['qty'].enable();
              //   }
              // }else{
              //   this.ionicForm.controls[key].setValue(value);
              // }
            }
          });
          // this.maxpadding = data["maxpadding"];
          // datalimit = data["limit"];
          // this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
         
        }
      });
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

  loaddata_product() {
    let datalimit;
    this.sub = this.poSv
      .getproduct('readproduct',0)
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

  public inqtyerror(qty: number,qty_remain:number): boolean{
    if (Number(qty) < Number(qty_remain)){
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
  }) {
    let port = event.value;
    let tmpindex:number;
    //this.tmpproduct = port.map((item) => Object.assign({}, item));
  //console.log(this.tmpproduct.length );
   if(this.tmpproduct.length === 0){
    tmpindex = 0;
   }else{
    //console.log(this.tmpproduct[this.tmpproduct.length-1]["id"] + 1);
    tmpindex = this.tmpproduct[this.tmpproduct.length-1]["id"] + 1;
   }
   //let picresizbase64Array = Array;
   port.forEach((value, index) => {
    this.tmpproduct.push({
      id: index+tmpindex,
      //id: index,
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
    });
  });
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

  Deltmpproduct(id,index){
    //console.log(id,index);
    this.discount[index] = null; this.commentproduct[index] = null
    this.tmpproduct = this.tmpproduct.filter(obj => obj.id !== id);
    this.tmpproductetc = this.tmpproductetc.filter(obj => obj.id !== id);
    this.cul_total();
    // this.alltotalproduct = this.tmpproduct.reduce((acc,current) => acc + Number(current.total), 0);
    // this.allDiscount = this.tmpproduct.reduce((acc,current) => acc + Number(current.discount), 0);

    
  }
  img_id:number;indexpic = 0;
  onClick_fileUpload(id) {
    this.img_id = id;
    this.fileIngimg.nativeElement.click();
  }

  fileUpload_img(event) {
    var file = event.srcElement.files[0];
    //console.log(file);
    let item = this.tmpproduct.filter((val) => val.id == this.img_id);
    //console.log(item);
    let pic = [];
    if (typeof file !== 'undefined') {
      if (file.type.match(/image.*/)) {
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
            // self.picresizbase64 = resampledImage.src;
            //   self.picpreview.push({
            //     id:self.indexpic,
            //     url:resampledImage.src
            //   });
              
            //  self.picresizbase64Array.push(self.formBuilder.group({
            //     id:[self.indexpic],
            //     url: [self.picresizbase64],
               
            //   }));
              //self.indexpic++;
          };
        }
        //this.label = file.name;
        reader.readAsDataURL(file);
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

  async Addnumber(index,id){
    let item = this.tmpproduct.filter((val) => val.id == id);
   //console.log(item);  
    const modal = await this.modalCtrl.create({
      component:Po01numberPage,
      componentProps:{index:id}
      
    })

    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    //console.log(data,role);
    if(role === 'comfirm'){
      item[0].numbervalue = data;
    }else if(role === 'comfirm1'){
      item[0].productetc = data;
      this.tmpproductetc = this.tmpproductetc.concat(data);
     // console.log(this.tmpproductetc);
     // console.log(this.tmpproductetc.reduce((acc,current) => acc + Number(current.etctotalall), 0));
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
    this.ionicForm.controls['po_discount'].setValue(this.allDiscount);
    this.ionicForm.controls['po_totalproduct'].setValue(this.alltotalproduct);
    this.ionicForm.controls['po_total'].setValue(this.alltotal);
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
            this.sub = this.poSv
            .crudpo(this.ionicForm.value,typesql)
            .subscribe((data) => {
              if (data !== null) {
                if(data.status === 'ok'){
                  this.configSv.ChkformAlert(data.message);
                }

                // if (typesql === "insert") {
                //   if(data.status !== 'ok'){
                //     this.configSv.ChkformAlert(data.message);
                //   }
                // } else if (typesql === "update") {
                //   if(data.status === 'ok'){
                //     null;
                //     // let item;
                //     // item = this.data.filter((val) => val.id == data.id);
                //     // item.forEach((item) => {
                //     //   for (const [key, value] of Object.entries(item)) {
                //     //     //item[key] = this.ionicForm.controls[key].value;
                //     //     if (key === "mtd_size_id") {
                //     //       item[key] = this.ionicForm.controls[key].value.id;
                //     //     }else if(key === "size_name"){
                //     //       item[key] = this.ionicForm.controls['mtd_size_id'].value.size;
                //     //     }else if(key === "update_flg"){
                //     //       this.ionicForm.controls['qty'].enable();
                //     //     }else{
                //     //       item[key] = this.ionicForm.controls[key].value;
                //     //     }
                //     //   }
                //     // });
                //   }else{
                //     this.configSv.ChkformAlert(data.message);
                //   }  
                // }
                
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
    this.ionicForm.reset({po_date:moment().format("DD/MM/YYYY"),po_green:0});
    let item = this.ports_sale.filter((val) => val.id == this.configSv.emp_id)[0];
    this.portControl_sale.setValue(item);
    this.isSubmitted = false;
    this.tmpproduct =[];this.discount = []; this.commentproduct = [];
    this.tmpproductetc =[];this.indexpic = 0;
    this.alltotalproduct=0;this.allDiscount=0;this.po_shipping_price=0;this.alltotal=0; this.loaddata_product(); this.cus_type
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
    }else{
      this.ionicForm.get('mtd_member_id').setValidators(Validators.required);
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
    console.log(item,cus_name,cus_tel);
    this.ionicForm.controls['po_customer'].setValue(cus_name);
    this.ionicForm.controls['po_customer_tel'].setValue(cus_tel);
  

  }


}
