import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data,number_data } from '../models/data_model';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class OdSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  getod(vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'od.php';
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
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getod_edit(id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'od.php';
    let data;
    data = {
      'id': id,
      'type_sql': 'readedit'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudod(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'od.php';
    let data;
    if (type === 'cancel') {
      data = {
        'id': vdata.id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
        'cause': cause
      }
    }
    else {
      let mid:number;
      if(vdata.supplier_type_id.id === '0'){
        mid = 0;
      }else{
        mid =  vdata.mtd_supplier_id.id;
      }
      data = {
        'id': vdata.id,
        'od_date':vdata.od_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'mtd_supplier_id': mid,
        'supplier_type':vdata.supplier_type_id.id,
        'supply_name' : vdata.supply_name,
        'supply_address': vdata.supply_address,
        'supply_place': vdata.supply_place,
        'supply_tel': vdata.supply_tel,
        'supply_fax' : vdata.supply_fax,
        'supply_taxid' : vdata.supply_taxid,
        'contact_name' : vdata.contact_name,
        'contact_tel' : vdata.contact_tel,
        'contact_email' : vdata.contact_email,
        'total' : vdata.total,
        'vat' : vdata.vat,
        'sumtotal' : vdata.sumtotal,
        'tmpproduct' : vdata.tmpproduct,
        'oldtmpproduct' : vdata.oldtmpproduct,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  crudod_recive(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'od_recive.php';
    let data;
    if(type === 'insert'){
      data = {
        'od_main_id' : vdata.od_main_id,
        'od_main_detail_id' : vdata.od_main_detail_id,
        'od_recive_date' : vdata.od_recive_date,
        'recive_seq' : vdata.recive_seq,
        'qty_recive' : vdata.qty_recive,
        'od_recive_detail' : vdata.od_recive_detail,
        'product_id' : vdata.product_id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }else if(type === 'update'){
      data = {
      'od_main_id' : vdata,
      'emp_id': this.configSv.emp_id,
      'type_sql': type
      }
    }
   
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getod_recive(id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'od_recive.php';
    let data;
    data = {
      'od_main_detail_id': id,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  
}
 