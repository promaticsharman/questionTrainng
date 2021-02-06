
////////////////////////////////////////HTML///////////////////////////////////////////////////////////



<div class="main-content">
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header card-header-danger">
                      <h4 class="card-title">Edit Profile</h4>
                      <p class="card-category">Complete your profile</p>
                  </div>
                  <div class="card-body">
                      <form  [formGroup]="updateForm">
                          <div class="row">
                              <div class="col-md-3">
                                  <mat-form-field class="example-full-width">
                                    <input matInput formControlName="userName" [(ngModel)]="username" placeholder="Username">
                                  </mat-form-field>
                                     <div *ngIf="updateForm.controls['userName'].invalid && (updateForm.controls['userName'].dirty || updateForm.controls['userName'].touched)" class="text-danger">
                                        <small *ngIf="updateForm.controls['userName'].errors.required">
                                          User Name is required.
                                        </small>
                                     </div>
                              </div>
                              <div class="col-md-4">
                                  <mat-form-field class="example-full-width">
                                    <input matInput placeholder="Email address" [(ngModel)]="email" [class.is-invalid] ="Email.invalid && Email.touched" formControlName="email" type="email">
                                  </mat-form-field>
                                      <div *ngIf="(Email.invalid && Email.touched) || Email.dirty">
                                         <small *ngIf="Email.errors?.required" class="text-danger">email is required</small>
                                         <small *ngIf="Email.errors?.pattern" class="text-danger">Please provide a valid email address</small>
                                      </div>
                              </div>
                              <!-- <div class="col-md-4">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Password" [(ngModel)]="password" formControlName="password" type="password" >
                                </mat-form-field>
                                    <div *ngIf="updateForm.controls['password'].invalid &&
                                          (updateForm.controls['password'].dirty || updateForm.controls['password'].touched)" 
                                          class="text-danger">
                                       <small *ngIf="updateForm.controls['password'].errors.required">Password is required.</small>
                                       <small *ngIf="updateForm.controls['password'].errors.minlength">password must be at least 8 characters long.</small>
                                    </div>
                              </div> -->
                              <!-- <div class="col-md-4">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Confirm password" formControlName="confirmPassword" type="password" [ngClass]="{ 'is-invalid': submitted && f.confirmPassword.errors }"> 
                                </mat-form-field> -->

                                    <!-- <div *ngIf="updateForm.controls['confirmPassword'].invalid &&
                                       (updateForm.controls['confirmPassword'].dirty || updateForm.controls['confirmPassword'].touched)" 
                                       class="text-danger">
                                       <small *ngIf="updateForm.controls['confirmPassword'].errors.required">Confirm Password is required.</small>

                                       <small *ngIf="f.confirmPassword.errors.mustMatch">Passwords must match</small>
                                    </div> -->
                            <!-- </div> -->
                          </div>
                          <div class="row">
                              <div class="col-md-6">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="First Name" [(ngModel)]="firstname" formControlName="firstName" type="text">
                                </mat-form-field>
                                    <div *ngIf="updateForm.controls['firstName'].invalid && (updateForm.controls['firstName'].dirty || updateForm.controls['firstName'].touched)" class="text-danger">
                                       <small *ngIf="updateForm.controls['firstName'].errors.required">
                                          First Name is required.
                                       </small>
                                    </div>
                              </div>
                              <div class="col-md-6">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Last Name" [(ngModel)]="lastname" formControlName="lastName" type="text">
                                </mat-form-field>
                                    <div *ngIf="updateForm.controls['lastName'].invalid && (updateForm.controls['lastName'].dirty || updateForm.controls['lastName'].touched)" class="text-danger">
                                        <small *ngIf="updateForm.controls['lastName'].errors.required">
                                            Last Name is required.
                                        </small>
                                    </div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-12">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Address"  [(ngModel)]="address" formControlName="address"  type="text">
                                </mat-form-field>
                                   <div *ngIf="updateForm.controls['address'].invalid &&
                                       (updateForm.controls['address'].dirty || updateForm.controls['address'].touched)" 
                                       class="text-danger">
                                       <small *ngIf="updateForm.controls['address'].errors.required">Address code is required.</small>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-4">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="City" [(ngModel)]="city" formControlName="city" type="text">
                                </mat-form-field>
                                   <div *ngIf="updateForm.controls['city'].invalid &&
                                       (updateForm.controls['city'].dirty || updateForm.controls['city'].touched)" 
                                       class="text-danger">
                                       <small *ngIf="updateForm.controls['city'].errors.required">City is required.</small>
                                    </div>
                              </div>
                              <div class="col-md-4">
                                <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Country" [(ngModel)]="country" formControlName="country" type="text">
                                </mat-form-field>
                                     <div *ngIf="updateForm.controls['country'].invalid &&
                                       (updateForm.controls['country'].dirty || updateForm.controls['country'].touched)" 
                                       class="text-danger">
                                       <small *ngIf="updateForm.controls['country'].errors.required">Country is required.</small>
                                     </div>
                              </div>
                              <div class="col-md-4">
                                 <mat-form-field class="example-full-width">
                                  <input matInput placeholder="Postal Code" [(ngModel)]="postalcode" formControlName="postalCode" type="text">
                                 </mat-form-field>
                                    <div *ngIf="updateForm.controls['postalCode'].invalid &&
                                        (updateForm.controls['postalCode'].dirty || updateForm.controls['postalCode'].touched)" 
                                        class="text-danger">
                                      <small *ngIf="updateForm.controls['postalCode'].errors.required">Postal code is required.</small>
                                   </div>
                              </div>
                          </div>
                          <button mat-raised-button type="submit" class="btn btn-danger pull-right" (click)="update()">Update Profile</button>
                          <div class="clearfix"></div>
                      </form>
                  </div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="card card-profile">
                  <div class="card-avatar">
                    <span class="upload_66">
                      <i class="fa fa-edit"></i>
                      <input type="file" #uploadFile value="imageSrc"
                      (change)="onFileChange($event)" accept="image/*">
                    </span>
                  <a href="javascript:void(0)">
                    <!-- <input 
                    [(ngModel)]="profile_img"
                    id="file" 
                    type="file" 
                    accept="image/*"
                    class="form-control"
                    (change)="onFileChange($event)"> -->
                   
                      <img *ngIf="image" class="img-responsive" [src]="image" />
                   <img *ngIf="!image && imageSrc" class="img" src="{{img_url}}{{imageSrc}}"/>
                  </a>
                  </div>
                    <div class="card-body">
                      <h6 class="card-category text-gray">CEO / Co-Founder</h6>
                      <h4 class="card-title">{{username}}</h4>
                    </div>
              </div>
          </div>
      </div>
  </div>
