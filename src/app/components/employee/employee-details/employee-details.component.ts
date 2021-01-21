import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  departments: Department[];
  employee: Employee;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    public dialog: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  // selectedDeparment: number;

  ngOnInit(): void {
    this.employee = this.data.employee;
    this.getDepartments();

    if (this.data.action == EntityAction.New) {
      console.log(this.data.action);
      this.employee.department = { id: this.departments[0].id } as Department;
    }
  }

  getDepartments() {
    return this.departmentService
      .getAll()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
  }

  close() {
    this.dialog.close();
  }

  save() {
    this.employee.department = this.departments.find(x => x.id == this.employee.department.id);
    this.employeeService
      .update(this.employee.id, this.employee)
      .subscribe((newEmployee) => {
        this.dialog.close(newEmployee);
      });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
