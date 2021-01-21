import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl,} from "@angular/forms";
import { ConfigService } from "./../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";
import {MtdSvService} from '../sv/mtd-sv.service';
declare var $: any;
@Component({
  selector: 'app-mtd01',
  templateUrl: './mtd01.page.html',
  styleUrls: ['./mtd01.page.scss'],
})
export class Mtd01Page implements OnInit {
  @ViewChild('fileIngimg') fileIngimg: ElementRef;
  ionicForm: FormGroup;isSubmitted = false;
  portControl: FormControl;sub: Subscription;
  filterTerm: string;page = 0;maxpadding = 0;limit = 50;
  id: number; picresizbase64: any;
  data = [];
  ports: any;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public mtdSv: MtdSvService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [""],
      prefix_name: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      picresizbase64: [""],
      highlight: [""],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  onClick_fileUpload() {
    this.fileIngimg.nativeElement.click();
  }

  submitForm() {
    console.log(this.ionicForm.value);
    // console.log(this.ionicForm.controls.port.value.id);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      let typesql: string;
      if (!this.ionicForm.controls.id.value) {
        typesql = "insert";
      } else {
        typesql = "update";
      }
      //console.log(this.ionicForm.value);
      // this.sub = this.sysmenuSv
      //   .crudsyssubmenu(this.ionicForm.value, typesql)
      //   .subscribe(
      //     (data) => {
      //       if (typesql === "insert") {
      //         this.data.unshift({
      //           id: data.id,
      //           title: this.ionicForm.controls.title.value,
      //           url: this.ionicForm.controls.url.value,
      //           svg: this.ionicForm.controls.svg.value,
      //           seq: this.ionicForm.controls.seq.value,
      //           open: this.ionicForm.controls.open.value,
      //           sys_menu_id: this.ionicForm.controls.sys_menu_id.value.id,
      //           title_menu: this.ionicForm.controls.sys_menu_id.value.title,
      //           highlight: true,
      //         });
      //       } else if (typesql === "update") {
      //         let item;
      //         item = this.data.filter((val) => val.id == data.id);
      //         item.forEach((item) => {
      //           for (const [key, value] of Object.entries(item)) {
      //              item[key] = this.ionicForm.controls[key].value;
      //               if(key === 'sys_menu_id'){
      //                 item[key] = this.ionicForm.controls[key].value.id;
      //               }
      //               if(key === 'title_menu'){
      //                 item[key] = this.ionicForm.controls['sys_menu_id'].value.title;
      //               }
      //           }
      //         });
      //       }
      //       this.configSv.ChkformAlert(data.message);
      //     },
      //     (error) => {
      //       console.log(JSON.stringify(error));
      //     },
      //     () => {
      //       this.refreshForm();
      //     }
      //   );
    }
  }

  fileUpload_img(event) {
    var file = event.srcElement.files[0];
    //console.log(file.type);
    if (typeof file !== 'undefined') {
      if (file.type.match(/image.*/)) {
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
            // create a new base64 encoding
            var resampledImage = new Image();
            resampledImage.src = canvas.toDataURL();
            self.picresizbase64 = resampledImage.src;
            $("#resampled").text('');
            console.log(self.picresizbase64);
            //document.getElementById("resampled").appendChild(resampledImage);
            $("#resampled").append(resampledImage);
          };
        }
        //this.label = file.name;
        reader.readAsDataURL(file);
      }
      else {
        alert('กรุณาระบุชนิดไฟล์รูปภาพ');
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }
}
