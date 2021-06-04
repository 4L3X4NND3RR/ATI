import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FrontendFuentesHotel';
  logged = false;

  /**
   *
   */
  constructor(private loginService: LoginService) {
    this.loginService.logged.subscribe((l) => (this.logged = l));
  }

  ngOnInit(): void {
    this.logged = this.loginService.checkLoged();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.logged = false;
  }
}
