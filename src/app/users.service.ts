import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(private httpClient: HttpClient) { }
  data:any = []
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getFilteredData(page: number, searchWord: string){
      return this.httpClient.get<any>(`https://dummyapi.io/data/api/user?limit=50&page=${page}`, 
      {headers: {'app-id': environment.appId}}).pipe(
      retry(1),
      catchError(this.handleError)
      );
  }
  // Get all users from api by page 
  getAll(page: number, limit = 20): Observable<any>{
    return this.httpClient.get<any>(`https://dummyapi.io/data/api/user?limit=${limit}&page=${page}`, 
    {headers: {'app-id': environment.appId}}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
