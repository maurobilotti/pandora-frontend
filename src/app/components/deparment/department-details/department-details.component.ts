import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/city';
import { Department } from 'src/app/models/department';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss'],
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  cities: City[];

  constructor(
    private cityService: CityService,
    private departmentService: DepartmentService,
    public dialog: MatDialogRef<DepartmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.department = this.data.department;
    this.getCities();
  }

  getCities() {
    return this.cityService.getAll().subscribe((cities: City[]) => {
      this.cities = cities;
      if (this.data.action == EntityAction.New) {
        this.department.city = {
          id: this.cities[0].id,
        } as City;
      }
    });
  }

  save() {
    if (this.data.action == EntityAction.Edit) {
      this.department.city = this.cities.find(
        (x) => x.id == this.department.city.id
      );
      this.departmentService
        .update(this.department.id, this.department)
        .subscribe((newDepartment) => {
          this.dialog.close(newDepartment);
        });
    } else if (this.data.action == EntityAction.New) {
      var selectedCity = this.cities.find(
        (x) => x.id == this.department.city.id
      );

      this.department.city = selectedCity;
      this.departmentService
        .create(this.department)
        .subscribe((newDepartment) => {
          this.dialog.close(newDepartment);
        });
    }
  }

  close() {
    this.dialog.close();
  }
}
