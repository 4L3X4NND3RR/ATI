import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  submited = false;
  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formLogin = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submited = true;
    if (this.formLogin.valid) {
      const user = new User();
      user.email = this.formLogin.get('email')?.value;
      user.password = this.formLogin.get('password')?.value;
      this.loginService.login(user).subscribe((res) => {
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(user));
          this.loginService.logged.next(true);
          this.router.navigate(['/main-page']);
        }
      });
    }
  }
}
