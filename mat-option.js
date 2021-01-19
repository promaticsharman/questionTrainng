ts file

id(id){
    
    this.statusId=id
    console.log('ids',this.statusId)
  }
  onStatus(change,id){
    this.statusType=change
    console.log("change",this.statusType)
    var obj={
      banner_id:this.statusId,
      status:this.statusType
    }
    this.service.bannerActiveAndInactive(obj).subscribe(res=>{
      this.toastr.success("Status changed successfully");
      console.log(res)
    })
  }
  
  
html

<mat-form-field appearance="fill">
                                <mat-label>{{element.status}}</mat-label>
                                <select (change)="onStatus($event.target.value, element.id)" matNativeControl required>
                                  <option value="active" >Active</option>
                                  <option value="inactive" >Inactive</option>
                                  <!-- (click)="id(element.id)" -->
                                 
                                </select>
                              </mat-form-field>
  
  
  
