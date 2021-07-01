import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data,number_data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
@Injectable({
  providedIn: 'root'
})
export class FxSvService {
 
  constructor(private http: HttpClient, private configSv: ConfigService) { }

  crudfx(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'fix.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata.id,
        'emp_id': this.configSv.emp_id,
        'oldtmpproduct' : vdata.oldtmpproduct,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      let mid:number;
      if(vdata.customer_type_id.id === '0'){
        mid = 0;
      }else{
        mid =  vdata.mtd_member_id.id;
      }
      data = {
        'id': vdata.id,
        'po_date':vdata.fx_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'po_namewin' : vdata.fx_namewin,
        'mtd_area_id': vdata.mtd_area_id.id,
        'po_customertype': vdata.customer_type_id.id,
        'po_customer': vdata.fx_customer,
        'po_customer_tel': vdata.fx_customer_tel,
        'mtd_member_id' :mid,
        'po_totalproduct' : vdata.fx_totalproduct,
        'po_discount' : vdata.fx_discount,
        'po_deposit' : vdata.fx_deposit,
        'po_total' : vdata.fx_total,
        'po_recivedate' : vdata.fx_recivedate,
        'mtd_shipping_id' : vdata.mtd_shipping_id.id,
        'po_shipping_price' : vdata.fx_shipping_price,
        'po_address' : vdata.fx_address,
        'po_address_place' : vdata.fx_address_place,
        'tmpproduct' : vdata.tmpproduct,
        'oldtmpproduct' : vdata.oldtmpproduct,
        'namewin_comment' : vdata.namewin_comment,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getfx(vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'fx_getproduct.php';
    //console.log(vdata,vdata.typeserch_id.id);
    let typeserch;
    if(  typeof vdata.typeserch_id.id === 'undefined' ){
      typeserch = 9;
    }else{
      typeserch = vdata.typeserch_id.id ;
    }
     let data = {
      'padding': padding,
      'limit': limit,
      'typeserch': typeserch,
      'serchtxt': vdata.txtserach,
      'type_sql': 'readpo'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getfx_edit(id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'fix.php';
    let data;
    data = {
      'id': id,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getfx_excel(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_excel.php';
    //console.log(vdata,vdata.typeserch_id.id);
    let typeserch;
    if(  typeof vdata.typeserch_id.id === 'undefined' ){
      typeserch = 9;
    }else{
      typeserch = vdata.typeserch_id.id ;
    }
     let data = {
      'typeserch': typeserch,
      'serchtxt': vdata.txtserach,
      'typeassign': vdata.typeassign,
      'type_sql': 'readfix'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

}
