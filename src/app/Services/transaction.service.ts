import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TransactionDTO } from './DTO/transaction.dto';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private TRANSACTION_API = `${environment.api}/transaction`; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Get Transaction list from HTTP [GET] request.
   */
  getTransactions(): Observable<TransactionDTO[]> {
    return this.http.get<TransactionDTO[]>(this.TRANSACTION_API).pipe(
      tap((_) => this.log('fetched Transactions')),
      catchError(this.handleError)
    );
  }

  /**
   * Get Transaction list from HTTP [GET] request.
   */
  getTransactionByID(id: string): Observable<TransactionDTO> {
    return this.http.get<TransactionDTO>(`${this.TRANSACTION_API}/${id}`).pipe(
      tap((_) => this.log('fetched Transaction List')),
      catchError(this.handleError)
    );
  }

  /**
   * Create Transaction from HTTP [POST] request.
   */
  createTransaction(
    TransactionDTO: TransactionDTO
  ): Observable<TransactionDTO> {
    return this.http
      .post<TransactionDTO>(`${this.TRANSACTION_API}/`, TransactionDTO)
      .pipe(
        tap((_) => this.log('create Transaction')),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * Handle log Message.
   * @param message - message to display in log (messageService)
   */
  private log(message: string) {
    this.messageService.add(`Account Service: ${message}`);
  }
}
