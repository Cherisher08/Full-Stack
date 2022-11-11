import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postEmployee(data : any){
    return this.http.post<any>("http://localhost:3000/employeeList/",data);
  }
  getEmployee(){
    return this.http.get<any> ("http://localhost:3000/employeeList/");
  }
  deleteEmployee(id:number){
    return this.http.delete<any> ("http://localhost:3000/employeeList/"+id);
  }
  postNews(data : any){
    return this.http.post<any> ("http://localhost:3000/deptnewslist/",data);
  }
  getNews(){
    return this.http.get<any> ("http://localhost:3000/deptnewslist/");
  }
  postLeave(data : any){
    return this.http.post<any>("http://localhost:3000/Leave-Details/",data);
  }
  getLeave(){
    return this.http.get<any> ("http://localhost:3000/Leave-Details/");
  }
}
