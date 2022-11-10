import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Employee Management Portal';
  displayedColumns: string[] = ['employeeID', 'department', 'salary'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api : ApiService ){

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  openDialog () {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
  getAllEmployees(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error: (err)=>{
        alert("Error while fetching the records");
      }
    })
  }
}
