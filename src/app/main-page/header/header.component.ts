import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private  authListenerSubs: Subscription;
  userIsAuthenticated = false;

  toggle: boolean;
  authorizationForm: FormGroup;
  authFailed = false;
  userRole: string;


  constructor(private userService: UserService,
              private router: Router ) { }

  ngOnInit() {
    this.authorizationForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      // rememberData: new FormControl(null, Validators.required)
    });

    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userRole = this.userService.getUserRole();
        this.roleUserAccess();
      });
    this.userRole = this.userService.getUserRole();
    this.roleUserAccess();
    console.log(this.userRole);
    console.log(this.userIsAuthenticated);

    //role


    // console.log(this.userRole);
    // console.log(this.userIsAuthenticated);


    //role access

  }
  toToggleForm() {
    this.toggle = !this.toggle;
  }

  roleUserAccess() {
    if ((this.userRole === 'Administrator' && this.userIsAuthenticated) || (this.userRole === 'Moderator' && this.userIsAuthenticated)
    ) {
      return this.authFailed = true;
    } else {
      return this.authFailed = false;
    }
  }


  onSubmit() {
    if ( this.authorizationForm.valid) {
      console.log(this.authorizationForm.value);
      this.userService.login(
        this.authorizationForm.value.email,
        this.authorizationForm.value.password
      );
    }
  }
  goToUserList() {
    this.router.navigate(['/user-list']);
  }
  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
