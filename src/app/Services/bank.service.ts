import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BankDTO } from './DTO/bank.dto';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private BANK_API = `${environment.bankApi}/banks.php`; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Get Bank list from HTTP [GET] request.
   */
  getBanks(): Observable<BankDTO> {
    return this.http.get<BankDTO>(this.BANK_API).pipe(
      tap((_) => this.log('fetched Banks')),
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
    this.messageService.add(`Bank Service: ${message}`);
  }
}
