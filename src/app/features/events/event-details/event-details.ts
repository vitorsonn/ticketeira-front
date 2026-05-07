import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../../services/event-service';
import { EventResponse, SectorResponse } from '../../../models/event.model';
import { PaymentMethod } from '../../payments/payment-method/payment-method';

@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
  imports: [CommonModule, RouterModule, PaymentMethod]
})
export class EventDetails implements OnInit {
  private route = inject(ActivatedRoute)
  private service = inject(EventService)

  event = signal<EventResponse | null>(null);
  selectedSector = signal<SectorResponse | null>(null);
  isLoading = signal(true);
  showPaymentModal = signal(false);

  ngOnInit(): void {
    // Captura o ID da URL
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (idParam && !isNaN(id)) {
      this.loadEvent(Number(id));
    }
    else{
      console.error('ID de evento inválido na URL');
      this.isLoading.set(false);
    }
  }

  private loadEvent(id: number) {
    this.service.getEventById(id).subscribe({
      next: (data) => {
        this.event.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar evento', err);
        this.isLoading.set(false);
      }
    });
  }

  selecionarSetor(sector: SectorResponse) {
    this.selectedSector.set(sector);
  }

  finalizarCompra() {
    if (this.selectedSector()) {
    this.showPaymentModal.set(true);
  }
  }

  fecharModal() {
  this.showPaymentModal.set(false);
}

}
