import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class MtdSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }

  getmtd(page:string,padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl;
    if(page === 'mtd01'){
       apiUrl = this.configSv.ip + 'mtd01.php';
    }

     let data = {
      'padding': padding,
      'limit': limit,
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



}
 