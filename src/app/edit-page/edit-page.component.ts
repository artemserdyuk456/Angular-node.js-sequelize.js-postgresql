import { Component, OnInit, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user.service';
import {UserData} from '../form.data.model';
import {HttpClient} from '@angular/common/http';
import {mimeType} from '../mime-type.validator';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  // private postsSub: Subscription;
  updateMessage: string;
  toggleSuccess: boolean;
  toggleFailed: boolean;
  user: UserData;
  formRes: boolean;
  editForm: FormGroup;
  mode = 'create';
  userId: string;
  imagePreview: string;
  public userGetData: UserData = {
    id: null,
    role: null,
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

  constructor ( private http: HttpClient,
                private userService: UserService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private ngZone: NgZone) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      gender: new FormControl(null, Validators.required ),
      lookingFor: new FormControl(null, Validators.required),
      between: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),

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

      image: new FormControl(null,
        {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })

    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.user = this.userService.getUserEdit(this.userId);
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
    this.userService.getUser(this.userId);

    // this.userService.userGetData = this.userGetData;
    this.userService.userGetData = this.userGetData;

    console.log(this.userGetData);
    // this.editForm.setValue({
    //
    //   gender: this.userGetData.gender,
    //   lookingFor: this.userGetData.lookingFor,
    //   between: this.userGetData.between,
    //   location: this.userGetData.location,
    //
    //   userName: this.userGetData.userName,
    //   email: this.userGetData.email,
    //   password: this.userGetData.password,
    //   dateDay: this.userGetData.dateDay,
    //   dateMonth: this.userGetData.dateMonth,
    //   dateYear: this.userGetData.dateYear,
    //   education: this.userGetData.education,
    //   children: this.userGetData.children,
    //   region: this.userGetData.region,
    //   district: this.userGetData.district
    // });
    // console.log(this.userGetData.image);
    // console.log(this.userService.userGetData);
  }

  onImagePicker($event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({image: file});
    this.editForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

  }

  updateUser() {
    if (this.editForm.valid) {
      this.userService.updateUserEdit(
        this.userId,
        null,

        this.editForm.value.gender,
        this.editForm.value.lookingFor,
        this.editForm.value.between,
        this.editForm.value.location,

        this.editForm.value.userName,
        this.editForm.value.email,
        this.editForm.value.password,
        this.editForm.value.dateDay,
        this.editForm.value.dateMonth,
        this.editForm.value.dateYear,
        this.editForm.value.education,
        this.editForm.value.children,
        this.editForm.value.region,
        this.editForm.value.district,
        this.editForm.value.image
      );
      this.updateMessage = this.userService.getUpdateMessage();
        this.toggleSuccess = true;
        setTimeout(() => {
          this.toggleSuccess = false;
        }, 2000);
    } else  {
      this.formRes = true;
    }
  }

  goToUserListPage() {
    this.ngZone.run(() => {
      this.router.navigate(['/user-list']);
    });

  }

}
