import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule já traz o DatePipe
import { RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket-service';
import { TicketResponseDTO } from '../../../models/ticket-response-dto';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  // Removi DatePipe daqui porque ele já vem dentro do CommonModule
  imports: [CommonModule, RouterLink],
  templateUrl: './my-tickets.html',
  styleUrl: './my-tickets.css',
})
export class MyTicketsComponent implements OnInit {
  private ticketService = inject(TicketService);

  // Signals para reatividade
  tickets = signal<TicketResponseDTO[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Certifique-se que o nome no service é getUserTickets ou getMyTickets
    this.ticketService.getUserTickets().subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar tickets:', err);
        this.error.set('Houve um problema ao carregar seus ingressos.');
        this.isLoading.set(false);
      }
    });
  }
}
