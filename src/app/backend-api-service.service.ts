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

  URL: string = 'http://localhost:8008/';
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

  login(userDetails: any) {
    return this.http.post(`${this.URL}authorization/user/login`, userDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  register(userDetails: any) {
    return this.http.post(`${this.URL}registration/user`, userDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getRegisteredUsers() {
    return this.http.get(`${this.URL}registration/user`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getSpecificUser(id: any) {
    return this.http.get(`${this.URL}registration/user/id/${id}`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  updatePorfile(details: any, id: any) {
    return this.http.put(`${this.URL}registration/user/update/${id}`, details, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  updateSpecificUser(details: any, id: any) {
    return this.http.put(`${this.URL}registration/user/update/${id}`, details, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }


  getAllProducts() {
    return this.http.get(`${this.URL}productmanagement/product`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  addNewProduct(productDetails: any) {
    return this.http.post(`${this.URL}productmanagement/product`, productDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.URL}productmanagement/product/${id}`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  getAllServiceRequests() {
    return this.http.get(`${this.URL}productservice/servicereq`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  addServiceRequest(requestDetails: any) {
    return this.http.post(`${this.URL}productservice/servicereq`, requestDetails, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }

  deleteServiceRequest(id: any) {
    return this.http.delete(`${this.URL}productservice/servicere/${id}`, {
      observe: 'response'
    }).pipe(map((data: any) => {
      return {
        data: data.body ? data.body : undefined,
        statusCode: data.status
      }
    }))
  }



}
