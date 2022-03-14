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


  searchdata_rp01(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'rp01.php';
     let data = { 
      'rp_type': vdata.rp_type,
      'rp_type1': vdata.rp_type1,
      'txtdate': vdata.txtdate,
      'txtdate1': vdata.txtdate1,
      'txtmonth': vdata.txtmonth,
      'txtmonth1': vdata.txtmonth1,
      'txtyear': vdata.txtyear,
      'txtyear1': vdata.txtyear1,
      
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  searchdata_rp02(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'rp02.php';
     let data = { 
      'rp_typeday': vdata.rp_typeday,
      'rp_typesend': vdata.rp_typesend,
      'rp_type': vdata.rp_type,
      'txtdate': vdata.txtdate,
      'txtdate1': vdata.txtdate1,
      'txtmonth': vdata.txtmonth,
      'txtmonth1': vdata.txtmonth1,
      'txtyear': vdata.txtyear,
      'txtyear1': vdata.txtyear1,
      
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  searchdata_rp03(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'rp03.php';
     let data = { 
      'rp_type': vdata.rp_type,
      'rp_typeday': vdata.rp_typeday,
      'txtdate': vdata.txtdate,
      'txtdate1': vdata.txtdate1,
      'txtmonth': vdata.txtmonth,
      'txtmonth1': vdata.txtmonth1,
      'txtyear': vdata.txtyear,
      'txtyear1': vdata.txtyear1,
      
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


}
 