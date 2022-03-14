import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { PoSvService } from '../sv/po-sv.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import {Poassign04Page} from '../poassign04/poassign04.page';

import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

//ต้องระบุตามชื่อของ ไฟล์ font
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}
@Component({
  selector: 'app-poassign03',
  templateUrl: './poassign03.page.html',
  styleUrls: ['./poassign03.page.scss'],
})
export class Poassign03Page implements OnInit {
  ionicForm: FormGroup; isSubmitted = false;
  data = []; page = 0; maxpadding: number; limit = 50;
  sub: Subscription; maxdatalimit = 0; filterTerm: string;
  datePickerObj: any = {};
  // currentDate = new Date().toLocaleDateString();
  // currentTime = new Date().toLocaleTimeString();

  constructor(public configSv: ConfigService, private poSv: PoSvService, public formBuilder: FormBuilder, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      txtserach: [moment().format('DD/MM/YYYY'), [Validators.required]],
    });
    this.fndate(); this.loaddata(0);
    //console.log(this.currentDate,this.currentTime);
    //this.xx();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate() {
    this.datePickerObj = {
      inputDate: '',
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
      weeksList: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
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

  loaddata(padding: number, infiniteScroll?) {
    if (padding == 0) { this.data = [] };
    this.sub = this.poSv
      .getpoassign('readassign', this.ionicForm.value, padding, this.limit)
      .subscribe((data) => {
        if (data !== null) {
          this.maxpadding = data["maxpadding"];
          this.maxdatalimit = data["limit"];
          this.data = this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        } else {
          this.data = [];
          this.maxpadding = 0; this.maxdatalimit = 0;
        }
      });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      //this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      this.loaddata(this.page * this.limit, infiniteScroll);
    }
  }

  PrintData(id) {
    //console.log(id);
    let item = this.data.filter((val) => val.id == id);
    this.sub = this.poSv
      .getpoassignreport('cupon', id)
      .subscribe((data) => {
        if (data !== null) {
          item[0].print_status = 1;
          this.DownloadPdf(data.data_detail);
          //this.DownloadPdf_Sticker(data.data_detail);
          //console.log(this.getDataObject(data.data_detail));
        } 
      });
  }

  PrintData_sticker(id) {
    //console.log(id);
    this.sub = this.poSv
      .getpoassignreport('cupon', id)
      .subscribe((data) => {
        if (data !== null) {
          this.DownloadPdf_Sticker(data.data_detail);
          //console.log(this.getDataObject(data.data_detail));
        } 
      });
  }

  DownloadPdf_Sticker(vdata) {
    //console.log(vdata);
    var docDefinition = {
      pageSize: {
        width: 384,
        height: 576
      },
      //pageOrientation: 'landscape',
      //pageMargins: [ 10,5,10,5 ],
      pageMargins: [20,20,20,40],
      // header: {
      //   margin: 3,
      //   columns: [
      //   { 
      //     image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCABGAHADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iikGcHOAf0/GkB4OSOOeOeKTaVr3169F6voH9adfQdRSZHr/nn/AANRyMwA2YznnPTHIP6/Xp0o5l0959lZt+iuC1dtvOWiXq+hLUFwyIoZsk5OxBy0jBGfYvuVRj0PSl3PwePQ4HTgnvz269Me9Ur+doUhkwpAuIgo2hnUu3ls2CR8iRvJJOy8i2SVl2n5lHOEebnnGnyQlUk5yUEowjKbd3ZaKLvrp80Z1JyhBSgpTbkoR9nH2jUpSUE+VO7Scv8APQ+d/j9+1P8ACv8AZsj8JyfEzUr2yHjDUL6x0pdM06XVZlTTLaK9vL25traQTQ6ekL+R9rIdVvJrWMI4lAPQfAT9ob4dftF+GtT8XfDbUrm+0rSdcvvDV/Ff2Mun3ttqeniKaUyW80jP5M9vc28tu5VcjzMluNv8337d/wAbk+Nf7QGvXWkXct14P8Bwy+A/C8sVxIbSeLSNQuU1bVIfLlKzDXtRjedLhNkU2mWWkqIhJHNNcer/APBMz48j4XfHGbwRr1+yeGvi7Bb6Mj3Lt5Nl40so86HfkiWK3i/teJLnTL1pIne4vJdLEUluqSpP/EeXfSlr47xplwhWWGw/CDzNZLTxloqo8XKdSipTi5XjTlXhGKqubVpp2s7H9e5j9GCpgPBvCccrF4urxS8qfEOJyt05ulDL4zpzdCUuW8cYsNWVT6u4879nNW9xp/0xKxJwcdP8KfWbbXRlIyhUmCKcgr8qCXePKLh2DyxvE4kCgBQ8eM8sbQlY7enJ5z2HTt/nPrX9tOcY6u9uenFNLR+1V4TT/wCfbWvPstO5/Iz0U3v7Ocqcravni7OK7tPSy7dtSxRUCyMS2ccdPzx/KnbzkZK5wMgdOe/rx0q7pScHKPMo8zjdXUe9u3n3G01Ll5Xte9vd2va/fysS0Uwk4+8oOe3PH6/ypqly2CVK4PTr7f8A6v0pRkpX5Wny722+T2f3i07peTaTfouokjMFwOWwSQenCE4Zs/KCR94gjkDHII/J39qn/gs/+xP+xr8btf8A2f8A43a38RNP+IPh7QvC/iK9g8N/DnWvE2mNpXi+1u7rSZI9RsJRG0hSxuVnXy12MFUFjuNfq7cKAm75sKS7AMQSIstjAwCGICspBDKSPQj/AD/P+DkHT7W1/wCCkxngk2zap8A/hXJfq+ZI5pbXV/F9pCTGUe3hlj0+OfybmWI+XlkZykhjP0vCOT0c+zZ5diHJRlGdSUoS5XGCtK8XZ3dtOW3V/L5bi3Oa+RZVHHYaKm7qC5us3ZJNdnq7n9Eb/wDBx/8A8EzkEbN4q+MIWSVYj/xZrxPuG8NgqhmEspBOfKto552XJjhZVZk+z/2Yv+CrH7DP7YHiZPAvwR+Ovh/U/H8rOIvAHi/SPEnw68ZXPlossg03QvGemaVc6xPFG5YW+m+e0oDyK6xRO1fx6/8ABOD/AIInr/wUU/Ze8RfHPSP2iLn4YeKdJ+JXjH4er4N1L4ZjXvDV0/h2z8L6lYyapr2l+LNHv0tbiLV7n7Wba1mUTpYzCGJYXhuvyp/aD+BfxX/Y3/aF8Z/Brx5etonxT+CninQriLxL4Ov73TxZSLNbeIvBnjTw7dxWum3sEOr6MbHWtKV2vJo4Bc2d/dXlrNcW0v3FHgvhnH4nMMswGZYmnmWCo1Jv21NqClBOyjzJe0vJxjaNviWq0v8ADS414kwdDA5jjcvoVcvxdanBKnUTlOMpLm5rL3Eopyu217p/qzpeGVC8a7gpX5o1dlw0skQUsUT96vlkzw4MlsRtlzvQn4J/4KEftKL8DPgpfaZoN4qfEj4hR3vhnwlFbuBdadDdQvBqfiYAOpRNMtZfLgmBZEvr2zkdZY1kifyf/gml+3C37R//AAT5+HX7SnxW1mwsPEvhbS/Efg34va68MVlZz+L/AIc6ncaLrviERJOY0fxfbW+j63YWpYzyS6tbyRJJGXhk/Fr9pT4669+0f8VdW8faqs1roYM2meBNLuGdINI8KpMyW8txb+c8kN/fEJea8PNVZ5o7FrSKyjiljn/hH6TvijDwy4WxvDqqxlxNmlPFYSi4StWwlN869vKKcZU3KK5IXS5pVEl1t/bP0avDKXijxZhc9lTqLhbJ5YPHYxSg3RxNalOnUpYSno41eerGM69naNClKUlafLL59cLDvALOIvtVvGSxYTm3iWHT1MxIRA93NGkssgO+Pco2yOJBZgvbvTrqG80+6ns73T7y0lhvLY+VJaara3Onz6XLZ3nzxhoNZWEvOEKxxxktgK5b7t/YQ/ZPk/aM8eLr3iqzls/g74PnS51/z4ikHijWosf2X4StLpwy2ps7xU1DxHJLHcNcwmxs7T7BNMZzw/7Zn7Lmo/s1fEu606xsprz4W+M59T1rwPqTxyxxabBeSmTVvBmpKZSV1LTZpWkgmRlM2ly27J5NxBLJJ/mQ/C3jefAOG8U54XE0MNjM6nivb+0ccfRlSqyxFPFV8K0qlHCzrU6cPrDqSj+8Wlmj/TJeK/A1Xj3H+FKxeEqYx5RCVfDOnF5e8WsMsOsrweKTdOtXVCq69SjGlTt7N/FKEkv6B/2Nf2itJ/aL+DOieJxLEnirSIh4c8b2CK6T23iDT4kRtRa1eaa4gtPEFoINa08SNIUt7o27zTTwysv0R448a6N8OvBniXx54ileHw14N8Ma94q1+9gtry7lttH8OaXc6vqE8VlZQXFzdSR21s7eSgQsiuQ+9Vjk/lp/Y5/aZvP2Zfi3beI9SnuZ/Afil4NJ+JECEtJ/Z0txB5HieOGPbEb3w5KZbmTZbuJNFutatY4Vmksbiw/oj/ag1Ww1z9j/APaM1fSrq1v9Mvf2e/i1e2F5aTi5trm1uvh5rcsMsFxGFSaKa3lhmE0JCDzhCCWhZ3/1K+jb4p4HxX4RyJ4zHU6nEeX4bD5RxDgVJe0ozo1aGHpYtpz5pqdOEXKfLZTbu3c/y7+kj4YZl4Q8T5u8Pgp/6v42njs9yXF8svY1qjpV8VLBRko8jdKTmklJP2SpLlXKz4oh/wCC5X/BPJwHb4ta/JE8aTqYvhX8RTKsc7zG3RrdPD805YRRESzqPILbWyjTJFV+H/gt/wD8E6pCGb4ueJIItwEs03wk+K7CNSdoYi28HXJAMjIpLiOJQxYyhlVH/hl8N2T61qvhjRXlkjj1nXdE0d5ljW5mtoNY1XR9KzAk0F1vFqt0XhRgoXLs8pXKN+8X/BQL/gjL4O/ZH/Z98UfHz4ffGzxN4qtvBVxoq6/4L8d6J4bsbjVbLWdRsNHhl8Oa34eGmtNf2+r6npsi2F1pLxXVguoSmWGa2iSb/QDG+HPAeW4/K8FmWZ49Y/NcLSWHp4OjUxKlOtGHLGpUgoqmuaa0kpJddEz/ADeybxf8TM0yPPc7wWV5VUwmSY1yxLx+No4OX1OdSoqfs4VIzlUk4QbcYtNWS1b0/qx+BP7S/wAEP2lfDMvi/wCCPxI8NfEPQ7aYW2oS6JcOL3RruRVeGz1zSbsW2raTdyIxYQ3tjBxHJ83y5Pu0Ry5JRkJDjaRnBRyCxYEgCQbWRSA23JJJJC/wcf8ABGb4o+J/ht+338J9C8N3k6eH/i0fEfgvxlpenkWmm6zaXnhzWtdtb/UNNiMVtc6rpOreD7Upf+WJVQ+X0mk3f3hWcYVVZXeRPJiiBcbXURKNvmgjJmYOfMcYUhVARcc/l/HPCn+pmdyyqE41IVqUcTTk5Lm9hPVKfKlH2iTj7qSbTd9U2/3jw344jx/w/TzieDjh6tKt9Xqqm24qvBNSlHe8G1L3k0no0knpYk6D/eYY6hsnaFPsSRX+eZ/wcUam2p/8FPvHWmeaZF0n4OfBvR12NJtt/tuneJNUuxcbJFBMcesW7RL8sas8RljlPX/QsuXZURuABNGCSVADM2YgxaRSA84ijOxZHbfsWP5t6f5wH/BeG6mk/wCCqP7TX2uUOsNt8F4bVXj1NJYIW+D/AIJ1MwsJrC3Qxtc3MwQwtLEqq6FpHPm13eGKc+IZVoOPvUJwpxcoxlObVnFKTWvuuyur69kV4juDyKlh5Np+2U5ztJ04QTWsppO26v7rsf0tf8G0+ltYf8E6/EGr3UEVnb+I/wBor4qaxBKgs4/LsLfQfBeh3NyhZLbyreK40u4Ls0lzKP3nIDgr/Pl/wcSXelv/AMFOvG8emGJbqw+DHwgs9ebzGN1DrVxpWuXcCTR75oppLTw1qOkB7hpAqRy2SeU+4yN5B+yN/wAFnf2uv2K/gLZfs7fBnTfg1J4ZsfEHiTxFo/iHxt4T1DxB4n03UvFWoS6jqK4/4TPwxo11Yx+bNaWdsNLa9jhkQSS3IE8jfAPjDxd8Y/2s/jb4r8b+Ir/UPif8Y/ivrt1qXiK+iljmlkvJYJLSJL2KztYtL8PaToumC2stKsYJGFvpunWVrI9zOGuX+pw+Ap8NZ1nXFvE+PweSZNCFet7bHYyhQlOFGcaz5YVKybXLRlG0W+dyiktT4+ePqZ/lWV8KcOZfjc5zhThSdLBYOvXipV4yox5akKLTkpVVJ6LljGUr+6fsP/wT++L/AIxj/Yh1X4CWZk0/wHcftA+N/HustC8wl1y9vfDngfTNO0y4laZkbQ7CTQ7m4tLOKCJjdxPLd3F0wRY/o4tzNI2XaZ3mnVnCRXM00kId7hiCsYMaGJUhESSFlhCrJIkieS/BL4a2/wAH/hf4X8CwtJeXunaebrWtRhhEUF9rmp3E+oXrxxzSQo0WliSe0Yyzo8sawiKaSVRFc/qZ+y3+wV8R/wBoVtP8Wa59r8AfCsslxHr99ZSf294ttkljjmPhHTbuBWsrd0adG1bX9MlgjaMJaafeNPHf2f8Agz4w43iP6RXj3x7mPClPE5xhKnE9LLMjdNVIZTh8ooKrTrYzEYlxnQwrjOlGaUlLnfIr3mj/AHU8HaPDH0cvAvgTA8WVMNk+L/1aq5lnPtlCWa4rOcQ6VSjg6GFTjiMXzwqODcbOCUnJJQbXqH/BMz48eP8Awp8T2+DthoWu+M/AHi69a/1FtO0stJ4H1km2e48TavCquNM0u8SKLT9StbqW9ubuSXTr+wksI7S5jufK/wDgoP8AGH4g/Ef46al4V8V6H4g8G+Gvh3NqOjeDPCesxPFcaks92X1Dx0qsXGpR+KMWgs71LnZa2VhHapB5k880n9E/wa+A3w1+BfhWLwj8OvDltoGmPGHvZ4gsmr61ckRCe/1nVJEa/uryXay7hcRwwrPKttBAREYsv45/s3fCj48+FD4Z+IHh6LUHUj+ydfhSG38RaA6W9ysMum64baeSFLYTXDoupJqFtLJM4lgluJYJI/64x30fOMsw8EsFwG+NauHzWlT9tVdlHD4uKUaqyqde37ug5U1BVuRxbSvG0kfyPgfHfg3BeN+M8RY8D0amXVajhQpObdfCVZKVF5wsPF+zni3Tm3Oi5uoouyqualf+QDMySF4vLSeAgPJMY0FozD5nkt50lEqG382IKcqZHXcGXKH77+A37X//AAjP7NXx7/Zq+IGrN/wjPiP4KfF3SPg/rV68k8eg3d14G1tNN8F6lcbt8VheXk90dKuriNpYJXWzluJ43tY4eW/ai/Yi+Kf7OFxf+IEgufG/wykYPa+ObLTpri50y3A3xR+LNGhUzWPkR4i/tCKZ7a6mKSJHAFkgr4uBVwpeNLlJ44Wkdo4fKmCul1DFcIytFerKYAQ8UdusUSvBLG8siyJ/DfCmc8b/AEcvEmhnGMynEZFVwmY0KeY4PETqLLOIsDRq2l7CtyxoVqlaPLVhGMbynGCUrtM/uLibJ+CPpJeG2MyjDZth87w+IyrGzy/GUYwjmfD+YV8LWjCNShzPEU4Uas1Rq80ko03Vc4OMWn+MOjT3ME2jXVs01vqEZ0+TSp4IhLejWp8weXosGyR77UNLvBZCCWJVxd3EBMDqxSv0F+I2lf8ABUP9oay07wh8UPCn7aHxO0ldShutP8J+I/APxNvPD41TT5JYdOvo7CTSLHw808cL3j2F9LqEaQRAlxJGZc8Z8QPgZcaN418J+M/ANtcS6XN4t8K3eveH9LFyZtKuB4k0T7XqlhFDNb3CWl01pC+o2UNyqy3TwXEP2eKFom/0MtPgSQIcxEGFSkkbySSqhKzRbjKv7vKT5WKQSBkYFCqqVX/fTIPpJ8HeI/CfCPFvCGAy3HZlHAUcPm1KVSEcxyPH06MIuOMwf72phueXM4SlOLqU7OK1aX/PPmH0VeMuBOKON+DOMcxzPL8rqZhhq+VVVCby3O8BSrYl1HgsZ+6pYlRU6akoQfLJNPZs/mT/AOCP3/BLD4v/AAl+Ltn+01+0t4bfwFq3hrTtbh+Ffwz1C90bUPEcVxr8UFlc+LfEr6Ve30dg1hYz6vaW2j+VZ3sd5q8M9xcNFA9vc/1BRoUkALM5WMje20M2WU5bYqITgDOFGOwGTlsVnFCwZMgDf8i4SMmRlZ3MUYSIuSv39m4AsAQHYGyBj/6/8q+O4i4hzPinMpZpmjj9YuoQUZXjGjFWjGK6d3dtt9rJH7HwfwhlXBOVRyjKOd4b45OokpOq0uaWnf8ArW5FJHHKu1zkfKTgkElSGUhlIZWVlDKysGVgpBzivmvxp+xp+yX8RfGGsfEL4gfs0/Ajx/468QraR654w8cfCrwP4t8S6nFY2sFjZQ3eta/omo6jJDa2dpbW0EIuFiSK3iAT5FK/S+wepo2DPBP9fzrxYKdJzdCviMPKe88PVlSqLW/uTg04PpddG77n0lWhQrx5a1KlWitVGtTjVg3/AHoyTTXdNNOyPgPx1/wTG/YA8aaNqmlX37IH7O2nvqNrNAb/AMO/Cnwb4a1W2Zo323FnqOiaLZXSTQPiWOMyPC8iI0kEhVQP5+fiZ+xPrfwB+NI+CHw7+H39rHxClxqPw8Xwl4bs7O/8VeGbqdYAdVlsbeN9P/sSaSG21DU571I1JSTyhG7I39f0lukn3ifc55/MYPsfUVmyaDpkt+mqPbRHUo7aayTUPJg+3rZzzR3D2cd+Ihew2vnQwyCCCeKJnijeVZGUEfk/jH4ZVPGLKMtynMuJuIcqpYLExnV+q5niHHEYdSi50q8IV1GrGpGLVns5O6srH6Z4TeJGJ8J83x+a5fw3w7mk6+EnTw0cXl+GUqOJ5ZKlXp1Hh3OlOnKXvOMmpxSslOKmfkZ+yZ/wTL8N+C/7M8cftACz8aeM0Ftd2Hga323vhDwtcQMptV1CWWIp4k1Sz2yKzOI9LjdzK1hcXCWl5B+vdvZW1rEsVvEsccaIiRxokapGgKxRKYVjykSkrGhGEX5R2qf7IgBCvIm77xRtu7BJHyj5VPJ3FQC/G8ttGJkjCEEM2Au3BPB5zk+p969/gjw84U8Psup5RwzkeDwFGlRprEY5QpVMXmdeMYqpVxM3B1VKpJObcpuzdkt2/B4x444t4+zOrnHFWc4rMsTUqy+rYR1JQweV0JSk1SwlJTdNQguWPLGKcklzSlyq0CQ7TwSFySFJyMnb8xLZb6DOMHgVK6I+wtn92cgZYKxCsoyAQrjBJCsGUNtcDciMJQMdz+JzSFQRjOOnvwBgCvuJL2qUakVGMWmknfVNW2torfPY+Sp0/ZyvGTbl8Um9Vvtq29dN9jHv9Ls9Rs7mxvoY72yu0kivIL2KCeG6hlBVoZ45o2hlVxiIpIhUxttHO0j8bP2qf+CYGka4mqeO/wBnhLfw74g23Goat8Orp/I0LWLnZJNJJ4dvSkh0rUZnUgQyNdaeys6Jb27Ohi/adoQ5+ZjtzkpwVIA4BBB4zg8YOQOcZBY1qrbv3kuGGMFtwXkHK7gxB2goGHzBGYA5wR8Jx/4acIeJeWvLeLMqw+PcaVWGDxvs4xxOXVakWoYijPl5pTpT5Zxg5KF42sro+z4J8QOLvD3M6eacK5piMslSqwqV8HGtUnhc1pwleWGxdNVVBU6sXKDnKLlGM3ZpXR/Lr+x1+xd4j+NPxj1zQviXo+veFPCfwludPuvH1rq1pNo2qajrdy8Vzofh6zgZXljt7hEnv31BJLmG5jsVaL7OZY1P9Pek2kNjDDaQxvFFbQRwQxsMhLeCOK3gAkGS5MUIZ2meWZmZiXCqFDrfRbG2mkuIYwk8/lC6nCoJ7sQjbCLu4C/aLowqWWJ7iWWSNWKI6p8o0YoViJKsx3HJBOR26Z5GAMDBxjtwMfO+EXg7w/4QZLisqyKpXrYnGY2piMzzXEScqucQlKUqLq0XOSw0sPBxpxUb35W9U1b3vFbxX4i8Ws+wmb55Rw+HwuEwlKhl+VYfljQyiUYQVb2NRQi8SsRUU5ucrSipKP8ANeWiiiv18/MgooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z', alignment: 'left',width: 100,
      //   height: 50
      //   },
      //   ],
      // },
      content: [
        [{
          columns: [
            this.getDataObject_sticker(vdata, 'sticker'),
          ]
        }],
      ],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 16
      },
       
    }
    //console.log(docDefinition);
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "cupon.pdf");
  }

  getDataObject_sticker(vdata, type) {
     let  data = vdata;
    //console.log(data);
    if(data.length === 0){
      data.push({
        po_running : "" ,
        name : "" ,
        po_customer_tel : "" ,
        po_date : "" ,
        po_namewin : "" ,
        area_name : "" ,
        product_name : "" ,
        size : "" ,
        podetail_comment : "" ,
        po_recivedate : "" ,
        podetail_number : "" ,
        colorfront : "" ,
        colorback : "" ,
        pic : "" ,
        etc : "" ,
        po_statustxt : "" ,
      });
    }
    const exs = [];
    // exs.push(
    //   [
    //    {
    //       colSpan: 2,
    //       text: 'คูปอง',
    //       alignment: 'right',
    //       //margin: [100],
    //     },''
    //   ],
    //   [
    //     {
    //        colSpan: 2,
    //        text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    //        alignment: 'right',
    //        //margin: [0,0,0,0]
    //      },''
         
    //    ],
    //    [
    //     {
    //        colSpan: 2,
    //        text: 'PO650100002-0',
    //        alignment: 'right',
    //        margin: [0,0,0,20]
    //      },''
    //    ],
    //    [
    //     {
    //       text: 'วันที่สั่งซื้อ : 02/02/2022',
    //     },
    //     {
    //       text: 'ผู้ขาย : เดือน',
    //     }
    //    ],
    //    [
    //     {
    //       text: 'ลูกค้า : 0',
    //     },
    //     {
    //       text: 'Tel : xxxxxxxxx',
    //     }
    //    ],
    //    [
    //     {
    //        colSpan: 2,
    //        text: 'วันที่นัดรับ :  02/02/2022' ,
          
    //      },''
    //    ],
    //    [
    //     {
    //       text: 'วิน : xxx',
    //     },
    //     {
    //       text: 'เขต : xxxxxxxxxxxx',
    //     }
    //    ],
    //    [
    //     {
    //       text: 'สินค้า : ssss',
    //     },
    //     {
    //       text: 'ขนาด : s',
    //     }
    //    ],
    //    [
    //     {
    //        colSpan: 2,
    //        text: 'เบอร์/สี :  eeeeeeeeee' ,
          
    //      },''
    //    ],
    //    [
    //     {
    //        colSpan: 2,
    //        text: 'หมายเหตุ :  xdfsdfs' ,
          
    //      },''
    //    ],
    //    [
    //     {
    //        colSpan: 2,
    //        text: 'สินค้าอื่นๆ :  xxxxx' ,
          
    //      },''
    //    ],
    //    [
    //     // {  
    //     //   //text : 'มอบหมาย :',
    //     //   qr: 'www.google.co.th' ,
    //     //   alignment: 'left',
    //     //   fit: '100'
    //     // },
    //     {  
    //       //text : 'มอบหมาย :',
    //       colSpan: 2,
    //       qr: 'www.google.co.th' ,
    //       alignment: 'right',
    //       fit: '100',
    //       //pageBreak: "after",
    //     },''
    //    ],
    // )
    data.forEach((element, index) => {
      let head1,head2;
     // console.log(data.length ,index);
      if(element['assign_type'] === '0'){
        head1 = 'วันสั่งซื้อ : ';
      }else{
        head1 = 'วันเปลี่ยน : ';
      }
      if(data.length !== index+1){
        exs.push(
          [
           {
            text: 'ร้านเสื้อวินดวงดี',
            alignment: 'left',
            fontSize: 22,
            bold: true
           },
           {
              //colSpan: 2,
              text: 'คูปอง',
              alignment: 'right',
              //margin: [100],
            }
          ],
          [
            {
              text: 'โทร. 02-866-9994',
              alignment: 'left',
              fontSize: 22,
              bold: true
            },
            {
               //colSpan: 2,
               text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
               alignment: 'right',
               margin: [0,-10,0,0]
             }
             
           ],
           [
            {
               colSpan: 2,
               text: element['po_running'],
               alignment: 'right',
               margin: [0,-20,0,20]
             },''
           ],
           [
            {
              text: head1 + element['po_date'],
            },
            {
              text: 'ผู้ขาย : ' + element['name'],
            }
           ],
           [
            {
              text: 'ลูกค้า : ' + element['po_customer'],
            },
            {  
              text: 'Tel : ' + element['po_customer_tel'],
            }
           ],
           [
            {
               colSpan: 2,
               text: 'วันที่นัดรับ : ' + element['po_recivedate'] ,
              
             },''
           ],
           [
            {
              text: 'วิน : ' +  element['po_namewin'],
            },
            {
              text: 'เขต : '+  element['area_name'],
            }
           ],
           [
            {
              text: 'สินค้า : ' +  element['product_name'],
            },
            {
              text: 'ขนาด : ' +  element['size'],
            }
           ],
           [
            {
               colSpan: 2,
               text: 'เบอร์/สี : '  +  element['podetail_number'] + '/' + element['colorfront'] + '-' + element['colorback'] ,
              
             },''
           ],
           [
            {
               colSpan: 2,
               text: 'หมายเหตุ : ' +  element['podetail_comment']  ,
              
             },''
           ],
           [
            {
               colSpan: 2,
               text: 'สินค้าอื่นๆ : ' +  element['etc'] ,
              
             },''
           ],
           [
            {  
              colSpan: 2,
              qr: 'https://duangdeewin.com/ddaaap/#/podda01/'+element['id'] ,
              alignment: 'right',
              fit: '100',
              pageBreak: "after",
              margin: [0, 0, 0, 8]
            },''
           ],
        )
      }
      else
      {
        exs.push(
          [
            {
             text: 'ร้านเสื้อวินดวงดี',
             alignment: 'left',
             fontSize: 22,
             bold: true
            },
            {
               //colSpan: 2,
               text: 'คูปอง',
               alignment: 'right',
               //margin: [100],
             }
           ],
           [
             {
               text: 'โทร. 02-866-9994',
               alignment: 'left',
               fontSize: 22,
               bold: true
             },
             {
                //colSpan: 2,
                text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                alignment: 'right',
                margin: [0,-10,0,0]
              }
              
            ],
            [
             {
                colSpan: 2,
                text: element['po_running'],
                alignment: 'right',
                margin: [0,-20,0,20]
              },''
            ],
           [
            {
              text: head1 + element['po_date'],
            },
            {
              text: 'ผู้ขาย : ' + element['name'],
            }
           ],
           [
            {
              text: 'ลูกค้า : ' + element['po_customer'],
            },
            {  
              text: 'Tel : ' + element['po_customer_tel'],
            }
           ],
           [
            {
               colSpan: 2,
               text: 'วันที่นัดรับ : ' + element['po_recivedate'] ,
              
             },''
           ],
           [
            {
              text: 'วิน : ' +  element['po_namewin'],
            },
            {
              text: 'เขต : '+  element['area_name'],
            }
           ],
           [
            {
              text: 'สินค้า : ' +  element['product_name'],
            },
            {
              text: 'ขนาด : ' +  element['size'],
            }
           ],
           [
            {
               colSpan: 2,
               text: 'เบอร์/สี : '  +  element['podetail_number'] + '/' + element['colorfront'] + '-' + element['colorback'] ,
              
             },''
           ],
           [
            {
               colSpan: 2,
               text: 'หมายเหตุ : ' +  element['podetail_comment']  ,
              
             },''
           ],
           [
            {
               colSpan: 2,
               text: 'สินค้าอื่นๆ : ' +  element['etc'] ,
              
             },''
           ],
           [
            {  
              colSpan: 2,
              //qr: 'https://www.duangdeewin.com/dda/#/po01' ,
              qr: 'https://duangdeewin.com/ddaaap/#/podda01/'+element['id'] ,
              alignment: 'right',
              fit: '100',
              //pageBreak: "after",
              margin: [0, 0, 0, 8]
            },''
           ],
           //id:id,po_running:po_running,mode:'view',modepayment:modepay,assign_type:item[0].assign_type
        )
      }
     

    });

    return {
      table: {
        widths: ['60%','40%'],
        //margin: [0, 0, 0, 0],
        //dontBreakRows: true, 
        body: [
          ...exs
        ],
        
      },
      layout: 'noBorders',
      
      
    };
  }

  DownloadPdf(vdata) {
    //console.log(vdata);
    var docDefinition = {
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: 'คูปอง', alignment: 'left' },
        {
          text: {
            function(currentPage, pageCount) {
              return currentPage.toString() + ' / ' + pageCount;
            }
          }, alignment: 'center'
        }
          , { text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), alignment: 'right' }
        ]
      },
      content: [
        [{
          columns: [
            this.getDataObject(vdata, 'odd'),
            this.getDataObject(vdata, 'even'),
          ]
        }],
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "cupon.pdf");
  }

 
  getDataObject(vdata, type) {
    let data;
    if (type === 'odd') {
      data = vdata.filter((value, index) => index % 2 === 0);
    } else if (type === 'even') {
      data = vdata.filter((value, index) => index % 2 === 1);
    }else{
      data = vdata;
    }
    
    if(data.length === 0){
      data.push({
        po_running : "" ,
        name : "" ,
        po_customer_tel : "" ,
        po_date : "" ,
        po_namewin : "" ,
        area_name : "" ,
        product_name : "" ,
        size : "" ,
        podetail_comment : "" ,
        po_recivedate : "" ,
        podetail_number : "" ,
        colorfront : "" ,
        colorback : "" ,
        pic : "" ,
        etc : "" ,
        po_statustxt : "" ,
      });
    }
    const exs = [];
    data.forEach((element, index) => {
      //console.log(element);
      // let a = moment(element['po_recivedate']).format("DD/MM/YYYY")
      // console.log(element['po_recivedate'], a,moment(a).isoWeekday(),moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday());
      //moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday();
      let head1,head2;
      if(element['assign_type'] === '0'){
        head1 = 'วันสั่งซื้อ: ';
        head2 = 'สถานะใบสั่งซื้อ: ';
      }else{
        head1 = 'วันเปลี่ยน: ';
        head2 = 'สถานะใบเปลี่ยน: ';
      }
      exs.push(
        [
          {
            border: [true, true, false, false],
            text: element['po_running']
          },
          {
            border: [false, true, false, false],
            text: 'ผู้ขาย: ' + element['name']
          },
          {
            border: [false, true, false, false],
            text: 'Tel: ' + element['po_customer_tel']
          },
          {
            border: [false, true, true, false],
            text: head1 + element['po_date']
          },
        ],
        [
          {
            colSpan: 2,
            border: [true, false, false, false],
            text: element['po_namewin']
          },'',{
            border: [false, false, false, false],
            text: 'เขต: ' + element['area_name']
          },{
            border: [false, false, true, false],
            text: 'เบอร์/สี: ' +  element['podetail_number'] + '/' + element['colorfront'] + '-' + element['colorback']
          }
        ],
        [
          {
            colSpan: 2,
            border: [true, false, false, false],
            text:  element['product_name']
          },'',{
            border: [false, false, false, false],
            text: 'ขนาด: ' + element['size']
          },{
            border: [false, false, true, false],
            fillColor: this.configSv.colortxt[moment(element['po_recivedate'],'DD/MM/YYYY').isoWeekday()],
            text: 'วันนัดรับ: ' +  element['po_recivedate'] 
          }
        ],
        [
          {
            colSpan: 3,
            border: [true, false, false, false],
            text:  'สินค้าอื่น: ' + element['etc']
          },'','',{
            border: [false, false, true, false],
            text: head2 + element['po_statustxt'] 
          },
        ],
        [
          {
            colSpan: 3,
            border: [true, false, false, true],
            text:  'หมายเหตุ: ' + element['podetail_comment']
          },'','',{
            border: [false, false, true, true],
            text: element['pic'] 
          },
        ],
      );
    });

    return {
      table: {
        widths: ['20%','20%','30%','30%'],
        //margin: [20, 20, 20, 20],
        //heights: [20, 20, 20,20],
        body: [
          ...exs
        ],
     
      }
    };
  }


  PrintData_Green(id,seq,assign_date) {
    //console.log(id);
    this.sub = this.poSv
      .getpoassignreport('green', id)
      .subscribe((data) => {
        if (data !== null) {
          //console.log(data);
          this.DownloadPdf1(data.data_detail,seq,assign_date);
          //console.log(this.getDataObject(data.data_detail));
        }else{
          this.configSv.ChkformAlert('ไม่พบข้อมูล');
        } 
      });
  }

  DownloadPdf1(vdata,seq,assign_date) {
   // console.log(vdata);
   // let items = [];
  //var self = this;
    // items = vdata.map(function (item) {
    //   return [item.seq, item.po_namewin, item.area_name, { text: item.countid, alignment: 'center' }, {  fillColor: self.configSv.colortxt[moment(item.po_recivedate,'DD/MM/YYYY').isoWeekday()],text:item.po_recivedate } ,item.detail,{ text: item.status_greendup, alignment: 'center' }];
    // });
    //console.log(vdata,items);
    var docDefinition = {
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      pageMargins: [ 10,30,10,10 ],
      header: {
        margin: 10,
        columns: [{ text: 'ป้ายเขียว', alignment: 'left' },
        {
          text: {
            function(currentPage, pageCount) {
              return currentPage.toString() + ' / ' + pageCount;
            }
          }, alignment: 'center'
        }
          , { text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), alignment: 'right' }
        ]
      },
       content: [
          this.getDataObjectGreen(vdata,seq,assign_date),
          //console.log(this.getDataObjectGreen(vdata))
      ],
      // content: [
      //   {
      //     style: 'tableExample',
      //     table: {
      //       widths: ['1.5%','20%','17%','7%','9%','*','5%'], //headerRows: 2,
      //       headerRows: 2,
      //       body: [
      //         [{text: 'รายชื่อวิน-ส่งปัก ปักที่ร้าน', style: 'tableHeader', colSpan: 3, alignment: 'center'},'','', { text: 'วันที่มอบหมายของวันที่ ' + assign_date +' ครั้งที่ ' + seq, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '',''],
      //         [{text: '#', style: 'tableHeader', alignment: 'center'}, {text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'}, {text: 'เขต', style: 'tableHeader', alignment: 'center'}, {text: 'จำนวนปัก', style: 'tableHeader', alignment: 'center'}, {text: 'วันนัดรับ', style: 'tableHeader', alignment: 'center'},{text: 'รายละเอียด', style: 'tableHeader', alignment: 'center'}, {text: 'ป้ายซ้ำ', style: 'tableHeader', alignment: 'center'}],
      //       ].concat( items)// detail data
      //     },
      //     pageBreak: "after",
          
      //   },
       
      // ],
      defaultStyle: {
        font: 'THSarabunNew'
      }
    }
    this.configSv.saveToDevice(pdfMake.createPdf(docDefinition), "green.pdf");
  }


  async ViewData(id,seq,assign_date,total){
    let item = this.data.filter((val) => val.id == id);
    const modal = await this.modalCtrl.create({
      component:Poassign04Page,
      cssClass: 'my-modal',
      componentProps:{id:id,assign_date:assign_date,seq:seq,total:total},
    });
    await modal.present();
    const {data,role} = await modal.onWillDismiss();
    // if(role === 'somedata'){
    //  this.datasomearray = data;
    //  item[0].checksomedata = true;
    // }
    if(role === 'delete'){
      //console.log(data,data[0]['id']);
      if(data[0]['id'] === 'all'){
        this.data = this.data.filter(obj => obj.id !== id);
        this.maxdatalimit = this.maxdatalimit - 1;
      }else{
        item[0].total  = data[0]['id'];
      }
    }
  }


  getDataObjectGreen(vdata,seq,assign_date){
    //console.log(vdata);
    const exs = [];
    exs.push(
      [{text: 'รายชื่อวิน-ส่งปัก ปักที่ร้าน', style: 'tableHeader', colSpan: 3, alignment: 'center'},'','', { text: 'วันที่มอบหมายของวันที่ ' + assign_date +' ครั้งที่ ' + seq, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '',''],
      [{text: '#', style: 'tableHeader', alignment: 'center'}, {text: 'ชื่อวิน', style: 'tableHeader', alignment: 'center'}, {text: 'เขต', style: 'tableHeader', alignment: 'center'}, {text: 'จำนวนปัก', style: 'tableHeader', alignment: 'center'}, {text: 'วันนัดรับ', style: 'tableHeader', alignment: 'center'},{text: 'รายละเอียด', style: 'tableHeader', alignment: 'center'}, {text: 'ป้ายซ้ำ', style: 'tableHeader', alignment: 'center'}],
    ); 
    vdata.forEach((element, index) => {
      if(element['pagebreak'] === 'false' ){
        exs.push(
          [ 
            { text: element['seq'] },
            { text: element['po_namewin'] },
            { text: element['area_name'] },
            { text: element['countid'], alignment: 'center' },
            {  text:element['po_recivedate'] },
            { text: element['detail'] },
            { text: element['status_greendup'], alignment: 'center'},
            //{ text: element['status_greendup'], alignment: 'center',pageBreak: "after"},
            //{ pageBreak: "after" },
          ],
          // [
          //   '',this.getdataDetail(element['detail']),'','','','','',
          //   //{ text: this.getdataDetail(element['detail']) },'','','','','','',
          // ]
        )
      }
      else
      {
        exs.push(
          [
            { text: element['seq'] },
            { text: element['po_namewin'] },
            { text: element['area_name'] },
            { text: element['countid'], alignment: 'center' },
            {  text:element['po_recivedate'] },
            { text: element['detail'] },
            { text: element['status_greendup'], alignment: 'center',pageBreak: "after"},
          ],
        )
      }
     
    });
    return {

      table: {
        widths: ['1.5%','25%','20%','7%','9%','25%','5%'],
        headerRows: 2,
       // dontBreakRows: true,
       // keepWithHeaderRows: true, 
       // unbreakable: true,
        body: [
          ...exs
        ],
     
      }

    };
  }

  getdataDetail(vdata){
    const exs1 = [];
    vdata.forEach((element, index) => {
      exs1.push(
        [  { text: element['nickname'] }]
      );
    });

    return {
      table: {
       // widths: ['auto','auto','auto','auto','auto','auto','auto'],
        body: [
          ...exs1
        ],
      }
    };
  }
  


  
}
