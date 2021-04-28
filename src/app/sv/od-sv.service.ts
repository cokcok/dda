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



  crudod(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'od.php';
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
      // let mid:number;
      // if(vdata.customer_type_id.id === '0'){
      //   mid = 0;
      // }else{
      //   mid =  vdata.mtd_member_id.id;
      // }
      data = {
        'id': vdata.id,
        'od_date':vdata.od_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'mtd_supplier_id': vdata.mtd_supplier_id.id,
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
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }
}
 