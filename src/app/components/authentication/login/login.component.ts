import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';


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

  constructor(private authentication : AuthenticationService, 
    private sessionStorage: SessionStorageService,
    private router:Router  
    ){

  }

  login(){
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      token => {
        console.log(token);
        //this.sessionStorage.removeItem('token);
        this.sessionStorage.setItem('token', token);
        if (token.type == 'ADMIN') {
          this.router.navigate(['/admin/product']);
        }else{
          this.router.navigate(['/']);
        }
      }
    );
    console.log(userDto);
  }
}
