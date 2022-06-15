import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

//services
import { BackendApiServiceService } from '../backend-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../ui-designes/common-styles.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service: BackendApiServiceService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  userLogin() {
    this.isLoading = true;
    let details = {
      "username": this.signInForm.value.email,
      "password": this.signInForm.value.password
    };

    this.service.login(details).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          //success response
          sessionStorage.setItem('jwtAuthToken', data['data']['jwtAuthToken'].toString());
          sessionStorage.setItem('userId', data['data']['id']);
          sessionStorage.setItem('username', data['data']['username']);
          sessionStorage.setItem('serverCurrentTime', data['data']['serverCurrentTime']);
          sessionStorage.setItem('tokenExpirationTime', data['data']['tokenExpirationTime']);
          this.service.openSnackBar(`${data['data']['username']} LoggedIn successfully`, true);

          this.router.navigate(['/user/user-dashboard']);
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("LOGIN FAILED", error.error.message);
        this.service.openSnackBar(`Unable to Login please check credentials or try again`, false);
        this.isLoading = false;
      }
    )
  }

  routerNavigate(url: string) {
    this.router.navigate([`/${url}`])
  }

}
