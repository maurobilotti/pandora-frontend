import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceUtils } from '../utils/service-utils';
import { environment } from "../../environments/environment"
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<City[]> {
    return this.httpClient
      .get<City[]>(environment.backendUrl + 'api/city')
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  getById(id): Observable<City> {
    return this.httpClient
      .get<City>(environment.backendUrl + 'api/city/' + id)
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  create(employee): Observable<City> {
    return this.httpClient
      .post<City>(
        environment.backendUrl + 'api/city',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  update(id, employee): Observable<City> {
    return this.httpClient
      .put<City>(
        environment.backendUrl + 'api/city/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(ServiceUtils.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete<City>(environment.backendUrl + 'api/city/' + id, this.httpOptions)
      .pipe(catchError(ServiceUtils.errorHandler));
  }
}
