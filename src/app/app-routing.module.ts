import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MainLayoutComponent } from './ui-designes/main-layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceBookingComponent } from './service-booking/service-booking.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'profile-settings', component: ProfileComponent },
      { path: 'service-booking', component: ServiceBookingComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'product-management', component: ProductManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
