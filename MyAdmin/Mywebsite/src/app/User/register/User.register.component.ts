import { UserService } from './../User.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-User-register',
  templateUrl: './User.register.component.html',
  styleUrls: ['./User.register.component.css']
})

export class UserRegisterComponent implements OnInit {
  First_Name = ''
  Last_Name = ''
  Email = ''
  Mobile_No = 0
  Password = ''

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() { }

  onRegister() {
    if (this.First_Name.length == 0) {
      alert('enter valid First_Name')
    }else if (this.Last_Name.length == 0) {
      alert('enter valid Last_Name')
    } else if (this.Email.length == 0) {
      alert('enter valid Email')
    } else if (this.Mobile_No == null) {
      alert('enter valid Mobile_No')
    }else if (this.Password.length == 0) {
      alert('enter valid Password')
    } else {
      this.userService.registerUser( this.First_Name, this.Last_Name, this.Email, this.Mobile_No,this.Password )
        .subscribe(response => {
          if (response['status'] == 'success') {
            alert('registered successfully')
            this.router.navigate(['/User-LOGIN'])
          } else {
            alert(response['error'])
          }
        })
    }
  }
}
