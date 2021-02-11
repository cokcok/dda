import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
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

  getnumber(type,numberarray): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'po_getproduct.php';
     let data = {
      'type_sql': type,
      'tmp_number':numberarray,
    }
    console.log(data);
    return this.http.post<data>(apiUrl, data, { headers: header });
  }
}
  