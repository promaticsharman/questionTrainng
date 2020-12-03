import { AuthenticationGuard } from './authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { QuestionComponent } from './question/question.component';
import { AuthguardService } from './authguard.service';
const routes: Routes = [
{path:'',redirectTo:"/login",pathMatch:'full'},
{ path: 'signup', component: FormComponent},
{ path: 'question', component: QuestionComponent},
{ path: 'login', component: LoginComponent},
{ path: 'home', component:DashboardComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
