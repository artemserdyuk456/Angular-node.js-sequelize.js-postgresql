import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {UserService} from '../../user.service';
import {SignupFormData, UserData} from '../../form.data.model';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-user-conten',
  templateUrl: './user-conten.component.html',
  styleUrls: ['./user-conten.component.css']
})
export class UserContenComponent implements OnInit, OnDestroy {
  postUser: UserData[] = [];
  private postsSub: Subscription;

  constructor(private userService: UserService,
              private router: Router ) { }

  ngOnInit() {
    this.userService.getData();
    this.postsSub = this.userService.getDataUpdateList()
      .subscribe((formData: UserData[]) => {
        this.postUser = formData;
        });

  }

  hiddenImg(index: number) {
    // if ( index > 6) {}
    if (index >= 6 && index ) {
      return true;
    }
  }

  hiddenBlock() {
    switch (this.router.url) {
      case "/main-page/form-reg":
        return  false;
      case "/main-page":
        return true;
    }
  }




  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
