<div class="main-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <form>
                    <div class="card ">
                        <div class="card-header card-header-danger">
                            <h4 class="card-title">Cart</h4>
                        </div>

                        <div class="card-body block-card custom_style">
                            <div class="row">
                                
                                <!-- <div class="row"> -->
                                    <div class="col-md-12">
                                        <mat-form-field class="example-full-width">
                                            <input matInput [(ngModel)]="firstHeading" placeholder="Heading ">
                                        </mat-form-field>
                                    </div>
                                <!-- </div> -->
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="editor_txtr">
                                            <label>First Description</label>
                                            <editor [init]="{
                                                height: 300,
                                                menubar: false,
                                                plugins: [
                                                  'advlist autolink lists link textcolor image charmap print preview anchor',
                                                  'searchreplace visualblocks code fullscreen',
                                                  'insertdatetime media table paste code help wordcount',
                                                  'table'
                                                ],
                                                toolbar:
                                                  'undo redo | formatselect | forecolor | table | bold italic backcolor | \
                                                  alignleft aligncenter alignright alignjustify | \
                                                  bullist numlist outdent indent | removeformat | help'
                                                }" [(ngModel)]="firstDescription" [ngModelOptions]="{standalone: true}"> 
                                            </editor>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <mat-form-field class="example-full-width">
                                            <input matInput placeholder="Second Heading" [(ngModel)]="secondHeading" [ngModelOptions]="{standalone: true}">
                                        </mat-form-field>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="editor_txtr">
                                            <label>Second Description</label>
                                            <editor [init]="{
                                                height: 300,
                                                menubar: false,
                                                plugins: [
                                                  'advlist autolink lists link textcolor image charmap print preview anchor',
                                                  'searchreplace visualblocks code fullscreen',
                                                  'insertdatetime media table paste code help wordcount',
                                                  'table'
                                                ],
                                                toolbar:
                                                  'undo redo | formatselect | forecolor | table | bold italic backcolor | \
                                                  alignleft aligncenter alignright alignjustify | \
                                                  bullist numlist outdent indent | removeformat | help'
                                                }" [(ngModel)]="secondDescription" [ngModelOptions]="{standalone: true}"> 
                                            </editor>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <mat-form-field class="example-full-width">
                                            <input matInput placeholder="Sidebar Heading" [(ngModel)]="sidebarHeading" [ngModelOptions]="{standalone: true}">
                                        </mat-form-field>
                                    </div>
                                </div>

                                <div class="form-group col-md-12">
                                    <label>Feature</label>
                                    <div class="col-md-12" *ngFor="let fea of feature; let i = index; trackBy:trackByFn;">
                                        <mat-form-field class="example-full-width" appearance="fill">
                                            <input matInput placeholder="Features" [(ngModel)]="features[i]" [ngModelOptions]="{standalone: true}">
                                        </mat-form-field>    
                                    </div>
                                    <div class="col-md-2">
                                        <button mat-raised-button color="primary" (click)="addFeatures(i)">Add More Features</button> 
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>

                        <div class="text-right add_question_button">
                            <button mat-raised-button type="submit" color="primary" (click)="submitCart()">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

