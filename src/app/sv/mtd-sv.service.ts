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
  getpage = ['mtd01.php','mtd_area.php','mtd_producttype.php','mtd_size.php','mtd_shipping.php','mtd_number.php','mtd_numberdetail.php','mtd_product.php','mtd_productdetail.php','mtd_member.php','mtd_green.php','mtd_fix.php']//11 indexล่าสุด
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
        'nickname': vdata.nickname,
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
        'category_id' : vdata.category_id.id,
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
        'pic': vdata.picresizbase64List,
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
        'productid':vdata.productid,
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

  crudmtdmember(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_member.php';
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
        'member_date': vdata.member_date,
        'member_idcard': vdata.member_idcard,
        'member_name': vdata.member_name,
        'member_surname': vdata.member_surname,
        'member_nickname': vdata.member_nickname,
        'member_brithday': vdata.member_brithday,
        'member_nationality': vdata.member_nationality,
        'member_race': vdata.member_race,
        'member_religion': vdata.member_religion,
        'member_address': vdata.member_address,
        'member_place': vdata.member_place,
        'member_tel': vdata.member_tel,
        'member_email': vdata.member_email,
        'member_line': vdata.member_line,
        'member_winname': vdata.member_winname,
        'mtd_area_id': vdata.mtd_area_id.id,
        'member_yellow': vdata.member_yellow,
        'member_countwin': vdata.member_countwin,
        'pic': vdata.picresizbase64List,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  crudmtdgreen(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_green.php';
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
        'namewin': vdata.namewin,
        'mtd_area_id': vdata.mtd_area_id,
        'qty': vdata.qty,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  crudmtdfix(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_fix.php';
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
        'fix_name': vdata.fix_name,
        'fix_price': vdata.fix_price,
        'fix_cupon': vdata.fix_cupon,
        'fix_green': vdata.fix_green,
        'fix_install': vdata.fix_install,
        'cut_number': vdata.cut_number,
        'cut_green': vdata.cut_green,
        'cut_product': vdata.cut_product,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getreport_number(type): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd_number.php';
     let data = {
      'type_sql': type
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getreport_product(type): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd_product.php';
     let data = {
      'type_sql': type
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

}
 