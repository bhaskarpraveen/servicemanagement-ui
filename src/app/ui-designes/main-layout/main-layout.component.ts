import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { BackendApiServiceService } from '../../backend-api-service.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router: Router, private service: BackendApiServiceService) { }

  ngOnInit(): void {
  }

  routerNavigate(url: string) {
    this.router.navigate([`${url}`])
  }

  logout() {
    sessionStorage.removeItem('jwtAuthToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('serverCurrentTime');
    sessionStorage.removeItem('tokenExpirationTime');
    this.router.navigate(['/login']);
    this.service.openSnackBar('Loggedout Successfully!', true);
  }

}
