import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { RoutingModule } from './modules/routing/routing.module';
import { EmployeeCardComponent } from './components/employee/employee-card/employee-card.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DepartmentListComponent } from './components/deparment/department-list/department-list.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { DepartmentDetailsComponent } from './components/deparment/department-details/department-details.component';
import { CityDetailsComponent } from './components/city/city-details/city-details.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    EmployeeDetailsComponent,
    ConfirmationDialogComponent,
    DepartmentListComponent,
    CityListComponent,
    DepartmentDetailsComponent,
    CityDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    AngularMaterialModule,
    RoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
