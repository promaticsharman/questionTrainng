import { AverageComponent } from './average/average.component';
import { PercentageComponent } from './percentage/percentage.component';
import { CalculatorComponent } from './calculator/calculator.component';
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
{ path: 'percentage/:percent/:english/:math/:science/:physical', component: PercentageComponent},
{ path: 'average/:percent', component: AverageComponent},
{ path: 'question', component: QuestionComponent},
{ path: 'login', component: LoginComponent},
{ path: 'calculator', component: CalculatorComponent},
{ path: 'home', component:DashboardComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
