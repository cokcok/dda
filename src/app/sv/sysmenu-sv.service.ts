import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {data} from '../models/data_model';
import {FeedBack} from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class SysmenuSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  getsysmenu(padding: number, limit: number): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysmenu.php';
    let data;
    data = {
      'padding': padding,
      'limit': limit,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
    }

    crudsysmenu(vdata:any,type:string): Observable<FeedBack> {
      const header = { 'Content-Type': 'application/json' };
      const apiUrl = this.configSv.ip + 'sysmenu.php';
      //console.log(vdata);
       let data;
       data = {
        'title': vdata.title,
        'url': vdata.url,
        'svg': vdata.svg,
        'seq': vdata.seq,
        'submenu_flg': vdata.submenu,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }  
      return this.http.post<FeedBack>(apiUrl, data, { headers: header });
      }
}
