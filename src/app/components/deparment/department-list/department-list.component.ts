import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department';
import * as Feather from 'feather-icons';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { EntityType } from 'src/app/models/enums/entity-type.enum';
import { DepartmentDetailsComponent } from '../department-details/department-details.component';
import { City } from 'src/app/models/city';
import { EntityAction } from 'src/app/models/enums/entity-action.enum';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  departments: Department[];

  displayedColumns: string[] = ['id', 'name', 'city', 'actions'];
  dataSource = new MatTableDataSource<Department>();

  constructor(
    private departmentService: DepartmentService,
    public deleteDepartmentDialog: MatDialog,
    public editDepartmentDialog: MatDialog,
    public newDepartmentDialog: MatDialog
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    Feather.replace();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Department, filterValue: string) =>
      data.name.trim().toLowerCase().indexOf(filterValue) !== -1;

    this.departmentService.getAll().subscribe((data: Department[]) => {
      this.departments = data;
      this.dataSource.data = data;
    });
  }

  editDepartment(department: Department) {
    this.editDepartmentDialog
      .open(DepartmentDetailsComponent, {
        data: {
          action: EntityAction.Edit,
          department: department,
        },
      })
      .afterClosed()
      .subscribe();
  }

  newDepartment() {
    this.newDepartmentDialog
      .open(DepartmentDetailsComponent, {
        data: {
          action: EntityAction.New,
          department: {
            id: 0,
            name: '',
            city: {} as City,
          } as Department,
        },
      })
      .afterClosed()
      .subscribe((newDepartment: Department) => {
        if (newDepartment != undefined) {
          this.departments.push(newDepartment);
          this.dataSource = new MatTableDataSource(this.departments);
        }
      });
  }

  deleteDepartment(department) {
    this.deleteDepartmentDialog
      .open(ConfirmationDialogComponent, {
        data: {
          type: EntityType.Department,
          description: department.name,
        },
      })
      .afterClosed()
      .subscribe((ok: Boolean) => {
        if (ok) {
          this.departmentService.delete(department.id).subscribe((result) => {
            if (result) {
              this.departments.splice(
                this.departments.findIndex((x) => x.id == department.id),
                1
              );
              this.dataSource = new MatTableDataSource(this.departments);
            }
          });
        }
      });
  }
}
