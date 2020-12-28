import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { webServiceService } from '../../shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WebServiceService } from '../shared/web-service.service';
@Component({
  selector: 'app-request-credits',
  templateUrl: './request-credits.component.html',
  styleUrls: ['./request-credits.component.scss']
})
export class RequestCreditsComponent implements OnInit {
  tableData
  backUpTableData
  showLoader
  reqData
  getData
  dataSource
  datamodel
  length
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  filterValue
  responseData = []
  displayedColumns: string[] = ['name', 'email', 'phone','requested_credits']
  element_id
  allReplacement = 54321
  data = []
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

 

  constructor(
    private webServiceService: WebServiceService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.reqData = {}
    this.reqData.offset = 0
    this.reqData.limit = 100
    this.dataSource = new MatTableDataSource(this.responseData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
		this.datamodel = {}
    this.getUserCreditRequest()
  }
  getUserCreditRequest() {
    this.webServiceService.getCreditRequest().subscribe(response => {
      console.log("credit daataa", response.data.data)
      if (response) {
        this.responseData = response.data.data
        let userData = []
        this.responseData.forEach(element => {
          console.log('element', element.user_id);
          let user = element.user_id
          let userDetails = {
              name: user.first_name + ' ' + user.last_name,
              phone: user.mobile_number,
              email: user.email,
              requested_credits: user.credits,
              id: user.id,
              action: ''
          }
          userData.push(userDetails);
        });
        console.log('userdeayislssss', userData);
        this.dataSource = new MatTableDataSource(userData);
        this.length = response.data.data.length;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.tableData = data.docs;
        // this.backUpTableData = data.docs;
      }
    }, err => {
      console.log(err)
      if (err.status >= 400) {
        if(err.status == 401){
        // this.router.navigate(['/login']);

        }
        this.toastr.error('Internal Error', 'Error')
        console.log('Invalid Credential!!!')
      } else {
        this.toastr.error('Internet Connection Error', 'Error')
        console.log('Internet Connection Error')
      }

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValue = filterValue.trim().toLowerCase();
  }

  getPageSizeOptions() {
    return [5, 10, 20, 30];
  }

  // paginationOptionChange(evt) {
  //   console.log(evt)
  //   this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
  //   this.reqData.limit = evt.pageSize
  //   console.log(this.reqData)
  //   this.webServiceService.getTopicListing(this.reqData.limit, this.reqData.offset).subscribe(data => {
  //     console.log(data)
  //     if (data) {
  //       this.length = data.totalDocs
  //       this.dataSource = new MatTableDataSource(data.docs);
  //       this.dataSource.sort = this.sort;
  //       console.log(this.dataSource)
  //       if (this.filterValue) {
  //         this.dataSource.filter = this.filterValue
  //       }
  //     }
  //   }, err => {
  //     console.log(err)
  //     if (err.status >= 400) {
  //       this.toastr.error('Internal Error', 'Error')
  //       console.log('Invalid Credential!!!')
  //     } else {
  //       this.toastr.error('Internet Connection Error', 'Error')
  //       console.log('Internet Connection Error')
  //     }
  //   })
  // }

  // edit(_id){
  //     this.router.navigate(['/edit-topic/'+_id])

  // }


  // delete(ele){
  //     Swal.fire({
  //         title: 'Are you sure?',
  //         text: 'You will not be able to recover this imaginary file!',
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, delete it!',
  //         cancelButtonText: 'No, keep it'
  //       }).then((result) => {
  //         if (result.value) {
  //             this.webServiceService.deleteTopic(ele._id).subscribe(data => {
  //                console.log(data)

  //               this.toastr.success('Topic deleted successfully', 'Success')
  //           //    this.complexForm.reset();
  //               this.ngOnInit()
  //                // if (data) {
  //                //   this.toastr.success('Subscription added successfully', 'Success')
  //                //   this.complexForm.reset();
  //                //   this.ngOnInit()
  //                // }
  //              }, err => {
  //                console.log(err)
  //                if (err.status >= 400) {
  //                  this.toastr.error('Internal Error', 'Error')
  //                  console.log('Invalid Credential!!!')
  //                } else {
  //                  this.toastr.error('Internet Connection Error', 'Error')
  //                  console.log('Internet Connection Error')
  //                }

  //              })

  //         // For more information about handling dismissals please visit
  //         // https://sweetalert2.github.io/#handling-dismissals
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {

  //         }
  //   })

  // }

}





HTML FILE



<p>request-credits works!</p>
<div class="page-wrapper">
    <!-- header index -->
    <app-db-header></app-db-header>
    <!-- header index -->

    <div class="home_page_wrapper dashboard_wrapper">
        <section class="db_sec_comon prof_sec">
            <div class="custom_container">
                <div class="wrap_dash_sec subs_plans_page">
                    <!-- page classes -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="sidebar_wrap card_shd">
                                <!--  -->
                                <app-db-sidebar></app-db-sidebar>
                                <!--  -->
                            </div>
                        </div>
                        <div class="card-body">
                            <h2 class="card_head">Topic List </h2>
                            <mat-divider></mat-divider>
                
                            <div class="table_db_indi">
                                <mat-form-field>
                                    <mat-label>Filter</mat-label>
                                    <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Ex. Name">
                                </mat-form-field>
                
                                <div class="onl_tabl">
                                    <table mat-table [dataSource]="dataSource" matSort class="mat-table table mat-elevation-z1">
                
                                        <!--- Note that these columns can be defined in any order.
                                          The actual rendered columns are set as a property on the row definition" -->
                
                                        <!-- Position Column -->
                                        <ng-container matColumnDef="name" class="mat-row">
                                            <th mat-header-cell *matHeaderCellDef mat-sort-header class="mat-header-cell"> NAME </th>
                                            <td mat-cell *matCellDef="let element"> {{element.name}} </td>
                                        </ng-container>
                
                                        <!-- Name Column -->
                                        <ng-container matColumnDef="email" class="mat-row">
                                            <th mat-header-cell *matHeaderCellDef mat-sort-header class="mat-header-cell">EMAIL
                                            </th>
                                            <td mat-cell *matCellDef="let element"> {{element.email}} </td>
                                        </ng-container>
                
                                        <!-- Weight Column -->
                                        <ng-container matColumnDef="phone" class="mat-row">
                                            <th mat-header-cell *matHeaderCellDef mat-sort-header class="mat-header-cell"> PHONE
                                            </th>
                                            <td mat-cell *matCellDef="let element"> {{element.phone}} </td>
                                        </ng-container>

                                        <ng-container matColumnDef="requested_credits" class="mat-row">
                                            <th mat-header-cell *matHeaderCellDef mat-sort-header class="mat-header-cell"> REQUESTED CREDITS
                                            </th>
                                            <td mat-cell *matCellDef="let element"> {{element.requested_credits}} </td>
                                        </ng-container>
                
                                        <!-- <ng-container matColumnDef="action" class="mat-row">
                                            <th mat-header-cell *matHeaderCellDef mat-sort-header class="mat-header-cell"> ACTION </th> -->
                                            <!-- <td class="mat-cell act_td" mat-cell *matCellDef="let element">
                                                <button mat-icon-button [matMenuTriggerFor]="menu"
                                                    aria-label="Example icon-button with a menu">
                                                    <mat-icon>more_vert</mat-icon>
                                                </button>
                                                <mat-menu #menu="matMenu">
                                                    <button mat-menu-item>
                                                        <mat-icon>edit</mat-icon>
                                                        <span>Edit</span>
                                                    </button>
                                                    <button mat-menu-item>
                                                        <mat-icon>delete</mat-icon>
                                                        <span>Delete</span>
                                                    </button>
                                                </mat-menu>
                                            </td> -->
                                        <!-- </ng-container> -->
                                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                                    </table>
                                    <!-- <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator> -->
                                  
                                </div>
                            </div>
                            <!-- table start -->
                
                        </div>
                        

                    </div>
                </div>
            </div>
        </section>

        <!-- Footer section -->
        <app-footer></app-footer>
        <!-- Footer section -->
    </div>
</div>
