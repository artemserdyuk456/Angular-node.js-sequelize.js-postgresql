import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private  authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

}
