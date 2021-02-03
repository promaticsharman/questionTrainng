          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
