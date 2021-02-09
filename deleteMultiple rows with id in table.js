                                  <ng-container matColumnDef="select">
                                    <th mat-header-cell *matHeaderCellDef>
                                        <mat-checkbox (change)="$event ? masterToggle() : null"
                                            [checked]="selection.hasValue() && isAllSelected()"
                                            [indeterminate]="selection.hasValue() && !isAllSelected()">
                                        </mat-checkbox>
                                    </th>
                                    <td mat-cell *matCellDef="let row">
                                        <mat-checkbox (click)="$event.stopPropagation()"
                                            (change)="$event ? selection.toggle(row) : null"
                                            [checked]="selection.isSelected(row)">
                                        </mat-checkbox>
                                    </td>
                                </ng-container>
                                
                                
                                
                                
                                
                                
                                import { Component, OnInit, ViewChild } from '@angular/core';

                          import { MatPaginator } from '@angular/material/paginator';
                          import { MatSort } from '@angular/material/sort';
                          import { MatTableDataSource } from '@angular/material/table';
                          import { Router } from '@angular/router';
                          import { SelectionModel } from '@angular/cdk/collections';
                          import { AdminService } from '../../../shared/admin.service';
                          import { environment } from "../../../environments/environment.prod";
                          import Swal from 'sweetalert2';
                          // import { Product } from './product';
                          export class Product {
                            id?: number;
                            checked?: boolean;
                            }
                          @Component({
                            selector: 'app-user-listing',
                            templateUrl: './user-listing.component.html',
                            styleUrls: ['./user-listing.component.css']
                          })
                          export class UserListingComponent implements OnInit {
                            products: Product[] = [];
                            // checked = false;
                            indeterminate = false;
                            labelPosition: 'before' | 'after' = 'after';
                            disabled = false;
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
                            displayedColumns: string[] = ['select', 'sr.no', 'first_name', 'purchasedExam'  ,'email','mobile_number','zipcode','status','action']
                            element_id
                            allReplacement = 54321
                            data = []
                            selectedUsers = []
                            selection
                            filter_by
                            puchasedPlan =[]
                            fileUrl
                              // products= [];
                            @ViewChild(MatSort, { static: true }) sort: MatSort;

                            @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
                            constructor(public adminService: AdminService, private router: Router) {
                              this.selection = new SelectionModel(true, []);
                              this.dataSource = new MatTableDataSource(this.responseData);
                               }

                               ngOnInit(): void {
                                 this.fileUrl = environment.csvFile + 'CSVFiles/'
                                this.reqData = {}
                                  this.reqData.offset = 0
                                  this.reqData.limit = 10
                                  this.dataSource = new MatTableDataSource(this.responseData);
                                  this.dataSource.paginator = this.paginator;
                                  this.dataSource.sort = this.sort;
                                  this.datamodel = {}
                                  this.getAllUserList(this.reqData.limit, this.reqData.offset)



                                }

                              //   checkAllCheckBox(ev) {
                              // 	this.products.forEach(x => x.checked = ev.target.checked)
                              // }

                              // isAllCheckBoxChecked() {
                              // 	return this.products.every(p => p.checked);
                              // }



                                ngAfterViewInit() {
                                this.dataSource.paginator = this.paginator
                              }

                              getAllUserList(limit, offset){
                                this.adminService.userListing(limit, offset).subscribe(data => {
                                  console.log("Get All User list : ",data)
                                  if(data){
                                  this.length = data.count
                                  // this.dataSource = data.data;
                                  this.dataSource = new MatTableDataSource(data.data);
                                  this.dataSource.paginator = this.paginator;
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

                                applyFilter(filterValue: string) {
                                // this.dataSource.filter = filterValue.trim().toLowerCase();
                                // this.filterValue = filterValue.trim().toLowerCase();
                                var obj = {
                                search: filterValue
                                }
                                if(obj.search){
                                  this.adminService.filterUserList(obj).subscribe(data => {
                                    console.log(data)
                                    if (data) {
                                    this.responseData = data.data
                                    this.dataSource = new MatTableDataSource(data.data);
                                    // this.length = data.data.count
                                    // this.dataSource.sort = this.sort;
                                    // this.dataSource.paginator = this.paginator;
                                    // this.tableData = data.data;
                                    // this.backUpTableData = data.data;
                                    }
                                    }, err => {
                                    console.log(err)
                                    if (err.status >= 400) {
                                    // this.toastr.error('Internal Error', 'Error')
                                    console.log('Invalid Credential!!!')
                                    } else {
                                    // this.toastr.error('Internet Connection Error', 'Error')
                                    console.log('Internet Connection Error')
                                    }

                                    })
                                }else{
                                  this.ngOnInit();
                                }

                                }


                            getPageSizeOptions() {
                              return [10, 20, 30];
                            }

                            paginationOptionChange(evt) {
                              console.log(evt)
                              this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
                              this.reqData.limit = evt.pageSize
                              console.log('ffafdfd985df9d9dfdf569df5dadfs9a9dsf',this.reqData)
                              this.adminService.userListing(this.reqData.limit, this.reqData.offset).subscribe(data => {
                                console.log(data)
                                if (data) {
                                  this.responseData = data.data
                                  this.length = data.count
                                  this.dataSource = new MatTableDataSource(data.data);
                                  this.dataSource.sort = this.sort;
                                  console.log(this.dataSource)
                                  if (this.filterValue) {
                                    this.dataSource.filter = this.filterValue
                                  }
                                }
                              }, err => {
                                console.log(err)
                                if (err.status >= 400) {
                                  // this.toastr.error('Internal Error', 'Error')
                                } else {
                                  // this.toastr.error('Internet Connection Error', 'Error')
                                  console.log('Internet Connection Error')
                                }
                              })
                            }

                            isAllSelected() {
                              const numSelected = this.selection.selected.length;
                              // console.log("numSelected",numSelected)
                              const numRows = this.dataSource.data.length;
                              // console.log("numRows",numRows)
                              // console.log('selection 2122',this.selection)
                              return numSelected === numRows;

                            }

                            masterToggle() {
                              // console.log('isAllselected',this.isAllSelected())
                              // console.log('selected deleted :',this.selection)
                              this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));

                              // if(this.isAllSelected()) {
                              // 	this.selection.clear() 
                              // }else{
                              // 	this.dataSource.data.forEach(row => this.selection.select(row))
                              // }
                            }

                            deleteSelected(){

                              // console.log('isAllselected',this.isAllSelected())
                              // console.log('datasource',this.dataSource.data)
                              let ids=[]
                              if(this.isAllSelected() == true) {
                                this.dataSource.data.forEach(row =>{
                                  // this.selection.select(row)
                                  console.log("multiple id",row.id)
                                  let deleteid=row.id
                                  ids.push(deleteid)
                                  console.log('Array of all ids',ids)
                                } )

                                }
                                else{
                                  let singleid=this.selection.selected
                                  let aId=[]
                                  // console.log('selection 2122',singleid)
                                  singleid.forEach(element => {
                                    let sId=element.id
                                    aId.push(sId)
                                    console.log("array of selected single ids:",aId)
                                  });
                                  // this.selection.clear() 
                                }
                               }
                            // approveUser(element) {
                            // 	var data = {
                            // 		id: element.id,
                            // 		approval: element.admin_approval == 'yes' ? 'no' : 'yes'
                            // 	}
                            // 	this.AdminService.approveUser(data).subscribe(data => {
                            // 		console.log(data)
                            // 		if (data) {
                            // 			// this.toastr.success("Sucessfully deleted", 'Success')
                            // 			this.getUserListing(this.reqData.limit, this.reqData.offset)
                            // 		}
                            // 	}, err => {
                            // 		console.log(err)
                            // 		if (err.status >= 400) {
                            // 			// this.toastr.error('Internal Error', 'Error')
                            // 			console.log('Invalid Credential!!!')
                            // 		} else {
                            // 			// this.toastr.error('Internet Connection Error', 'Error')
                            // 			console.log('Internet Connection Error')
                            // 		}

                            // 	})

                            // }

                            deleteUser(id){
                              console.log(id,"delete user Idd")
                              Swal.fire({
                               title: 'Are you sure want to remove?',
                               text: 'You will not be able to recover this User!',
                               icon: 'warning',
                               showCancelButton: true,
                               confirmButtonText: 'Yes, delete it!',
                               cancelButtonText: 'No, keep it'
                               }).then((result) => {
                               if (result.value) {
                                 this.adminService.deleteUserList(id).subscribe(data => {
                                   console.log(data);
                                   Swal.fire(
                                     'Deleted!',
                                     'This User has been deleted.',
                                     'success'
                                   )
                                   this.ngOnInit();
                             });
                               } else if (result.dismiss === Swal.DismissReason.cancel) {
                                 Swal.fire(
                                 'Cancelled',
                                 'This User is safe :)',
                                 'error'
                                 )
                               }
                               })
                            }

                            generateCSV(){
                              this.adminService.generateCSV().subscribe(x => {
                                console.log("Download File: ",x)
                                window.open(this.fileUrl+ x.fileName);
                              }, err => {
                                console.log(err)
                                if (err.status >= 400) {
                                  // this.toastr.error('Internal Error', 'Error')
                                } else {
                                  // this.toastr.error('Internet Connection Error', 'Error')
                                  console.log('Internet Connection Error')
                                }
                              })
                            }

                          }
