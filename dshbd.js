<div class="main-content">
  <div class="container-fluid">
       <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                  <div class="card-header card-header-warning card-header-icon">
                      <div class="card-icon">
                          <i class="material-icons">group</i>
                      </div>
                      <p class="card-category">Total Users</p>
                      <h3 class="card-title">{{TotalUser}}</h3>
                  </div>
                  <div class="card-footer">
                      <div class="stats">
                          <!-- <i class="material-icons text-danger">warning</i>
                          <a href="javascript:void(0)">Get More Space...</a> -->
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                  <div class="card-header card-header-success card-header-icon">
                      <div class="card-icon">
                          <i class="material-icons">monetization_on</i>
                      </div>
                      <p class="card-category">Total Earnings</p>
                      <h3 class="card-title">${{Earnings}}</h3>
                  </div>
                  <div class="card-footer">
                      <div class="stats">
                          <!-- <i class="material-icons">date_range</i> Last 24 Hours -->
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                  <div class="card-header card-header-danger card-header-icon">
                      <div class="card-icon">
                          <i class="material-icons">help</i>
                      </div>
                      <p class="card-category">Total Paid Questions</p>
                      <h3 class="card-title">{{paidQuestion}}</h3>
                  </div>
                  <div class="card-footer">
                      <div class="stats">
                          <!-- <i class="material-icons">local_offer</i> Tracked from Github -->
                      </div>
                  </div>
              </div>
          </div>
          <div class= "col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                  <div class="card-header card-header-info card-header-icon">
                      <div class="card-icon">
                          <i class="material-icons">help</i>
                      </div>
                      <p class="card-category">Total Free Questions</p>
                      <h3 class="card-title">{{freeQuestion}}</h3>
                  </div>
                  <div class="card-footer">
                      <div class="stats">
                          <!-- <i class="material-icons">update</i> Just Updated -->
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div class="row"> 
            <div class="col-lg-6">
              <div id="chartContainer" style="height: 370px; width: 100%;"></div>
            </div>
           <div class="col-lg-6">
              <div id="chartContainer1" style="height: 370px; width: 100%;"></div>
            </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-danger">
                    <h4 class="card-title ">Top Ten Users </h4>
                    <!-- <p class="card-category"> Here is a subtitle for this table</p> -->
                   
                    <!-- <mat-form-field>
                        <mat-label>Filter</mat-label>
                        <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Ex. Name">
                    </mat-form-field> -->
                    <!-- <button mat-raised-buttton color="primary" (click)="generateCSV()">CSV</button> -->
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table mat-table [dataSource]="dataSource" class="mat-table table mat-elevation-z1">
                            <!-- Position Column -->
                            <ng-container matColumnDef="sr.no" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell"> SRNO
                                </th>
                                <td mat-cell *matCellDef="let element; let i = index;"> {{i+1}} </td>
                            </ng-container>

                            <!-- Weight Column -->
                            <ng-container matColumnDef="first_name" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell">
                                    NAME
                                </th>
                                <td mat-cell *matCellDef="let element"> {{element.first_name}} </td>
                            </ng-container>

                            <ng-container matColumnDef="purchasedExam" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell">EXAM PURCHASED</th>
                                <td mat-cell *matCellDef="let element">
                                    <div style="list-style:unstyle; margin-top: 5px;" *ngFor="let purchase of element.puchasedPlan; let i=index;">
                                        <div *ngIf="purchase.exam_id">{{purchase.exam_id ? purchase.exam_id.examName : '--'}}</div>
                                    </div>
                                    <div *ngIf="element.puchasedPlan.length == 0">--</div>
                                </td>
                                <!-- <div *matCellDef="let element">
                                    <td mat-cell *ngFor="let purchase of element.puchasedPlan; let i=index;">{{purchase.exam_id.examName}}</td>
                                </div> -->
                            </ng-container>
                            <!-- element.puchasedPlan[0].exam_id.examName -->
                            <ng-container matColumnDef="email" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell"> EMAIL

                                </th>
                                <td mat-cell *matCellDef="let element"> {{element.email}} </td>
                            </ng-container>

                            <ng-container matColumnDef="mobile_number" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell"> PHONE NUMBER

                                </th>
                                <td mat-cell *matCellDef="let element"> {{element.mobile_number ? element.mobile_number : '--' }}</td>
                            </ng-container>

                            <ng-container matColumnDef="zipcode" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell">
                                    ZIP CODE
                                </th>
                                <td mat-cell *matCellDef="let element"> {{element.zipcode}} </td>
                            </ng-container>
                           
                            <ng-container matColumnDef="status" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell">STATUS</th>
                                <td mat-cell *matCellDef="let element">{{element.status }} </td>
                            </ng-container>
                            <!-- <ng-container matColumnDef="status" class="mat-row">
                                <th mat-header-cell *matHeaderCellDef   class="mat-header-cell"> STATUS
                                </th>
                                <td mat-cell *matCellDef="let element"> {{ element.verified  ? 'Verified' : 'Not verified' }} </td>
                            </ng-container> -->
                          
                            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                        </table>
                    </div>
                </div>
            </div>
          </div>  
        </div>
         
    </div>
