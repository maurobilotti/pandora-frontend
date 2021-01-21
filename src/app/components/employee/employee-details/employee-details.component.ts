import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';

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
    public dialog: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  selectedDeparment: number;

  ngOnInit(): void {
    this.employee = this.data.employee;
    this.getDepartments();

    if (this.data.action == EntityAction.Edit) {
      console.log(this.data.action);
      this.selectedDeparment = this.employee.department.id;
    }
  }

  getDepartments() {
    return this.departmentService
      .getAll()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
  }

  closeDialog() {
    this.dialog.close();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
