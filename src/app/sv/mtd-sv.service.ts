import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
import { place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class MtdSvService {
  getpage = ['mtd01.php','mtd_area.php','mtd_producttype.php','mtd_size.php','mtd_shipping.php','mtd_number.php','mtd_numberdetail.php','mtd_product.php','mtd_productdetail.php']//8 indexล่าสุด
  constructor(private http: HttpClient, private configSv: ConfigService) { }

  getplace(): Observable<place[]> {
    let apiUrl = "./assets/data/place.json";
    return this.http.get<place[]>(apiUrl);
  }

  getmtd(page:number,padding: number, limit: number = 9999999999,condition?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + this.getpage[page];
    // if(page === 'mtd01'){
    //    apiUrl = this.configSv.ip + 'mtd01.php';
    // }
     let data = {
      'padding': padding,
      'limit': limit,
      'condition':condition,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudmtd01(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd01.php';
    //console.log(vdata);
    let data;
    if (type === 'cancel' ||  type === 'resetpwd') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'prefix_name': vdata.prefix_name,
        'name': vdata.name,
        'surname': vdata.surname,
        'group_id': vdata.group_id.id,
        'userpass': vdata.username,
        'pic': vdata.picresizbase64List,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdarea(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_area.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'area_name': vdata.area_name,
        'area_name_desc': vdata.area_name_desc,
        'area_day': vdata.area_day,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdproducttype(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_producttype.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'product_type': vdata.product_type,
        'product_type_desc': vdata.product_type_desc,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdsize(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_size.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'size': vdata.size,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdshipping(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_shipping.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'shipping_desc': vdata.shipping_desc,
        'shipping_price': vdata.shipping_price,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdnumber(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_number.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'color': vdata.color,
        'color_acronym': vdata.color_acronym,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  crudmtdnumberdetail(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_numberdetail.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'mtd_number_id': vdata.mtd_number_id,
        'number': vdata.number,
        'mtd_size_id': vdata.mtd_size_id.id,
        'qty': vdata.qty,
        'price': vdata.price,
        'qty_remain': vdata.qty_remain,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdproduct(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_product.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'product_name': vdata.product_name,
        'product_desc': vdata.product_desc,
        'product_pattern': vdata.product_pattern,
        'product_model': vdata.product_model,
        'product_color': vdata.product_color,
        'product_type_id': vdata.product_type_id.id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdproductdetail(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_productdetail.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      data = {
        'id': vdata.id,
        'mtd_size_id': vdata.mtd_size_id.id,
        'mtd_product_id': vdata.mtd_product_id,
        'qty': vdata.qty,
        'price': vdata.price,
        'qty_remain': vdata.qty_remain,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }
}
 