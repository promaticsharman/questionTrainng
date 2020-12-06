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
  math
  science
  physical

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
       selectedValue: 'default'
      //  percentage:[''],
      //  average:[''],
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
  onChange (event) {
    console.log(event.target.value)
    if(event.target.value === 'percentage') {
      this.Percentage()
    } else if(event.target.value === 'average') {
      this.Average()
    }
  }
  Percentage(){
    // const values = {
    //   English : this.English.value,
    //   Math : this. Math.value,
    //   Science : this.Science.value,
    //   Physical : this. Physical.value,
    // };
    this.english = this.marksForm.value.English
    this.math = this.marksForm.value.Math
    this.science = this.marksForm.value.Science
    this.physical = this.marksForm.value.Physical
    this.percenttotal=(parseInt(this.marksForm.value.English)+parseInt(this.marksForm.value.Math)+
    parseInt(this.marksForm.value.Science)+parseInt(this.marksForm.value.Physical))/400*100;
    // this.router.navigate(['/percentage']);
    this.percenttotal = Math.round(this.percenttotal)
    console.log(this.percenttotal);
  }
  Average(){
    this.english = this.marksForm.value.English
    this.math = this.marksForm.value.Math
    this.science = this.marksForm.value.Science
    this.physical = this.marksForm.value.Physical
    this.averageTotal=(parseInt(this.marksForm.value.English)+parseInt(this.marksForm.value.Math)+
    parseInt(this.marksForm.value.Science)+parseInt(this.marksForm.value.Physical))/4;
    console.log(this.averageTotal);
  }
  submit(){
    console.log(this.marksForm.value)
    let markDetails = {
      math: this.marksForm.value.Math,
      science: this.marksForm.value.Science,
      physical: this.marksForm.value.Physical,
      english: this.marksForm.value.English,
      percent: 0,
      average: 0
    }
    if(this.percenttotal > 0) {
      markDetails.percent = this.percenttotal
    }
    if(this.averageTotal > 0) {
      markDetails.average = this.averageTotal
    } 
    if(this.marksForm.value.selectedValue === 'percentage'){
      this.router.navigate(['/percentage', markDetails])
    }else if(this.marksForm.value.selectedValue === 'average'){
      this.router.navigate(['average'])
    }else{
      this.router.navigate(['calculator'])
    }
 
  }

  ngOnInit(): void {
  }

}
