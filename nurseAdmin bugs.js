loginnnnn


if(this.Form.value.email && this.Form.value.password){
      var form = {
        email: this.Form.value.email,
        password: this.Form.value.password,
      }
      this.service.adminLogin(form).subscribe(
        (res) => {
          localStorage.setItem("data",JSON.stringify(res.data));
          localStorage.setItem('isLoggedin','true')
          localStorage.setItem("token",JSON.stringify(res.token));
          this.router.navigate(['/dashboard']);
          console.log(res);
        },err => {
          // console.log(err,"teffffddfffdsststst")
          if (err.status >= 400) {
          
            this.toastr.error(err.error.errors.msg)
          } else {
            this.toastr.error('Internet Connection Error', 'Error')
            console.log('Internet Connection Error')}
          });
  } else if(this.Form.value.email && !this.Form.value.password) {
    this.toastr.error('Please provide valid password', 'Error')
  } else if(!this.Form.value.email && this.Form.value.password) {
    this.toastr.error('Please provide valid email', 'Error')
  } else{
    this.toastr.error('Please fill all the details', 'Error')
  }
