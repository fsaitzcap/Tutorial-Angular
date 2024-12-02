import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from './model/Client';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/client';

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('Error al hacer la solicitud', error);
    if (error.status === 409) {
      console.error('Conflicto en el servidor: ', error.message);
      return throwError(() => new Error(error.error.message));
    } else if (error.status === 404) {
      console.error('Recurso no encontrado: ', error.message);
      return throwError(() => new Error('El recurso solicitado no fue encontrado.'));
    } else {
      console.error('Error inesperado: ', error.message);
      return throwError(() => error);
    }
  }

  getErrorMessage(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  saveClient(client: Client): Observable<Client> {
    const { id } = client;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Client>(url, client).pipe(
      catchError(this.handleError)
    );
  }

  deleteClient(idClient: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClient}`).pipe(
      catchError(this.handleError)
    );
  }

}
