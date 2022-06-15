import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

//angular-modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

//npm-modules
import { MatTableFilterModule } from 'mat-table-filter';

//angular-material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

//guards
import { AuthenticationGuard } from './authentication.guard';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserManagementComponent, AddNewUser, EditUser } from './user-management/user-management.component';
import { ProductManagementComponent, AddNewProduct, ViewProduct, EditSelectedProduct } from './product-management/product-management.component';
import { ServiceBookingComponent, AddServiceRequest, ViewServiceRequest, EditServiceRequest } from './service-booking/service-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { PreLoaderComponent } from './ui-designes/pre-loader/pre-loader.component';
import { MainLayoutComponent } from './ui-designes/main-layout/main-layout.component';
import { MainServiceScreenComponent } from './main-service-screen/main-service-screen.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    UserDashboardComponent,
    UserManagementComponent,
    ProductManagementComponent,
    ServiceBookingComponent,
    ProfileComponent,
    PreLoaderComponent,
    MainLayoutComponent,
    AddNewUser,
    AddNewProduct,
    AddServiceRequest,
    EditUser,
    ViewProduct,
    EditSelectedProduct,
    MainServiceScreenComponent,
    ViewServiceRequest,
    EditServiceRequest
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatTableFilterModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [AuthenticationGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
