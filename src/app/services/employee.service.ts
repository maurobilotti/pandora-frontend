import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { ServiceUtils } from '../utils/service-utils';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(environment.backendUrl + 'api/employee')
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  getById(id): Observable<Employee> {
    return this.httpClient
      .get<Employee>(environment.backendUrl + 'api/employee/' + id)
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  create(employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(
        environment.backendUrl + 'api/employee',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  update(id, employee): Observable<Employee> {
    return this.httpClient
      .put<Employee>(
        environment.backendUrl + 'api/employee/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete<Employee>(environment.backendUrl + 'api/employee/' + id, this.httpOptions)
      .pipe(catchError(ServiceUtils.errorHandler));
  }
}
