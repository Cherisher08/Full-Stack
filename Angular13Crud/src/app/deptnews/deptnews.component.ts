import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-deptnews',
  templateUrl: './deptnews.component.html',
  styleUrls: ['./deptnews.component.scss']
})
export class DeptnewsComponent implements OnInit {
  newsForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
      @Inject(MAT_DIALOG_DATA) public editNews : any,
     private dialogRef : MatDialogRef<DeptnewsComponent>) {

   }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title :  ['',Validators.required],
      sub_title : ['',Validators.required],
      link : ['',Validators.required],
      body : ['',Validators.required]
    });
    console.log(this.newsForm);
  }
  addNews(){
    if(this.newsForm.valid){
      this.api.postNews(this.newsForm.value)
      .subscribe({
        next : (res) =>{
          alert("News added Successfully");
          this.newsForm.reset();
          this.dialogRef.close('save');
        },
        error : (err) => {
          alert("Error in adding news");
        }
      })
    }
  }

}
