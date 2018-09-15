import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {mimeType} from '../../mime-type.validator';

@Component({
  selector: 'app-form-reg',
  templateUrl: './form-reg.component.html',
  styleUrls: ['./form-reg.component.css']
})
export class FormRegComponent implements OnInit{
  private  authListenerSubs: Subscription;
  userIsAuthenticated = false;

  formReg: boolean;
  regestForm: FormGroup;
  imagePreview: string;

  constructor( private userService: UserService,
               private router: Router) { }

  ngOnInit() {


    this.regestForm = new FormGroup({
      userName: new FormControl(null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      dateDay: new FormControl(null, Validators.required),
      dateMonth: new FormControl(null, Validators.required),
      dateYear: new FormControl(null, Validators.required),
      education: new FormControl(null, Validators.required),
      children: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      accept: new FormControl(null, Validators.required),
    });

    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onSubmit() {
    if (this.regestForm.valid &&
      this.userService.lookForData.gender !== '' &&
      this.userService.lookForData.lookingFor !== '' &&
      this.userService.lookForData.between !== '' &&
      this.userService.lookForData.location !== '') {
      console.log(this.regestForm.value);
      this.formReg = false;
      this.userService.signUp(
        'http://localhost:8000/api/users',
        this.userService.lookForData.gender,
        this.userService.lookForData.lookingFor,
        this.userService.lookForData.between,
        this.userService.lookForData.location,

        this.regestForm.value.userName,
        this.regestForm.value.email,
        this.regestForm.value.password,
        this.regestForm.value.dateDay,
        this.regestForm.value.dateMonth,
        this.regestForm.value.dateYear,
        this.regestForm.value.education,
        this.regestForm.value.children,
        this.regestForm.value.region,
        this.regestForm.value.district,
        ''
      );
    } else  {
      this.formReg = true;
    }
  }

}
