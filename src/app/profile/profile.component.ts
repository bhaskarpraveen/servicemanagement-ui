import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
//services
import { BackendApiServiceService } from '../backend-api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private service: BackendApiServiceService, private router: Router) {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }, [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      registrationDate: [{ value: '', disabled: true }, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.isLoading = false;

    this.getUserDetails();
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getUserDetails() {
    this.isLoading = true;
    let id = sessionStorage.getItem("userId");
    this.service.getSpecificUser(id).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['email']} Fetched successfully`, true);
          this.profileForm.controls['name'].setValue(data['data']['name']);
          this.profileForm.controls['emailAddress'].setValue(data['data']['email']);
          this.profileForm.controls['password'].setValue(data['data']['password']);
          this.profileForm.controls['phoneNumber'].setValue(data['data']['mobile']);
          this.profileForm.controls['registrationDate'].setValue(data['data']['registrationDate']);
          this.profileForm.controls['id'].setValue(data['data']['id']);
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Fetching User Failed", error);
        this.service.openSnackBar(`Unable to fetch user please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }

  updateUser() {
    this.isLoading = true;
    let details = {
      'name': this.profileForm.value.name,
      'email': this.profileForm.value.emailAddress,
      'password': this.profileForm.value.password,
      'mobile': this.profileForm.value.phoneNumber
    }

    this.service.updatePorfile(details, sessionStorage.getItem("userId")).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['email']} Updated successfully`, true);
          sessionStorage.removeItem('jwtAuthToken');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('serverCurrentTime');
          sessionStorage.removeItem('tokenExpirationTime');
          this.router.navigate(['/login']);
          this.service.openSnackBar('Loggedout Successfully!', true);
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Unable to update profile", error);
        this.service.openSnackBar(`Unable to Update profile please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }

}
