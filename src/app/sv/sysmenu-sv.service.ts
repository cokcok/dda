import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class SysmenuSvService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  getsysmenu(padding: number, limit: number = 9999999999): Observable<data> {
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

  crudsysmenu(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysmenu.php';
    //console.log(vdata);
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
        'title': vdata.title,
        'url': vdata.url,
        'svg': vdata.svg,
        'seq': vdata.seq,
        'submenu_flg': vdata.submenu,
        'group_name': vdata.group_name,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getsyssubmenu(padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syssubmenu.php';
    let data;
    data = {
      'padding': padding,
      'limit': limit,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudsyssubmenu(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syssubmenu.php';
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
        'title': vdata.title,
        'url': vdata.url,
        'svg': vdata.svg,
        'seq': vdata.seq,
        'open': vdata.open,
        'sys_menu_id': vdata.sys_menu_id.id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    //console.log(data);
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  getsysgroup(padding: number, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroup.php';
    let data;
    data = {
      'padding': padding,
      'limit': limit,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudsysgroup(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroup.php';
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
        'group_name': vdata.group_name,
        'description': vdata.description,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    //console.log(data);
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getsyssubmenu_sysgroupmenu(padding: number, group_id:number, typesql:string, limit: number = 9999999999): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroupmenu.php';
    let data;
    data = {
      'group_id':group_id,
      'padding': padding,
      'limit': limit,
      'type_sql': typesql
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudsyssubmenu_sysgroupmenu(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroupmenu.php';
    let data;
    if (type === 'delete') {
      data = {
        'id': vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    else {
      data = {
        'group_id':vdata.group_id,
        'submenu': vdata.syssubmenu_id,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }
    //console.log(data);
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }


  getpublicize(): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syspublicize.php';
    let data;
    data = {
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudpublicize(vdata: any, type: string): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syspublicize.php';
    let data;
      data = {
        'name':vdata,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }



}



