import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public authSuccess: boolean | null = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      this.authSuccess = false;
      return;
    }
    this.authSuccess = this.authService.loginUser(
      loginForm.value.username,
      loginForm.value.password
    );
  }
}
