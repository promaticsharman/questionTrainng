import { AuthguardService } from './authguard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { QuestionComponent } from './question/question.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    QuestionComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule, 

  ],
  providers: [
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
