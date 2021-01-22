import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  departments: Department[];
  employee: Employee;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private uploadService: UploadService,
    public dialog: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.progress = 0;
    this.employee = this.data.employee;
    this.getDepartments();
  }

  getDepartments() {
    return this.departmentService
      .getAll()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
        if (this.data.action == EntityAction.New) {
          this.employee.department = {
            id: this.departments[0].id,
          } as Department;
        }
      });
  }

  close() {
    this.dialog.close();
  }

  save() {
    if (this.data.action == EntityAction.Edit) {
      this.employee.department = this.departments.find(
        (x) => x.id == this.employee.department.id
      );
      this.employeeService
        .update(this.employee.id, this.employee)
        .subscribe((newEmployee) => {
          this.dialog.close(newEmployee);
        });
    } else if (this.data.action == EntityAction.New) {
      var selectedDepartment = this.departments.find(
        (x) => x.id == this.employee.department.id
      );

      this.employee.department = selectedDepartment;
      this.employeeService.create(this.employee).subscribe((newEmployee) => {
        this.dialog.close(newEmployee);
      });
    }
  }

  isValid(): Boolean {
    return (
      this.employee.firstName != '' &&
      this.employee.lastName != '' &&
      !this.email.hasError('required') &&
      !this.email.hasError('email') &&
      this.employee.role != ''
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  uploadFile(file) {
    this.uploadService.uploadFile(this.employee.id, file).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total);
      else if (event.type === HttpEventType.Response) {
        this.onUploadFinished.emit(event.body);
      }
    });
  }
}
