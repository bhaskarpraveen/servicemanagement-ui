import { Component, OnInit, Inject } from '@angular/core';
import { BackendApiServiceService } from '../backend-api-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css', '../user-management/user-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'details', 'edit', 'delete'];
  dataSource: any;

  isLoading: boolean = false;
  showError: boolean = false;

  constructor(private service: BackendApiServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.showError = false;

    this.getProducts();
    this.dataSource = new MatTableDataSource(this.fakeProductsData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(element: any) {
    const dialogRef = this.dialog.open(ViewProduct, {
      width: '900px',
      data: element
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal

      }
    })
  }

  getProducts() {
    this.isLoading = true;

    this.service.getAllProducts().subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {

          this.service.openSnackBar(`Products fetched successfully`, true);

          if (data['data'].length > 0) {
            //there are products
            this.showError = false;
            this.dataSource = new MatTableDataSource(data['data']);
          }
          else {
            this.service.openSnackBar(`No products present in database`, false);
            this.showError = false;
            this.dataSource = [];
            //no products - count 0
          }
        }
        else {
          this.showError = true;
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Get products FAILED", error);
        this.service.openSnackBar(`Unable to fetch products please try again`, false);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }


  addProduct() {
    const dialogRef = this.dialog.open(AddNewProduct, {
      width: '900px',
      data: 'Add new Product'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal
        if (result['event'] === 'success') this.ngOnInit();
      }
    })
  }

  deleteProduct(id: any) {
    this.isLoading = true;
    this.service.deleteProduct(id).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['name']} deleted successfully`, true);
          this.ngOnInit();
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("DELETE Product FAILED", error);
        this.service.openSnackBar(`Unable to delete product please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }

  editProduct(element: any) {
    const dialogRef = this.dialog.open(EditSelectedProduct, {
      width: '900px',
      data: element
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal
        if (result['event'] === 'success') this.ngOnInit();
      }
    })
  }

  fakeProductsData = [
    {
      "id": 1,
      "name": "TV",
      "make": "yes",
      "model": "samsung",
      "cost": 300.0,
      "createdDate": "2022-06-14T10:33:38.043+00:00"
    },
    {
      "id": 2,
      "name": "Refrigirator",
      "make": "yes",
      "model": "lg",
      "cost": 600.0,
      "createdDate": "2022-06-14T10:34:13.346+00:00"
    }
  ]

}



@Component({
  selector: 'add-product',
  templateUrl: './templates/add-product.component.html',
  styleUrls: ['./product-management.component.css', '../user-management/user-management.component.css']
})
export class AddNewProduct {

  productForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddNewProduct>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: BackendApiServiceService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      cost: ['', [Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewProduct() {
    this.isLoading = true;
    let details = {
      "name": this.productForm.value.name,
      "make": this.productForm.value.make,
      "model": this.productForm.value.model,
      "cost": this.productForm.value.cost
    };

    this.service.addNewProduct(details).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['name']} added successfully`, true);
          this.dialogRef.close({ event: 'Success' })
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("ADD Product FAILED", error);
        this.service.openSnackBar(`Unable to add product please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }
}


@Component({
  selector: 'edit-product',
  templateUrl: './templates/edit-product.component.html',
  styleUrls: ['./product-management.component.css', '../user-management/user-management.component.css']
})
export class EditSelectedProduct {

  productForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditSelectedProduct>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: BackendApiServiceService) {
    this.productForm = this.fb.group({
      name: [data['name'], [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-z]).{1,}/)]],
      make: [data['make'], [Validators.required]],
      model: [data['model'], [Validators.required]],
      cost: [data['cost'], [Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editProduct() {
    this.isLoading = true;
    let details = {
      "name": this.productForm.value.name,
      "make": this.productForm.value.make,
      "model": this.productForm.value.model,
      "cost": this.productForm.value.cost
    };

    this.service.editProduct(details, this.data['id']).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {
          this.service.openSnackBar(`${data['data']['name']} Updated successfully`, true);
          this.dialogRef.close({ event: 'Success' })
        }
        else {
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Updated Product FAILED", error);
        this.service.openSnackBar(`Unable to Updated product please check input details or try again`, false);
        this.isLoading = false;
      }
    )
  }
}



@Component({
  selector: 'view-product',
  templateUrl: './templates/view-product.component.html',
  styleUrls: ['./product-management.component.css', '../user-management/user-management.component.css']
})
export class ViewProduct {

  constructor(public dialogRef: MatDialogRef<AddNewProduct>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
}
