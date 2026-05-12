import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Defina uma interface para o TicketResponse se ainda não tiver
export interface TicketResponse {
  hashTicket: string;
  qrCodeBase64: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/payments/intent';

  createPaymentIntent(amount: number): Observable<string> {
    return this.http.post(this.apiUrl, { amount }, { responseType: 'text' });
  }

  confirmPayment(id: string, sectorId: number): Observable<TicketResponse> {
    const params = new HttpParams().set('sectorId', sectorId.toString());

    return this.http.get<TicketResponse>(`${this.apiUrl}/confirm/${id}`, { params });
  }
}
