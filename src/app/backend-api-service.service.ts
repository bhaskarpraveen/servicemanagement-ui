import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//ng-imports
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BackendApiServiceService {

  URL: string = 'http://localhost:';
  token: any = 'Bearer ' + sessionStorage.getItem('jwtAuthToken');
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  //snackbar common method
  openSnackBar(message: any, status: boolean) {
    let snackbarClassName = status ? 'success-bar' : 'error-bar';
    this._snackBar.open(message, '', {
      duration: 5 * 1000,
      panelClass: snackbarClassName,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }

  validateToken() {
    this.token = 'Bearer ' + sessionStorage.getItem('jwtAuthToken');
    return this.http.get(`${this.URL}8008/authorization/validate`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  login(userDetails: any) {
    return this.http.post(`${this.URL}8008/authorization/user/login`, userDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  register(userDetails: any) {
    return this.http.post(`${this.URL}8080/registration/user`, userDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getRegisteredUsers() {
    return this.http.get(`${this.URL}8080/registration/user`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getSpecificUser(id: any) {
    return this.http.get(`${this.URL}8080/registration/user/id/${id}`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  updatePorfile(details: any, id: any) {
    details['id'] = id;
    return this.http.put(`${this.URL}8080/registration/user/update/`, details, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  updateSpecificUser(details: any, id: any) {
    details['id'] = id;
    return this.http.put(`${this.URL}8080/registration/user/update`, details, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }


  getAllProducts() {
    return this.http.get(`${this.URL}8081/productmanagement/product`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  addNewProduct(productDetails: any) {
    return this.http.post(`${this.URL}8081/productmanagement/product`, productDetails, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  editProduct(productDetails: any, id: any) {
    productDetails['id'] = id;
    return this.http.post(`${this.URL}8081/productmanagement/product/update`, productDetails, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.URL}8081/productmanagement/product/${id}`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getAllServiceRequests() {
    return this.http.get(`${this.URL}8082/productservice/servicereq`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getMyServiceRequests(id: any) {
    return this.http.get(`${this.URL}8082/productservice/servicereq/${id}`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  addServiceRequest(requestDetails: any) {
    return this.http.post(`${this.URL}8082/productservice/servicereq`, requestDetails, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  deleteServiceRequest(id: any) {
    return this.http.delete(`${this.URL}8082/productservice/servicereq/${id}`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }


  editServiceRequest(requestDetails: any, id: any) {
    requestDetails['id'] = id;
    return this.http.post(`${this.URL}8082/productservice/servicereq/update`, requestDetails, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  addServiceReport(requestDetails: any, id: any) {
    return this.http.post(`${this.URL}8082/productservice/servicereq/${id}/report`, requestDetails, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getAllServiceReports() {
    return this.http.get(`${this.URL}8082/productservice/servicereq/report`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getMyServiceReports(userid: any) {
    return this.http.get(`${this.URL}8082/productservice/servicereq/report/userid/${userid}`, {
      observe: 'response',
      headers: new HttpHeaders().append('Authorization', this.token)
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }



}
