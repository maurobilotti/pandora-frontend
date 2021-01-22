import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { environment } from '../../../../environments/environment';
import * as Feather from 'feather-icons';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { EntityType } from 'src/app/models/enums/entity-type.enum';
import { EmployeeService } from 'src/app/services/employee.service';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;
  @Output() deleteEmployeeStatusChange = new EventEmitter<Employee>();
  @Output() imageChange = new EventEmitter<Employee>();

  imgUrl: any = '';
  emptyImg = '../../../../assets/images/empty-person.png';

  constructor(
    public editEmployeeDialog: MatDialog,
    public deleteEmployeeDialog: MatDialog,
    public employeeService: EmployeeService,
    private ref: ChangeDetectorRef
  ) {}

  openEditDialog(employee): void {
    const editDialogRef = this.editEmployeeDialog.open(
      EmployeeDetailsComponent,
      {
        width: '250px',
        data: {
          employee: employee,
          action: EntityAction.Edit,
        },
      }
    );

    editDialogRef.afterClosed().subscribe((result) => {
      console.log('edit closed');
      this.imgUrl =
        environment.backendUrl +
        'StaticFiles/Images/' +
        this.employee.id +
        '.jpg';

      this.imgUrl += '?random+=' + Math.random();
      this.ref.detectChanges();
    });
  }

  openDeleteDialog(employee): void {
    this.deleteEmployeeDialog
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
              this.deleteEmployeeStatusChange.emit(employee);
            }
          });
        }
      });
  }

  ngOnInit(): void {
    if (this.employee != undefined) {
      this.imgUrl =
        environment.backendUrl +
        'StaticFiles/Images/' +
        this.employee.id +
        '.jpg';
    }
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}
