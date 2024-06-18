import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username : string = '';
  password : string = '';

  ngOnInit(): void {
  }

  constructor(private authentication : AuthenticationService){

  }

  login(){
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      token => console.log(token)
    );
    console.log(userDto);
  }
}
