import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data,number_data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
@Injectable({
  providedIn: 'root'
})
export class PoSvService {
  private fooSubject_tf = new Subject<any>();
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
        'po_green' : vdata.po_green.id,
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
        'po_status' : vdata.po_status,
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
      typeserch = 9;
    }else{
      typeserch = vdata.typeserch_id.id ;
    }
     let data = { 
      'padding': padding,
      'limit': limit,
      'typeserch': typeserch,
      'serchtxt': vdata.txtserach,
      'typeassign': vdata.typeassign,
      'type_sql': 'readpo',
      'sysgroupid':  this.configSv.group_id,
      'emp_id': this.configSv.emp_id,
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
        'po_recivedate' :vdata.po_recivedate,
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
        'assign_type' : vdata[0].assign_type,
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
        'transfer_userid' : vdata.transfer_userid.id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getpotf_cfwin(type,vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    //console.log(vdata);
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_cfwin.php';
    let data;
    if(type === 'viewpayment'){
      data = {
        'poid': vdata.poid,
        'assign_type':vdata.assign_type,
        'type_sql': type,
      }
    }else{
      data = {
        'padding': padding,
        'limit': limit,
        'typeserch': vdata.typeserch_id,
        'serchtxt': vdata.txtserach,
        'po_recivedate' : vdata.po_recivedate,
        'emp_id': this.configSv.emp_id,
        'type_sql': type,
      }
    }
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  getpotf_cfwinper(type,vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    //console.log(vdata);
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_cfwinper.php';
    let data;
    if(type === 'viewpayment'){
      data = {
        'poid': vdata.poid,
        'assign_type':vdata.assign_type,
        'type_sql': type,
      }
    }else{
      data = {
        'padding': padding,
        'limit': limit,
        'typeserch': vdata.typeserch_id,
        'serchtxt': vdata.txtserach,
        'po_recivedate' : vdata.po_recivedate,
        'emp_id': this.configSv.emp_id,
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
        'assign_type' : vdata.assign_type,
        'payment_date' : vdata.payment_date,
        'payment_total' : vdata.moneypay,
        'typepayment' : vdata.typepayment.id,
        'cashmoney_0' : vdata.cashmoney_0,
        'change_0' : vdata.change_0,
        'ems_2' : vdata.ems_2,  
        'payment_cancel_3' : vdata.payment_cancel_3, 
        'problem_cause_4' : vdata.problem_cause_4, 
        'emp_id': this.configSv.emp_id,
        'tmpproduct' : vdata.tmpproduct,
        'pic' : vdata.picresizbase64List,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  crudto(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'to.php';
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
      data = {
        'id': vdata.id,
        'od_date':vdata.to_date,
        'mtd_user_id': vdata.mtd_user_id.id,
        'company_name': vdata.company_name,
        'company_address': vdata.company_address,
        'company_address_place': vdata.company_address_place,
        'company_addresssend': vdata.company_addresssend,
        'company_addresssend_place': vdata.company_addresssend_place,
        'contact_name': vdata.contact_name,
        'contact_tel': vdata.contact_tel,
        'contact_fax': vdata.contact_fax,
        'vat_type': vdata.vat_type.id,
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

  getto(vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_getproduct.php';
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
      'type_sql': 'readpoto'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  
  getto_edit(id,type): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'to.php';
    let data;
    data = {
      'id': id,
      'type_sql': type
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudto_transport(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'to.php';
    let data;
    data = {
      'id': vdata.id,
      'transport_date': vdata.transport_date,
      'transport_detail': vdata.transport_detail,
      'tmpproduct' : vdata.tmpproduct,
      'pic' : vdata.picresizbase64List,
      'type_sql': type
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }
 
  getpo_excel(vdata:any,type): Observable<data> {
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
      'type_sql': type
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }
  

  getusertf(page:number,padding: number, limit: number = 9999999999,condition?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd01.php';
    // if(page === 'mtd01'){
    //    apiUrl = this.configSv.ip + 'mtd01.php';
    // }
     let data = {
      'padding': padding,
      'limit': limit,
      'condition':condition,
      'type_sql': 'readusertf'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  searchpo(vdata:any,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'searchproduct.php';
    //console.log(vdata,vdata.typeserch_id.id);
    // let typeserch;
    // if(  typeof vdata.typeserch_id.id === 'undefined' ){
    //   typeserch = 9;
    // }else{
    //   typeserch = vdata.typeserch_id.id ;
    // }
     let data = { 
      'padding': padding,
      'limit': limit,
      'typeserch': vdata.typeserch_id.id,
      'serchtxt': vdata.txtserach,
      'typeassign': vdata.typeassign,
      'type_sql': 'read',
      'sysgroupid':  this.configSv.group_id,
      'emp_id': this.configSv.emp_id,
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  searchtfsummary(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_summary.php';
     let data = { 
      'serchtxt': vdata.txtserach,
      'serchtxt1': vdata.txtserach1,
      'type_sql': 'read',
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  searchtfsummary_tf(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'tf_summary.php';
     let data = { 
      'serchtxt': vdata.txtserach_send,
      'serchtxt1': vdata.txtserach1_send,
      'type_sql': 'readsend',
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  publishSomeData_tf(data: any) {
    this.fooSubject_tf.next(data);
  }

  getObservable_tf(): Subject<any> {
    return this.fooSubject_tf;
  }

}
  