import { Component, OnInit, Inject } from '@angular/core';
import { BackendApiServiceService } from '../backend-api-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'registrationDate', 'edit'];
  dataSource: any;

  isLoading: boolean = false;
  showError: boolean = false;

  constructor(private service: BackendApiServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.showError = false;

    this.getRegisteredUsers();
    this.dataSource = new MatTableDataSource(this.fakeUsersData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRegisteredUsers() {
    this.isLoading = true;

    this.service.getRegisteredUsers().subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {

          this.service.openSnackBar(`Users fetched successfully`, true);

          if (data['data'].length > 0) {
            //there are users
            this.showError = false;
            this.dataSource = new MatTableDataSource(data['data']);
          }
          else {
            this.service.openSnackBar(`No users present in database`, false);
            this.showError = false;
            this.dataSource = [];
            //no users - count 0
          }
        }
        else {
          this.showError = true;
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Get users FAILED", error);
        this.service.openSnackBar(`Unable to fetch users please try again`, false);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(AddNewUser, {
      width: '900px',
      data: 'Add new User'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal
        if (result['event'] === 'success') this.ngOnInit();
      }
    })
  }

  editUser(i: any) {
    const dialogRef = this.dialog.open(EditUser, {
      width: '900px',
      data: i
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed model
        if (result['event'] === 'success') this.ngOnInit();
      }
    })
  }

  fakeUsersData = [
    {
      "id": 1,
      "name": "hari",
      "email": "hariphalguna@gmail.com",
      "password": "haripalguna",
      "mobile": "999",
      "registrationDate": "2022-06-14T10:31:31.800+00:00"
    },
    {
      "id": 1,
      "name": "hari",
      "email": "hariphalguna@gmail.com",
      "password": "haripalguna",
      "mobile": "999",
      "registrationDate": "2022-06-14T10:31:31.800+00:00"
    },
    {
      "id": 1,
      "name": "hari",
      "email": "hariphalguna@gmail.com",
      "password": "haripalguna",
      "mobile": "999",
      "registrationDate": "2022-06-14T10:31:31.800+00:00"
    },
  ]

}



@Component({
  selector: 'add-user',
  templateUrl: './templates/add-user.component.html',
  styleUrls: ['./user-management.component.css']
})
export class AddNewUser {

  registrationForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddNewUser>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: BackendApiServiceService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]]
    })
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewUser() {
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
          this.dialogRef.close({ event: 'Success' })
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("REGISTER USER FAILED", error);
        this.service.openSnackBar(`Unable to Register user please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }
}



@Component({
  selector: 'edit-user',
  templateUrl: './templates/edit-user.component.html',
  styleUrls: ['./user-management.component.css']
})
export class EditUser {
  updateUserForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddNewUser>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: BackendApiServiceService) {
    console.log(data['name']);
    this.updateUserForm = this.fb.group({
      name: [data['name'], [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      phoneNumber: [data['mobile'], [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
      emailAddress: [data['email'], [Validators.required, Validators.email]],
      password: [data['password'], [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]]
    })
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser() {
    this.isLoading = true;
    let details = {
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.emailAddress,
      password: this.updateUserForm.value.password,
      mobile: this.updateUserForm.value.phoneNumber
    };

    this.service.updateSpecificUser(details, sessionStorage.getItem('userId')).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['email']} Updated successfully`, true);
          this.dialogRef.close({ event: 'Success' })
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Update USER FAILED", error);
        this.service.openSnackBar(`Unable to Update user please check input details or try again`, false);
        this.isLoading = false;
      }
    )

  }
}
