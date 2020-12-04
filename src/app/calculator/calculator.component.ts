import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Button } from 'protractor';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  marksForm: FormGroup;
  averageTotal:any
  percenttotal
  english
  constructor(
    private router: Router,
    private fb: FormBuilder,
    ) {  this.createForm();}
  createForm() {
    this.marksForm = this.fb.group({
       English: ['', [Validators.required]],
       Math: ['', [Validators.required]],
       Science: ['', [Validators.required]],
       Physical: ['', [Validators.required]],
       percentage:[''],
       average:[''],
    })
  }
  // get English() { return this.marksForm.get('English'); }
  // get Math() { return this.marksForm.get('Math'); }
  // get Science() { return this.marksForm.get('Science'); }
  // get Physical() { return this.marksForm.get('Physical'); }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  Percentage(){
    // const values = {
    //   English : this.English.value,
    //   Math : this. Math.value,
    //   Science : this.Science.value,
    //   Physical : this. Physical.value,
    // };
    this.english = this.marksForm.value.English
    this.percenttotal=(parseInt(this.marksForm.value.English)+parseInt(this.marksForm.value.Math)+
    parseInt(this.marksForm.value.Science)+parseInt(this.marksForm.value.Physical))/400*100;
    // this.router.navigate(['/percentage']);
    console.log(this.percenttotal);
  }
  Average(){
    this.averageTotal=(parseInt(this.marksForm.value.English)+parseInt(this.marksForm.value.Math)+
    parseInt(this.marksForm.value.Science)+parseInt(this.marksForm.value.Physical))/4;
    console.log(this.averageTotal);
  }
  submit(){
  // if(this.marksForm.value.percentage){
  //   this.router.navigate(['/percentage'])
  // }else if(this.marksForm.value.average){
  //   this.router.navigate(['average'])
  // }else{
  //   this.router.navigate(['calculator'])
  // }
 
  }

  ngOnInit(): void {
  }

}
