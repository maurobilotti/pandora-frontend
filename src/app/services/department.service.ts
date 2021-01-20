import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceUtils } from '../utils/service-utils';
import { environment } from "../../environments/environment"
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this.httpClient
      .get<Department[]>(environment.backendUrl + 'api/department')
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  getById(id): Observable<Department> {
    return this.httpClient
      .get<Department>(environment.backendUrl + 'api/department/' + id)
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  create(employee): Observable<Department> {
    return this.httpClient
      .post<Department>(
        environment.backendUrl + 'api/department',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  update(id, employee): Observable<Department> {
    return this.httpClient
      .put<Department>(
        environment.backendUrl + 'api/department/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete<Department>(environment.backendUrl + 'api/department/' + id, this.httpOptions)
      .pipe(catchError(ServiceUtils.errorHandler));
  }
}
