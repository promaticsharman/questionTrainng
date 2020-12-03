import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user='1';
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('SeesionUser',this.user)  
  }

}
