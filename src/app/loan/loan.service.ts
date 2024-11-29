import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PageRequest } from '../core/model/page/RequestPage';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  baseUrl = 'http://localhost:8080/loan';

  constructor(
    private http: HttpClient,
    public datePipe: DatePipe
  ) { }

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

  getLoans(pageRequest: PageRequest): Observable<LoanPage> {
    //console.log( pageRequest.dateIni);
    //console.log( pageRequest.dateFinal);
    if (pageRequest.dateIni != null) {

      pageRequest.dateIni = new Date(this.datePipe.transform(pageRequest.dateIni, 'yyyy-MM-dd'));
    }
    if (pageRequest.dateFinal != null) {
      pageRequest.dateFinal = new Date(this.datePipe.transform(pageRequest.dateFinal, 'yyyy-MM-dd'));
    }
    return this.http.post<LoanPage>(this.baseUrl, pageRequest).pipe(
      catchError(this.handleError)
    );
  }

  saveLoan(loan: Loan): Observable<void> {
    loan.dateFinal = new Date(this.datePipe.transform(loan.dateFinal, 'yyyy-MM-dd'));
    loan.dateIni = new Date(this.datePipe.transform(loan.dateIni, 'yyyy-MM-dd'));
    return this.http.put<void>(this.baseUrl, loan).pipe(
      catchError(this.handleError)
    );
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`).pipe(
      catchError(this.handleError)
    );
  }
}

