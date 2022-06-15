import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  letModuleDetails = [
    { title: 'Service Booking', description: 'User can book/manage services', icon: 'support_agent', uri: '/user/service-booking' },
    { title: 'User Management', description: 'User can add/manage Users', icon: 'account_circle', uri: '/user/user-management' },
    { title: 'Product Management', description: 'User can add/manage Products', icon: 'inventory', uri: '/user/product-management' },
    { title: 'Porfile Settings', description: 'User can edit/update his profile', icon: 'admin_panel_settings', uri: '/user/profile-settings' },
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routerNavigate(uri: string) {
    this.router.navigate([`${uri}`])
  }

}
