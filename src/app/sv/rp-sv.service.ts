import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';


@Injectable({
  providedIn: 'root'
})
export class RpSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }

  getmtd_report(): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'mtd_report.php';
     let data = {
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }
}
 