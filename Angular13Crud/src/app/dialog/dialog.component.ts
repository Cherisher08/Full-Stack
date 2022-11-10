import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productionForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) {

   }

  ngOnInit(): void {
    this.productionForm = this.formBuilder.group({
      employeeID :  ['',Validators.required],
      salary : ['',Validators.required],
      department : ['',Validators.required]
    })
  }
  addEmployee(){
    if(this.productionForm.value){
      this.api.postEmployee(this.productionForm.value).subscribe({
        next:(res)=>{
          alert("Employee added successfully");
          this.productionForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while creating the Employee!")
        }
      })
    }
  }
}
