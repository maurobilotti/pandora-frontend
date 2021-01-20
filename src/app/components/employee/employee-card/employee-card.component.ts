import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { environment } from '../../../../environments/environment';
import * as Feather from 'feather-icons';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { EntityType } from 'src/app/models/enums/entity-type.enum';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;
  @Output() deleteStatusChange = new EventEmitter<Employee>();

  imgUrl: any = '';
  emptyImg = '../../../../assets/images/empty-person.png';

  constructor(
    public editDialog: MatDialog,
    public deleteDialog: MatDialog,
    public employeeService: EmployeeService
  ) {}

  openEditDialog(employee): void {
    const editDialogRef = this.editDialog.open(EmployeeDetailsComponent, {
      width: '250px',
      data: employee,
    });

    editDialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(employee): void {
    this.deleteDialog
      .open(ConfirmationDialogComponent, {
        data: {
          type: EntityType.Employee,
          description: employee.lastName + ', ' + employee.firstName,
        },
      })
      .afterClosed()
      .subscribe((ok: Boolean) => {
        if (ok) {
          this.employeeService.delete(employee.id).subscribe((result) => {
            if (result) {
              console.log('The employee was deleted.');
              this.deleteStatusChange.emit(employee);
            }
          });
        }
      });
  }

  ngOnInit(): void {
    this.imgUrl =
      environment.backendUrl +
      'StaticFiles/Images/' +
      this.employee.id +
      '.jpg';
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}
