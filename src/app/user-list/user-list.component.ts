import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {SetRoleModel, UserData} from '../form.data.model';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  // for authentication
  private authStatusSubs: Subscription;
  userIsAuthenticated = false;
  userRole: string;
  userId: string;
  fetchUserName: string;

  //for role
  postRole: SetRoleModel[] = [];
  private postsSubRole: Subscription;

  optionKey = ['User', 'Moderator', 'Administrator'];
  returnKey:string;

  userName = 0;
  email = 0;
  postUser: UserData[] = [];
  private postsSub: Subscription;
  createRole: FormGroup;
  createUser: UserData = {
        id: '',
        role: '',
        gender: '',
        lookingFor: '',
        between: '',
        location: '',
        userName: 'userName',
        email: '',
        password: '123',
        dateDay: '',
        dateMonth: '',
        dateYear: '',
        education: '',
        region: '',
        children: '',
        district: '',
        image: '',
      };
  imagePreview: string;

  constructor( private router: Router,
               private userService: UserService) {}

  ngOnInit() {
    //form
    this.createRole = new FormGroup({
      role: new FormControl(null, Validators.required ),
    });




    this.postsSub = this.userService.getDataUpdateList()
      .subscribe((formData: UserData[]) => {
          this.postUser = formData;
        }
      );
    this.userService.getData();
    console.log(this.userService.getToken());


    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authStatusSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;

      });
    this.userId = this.userService.getUserId();
    this.fetchUserName = this.userService.getFetchUserName();
    this.userRole = this.userService.getUserRole();
    console.log(this.userService.getFetchUserName());
  }

  keySelect(key: any, myKey: string) {
    for ( const k of key) {
      if (k === myKey) {
        return this.returnKey = k;
      }
    }
  }

  moderAdmin(id: string) {
    if ((this.userRole === 'Administrator' && this.userIsAuthenticated) || (this.userIsAuthenticated && (this.userRole === 'Moderator' && this.userId === id ))) {
      return true;
    }
  }
  moderAccess(id: string) {
    if (this.userIsAuthenticated && (this.userRole === 'Moderator' && this.userId !== id ))  {
      return true;
    }
  }


  uniqUser() {
    ++this.email;
    ++this.userName;
  }

  createNewUser() {
    this.uniqUser();
    this.userService.signUp(
      'http://localhost:8000/api/user/create/admin',
      this.createUser.gender,
      this.createUser.lookingFor,
      this.createUser.between,
      this.createUser.location,

      this.createUser.userName + this.userName,
      this.createUser.email + 'user' + this.email + '@gmail.com',
      this.createUser.password,
      this.createUser.dateDay,
      this.createUser.dateMonth,
      this.createUser.dateYear,
      this.createUser.education,
      this.createUser.children,
      this.createUser.region,
      this.createUser.district,
      this.createUser.image,
    );
    setTimeout(() => {
      this.userService.getData();
    }, 10);

  }

  onSaveChanges(id: string) {
    this.userService.setRole(
      id,
      this.createRole.value.role,
    );
    console.log(this.userRole);
    console.log(this.fetchUserName);
    console.log(this.userId);
  }


  onDelete(postId: string) {
    this.userService.deletePost(postId);
  }

  goToMainPage() {
    // this.router.navigate(['main-page/form-reg']);
      this.router.navigate(['main-page']);


  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

}
