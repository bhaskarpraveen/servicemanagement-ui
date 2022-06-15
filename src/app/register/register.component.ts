import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

//services
import { BackendApiServiceService } from '../backend-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../ui-designes/common-styles.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  isLoading: boolean = false;
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service: BackendApiServiceService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  routerNavigate(url: string) {
    this.router.navigate([`/${url}`])
  }

  passwordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  passwordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  registrationUser() {
    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
      this.isLoading = true;
      let details = {
        "name": this.registrationForm.value.name,
        "email": this.registrationForm.value.emailAddress,
        "password": this.registrationForm.value.password,
        "mobile": this.registrationForm.value.phoneNumber
      };

      this.service.register(details).subscribe(
        (data: any) => {
          if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
            this.service.openSnackBar(`${data['data']['email']} Registered successfully`, true);
            this.router.navigate(['/login']);
          }
          else {
            this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.error("REGISTER USER FAILED", error.error.message);
          this.service.openSnackBar(`Unable to Register user please check input details or try again`, false);
          this.isLoading = false;
        }
      )
    }
    else {
      this.service.openSnackBar('Password and Confirm password are not matching!', false);
    }

  }

}
