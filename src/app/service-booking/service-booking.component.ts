import { Component, OnInit, Inject } from '@angular/core';
import { BackendApiServiceService } from '../backend-api-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

export class tableFilter {
  id: number | undefined;
  product_id: number | undefined;
  user_id: number | undefined;
}

@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.css', '../user-management/user-management.component.css']
})
export class ServiceBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product_id', 'user_id', 'problem', 'description', 'status', 'reqdate', 'delete'];
  dataSource: any;

  isLoading: boolean = false;
  showError: boolean = false;


  filterEntity: tableFilter = new tableFilter;
  filterType!: MatTableFilter;

  constructor(private service: BackendApiServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.showError = false;

    this.getAllServiceRequests();
    this.dataSource = new MatTableDataSource(this.fakeServiceRequestsData);

    this.filterEntity = new tableFilter();
    this.filterType = MatTableFilter.ANYWHERE;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource['data'])
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllServiceRequests() {
    this.isLoading = true;

    this.service.getAllServiceRequests().subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {

          this.service.openSnackBar(`Service Requests fetched successfully`, true);

          if (data['data'].length > 0) {
            //there are service requests
            this.showError = false;
            this.dataSource = new MatTableDataSource(data['data']);
          }
          else {
            this.service.openSnackBar(`No Service requests present in database`, false);
            this.showError = false;
            this.dataSource = [];
            //no serice requests - count 0
          }
        }
        else {
          this.showError = true;
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Get Service Requests Failed", error.error.message);
        this.service.openSnackBar(`Unable to fetch service requests please try again`, false);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }

  createServiceRequest() {
    const dialogRef = this.dialog.open(AddServiceRequest, {
      width: '900px',
      data: 'Add new Service Request'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal
        if (result['event'] === 'success') this.ngOnInit();
      }
    })
  }

  deleteRequest(id: any) {
    this.isLoading = true;
    this.service.deleteServiceRequest(id).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['problem']} deleted successfully`, true);
          this.ngOnInit();
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("DELETE Service Request FAILED", error.error.message);
        this.service.openSnackBar(`Unable to delete service request please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }

  fakeServiceRequestsData = [
    {
      "id": 1,
      "productid": 2,
      "userid": 1,
      "reqdate": null,
      "problem": "display",
      "description": "display problem",
      "status": "resolved"
    },
    {
      "id": 2,
      "productid": 1,
      "userid": 1,
      "reqdate": null,
      "problem": "asder",
      "description": "display problem123",
      "status": "pending"
    }
  ]
}


@Component({
  selector: 'add-service-request',
  templateUrl: './templates/add-service-request.component.html',
  styleUrls: ['./service-booking.component.css', '../user-management/user-management.component.css']
})
export class AddServiceRequest {

  serviceRequestForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddServiceRequest>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: BackendApiServiceService) {
    this.serviceRequestForm = this.fb.group({
      productId: ['', [Validators.required]],
      problem: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewServiceReq() {
    this.isLoading = true;
    let details = {
      "productid": this.serviceRequestForm.value.productId,
      "userid": sessionStorage.getItem("userId"),
      "problem": this.serviceRequestForm.value.problem,
      "description": this.serviceRequestForm.value.description,
      "status": this.serviceRequestForm.value.status
    };

    this.service.addServiceRequest(details).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['problem']} added successfully`, true);
          this.dialogRef.close({ event: 'Success' })
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("ADD Product FAILED", error.error.message);
        this.service.openSnackBar(`Unable to add service request please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }
}
