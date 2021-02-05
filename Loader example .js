//////////////////////HTML///////////////////////////////
1. <div class="loader" *ngIf="showLoader">
  <img src="https://i.pinimg.com/originals/f9/9f/c8/f99fc83c656da7ec8db2f6cbc88c6fa6.gif" class="img-fluid" />
</div>

2.  <div *ngIf="loader" class="load_er">
	<mat-progress-spinner
	color="primary"
	mode="indeterminate">
	</mat-progress-spinner></div>
  
  
  
 ///////////////////////////////csss///////////////////////////////
 1.        
                              .loader {
                                  position: fixed;
                                  top: 0;
                                  width: 100%;
                                  height: 100%;
                                  z-index: 999999;
                                  left: 0;
                                  background: rgba(255,255,255,0.7);
                              }
                              .loader img.img-fluid {
                                  transform: translateX(-50%) translateY(-50%);
                                  position: absolute;
                                  top: 50%;
                                  left: 50%;
                                  width: 100%;
                                  height: 100%;
                                  object-fit: contain;
                              }
 
 
 
 
                 2. load_er{
                  position: fixed;
                  z-index: 99;
                  left: 50%;
                  top: 50%;
                  color: #142C69!important
                  }
