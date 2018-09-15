import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {AuthorizationDataModel, SignupFormData, UserData, SetRoleModel} from './form.data.model';



@Injectable(
  {  providedIn: 'root'}
)
export class UserService  {
  //for authService will
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private authMessage: string;
  private authRole: string;
  private authUserId: string;
  private fetchUserName: string;

  //for setRole
  private setRoleData: SetRoleModel[] = [];
  private setRoleUpdate = new Subject<SetRoleModel[]>();


  private updateMessage: string;
  private formData: UserData[] = [];
  private formDataUpdated = new Subject<UserData[]>();
  public lookForData: SignupFormData =  {
    gender: '',
    lookingFor: '',
    between: '',
    location: ''
  };
  public userGetData: UserData =  {
    id: null,
    role: '',
    gender: '',
    lookingFor: '',
    between: '',
    location: '',

    userName: '',
    email: '',
    password: '',
    dateDay: '',
    dateMonth: '',
    dateYear: '',
    education: '',
    children: '',
    region: '',
    district: '',
    image: ''
  };

  constructor( private http: HttpClient,
               private router: Router) {}

  saveDataLook(
        gender: string,
        lookingFor: string,
        between: string,
        location: string) {
    this.lookForData = {
      gender: gender,
      lookingFor: lookingFor,
      between: between,
      location: location
    };
  }


  getData() {
    this.http
      .get<{message: string, usersData: any}>(
        'http://localhost:8000/api/users'
      )
      .pipe(map(formData => {
        return formData.usersData.map(post => {
          return {
            id: post.id,
            role: post.role,

            gender: post.gender,
            lookingFor: post.lookingFor,
            between: post.between,
            location: post.location,

            userName: post.userName,
            email: post.email,
            password: post.password,
            dateDay: post.dateDay,
            dateMonth: post.dateMonth,
            dateYear: post.dateYear,
            education: post.education,
            children: post.children,
            region: post.children,
            district: post.district,
            image: post.image,
          };
        });
      }))
      .subscribe((transformPosts) => {
          this.formData = transformPosts;
          this.formDataUpdated.next([...this.formData]);

        });
  }

  getUser(userId: string) {
    this.http
      .get<{message: string, userData: any}>(
        'http://localhost:8000/api/users/' + userId
      )
      .subscribe((user) => {
        this.userGetData.role = user.userData.role;

        this.userGetData.gender = user.userData.gender;
        this.userGetData.lookingFor = user.userData.lookingFor;
        this.userGetData.between = user.userData.between;
        this.userGetData.location = user.userData.location;

        this.userGetData.userName = user.userData.userName;
        this.userGetData.email = user.userData.email;
        this.userGetData.password = user.userData.password;
        this.userGetData.dateDay = user.userData.dateDay;
        this.userGetData.dateMonth = user.userData.dateMonth;
        this.userGetData.dateYear = user.userData.dateYear;
        this.userGetData.education = user.userData.education;
        this.userGetData.children = user.userData.children;
        this.userGetData.region = user.userData.region;
        this.userGetData.district = user.userData.district;
        this.userGetData.image =  user.userData.image;
      });
  }

  getDataUpdateList() {
    return this.formDataUpdated.asObservable();
  }

  getUserEdit(id: string) {
    return {...this.formData.find(user => user.id === id)};
  }

  //autorization
  getFetchUserName() {
    return this.fetchUserName;
  }

  getUserRole() {
    return this.authRole;
  }

  getUserId() {
    return this.authUserId;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }


  login(email: string, password: string) {
    const authData: AuthorizationDataModel = {email: email, password: password};
    this.http.post<{
      token: string,
      expiresIn: number,
      userId: string,
      userName: string,
      userRole: string,
      message: string}>(
        'http://localhost:8000/api/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.fetchUserName = response.userName;
          console.log(this.fetchUserName);
          this.authRole = response.userRole;
          this.authUserId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.authUserId, this.authRole, this.fetchUserName);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.fetchUserName = authInformation.userName;
      this.authUserId = authInformation.userId;
      this.authRole = authInformation.userRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.authUserId = null;
    this.authRole = null;
    this.fetchUserName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['main-page']);
  }



  private setAuthTimer(duration: number) {
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userRole: string, userName: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName', userName);

  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole: userRole,
      userName: userName
    };
  }




  // FOR REGISTRATION WITH NOOOOOOOOOOOOOOOO PHOTO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  signUp(
        url: string,
        gender: string,
        lookingFor: string,
        between: string,
        location: string,
        userName: string,

        email: string,
        password: string,
        dateDay: string,
        dateMonth: string,
        dateYear: string,
        education: string,
        children: string,
        region: string,
        district: string,
        image: string) {
        const postData: UserData = {
          id: null,
          role: null,
          gender: gender,
          lookingFor: lookingFor,
          between: between,
          location: location,

          userName: userName,
          email: email,
          password: password,
          dateDay: dateDay,
          dateMonth: dateMonth,
          dateYear: dateYear,
          education: education,
          children: children,
          region: region,
          district: district,
          image: image
        };
        this.http.post<{message: string, post: UserData}>(
          url,
          postData)
          .subscribe((responseData) => {
            const post: UserData = {
                id: responseData.post.id,
                role: responseData.post.role,
                gender: gender,
                lookingFor: lookingFor,
                between: between,
                location: location,

                userName: userName,
                email: email,
                password: password,
                dateDay: dateDay,
                dateMonth: dateMonth,
                dateYear: dateYear,
                education: education,
                children: children,
                region: region,
                district: district,
                image: responseData.post.image
            };
            this.formData.push(post);
            this.formDataUpdated.next([...this.formData]);
            if (url === 'http://localhost:8000/api/users') {
              this.login(post.email, post.password);
            }
          });
  }



