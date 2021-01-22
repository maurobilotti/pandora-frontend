import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../../services/employee.service';
import * as Feather from 'feather-icons';
import { flyingOutAnimation } from 'src/app/modules/animations/angular-animations/angular-animations.module';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: [flyingOutAnimation],
})
export class EmployeeListComponent implements OnInit {
  @Output() newEmployeeStatusChange = new EventEmitter<Employee>();

  constructor(
    public employeeService: EmployeeService,
    public newEmployeeDialog: MatDialog
  ) {}

  employees: Employee[] = [];
  search: string = '';

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  deleteEmployeeCallback(employee) {
    if (this.employees.find((x) => x == employee)) {
      this.employees.splice(
        this.employees.findIndex((x) => x == employee),
        1
      );
    }
  }

  newEmployee() {
    const editDialogRef = this.newEmployeeDialog.open(
      EmployeeDetailsComponent,
      {
        data: {
          employee: {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            salary: 0,
            phoneNumber: '',
            department: {} as Department,
          } as Employee,
          action: EntityAction.New,
        },
      }
    );

    editDialogRef.afterClosed().subscribe((newEmployee: Employee) => {
      if (newEmployee != undefined) {
        this.employees.push(newEmployee);
      }
    });
  }

  editEmployeeCallback(employee: Employee) {
    if (this.employees.find((x) => x == employee)) {
      var oldEmployee = this.employees.find((x) => x == employee);
      if (oldEmployee) {
        oldEmployee.firstName = employee.firstName;
        oldEmployee.lastName = employee.lastName;
        oldEmployee.email = employee.email;
        oldEmployee.phoneNumber = employee.phoneNumber;
        oldEmployee.role = employee.role;
        oldEmployee.salary = employee.salary;
        oldEmployee.department.id = employee.department.id;
        oldEmployee.department.name = employee.department.name;
        oldEmployee.department.city = employee.department.city;
      }
    }
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}
