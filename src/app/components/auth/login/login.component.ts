import { Component, OnInit } from '@angular/core';
import { Login, User } from '../auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean = false;
  isLogin: boolean = false;

  loginUser: Login = new Login();
  registerUser: User = new User();

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginUser = {
      email: '',
      password: '',
    };
    this.registerUser = {
      email: '',
      full_name: '',
      password: '',
    };
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() === true) {
      this.router.navigateByUrl('/customer');
    }
  }

  loginHandler = (loginUser: Login) => {
    console.log(`loginUser`, loginUser); 
    this.authService.loginUser(loginUser).subscribe({
      next: res => {
        if (res && res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          this.router.navigateByUrl('/home');
          this.isSubmitted = true;
        }
      },
      error: error => console.error(error),
      complete: () => {}
    });
  };

  
  registerHandler = () => {
    this.api.post('/user/add',this.registerUser).subscribe({
      next: res => {
        console.log('res :>> ', res);
        if (res && res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          this.router.navigateByUrl('/home');
          this.isSubmitted = true;
        }
      },
      error: error => console.error(error),
      complete: () => {}
    });
  };
}
