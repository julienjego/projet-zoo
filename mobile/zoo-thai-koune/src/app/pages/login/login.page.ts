import { AuthService } from '../../services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // @Input() employee!: any;

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogin(loginForm: NgForm) {
    console.log('bouton');
    this.authService.loginUser(
      loginForm.value.username,
      loginForm.value.password
    );
  }

  onLog() {
    this.authService.loginUser(this.username, this.password);
  }
}
