import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authFailed: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    this.authService.loginUser(
      loginForm.value.username,
      loginForm.value.password
    );
    this.authFailed = this.authService.authFailed;
  }
}
