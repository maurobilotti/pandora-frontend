import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from 'src/app/components/city/city-list/city-list.component';
import { DepartmentListComponent } from 'src/app/components/deparment/department-list/department-list.component';
import { EmployeeListComponent } from 'src/app/components/employee/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'department', component: DepartmentListComponent },
  { path: 'city', component: CityListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