// FOR REGISTRATION WITH ADD PHOTO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // addData(
  //       gender: string,
  //       lookingFor: string,
  //       between: string,
  //       location: string,
  //       userName: string,
  //
  //       email: string,
  //       password: string,
  //       dateDay: string,
  //       dateMonth: string,
  //       dateYear: string,
  //       education: string,
  //       children: string,
  //       region: string,
  //       district: string,
  //       image: File) {
  //       // const postData: UserData = {
  //       //   id: null,
  //       //   gender: gender,
  //       //   lookingFor: lookingFor,
  //       //   between: between,
  //       //   location: location,
  //       //
  //       //   userName: userName,
  //       //   email: email,
  //       //   password: password,
  //       //   dateDay: dateDay,
  //       //   dateMonth: dateMonth,
  //       //   dateYear: dateYear,
  //       //   education: education,
  //       //   children: children,
  //       //   region: region,
  //       //   district: district,
  //       //   image: null
  //       // };
  //
  //   const postData = new FormData();
  //   postData.append('id', null);
  //   postData.append('gender', gender);
  //   postData.append('lookingFor', lookingFor);
  //   postData.append('between', between);
  //   postData.append('location', location);
  //
  //   postData.append('userName', userName);
  //   postData.append('email', email);
  //   postData.append('password', password);
  //   postData.append('dateDay', dateDay);
  //   postData.append('dateMonth', dateMonth);
  //   postData.append('dateYear', dateYear);
  //   postData.append('education', education);
  //   postData.append('children', children);
  //   postData.append('region', region);
  //   postData.append('district', district);
  //   postData.set('image', image, userName);
  //       this.http.post<{message: string, post: UserData}>(
  //         'http://localhost:8000/api/users',
  //         postData)
  //         .subscribe((responseData) => {
  //           const post: UserData = {
  //               id: responseData.post.id,
  //               gender: gender,
  //               lookingFor: lookingFor,
  //               between: between,
  //               location: location,
  //
  //               userName: userName,
  //               email: email,
  //               password: password,
  //               dateDay: dateDay,
  //               dateMonth: dateMonth,
  //               dateYear: dateYear,
  //               education: education,
  //               children: children,
  //               region: region,
  //               district: district,
  //               image: responseData.post.image
  //           };
  //
  //           // const id = responseData.postId;
  //           // postData.id = id;
  //           this.formData.push(post);
  //           this.formDataUpdated.next([...this.formData]);
  //         });
  // }
// FOR REGISTRATION WITH ADD PHOTO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  setRole(id: string, role: string) {
    const setRole: SetRoleModel = {
      id: id,
      role: role
    };
    this.http.put('http://localhost:8000/api/role/' + id, setRole)
      .subscribe(responseData => {
        const updateRoleData = [...this.setRoleData];
        const oldRoleDataIndex = updateRoleData.findIndex(p => p.id === id);
        const setData: SetRoleModel = {
          id: id,
          role: role
        };
        updateRoleData[oldRoleDataIndex] = setData;
        this.setRoleData = updateRoleData;
        this.setRoleUpdate.next([...this.setRoleData]);
      });
  }





  updateUserEdit(
    id: string,
    role: string,

    gender: string,
    lookingFor: string,
    between: string,
    location: string,

    userName: string,
    email: string,
    password: string,
    dateDay: string,
    dateMonth: string,
    dateYear: string,
    education: string,
    children: string,
    region: string,
    district: string,
    image: File | string
  ) {
      let userEdit: UserData | FormData;
      if (typeof image === "object") {
        userEdit = new FormData();
        userEdit.append('id', null);
        userEdit.append('role', role);
        userEdit.append('gender', gender);
        userEdit.append('lookingFor', lookingFor);
        userEdit.append('between', between);
        userEdit.append('location', location);

        userEdit.append('userName', userName);
        userEdit.append('email', email);
        userEdit.append('password', password);
        userEdit.append('dateDay', dateDay);
        userEdit.append('dateMonth', dateMonth);
        userEdit.append('dateYear', dateYear);
        userEdit.append('education', education);
        userEdit.append('children', children);
        userEdit.append('region', region);
        userEdit.append('district', district);
        userEdit.set('image', image, userName);
      } else {
        userEdit = {
            id: id,
            role: role,

            gender: gender,
            lookingFor: lookingFor,
            between: between,
            location: location,

            userName: userName,
            email: email,
            password: password,
            dateDay: dateDay,
            dateMonth: dateMonth,
            dateYear: dateYear,
            education: education,
            children: children,
            region: region,
            district: district,
            image: image
        };

      }
    this.http.put<{message: string}>('http://localhost:8000/api/users/' + id, userEdit)
      .subscribe(responseData => {
        const updateUserData = [...this.formData];
        const oldUserDataIndex = updateUserData.findIndex(p => p.id === id);
        const postEditData: UserData = {
            id: id,
            role: role,

            gender: gender,
            lookingFor: lookingFor,
            between: between,
            location: location,

            userName: userName,
            email: email,
            password: password,
            dateDay: dateDay,
            dateMonth: dateMonth,
            dateYear: dateYear,
            education: education,
            children: children,
            region: region,
            district: district,
            image: ""
        };
        updateUserData[oldUserDataIndex] = postEditData;
        this.formData = updateUserData;
        this.formDataUpdated.next([...this.formData]);
        console.log(responseData);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  getUpdateMessage() {
    return this.updateMessage;
  }

  deletePost( postId: string ) {
    this.http.delete('http://localhost:8000/api/users/' + postId)
      .subscribe(() => {
        const updatedPosts = this.formData.filter(post => post.id !== postId);
        this.formData = updatedPosts;
        this.formDataUpdated.next([...this.formData]);
      });
  }
}
