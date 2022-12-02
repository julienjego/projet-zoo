import { AuthService } from './../services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() employee!: Employee;
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
