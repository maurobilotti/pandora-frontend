import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../../services/employee.service';
import * as Feather from 'feather-icons';
import { flyingOutAnimation } from 'src/app/modules/animations/angular-animations/angular-animations.module';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: [
    flyingOutAnimation
  ],
})
export class EmployeeListComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

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

  ngAfterViewInit() {
    Feather.replace();
  }
}
