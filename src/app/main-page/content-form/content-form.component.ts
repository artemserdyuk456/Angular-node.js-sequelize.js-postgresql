import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css']
})
export class ContentFormComponent implements OnInit {
  private  authListenerSubs: Subscription;
  userIsAuthenticated = false;

  formRes: boolean;
  signupForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) {}


  ngOnInit() {
    this.signupForm = new FormGroup({
      'gender': new FormControl(null, Validators.required ),
      'lookingFor': new FormControl(null, Validators.required),
      'between': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
    });


    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      this.router.navigate(['main-page/form-reg']);
      console.log(this.signupForm.value);
      this.formRes = false;
      this.userService.saveDataLook(
        this.signupForm.value.gender,
        this.signupForm.value.lookingFor,
        this.signupForm.value.between,
        this.signupForm.value.location
      );
    } else  {
      this.formRes = true;
    }
  }

}
