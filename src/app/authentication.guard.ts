import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendApiServiceService } from './backend-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private service: BackendApiServiceService, private router: Router) { }

  async canActivate() {
    if (localStorage.getItem('jwtAuthToken')) {
      const tmp = await this.service.validateToken().toPromise();

      if (tmp && 'validStatus' in tmp['data'] && tmp['data']['validStatus'])
        return true;
      else {
        this.service.openSnackBar('Invalid token! Logging Out!', false);
        this.router.navigate(['/login']);
        return false;
      }

    }
    else {
      this.service.openSnackBar('Invalid token! Logging Out!', false);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