</div>




//////////////////////////////////////////////////////ts/////////////////////////////////////////////////
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AdminService } from "../../shared/admin.service";
import { MustMatch } from "./../user-profile/must-match";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    imageSrc: string;
    username;
    email;
    firstname;
    lastname;
    address;
    password;
    city;
    country;
    postalcode;
    file;
    id;
    image
    img_url
    constructor(
      private fb: FormBuilder, private service: AdminService
      ) { }

    ngOnInit(): void {
      this.img_url = environment.profile_img
      this.service.getAdminProfileById().subscribe(data => {
        console.log("data: ",data)
        if(data){
        this.id=data.data[0]._id;
        this.username=data.data[0].name;
        this.email=data.data[0].email;
        this.firstname=data.data[0].first_name;
        this.lastname=data.data[0].last_name;
        this.address=data.data[0].address;
        this.city=data.data[0].city;
        this.country=data.data[0].country;
        this.postalcode=data.data[0].postal_code;
        this.imageSrc=data.data[0].profile_image;
        }
      })
    
    }
            updateForm =  this.fb.group({
            userName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            postalCode: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),


            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),

            ]))
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        
        get f() { return this.updateForm.controls; }
        //   console.log(f[lastname]);
         
        get Email() {
            return this.updateForm.get('email')
        }
       
        onFileChanged(event) {
          const file = event.target.files[0]
        }

        onFileChange(evt) {
          if (!evt.target) {
            return;
          }
          if (!evt.target.files) {
            return;
          }
          if (evt.target.files.length !== 1) {
            return;
          }
          const file = evt.target.files[0];
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
            // this.toastr.warning('Please upload image file')
            return;
          }
          console.log(evt.target.files[0])
          this.imageSrc = evt.target.files[0];
          const fr = new FileReader();
          fr.onloadend = (loadEvent) => {
            let mainImage = fr.result;
            this.image = mainImage;
          };
          fr.readAsDataURL(file);
      
          // if (event.target.files.length > 0) {
          //   const file = event.target.files[0];
          //   this.bannerData.image = file;
          //   console.log(file);
          // }
      
        }
       update(){
        // if (this.updateForm.valid){
        //     alert("thank you ! your form is submitted successfully")
        //     console.log(this.updateForm.value);
        //    }else{
        //    alert("please fill all the details")
        //    }
           var formData = new FormData();
           console.log(this.username);
           console.log(this.email);
           console.log(this.firstname);
           console.log(this.lastname);
           console.log(this.address);
          //  console.log(this.password);
           console.log(this.city);
           console.log(this.country);
           console.log(this.postalcode);
           console.log(this.imageSrc);
           console.log("User ID  : ",this.id)

           formData.append('id', this.id);
           formData.append('name', this.username);
           formData.append('email', this.email);
           formData.append('first_name', this.firstname);
           formData.append('last_name', this.lastname);
           formData.append('address', this.address);
          //  formData.append('password', this.password);
           formData.append('city', this.city);
           formData.append('country', this.country);
           formData.append('postal_code', this.postalcode);
           formData.append('profile_image', this.imageSrc);

 
           this.service.updateAdminProfile(formData).subscribe(data => {
            console.log("Data Successfully Updated!",data);
            Swal.fire('Success..!', 'Successfully Updated!', 'success')
          },err => {
            if(err.status >= 400){
              console.log('Invalid Credential!!!');
            }else{
              console.log('Internet Connection Error');
            }
          })
       }}
        
        
        
      ///////////////////////pipe must-match////////////////////////////////////////
      
      import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
