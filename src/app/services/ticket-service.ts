import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketResponseDTO } from '../models/ticket-response-dto';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tickets`;

  getUserTickets(): Observable<TicketResponseDTO[]> {
    return this.http.get<TicketResponseDTO[]>(`${this.apiUrl}/my-tickets`);
  }
}
