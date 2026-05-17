import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventRequest, EventResponse } from '../models/event.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private http = inject(HttpClient)
  private readonly API_URL = `${environment.apiUrl}/events`

  cadastrar(evento: EventRequest){
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<EventResponse>(`${this.API_URL}`, evento, { headers });
  }

  getEvents(): Observable<EventResponse[]>{
  return this.http.get<EventResponse[]>(`${this.API_URL}`);
  }

  deleteEvents(id: number): Observable <void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`)

  }

  updateEvent(id: number, eventData: EventRequest): Observable<EventResponse>{
    const url = `${this.API_URL}/${id}`

    return this.http.put<EventResponse>(url, eventData)
  }

  getEventById(id: number): Observable<EventResponse> {
  return this.http.get<EventResponse>(`${this.API_URL}/${id}`);
}
}
