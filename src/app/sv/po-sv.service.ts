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
      'type_sql': type,
      'category': value,
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
        'po_date':vdata.po_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'po_namewin' : vdata.po_namewin,
        'mtd_area_id': vdata.mtd_area_id.id,
        'po_customertype': vdata.customer_type_id.id,
        'po_customer': vdata.po_customer,
        'po_customer_tel': vdata.po_customer_tel,
        'mtd_member_id' :mid,
        'po_green' : vdata.po_green,
        'po_totalproduct' : vdata.po_totalproduct,
        'po_discount' : vdata.po_discount,
        'po_deposit' : vdata.po_deposit,
        'po_total' : vdata.po_total,
        'po_recivedate' : vdata.po_recivedate,
        'mtd_shipping_id' : vdata.mtd_shipping_id.id,
        'po_shipping_price' : vdata.po_shipping_price,
        'po_address' : vdata.po_address,
        'po_address_place' : vdata.po_address_place,
        'tmpproduct' : vdata.tmpproduct,
        'oldtmpproduct' : vdata.oldtmpproduct,
        'namewin_comment' : vdata.namewin_comment,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getpo(vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_getproduct.php';
    //console.log(vdata,vdata.typeserch_id.id);
    let typeserch;
    if(  typeof vdata.typeserch_id.id === 'undefined' ){
      typeserch = vdata.typeserch_id;
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

  getpo_edit(id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'po.php';
    let data;
    data = {
      'id': id,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  getpoassign(type,vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_assign.php';
     let data = {
      'padding': padding,
      'limit': limit,
      'typeserch': vdata.typeserch_id,
      'serchtxt': vdata.txtserach,
      'po_assigndate' : vdata.po_assigndate,
      'type_sql': type,
    }
    //console.log(data);
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudpoassign(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'po_assign.php';
    let data;
    if (type === 'delete') {
      data = {
        'id': vdata.id,
        'emp_id': this.configSv.emp_id,
        'dataall' : vdata.dataall,
        'total' : vdata.total,
        'cause': cause,
        'type_sql': type
      }
    }
    else {
      data = {
        'po_assigndate':vdata.po_assigndate,
        'seq': vdata.seq,
        'dataall' : vdata.dataall,
        'datasome' : vdata.datasome,
        'total' : vdata.total,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getpoassignreport(type,id,padding?,limit?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_assign_report.php';
    //console.log(vdata);
     let data = {
      'id' : id,
      'type_sql': type,
      'padding': padding,
      'limit': limit,
    }
    //console.log(data);
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getpoassigncancel(type,vdata,padding?,limit?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_assign_report.php';
    //console.log(vdata);
    let typeserch;
    if(  typeof vdata.typeserch_id.id === 'undefined' ){
      typeserch = null;
    }else{
      typeserch = vdata.typeserch_id.id ;
    }
     let data = {
      'type_sql': type,
      'padding': padding,
      'limit': limit,
      'typeserch': typeserch,
      'serchtxt': vdata.txtserach,
    }
    //console.log(data);
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  getcfcupon(type,vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'cfcupon.php';
     let data = {
      'id' : vdata.id,
      'po_todaydate' : vdata.po_todaydate,
      'po_assigndate' : vdata.po_assigndate,
      'type_sql': type,
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudcfcupon(vdata: any, type: string, cause?,type_restore?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'cfcupon.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
    if (type === 'restore') {
      data = {
        'assignid': vdata[0].assign_id,
        'emp_id': this.configSv.emp_id,
        'cause': cause,
        'type_restore' : type_restore,
        'type_sql': type
      }
    }
    else {
      data = {
        'id': vdata.id,
        'total':vdata.total,
        'dataall' : vdata.dataall,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getcfmanage(type,vdata:any,padding?,limit?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'cfmanage.php';
    let typeserch;
    if(  typeof vdata.typeserch_id.id === 'undefined' ){
      typeserch = null;
    }else{
      typeserch = vdata.typeserch_id.id ;
    }
     let data = {
      'type_sql': type,
      'padding': padding,
      'limit': limit,
      'typeserch': typeserch,
      'serchtxt': vdata.txtserach,
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  crudcfmanage(vdata: any, type: string, cause?,type_restore?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'cfmanage.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
    if (type === 'restore') {
      data = {
        'mainassignid': vdata[0].mainassignid,
        'assignid': vdata[0].assign_id,
        'poid': vdata[0].poid,
        'total': vdata[0].total,
        'emp_id': this.configSv.emp_id,
        'cause': cause,
        'type_restore' : type_restore,
        'type_sql': type
      }
    }
   
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getcfgreen(type,vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'cfgreen.php';
     let data = {
      'id' : vdata.id,
      'po_todaydate' : vdata.po_todaydate,
      'po_assigndate' : vdata.po_assigndate,
      'type_sql': type,
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudcfgreen(vdata: any, type: string, cause?,type_restore?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'cfgreen.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
      data = {
        'id': vdata.id,
        'total':vdata.total,
        'dataall' : vdata.dataall,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getcfinstall(type,vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'cfinstall.php';
     let data = {
      'id' : vdata.id,
      'po_todaydate' : vdata.po_todaydate,
      'po_assigndate' : vdata.po_assigndate,
      'type_sql': type,
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudcfinstall(vdata: any, type: string, cause?,type_restore?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'cfinstall.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
      data = {
        'id': vdata.id,
        'total':vdata.total,
        'dataall' : vdata.dataall,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getpotf(type,vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_assign.php';
     let data = {
      'padding': padding,
      'limit': limit,
      'typeserch': vdata.typeserch_id,
      'serchtxt': vdata.txtserach,
      'po_recivedate' : vdata.po_recivedate,
      'type_sql': type,
    }
    //console.log(data);
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudpotf(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'tf_assign.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
      data = {
        'dataall' : vdata.dataall,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getpotf_cfwin(type,vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_cfwin.php';
    let data;
    if(type === 'viewpayment'){
      data = {
        'poid': vdata,
        'type_sql': type,
      }
    }else{
      data = {
        'padding': padding,
        'limit': limit,
        'typeserch': vdata.typeserch_id,
        'serchtxt': vdata.txtserach,
        'po_recivedate' : vdata.po_recivedate,
        'type_sql': type,
      }
    }
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudtf_cfwin(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'tf_cfwin.php';
    let data;
    //console.log(vdata,vdata[0].assign_id);
      data = {
        'poid' : vdata.poid,
        'typepayment' : vdata.typepayment.id,
        'cashmoney_0' : vdata.cashmoney_0,
        'change_0' : vdata.change_0,
        'ems_2' : vdata.ems_2,  
        'payment_cancel_3' : vdata.payment_cancel_3, 
        'emp_id': this.configSv.emp_id,
        'tmpproduct' : vdata.tmpproduct,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

}
  