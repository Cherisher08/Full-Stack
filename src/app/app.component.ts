import { Component , ElementRef,ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent{
  title = 'TAPproj';
  user:any;
  loggedIn:any;
  breakpoint !: number;
  id!: number;

  constructor(private dialog : MatDialog, private _formBuilder: FormBuilder, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
      this.breakpoint = (window.innerWidth < 500) ? 1: (window.innerWidth <650) ? 2 : (window.innerWidth < 800) ? 3 : 4;
  }

  handleSize(event : any){
    this.breakpoint = (event.target.innerWidth < 500) ? 1: (event.target.innerWidth <650) ? 2 : (event.target.innerWidth < 800) ? 3 : 4;
  }

  callDialog(cid:number){
    this.id=cid;
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
        width:'80%',
        height: '80%'
    });
  }

  public signOut():void{
    this.authService.signOut();
  }
}