</div>



*********************************************ts/**************************************************************************************



import { Component, OnInit, ViewChild  } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { AdminService } from "../../shared/admin.service";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Earnings
  TotalUser
  paidQuestion
  freeQuestion
  //
  dataSource
  responseData = []
  displayedColumns: string[] = ['sr.no']
  constructor(private service: AdminService,)
  {  
      // this.selection = new SelectionModel(true, []);
    this.dataSource = new MatTableDataSource(this.responseData);
  }
  
  ngOnInit() {
     this.earningTotal();
     this.totalRevChart();
     this.ActiveUser();
     this.dataSource = new MatTableDataSource(this.responseData);
     this.getAllUserList(10, 0);    
  }
    getAllUserList(limit, offset){
			this.service.userListing(limit, offset).subscribe(data => {
			  console.log("Get All User list : ",data)
			  if(data){
				// this.dataSource = data.data;
        this.dataSource = new MatTableDataSource(data.data);
        // this.dataSource.paginator = this.paginator;
				console.log("Datrda",this.dataSource);
				// console.log(this.dataSource[0],"fixxxrst name")
			  }
			}, err => {
				console.log(err);
				if(err.status >= 400){
				  console.log('Invalid Credential!!!');
				}else{
				  console.log('Internet Connection Error');
				}
			})
		  }
     earningTotal(){
      this.service.totalCount().subscribe( res => {
        var question=res.paidQuestionCount
       
        question.forEach(element => {
         
          if(element._id == "Free"){
             this.freeQuestion=element.paidQuestionCount
          }else if(element._id== "Paid"){
            this.paidQuestion=element.paidQuestionCount
          }
         
        });
        this.TotalUser=res.userCount
        var totalEarning=res.totalEarnings;
        
        totalEarning.forEach(element => {
          this.Earnings=element.earning
        });
        
      })
     }
      
     totalRevChart(){
      this.service.revenueGraph().subscribe(res => {
        // console.log("Revdata:",res) 
        // console.log("Revdata:", res) 
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let pointsData = [];
        res.forEach(element => {
          var yearData = new Date(element.createdAt);
         element.total
          let monthsData = {
            y:  element.total,
            label: months[element._id.month - 1 ] + ' ' + yearData.getFullYear()  
            // + ' ' + yearData.getFullYear() 
          }
          pointsData.push(monthsData);        
        });      
        pointsData.sort(function(a, b) {
          // return months.indexOf(a.label) - months.indexOf(b.label);
          
          a = a.label.split(" ");
          b = b.label.split(" ");
          // console.log('test', a);
          // console.log('tesss', b);
          if(a[1] > b[1]) {
            return -1
          } else {
              return months.indexOf(a[0]) - months.indexOf(b[0]);
          };
          let res = 0
          return res;
  
        });
        // console.log('pointsss', pointsData);
        
        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
              text: "Total Revenue"
            },
              axisY:{
              valueFormatString: "$##0",
            },
            data: [{
              type: "line",
              indexLabelFontSize: 16,
              dataPoints: pointsData
            }]
          });
          
          chart.render();
        })
    }


      ActiveUser(){
        this.service.userGraph().subscribe(res => {
          
           let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
           let countData = [];
           res.forEach(element => {
            var yearData = new Date(element.createdAt);
            let user={
              y: element.myCount,
              label: months[element._id.month-1] + ' ' + yearData.getFullYear() 
            }
            countData.push(user); 
           });
           countData.sort(function(a, b) {
            
            
            a = a.label.split(" ");
            b = b.label.split(" ");
            
            if(a[1] > b[1]) {
              return -1
            } else {
                return months.indexOf(a[0]) - months.indexOf(b[0]);
            };
            let res = 0
            return res;
    
          });
           let chart = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: true,
            theme: "light2",
            title: {
              text: "Monthly User"
            },
            data: [{
              type: "line",
              dataPoints: countData
             
            }]
          });
            
          chart.render();

        })
        
      }

}
  
**************************************************admin-layout*************************************************************************************************

import
