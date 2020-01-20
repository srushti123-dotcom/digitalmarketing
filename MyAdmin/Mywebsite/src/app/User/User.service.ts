import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  url = 'http://localhost:4000/User'

  constructor(private http: HttpClient) { }

  login(Email: string, Password: string) {
    const body = {
      Email: Email,
      Password: Password
    }

    return this.http.post(this.url + '/LOGIN', body)
  }

registerUser( First_Name: string, Last_Name: string, Email: string, Mobile_No: number, Password: string ) {
  const body = {
    First_Name: First_Name,
    Last_Name: Last_Name,
    Email: Email,
    Mobile_No: Mobile_No,
    Password: Password
  }


  return this.http.post(this.url + '/register', body)
}

}
