import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountDTO } from './DTO/account.dto';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private ACCOUNT_API = `${environment.api}/account`; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Get Account list from HTTP [GET] request.
   */
  getAccounts(): Observable<AccountDTO[]> {
    return this.http.get<AccountDTO[]>(this.ACCOUNT_API).pipe(
      tap((_) => this.log('fetched Banks')),
      catchError(this.handleError)
    );
  }

  /**
   * Get Account list from HTTP [GET] request.
   */
  getAccountByID(id: string): Observable<AccountDTO> {
    return this.http.get<AccountDTO>(`${this.ACCOUNT_API}/${id}`).pipe(
      tap((_) => this.log('fetched Account List')),
      catchError(this.handleError)
    );
  }

  /**
   * Get Account list from HTTP [GET] request.
   */
  getAccountByRUT(rut: string): Observable<AccountDTO> {
    return this.http.get<AccountDTO>(`${this.ACCOUNT_API}/rut/${rut}`).pipe(
      tap((_) => this.log('fetched Account List by RUT')),
      catchError(this.handleError)
    );
  }

  /**
   * Create Account from HTTP [POST] request.
   */
  createAccount(AccountDTO: AccountDTO): Observable<AccountDTO> {
    return this.http.post<AccountDTO>(`${this.ACCOUNT_API}/`, AccountDTO).pipe(
      tap((_) => this.log('create Account')),
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
