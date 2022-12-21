import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  PostId(data:any){
    return this.http.post("http://localhost:3000/singlevdata",data);
  }
  GetChartInfo(){
    return this.http.get("http://localhost:3000/chartdata");
  }
}
