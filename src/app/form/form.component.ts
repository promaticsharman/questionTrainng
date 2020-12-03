import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // IsChecked:boolean;
  minDate = new Date(2002, 0, 1);
  maxDate = new Date(2060, 0, 1);
  signupForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.fb.group({
       firstName: ['', Validators.required ],
       lastName: ['', Validators.required ],
       mobile: ['', Validators.required ,Validators.pattern("0-9")],
       course: ['', Validators.required ], 
       gender: ['', Validators.required ],
       email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
       dob: ['',[Validators.required ]],
       age: ['', [Validators.required,Validators.min(18)]]
      
      });

    }

    submitForm(){
      if(this.signupForm.invalid){
        alert("please fill all the details");
      }else{
        console.log(this.signupForm.value);
      }

  }
 
  get Email(){
    return this.signupForm.get('email')
    } 


  ngOnInit(): void {
  


  }

}
