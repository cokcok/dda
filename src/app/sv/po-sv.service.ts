import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data,number_data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
@Injectable({
  providedIn: 'root'
})
export class PoSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  getproduct(type,value?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_getproduct.php';
     let data = {
      'type_sql': type
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getnumber(type,numberarray): Observable<number_data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_getproduct.php';
     let data = {
      'type_sql': type,
      'tmp_number':numberarray,
    }
    return this.http.post<number_data>(apiUrl, data, { headers: header });
  }

  crudpo(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'po.php';
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
        'po_date':vdata.po_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'po_namewin' : vdata.po_namewin,
        'mtd_area_id': vdata.mtd_area_id.id,
        'po_customer': vdata.po_customer,
        'po_customer_tel': vdata.po_customer_tel,
        'po_green' : vdata.po_green,
        'po_total' : vdata.po_total,
        'po_discount' : vdata.po_discount,
        'po_recivedate' : vdata.po_recivedate,
        'mtd_shipping_id' : vdata.mtd_shipping_id.id,
        'po_shipping_price' : vdata.po_shipping_price,
        'po_address' : vdata.po_address,
        'po_address_place' : vdata.po_address_place,
        'tmpproduct' : vdata.tmpproduct,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }
}
  