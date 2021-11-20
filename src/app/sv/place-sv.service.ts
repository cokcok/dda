import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ConfigService } from './config.service';
import {Observable, of,Subscription} from 'rxjs';
//import {AutoCompleteService} from 'ionic4-auto-complete';
import { MtdSvService } from '../sv/mtd-sv.service';
import { data } from '../models/data_model';
import { FeedBack } from './../models/feedback';
@Injectable({
  providedIn: 'root'
}) 
export class PlaceSvService {
  sub: Subscription;
  place = [];
  labelAttribute ='description';
  constructor(private http:HttpClient, public mtdSv: MtdSvService, private configSv: ConfigService) { 
    this.loadPlace();

  }

  loadPlace(){
    this.sub = this.mtdSv
    .getplace()
    .subscribe((dataplace) => {
      if (dataplace !== null) {
        dataplace.forEach((value, index) => {
            this.place.push({
              id: index,
              description:   value.district + ' '+ value.amphoe + ' ' + value.province + ' ' + value.zipcode ,
              zipcode: value.zipcode,
              amphoe: value.amphoe,
              district: value.district,
              province: value.province
            })
          })
      }
    });
  }

  protected getResults(keyword) {
    keyword = keyword.toLowerCase();
    return this.place.filter(
      (object) => {
        const value = object[this.labelAttribute].toLowerCase();
        return value.includes(keyword);
      }
    );
  }

  getcompany(): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd_company.php';

     let data = {
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getmtdsupply(padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd_supply.php';;
     let data = {
      'padding': padding,
      'limit': limit,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudcompany(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_company.php';
    //console.log(vdata);
    let data;
      data = {
        'id': vdata.id,
        'company_name': vdata.company_name,
        'company_address': vdata.company_address,
        'company_place': vdata.company_place,
        'company_taxid': vdata.company_taxid,
        'company_email': vdata.company_email,
        'company_website': vdata.company_website,
        'company_fb': vdata.company_fb,
        'company_line': vdata.company_line,
        'company_ig': vdata.company_ig,
        'company_twitter': vdata.company_twitter,
        'company_tel': vdata.company_tel,
        'company_fax': vdata.company_fax,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  crudsupply(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_supply.php';
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
        'supply_name': vdata.supply_name,
        'supply_address': vdata.supply_address,
        'supply_place': vdata.supply_place,
        'supply_taxid': vdata.supply_taxid,
        'supply_email': vdata.supply_email,
        'supply_tel': vdata.supply_tel,
        'supply_fax': vdata.supply_fax,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }

    
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

}
