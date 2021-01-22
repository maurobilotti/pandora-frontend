import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUtils } from '../utils/service-utils';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadFile = (id, files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http
      .post(environment.backendUrl + 'api/upload/' + id, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(ServiceUtils.errorHandler));
  };
}
