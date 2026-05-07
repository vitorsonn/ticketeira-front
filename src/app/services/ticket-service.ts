import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketResponseDTO } from '../models/ticket-response-dto';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tickets';

  getUserTickets(): Observable<TicketResponseDTO[]> {
    return this.http.get<TicketResponseDTO[]>(`${this.apiUrl}/my-tickets`);
  }
}
