import { Component,OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { LeaveComponent } from './leave/leave.component';
import { DeptnewsComponent } from './deptnews/deptnews.component';
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
  displayedColumns: string[] = ['employeeID', 'department', 'salary','Others', 'Action'];
  dataSource!: MatTableDataSource<any>;
  public news = [];
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  row: any;
  constructor(private dialog : MatDialog, private api : ApiService ){

  }
  ngOnInit(): void {
    this.getAllNews();
    this.getAllEmployees();
  }
  openDialog () {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
  editdeptnews (row : any) {
    this.dialog.open(DeptnewsComponent, {
      width:'30%',
      data : row
    });
  }
  getAllNews(){
    this.api.getNews()
    .subscribe({
      next : (res) =>{
        this.news = res;
      },
      error : (err) =>{
        alert("Error");
      }
    })
  }
  getAllEmployees(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        alert("Error while fetching the records");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
    this.api.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully");
        this.getAllEmployees();
      },
      error:(err)=>{
        alert("Error in deletion.");
      }
    })
  }


  openLeave () {
    this.dialog.open(LeaveComponent, {
      width:'30%'
    });
  }



  }



